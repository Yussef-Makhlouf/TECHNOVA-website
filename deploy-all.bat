@echo off
echo ========================================
echo   Deploying Full Stack to VPS...
echo ========================================

echo.
echo [1/2] Updating Backend...
ssh root@72.62.1.228 "cd /var/www/api.globaltechnova.com && git pull origin main && npm install && pm2 restart technova-api"

echo.
echo [2/2] Updating Frontend...
ssh root@72.62.1.228 "cd /var/www/globaltechnova.com && git pull origin main && npm install && npm run build && pm2 restart technova-frontend"

echo.
echo ========================================
echo   Full Deployment Complete!
echo ========================================
pause
