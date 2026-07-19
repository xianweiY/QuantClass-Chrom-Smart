$ErrorActionPreference = "Stop"

$backendRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$backendParent = Split-Path $backendRoot -Parent
$workspaceRoot = if ((Split-Path $backendParent -Leaf) -like "quantclass-backend-*") {
    Split-Path $backendParent -Parent
} else {
    $backendParent
}
$launcher = Join-Path $workspaceRoot "start-backend.ps1"

if (-not (Test-Path -LiteralPath $launcher)) {
    throw "Launcher does not exist: $launcher"
}

$result = (& $launcher -Check | ConvertFrom-Json)
$expectedBackend = Join-Path $workspaceRoot "backend"

if ($result.environment -ne "quantclass_smart") {
    throw "Unexpected environment: $($result.environment)"
}
if ($result.backend_dir -ne $expectedBackend) {
    throw "Unexpected backend directory: $($result.backend_dir)"
}
if ($result.quantclass_home -ne $workspaceRoot) {
    throw "Unexpected QUANTCLASS_HOME: $($result.quantclass_home)"
}
if (-not (Test-Path -LiteralPath $result.python)) {
    throw "Environment Python does not exist: $($result.python)"
}

"start-backend.ps1 check passed"
