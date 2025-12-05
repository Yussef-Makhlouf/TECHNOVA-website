# TECHNOVA Deployment Guide

## Server Information
- **VPS IP**: `72.62.1.228`
- **Domain**: `globaltechnova.com`
- **API Subdomain**: `api.globaltechnova.com`

---

## 1. DNS Configuration (Bluehost)

Go to Bluehost → Domain Manager → DNS Management and add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 72.62.1.228 | 3600 |
| A | www | 72.62.1.228 | 3600 |
| A | api | 72.62.1.228 | 3600 |

---

## 2. VPS Setup (Hostinger)

### SSH into VPS
```bash
ssh root@72.62.1.228
```

### Install Required Software
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install Certbot for SSL
apt install -y certbot python3-certbot-nginx
```

---

## 3. Deploy Backend (Express.js API)

### Upload Backend Code
```bash
# On VPS, create directory
mkdir -p /var/www/api.globaltechnova.com
cd /var/www/api.globaltechnova.com

# Upload files (from local machine using SCP)
# scp -r technova-main/* root@72.62.1.228:/var/www/api.globaltechnova.com/
```

### Create Environment File
```bash
nano /var/www/api.globaltechnova.com/config/.env
```

Add this content:
```env
# Database
MONGO_URL=mongodb+srv://eslamhussien10297_db_user:6AvD9FCCFxTOIsfx@technoba.yj0uy1b.mongodb.net/?appName=technoba

# Port
PORT=8080

# Token
CONFIRMATION_EMAIL_TOKEN=Email_xyz_token
DEFAULT_SIGNATURE=toGenerate&verifyTokenDefault
SIGN_IN_TOKEN_SECRET=toGenerate&verifyToken
SALT_ROUNDS=8
RESET_TOKEN=resetPassword

# ImageKit
PUBLIC_IMAGEKIT_KEY=public_sCV4lsPhBwGWj6yO0Q1X5gB/gak=
PRIVATE_IMAGEKIT_KEY=private_EmguB+2doS1Kv5h5B3mABkNEasw=
URL_ENDPOINT=https://ik.imagekit.io/6t9jvr8ri
PROJECT_FOLDER=Technova

# SMTP (Gmail for sending)
SMTP_HOST=mail.globaltechnova.com

SMTP_PORT=465
SMTP_USER=Info@globaltechnova.com
SMTP_PASS=kjys rifg uvor rrhz

# Contact Form Destination
OWNER=Info@globaltechnova.com
```

### Install Dependencies & Start
```bash
cd /var/www/api.globaltechnova.com
npm install
pm2 start index.js --name "technova-api"
pm2 save
pm2 startup
```

---

## 4. Deploy Frontend (Next.js)

### Upload Frontend Code
```bash
# On VPS, create directory
mkdir -p /var/www/globaltechnova.com
cd /var/www/globaltechnova.com

# Upload files (from local machine, EXCLUDE technova-main, node_modules, .next)
# scp -r . root@72.62.1.228:/var/www/globaltechnova.com/
```

### Create Environment File
```bash
nano /var/www/globaltechnova.com/.env.production
```

Add:
```env
NEXT_PUBLIC_API_URL=https://api.globaltechnova.com/api/v1
MONGO_URL=mongodb+srv://eslamhussien10297_db_user:6AvD9FCCFxTOIsfx@technoba.yj0uy1b.mongodb.net/?appName=technoba
```

### Build & Start Frontend
```bash
cd /var/www/globaltechnova.com
npm install

# Build for production
npm run build

# Start with PM2 (runs on port 3000)
pm2 start npm --name "technova-frontend" -- start
pm2 save
```

---

## 5. Nginx Configuration

### API Configuration
```bash
nano /etc/nginx/sites-available/api.globaltechnova.com
```

```nginx
server {
    listen 80;
    server_name api.globaltechnova.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 50M;
    }
}
```

### Frontend Configuration
```bash
nano /etc/nginx/sites-available/globaltechnova.com
```

```nginx
server {
    listen 80;
    server_name globaltechnova.com www.globaltechnova.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable Sites
```bash
ln -s /etc/nginx/sites-available/api.globaltechnova.com /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/globaltechnova.com /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## 6. SSL Certificates (Let's Encrypt)

```bash
# Get SSL for both domains
certbot --nginx -d globaltechnova.com -d www.globaltechnova.com -d api.globaltechnova.com

# Auto-renewal test
certbot renew --dry-run
```

---

## 7. GitHub Deployment Setup

### Step 1: Install Git on VPS
```bash
ssh root@72.62.1.228
apt install git -y
```

### Step 2: Configure Git (First Time Only)
```bash
git config --global user.name "Yussef-Makhlouf"
git config --global user.email "yussef.ali.it@gmail.com"
```

### Step 3: Clone Repositories (First Time Setup)
```bash
# Remove old files and clone fresh from GitHub

# Backend
rm -rf /var/www/api.globaltechnova.com
git clone https://github.com/Yussef-Makhlouf/technova-main.git /var/www/api.globaltechnova.com
cd /var/www/api.globaltechnova.com

# Create .env file
nano config/.env
# (paste environment variables)

# Install and start
npm install
pm2 start index.js --name "technova-api"

# Frontend
rm -rf /var/www/globaltechnova.com
git clone https://github.com/Yussef-Makhlouf/TECHNOVA-website.git /var/www/globaltechnova.com
cd /var/www/globaltechnova.com

# Create .env.production file
nano .env.production
# (paste environment variables)

# Install, build and start
npm install
npm run build
pm2 start npm --name "technova-frontend" -- start
pm2 save
```

### Step 4: Update from GitHub (After Making Changes)

#### Quick Update Commands:
```bash
# Update Backend
cd /var/www/api.globaltechnova.com && git pull && npm install && pm2 restart technova-api

# Update Frontend
cd /var/www/globaltechnova.com && git pull && npm install && npm run build && pm2 restart technova-frontend
```

#### Or use these one-liner commands from your local machine:
```bash
# Update Backend (single command)
ssh root@72.62.1.228 "cd /var/www/api.globaltechnova.com && git pull origin main && npm install && pm2 restart technova-api"

# Update Frontend (single command)
ssh root@72.62.1.228 "cd /var/www/globaltechnova.com && git pull origin main && npm install && npm run build && pm2 restart technova-frontend"
```

### Step 5: Create Deploy Script on VPS (Optional)
```bash
# Create deploy script
nano /root/deploy.sh
```

Add this content:
```bash
#!/bin/bash
echo "🚀 Starting deployment..."

# Update Backend
echo "📦 Updating Backend..."
cd /var/www/api.globaltechnova.com
git pull origin main
npm install
pm2 restart technova-api
echo "✅ Backend updated!"

# Update Frontend
echo "📦 Updating Frontend..."
cd /var/www/globaltechnova.com
git pull origin main
npm install
npm run build
pm2 restart technova-frontend
echo "✅ Frontend updated!"

echo "🎉 Deployment complete!"
```

Make it executable:
```bash
chmod +x /root/deploy.sh
```

Now you can deploy with one command:
```bash
ssh root@72.62.1.228 "/root/deploy.sh"
```

---

## 8. Firewall Setup

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

---

## 9. Verification

After deployment, verify:
1. ✅ https://globaltechnova.com loads correctly
2. ✅ https://api.globaltechnova.com/api/v1/services returns data
3. ✅ Contact form sends email to `Info@globaltechnova.com`

---

## Useful PM2 Commands

```bash
pm2 list              # View running processes
pm2 logs              # View logs
pm2 restart all       # Restart all apps
pm2 stop technova-api # Stop specific app
```

---

## Quick Deploy (Windows Batch Scripts)

These scripts are in the project root folder. Double-click to run:

| Script | Description |
|--------|-------------|
| `deploy-backend.bat` | Updates backend only |
| `deploy-frontend.bat` | Updates frontend only |
| `deploy-all.bat` | Updates both (full deploy) |

### Workflow:
1. Make changes locally
2. Commit and push to GitHub: `git add . && git commit -m "message" && git push`
3. Double-click `deploy-all.bat` (or run from terminal)
4. Wait for deployment to complete
5. Your changes are live! 🎉

