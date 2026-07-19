# QuantClass model catalog maintenance

The checked-in Chrome extension is a built snapshot and does not include its original frontend source project. Model catalog changes therefore have to stay synchronized across the runtime configuration and the bundled JavaScript. Runtime data belongs in the ignored root `data/` directory, and machine-local settings belong in the ignored root `config.yaml`.

## Adding a model to a built-in provider

1. Use the provider's exact API model ID. Do not use a display name or invent an alias.
2. Add the model to the provider defaults in `backend/config.py` so newly generated configurations include it.
3. Add the model to that provider's built-in `models` array in both files:
   - `extension/build/popup.js`
   - `extension/build/service-worker.js`
4. If an existing `config.yaml` is already present, also add the model under `providers.<provider>.models`. Never copy API keys into documentation, tests, logs, or chat output.
5. Run the catalog regression check from the workspace root:

   ```powershell
   powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\extension\tests\test_model_catalog.ps1
   ```

6. In `chrome://extensions`, reload the unpacked QuantClass extension, then close and reopen its side panel. Restart the backend only when backend configuration or Python code changed.

## Frontend v0.2.2 behavior to remember

The Default Model dropdown renders built-in providers from the static catalog bundled in `popup.js`. Models added through a built-in provider's MODELS editor are saved to the backend and appear in its test selector, but they do not automatically appear in the Default Model dropdown. Until the frontend is rebuilt from source with a single dynamic catalog, update both bundled JavaScript files as described above.

## Local operation

- Start the backend from the repository root with `powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\start-backend.ps1`.
- The launcher activates the `quantclass_smart` Conda environment and runs `backend/main.py` in the foreground; Ctrl+C stops it.
- Load the unpacked Chrome extension from `extension/`. After frontend changes, reload it in `chrome://extensions` and reopen the side panel.
- Never commit `data/`, `config.yaml`, databases, API keys, `.env` files, logs, or local release wrapper folders such as `quantclass-backend-v*/` and `quantclass-smart-v*/`.
