(function installRuntimeHelpers(globalObject) {
  "use strict";

  const runtime = globalObject.QuantClassRuntime || {};

  runtime.withTimeout = function withTimeout(
    promise,
    timeoutMs = 10000,
    message = "Request timed out"
  ) {
    let timerId;
    const timeout = new Promise((_, reject) => {
      timerId = setTimeout(() => reject(new Error(message)), timeoutMs);
    });

    return Promise.race([Promise.resolve(promise), timeout]).finally(() => {
      clearTimeout(timerId);
    });
  };

  globalObject.QuantClassRuntime = runtime;
})(globalThis);
