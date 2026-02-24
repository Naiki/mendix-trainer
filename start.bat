@echo off
:: Mendix Trainer - Start Script (PWA Server)
:: Startet den lokalen Server und oeffnet die App

echo.
echo   Mendix Trainer wird gestartet...
echo.

:: Server starten (bleibt im Hintergrund laufen)
start "Mendix Trainer Server" /min node "%~dp0server.js"

:: Kurz warten bis Server bereit ist
timeout /t 2 /nobreak >nul

:: Edge im App-Modus starten
start "" "msedge" --app="http://localhost:3000"
