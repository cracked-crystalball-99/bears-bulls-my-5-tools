/**
 * AI Trading Assistant Teacher
 * Provides intelligent guidance and explanations for the trading analysis tool
 */

class AITradingTeacher {
    constructor() {
        this.apiKey = null;
        this.conversationHistory = [];
        this.isInitialized = true; // Always initialized for local mode
        this.provider = 'local'; // Default to 'local' - 'openai', 'anthropic', 'gemini', or 'local'
        this.proxyUrl = 'http://localhost:3001/api/chat'; // Proxy server URL
        
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
     * Initialize the AI assistant with API key
     */
    async initialize(apiKey, provider = 'openai') {
        // Trim whitespace from API key (common copy/paste issue)
        this.apiKey = apiKey ? apiKey.trim() : null;
        this.provider = provider;
        this.isInitialized = true;
        
        // Store API key in session storage (not localStorage for security)
        if (this.apiKey) {
            sessionStorage.setItem('ai_teacher_key', this.apiKey);
            sessionStorage.setItem('ai_teacher_provider', provider);
        }
        
        return true;
    }

    /**
     * Load API key from session storage
     */
    loadFromSession() {
        const key = sessionStorage.getItem('ai_teacher_key');
        const provider = sessionStorage.getItem('ai_teacher_provider');
        if (key) {
            this.apiKey = key;
            this.provider = provider || 'openai';
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

This tool analyzes stock/crypto data and provides:
1. ADX (Average Directional Index) - trend strength
2. RSI (Relative Strength Index) - momentum oscillator
3. MACD (Moving Average Convergence Divergence) - trend following
4. Bollinger Bands (BB) - volatility bands
5. CCI (Commodity Channel Index) - price momentum

The final output is VIP% (Votes Innovative Percentages):
- Green/Left percentage: Buy signal strength
- Red/Right percentage: Sell signal strength

Your role:
- Explain indicators in simple terms
- Help interpret the VIP% results
- Provide educational guidance (not financial advice)
- Answer questions about the tool's features
- Guide users through the analysis process

Always remind users: "This is educational content, not financial advice. Always do your own research and consult with financial advisors."

Keep responses concise and educational. Use examples when helpful.`;
    }

    /**
     * Ask the AI assistant a question
     */
    async ask(userMessage, context = {}) {
        // Always allow local mode to work
        // Only require API key for OpenAI/Anthropic/Gemini providers
        if ((this.provider === 'openai' || this.provider === 'anthropic' || this.provider === 'gemini') && !this.apiKey) {
            return await this.askLocal(userMessage);
        }

        // Add context about current analysis if available
        let enrichedMessage = userMessage;
        if (context.vipPercentages) {
            enrichedMessage += `\n\nCurrent Analysis Context:\n- Buy Signal: ${context.vipPercentages.buy}%\n- Sell Signal: ${context.vipPercentages.sell}%`;
        }
        if (context.indicator) {
            enrichedMessage += `\n- User is looking at: ${context.indicator}`;
        }

        // Add to conversation history
        this.conversationHistory.push({
            role: 'user',
            content: enrichedMessage
        });

        try {
            let response;
            
            if (this.provider === 'openai' && this.apiKey) {
                response = await this.askOpenAI();
            } else if (this.provider === 'anthropic' && this.apiKey) {
                response = await this.askAnthropic();
            } else if (this.provider === 'gemini' && this.apiKey) {
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
     * Query OpenAI API
     */
    async askOpenAI() {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // Cost-effective model
                messages: [
                    { role: 'system', content: this.getSystemPrompt() },
                    ...this.conversationHistory
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    /**
     * Query Anthropic Claude API (via proxy to avoid CORS)
     */
    async askAnthropic() {
        try {
            const response = await fetch(this.proxyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey // Pass key to proxy
                },
                body: JSON.stringify({
                    system: this.getSystemPrompt(),
                    messages: this.conversationHistory,
                    max_tokens: 500
                })
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                const errorMsg = error.error || `HTTP ${response.status}: ${response.statusText}`;
                console.error('Proxy Error:', errorMsg);
                throw new Error(`AI Server error: ${errorMsg}`);
            }

            const data = await response.json();
            return data.content[0].text;
        } catch (error) {
            console.error('AI Request Failed:', error);
            if (error.message.includes('Failed to fetch')) {
                throw new Error('Cannot connect to AI server. Make sure the proxy server is running on http://localhost:3001');
            }
            throw error;
        }
    }

    /**
     * Query Google Gemini API (direct, no proxy needed)
     */
    async askGemini() {
        try {
            // Convert conversation history to Gemini format
            const contents = [];
            
            // Add system prompt as first user message with model instruction
            contents.push({
                role: 'user',
                parts: [{ text: this.getSystemPrompt() + '\n\nPlease follow these guidelines in all your responses.' }]
            });
            contents.push({
                role: 'model',
                parts: [{ text: 'Understood. I will act as an expert trading analysis teacher and follow all the guidelines you provided.' }]
            });
            
            // Add conversation history - convert 'assistant' to 'model' for Gemini
            for (const msg of this.conversationHistory) {
                contents.push({
                    role: msg.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: msg.content }]
                });
            }

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: contents,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500,
                        topP: 0.95,
                        topK: 40
                    }
                })
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                const errorMsg = error.error?.message || `HTTP ${response.status}: ${response.statusText}`;
                console.error('Gemini Error:', errorMsg);
                throw new Error(`Gemini API error: ${errorMsg}`);
            }

            const data = await response.json();
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('Invalid response from Gemini API');
            }
            
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Gemini Request Failed:', error);
            throw error;
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

        return `I can help explain trading indicators and guide you through the tool. Try asking:\n\n- "What is ADX?"\n- "How do I interpret RSI?"\n- "What does VIP% mean?"\n- "How do I use this tool?"\n\nFor detailed AI-powered assistance, please set up an API key in the settings.`;
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
     * Logout and clear API key
     */
    logout() {
        this.apiKey = null;
        this.isInitialized = false;
        this.conversationHistory = [];
        sessionStorage.removeItem('ai_teacher_key');
        sessionStorage.removeItem('ai_teacher_provider');
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AITradingTeacher;
}
