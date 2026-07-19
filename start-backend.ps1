[CmdletBinding()]
param(
    [switch]$Check
)

$ErrorActionPreference = "Stop"

# Do not let the caller's Python environment leak into the Conda runtime.
# This matters when the launcher is invoked by tools such as Hermes.
Remove-Item Env:PYTHONPATH -ErrorAction SilentlyContinue
Remove-Item Env:PYTHONHOME -ErrorAction SilentlyContinue
Remove-Item Env:VIRTUAL_ENV -ErrorAction SilentlyContinue

$environmentName = "quantclass_smart"
$workspaceRoot = $PSScriptRoot
$backendCandidates = @(
    (Join-Path $workspaceRoot "backend"),
    (Join-Path $workspaceRoot "quantclass-backend-v0.2.4\backend")
)
$backendDir = $null
foreach ($candidate in $backendCandidates) {
    if (Test-Path -LiteralPath (Join-Path $candidate "main.py")) {
        $backendDir = $candidate
        break
    }
}

if (-not $backendDir) {
    throw "Backend entry point not found in: $($backendCandidates -join ', ')"
}

$condaExe = $env:CONDA_EXE
if (-not $condaExe -or -not (Test-Path -LiteralPath $condaExe)) {
    $condaCommand = Get-Command conda.exe -ErrorAction SilentlyContinue
    if ($condaCommand) {
        $condaExe = $condaCommand.Source
    }
}
if (-not $condaExe -or -not (Test-Path -LiteralPath $condaExe)) {
    throw "Conda was not found. Open an Anaconda PowerShell prompt and retry."
}

$condaRoot = Split-Path (Split-Path $condaExe -Parent) -Parent
$condaHook = Join-Path $condaRoot "shell\condabin\conda-hook.ps1"
if (-not (Test-Path -LiteralPath $condaHook)) {
    throw "Conda PowerShell hook not found: $condaHook"
}

. $condaHook
conda activate $environmentName

$python = (Get-Command python.exe -ErrorAction Stop).Source
$env:QUANTCLASS_HOME = $workspaceRoot

if ($Check) {
    [pscustomobject]@{
        environment = $environmentName
        python = $python
        backend_dir = $backendDir
        quantclass_home = $env:QUANTCLASS_HOME
    } | ConvertTo-Json -Compress
    exit 0
}

Write-Host "Conda environment: $environmentName"
Write-Host "Python: $python"
Write-Host "Backend: $backendDir"
Write-Host "Press Ctrl+C to stop."

Push-Location $backendDir
try {
    & $python "main.py"
    $backendExitCode = $LASTEXITCODE
}
finally {
    Pop-Location
}

if ($backendExitCode -ne 0) {
    exit $backendExitCode
}
