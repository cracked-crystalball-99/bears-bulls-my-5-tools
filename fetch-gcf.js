/**
 * Demo Mode Ticker Search and Data Fetching
 * FANG + MAN stocks only (7 major tech stocks)
 */

// Demo mode - Only FANG + MAN tickers available
const tickers = [
    // FANG
    { symbol: 'META', name: 'Meta Platforms Inc.' },
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'NFLX', name: 'Netflix Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    // MAN
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' }
];

// Ticker search autocomplete
document.getElementById('ticker-input').addEventListener('input', (event) => {
    const suggestionsContainer = document.getElementById('suggestions');
    const query = event.target.value.toLowerCase();
    
    // Filter tickers based on search query
    const suggestions = tickers.filter(ticker => 
        ticker.symbol.toLowerCase().includes(query) || 
        ticker.name.toLowerCase().includes(query)
    );
    
    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';
    
    // Display suggestions
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'suggestion';
        div.textContent = `${suggestion.symbol} - ${suggestion.name}`;
        div.addEventListener('click', () => {
            document.getElementById('ticker-input').value = suggestion.symbol;
            suggestionsContainer.innerHTML = '';
        });
        suggestionsContainer.appendChild(div);
    });
});

// Fetch data button click handler
document.getElementById('fetch-data-button').addEventListener('click', () => {
    const ticker = document.getElementById('ticker-input').value.toUpperCase();
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    
    // Validate ticker
    if (!window.SyntheticDataGenerator.isTickerAvailable(ticker)) {
        alert(`Sorry, "${ticker}" is not available in demo mode. Please select one of the FANG + MAN stocks:\n\n` +
              `📊 FANG: META, AAPL, NFLX, GOOGL\n` +
              `💼 MAN: MSFT, AMZN, NVDA`);
        return;
    }
    
    // Validate dates
    if (!startDate || !endDate) {
        alert('Please select both start and end dates.');
        return;
    }
    
    // Fetch and display data
    fetchDataAndUpdateTable(ticker, startDate, endDate);
});

function fetchDataAndUpdateTable(ticker, startDate, endDate) {
    try {
        // Security: Validate ticker input
        const sanitizedTicker = ticker.trim().toUpperCase().replace(/[^A-Z]/g, '');
        if (sanitizedTicker.length > 10 || sanitizedTicker.length < 1) {
            alert('⚠️ Invalid ticker format. Please use 1-10 uppercase letters only.');
            return;
        }
        
        // Security: Validate date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
            alert('⚠️ Invalid date format. Please use YYYY-MM-DD format.');
            return;
        }
        
        // Show loading indicator
        const tableBody = document.getElementById('csvTableBody');
        const tableHead = document.getElementById('csvTableHead');
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;">⏳ Generating synthetic data...</td></tr>';
        
        // Generate synthetic data
        setTimeout(() => {
            const data = window.SyntheticDataGenerator.generateSyntheticData(sanitizedTicker, startDate, endDate);
            
            // Update table header
            const headers = ['Date', 'Open', 'High', 'Low', 'Close', 'Adj Close', 'Volume'];
            tableHead.innerHTML = '';
            const headerRow = tableHead.insertRow();
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            
            // Update table body
            tableBody.innerHTML = '';
            data.forEach(row => {
                const tr = tableBody.insertRow();
                headers.forEach(header => {
                    const td = tr.insertCell();
                    // Security: Sanitize output to prevent XSS
                    const textNode = document.createTextNode(row[header]);
                    td.appendChild(textNode);
                });
            });
            
            // Show success message
            const stockName = window.SyntheticDataGenerator.STOCK_CONFIGS[sanitizedTicker].name;
            alert(`✅ Successfully loaded ${data.length} days of data for ${stockName} (${sanitizedTicker})\n\n` +
                  `📅 Date Range: ${data[0].Date} to ${data[data.length-1].Date}\n\n` +
                  `💡 Demo Mode: This is realistic synthetic data for educational purposes.\n` +
                  `Now you can use all 15 technical analysis tools!`);
            
            // Scroll to table
            document.getElementById('csvTable').scrollIntoView({ behavior: 'smooth', block: 'start' });
            
        }, 500); // Small delay for UX
        
    } catch (error) {
        console.error('Error generating synthetic data:', error);
        alert('⚠️ Error generating data. Please try again or select a different ticker.');
    }
}

// Initialize date picker with default range on page load
document.addEventListener('DOMContentLoaded', () => {
    const dateRange = window.SyntheticDataGenerator.getDefaultDateRange();
    document.getElementById('start-date').value = dateRange.startDate;
    document.getElementById('end-date').value = dateRange.endDate;
    
    // Set minimum date (15 years ago)
    const minDate = dateRange.startDate;
    document.getElementById('start-date').setAttribute('min', minDate);
    document.getElementById('end-date').setAttribute('min', minDate);
    
    // Show welcome message with available tickers
    console.log('🎯 Demo Mode Active - FANG + MAN Stocks Available:');
    console.log('📊 FANG: META, AAPL, NFLX, GOOGL');
    console.log('💼 MAN: MSFT, AMZN, NVDA');
});
