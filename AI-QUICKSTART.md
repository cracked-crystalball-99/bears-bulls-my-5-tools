# 🚀 AI Trading Teacher - Quick Start Guide

**Get your AI assistant running in 15 minutes!**

---

## 📋 Overview

This guide will help you:
1. ✅ Get an Anthropic API key (5 min)
2. ✅ Set spending limits ($5/month)
3. ✅ Test locally with XAMPP (5 min)
4. ✅ Deploy to GitHub Pages (5 min)
5. ✅ Use across multiple apps with one key

---

## 🎯 Step 1: Get Your Anthropic API Key

### Sign Up & Get Key:

1. **Visit**: https://console.anthropic.com/
2. **Sign up** with email or Google/GitHub account
3. **Verify email** if prompted
4. Navigate to: **Settings → API Keys**
   - Direct link: https://console.anthropic.com/settings/keys
5. Click **"Create Key"**
6. Name it: `Trading Analysis Tool`
7. **Copy the key** immediately (starts with `sk-ant-...`)

⚠️ **Important**: Save it now! You can't view it again after closing the window.

### New User Benefits:
- 🎁 **$5 free credit** for new accounts
- 📊 That's ~12,500 questions with Claude Haiku
- ⏱️ Enough for 3-6 months of regular use

---

## 💰 Step 2: Set Spending Limit ($5/month)

**Protect yourself from unexpected charges:**

1. In Anthropic Console → **Settings → Billing**
2. Find **"Spending Limits"** or **"Budget Controls"**
3. Set **Monthly Limit: $5.00**
4. Enable **Email Alerts** at 80% usage ($4.00)
5. Click **Save**

✅ Service automatically stops at limit (no overage charges)

### Expected Costs at $5/month:
- **~12,500 queries** per month
- **~400 queries** per day
- **Perfect for** testing + regular personal use

---

## 🔐 Step 3: Store Your API Key Safely

### Option A: Local File (Quick & Easy)

**Windows PowerShell:**
```powershell
# Create secure storage outside Git repo
New-Item -Path "$env:USERPROFILE\Documents\api-keys.txt" -ItemType File -Force
Add-Content -Path "$env:USERPROFILE\Documents\api-keys.txt" -Value "=== ANTHROPIC API KEY ==="
Add-Content -Path "$env:USERPROFILE\Documents\api-keys.txt" -Value "Trading Tool: sk-ant-YOUR-KEY-HERE"
Add-Content -Path "$env:USERPROFILE\Documents\api-keys.txt" -Value "Created: $(Get-Date)"
notepad "$env:USERPROFILE\Documents\api-keys.txt"
```

**File location**: `C:\Users\[YourName]\Documents\api-keys.txt`

### Option B: Password Manager (Most Secure)

Store in:
- 1Password
- LastPass
- Bitwarden
- Windows Credential Manager

### Option C: Environment Variable

```powershell
# Set for current session only
$env:ANTHROPIC_API_KEY = "sk-ant-YOUR-KEY-HERE"
```

---

## 🧪 Step 4: Test on Localhost

### Start Your Local Server:

**If using XAMPP:**
1. Open **XAMPP Control Panel**
2. Start **Apache**
3. Visit: http://localhost/trading-analysis-master-localhost

**If using Python:**
```powershell
cd c:\Users\tony_\Projects\trading-analysis-master
python -m http.server 8000
# Visit: http://localhost:8000
```

### Configure AI Teacher:

1. Find the **🎓 AI Trading Teacher** widget (bottom-right corner)
2. Click to expand
3. Click **⚙️ Settings** button
4. Select **"Anthropic (Claude)"** from dropdown
5. Paste your API key
6. Click **"Save Settings"**
7. Status should show: **"Connected"** ✅

### Run Test Queries:

#### Test #1: Basic Response
```
Ask: "What is VIP%?"
Expected: Detailed explanation of the voting system
```

#### Test #2: Context Awareness
```
1. Upload AMZN.csv (in project folder)
2. Wait for analysis to complete
3. Ask: "Analyze my current VIP results in detail"
Expected: Claude references your actual percentages
```

#### Test #3: Conversation Flow
```
Ask: "What is ADX?"
Then: "What's a good value?"
Then: "How does it relate to trend strength?"
Expected: Claude remembers context and builds on previous answers
```

#### Test #4: Complex Analysis
```
Ask: "My VIP shows 65% buy and 35% sell, but ADX is only 18. Should I be concerned?"
Expected: Detailed analysis explaining the conflict between signals
```

#### Test #5: Educational
```
Ask: "I'm new to trading. Explain these 5 indicators like I'm a beginner."
Expected: Simple, clear explanations with examples
```

### ✅ Success Indicators:

- Widget status shows "Connected"
- Responses are detailed and contextual (not generic)
- Claude mentions your specific percentages when analyzing results
- Conversation flows naturally with follow-up questions
- Response time is 1-3 seconds

---

## 🌐 Step 5: Deploy to GitHub Pages

### Commit & Push:

```powershell
# Navigate to project
cd c:\Users\tony_\Projects\trading-analysis-master

# Check status
git status

# Add AI teacher files
git add ai-teacher.js ai-teacher-ui.js ai-teacher-styles.css
git add index.html
git add AI-TEACHER-README.md AI-TEACHER-TESTING.md AI-QUICKSTART.md

# Commit
git commit -m "Add AI Trading Teacher with Anthropic Claude integration"

# Push to GitHub
git push origin main
```

### Enable GitHub Pages:

1. Go to your GitHub repository
2. Click **Settings** tab
3. Scroll to **Pages** (left sidebar)
4. Under **Source**:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes for deployment

### Your Live URL:
```
https://[your-username].github.io/trading-analysis-master/
```

### Test on GitHub Pages:

1. Open your live URL
2. Configure AI Teacher (same as localhost)
3. Run the same 5 test queries
4. Verify identical behavior

✅ **Works the same** because API calls go directly from user's browser to Anthropic!

---

## 🔒 Security Best Practices

### ✅ DO:
- Store API key in sessionStorage (done automatically)
- Use password manager or secure local file
- Set spending limits
- Enable email alerts
- Close tab when done (clears key from browser)

### ❌ DON'T:
- Commit API key to Git
- Hardcode key in JavaScript files
- Share key with others
- Store in localStorage (use sessionStorage)
- Leave key in public code

### Verify Your Repo is Safe:

```powershell
# Check for accidental key commits
cd c:\Users\tony_\Projects\trading-analysis-master
git grep "sk-ant-"
# Should return: nothing (empty)
```

### .gitignore Protection:

Your `.gitignore` should include:
```
# API Keys - Never commit these!
api-keys.txt
.env
*.key
*-key.txt

# Personal config
config-local.js
secrets.json
```

---

## 📊 Step 6: Monitor Usage & Costs

### Daily Monitoring (First Week):

1. Visit: https://console.anthropic.com/settings/usage
2. Check **Usage Dashboard**:
   - Queries today
   - Tokens consumed
   - Current spend
3. Review patterns
4. Adjust limit if needed

### What to Expect:

**Light Use** (10-20 queries/day):
- ~$0.10-0.20/month
- Well under $5 limit
- Perfect for personal learning

**Regular Use** (40-60 queries/day):
- ~$0.50-1.00/month
- Still very affordable
- Great for active analysis

**Heavy Use** (100+ queries/day):
- ~$2-4/month
- Hitting the limit
- Consider raising to $10/month if valuable

---

## 🎓 Example Usage Scenarios

### Scenario 1: Learning Mode
```
Daily: 5-10 educational questions
Cost: ~$0.05-0.10/month
Use: Understanding indicators
```

### Scenario 2: Active Trader
```
Daily: 20-30 analysis queries
Cost: ~$0.30-0.60/month
Use: Analyzing your daily trades
```

### Scenario 3: Multiple Apps
```
Same key for:
- Trading tool: $0.50/month
- Chess assistant: $0.30/month
- Study helper: $0.40/month
Total: $1.20/month (all under one key!)
```

---

## 🔁 Using Same Key Across Apps

### ✅ One Key, Multiple Projects:

Your Anthropic API key works across:
- This trading tool
- Other web apps
- Desktop applications
- Chrome extensions
- Personal scripts
- Mobile apps

### Benefits:
- **Simpler billing** - One account, one bill
- **Combined free credit** - $5 goes further
- **Unified monitoring** - See all usage in one dashboard
- **Easier management** - One key to secure

### Cost Tracking:
- Dashboard shows **total** usage
- Can't distinguish between apps automatically
- Set higher limit if using multiple apps
- Example: $10/month for 3-5 apps

---

## 🛠️ Troubleshooting

### Problem: "AI Teacher not initialized"
**Solution:**
```powershell
# Refresh fixed version
cd c:\Users\tony_\Projects\trading-analysis-master
Copy-Item "ai-teacher.js" "C:\xampp\htdocs\trading-analysis-master-localhost\" -Force
# Hard refresh browser: Ctrl + Shift + R
```

### Problem: "API Error" or "Invalid Key"
**Solutions:**
- Verify key copied correctly (no spaces)
- Check you have credits in Anthropic account
- Try key in Anthropic's playground first
- Generate new key if needed

### Problem: Widget Not Appearing
**Solutions:**
- Hard refresh: Ctrl + Shift + R
- Clear browser cache
- Check browser console (F12) for errors
- Verify all 3 files loaded (ai-teacher.js, ai-teacher-ui.js, ai-teacher-styles.css)

### Problem: Responses Too Generic
**Check:**
- Are you in Local mode instead of Anthropic mode?
- Is status showing "Connected"?
- Try asking Claude to "be more specific"

### Problem: Hit Spending Limit
**Solutions:**
- Wait until next month (limit resets)
- Increase limit in Anthropic Console
- Optimize queries (be more concise)

---

## 📚 Quick Reference

### Essential Links:
- **Anthropic Console**: https://console.anthropic.com/
- **API Keys**: https://console.anthropic.com/settings/keys
- **Usage Dashboard**: https://console.anthropic.com/settings/usage
- **Documentation**: https://docs.anthropic.com/

### Commands:

**View stored key:**
```powershell
notepad "$env:USERPROFILE\Documents\api-keys.txt"
```

**Test for key leaks:**
```powershell
git grep "sk-ant-"
```

**Deploy updates:**
```powershell
git add .
git commit -m "Update"
git push origin main
```

**Copy to XAMPP:**
```powershell
Copy-Item "ai-teacher*.js" "C:\xampp\htdocs\trading-analysis-master-localhost\" -Force
Copy-Item "ai-teacher*.css" "C:\xampp\htdocs\trading-analysis-master-localhost\" -Force
```

---

## ✅ Checklist

Complete setup:

- [ ] Created Anthropic account
- [ ] Got API key (starts with sk-ant-)
- [ ] Set $5/month spending limit
- [ ] Enabled email alerts
- [ ] Stored key securely (Documents folder or password manager)
- [ ] Tested on localhost (5 test queries)
- [ ] All tests passed successfully
- [ ] Committed code to Git (without API key!)
- [ ] Pushed to GitHub
- [ ] Enabled GitHub Pages
- [ ] Tested on live site
- [ ] Verified .gitignore includes sensitive files
- [ ] Bookmarked usage dashboard

---

## 🎯 Next Steps

### After Setup:

1. **Use it regularly** - Get comfortable with queries
2. **Test different questions** - Explore capabilities
3. **Monitor costs** - Check dashboard weekly
4. **Adjust limits** - Increase if needed
5. **Expand usage** - Use same key for other projects

### Advanced Features to Explore:

- Ask about specific indicator combinations
- Request step-by-step analysis walkthroughs
- Get educational explanations at different levels
- Compare results across different time periods
- Ask "what if" scenario questions

---

## 💡 Pro Tips

1. **Start conversations with context**: "I'm analyzing AMZN stock with 5 months of data..."
2. **Ask follow-up questions**: Claude remembers last 10 messages
3. **Be specific**: "My ADX is 35, RSI is 72" vs "My indicators are high"
4. **Request clarification**: "Can you explain that more simply?"
5. **Use for learning**: "Why is this indicator important?"

---

## 🎉 You're Ready!

Your AI Trading Teacher is now:
- ✅ Configured locally
- ✅ Deployed to GitHub Pages  
- ✅ Cost-limited to $5/month
- ✅ Securely set up
- ✅ Ready for intelligent conversations

**Time to start learning!** 🎓📊

Ask your first question and see the power of AI-assisted trading education.

---

**Questions?** Check the full documentation:
- [AI-TEACHER-README.md](AI-TEACHER-README.md) - Complete guide
- [AI-TEACHER-TESTING.md](AI-TEACHER-TESTING.md) - Testing procedures
- [QUICK-START.md](QUICK-START.md) - Basic overview

**Happy Trading & Learning! 🚀**
