/**
 * Synthetic Data Generator for FANG + MAN stocks
 * Generates realistic 15-year price history for demo purposes
 */

// Seeded Random Number Generator for reproducibility
class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }
    
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
    
    nextGaussian() {
        // Box-Muller transform for normal distribution
        const u1 = this.next();
        const u2 = this.next();
        return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    }
}

// Stock configuration with realistic parameters
const STOCK_CONFIGS = {
    'META': {
        name: 'Meta Platforms Inc.',
        startPrice: 38.23,      // IPO price ~2012
        annualDrift: 0.18,      // 18% annual growth
        volatility: 0.028,      // 2.8% daily volatility
        seed: 12345
    },
    'AAPL': {
        name: 'Apple Inc.',
        startPrice: 15.50,      // Adjusted for splits
        annualDrift: 0.25,      // 25% annual growth
        volatility: 0.022,      // 2.2% daily volatility
        seed: 23456
    },
    'NFLX': {
        name: 'Netflix Inc.',
        startPrice: 12.80,      // ~2010 price
        annualDrift: 0.22,      // 22% annual growth
        volatility: 0.035,      // 3.5% daily volatility (more volatile)
        seed: 34567
    },
    'GOOGL': {
        name: 'Alphabet Inc.',
        startPrice: 295.00,     // Pre-split price
        annualDrift: 0.20,      // 20% annual growth
        volatility: 0.020,      // 2.0% daily volatility
        seed: 45678
    },
    'MSFT': {
        name: 'Microsoft Corporation',
        startPrice: 25.50,      // ~2010 price
        annualDrift: 0.23,      // 23% annual growth
        volatility: 0.019,      // 1.9% daily volatility
        seed: 56789
    },
    'AMZN': {
        name: 'Amazon.com Inc.',
        startPrice: 125.00,     // ~2010 price
        annualDrift: 0.27,      // 27% annual growth
        volatility: 0.026,      // 2.6% daily volatility
        seed: 67890
    },
    'NVDA': {
        name: 'NVIDIA Corporation',
        startPrice: 3.50,       // ~2010 price (pre-splits)
        annualDrift: 0.45,      // 45% annual growth (AI boom)
        volatility: 0.032,      // 3.2% daily volatility
        seed: 78901
    }
};

/**
 * Generate synthetic OHLCV data for a given stock
 * @param {string} ticker - Stock ticker symbol
 * @param {Date} startDate - Start date for data generation
 * @param {Date} endDate - End date for data generation
 * @returns {Array} Array of OHLCV data points
 */
function generateSyntheticData(ticker, startDate, endDate) {
    const config = STOCK_CONFIGS[ticker];
    if (!config) {
        throw new Error(`Unknown ticker: ${ticker}`);
    }
    
    const rng = new SeededRandom(config.seed);
    const data = [];
    
    // Convert dates to timestamps
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate number of trading days (skip weekends)
    let currentDate = new Date(start);
    let currentPrice = config.startPrice;
    
    // Daily drift and volatility
    const dailyDrift = config.annualDrift / 252; // 252 trading days per year
    const dailyVol = config.volatility;
    
    while (currentDate <= end) {
        // Skip weekends
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            // Generate price movement using geometric Brownian motion
            const randomShock = rng.nextGaussian();
            const drift = dailyDrift;
            const volatility = dailyVol * randomShock;
            
            // Occasional big moves (earnings, news events) - 5% chance
            const bigMove = rng.next() < 0.05 ? (rng.next() - 0.5) * 0.15 : 0;
            
            const priceChange = currentPrice * (drift + volatility + bigMove);
            currentPrice = Math.max(0.01, currentPrice + priceChange);
            
            // Generate OHLC from close price
            const volatilityFactor = dailyVol * (0.5 + rng.next());
            const high = currentPrice * (1 + volatilityFactor * rng.next());
            const low = currentPrice * (1 - volatilityFactor * rng.next());
            const open = low + (high - low) * rng.next();
            const close = currentPrice;
            
            // Generate volume (correlated with price movement)
            const baseVolume = 50000000 + rng.next() * 100000000;
            const volatilityMultiplier = 1 + Math.abs(volatility) * 10;
            const volume = Math.floor(baseVolume * volatilityMultiplier);
            
            // Format date as YYYY-MM-DD
            const dateStr = currentDate.toISOString().split('T')[0];
            
            data.push({
                Date: dateStr,
                Open: open.toFixed(2),
                High: high.toFixed(2),
                Low: low.toFixed(2),
                Close: close.toFixed(2),
                'Adj Close': close.toFixed(2),
                Volume: volume
            });
        }
        
        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return data;
}

/**
 * Get available tickers for demo mode
 * @returns {Array} Array of ticker objects
 */
function getAvailableTickers() {
    return Object.keys(STOCK_CONFIGS).map(ticker => ({
        ticker: ticker,
        name: STOCK_CONFIGS[ticker].name,
        displayName: `${ticker} - ${STOCK_CONFIGS[ticker].name}`
    }));
}

/**
 * Check if a ticker is available in demo mode
 * @param {string} ticker - Ticker symbol to check
 * @returns {boolean} True if ticker is available
 */
function isTickerAvailable(ticker) {
    return ticker.toUpperCase() in STOCK_CONFIGS;
}

/**
 * Convert data array to CSV format
 * @param {Array} data - Array of data objects
 * @returns {string} CSV formatted string
 */
function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
        const values = headers.map(header => row[header]);
        csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
}

/**
 * Get default date range (15 years of data)
 * @returns {Object} Object with startDate and endDate
 */
function getDefaultDateRange() {
    const endDate = new Date(); // Today
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 15); // 15 years ago
    
    return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
    };
}

// Export for use in main.js
if (typeof window !== 'undefined') {
    window.SyntheticDataGenerator = {
        generateSyntheticData,
        getAvailableTickers,
        isTickerAvailable,
        convertToCSV,
        getDefaultDateRange,
        STOCK_CONFIGS
    };
}
