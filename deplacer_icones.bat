@echo off
title Rangement des icones - Diag incendie by Kevin
if not exist "%~dp0images" mkdir "%~dp0images"
move /Y "%USERPROFILE%\Downloads\icon-*.png" "%~dp0images\" >nul
copy /Y "%~dp0images\icon-180x180.png" "%~dp0images\apple-touch-icon.png" >nul
echo Contenu de images :
dir "%~dp0images\*.png" /b
pause
