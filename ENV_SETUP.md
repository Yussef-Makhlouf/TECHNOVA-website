# Environment Configuration Instructions

## ⚠️ IMPORTANT: Backend is running on PORT 8080

Your backend server is running on **port 8080**, not 5000.

## Create .env.local File

### Location:
```
c:\Users\yussef makhlouf\Downloads\futuristic-minimal-website-2\.env.local
```

### Content (UPDATED):
```env
# API Configuration for Local Development
# Backend is running on port 8080
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### For Production:
```env
# API Configuration for Production
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

## Quick Setup Commands

### Using PowerShell (RECOMMENDED):
```powershell
cd "c:\Users\yussef makhlouf\Downloads\futuristic-minimal-website-2"
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1" > .env.local
```

### Using Command Prompt:
```cmd
cd "c:\Users\yussef makhlouf\Downloads\futuristic-minimal-website-2"
echo NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1 > .env.local
```

### Manual Creation:
1. Open Notepad or VS Code
2. Create new file
3. Paste: `NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1`
4. Save as `.env.local` in project root

## After Creating .env.local

**RESTART your frontend development server:**
```bash
# In the terminal running pnpm dev:
# Press Ctrl+C to stop
# Then run:
pnpm dev
```

## Verify Configuration

The frontend will now connect to `http://localhost:8080/api/v1` instead of the production URL.

## Backend Status
✅ Backend is running on port 8080
✅ Database connected
✅ All routes working (except review route - commented out)
