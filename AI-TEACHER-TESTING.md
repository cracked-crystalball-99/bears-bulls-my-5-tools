# AI Trading Teacher - Testing Guide

## Local Testing (Before GitHub Deployment)

### Method 1: Using Your Existing Deploy Script (Recommended)

```powershell
# From the project root directory
.\deploy-localhost.ps1
```

Then open your browser to the URL shown (typically `http://localhost:8080`)

### Method 2: Using Python HTTP Server

```powershell
# Navigate to your project directory
cd c:\Users\tony_\Projects\trading-analysis-master

# Start Python server
python -m http.server 8000

# Open in browser: http://localhost:8000
```

### Method 3: Using Node.js http-server (if you have Node.js)

```powershell
# Install http-server globally (once)
npm install -g http-server

# Start server
http-server -p 8000

# Open in browser: http://localhost:8000
```

## Testing Checklist

### 1. Visual Verification
- [ ] AI Teacher widget appears in bottom-right corner
- [ ] Widget shows "🎓 AI Trading Teacher" header
- [ ] Status shows "Not Connected" initially
- [ ] Widget can be minimized/expanded with + / − button

### 2. Local Mode Testing (No API Key)
- [ ] Click on the AI widget to expand it
- [ ] Try quick action buttons:
  - [ ] "What is VIP%?" - Should get explanation
  - [ ] "What is ADX?" - Should get ADX explanation
  - [ ] "How to Use" - Should get usage guide
- [ ] Type a question: "What is RSI?"
- [ ] Verify you get a response from local knowledge base
- [ ] Check that response includes note about API key for detailed help

### 3. Settings Modal
- [ ] Click the ⚙️ (settings) button
- [ ] Modal opens with settings form
- [ ] Provider dropdown has three options:
  - [ ] Local (No API Key)
  - [ ] OpenAI (GPT)
  - [ ] Anthropic (Claude)
- [ ] Selecting OpenAI or Anthropic shows API key field
- [ ] Selecting Local hides API key field
- [ ] Can close modal with × button

### 4. API Integration Testing (Optional - Requires API Key)

#### With OpenAI:
1. [ ] Get test API key from https://platform.openai.com/api-keys
2. [ ] Open settings, select "OpenAI (GPT)"
3. [ ] Paste API key
4. [ ] Click "Save Settings"
5. [ ] Status changes to "Connected"
6. [ ] Ask: "Explain what ADX means and how I should use it"
7. [ ] Verify you get detailed AI response (not just knowledge base)
8. [ ] Try: "What does it mean if my VIP% shows 60% buy and 40% sell?"
9. [ ] Verify AI provides contextual analysis

#### With Anthropic:
1. [ ] Get test API key from https://console.anthropic.com/settings/keys
2. [ ] Follow same steps as OpenAI but select "Anthropic (Claude)"
3. [ ] Test same questions

### 5. Context-Aware Testing
1. [ ] Upload a CSV file (use AMZN.csv or GME.csv from project)
2. [ ] Wait for analysis to complete
3. [ ] Check the VIP% row in the Votes table
4. [ ] Ask AI: "Explain my current results"
5. [ ] Verify AI mentions the actual percentages from your analysis

### 6. Conversation History
- [ ] Ask: "What is ADX?"
- [ ] Then ask: "What would be a good value for it?"
- [ ] Verify AI understands "it" refers to ADX from previous message

### 7. Clear API Key
- [ ] Click settings → "Clear API Key"
- [ ] Verify status changes to "Not Connected"
- [ ] Verify you're back to local mode
- [ ] API key field is cleared

### 8. Mobile Responsive Testing
- [ ] Open browser dev tools (F12)
- [ ] Toggle device toolbar (mobile view)
- [ ] Verify widget adjusts to mobile screen
- [ ] Verify chat is usable on mobile
- [ ] Quick action buttons should be scrollable horizontally

### 9. Error Handling
- [ ] Try invalid API key
- [ ] Verify you get helpful error message
- [ ] Verify fallback to local mode suggestion

### 10. Performance
- [ ] Widget loads without blocking page
- [ ] No console errors in browser (F12 → Console)
- [ ] Chat messages appear smoothly
- [ ] Typing indicator shows while waiting for response

## Common Issues During Testing

### Issue: Widget Not Appearing
**Solutions:**
- Hard refresh: Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)
- Check browser console (F12) for errors
- Verify all three files are in the root directory:
  - ai-teacher.js
  - ai-teacher-ui.js
  - ai-teacher-styles.css
- Check that index.html includes all three files

### Issue: "API Key Error"
**Solutions:**
- Verify API key is correct (no extra spaces)
- Check you have credits in your OpenAI/Anthropic account
- Try the API key directly in provider's playground first
- Switch to Local mode temporarily

### Issue: Conversation Not Working in Local Mode
**Solutions:**
- This is expected for complex questions
- Local mode provides basic info only
- Switch to AI mode for full capabilities

### Issue: Context Not Being Captured
**Solutions:**
- Verify VIP% row exists in the votes table
- Check console for JavaScript errors
- Make sure you've uploaded and processed data first

## GitHub Pages Testing

After deploying to GitHub Pages:

1. [ ] Visit your GitHub Pages URL
2. [ ] Run through the same testing checklist above
3. [ ] Verify API calls work (check Network tab in DevTools)
4. [ ] Test on different devices:
   - [ ] Desktop Chrome
   - [ ] Desktop Firefox
   - [ ] Desktop Safari (if available)
   - [ ] Mobile Chrome
   - [ ] Mobile Safari (iOS)

## Security Testing

- [ ] Verify API key is in sessionStorage (not localStorage)
- [ ] Close tab and reopen - verify API key is cleared
- [ ] Check Network tab - verify API calls go directly to OpenAI/Anthropic
- [ ] Verify no API key appears in URL or console logs
- [ ] Test in private/incognito mode

## Performance Testing

### Check Load Times:
1. Open DevTools (F12) → Network tab
2. Hard refresh (Ctrl + Shift + R)
3. Check file sizes:
   - ai-teacher.js: ~10-15 KB
   - ai-teacher-ui.js: ~8-12 KB
   - ai-teacher-styles.css: ~4-6 KB
4. Total added weight: ~25-35 KB (minimal impact)

### Check API Response Times:
1. Send a question with API key configured
2. Check Network tab for API request
3. Response should come back in 1-3 seconds typically

## Reporting Issues

If you find issues during testing:

1. **Document the issue:**
   - What were you trying to do?
   - What happened?
   - What did you expect to happen?

2. **Collect information:**
   - Browser and version
   - Console errors (F12 → Console)
   - Network errors (F12 → Network)
   - Screenshots if applicable

3. **Try to reproduce:**
   - Can you make it happen again?
   - Does it happen in different browsers?

4. **Check simple fixes first:**
   - Clear cache and hard refresh
   - Try in incognito/private mode
   - Check for typos in API key
   - Test in local mode first

## Next Steps After Testing

Once local testing is complete:

1. ✅ Commit your changes:
```powershell
git add .
git commit -m "Add AI Trading Teacher with full testing"
git push origin main
```

2. ✅ Deploy to GitHub Pages (if not already enabled):
   - Repository → Settings → Pages
   - Source: main branch
   - Wait 1-2 minutes for deployment

3. ✅ Test live version with same checklist

4. ✅ Share with users and gather feedback

## Tips for Best Testing Experience

- **Start with Local Mode**: Test all UI features without API costs
- **Use Demo API Keys**: Most providers offer free tier/credits for testing
- **Test Real Scenarios**: Upload actual CSV files and analyze them
- **Mobile First**: If your users are mobile-heavy, test there first
- **Check Analytics**: Monitor how users interact with the AI teacher

---

**Happy Testing! 🎓📊**
