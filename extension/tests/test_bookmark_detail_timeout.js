const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const extensionDir = path.resolve(__dirname, "..");
const helperPath = path.join(extensionDir, "build", "runtime-helpers.js");
const popupPath = path.join(extensionDir, "build", "popup.js");
const popupHtmlPath = path.join(extensionDir, "build", "popup.html");

assert.ok(
  fs.existsSync(helperPath),
  "runtime-helpers.js must exist so bookmark detail requests can time out"
);

delete globalThis.QuantClassRuntime;
require(helperPath);

(async () => {
  const resolved = await globalThis.QuantClassRuntime.withTimeout(
    Promise.resolve("ok"),
    50,
    "timed out"
  );
  assert.equal(resolved, "ok");

  const startedAt = Date.now();
  await assert.rejects(
    globalThis.QuantClassRuntime.withTimeout(
      new Promise(() => {}),
      20,
      "bookmark detail timed out"
    ),
    /bookmark detail timed out/
  );
  assert.ok(Date.now() - startedAt < 250, "timeout guard must settle promptly");

  const popupHtml = fs.readFileSync(popupHtmlPath, "utf8");
  assert.ok(
    popupHtml.indexOf("runtime-helpers.js") < popupHtml.indexOf("popup.js"),
    "runtime helpers must load before popup.js"
  );

  const popup = fs.readFileSync(popupPath, "utf8");
  assert.match(
    popup,
    /globalThis\.QuantClassRuntime\.withTimeout\(chrome\.runtime\.sendMessage/
  );
  assert.match(popup, /finally\{ae\(!1\)\}/);
  assert.match(popup, /Failed to load bookmark detail:/);

  console.log("Bookmark detail timeout check passed.");
})().catch(error => {
  console.error(error);
  process.exit(1);
});
