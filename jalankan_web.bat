@echo off
title Web 3D Beji Sirah Keteng Server
cd /d "%~dp0"
echo =======================================================
echo  Menjalankan Server Web 3D Beji Sirah Keteng...
echo =======================================================
start http://localhost:3000
node server.js
pause
