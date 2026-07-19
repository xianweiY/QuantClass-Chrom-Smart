const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { Worker } = require("node:worker_threads");

const popupPath = path.resolve(__dirname, "..", "build", "popup.js");
const popupSource = fs.readFileSync(popupPath, "utf8");
const parserStart = popupSource.indexOf("var Ln=");
const parserEnd = popupSource.indexOf("async function De", parserStart);

assert.ok(parserStart >= 0 && parserEnd > parserStart, "Markdown parser must be present");

const parserSource = popupSource.slice(parserStart, parserEnd);
const truncatedTableRow = "摘要内容\n| 这是被长度限制截断的表格行";

function renderWithDeadline(markdown, timeoutMs = 500) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      `
        const { parentPort, workerData } = require("node:worker_threads");
        eval(workerData.parserSource + "\\nparentPort.postMessage(Le(workerData.markdown));");
      `,
      { eval: true, workerData: { parserSource, markdown } }
    );

    const timer = setTimeout(async () => {
      await worker.terminate();
      reject(new Error("Markdown renderer did not settle for a truncated table row"));
    }, timeoutMs);

    worker.once("message", html => {
      clearTimeout(timer);
      resolve(html);
    });
    worker.once("error", error => {
      clearTimeout(timer);
      reject(error);
    });
  });
}

(async () => {
  const html = await renderWithDeadline(truncatedTableRow);
  assert.match(html, /这是被长度限制截断的表格行/);
  console.log("Markdown truncated-table regression check passed.");
})().catch(error => {
  console.error(error);
  process.exit(1);
});
