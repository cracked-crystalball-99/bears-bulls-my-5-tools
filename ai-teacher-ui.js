/**
 * AI Trading Teacher - UI Components and Integration
 */

// Initialize AI teacher instance
const aiTeacher = new AITradingTeacher();

// Load API key from session if available
window.addEventListener('DOMContentLoaded', () => {
    if (aiTeacher.loadFromSession()) {
        updateAIStatus('Connected', true);
    }
});

/**
 * Create and inject AI assistant UI into the page
 */
function initializeAITeacherUI() {
    // Create AI chat container
    const chatContainer = document.createElement('div');
    chatContainer.id = 'ai-teacher-container';
    chatContainer.className = 'ai-teacher-container collapsed';
    chatContainer.innerHTML = `
        <div class="ai-teacher-header">
            <div class="ai-header-content">
                <span class="ai-icon">🎓</span>
                <span class="ai-title">AI Trading Teacher</span>
                <span id="ai-status" class="ai-status">Not Connected</span>
            </div>
            <div class="ai-header-actions">
                <button id="ai-settings-btn" class="ai-btn-icon" title="Settings">⚙️</button>
                <button id="ai-toggle-btn" class="ai-btn-icon" title="Minimize">−</button>
            </div>
        </div>
        
        <div class="ai-teacher-body">
            <div id="ai-chat-messages" class="ai-chat-messages">
                <div class="ai-message ai-message-assistant">
                    <div class="ai-message-content">
                        Hello! I'm your AI trading teacher. I can help you understand technical indicators and interpret your analysis results. 
                        <br><br>
                        Ask me about ADX, RSI, MACD, Bollinger Bands, CCI, or how to interpret your VIP% results!
                    </div>
                </div>
            </div>
            
            <div class="ai-quick-actions">
                <button class="ai-quick-btn" data-question="What is VIP%?">What is VIP%?</button>
                <button class="ai-quick-btn" data-question="Explain my current results">Explain Results</button>
                <button class="ai-quick-btn" data-question="What is ADX?">What is ADX?</button>
                <button class="ai-quick-btn" data-question="How do I use this tool?">How to Use</button>
            </div>
            
            <div class="ai-input-container">
                <textarea 
                    id="ai-input" 
                    class="ai-input" 
                    placeholder="Ask me anything about trading indicators..."
                    rows="2"
                ></textarea>
                <button id="ai-send-btn" class="ai-send-btn">
                    <span class="ai-send-icon">📤</span>
                </button>
            </div>
        </div>

        <!-- Settings Modal -->
        <div id="ai-settings-modal" class="ai-modal" style="display: none;">
            <div class="ai-modal-content">
                <div class="ai-modal-header">
                    <h3>AI Teacher Settings</h3>
                    <button class="ai-modal-close">&times;</button>
                </div>
                <div class="ai-modal-body">
                    <div class="ai-setting-group">
                        <label for="ai-provider">AI Provider:</label>
                        <select id="ai-provider" class="ai-select">
                            <option value="local">Local (No API Key)</option>
                            <option value="gemini">Google Gemini (FREE) ⭐</option>
                            <option value="openai">OpenAI (GPT)</option>
                            <option value="anthropic">Anthropic (Claude)</option>
                        </select>
                    </div>
                    
                    <div id="api-key-section" class="ai-setting-group" style="display: none;">
                        <label for="ai-api-key">API Key:</label>
                        <input 
                            type="password" 
                            id="ai-api-key" 
                            class="ai-input-text" 
                            placeholder="Enter your API key"
                        >
                        <small class="ai-help-text">
                            Your API key is stored securely in your browser session only.
                        </small>
                    </div>
                    
                    <div class="ai-setting-group">
                        <h4>How to get API keys:</h4>
                        <ul class="ai-help-list">
                            <li><strong>Google Gemini (FREE):</strong> Visit <a href="https://aistudio.google.com/app/apikey" target="_blank">aistudio.google.com/app/apikey</a></li>
                            <li><strong>OpenAI:</strong> Visit <a href="https://platform.openai.com/api-keys" target="_blank">platform.openai.com/api-keys</a></li>
                            <li><strong>Anthropic:</strong> Visit <a href="https://console.anthropic.com/settings/keys" target="_blank">console.anthropic.com</a></li>
                        </ul>
                        <p class="ai-help-text">
                            <strong>Cost:</strong> 
                            <br>• Gemini 1.5 Flash: <strong>FREE</strong> (15 req/min, 1M tokens/day)
                            <br>• OpenAI GPT-4o-mini: ~$0.15 per 1M tokens (~2000 questions)
                            <br>• Claude Haiku: ~$0.25 per 1M input tokens (~2000 questions)
                        </p>
                    </div>
                    
                    <div class="ai-modal-actions">
                        <button id="ai-save-settings" class="ai-btn ai-btn-primary">Save Settings</button>
                        <button id="ai-logout" class="ai-btn ai-btn-secondary">Clear API Key</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatContainer);
    
    // Bind event listeners
    bindAITeacherEvents();
}

/**
 * Bind all event listeners for AI teacher UI
 */
function bindAITeacherEvents() {
    const container = document.getElementById('ai-teacher-container');
    const toggleBtn = document.getElementById('ai-toggle-btn');
    const header = document.querySelector('.ai-teacher-header');
    
    // Toggle chat window
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        container.classList.toggle('collapsed');
        toggleBtn.textContent = container.classList.contains('collapsed') ? '+' : '−';
        if (typeof updateMobileState === 'function') updateMobileState();
    });
    
    // Create backdrop for mobile tap-to-close
    const backdrop = document.createElement('div');
    backdrop.className = 'ai-backdrop';
    document.body.appendChild(backdrop);
    
    // Function to show/hide backdrop and update state
    function updateMobileState() {
        if (window.innerWidth <= 768) {
            if (container.classList.contains('collapsed')) {
                backdrop.classList.remove('visible');
            } else {
                backdrop.classList.add('visible');
            }
        } else {
            backdrop.classList.remove('visible');
        }
    }
    
    // Tap backdrop to close on mobile
    backdrop.addEventListener('click', () => {
        container.classList.add('collapsed');
        toggleBtn.textContent = '+';
        updateMobileState();
    });
    
    // Update backdrop on resize
    window.addEventListener('resize', updateMobileState);
    
    // Mobile: Tap header to expand (but not on buttons)
    header.addEventListener('click', (e) => {
        if (e.target === header || e.target.closest('.ai-header-content')) {
            if (window.innerWidth <= 768 && container.classList.contains('collapsed')) {
                container.classList.remove('collapsed');
                toggleBtn.textContent = '−';
                updateMobileState();
            }
        }
    });
    
    // Mobile: Swipe down to minimize
    let touchStartY = 0;
    let touchEndY = 0;
    
    header.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    header.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        const swipeDistance = touchEndY - touchStartY;
        
        if (swipeDistance > 100 && !container.classList.contains('collapsed') && window.innerWidth <= 768) {
            container.classList.add('collapsed');
            toggleBtn.textContent = '+';
            updateMobileState();
        }
    }, { passive: true });
    
    // Initial state
    updateMobileState();
    
    // Settings button
    document.getElementById('ai-settings-btn').addEventListener('click', () => {
        document.getElementById('ai-settings-modal').style.display = 'flex';
    });
    
    // Close modal
    document.querySelector('.ai-modal-close').addEventListener('click', () => {
        document.getElementById('ai-settings-modal').style.display = 'none';
    });
    
    // Provider selection
    document.getElementById('ai-provider').addEventListener('change', (e) => {
        const apiKeySection = document.getElementById('api-key-section');
        if (e.target.value === 'local') {
            apiKeySection.style.display = 'none';
        } else {
            apiKeySection.style.display = 'block';
        }
    });
    
    // Save settings
    document.getElementById('ai-save-settings').addEventListener('click', async () => {
        const provider = document.getElementById('ai-provider').value;
        const apiKey = document.getElementById('ai-api-key').value;
        
        if (provider !== 'local' && !apiKey) {
            alert('Please enter an API key or select "Local" mode.');
            return;
        }
        
        try {
            await aiTeacher.initialize(apiKey, provider);
            updateAIStatus('Connected', true);
            document.getElementById('ai-settings-modal').style.display = 'none';
            addMessageToChat('assistant', 'Settings saved! I\'m ready to help with full AI capabilities.');
        } catch (error) {
            alert('Error saving settings: ' + error.message);
        }
    });
    
    // Logout
    document.getElementById('ai-logout').addEventListener('click', () => {
        aiTeacher.logout();
        document.getElementById('ai-api-key').value = '';
        document.getElementById('ai-provider').value = 'local';
        document.getElementById('api-key-section').style.display = 'none';
        updateAIStatus('Not Connected', false);
        addMessageToChat('assistant', 'API key cleared. Now using local knowledge base.');
    });
    
    // Send message
    document.getElementById('ai-send-btn').addEventListener('click', () => {
        sendAIMessage();
    });
    
    // Send on Enter (but allow Shift+Enter for new line)
    document.getElementById('ai-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendAIMessage();
        }
    });
    
    // Quick action buttons
    document.querySelectorAll('.ai-quick-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const question = e.target.dataset.question;
            document.getElementById('ai-input').value = question;
            sendAIMessage();
        });
    });
}

/**
 * Send message to AI teacher
 */
async function sendAIMessage() {
    const input = document.getElementById('ai-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat('user', message);
    input.value = '';
    
    // Show typing indicator
    addTypingIndicator();
    
    try {
        // Get context from current analysis
        const context = getCurrentAnalysisContext();
        
        // Get AI response
        const response = await aiTeacher.ask(message, context);
        
        // Remove typing indicator and add response
        removeTypingIndicator();
        addMessageToChat('assistant', response);
        
    } catch (error) {
        removeTypingIndicator();
        addMessageToChat('assistant', `Error: ${error.message}\n\nTip: Check your API key in settings or use Local mode for basic assistance.`);
    }
}

/**
 * Add message to chat UI
 */
function addMessageToChat(role, content) {
    const messagesContainer = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ai-message-${role}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'ai-message-content';
    
    // Convert markdown-style formatting to HTML
    let formattedContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
    
    contentDiv.innerHTML = formattedContent;
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Add typing indicator
 */
function addTypingIndicator() {
    const messagesContainer = document.getElementById('ai-chat-messages');
    const indicator = document.createElement('div');
    indicator.className = 'ai-message ai-message-assistant';
    indicator.id = 'ai-typing-indicator';
    indicator.innerHTML = '<div class="ai-message-content"><div class="ai-typing-dots"><span>.</span><span>.</span><span>.</span></div></div>';
    messagesContainer.appendChild(indicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Remove typing indicator
 */
function removeTypingIndicator() {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) indicator.remove();
}

/**
 * Update AI status display
 */
function updateAIStatus(text, isConnected) {
    const statusEl = document.getElementById('ai-status');
    statusEl.textContent = text;
    statusEl.className = 'ai-status ' + (isConnected ? 'ai-status-connected' : 'ai-status-disconnected');
}

/**
 * Get current analysis context from the page
 */
function getCurrentAnalysisContext() {
    const context = {};
    
    // Try to get VIP percentages from the votes table
    try {
        const votesTable = document.getElementById('votesTable');
        if (votesTable) {
            const rows = votesTable.querySelectorAll('tr');
            const lastRow = rows[rows.length - 1];
            if (lastRow) {
                const cells = lastRow.querySelectorAll('td');
                if (cells.length >= 3) {
                    const buyText = cells[1].textContent.trim();
                    const sellText = cells[2].textContent.trim();
                    context.vipPercentages = {
                        buy: parseFloat(buyText) || 0,
                        sell: parseFloat(sellText) || 0
                    };
                }
            }
        }
    } catch (error) {
        console.log('Could not extract VIP context:', error);
    }
    
    return context;
}

// Initialize UI when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAITeacherUI);
} else {
    initializeAITeacherUI();
}
