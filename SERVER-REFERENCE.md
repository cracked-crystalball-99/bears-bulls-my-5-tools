# AI Proxy Server - Quick Reference

## 🚀 Starting the Server

### Method 1: Quick Start (Recommended)
```powershell
.\quick-start.ps1
```
**Does everything:**
- Starts proxy server in new window
- Opens browser automatically
- Ready to use!

### Method 2: Just the Server
```powershell
.\start-ai-server.ps1
```
**Then manually:**
- Open browser to: http://localhost/trading-analysis-master-localhost

### Method 3: Manual
```powershell
cd c:\Users\tony_\Projects\trading-analysis-master
python ai-proxy-server.py
```

## 🛑 Stopping the Server

### Method 1: Use Stop Script
```powershell
.\stop-ai-server.ps1
```
Finds and stops all proxy server processes.

### Method 2: Manual
- Go to the server terminal window
- Press: **Ctrl + C**

## ✅ Check if Server is Running

**In browser:**
```
http://localhost:3001/health
```
Should show: `{"status": "healthy", ...}`

**In PowerShell:**
```powershell
Invoke-WebRequest http://localhost:3001/health
```

## 📋 Typical Workflow

**Start working:**
```powershell
.\quick-start.ps1
```

**When done:**
```powershell
.\stop-ai-server.ps1
```

That's it!

## 🔧 Troubleshooting

**Server won't start?**
- Check if port 3001 is already in use
- Check API key file exists: `$env:USERPROFILE\Documents\trading-ai-keys.txt`

**Server starts but browser can't connect?**
- Wait 5 seconds after starting
- Check health endpoint: http://localhost:3001/health

**API key not working?**
- Verify key in: `$env:USERPROFILE\Documents\trading-ai-keys.txt`
- Key should start with: `sk-ant-`

## 📁 Files

- `start-ai-server.ps1` - Start proxy server
- `stop-ai-server.ps1` - Stop proxy server  
- `quick-start.ps1` - Start everything at once
- `ai-proxy-server.py` - The actual proxy server

## 💡 Tips

- Keep server window open while working
- Server runs until you stop it (Ctrl+C)
- Can run 24/7 if needed (uses minimal resources)
- API key loaded from file automatically
