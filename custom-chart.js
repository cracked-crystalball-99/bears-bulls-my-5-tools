/**
 * Custom Chart Module - Lightweight Bar Chart Implementation
 * Replaces Chart.js dependency for trading-analysis-master
 * Author: Custom implementation for percentagesenvy.com
 */

class CustomBarChart {
    constructor(canvas, config) {
        if (!canvas) {
            throw new Error('CustomBarChart: Canvas element is required');
        }
        if (!config || !config.data) {
            throw new Error('CustomBarChart: Configuration with data is required');
        }
        
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.config = config;
        this.data = config.data;
        this.options = config.options || {};
        
        console.log('CustomBarChart initialized successfully');
        
        // Set canvas dimensions
        this.canvas.width = this.canvas.offsetWidth || 800;
        this.canvas.height = this.canvas.offsetHeight || 400;
        
        // Chart dimensions and margins
        this.margins = {
            top: 40,
            right: 40,
            bottom: 60,
            left: 60
        };
        
        this.chartWidth = this.canvas.width - this.margins.left - this.margins.right;
        this.chartHeight = this.canvas.height - this.margins.top - this.margins.bottom;
        
        this.render();
    }
    
    destroy() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set high DPI scaling for crisp rendering
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.drawBackground();
        this.drawChart();
        this.drawAxes();
        this.drawLabels();
        this.drawLegend();
    }
    
    drawBackground() {
        // Clean white background
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width / (window.devicePixelRatio || 1), 
                         this.canvas.height / (window.devicePixelRatio || 1));
    }
    
    drawChart() {
        const dataset = this.data.datasets[0];
        const values = dataset.data;
        const maxValue = Math.max(...values) || 1;
        const barWidth = this.chartWidth / (values.length * 2);
        const barSpacing = barWidth * 0.5;
        
        values.forEach((value, index) => {
            const barHeight = (value / maxValue) * this.chartHeight;
            const x = this.margins.left + (index * (barWidth + barSpacing)) + barSpacing;
            const y = this.margins.top + this.chartHeight - barHeight;
            
            // Draw bar shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            this.ctx.fillRect(x + 2, y + 2, barWidth, barHeight);
            
            // Draw main bar
            const color = dataset.backgroundColor[index] || '#4CAF50';
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw bar border
            this.ctx.strokeStyle = dataset.borderColor ? dataset.borderColor[index] : '#333';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y, barWidth, barHeight);
            
            // Draw value on top of bar
            this.ctx.fillStyle = '#333';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(value.toString(), x + barWidth/2, y - 10);
        });
    }
    
    drawAxes() {
        this.ctx.strokeStyle = '#666';
        this.ctx.lineWidth = 2;
        
        // Y-axis
        this.ctx.beginPath();
        this.ctx.moveTo(this.margins.left, this.margins.top);
        this.ctx.lineTo(this.margins.left, this.margins.top + this.chartHeight);
        this.ctx.stroke();
        
        // X-axis  
        this.ctx.beginPath();
        this.ctx.moveTo(this.margins.left, this.margins.top + this.chartHeight);
        this.ctx.lineTo(this.margins.left + this.chartWidth, this.margins.top + this.chartHeight);
        this.ctx.stroke();
    }
    
    drawLabels() {
        this.ctx.fillStyle = '#333';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        
        // X-axis labels
        const labels = this.data.labels;
        const barWidth = this.chartWidth / (labels.length * 2);
        const barSpacing = barWidth * 0.5;
        
        labels.forEach((label, index) => {
            const x = this.margins.left + (index * (barWidth + barSpacing)) + barSpacing + barWidth/2;
            const y = this.margins.top + this.chartHeight + 25;
            this.ctx.fillText(label, x, y);
        });
        
        // Y-axis labels
        const dataset = this.data.datasets[0];
        const maxValue = Math.max(...dataset.data) || 1;
        const steps = 5;
        
        this.ctx.textAlign = 'right';
        for (let i = 0; i <= steps; i++) {
            const value = (maxValue / steps) * i;
            const y = this.margins.top + this.chartHeight - (i * this.chartHeight / steps);
            this.ctx.fillText(Math.round(value).toString(), this.margins.left - 10, y + 4);
            
            // Draw grid lines
            this.ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(this.margins.left, y);
            this.ctx.lineTo(this.margins.left + this.chartWidth, y);
            this.ctx.stroke();
        }
    }
    
    drawLegend() {
        // Simple title
        this.ctx.fillStyle = '#333';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Trading Analysis Tools - Vote Summary', 
                         this.canvas.width / (window.devicePixelRatio || 1) / 2, 25);
    }
    
    // Method to update chart data
    updateData(newData) {
        this.data = newData;
        this.render();
    }
}

// Export for use in main application
window.CustomBarChart = CustomBarChart;