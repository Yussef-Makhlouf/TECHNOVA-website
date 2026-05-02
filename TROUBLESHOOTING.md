# 🔍 Troubleshooting: Database Timeout Error

## Error You're Seeing:
```json
{
  "success": false,
  "message": "Operation `services.findOne()` buffering timed out after 10000ms"
}
```

## What This Means:
This error occurs when Mongoose (MongoDB driver) tries to execute a query but can't connect to the database within 10 seconds. However, your **backend IS connected** to the database (we can see successful requests in the terminal).

## Root Cause:
The frontend is likely **still connecting to the production URL** instead of your local backend (port 8080).

---

## ✅ Solution Steps:

### Step 1: Verify `.env.local` Exists

**Check if the file exists:**
```powershell
cd "c:\Users\yussef makhlouf\Downloads\futuristic-minimal-website-2"
Get-Content .env.local
```

**If it doesn't exist or shows wrong content, create it:**
```powershell
Set-Content -Path ".env.local" -Value "NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1"
```

**Verify it was created:**
```powershell
Get-Content .env.local
```

Should show:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

---

### Step 2: Restart Frontend Server

**IMPORTANT:** Next.js only reads `.env.local` on startup!

```bash
# In the terminal running pnpm dev:
# 1. Press Ctrl+C to stop the server
# 2. Wait for it to fully stop
# 3. Run:
pnpm dev
```

---

### Step 3: Verify Connection in Browser

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Refresh the page
4. Look for API requests
5. Check if they're going to:
   - ✅ `http://localhost:8080/api/v1/...` (CORRECT)
   - ❌ `http://localhost:8080/api/v1/...` (WRONG - still using production)

---

### Step 4: Check Console for API URL

Add this to your browser console to verify:
```javascript
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)
```

Should show: `http://localhost:8080/api/v1`

---

## 🔍 Quick Diagnostic Commands

### Check if .env.local exists:
```powershell
Test-Path "c:\Users\yussef makhlouf\Downloads\futuristic-minimal-website-2\.env.local"
```
Should return: `True`

### View .env.local content:
```powershell
Get-Content "c:\Users\yussef makhlouf\Downloads\futuristic-minimal-website-2\.env.local"
```
Should show: `NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1`

### Test backend directly:
```powershell
curl http://localhost:8080/api/v1/services
```
Should return JSON with services data

---

## 🎯 Most Likely Issue:

**Frontend hasn't been restarted after creating `.env.local`**

Next.js caches environment variables on startup. You MUST restart the dev server for changes to take effect.

---

## ✅ Verification Checklist:

- [ ] `.env.local` file exists in project root
- [ ] `.env.local` contains: `NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1`
- [ ] Frontend dev server has been **restarted** (Ctrl+C then `pnpm dev`)
- [ ] Browser DevTools shows requests going to `localhost:8080`
- [ ] Backend terminal shows incoming requests (GET /api/v1/services, etc.)

---

## 📊 Current Status:

**Backend:**
- ✅ Running on port 8080
- ✅ Database connected
- ✅ Responding to requests (see terminal logs)
- ✅ CORS enabled

**Frontend:**
- ⚠️ Needs `.env.local` file
- ⚠️ Needs restart after creating `.env.local`
- ⚠️ Currently showing timeout errors (connecting to wrong URL)

---

## 🚀 Quick Fix (Copy-Paste):

```powershell
# Navigate to project
cd "c:\Users\yussef makhlouf\Downloads\futuristic-minimal-website-2"

# Create .env.local
Set-Content -Path ".env.local" -Value "NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1"

# Verify it was created
Get-Content .env.local

# Now restart your frontend (Ctrl+C in the pnpm dev terminal, then run pnpm dev again)
```

After restarting, the timeout error should disappear!
