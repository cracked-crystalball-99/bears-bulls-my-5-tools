# Quick Start Guide - AI Trading Teacher

## ✅ Setup Complete!

Your AI Trading Teacher has been successfully installed in both locations:
1. **Main Project**: `c:\Users\tony_\Projects\trading-analysis-master`
2. **XAMPP Local**: `C:\xampp\htdocs\trading-analysis-master-localhost`

## 🚀 Testing Locally with XAMPP

### Start XAMPP:
1. Open XAMPP Control Panel
2. Start **Apache** service
3. Open your browser and go to: **http://localhost/trading-analysis-master-localhost**

You should see your trading analysis tool with a new **AI Trading Teacher** widget in the bottom-right corner! 🎓

## 🎯 How to Use the AI Teacher

### Local Mode (No API Key Required)
1. Click the AI Teacher widget to expand it
2. Try these quick actions:
   - **"What is VIP%?"** - Explains the voting system
   - **"What is ADX?"** - Explains the indicator
   - **"How to Use"** - Shows usage guide
3. Or type your own questions in the chat box

### AI Mode (Full Capabilities)
1. Click the **⚙️ Settings** button
2. Choose your provider:
   - **OpenAI (GPT)** - Recommended for beginners
   - **Anthropic (Claude)** - Alternative option
3. Enter your API key (see below for how to get one)
4. Click **Save Settings**
5. Now ask more complex questions!

## 🔑 Getting API Keys (Optional but Recommended)

### OpenAI (GPT-4o-mini) - Affordable & Powerful
1. Visit: https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)
5. **Cost**: ~$0.15 per 1 million tokens (very cheap!)

### Anthropic (Claude Haiku)
1. Visit: https://console.anthropic.com/settings/keys
2. Sign up or log in
3. Generate API key
4. Copy the key (starts with `sk-ant-...`)

## 📝 Example Questions to Ask

**For Beginners:**
- "What is technical analysis?"
- "Explain ADX in simple terms"
- "What do the VIP percentages mean?"
- "How should I interpret my results?"

**For Analysis Help:**
- "My VIP shows 65% buy and 35% sell. What does this mean?"
- "Explain the difference between ADX and RSI"
- "When should I look at Bollinger Bands?"

**For Trading Education:**
- "What's the difference between momentum and trend indicators?"
- "How do these 5 tools work together?"
- "What's a good ADX value to look for?"

## 🧪 Quick Test

1. **Test Local Mode:**
   - Open http://localhost/trading-analysis-master-localhost
   - Click AI widget
   - Ask: "What is VIP%?"
   - You should get an instant response

2. **Test with Real Data:**
   - Upload one of the CSV files (AMZN.csv, GME.csv, or BHP.AX.csv)
   - Wait for analysis to complete
   - Ask AI: "Explain my current results"
   - The AI will reference your actual VIP percentages!

## 🌐 Deploy to GitHub Pages

Once you've tested locally and are happy with it:

```powershell
# From your project directory
cd c:\Users\tony_\Projects\trading-analysis-master

# Add all new files
git add ai-teacher.js ai-teacher-ui.js ai-teacher-styles.css
git add AI-TEACHER-README.md AI-TEACHER-TESTING.md QUICK-START.md

# Commit with a message
git commit -m "Add AI Trading Teacher assistant"

# Push to GitHub
git push origin main
```

Then enable GitHub Pages:
1. Go to your GitHub repository
2. Settings → Pages
3. Source: **main** branch
4. Save
5. Your site will be live in 1-2 minutes!

## 📊 Features Included

✅ **Interactive Chat Interface** - Clean, modern design
✅ **Context-Aware Responses** - Reads your current analysis
✅ **Quick Action Buttons** - Common questions pre-loaded
✅ **Local Knowledge Base** - Works without API key
✅ **AI Integration** - OpenAI & Anthropic support
✅ **Mobile Responsive** - Works on phones & tablets
✅ **Secure** - API keys stored in session only (never on server)
✅ **Privacy First** - No data collection or logging

## 💡 Tips

- **Start with Local Mode** to explore the UI without costs
- **API costs are minimal** - expect $0.20-1.00/month for regular use
- **Set spending limits** in your AI provider dashboard
- **The AI disclaims financial advice** - it's educational only
- **Conversation history** is kept (last 10 messages) for context

## ⚠️ Important Notes

- API keys are stored in your browser's session storage (cleared when you close the tab)
- Never share your API keys with others
- The AI provides educational content, not financial advice
- Always do your own research before making trading decisions

## 🆘 Troubleshooting

**Widget not appearing?**
- Hard refresh: Ctrl + Shift + R
- Check browser console (F12) for errors

**API key not working?**
- Verify you copied the entire key
- Check you have credits in your account
- Try the key in the provider's playground first

**Want to remove it?**
- Just delete the three AI teacher files
- Remove the script tags from index.html

## 📚 Documentation

- **Full Guide**: AI-TEACHER-README.md
- **Testing Guide**: AI-TEACHER-TESTING.md
- **This File**: QUICK-START.md

---

**You're all set! 🎉** 

Open http://localhost/trading-analysis-master-localhost and start chatting with your AI trading teacher!

Questions? Check the full documentation in AI-TEACHER-README.md
