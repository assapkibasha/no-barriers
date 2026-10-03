# Generate a deterministic sharing graphic without a runtime font download.
Add-Type -AssemblyName System.Drawing
$cardBitmap = [System.Drawing.Bitmap]::new(1200, 630)
$cardCanvas = [System.Drawing.Graphics]::FromImage($cardBitmap)
$cardCanvas.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$cardCanvas.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$cardCanvas.Clear([System.Drawing.ColorTranslator]::FromHtml('#f5f1e8'))
$cardInk = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#122b30'))
$cardTeal = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#0f766e'))
$cardBrandFont = [System.Drawing.Font]::new('Segoe UI', 25, [System.Drawing.FontStyle]::Bold)
$cardTitleFont = [System.Drawing.Font]::new('Segoe UI', 58, [System.Drawing.FontStyle]::Bold)
$cardSmallFont = [System.Drawing.Font]::new('Segoe UI', 18)
try {
  $cardCanvas.DrawString('NoBarriers', $cardBrandFont, $cardInk, 70, 60)
  $cardCanvas.DrawString('Learn Rwandan', $cardTitleFont, $cardInk, 62, 215)
  $cardCanvas.DrawString('Sign Language.', $cardTitleFont, $cardTeal, 62, 305)
  $cardCanvas.DrawString('A more accessible way to learn.', $cardSmallFont, $cardInk, 70, 535)
  $cardCanvas.DrawString('nobarriers.co.rw', $cardSmallFont, $cardInk, 925, 535)
  $cardOutput = Join-Path $PSScriptRoot '../public/images/social-card.png'
  $cardBitmap.Save($cardOutput, [System.Drawing.Imaging.ImageFormat]::Png)
} finally {
  $cardCanvas.Dispose()
  $cardBitmap.Dispose()
  $cardInk.Dispose()
  $cardTeal.Dispose()
  $cardBrandFont.Dispose()
  $cardTitleFont.Dispose()
  $cardSmallFont.Dispose()
}
