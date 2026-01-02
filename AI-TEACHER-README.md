# AI Trading Teacher - Setup Guide

## Overview

The AI Trading Teacher is an intelligent assistant that helps users understand technical indicators and interpret trading analysis results. It can run in three modes:

1. **Local Mode**: Basic knowledge base (no API key required)
2. **OpenAI Mode**: Full AI capabilities using GPT models
3. **Anthropic Mode**: Full AI capabilities using Claude models

## Features

- 🎓 **Educational Guidance**: Explains technical indicators in simple terms
- 💬 **Interactive Chat**: Ask questions and get instant answers
- 📊 **Context-Aware**: Understands your current analysis results
- 🔒 **Secure**: API keys stored only in browser session (never sent to your server)
- 💰 **Cost-Effective**: Uses affordable AI models (GPT-4o-mini or Claude Haiku)
- 🌐 **Works Anywhere**: Local testing and GitHub Pages deployment

## Quick Start

### 1. Integration (Already Done!)

The AI teacher is integrated into your trading analysis tool. You'll see a floating chat widget in the bottom-right corner of the page.

### 2. Local Testing

**Option A: Using the existing PowerShell script**
```powershell
.\deploy-localhost.ps1
```

**Option B: Using Python HTTP Server**
```powershell
python -m http.server 8000
```

Then open: `http://localhost:8000`

### 3. Using Local Mode (No API Key)

1. Click the **AI Trading Teacher** widget in the bottom-right
2. Ask questions like:
   - "What is VIP%?"
   - "How do I use this tool?"
   - "What is ADX?"

The local mode provides basic explanations using the built-in knowledge base.

### 4. Using AI Mode (Recommended for Full Experience)

#### Getting an OpenAI API Key:

1. Visit https://platform.openai.com/api-keys
2. Create an account or sign in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)

**Cost**: GPT-4o-mini costs ~$0.15 per 1M input tokens. A typical conversation uses 500-1000 tokens per message, making it very affordable (~$0.0001-0.0002 per message).

#### Getting an Anthropic API Key:

1. Visit https://console.anthropic.com/settings/keys
2. Create an account or sign in
3. Generate a new API key
4. Copy the key (starts with `sk-ant-...`)

**Cost**: Claude Haiku is similarly affordable to GPT-4o-mini.

#### Configuring the AI:

1. Click the **⚙️ Settings** button in the AI widget
2. Select your provider (OpenAI or Anthropic)
3. Paste your API key
4. Click **Save Settings**

Now you have full AI capabilities!

## GitHub Pages Deployment

Your AI teacher works perfectly on GitHub Pages because:
- All API calls go directly from the user's browser to OpenAI/Anthropic
- No server-side processing required
- API keys never touch your server

### Deploy to GitHub Pages:

1. **Commit the new files:**
```powershell
git add ai-teacher.js ai-teacher-ui.js ai-teacher-styles.css AI-TEACHER-README.md
git commit -m "Add AI Trading Teacher assistant"
git push origin main
```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be live at: `https://[username].github.io/[repo-name]/`

3. **Test it:**
   - Visit your GitHub Pages URL
   - The AI Teacher widget should appear in the bottom-right
   - Try asking questions in both Local and AI modes

## Security & Privacy

✅ **What's Secure:**
- API keys stored only in browser's sessionStorage (cleared when tab closes)
- Never sent to your GitHub repository or server
- Direct browser-to-AI-provider communication
- User data never logged or stored

⚠️ **User Responsibilities:**
- Don't share your API key with others
- Monitor your API usage in OpenAI/Anthropic dashboard
- Set spending limits in your AI provider account

## API Cost Estimates

### Typical Usage Costs:

| Messages per Day | Estimated Monthly Cost (GPT-4o-mini) |
|-----------------|-------------------------------------|
| 10 messages     | ~$0.006 ($0.20/month)              |
| 50 messages     | ~$0.03 ($1.00/month)               |
| 200 messages    | ~$0.12 ($4.00/month)               |

💡 **Tip**: Start with Local mode to try it out, then upgrade to AI mode when you want more detailed explanations.

## Features in Detail

### 1. Quick Actions
Pre-defined questions you can click:
- "What is VIP%?" - Explains the voting system
- "Explain Results" - Analyzes your current results
- "What is ADX?" - Explains Average Directional Index
- "How to Use" - Tutorial for the tool

### 2. Context-Aware Responses
The AI automatically reads your current VIP% results and includes them in its analysis when you ask about your results.

### 3. Conversation History
The AI remembers your last 10 messages for context in ongoing conversations.

### 4. Educational Focus
All responses include the disclaimer: *"This is educational content, not financial advice."*

## Troubleshooting

### "API Error" messages:
- Check that your API key is correct
- Verify you have credits in your OpenAI/Anthropic account
- Try switching to Local mode temporarily

### Widget not appearing:
- Clear browser cache and reload
- Check browser console for errors (F12)
- Ensure all three files (ai-teacher.js, ai-teacher-ui.js, ai-teacher-styles.css) are loaded

### API key not saving:
- Check that you clicked "Save Settings"
- Some browsers block sessionStorage in private mode
- Try regular browsing mode

## Customization

### Adding More Indicators to Knowledge Base:

Edit [ai-teacher.js](ai-teacher.js) and add to `this.knowledgeBase`:

```javascript
myNewIndicator: {
    name: "My New Indicator",
    description: "What it measures...",
    interpretation: "How to use it..."
}
```

### Changing AI Model:

Edit the model name in [ai-teacher.js](ai-teacher.js):

```javascript
// For OpenAI
model: 'gpt-4o-mini', // or 'gpt-4o', 'gpt-3.5-turbo'

// For Anthropic
model: 'claude-3-haiku-20240307', // or 'claude-3-sonnet-20240229'
```

### Styling:

Edit [ai-teacher-styles.css](ai-teacher-styles.css) to change colors, sizes, positions, etc.

## Advanced: Adding Gemini Support

Want to add Google's Gemini AI? Here's how:

1. Edit `ai-teacher.js` and add:

```javascript
async askGemini() {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: this.getSystemPrompt() + '\n\n' + 
                          this.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n\n')
                }]
            }]
        })
    });

    if (!response.ok) {
        throw new Error('Gemini API error');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}
```

2. Add to provider selection and initialize method

3. Get API key from https://makersuite.google.com/app/apikey

## Support & Feedback

For issues or suggestions:
1. Check this README first
2. Look at browser console (F12) for errors
3. Test in Local mode to isolate API issues
4. Check your API provider's status page

## License

Same license as the main trading analysis tool (MIT).

---

**Remember**: This AI teacher provides educational content only, not financial advice. Always do your own research and consult with qualified financial advisors before making trading decisions.
