@echo off
echo ========================================
echo   Deploying Frontend to VPS...
echo ========================================
ssh root@72.62.1.228 "cd /var/www/globaltechnova.com && git pull origin main && npm install && npm run build && pm2 restart technova-frontend"
echo.
echo ========================================
echo   Frontend Deployment Complete!
echo ========================================
pause
