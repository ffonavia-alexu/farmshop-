# Save snapshots from IP Webcam every minute
# Run: powershell -ExecutionPolicy Bypass -File save_webcam.ps1

$ipWebcamHost = "192.168.1.5:8080"
$outputFolder = "C:\Users\ffona\OneDrive\Documents\farmshop\images"
$outputFile = "seller6.jpg"
$outputPath = Join-Path $outputFolder $outputFile

$intervalSeconds = 60

Write-Host "IP Webcam requires login. Enter credentials:"
$login = Read-Host "Login"
$securePassword = Read-Host "Password" -AsSecureString
$password = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword))

# Use WebClient with NetworkCredential - works better for Basic Auth
$ipWebcamUrl = "http://${ipWebcamHost}/shot.jpg"
$cred = New-Object System.Net.NetworkCredential($login, $password)
$wc = New-Object System.Net.WebClient
$wc.Credentials = $cred

Write-Host ""
Write-Host "IP Webcam: saving every $intervalSeconds sec."
Write-Host "URL: http://$ipWebcamHost/shot.jpg"
Write-Host "Folder: $outputFolder"
Write-Host "File: $outputFile"
Write-Host "Press Ctrl+C to stop"
Write-Host ""

while ($true) {
    try {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $wc.DownloadFile($ipWebcamUrl, $outputPath)
        Write-Host "[$timestamp] Saved: $outputPath"
    }
    catch {
        Write-Host "[$timestamp] Error: $_" -ForegroundColor Red
    }
    Start-Sleep -Seconds $intervalSeconds
}
