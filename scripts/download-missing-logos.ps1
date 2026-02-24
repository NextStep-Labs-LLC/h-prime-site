# PowerShell script to download missing brand logos
# Run: powershell -ExecutionPolicy Bypass -File scripts/download-missing-logos.ps1

$outputDir = "public/brands"

# Ensure output directory exists
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

Write-Host "Downloading missing brand logos..." -ForegroundColor Green

# Direct logo URLs (found from brand websites and Wikimedia Commons)
$logos = @{
    "fisher-paykel" = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Fisher_%26_Paykel_logo.svg/320px-Fisher_%26_Paykel_logo.svg.png"
    "smeg" = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Smeg_logo.svg/320px-Smeg_logo.svg.png"
    "speed-queen" = "https://www.speedqueen.com/content/dam/alliance/speedqueen/logos/speed-queen-logo.png"
    "sharp" = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Sharp_logo.svg/320px-Sharp_logo.svg.png"
    "liebherr" = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Liebherr_logo.svg/320px-Liebherr_logo.svg.png"
    "gaggenau" = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Gaggenau_logo.svg/320px-Gaggenau_logo.svg.png"
}

$successCount = 0
$failedCount = 0

foreach ($brand in $logos.Keys) {
    $url = $logos[$brand]
    $outputPath = "$outputDir/$brand.png"
    
    # Skip if already exists
    if (Test-Path $outputPath) {
        Write-Host "[OK] $brand.png already exists" -ForegroundColor Yellow
        $successCount++
        continue
    }
    
    try {
        Write-Host "Downloading $brand..." -ForegroundColor Cyan
        Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing
        Write-Host "[OK] Downloaded $brand.png" -ForegroundColor Green
        $successCount++
        Start-Sleep -Milliseconds 500
    }
    catch {
        Write-Host "[FAIL] Failed to download $brand : $_" -ForegroundColor Red
        $failedCount++
    }
}

Write-Host "`nSummary:" -ForegroundColor Cyan
Write-Host "Success: $successCount" -ForegroundColor Green
Write-Host "Failed: $failedCount" -ForegroundColor Red

# List brands that still need manual download
$needManual = @(
    "hotpoint",
    "true",
    "scotsman",
    "u-line",
    "perlick",
    "bertazzoni",
    "blomberg",
    "asko",
    "jenn-air"
)

if ($needManual.Count -gt 0) {
    Write-Host "`nThese brands need manual download:" -ForegroundColor Yellow
    Write-Host "Visit these websites and look for 'Press Kit' or 'Media' sections:`n"
    
    $manualUrls = @{
        "hotpoint" = "https://www.hotpoint.com"
        "true" = "https://www.truemfg.com/about/media"
        "scotsman" = "https://www.scotsman-ice.com"
        "u-line" = "https://www.u-line.com"
        "perlick" = "https://www.perlick.com"
        "bertazzoni" = "https://www.bertazzoni.com/us/press-and-media"
        "blomberg" = "https://www.blombergappliances.com"
        "asko" = "https://www.askousa.com"
        "jenn-air" = "https://www.jennair.com/about-us/media-center.html"
    }
    
    foreach ($brand in $needManual) {
        Write-Host "  • $brand - $($manualUrls[$brand])" -ForegroundColor Gray
    }
    
    Write-Host "`nTip: Save as public/brands/{brand}.png (PNG format, transparent background)" -ForegroundColor Cyan
}

Write-Host "`nDone!" -ForegroundColor Green

