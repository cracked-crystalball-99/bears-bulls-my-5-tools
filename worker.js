self.addEventListener('message', function (e) {
    const { type, data } = e.data;
    console.log('Worker received message:', type); // Debugging statement
    if (type === 'computeAdx') {
        const adxData = computeAdx(data);
        self.postMessage({ type: 'adx', data: adxData });
    } else if (type === 'computeAdxtr') {
        const adxtrData = computeAdxtr(data);
        self.postMessage({ type: 'adxtr', data: adxtrData });
    } else if (type === 'computeBb') {
        const bbData = computeBb(data);
        self.postMessage({ type: 'bb', data: bbData });
    } else if (type === 'computeBbtr') {
        const bbtrData = computeBbtr(data);
        self.postMessage({ type: 'bbtr', data: bbtrData });
    } else if (type === 'computeCci') {
        const cciData = computeCci(data);
        self.postMessage({ type: 'cci', data: cciData });
    } else if (type === 'computeCcitr') {
        const ccitrData = computeCcitr(data);
        self.postMessage({ type: 'ccitr', data: ccitrData });
    } else if (type === 'computeMacd') {
        const macdData = computeMacd(data);
        self.postMessage({ type: 'macd', data: macdData });
    } else if (type === 'computeCmacd') {
        const cmacdData = computeCmacd(data);
        self.postMessage({ type: 'cmacd', data: cmacdData });
    } else if (type === 'computeSmacd') {
        const smacdData = computeSmacd(data);
        self.postMessage({ type: 'smacd', data: smacdData });
    } else if (type === 'computeRoc') {
        const rocData = computeRoc(data);
        self.postMessage({ type: 'roc', data: rocData });
    } else if (type === 'computeRoctr') {
        const roctrData = computeRoctr(data);
        self.postMessage({ type: 'roctr', data: roctrData });
    } else if (type === 'computeRsi') {
        const rsiData = computeRsi(data);
        console.log('Computed RSI data:', rsiData); // Debugging statement
        self.postMessage({ type: 'rsi', data: rsiData });
    } else if (type === 'computeRsitr') {
        const rsitrData = computeRsitr(data);
        console.log('Computed RSITR data:', rsitrData); // Debugging statement
        self.postMessage({ type: 'rsitr', data: rsitrData });
    } else if (type === 'computeSar') {
        console.log('Starting SAR computation'); // Debugging statement
        const sarData = computeSar(data);
        console.log('Computed SAR data:', sarData); // Debugging statement
        self.postMessage({ type: 'sar', data: sarData });
    } else if (type === 'computeSartr') {
        console.log('Starting SARTR computation'); // Debugging statement
        const sartrData = computeSartr(data);
        console.log('Computed SARTR data:', sartrData); // Debugging statement
        self.postMessage({ type: 'sartr', data: sartrData });
    } else if (type === 'computeSmi') {
        console.log('Starting SMI computation'); // Debugging statement
        const smiData = computeSmi(data);
        console.log('Computed SMI data:', smiData); // Debugging statement
        self.postMessage({ type: 'smi', data: smiData });
    } else if (type === 'computeSmitr') {
        console.log('Starting SMITR computation'); // Debugging statement
        const smitrData = computeSmitr(data);
        console.log('Computed SMITR data:', smitrData); // Debugging statement
        self.postMessage({ type: 'smitr', data: smitrData });
    } else if (type === 'computeWpr') {
        console.log('Starting WPR computation'); // Debugging statement
        const wprData = computeWpr(data);
        console.log('Computed WPR data:', wprData); // Debugging statement
        self.postMessage({ type: 'wpr', data: wprData });
    } else if (type === 'computeWprtr') {
        console.log('Starting WPRTR computation'); // Debugging statement
        const wprtrData = computeWprtr(data);
        console.log('Computed WPRTR data:', wprtrData); // Debugging statement
        self.postMessage({ type: 'wprtr', data: wprtrData });
    } else if (type === 'computeSma5') {
        console.log('Starting SMA5 computation'); // Debugging statement
        const sma5Data = computeSma5(data);
        console.log('Computed SMA5 data:', sma5Data); // Debugging statement
        self.postMessage({ type: 'sma5', data: sma5Data });
    } else if (type === 'computeCcismatr') {
        console.log('Starting CCISMATR computation'); // Debugging statement
        const ccismatrData = computeCcismatr(data);
        console.log('Computed CCISMATR data:', ccismatrData); // Debugging statement
        self.postMessage({ type: 'ccismatr', data: ccismatrData });
    } else if (type === 'computeRocsmatr') {
        console.log('Starting ROCSMATR computation'); // Debugging statement
        const rocsmatrData = computeRocsmatr(data);
        console.log('Computed ROCSMATR data:', rocsmatrData); // Debugging statement
        self.postMessage({ type: 'rocsmatr', data: rocsmatrData });
    } else if (type === 'computeRsismatr') {
        console.log('Starting RSISMATR computation'); // Debugging statement
        const rsismatrData = computeRsismatr(data);
        console.log('Computed RSISMATR data:', rsismatrData); // Debugging statement
        self.postMessage({ type: 'rsismatr', data: rsismatrData });
    } else if (type === 'computeSmismatr') {
        console.log('Starting SMISMATR computation'); // Debugging statement
        const smismatrData = computeSmismatr(data);
        console.log('Computed SMISMATR data:', smismatrData); // Debugging statement
        self.postMessage({ type: 'smismatr', data: smismatrData });
    } else if (type === 'computeWprsmatr') {
        console.log('Starting WPRSMATR computation'); // Debugging statement
        const wprsmatrData = computeWprsmatr(data);
        console.log('Computed WPRSMATR data:', wprsmatrData); // Debugging statement
        self.postMessage({ type: 'wprsmatr', data: wprsmatrData });
    }
});


// Function to compute ADX
function computeAdx(data, period = 14) {
    const adxData = [];
    const high = data.map(row => parseFloat(row[2])); // Assuming 'High' is the 3rd column
    const low = data.map(row => parseFloat(row[3])); // Assuming 'Low' is the 4th column
    const close = data.map(row => parseFloat(row[4])); // Assuming 'Close' is the 5th column

    let tr = [];
    let pdm = [];
    let ndm = [];
    let tr14 = [];
    let pdm14 = [];
    let ndm14 = [];
    let pdi14 = [];
    let ndi14 = [];
    let dx = [];
    let adx = [];

    for (let i = 1; i < data.length; i++) {
        const trValue = Math.max(high[i] - low[i], Math.abs(high[i] - close[i - 1]), Math.abs(low[i] - close[i - 1]));
        tr.push(trValue);

        const pdmValue = high[i] > high[i - 1] && high[i] - high[i - 1] > low[i - 1] - low[i] ? high[i] - high[i - 1] : 0;
        pdm.push(pdmValue);

        const ndmValue = low[i - 1] > low[i] && low[i - 1] - low[i] > high[i] - high[i - 1] ? low[i - 1] - low[i] : 0;
        ndm.push(ndmValue);

        if (i >= period) {
            const tr14Value = tr.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
            tr14.push(tr14Value);

            const pdm14Value = pdm.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
            pdm14.push(pdm14Value);

            const ndm14Value = ndm.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
            ndm14.push(ndm14Value);

            const pdi14Value = (pdm14Value / tr14Value) * 100;
            pdi14.push(pdi14Value);

            const ndi14Value = (ndm14Value / tr14Value) * 100;
            ndi14.push(ndi14Value);

            const dxValue = (Math.abs(pdi14Value - ndi14Value) / (pdi14Value + ndi14Value)) * 100;
            dx.push(dxValue);

            if (adx.length === 0) {
                adx.push(dxValue);
            } else {
                const adxValue = ((adx[adx.length - 1] * (period - 1)) + dxValue) / period;
                adx.push(adxValue);
            }
        }
    }

    for (let i = period; i < data.length; i++) {
        if (!isNaN(pdi14[i - period]) && !isNaN(ndi14[i - period]) && !isNaN(dx[i - period]) && !isNaN(adx[i - period])) {
            adxData.push({
                date: data[i][0], // Assuming 'Date' is the 1st column
                pdi: pdi14[i - period].toFixed(2),
                ndi: ndi14[i - period].toFixed(2),
                dx: dx[i - period].toFixed(2),
                adx: adx[i - period].toFixed(2)
            });
        }
    }

    return adxData;
}

// Function to compute ADXTR
function computeAdxtr(data) {
    const adxData = computeAdx(data);
    const adxtrData = adxData.map((row, index, array) => {
        if (index === 0) return null; // Skip the first row

        const prevPdi = parseFloat(array[index - 1].pdi);
        const prevNdi = parseFloat(array[index - 1].ndi);
        const currPdi = parseFloat(row.pdi);
        const currNdi = parseFloat(row.ndi);
        const currAdx = parseFloat(row.adx);

        let signal = 0;
        if (!isNaN(prevPdi) && !isNaN(prevNdi) && !isNaN(currPdi) && !isNaN(currNdi) && !isNaN(currAdx)) {
            if (prevPdi < prevNdi && currPdi > currNdi && currAdx > 20) {
                signal = 1;
            } else if (prevPdi > prevNdi && currPdi < currNdi && currAdx > 20) {
                signal = -1;
            }
        }

        return { date: row.date, signal: signal };
    }).filter(row => row !== null); // Filter out null values

    console.log('ADXTR data:', adxtrData); // Debugging statement
    return adxtrData;
}

// Function to compute Bollinger Bands (BB)
function computeBb(data, period = 20, multiplier = 2) {
    const bbData = [];
    const close = data.map(row => parseFloat(row[4])); // Assuming 'Close' is the 5th column

    for (let i = period - 1; i < close.length; i++) {
        const slice = close.slice(i - period + 1, i + 1);
        const mean = slice.reduce((a, b) => a + b, 0) / period;
        const stdDev = Math.sqrt(slice.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / period);
        const upperBand = mean + (multiplier * stdDev);
        const lowerBand = mean - (multiplier * stdDev);
        const percentB = ((close[i] - lowerBand) / (upperBand - lowerBand)) * 100;

        if (!isNaN(lowerBand) && !isNaN(mean) && !isNaN(upperBand) && !isNaN(percentB)) {
            bbData.push({
                date: data[i][0], // Assuming 'Date' is the 1st column
                lowerBand: lowerBand.toFixed(2),
                mean: mean.toFixed(2),
                upperBand: upperBand.toFixed(2),
                percentB: percentB.toFixed(2)
            });
        }
    }

    return bbData;
}

// Function to compute BBTR
function computeBbtr(data) {
    const bbData = computeBb(data);
    const bbtrData = bbData.map((row, index, array) => {
        if (index === 0) return null; // Skip the first row

        const prevPercentB = parseFloat(array[index - 1].percentB);
        const currPercentB = parseFloat(row.percentB);

        let signal = 0;
        if (!isNaN(prevPercentB) && !isNaN(currPercentB)) {
            if (prevPercentB < 20 && currPercentB > 20) {
                signal = 1;
            } else if (prevPercentB > 80 && currPercentB < 80) {
                signal = -1;
            }
        }

        return { date: row.date, signal: signal };
    }).filter(row => row !== null); // Filter out null values

    console.log('BBTR data:', bbtrData); // Debugging statement
    return bbtrData;
}

// Function to compute Commodity Channel Index (CCI)
function computeCci(data, period = 20) {
    const cciData = [];
    const typicalPrice = data.map(row => (parseFloat(row[2]) + parseFloat(row[3]) + parseFloat(row[4])) / 3); // Assuming 'High', 'Low', 'Close' are the 3rd, 4th, and 5th columns

    for (let i = period - 1; i < typicalPrice.length; i++) {
        const tpSlice = typicalPrice.slice(i - period + 1, i + 1);
        const sma = tpSlice.reduce((a, b) => a + b, 0) / period;
        const meanDeviation = tpSlice.reduce((a, b) => a + Math.abs(b - sma), 0) / period;
        const cciValue = (typicalPrice[i] - sma) / (0.015 * meanDeviation);

        cciData.push({
            date: data[i][0], // Assuming 'Date' is the 1st column
            cci: cciValue.toFixed(2) // Format to 2 decimal places
        });
    }

    console.log('CCI computation completed'); // Debugging statement
    return cciData;
}

// Function to compute CCITR
function computeCcitr(data) {
    const cciData = computeCci(data);

    const ccitrData = cciData.map((row, index, array) => {
        if (index === 0) return { date: row.date, x: 0 }; // No signal for the first row

        const prevCci = parseFloat(array[index - 1].cci);
        const currCci = parseFloat(row.cci);

        let signal = 0;
        if (!isNaN(prevCci) && !isNaN(currCci)) {
            if (prevCci < -100 && currCci > -100) {
                signal = 1;
            } else if (prevCci < 100 && currCci > 100) {
                signal = -1;
            }
        }

        return { date: row.date, x: signal };
    });

    return ccitrData;
}

// Helper function to calculate EMA
function calculateEma(values, period) {
    const k = 2 / (period + 1);
    let ema = values[0];
    for (let i = 1; i < values.length; i++) {
        ema = values[i] * k + ema * (1 - k);
    }
    return ema;
}

// Function to compute MACD
function computeMacd(data) {
    const macdData = [];
    const shortPeriod = 12;
    const longPeriod = 26;
    const signalPeriod = 9;

    let shortEma = [];
    let longEma = [];
    let macdLine = [];
    let signalLine = [];

    for (let i = 0; i < data.length; i++) {
        const close = parseFloat(data[i][4]); // Assuming 'Close' is the 5th column

        if (i >= shortPeriod - 1) {
            const shortEmaValue = calculateEma(data.slice(i - shortPeriod + 1, i + 1).map(row => parseFloat(row[4])), shortPeriod);
            shortEma.push(shortEmaValue);
        } else {
            shortEma.push(NaN);
        }

        if (i >= longPeriod - 1) {
            const longEmaValue = calculateEma(data.slice(i - longPeriod + 1, i + 1).map(row => parseFloat(row[4])), longPeriod);
            longEma.push(longEmaValue);
        } else {
            longEma.push(NaN);
        }

        if (i >= longPeriod - 1) {
            const macdValue = shortEma[shortEma.length - 1] - longEma[longEma.length - 1];
            macdLine.push(macdValue);

            if (macdLine.length >= signalPeriod) {
                const signalValue = calculateEma(macdLine.slice(macdLine.length - signalPeriod), signalPeriod);
                signalLine.push(signalValue);
            } else {
                signalLine.push(NaN);
            }
        } else {
            macdLine.push(NaN);
            signalLine.push(NaN);
        }

        const macd = isNaN(macdLine[macdLine.length - 1]) ? 'NA' : parseFloat(macdLine[macdLine.length - 1].toFixed(2));
        const signal = isNaN(signalLine[signalLine.length - 1]) ? 'NA' : parseFloat(signalLine[signalLine.length - 1].toFixed(2));

        console.log(`Date: ${data[i][0]}, MACD: ${macd}, Signal: ${signal}`); // Debugging statement

        macdData.push({
            date: data[i][0], // Assuming 'Date' is the 1st column
            macd: macd,
            signal: signal
        });
    }

    return macdData;
}

// Function to compute CMACD
function computeCmacd(data) {
    const macdData = computeMacd(data);
    const cmacdData = macdData.map((row, index, array) => {
        if (index === 0) return { date: row.date, x: 0 }; // No signal for the first row

        const prevMacd = array[index - 1].macd;
        const currMacd = row.macd;

        let signal = 0;
        if (prevMacd !== 'NA' && currMacd !== 'NA') {
            if (prevMacd < 0 && currMacd > 0) {
                signal = 1;
            } else if (prevMacd > 0 && currMacd < 0) {
                signal = -1;
            }
        }

        return { date: row.date, x: signal };
    });

    return cmacdData;
}

// Function to compute SMACD
function computeSmacd(data) {
    const macdData = computeMacd(data);
    const smacdData = macdData.map((row, index, array) => {
        if (index === 0) return { date: row.date, x: 0 }; // No signal for the first row

        const prevMacd = array[index - 1].macd;
        const prevSignal = array[index - 1].signal;
        const currMacd = row.macd;
        const currSignal = row.signal;

        let signal = 0;
        if (prevMacd !== 'NA' && prevSignal !== 'NA' && currMacd !== 'NA' && currSignal !== 'NA') {
            if (prevMacd < prevSignal && currMacd > currSignal) {
                signal = 1;
            } else if (prevMacd > prevSignal && currMacd < currSignal) {
                signal = -1;
            }
        }

        return { date: row.date, x: signal };
    });

    return smacdData;
}

