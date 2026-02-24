@echo off
:: Mendix Trainer - Desktop-Shortcut erstellen
:: Erstellt eine Verknuepfung auf dem Desktop

echo Erstelle Desktop-Verknuepfung...

powershell -NoProfile -Command ^
    "$WshShell = New-Object -ComObject WScript.Shell; ^
    $Shortcut = $WshShell.CreateShortcut('%USERPROFILE%\Desktop\Mendix Trainer.lnk'); ^
    $Shortcut.TargetPath = '%~dp0start.bat'; ^
    $Shortcut.WorkingDirectory = '%~dp0'; ^
    $Shortcut.Description = 'Mendix Trainer - Intermediate und Advanced'; ^
    $Shortcut.IconLocation = 'msedge.exe,0'; ^
    $Shortcut.WindowStyle = 7; ^
    $Shortcut.Save()"

echo.
echo Desktop-Verknuepfung "Mendix Trainer" erstellt!
echo Du kannst die App jetzt ueber das Desktop-Icon starten.
echo.
pause
