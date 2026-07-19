$ErrorActionPreference = 'Stop'

$extensionDir = Split-Path -Parent $PSScriptRoot
$expectedDeepSeekCatalog = 'models:["deepseek-chat","deepseek-reasoner","deepseek-v4-pro"]'
$bundles = @(
    (Join-Path $extensionDir 'build\popup.js'),
    (Join-Path $extensionDir 'build\service-worker.js')
)

foreach ($bundle in $bundles) {
    $content = Get-Content -Raw -LiteralPath $bundle
    if (-not $content.Contains($expectedDeepSeekCatalog)) {
        throw "DeepSeek model catalog is missing deepseek-v4-pro: $bundle"
    }
}

$extensionParent = Split-Path $extensionDir -Parent
$workspaceRoot = if ((Split-Path $extensionParent -Leaf) -like 'quantclass-smart-*') {
    Split-Path $extensionParent -Parent
} else {
    $extensionParent
}
$backendCandidates = @(
    (Join-Path $workspaceRoot 'backend\config.py'),
    (Join-Path $workspaceRoot 'quantclass-backend-v0.2.4\backend\config.py')
)
$backendConfig = $backendCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $backendConfig) {
    throw "Backend config was not found in: $($backendCandidates -join ', ')"
}
$backendContent = Get-Content -Raw -LiteralPath $backendConfig
$expectedBackendCatalog = 'models=["deepseek-chat", "deepseek-reasoner", "deepseek-v4-pro"]'
if (-not $backendContent.Contains($expectedBackendCatalog)) {
    throw "Backend DeepSeek defaults are missing deepseek-v4-pro: $backendConfig"
}

Write-Host 'DeepSeek model catalog check passed.'
