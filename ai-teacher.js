/**
 * AI Trading Assistant Teacher
 * Provides intelligent guidance and explanations for the trading analysis tool
 */

class AITradingTeacher {
    constructor() {
        this.apiKey = null;
        this.conversationHistory = [];
        this.isInitialized = true; // Always initialized
        this.provider = 'gemini'; // Gemini backend (no API key required)
        
        // Trading context knowledge base
        this.knowledgeBase = {
            adx: {
                name: "Average Directional Index",
                description: "Measures trend strength. Above 25 indicates a strong trend, below 20 suggests a weak trend.",
                interpretation: "High ADX (>25) means strong trend (up or down). Low ADX (<20) means weak/no trend."
            },
            rsi: {
                name: "Relative Strength Index",
                description: "Momentum oscillator measuring speed and magnitude of price changes.",
                interpretation: "RSI > 70 suggests overbought (possible sell), RSI < 30 suggests oversold (possible buy)."
            },
            macd: {
                name: "Moving Average Convergence Divergence",
                description: "Trend-following momentum indicator showing relationship between two moving averages.",
                interpretation: "MACD line crossing above signal line = bullish, crossing below = bearish."
            },
            bb: {
                name: "Bollinger Bands",
                description: "Volatility bands placed above and below a moving average.",
                interpretation: "Price near upper band = potentially overbought, near lower band = potentially oversold."
            },
            cci: {
                name: "Commodity Channel Index",
                description: "Measures current price level relative to average price over a given period.",
                interpretation: "CCI > +100 suggests overbought, CCI < -100 suggests oversold."
            },
            vip: {
                name: "Votes Innovative Percentages",
                description: "Cumulative voting system showing buy vs sell signals across all indicators.",
                interpretation: "Green (left) = buy signal strength, Red (right) = sell signal strength. Higher percentage = stronger signal."
            }
        };
    }

    /**
     * Initialize the AI assistant (Gemini backend - no API key needed)
     */
    async initialize(apiKey, provider = 'gemini') {
        this.apiKey = null; // Not needed for Gemini backend
        this.provider = 'gemini';
        this.isInitialized = true;
        
        // Store provider in session storage
        sessionStorage.setItem('ai_teacher_provider', 'gemini');
        
        return true;
    }

    /**
     * Load provider from session storage
     */
    loadFromSession() {
        const provider = sessionStorage.getItem('ai_teacher_provider');
        if (provider === 'gemini') {
            this.provider = 'gemini';
            this.isInitialized = true;
            return true;
        }
        return false;
    }

    /**
     * Generate system prompt with trading context
     */
    getSystemPrompt() {
        return `You are an expert trading analysis teacher helping users understand technical indicators and trading decisions. 

This web app displays 26 NUMBERED TABLES plus a VIP table and a final chart:

TABLE STRUCTURE (Learn these table numbers):
- Table 1: CSV File Data (uploaded stock/crypto data)
- Table 2: ADX Values
- Table 3: Tool #1 ADXTR Trading Signals
- Table 4: Bollinger Bands (BB) Values
- Table 5: Tool #2 BBTR Trading Signals
- Table 6: CCI Values
- Table 7: Tool #3 CCITR Trading Signals
- Table 8: MACD Values
- Table 9: Tool #4 CMACDTR (Centreline MACD) Trading Signals
- Table 10: Tool #5 SMACDTR (Signal MACD) Trading Signals
- Table 11: ROC Values
- Table 12: Tool #6 ROCTR Trading Signals
- Table 13: RSI Values
- Table 14: Tool #7 RSITR Trading Signals
- Table 15: SAR Values
- Table 16: Tool #8 SARTR Trading Signals
- Table 17: SMI Values
- Table 18: Tool #9 SMITR Trading Signals
- Table 19: WPR Values
- Table 20: Tool #10 WPRTR Trading Signals
- Table 21: SMA5 Values
- Table 22: Tool #11 CCISMATR Trading Signals
- Table 23: Tool #12 ROCSMATR Trading Signals
- Table 24: Tool #13 RSISMATR Trading Signals
- Table 25: Tool #14 SMISMATR Trading Signals
- Table 26: Tool #15 WPRSMATR Trading Signals
- VIP TABLE: "Votes Innovative Percentages (VIP %)" - Final voting summary with all 15 tools
- CHART: "Tool #s 1-15 Votes Chart" - Visual representation of buy/sell signals

WHEN USERS ASK ABOUT TABLES:
- "What is table 8?" → "Table 8 shows MACD (Moving Average Convergence Divergence) Values"
- "What does table 3 show?" → "Table 3 shows Tool #1 ADXTR (Average Directional Index Trading Signals)"
- "Tell me about the VIP table" → "The VIP table shows the final Votes Innovative Percentages with all 15 tools' buy/sell votes"
- Use the exact table numbers when referencing data

CRITICAL - ALWAYS REFERENCE ACTUAL DATA PROVIDED:
- When user asks about uploaded files, REFERENCE the specific date range and row count provided in context
- When user asks about signals, CITE the exact buy/sell vote counts for each indicator
- When user asks about VIP%, QUOTE the actual percentages shown in the data
- When user asks "what do you see", describe the SPECIFIC numbers and values provided
- NEVER say "I can't see" - the data is PROVIDED in the context section of each message
- When listing indicators, ALWAYS review the COMPLETE BREAKDOWN showing ALL 15 tools
- When comparing indicators, CHECK ALL 15 TOOLS in the complete list, not just the first few
- The "QUICK SUMMARY" shows top 3, but COMPLETE BREAKDOWN has all tools - use both sections

Example responses:
- "Yes, I can see you've uploaded data covering [specific dates] with [X] data points shown in Table 1."
- "Table 8 shows the MACD values. Looking at the signals in Table 9..."
- "Looking at ALL 15 tools in the complete breakdown: [list actual numbers]..."
- "The strongest buy signals come from [check all 15 tools and cite the highest]..."
- "The final chart displays the buy/sell vote distribution across all 15 tools."

Your role:
- Explain indicators in simple terms
- Help users navigate the 26 tables + VIP table + chart
- Help interpret the VIP% results BY REFERENCING THE ACTUAL DATA PROVIDED
- Provide educational guidance (not financial advice)
- Answer questions about specific table numbers
- Guide users through the analysis process
- Always CITE specific numbers and TABLE NUMBERS from the context when discussing results

CRITICAL - Response Style:
- Keep responses BRIEF and FOCUSED (aim for 3-5 sentences for simple questions, max 8-10 sentences for analysis)
- Get to the point quickly - no lengthy introductions
- Be informative but succinct
- ALWAYS reference actual data and TABLE NUMBERS when it's provided in context

Always remind users: "This is educational content, not financial advice. Always do your own research and consult with financial advisors."

Keep responses concise and educational. Use examples when helpful.`;
    }

    /**
     * Ask the AI assistant a question
     */
    async ask(userMessage, context = {}) {
        // Build enriched message with detailed context
        let enrichedMessage = userMessage;
        
        // Add uploaded data context
        if (context.uploadedData && context.uploadedData.hasData) {
            enrichedMessage += `\n\n=== UPLOADED DATA INFORMATION ===`;
            enrichedMessage += `\nFile Data: YES, data has been uploaded and analyzed`;
            enrichedMessage += `\nDate Range: ${context.uploadedData.dateRange}`;
            enrichedMessage += `\nTotal Data Points: ${context.uploadedData.totalRows} rows`;
            if (context.uploadedData.latestClose) {
                enrichedMessage += `\nLatest Close Price: ${context.uploadedData.latestClose}`;
            }
        }
        
        // Add individual indicator signals breakdown
        if (context.individualSignals && context.individualSignals.length > 0) {
            enrichedMessage += `\n\n=== INDIVIDUAL INDICATOR SIGNALS ===`;
            enrichedMessage += `\nTotal of ${context.individualSignals.length} tools analyzed. REVIEW ALL TOOLS BELOW:\n`;
            
            // Sort by buy signals (descending) for better analysis
            const sortedByBuy = [...context.individualSignals].sort((a, b) => b.buy - a.buy);
            const sortedBySell = [...context.individualSignals].sort((a, b) => b.sell - a.sell);
            
            // Add quick summary
            enrichedMessage += `\n📊 QUICK SUMMARY:`;
            enrichedMessage += `\n  Top 3 Buy Signal Producers:`;
            for (let i = 0; i < Math.min(3, sortedByBuy.length); i++) {
                enrichedMessage += `\n    ${i + 1}. ${sortedByBuy[i].name}: ${sortedByBuy[i].buy} buy signals`;
            }
            enrichedMessage += `\n  Top 3 Sell Signal Producers:`;
            for (let i = 0; i < Math.min(3, sortedBySell.length); i++) {
                enrichedMessage += `\n    ${i + 1}. ${sortedBySell[i].name}: ${sortedBySell[i].sell} sell signals`;
            }
            
            enrichedMessage += `\n\n📋 COMPLETE BREAKDOWN (ALL ${context.individualSignals.length} TOOLS):`;
            for (let i = 0; i < context.individualSignals.length; i++) {
                const indicator = context.individualSignals[i];
                enrichedMessage += `\n\n${i + 1}. ${indicator.name} (${indicator.short}):`;
                enrichedMessage += `\n   Buy: ${indicator.buy} | Sell: ${indicator.sell} | Total: ${indicator.total}`;
            }
        }
        
        // Add total vote counts
        if (context.totalVotes) {
            enrichedMessage += `\n\n=== TOTAL VOTE COUNTS (TGVC) ===`;
            enrichedMessage += `\nCombined across all ${context.individualSignals ? context.individualSignals.length : 15} tools:`;
            enrichedMessage += `\n  - Total Buy Votes: ${context.totalVotes.buy}`;
            enrichedMessage += `\n  - Total Sell Votes: ${context.totalVotes.sell}`;
            enrichedMessage += `\n  - Combined Total: ${context.totalVotes.combined}`;
        }
        
        // Add VIP percentages
        if (context.vipPercentages) {
            enrichedMessage += `\n\n=== FINAL VIP PERCENTAGES ===`;
            enrichedMessage += `\nVIP% (Votes Innovative Percentages):`;
            enrichedMessage += `\n  - Buy Signal Strength: ${context.vipPercentages.buy}%`;
            enrichedMessage += `\n  - Sell Signal Strength: ${context.vipPercentages.sell}%`;
            
            // Add interpretation hint
            if (context.vipPercentages.buy > context.vipPercentages.sell) {
                enrichedMessage += `\n  - Current Signal: BUY is stronger (${context.vipPercentages.buy - context.vipPercentages.sell}% difference)`;
            } else if (context.vipPercentages.sell > context.vipPercentages.buy) {
                enrichedMessage += `\n  - Current Signal: SELL is stronger (${context.vipPercentages.sell - context.vipPercentages.buy}% difference)`;
            } else {
                enrichedMessage += `\n  - Current Signal: NEUTRAL (equal buy/sell signals)`;
            }
        }
        
        // Add indicator-specific context if provided
        if (context.indicator) {
            enrichedMessage += `\n\nUser is currently viewing: ${context.indicator}`;
        }

        // Add to conversation history
        this.conversationHistory.push({
            role: 'user',
            content: enrichedMessage
        });

        try {
            let response;
            
            if (this.provider === 'gemini') {
                response = await this.askGemini();
            } else {
                response = await this.askLocal(userMessage);
            }

            // Add assistant response to history
            this.conversationHistory.push({
                role: 'assistant',
                content: response
            });

            // Keep conversation history manageable (last 10 messages)
            if (this.conversationHistory.length > 10) {
                this.conversationHistory = this.conversationHistory.slice(-10);
            }

            return response;
        } catch (error) {
            console.error('AI Teacher error:', error);
            throw error;
        }
    }

    /**
     * Query Google Gemini via Cloud Function (backend)
     */
    async askGemini() {
        try {
            // Build prompt with system instructions and conversation history
            let fullPrompt = this.getSystemPrompt() + '\n\n';
            
            if (this.conversationHistory.length > 0) {
                fullPrompt += 'Conversation History:\n';
                for (const msg of this.conversationHistory) {
                    const role = msg.role === 'assistant' ? 'Assistant' : 'User';
                    fullPrompt += `${role}: ${msg.content}\n\n`;
                }
            }

            // Cloud Function URL (secure backend)
            const cloudFunctionUrl = 'https://us-central1-gen-lang-client-0071896365.cloudfunctions.net/gemini-proxy-function';
            
            const response = await fetch(cloudFunctionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: fullPrompt })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            // Cloud Function might return plain text or JSON
            const contentType = response.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
                // JSON response
                const data = await response.json();
                if (data.text) return data.text;
                if (data.response) return data.response;
                if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                    return data.candidates[0].content.parts[0].text;
                }
                if (typeof data === 'string') return data;
                throw new Error('Invalid JSON response format');
            } else {
                // Plain text response
                const text = await response.text();
                if (!text) throw new Error('Empty response from backend');
                return text;
            }
        } catch (error) {
            console.error('Gemini Backend Error:', error);
            throw new Error('Unable to connect to AI backend. Please try again.');
        }
    }

    /**
     * Use local knowledge base (fallback when no API key)
     */
    async askLocal(question) {
        const q = question.toLowerCase();
        
        // Check for indicator-specific questions
        for (const [key, info] of Object.entries(this.knowledgeBase)) {
            if (q.includes(key) || q.includes(info.name.toLowerCase())) {
                return `**${info.name} (${key.toUpperCase()})**\n\n${info.description}\n\n**How to interpret:** ${info.interpretation}\n\n*Note: This is basic information. For detailed AI assistance, please set up an API key.*`;
            }
        }

        // General questions
        if (q.includes('vip') || q.includes('vote') || q.includes('percentage')) {
            return this.knowledgeBase.vip.description + '\n\n' + this.knowledgeBase.vip.interpretation;
        }

        if (q.includes('how') && q.includes('use')) {
            return `**How to use this tool:**\n\n1. Upload your CSV file with columns: Date, Open, High, Low, Close, Adj Close, Volume\n2. The tool calculates 5 technical indicators\n3. View results in the VIP% row at the bottom\n4. Green percentage = Buy signal strength\n5. Red percentage = Sell signal strength\n\nHigher percentages indicate stronger signals. Use at least 5 months of data for best results.\n\n*This is educational content, not financial advice.*`;
        }

        return `I can help explain trading indicators and guide you through the tool. Try asking:\n\n- "What is ADX?"\n- "How do I interpret RSI?"\n- "What does VIP% mean?"\n- "How do I use this tool?"\n\n*AI teacher is powered by Google Gemini.*`;
    }

    /**
     * Get quick explanation for an indicator
     */
    getQuickExplanation(indicator) {
        const info = this.knowledgeBase[indicator.toLowerCase()];
        if (info) {
            return `**${info.name}**: ${info.interpretation}`;
        }
        return 'Indicator not found. Try: ADX, RSI, MACD, BB, CCI, or VIP.';
    }

    /**
     * Clear conversation history
     */
    clearHistory() {
        this.conversationHistory = [];
    }

    /**
     * Clear conversation history
     */
    logout() {
        this.conversationHistory = [];
        this.isInitialized = true;
        // Gemini backend always available
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AITradingTeacher;
}
