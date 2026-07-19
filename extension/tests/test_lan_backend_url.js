const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { TextEncoder } = require("node:util");

const extensionDir = path.resolve(__dirname, "..");
const workerSource = fs.readFileSync(
  path.join(extensionDir, "build", "service-worker.js"),
  "utf8"
);

async function requestHealth(backendUrl) {
  let listener;
  let requestedUrl;
  const context = {
    console: { log() {}, warn() {}, error() {} },
    TextEncoder,
    URLSearchParams,
    fetch: async url => {
      requestedUrl = url;
      return {
        ok: true,
        async json() {
          return { code: 0, data: { status: "healthy" } };
        },
      };
    },
    chrome: {
      runtime: {
        id: "test-extension",
        onInstalled: { addListener() {} },
        onMessage: { addListener(fn) { listener = fn; } },
      },
      storage: {
        local: {
          async get(key) {
            return key === "quantclass_config"
              ? { quantclass_config: { backendUrl } }
              : {};
          },
          async set() {},
          async remove() {},
          async clear() {},
        },
      },
      sidePanel: { setPanelBehavior() { return Promise.resolve(); } },
      action: { onClicked: { addListener() {} } },
      tabs: { async query() { return []; } },
    },
  };

  vm.runInNewContext(workerSource, context);
  const response = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("health message timed out")), 1000);
    listener({ type: "GET_HEALTH", payload: {} }, {}, result => {
      clearTimeout(timer);
      resolve(result);
    });
  });

  assert.equal(response.success, true);
  return requestedUrl;
}

(async () => {
  const requestedUrl = await requestHealth(
    "  http://192.168.31.249:8700/ \r\n"
  );
  assert.equal(requestedUrl, "http://192.168.31.249:8700/api/health");

  const manifest = JSON.parse(
    fs.readFileSync(path.join(extensionDir, "manifest.json"), "utf8")
  );
  assert.ok(
    manifest.host_permissions.includes("http://192.168.31.249/*"),
    "manifest must allow the LAN backend host"
  );

  console.log("LAN backend URL normalization check passed.");
})().catch(error => {
  console.error(error);
  process.exit(1);
});
