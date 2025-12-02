# Trading Analysis Sync Script - Simple Version
param(
    [string]$XamppPath = "C:\xampp\htdocs\trading-analysis-master-localhost",
    [bool]$OpenBrowser = $false
)

Write-Host "Syncing Trading Analysis to XAMPP Localhost" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan

# Check if XAMPP directory exists
if (-not (Test-Path $XamppPath)) {
    Write-Host "Creating XAMPP directory: $XamppPath" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $XamppPath -Force | Out-Null
}

Write-Host "Source: $(Get-Location)" -ForegroundColor Green
Write-Host "Target: $XamppPath" -ForegroundColor Green
Write-Host ""

# Core files to sync
$CoreFiles = @(
    "index.html",
    "main.js", 
    "README.md",
    "styles-testing.css",
    "worker.js",
    "fetch-gcf.js"
)

# Data files
$DataFiles = @(
    "GME.csv",
    "AMZN.csv", 
    "BHP.AX.csv"
)

# Optional files
$OptionalFiles = @(
    "LICENSE",
    "CNAME"
)

Write-Host "Syncing core files..." -ForegroundColor Yellow
foreach ($file in $CoreFiles) {
    if (Test-Path $file) {
        Copy-Item $file $XamppPath -Force
        Write-Host "  OK: $file" -ForegroundColor Green
    } else {
        Write-Host "  MISSING: $file" -ForegroundColor Red
    }
}

Write-Host "Syncing data files..." -ForegroundColor Yellow
foreach ($file in $DataFiles) {
    if (Test-Path $file) {
        Copy-Item $file $XamppPath -Force
        Write-Host "  OK: $file" -ForegroundColor Green
    } else {
        Write-Host "  NOT FOUND: $file" -ForegroundColor Gray
    }
}

Write-Host "Syncing optional files..." -ForegroundColor Yellow
foreach ($file in $OptionalFiles) {
    if (Test-Path $file) {
        Copy-Item $file $XamppPath -Force
        Write-Host "  OK: $file" -ForegroundColor Green
    } else {
        Write-Host "  NOT FOUND: $file" -ForegroundColor Gray
    }
}

# Sync directories
if (Test-Path "declutter" -PathType Container) {
    Write-Host "Syncing declutter directory..." -ForegroundColor Yellow
    if (Test-Path "$XamppPath\declutter") {
        Remove-Item "$XamppPath\declutter" -Recurse -Force
    }
    Copy-Item "declutter" $XamppPath -Recurse -Force
    Write-Host "  OK: declutter directory" -ForegroundColor Green
}

# Remove private files from localhost (PRIVACY PROTECTION)
$PrivateFiles = @(
    ".git",
    ".gitignore", 
    "sync-to-localhost.ps1",
    "test-sync.ps1"
)

Write-Host "Removing private files from localhost..." -ForegroundColor Yellow
foreach ($file in $PrivateFiles) {
    $targetFile = Join-Path $XamppPath $file
    if (Test-Path $targetFile) {
        if (Test-Path $targetFile -PathType Container) {
            Remove-Item $targetFile -Recurse -Force
        } else {
            Remove-Item $targetFile -Force
        }
        Write-Host "  REMOVED: $file" -ForegroundColor Magenta
    }
}

# Create sync timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"Last synced: $timestamp`nSource: $(Get-Location)`nSynced by: test-sync.ps1" | Out-File "$XamppPath\last-sync.txt" -Encoding UTF8

Write-Host ""
Write-Host "Sync completed successfully!" -ForegroundColor Green
Write-Host "Localhost URL: http://localhost/trading-analysis-master-localhost" -ForegroundColor Cyan

if ($OpenBrowser) {
    Start-Process "http://localhost/trading-analysis-master-localhost"
}