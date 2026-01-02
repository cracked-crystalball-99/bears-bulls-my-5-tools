/**
 * AI Trading Teacher - UI Components and Integration
 */

// Initialize AI teacher instance
const aiTeacher = new AITradingTeacher();

// Auto-initialize with Gemini backend (no API key needed)
window.addEventListener('DOMContentLoaded', async () => {
    if (aiTeacher.loadFromSession()) {
        updateAIStatus('Connected', true);
    } else {
        // Auto-initialize with Gemini backend
        try {
            await aiTeacher.initialize('', 'gemini');
            updateAIStatus('Connected', true);
        } catch (error) {
            console.log('AI backend initializing...');
            updateAIStatus('Connecting...', false);
        }
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
                        Hello! I'm your AI trading teacher powered by Google Gemini. I can help you understand technical indicators and interpret your analysis results. 
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
                    <h3>AI Trading Teacher Settings</h3>
                    <button class="ai-modal-close">&times;</button>
                </div>
                <div class="ai-modal-body">
                    <div class="ai-setting-group">
                        <p style="margin: 0 0 10px 0; color: #27ae60; font-weight: 500;">✓ Connected to AI Backend</p>
                        <p style="margin: 0; font-size: 14px; color: #7f8c8d;">
                            Powered by Google Gemini 2.0 Flash - no API key needed!
                            <br>Your questions are answered by a secure cloud backend.
                        </p>
                    </div>
                    
                    <div class="ai-modal-actions">
                        <button class="ai-modal-close ai-btn ai-btn-primary">Close</button>
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
    
    // Close modal buttons
    document.querySelectorAll('.ai-modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('ai-settings-modal').style.display = 'none';
        });
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
    
    // 1. Extract file upload information from Table 1 (CSV data)
    try {
        const csvTable = document.getElementById('csvTable');
        const csvTableBody = document.getElementById('csvTableBody');
        
        if (csvTableBody && csvTableBody.rows.length > 0) {
            const firstRow = csvTableBody.rows[0];
            const lastRow = csvTableBody.rows[csvTableBody.rows.length - 1];
            
            if (firstRow && lastRow) {
                const startDate = firstRow.cells[0]?.textContent.trim();
                const endDate = lastRow.cells[0]?.textContent.trim();
                const rowCount = csvTableBody.rows.length;
                
                context.uploadedData = {
                    hasData: true,
                    dateRange: `${startDate} to ${endDate}`,
                    totalRows: rowCount,
                    startDate: startDate,
                    endDate: endDate
                };
                
                // Get sample price data for context
                const lastClose = lastRow.cells[4]?.textContent.trim();
                if (lastClose) {
                    context.uploadedData.latestClose = lastClose;
                }
            }
        }
    } catch (error) {
        console.log('Could not extract CSV data context:', error);
    }
    
    // 2. Extract individual indicator signals from VIP table
    try {
        const votesTable = document.getElementById('votesTable');
        if (votesTable) {
            const indicators = [];
            
            // Extract each tool's signals (rows 2-16 contain the 15 tools)
            const toolNames = [
                { id: 2, name: 'ADX Trading Signals', short: 'ADXTR' },
                { id: 3, name: 'Bollinger Bands', short: 'BBTR' },
                { id: 4, name: 'Commodity Channel Index', short: 'CCITR' },
                { id: 5, name: 'MACD Centreline', short: 'CMACDTR' },
                { id: 6, name: 'MACD Signal', short: 'SMACDTR' },
                { id: 7, name: 'Rate of Change', short: 'ROCTR' },
                { id: 8, name: 'Relative Strength Index', short: 'RSITR' },
                { id: 9, name: 'Stop and Reverse (SAR)', short: 'SARTR' },
                { id: 10, name: 'Stochastic Momentum Index', short: 'SMITR' },
                { id: 11, name: 'Williams %R', short: 'WPRTR' },
                { id: 12, name: 'CCI Simple Moving Average', short: 'CCISMATR' },
                { id: 13, name: 'ROC Simple Moving Average', short: 'ROCSMATR' },
                { id: 14, name: 'RSI Simple Moving Average', short: 'RSISMATR' },
                { id: 15, name: 'SMI Simple Moving Average', short: 'SMISMATR' },
                { id: 16, name: 'Williams %R Simple Moving Average', short: 'WPRSMATR' }
            ];
            
            for (const tool of toolNames) {
                const buyCell = document.getElementById(`b${tool.id}`);
                const sellCell = document.getElementById(`c${tool.id}`);
                const tvcCell = document.getElementById(`d${tool.id}`);
                
                if (buyCell && sellCell) {
                    const buyVotes = parseInt(buyCell.textContent) || 0;
                    const sellVotes = parseInt(sellCell.textContent) || 0;
                    const totalVotes = parseInt(tvcCell?.textContent) || (buyVotes + sellVotes);
                    
                    if (buyVotes > 0 || sellVotes > 0) {
                        indicators.push({
                            name: tool.name,
                            short: tool.short,
                            buy: buyVotes,
                            sell: sellVotes,
                            total: totalVotes
                        });
                    }
                }
            }
            
            if (indicators.length > 0) {
                context.individualSignals = indicators;
            }
            
            // Extract Tool Group Voice Count (TGVC) - row 17
            const tgvcBuyCell = document.getElementById('b17');
            const tgvcSellCell = document.getElementById('c17');
            
            if (tgvcBuyCell && tgvcSellCell) {
                const totalBuyVotes = parseInt(tgvcBuyCell.textContent) || 0;
                const totalSellVotes = parseInt(tgvcSellCell.textContent) || 0;
                
                context.totalVotes = {
                    buy: totalBuyVotes,
                    sell: totalSellVotes,
                    combined: totalBuyVotes + totalSellVotes
                };
            }
            
            // Extract VIP percentages - row 18
            const vipBuyCell = document.getElementById('b18');
            const vipSellCell = document.getElementById('c18');
            
            if (vipBuyCell && vipSellCell) {
                const buyPercent = parseFloat(vipBuyCell.textContent) || 0;
                const sellPercent = parseFloat(vipSellCell.textContent) || 0;
                
                context.vipPercentages = {
                    buy: buyPercent,
                    sell: sellPercent
                };
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
