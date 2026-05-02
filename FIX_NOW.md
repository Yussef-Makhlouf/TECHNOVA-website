# 🔧 QUICK FIX - Run These Commands

## Step 1: Create .env.local File

**Copy and paste this command in PowerShell:**

```powershell
Set-Content -Path "c:\Users\yussef makhlouf\Downloads\futuristic-minimal-website-2\.env.local" -Value "NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1"
```

**Or create the file manually:**
1. Create a new file named `.env.local` in: `c:\Users\yussef makhlouf\Downloads\futuristic-minimal-website-2\`
2. Add this single line:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   ```
3. Save the file

---

## Step 2: Verify File Was Created

```powershell
Get-Content "c:\Users\yussef makhlouf\Downloads\futuristic-minimal-website-2\.env.local"
```

Should display:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

---

## Step 3: Restart Frontend Server

**CRITICAL:** You MUST restart the frontend for the changes to take effect!

1. Go to the terminal running `pnpm dev`
2. Press **Ctrl+C** to stop the server
3. Wait for it to fully stop
4. Run: `pnpm dev`

---

## ✅ After Restart:

The timeout error will be gone! Your frontend will now connect to:
- ✅ `http://localhost:8080/api/v1` (your local backend)

Instead of:
- ❌ `https://technova-main.vercel.app/api/v1` (production)

---

## 🎯 That's It!

Once you restart the frontend, everything will work perfectly:
- ✅ No more timeout errors
- ✅ Frontend connects to local backend
- ✅ All CRUD operations work
- ✅ Image uploads work
- ✅ No icon/color fields

---

## Alternative: Use VS Code

1. Open VS Code in your project folder
2. Create new file: `.env.local`
3. Add: `NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1`
4. Save
5. Restart `pnpm dev` terminal
