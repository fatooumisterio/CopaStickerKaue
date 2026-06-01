Add-Type -AssemblyName System.Drawing
$sourcePath = "D:\CopaStickerKaue\src\assets\icon.jpg"
$destPath = "D:\CopaStickerKaue\public\app-icon.jpg"

if (!(Test-Path "D:\CopaStickerKaue\public")) {
    New-Item -ItemType Directory -Force -Path "D:\CopaStickerKaue\public" | Out-Null
}

$img = [System.Drawing.Image]::FromFile($sourcePath)
$size = [math]::Min($img.Width, $img.Height)

$x = [math]::Round(($img.Width - $size) / 2)
$y = [math]::Round(($img.Height - $size) / 2)

$rect = New-Object System.Drawing.Rectangle($x, $y, $size, $size)
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$bmp.SetResolution($img.HorizontalResolution, $img.VerticalResolution)

$gfx = [System.Drawing.Graphics]::FromImage($bmp)
$gfx.DrawImage($img, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)

$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

$gfx.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Host "Crop Concluido com Sucesso!"
