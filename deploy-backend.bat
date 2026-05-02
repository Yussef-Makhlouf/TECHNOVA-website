@echo off
echo ========================================
echo   Deploying Backend to VPS...
echo ========================================
ssh root@72.62.1.228 "cd /var/www/api.globaltechnova.com && git pull origin main && npm install && pm2 restart technova-api"
echo.
echo ========================================
echo   Backend Deployment Complete!
echo ========================================
pause
