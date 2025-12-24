"""
AI Proxy Server for Trading Analysis Tool (Python/Flask)
Handles Anthropic API calls to bypass CORS restrictions
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
# REMOVED: Server-side API keys to prevent unauthorized billing
# Users MUST provide their own API keys via x-api-key header
ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'requiresClientKey': True  # Always require client to provide API key
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    """Proxy endpoint for Anthropic API"""
    try:
        # SECURITY: Only accept API keys from client request headers
        # This prevents random users from billing your account
        api_key = request.headers.get('x-api-key')
        
        if not api_key:
            return jsonify({
                'error': 'API key required. Users must provide their own API key via x-api-key header. Server does not provide keys.'
            }), 401

        # Get request data
        data = request.json
        messages = data.get('messages', [])
        system = data.get('system', 'You are a helpful trading analysis assistant.')
        max_tokens = data.get('max_tokens', 500)

        if not messages or not isinstance(messages, list):
            return jsonify({'error': 'Invalid request: messages array required'}), 400

        print(f"[{datetime.now().isoformat()}] Proxying request to Anthropic...")

        # Make request to Anthropic
        response = requests.post(
            ANTHROPIC_API_URL,
            headers={
                'Content-Type': 'application/json',
                'x-api-key': api_key,
                'anthropic-version': '2023-06-01'
            },
            json={
                'model': 'claude-3-haiku-20240307',
                'max_tokens': max_tokens,
                'system': system,
                'messages': messages
            }
        )

        if not response.ok:
            error_data = response.json() if response.text else {}
            print(f"Anthropic API Error: {error_data}")
            return jsonify({
                'error': error_data.get('error', {}).get('message', f'Anthropic API error: {response.status_code}')
            }), response.status_code

        data = response.json()
        print(f"[{datetime.now().isoformat()}] Success! Response received.")
        
        return jsonify(data)

    except Exception as e:
        print(f"Proxy Error: {str(e)}")
        return jsonify({'error': f'Server error: {str(e)}'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3001))
    print('\n🚀 AI Proxy Server Running!')
    print(f'📍 Local: http://localhost:{port}')
    print(f'� Security: Requires client API keys only (no server-side keys)')
    print(f'⏰ Started: {datetime.now().isoformat()}\n')
    print(f'Test it: http://localhost:{port}/health\n')
    
    app.run(host='0.0.0.0', port=port, debug=True)
