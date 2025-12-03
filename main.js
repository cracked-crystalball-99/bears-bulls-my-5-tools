// Initialize the worker
const worker = new Worker('worker.js?v=1.61');

// Event listener for worker messages
worker.addEventListener('message', function (e) {
    const { type, data } = e.data;
    console.log(`Received message from worker: ${type}`, data);
    if (type === 'adx') {
        populateTable2(data);
    } else if (type === 'adxtr') {
        populateTable3(data);
        updateB2AndC2(data);
        updateToolVoiceCount();
        updateSumValues(); // Update sum values when new data is received
        updateB17AndC17(); // Ensure b17 and c17 are updated
        updateVotesChart(); // Update chart when new data is received
    } else if (type === 'bb') {
        populateTable4(data);
        updateB3AndC3(data); // Update votesTable when new BB data is received
        updateB17AndC17(); // Ensure b17 and c17 are updated
    } else if (type === 'bbtr') {
        populateTable5(data);
        updateB3AndC3(data); // Update votesTable when new BBTR data is received
        updateB17AndC17(); // Ensure b17 and c17 are updated
        updateVotesChart(); // Update chart when new data is received
    } else if (type === 'cci') {
        console.log('Populating Table 6 with CCI values:', data);
        populateTable6(data);
    } else if (type === 'ccitr') {
        console.log('Populating Table 7 with CCITR values:', data);
        populateTable7(data);
        updateB4AndC4(data); // Update votesTable when new CCITR data is received
        updateB17AndC17(); // Ensure b17 and c17 are updated
        updateVotesChart(); // Update chart when new data is received
    } else if (type === 'macd') {
        console.log('Populating Table 8 with MACD values:', data);
        populateTable8(data);
    } else if (type === 'cmacd') {
        console.log('Populating Table 9 with CMACD values:', data);
        populateTable9(data);
        updateB5AndC5(data); // Update votesTable when new CMACD data is received
        updateB17AndC17(); // Ensure b17 and c17 are updated
        updateVotesChart(); // Update chart when new data is received
    } else if (type === 'smacd') {
        console.log('Populating Table 10 with SMACD values:', data);
        populateTable10(data);
        updateB6AndC6(data); // Update votesTable when new SMACD data is received
        updateB17AndC17(); // Ensure b17 and c17 are updated
        updateVotesChart(); // Update chart when new data is received
    }

});

// Fetch data from Table 1
function fetchData() {
    const table1Body = document.getElementById('csvTableBody');
    if (!table1Body) {
        console.error('Table body not found');
        return [];
    }

    const rows = table1Body.getElementsByTagName('tr');
    const data = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const rowData = [];
        for (let j = 0; j < cells.length; j++) {
            let cellValue = cells[j].innerText.trim();
            if (j === 4) { // Assuming 'Close' is the 5th column (0-based index)
                let parsedValue = parseFloat(cellValue);
                if (!isNaN(parsedValue)) {
                    // Check if the leading digit is zero
                    if (cellValue.startsWith('0') && !cellValue.startsWith('0.')) {
                        cellValue = (parsedValue * 100).toFixed(3); // Multiply by 100 and format to 3 decimal places
                    } else {
                        cellValue = parsedValue.toFixed(3); // Format to 3 decimal places
                    }
                }
            } else if (j >= 1 && j <= 5) { // Columns 2 to 6 (0-based index)
                let parsedValue = parseFloat(cellValue);
                if (!isNaN(parsedValue)) {
                    cellValue = parsedValue.toFixed(3); // Format to 3 decimal places
                }
            }
            rowData.push(cellValue);
        }
        data.push(rowData);
    }

    console.log('Fetched data from Table 1:', data);
    return data;
}

// Event listeners for buttons to compute ADX, ADXTR, BB, BBTR, CCI, CCITR, MACD, CMACD, and SMACD values
document.getElementById('computeAdxValuesButton').addEventListener('click', function () {
    const data = fetchData();
    worker.postMessage({ type: 'computeAdx', data });
    console.log('Sent data to worker for ADX computation:', data);
});

document.getElementById('computeAdxtrValuesButton').addEventListener('click', function () {
    const data = fetchData();
    worker.postMessage({ type: 'computeAdxtr', data });
    console.log('Sent data to worker for ADXTR computation:', data);
});

document.getElementById('computeBbValuesButton').addEventListener('click', function () {
    const data = fetchData();
    worker.postMessage({ type: 'computeBb', data });
    console.log('Sent data to worker for BB computation:', data);
});

// Event Listener for Compute BBTR Button
document.getElementById('computeBbtrValuesButton').addEventListener('click', function () {
    const data = fetchData();
    worker.postMessage({ type: 'computeBbtr', data });
    console.log('Sent data to worker for BBTR computation:', data);
});

document.getElementById('computeCciValuesButton').addEventListener('click', function () {
    const data = fetchData();
    worker.postMessage({ type: 'computeCci', data });
    console.log('Sent data to worker for CCI computation:', data);
});

document.getElementById('computeCcitrValuesButton').addEventListener('click', function () {
    const data = fetchData();
    worker.postMessage({ type: 'computeCcitr', data });
    console.log('Sent data to worker for CCITR computation:', data);
});

// Event listener for MACD computation button
document.getElementById('computeMacdValuesButton').addEventListener('click', function () {
    const data = fetchData();
    worker.postMessage({ type: 'computeMacd', data });
    console.log('Sent data to worker for MACD computation:', data);
});

document.getElementById('computeCmacdValuesButton').addEventListener('click', function () {
    const data = fetchData();
    worker.postMessage({ type: 'computeCmacd', data });
    console.log('Sent data to worker for CMACD computation:', data);
});

document.getElementById('computeSmacdValuesButton').addEventListener('click', function () {
    const data = fetchData();
    worker.postMessage({ type: 'computeSmacd', data });
    console.log('Sent data to worker for SMACD computation:', data);
});




// Populate Table 2 with ADX values
function populateTable2(adxData) {
    const table2Body = document.getElementById('adxTableBody');
    table2Body.innerHTML = ''; // Clear existing data

    adxData.forEach(row => {
        const tableRow = document.createElement('tr');
        const dateCell = document.createElement('td');
        const pdiCell = document.createElement('td');
        const ndiCell = document.createElement('td');
        const dxCell = document.createElement('td');
        const adxCell = document.createElement('td');

        dateCell.innerText = row.date;
        pdiCell.innerText = row.pdi;
        ndiCell.innerText = row.ndi;
        dxCell.innerText = row.dx;
        adxCell.innerText = row.adx;

        tableRow.appendChild(dateCell);
        tableRow.appendChild(pdiCell);
        tableRow.appendChild(ndiCell);
        tableRow.appendChild(dxCell);
        tableRow.appendChild(adxCell);
        table2Body.appendChild(tableRow);
    });

    console.log('Populated Table 2 with ADX values:', adxData);
}

// Populate Table 3 with ADXTR values
function populateTable3(adxtrData) {
    const table3Body = document.getElementById('adxtrTableBody');
    table3Body.innerHTML = ''; // Clear existing data

    adxtrData.forEach(row => {
        console.log(`Populating Table 3 - Date: ${row.date}, ADXTR Signal: ${row.signal}`);

        const tableRow = document.createElement('tr');
        const dateCell = document.createElement('td');
        const signalCell = document.createElement('td');

        dateCell.innerText = row.date;
        signalCell.innerText = row.signal;

        // Apply conditional formatting
        if (row.signal === -1) {
            signalCell.classList.add('red-cell');
        } else if (row.signal === 1) {
            signalCell.classList.add('green-cell');
        }

        tableRow.appendChild(dateCell);
        tableRow.appendChild(signalCell);
        table3Body.appendChild(tableRow);
    });

    console.log('Populated Table 3 with ADXTR values:', adxtrData);
}

// Populate Table 4 with BB values
function populateTable4(bbData) {
    const table4Body = document.getElementById('bbTableBody');
    table4Body.innerHTML = ''; // Clear existing data

    bbData.forEach(row => {
        console.log(`Populating Table 4 - Date: ${row.date}, Lower Band: ${row.lowerBand}, Mean: ${row.mean}, Upper Band: ${row.upperBand}, %B: ${row.percentB}`);

        const tableRow = document.createElement('tr');
        const dateCell = document.createElement('td');
        const lowerBandCell = document.createElement('td');
        const meanCell = document.createElement('td');
        const upperBandCell = document.createElement('td');
        const percentBCell = document.createElement('td');

        dateCell.innerText = row.date;
        lowerBandCell.innerText = row.lowerBand;
        meanCell.innerText = row.mean;
        upperBandCell.innerText = row.upperBand;
        percentBCell.innerText = row.percentB;

        tableRow.appendChild(dateCell);
        tableRow.appendChild(lowerBandCell);
        tableRow.appendChild(meanCell);
        tableRow.appendChild(upperBandCell);
        tableRow.appendChild(percentBCell);
        table4Body.appendChild(tableRow);
    });

    console.log('Populated Table 4 with BB values:', bbData);
}

// Populate Table 5 with BBTR values
function populateTable5(bbtrData) {
    const table5Body = document.getElementById('bbtrTableBody');
    table5Body.innerHTML = ''; // Clear existing data

    bbtrData.forEach(row => {
        console.log(`Populating Table 5 - Date: ${row.date}, BBTR Signal: ${row.signal}`);

        const tableRow = document.createElement('tr');
        const dateCell = document.createElement('td');
        const signalCell = document.createElement('td');

        dateCell.innerText = row.date;
        signalCell.innerText = row.signal;

        // Apply conditional formatting
        if (row.signal === -1) {
            signalCell.classList.add('red-cell');
        } else if (row.signal === 1) {
            signalCell.classList.add('green-cell');
        }

        tableRow.appendChild(dateCell);
        tableRow.appendChild(signalCell);
        table5Body.appendChild(tableRow);
    });

    console.log('Populated Table 5 with BBTR values:', bbtrData);
}

// Populate Table 6 with CCI values
function populateTable6(cciData) {
    const table6Body = document.getElementById('cciTableBody');
    table6Body.innerHTML = ''; // Clear existing data

    cciData.forEach(row => {
        const tableRow = document.createElement('tr');
        const dateCell = document.createElement('td');
        const cciCell = document.createElement('td');

        dateCell.innerText = row.date;
        cciCell.innerText = row.cci;

        tableRow.appendChild(dateCell);
        tableRow.appendChild(cciCell);
        table6Body.appendChild(tableRow);
    });

    console.log('Populated Table 6 with CCI values:', cciData);
}

// Populate Table 7 with CCITR values
function populateTable7(ccitrData) {
    const table7Body = document.getElementById('ccitrTableBody');
    table7Body.innerHTML = ''; // Clear existing data

    ccitrData.forEach(row => {
        const tableRow = document.createElement('tr');
        const dateCell = document.createElement('td');
        const ccitrCell = document.createElement('td');

        dateCell.innerText = row.date;
        ccitrCell.innerText = row.x;

        // Apply conditional formatting
        if (row.x === -1) {
            ccitrCell.classList.add('red-cell');
        } else if (row.x === 1) {
            ccitrCell.classList.add('green-cell');
        }

        tableRow.appendChild(dateCell);
        tableRow.appendChild(ccitrCell);
        table7Body.appendChild(tableRow);
    });

    console.log('Populated Table 7 with CCITR values:', ccitrData);
}

// Function to populate Table 8 with MACD values
function populateTable8(data) {
    const tableBody = document.getElementById('macdTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(row => {
        const tr = document.createElement('tr');
        const dateTd = document.createElement('td');
        const macdTd = document.createElement('td');
        const signalTd = document.createElement('td');

        dateTd.innerText = row.date;
        macdTd.innerText = isNaN(row.macd) ? row.macd : parseFloat(row.macd).toFixed(4); // Ensure 4 decimal places if number
        signalTd.innerText = isNaN(row.signal) ? row.signal : parseFloat(row.signal).toFixed(4); // Ensure 4 decimal places if number

        tr.appendChild(dateTd);
        tr.appendChild(macdTd);
        tr.appendChild(signalTd);
        tableBody.appendChild(tr);
    });
}

// Populate Table 9 with CMACD values
function populateTable9(cmacdData) {
    const table9Body = document.getElementById('cmacdTableBody');
    table9Body.innerHTML = ''; // Clear existing data

    cmacdData.forEach(row => {
        const tableRow = document.createElement('tr');
        const dateCell = document.createElement('td');
        const cmacdCell = document.createElement('td');

        dateCell.innerText = row.date;
        cmacdCell.innerText = row.x;

        // Apply conditional formatting
        if (row.x === -1) {
            cmacdCell.classList.add('red-cell');
        } else if (row.x === 1) {
            cmacdCell.classList.add('green-cell');
        }

        tableRow.appendChild(dateCell);
        tableRow.appendChild(cmacdCell);
        table9Body.appendChild(tableRow);
    });

    console.log('Populated Table 9 with CMACD values:', cmacdData);
}

// Populate Table 10 with SMACD values
function populateTable10(smacdData) {
    const table10Body = document.getElementById('smacdTableBody');
    table10Body.innerHTML = ''; // Clear existing data

    smacdData.forEach(row => {
        const tableRow = document.createElement('tr');
        const dateCell = document.createElement('td');
        const smacdCell = document.createElement('td');

        dateCell.innerText = row.date;
        smacdCell.innerText = row.x;

        // Apply conditional formatting
        if (row.x === -1) {
            smacdCell.classList.add('red-cell');
        } else if (row.x === 1) {
            smacdCell.classList.add('green-cell');
        }

        tableRow.appendChild(dateCell);
        tableRow.appendChild(smacdCell);
        table10Body.appendChild(tableRow);
    });

    console.log('Populated Table 10 with SMACD values:', smacdData);
}


// Update b2 and c2 cells based on ADXTR values
function updateB2AndC2(adxtrData) {
    const b2Cell = document.getElementById('b2');
    const c2Cell = document.getElementById('c2');

    if (!b2Cell || !c2Cell) {
        console.error('b2 or c2 cell not found');
        return;
    }

    const b2Value = adxtrData.reduce((acc, row) => acc + (row.signal === 1 ? 1 : 0), 0);
    const c2Value = adxtrData.reduce((acc, row) => acc + (row.signal === -1 ? 1 : 0), 0);

    b2Cell.innerText = b2Value;
    c2Cell.innerText = c2Value;

    console.log('Updated b2 and c2 cells with ADXTR values:', { b2Value, c2Value });

    // Update d2 cell based on the difference between b2 and c2
    updateD2();

    // Update the chart after updating the cells
    updateVotesChart();
}

// Update d2 cell based on the difference between b2 and c2
function updateD2() {
    const b2Cell = document.getElementById('b2');
    const c2Cell = document.getElementById('c2');
    const d2Cell = document.getElementById('d2');

    if (!b2Cell || !c2Cell || !d2Cell) {
        console.error('b2, c2, or d2 cell not found');
        return;
    }

    const b2Value = parseInt(b2Cell.innerText, 10) || 0;
    const c2Value = parseInt(c2Cell.innerText, 10) || 0;
    const d2Value = b2Value - c2Value;

    d2Cell.innerText = d2Value;

    // Apply conditional formatting to d2 cell
    if (d2Value > 0) {
        d2Cell.style.backgroundColor = 'green';
        d2Cell.style.color = 'white';
    } else if (d2Value < 0) {
        d2Cell.style.backgroundColor = 'red';
        d2Cell.style.color = 'white';
    } else {
        d2Cell.style.backgroundColor = '';
        d2Cell.style.color = '';
    }

    console.log('Updated d2 cell with difference between b2 and c2:', d2Value);
}

// Update b3 and c3 cells based on BB values
function updateB3AndC3(bbData) {
    const b3Cell = document.getElementById('b3');
    const c3Cell = document.getElementById('c3');

    if (!b3Cell || !c3Cell) {
        console.error('b3 or c3 cell not found');
        return;
    }

    const b3Value = bbData.reduce((acc, row) => acc + (row.signal === 1 ? 1 : 0), 0);
    const c3Value = bbData.reduce((acc, row) => acc + (row.signal === -1 ? 1 : 0), 0);

    b3Cell.innerText = b3Value;
    c3Cell.innerText = c3Value;

    console.log('Updated b3 and c3 cells with BB values:', { b3Value, c3Value });

    // Update d3 cell based on the difference between b3 and c3
    updateD3();

    // Update the chart after updating the cells
    updateVotesChart();
}

// Update d3 cell based on the difference between b3 and c3
function updateD3() {
    const b3Cell = document.getElementById('b3');
    const c3Cell = document.getElementById('c3');
    const d3Cell = document.getElementById('d3');

    if (!b3Cell || !c3Cell || !d3Cell) {
        console.error('b3, c3, or d3 cell not found');
        return;
    }

    const b3Value = parseInt(b3Cell.innerText, 10) || 0;
    const c3Value = parseInt(c3Cell.innerText, 10) || 0;
    const d3Value = b3Value - c3Value;

    d3Cell.innerText = d3Value;

    // Apply conditional formatting to d3 cell
    if (d3Value > 0) {
        d3Cell.style.backgroundColor = 'green';
        d3Cell.style.color = 'white';
    } else if (d3Value < 0) {
        d3Cell.style.backgroundColor = 'red';
        d3Cell.style.color = 'white';
    } else {
        d3Cell.style.backgroundColor = '';
        d3Cell.style.color = '';
    }

    console.log('Updated d3 cell with difference between b3 and c3:', d3Value);
}

// Update b4 and c4 cells based on CCITR values
function updateB4AndC4(ccitrData) {
    const b4Cell = document.getElementById('b4');
    const c4Cell = document.getElementById('c4');

    if (!b4Cell || !c4Cell) {
        console.error('b4 or c4 cell not found');
        return;
    }

    const b4Value = ccitrData.reduce((acc, row) => acc + (row.x === 1 ? 1 : 0), 0);
    const c4Value = ccitrData.reduce((acc, row) => acc + (row.x === -1 ? 1 : 0), 0);

    b4Cell.innerText = b4Value;
    c4Cell.innerText = c4Value;

    console.log('Updated b4 and c4 cells with CCITR values:', { b4Value, c4Value });

    // Update d4 cell based on the difference between b4 and c4
    updateD4();
}

// Update d4 cell based on the difference between b4 and c4
function updateD4() {
    const b4Cell = document.getElementById('b4');
    const c4Cell = document.getElementById('c4');
    const d4Cell = document.getElementById('d4');

    if (!b4Cell || !c4Cell || !d4Cell) {
        console.error('b4, c4, or d4 cell not found');
        return;
    }

    const b4Value = parseInt(b4Cell.innerText, 10) || 0;
    const c4Value = parseInt(c4Cell.innerText, 10) || 0;
    const d4Value = b4Value - c4Value;

    d4Cell.innerText = d4Value;

    // Apply conditional formatting to d4 cell only if difference is non-zero
    if (d4Value > 0) {
        d4Cell.classList.add('green-cell');
        d4Cell.classList.remove('red-cell');
    } else if (d4Value < 0) {
        d4Cell.classList.add('red-cell');
        d4Cell.classList.remove('green-cell');
    } else {
        d4Cell.classList.remove('green-cell');
        d4Cell.classList.remove('red-cell');
    }

    console.log('Updated d4 cell with difference between b4 and c4:', d4Value);
}

// Update b5 and c5 cells based on CMACD values
function updateB5AndC5(cmacdData) {
    const b5Cell = document.getElementById('b5');
    const c5Cell = document.getElementById('c5');

    if (!b5Cell || !c5Cell) {
        console.error('b5 or c5 cell not found');
        return;
    }

    const b5Value = cmacdData.reduce((acc, row) => acc + (row.x === 1 ? 1 : 0), 0);
    const c5Value = cmacdData.reduce((acc, row) => acc + (row.x === -1 ? 1 : 0), 0);

    b5Cell.innerText = b5Value;
    c5Cell.innerText = c5Value;

    console.log('Updated b5 and c5 cells with CMACD values:', { b5Value, c5Value });

    // Update d5 cell based on the difference between b5 and c5
    updateD5();
}

// Update d5 cell based on the difference between b5 and c5
function updateD5() {
    const b5Cell = document.getElementById('b5');
    const c5Cell = document.getElementById('c5');
    const d5Cell = document.getElementById('d5');

    if (!b5Cell || !c5Cell || !d5Cell) {
        console.error('b5, c5, or d5 cell not found');
        return;
    }

    const b5Value = parseInt(b5Cell.innerText, 10) || 0;
    const c5Value = parseInt(c5Cell.innerText, 10) || 0;
    const d5Value = b5Value - c5Value;

    d5Cell.innerText = d5Value;

    // Apply conditional formatting to d5 cell only if difference is non-zero
    if (d5Value > 0) {
        d5Cell.classList.add('green-cell');
        d5Cell.classList.remove('red-cell');
    } else if (d5Value < 0) {
        d5Cell.classList.add('red-cell');
        d5Cell.classList.remove('green-cell');
    } else {
        d5Cell.classList.remove('green-cell');
        d5Cell.classList.remove('red-cell');
    }

    console.log('Updated d5 cell with difference between b5 and c5:', d5Value);
}

// Update b6 and c6 cells based on SMACD values
function updateB6AndC6(smacdData) {
    const b6Cell = document.getElementById('b6');
    const c6Cell = document.getElementById('c6');

    if (!b6Cell || !c6Cell) {
        console.error('b6 or c6 cell not found');
        return;
    }

    const b6Value = smacdData.reduce((acc, row) => acc + (row.x === 1 ? 1 : 0), 0);
    const c6Value = smacdData.reduce((acc, row) => acc + (row.x === -1 ? 1 : 0), 0);

    b6Cell.innerText = b6Value;
    c6Cell.innerText = c6Value;

    console.log('Updated b6 and c6 cells with SMACD values:', { b6Value, c6Value });

    // Update d6 cell based on the difference between b6 and c6
    updateD6();
}

// Update d6 cell based on the difference between b6 and c6
function updateD6() {
    const b6Cell = document.getElementById('b6');
    const c6Cell = document.getElementById('c6');
    const d6Cell = document.getElementById('d6');

    if (!b6Cell || !c6Cell || !d6Cell) {
        console.error('b6, c6, or d6 cell not found');
        return;
    }

    const b6Value = parseInt(b6Cell.innerText, 10) || 0;
    const c6Value = parseInt(c6Cell.innerText, 10) || 0;
    const d6Value = b6Value - c6Value;

    d6Cell.innerText = d6Value;

    // Apply conditional formatting to d6 cell only if difference is non-zero
    if (d6Value > 0) {
        d6Cell.classList.add('green-cell');
        d6Cell.classList.remove('red-cell');
    } else if (d6Value < 0) {
        d6Cell.classList.add('red-cell');
        d6Cell.classList.remove('green-cell');
    } else {
        d6Cell.classList.remove('green-cell');
        d6Cell.classList.remove('red-cell');
    }

    console.log('Updated d6 cell with difference between b6 and c6:', d6Value);
}



// Update Tool Voice Count (TVC) based on the difference between b and c values for multiple rows
function updateToolVoiceCount() {
    for (let i = 2; i <= 16; i++) {
        const bCell = document.getElementById(`b${i}`);
        const cCell = document.getElementById(`c${i}`);
        const dCell = document.getElementById(`d${i}`);

        if (!bCell || !cCell || !dCell) {
            console.error(`b${i}, c${i}, or d${i} cell not found`);
            continue;
        }

        const bValue = parseInt(bCell.innerText, 10) || 0;
        const cValue = parseInt(cCell.innerText, 10) || 0;
        const dValue = bValue - cValue;

        dCell.innerText = dValue;

        // Apply conditional formatting to d cells
        if (dValue > 0) {
            dCell.style.backgroundColor = 'green';
            dCell.style.color = 'white';
        } else if (dValue < 0) {
            dCell.style.backgroundColor = 'red';
            dCell.style.color = 'white';
        } else {
            dCell.style.backgroundColor = '';
            dCell.style.color = '';
        }
    }

    console.log('Updated Tool Voice Count (TVC) for all rows');
}

// Calculate the sum of values in a column
function calculateColumnSum(columnId, startRow, endRow) {
    let sum = 0;
    for (let i = startRow; i <= endRow; i++) {
        const cell = document.getElementById(`${columnId}${i}`);
        if (cell) {
            const value = parseInt(cell.innerText, 10);
            if (!isNaN(value)) {
                sum += value;
            }
        }
    }
    return sum;
}

// Update the sum values in the specified cells
function updateSumValues() {
    const bSum = calculateColumnSum('b', 2, 16);
    const cSum = calculateColumnSum('c', 2, 16);

    const b17Cell = document.getElementById('b17');
    const c17Cell = document.getElementById('c17');

    if (b17Cell) b17Cell.innerText = bSum;
    if (c17Cell) c17Cell.innerText = cSum;

    console.log('Updated sum values:', { bSum, cSum });

    // Call updatePercentageValues after updating sums
    updatePercentageValues();
}

// Calculate and update percentage values in b18 and c18
function updatePercentageValues() {
    const b17Value = parseInt(document.getElementById('b17').innerText, 10) || 0;
    const c17Value = parseInt(document.getElementById('c17').innerText, 10) || 0;
    const total = b17Value + c17Value;

    let b18Value = 0;
    let c18Value = 0;

    if (total > 0) {
        b18Value = Math.round((b17Value / total) * 100);
        c18Value = 100 - b18Value; // Ensure the sum is 100%
    }

    const b18Cell = document.getElementById('b18');
    const c18Cell = document.getElementById('c18');

    if (b18Cell) {
        b18Cell.innerText = `${b18Value}%`;
        b18Cell.classList.add('green-cell');
    }
    if (c18Cell) {
        c18Cell.innerText = `${c18Value}%`;
        c18Cell.classList.add('red-cell');
    }

    console.log('Updated percentage values:', { b18Value, c18Value });
}

// New function to update b17 and c17
function updateB17AndC17() {
    const bSum = calculateColumnSum('b', 2, 16);
    const cSum = calculateColumnSum('c', 2, 16);

    const b17Cell = document.getElementById('b17');
    const c17Cell = document.getElementById('c17');

    if (b17Cell) b17Cell.innerText = bSum;
    if (c17Cell) c17Cell.innerText = cSum;

    console.log('Updated b17 and c17 cells with sums:', { bSum, cSum });

    // Call updatePercentageValues after updating sums
    updatePercentageValues();
}

let allToolsVotesChart; // Variable to keep track of the chart instance

// General function to update the votes chart for all tools
function updateVotesChart() {
    let totalBuyVotes = 0;
    let totalSellVotes = 0;

    for (let i = 2; i <= 16; i++) {
        const bValue = parseInt(document.getElementById(`b${i}`).innerText, 10) || 0;
        const cValue = parseInt(document.getElementById(`c${i}`).innerText, 10) || 0;
        totalBuyVotes += bValue;
        totalSellVotes += cValue;
    }

    const ctx = document.getElementById('allToolsVotesChart').getContext('2d');

    // Destroy the existing chart instance if it exists
    if (allToolsVotesChart) {
        allToolsVotesChart.destroy();
    }

    // Create a new chart instance with custom chart implementation
    allToolsVotesChart = new CustomBarChart(ctx.canvas, {
        data: {
            labels: ['Buy Votes', 'Sell Votes'],
            datasets: [
                {
                    label: 'Votes',
                    data: [totalBuyVotes, totalSellVotes],
                    backgroundColor: [
                        'rgba(40, 167, 69, 0.8)',   // Green for buy votes  
                        'rgba(220, 53, 69, 0.8)'    // Red for sell votes
                    ],
                    borderColor: [
                        'rgba(40, 167, 69, 1)',
                        'rgba(220, 53, 69, 1)'
                    ]
                }
            ]
        }
    });
}

// Existing code...



// Existing code...

// Populate Table 1 with CSV data
function populateTable1(csvData) {
    const table1Body = document.getElementById('csvTableBody');
    if (!table1Body) {
        console.error('csvTableBody element not found');
        return;
    }
    table1Body.innerHTML = ''; // Clear existing data

    const rows = csvData.split('\n');
    const header = rows[0].split(',');

    // Validate CSV header
    if (header.length < 7) {
        alert('Invalid CSV format: Header does not contain enough columns.');
        return;
    }

    rows.slice(1).forEach(row => { // Skip the header row
        const columns = row.split(',');
        if (columns.every(column => column.trim() === "")) return; // Skip empty rows

        // Validate row length
        if (columns.length !== header.length) {
            alert('Invalid CSV format: Row length does not match header length.');
            return;
        }

        const tableRow = document.createElement('tr');
        columns.forEach((column, index) => {
            const cell = document.createElement('td');
            if (index === 0) {
                // First column as date (already formatted)
                cell.innerText = column;
            } else if (index >= 1 && index <= 5) {
                // Second to sixth columns as floats
                cell.innerText = parseFloat(column).toFixed(2);
            } else if (index === columns.length - 1) {
                // Last column as integer with commas
                cell.innerText = parseInt(column).toLocaleString();
            } else {
                cell.innerText = column;
            }
            tableRow.appendChild(cell);
        });
        table1Body.appendChild(tableRow);
    });

    console.log('Populated Table 1 with CSV data:', csvData);

    // Update sum values after populating the table
    updateSumValues();
    updateB17AndC17(); // Call the new function to update b17 and c17
}

// Event listener for CSV file upload
document.getElementById('csvForm').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('CSV form submitted');
    loadCsvFile('csvFile', populateTable1);
});

// Load CSV file and populate Table 1
function loadCsvFile(fileInputId, populateFunction) {
    const fileInput = document.getElementById(fileInputId);
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const csvData = event.target.result;
            console.log('CSV file loaded:', csvData);
            try {
                populateFunction(csvData);
            } catch (error) {
                console.error('Error processing CSV file:', error.message);
                alert('Error processing CSV file: ' + error.message);
            }
        };
        reader.readAsText(file);
    } else {
        alert('No file chosen');
    }
}