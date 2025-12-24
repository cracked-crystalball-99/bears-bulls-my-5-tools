/**
 * AI Proxy Server for Trading Analysis Tool
 * Handles Anthropic API calls to bypass CORS restrictions
 */

const express = require('express');
const cors = require('cors');
const app = express();

// Configuration
const PORT = process.env.PORT || 3001;
// REMOVED: Server-side API keys to prevent unauthorized billing
// Users MUST provide their own API keys via x-api-key header

// Middleware
app.use(cors()); // Allow all origins for development
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        requiresClientKey: true  // Always require client to provide API key
    });
});

// Anthropic proxy endpoint
app.post('/api/chat', async (req, res) => {
    try {
        // SECURITY: Only accept API keys from client request headers
        // This prevents random users from billing your account
        const apiKey = req.headers['x-api-key'];
        
        if (!apiKey) {
            return res.status(401).json({ 
                error: 'API key required. Users must provide their own API key via x-api-key header. Server does not provide keys.' 
            });
        }

        const { messages, system, max_tokens = 500 } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid request: messages array required' });
        }

        console.log(`[${new Date().toISOString()}] Proxying request to Anthropic...`);

        // Make request to Anthropic
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: max_tokens,
                system: system || 'You are a helpful trading analysis assistant.',
                messages: messages
            })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.error('Anthropic API Error:', error);
            return res.status(response.status).json({ 
                error: error.error?.message || `Anthropic API error: ${response.status}` 
            });
        }

        const data = await response.json();
        console.log(`[${new Date().toISOString()}] Success! Response received.`);
        
        res.json(data);

    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ 
            error: 'Server error: ' + error.message 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log('\n🚀 AI Proxy Server Running!');
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`� Security: Requires client API keys only (no server-side keys)`);
    console.log(`⏰ Started: ${new Date().toISOString()}\n`);
    console.log('Test it: http://localhost:' + PORT + '/health\n');
});
