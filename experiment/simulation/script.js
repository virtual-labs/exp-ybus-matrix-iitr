let buses = [], lines = [], Y = [];


// Function to save bus data
function saveBusData() {
  buses = [];
  var numBuses = parseInt(document.getElementById('numBuses').value);
  if (isNaN(numBuses) || numBuses <= 0) {
    alert("Please enter a valid number of buses.");
    return;
  }
  for (var i = 0; i < numBuses; i++) {
    buses.push({});
  }
}

// Function to generate line data input table
function generateLineTable() {
  var numLines = parseInt(document.getElementById('numLines').value);
  if (isNaN(numLines) || numLines <= 0) {
    alert("Please enter a valid number of lines.");
    return;
  }

  var tableHtml = `
      <table>
          <tr>
              <th>Line No.</th>
              <th>From Bus</th>
              <th>To Bus</th>
              <th>R (pu)</th>
              <th>X (pu)</th>
              <th>B (pu)</th>
              <th>Tx. Tap</th>
          </tr>
  `;

  for (var i = 1; i <= numLines; i++) {
      tableHtml += `
          <tr>
              <td>${i}</td>
              <td><input type="number" id="fromBus${i}" required></td>
              <td><input type="number" id="toBus${i}" required></td>
              <td><input type="text" id="R${i}" required></td>
              <td><input type="text" id="X${i}" required></td>
              <td><input type="text" id="Charging${i}" required></td>
              <td><input type="text" id="Tap${i}" required></td>
          </tr>
      `;
  }
  
  tableHtml += '</table>';
  document.getElementById('lineTableContainer').innerHTML = tableHtml;
}

// Function to autofill line data for six lines
function autofillSixLines() {
  var numLines = 6;
  document.getElementById('numLines').value = numLines; // Update input field
  generateLineTable(); // Regenerate table with updated number of lines

  // Autofill data into the table
  var defaultFromBus = [1, 1, 2, 3, 3, 4];
  var defaultToBus = [2, 5, 3, 4, 5, 5];
  var defaultR = [0.042, 0.031, 0.031, 0.024, 0.053, 0.063];
  var defaultX = [0.168, 0.126, 0.126, 0.136, 0.210, 0.252];
  var defaultCharging = [0.082, 0.062, 0.062, 0.164, 0.102, 0.122];
  var defaultTap = [0, 0, 0, 0, 0, 0];

  for (var i = 0; i < numLines; i++) {
    document.getElementById(`fromBus${i+1}`).value = defaultFromBus[i];
    document.getElementById(`toBus${i+1}`).value = defaultToBus[i];
    document.getElementById(`R${i+1}`).value = defaultR[i];
    document.getElementById(`X${i+1}`).value = defaultX[i];
    document.getElementById(`Charging${i+1}`).value = defaultCharging[i];
    document.getElementById(`Tap${i+1}`).value = defaultTap[i];
  }
}

// Function to autofill line data for twenty lines
function autofillTwentyLines() {
  var numLines = 20;
  document.getElementById('numLines').value = numLines; // Update input field
  generateLineTable(); // Regenerate table with updated number of lines

  // Autofill data into the table
  var defaultFromBus = [1, 1, 2, 2, 2, 3, 4, 4, 4, 5, 6, 6, 6, 7, 7, 9, 9, 10, 12, 13];
  var defaultToBus = [2, 5, 3, 4, 5, 4, 5, 7, 9, 6, 11, 12, 13, 8, 9, 10, 14, 11, 13, 14];
  var defaultR = [0.0194, 0.054, 0.047, 0.0581, 0.0569, 0.067, 0.0134, 0, 0, 0, 0.095, 0.1229, 0.0661, 0, 0, 0.0318, 0.127, 0.082, 0.2209, 0.1709];
  var defaultX = [0.0592, 0.223, 0.1979, 0.1763, 0.1738, 0.171, 0.0421, 0.209, 0.5562, 0.2522, 0.1989, 0.2557, 0.1302, 0.1762, 0.011, 0.0845, 0.2703, 0.192, 0.1999, 0.3479];
  var defaultCharging = [0.1056, 0.984, 0.0876, 0.0748, 0.0678, 0.0692, 0.0256, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var defaultTap = [0, 0, 0, 0, 0, 0, 0, 0.978, 0.969, 0.932, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0];

  for (var i = 0; i < numLines; i++) {
    document.getElementById(`fromBus${i+1}`).value = defaultFromBus[i];
    document.getElementById(`toBus${i+1}`).value = defaultToBus[i];
    document.getElementById(`R${i+1}`).value = defaultR[i];
    document.getElementById(`X${i+1}`).value = defaultX[i];
    document.getElementById(`Charging${i+1}`).value = defaultCharging[i];
    document.getElementById(`Tap${i+1}`).value = defaultTap[i];
  }
}

// Function to save line data
function saveLineData() {
  lines = [];
  var numLines = parseInt(document.getElementById('numLines').value);
  for (var i = 0; i < numLines; i++) {
    lines.push({
      from: parseInt(document.getElementById(`fromBus${i + 1}`).value),
      to: parseInt(document.getElementById(`toBus${i + 1}`).value),
      R: parseFloat(document.getElementById(`R${i + 1}`).value),
      X: parseFloat(document.getElementById(`X${i + 1}`).value),
      charging: parseFloat(document.getElementById(`Charging${i + 1}`).value),
      Tap: parseFloat(document.getElementById(`Tap${i + 1}`).value),
    });
  }
}

// Function to format complex numbers for display
function formatComplexNumber(complexNumber, decimals) {
  let real = parseFloat(complexNumber.re).toFixed(decimals);
  let imag = parseFloat(complexNumber.im).toFixed(decimals);
  return parseFloat(imag) >= 0 ? `${real} + ${imag}i` : `${real} - ${Math.abs(imag)}i`;
}

// Code update for the calculation of diagonal and off-diagonal elements

// For Diagonal elements calculation - 
function calculateDiagonal() {
    saveBusData();
    saveLineData();

    var numBuses = buses.length;
    var numLines = lines.length;

    // Initialize Y matrix
    Y = Array.from({ length: numBuses }, () => Array.from({ length: numBuses }, () => math.complex(0, 0)));

    // Calculate line admittances and update Ybus
    for (var i = 0; i < numLines; i++) {
        var from = lines[i].from - 1; // Convert to zero-based index
        var to = lines[i].to - 1; // Convert to zero-based index
        var R = lines[i].R;
        var X = lines[i].X;
        var B = lines[i].charging / 2; // Half charging admittance at each end
        var tap = lines[i].Tap; // Tap changing transformer value, 1 if no transformer
        var admittance = math.divide(1, math.complex(R, X));
        var shuntAdmittance = math.complex(0, B);
        if (tap > 0) {
            // Update Ybus matrix for tap-changing transformers
            var tapComplex = math.complex(tap, 0);
            var tapSquare = math.multiply(tapComplex, tapComplex);
            
            Y[from][to] = math.subtract(Y[from][to], math.divide(admittance, tapComplex));
            Y[to][from] = Y[from][to]; // Symmetric matrix

            var fromAdmittance = math.add(
                math.divide(admittance, tapSquare),
                math.multiply(math.divide(1, tapSquare), math.subtract(math.divide(1, tapComplex), 1), admittance),
                shuntAdmittance
            );

            var toAdmittance = math.add(
                admittance,
                math.multiply(math.subtract(1, math.divide(1, tapComplex)), admittance),
                shuntAdmittance
            );

            Y[from][from] = math.add(Y[from][from], fromAdmittance);
            Y[to][to] = math.add(Y[to][to], toAdmittance);
        } else {
            // Regular update without tap-changing transformers
            Y[from][to] = math.subtract(Y[from][to], admittance);
            Y[to][from] = Y[from][to]; // Symmetric matrix

            Y[from][from] = math.add(Y[from][from], admittance, shuntAdmittance);
            Y[to][to] = math.add(Y[to][to], admittance, shuntAdmittance);
        }
    }

  let diagonalElements = [];
  for (let i = 0; i < Y.length; i++) {
      diagonalElements.push(Y[i][i]);
  }
  displayDiagonal(diagonalElements);
}



function calculatenonDiagonal() {
    saveBusData();
    saveLineData();

    var numBuses = buses.length;
    var numLines = lines.length;

    // Initialize Y matrix
    Y = Array.from({ length: numBuses }, () => Array.from({ length: numBuses }, () => math.complex(0, 0)));

    // Calculate line admittances and update Ybus
    for (var i = 0; i < numLines; i++) {
        var from = lines[i].from - 1; // Convert to zero-based index
        var to = lines[i].to - 1; // Convert to zero-based index
        var R = lines[i].R;
        var X = lines[i].X;
        var B = lines[i].charging / 2; // Half charging admittance at each end
        var tap = lines[i].Tap; // Tap changing transformer value, 1 if no transformer
        var admittance = math.divide(1, math.complex(R, X));
        var shuntAdmittance = math.complex(0, B);
        if (tap > 0) {
            // Update Ybus matrix for tap-changing transformers
            var tapComplex = math.complex(tap, 0);
            var tapSquare = math.multiply(tapComplex, tapComplex);
            
            Y[from][to] = math.subtract(Y[from][to], math.divide(admittance, tapComplex));
            Y[to][from] = Y[from][to]; // Symmetric matrix

            var fromAdmittance = math.add(
                math.divide(admittance, tapSquare),
                math.multiply(math.divide(1, tapSquare), math.subtract(math.divide(1, tapComplex), 1), admittance),
                shuntAdmittance
            );

            var toAdmittance = math.add(
                admittance,
                math.multiply(math.subtract(1, math.divide(1, tapComplex)), admittance),
                shuntAdmittance
            );

            Y[from][from] = math.add(Y[from][from], fromAdmittance);
            Y[to][to] = math.add(Y[to][to], toAdmittance);
        } else {
            // Regular update without tap-changing transformers
            Y[from][to] = math.subtract(Y[from][to], admittance);
            Y[to][from] = Y[from][to]; // Symmetric matrix

            Y[from][from] = math.add(Y[from][from], admittance, shuntAdmittance);
            Y[to][to] = math.add(Y[to][to], admittance, shuntAdmittance);
        }
    }

  let nondiagonalElements = [];
  for (let i = 0; i < numBuses; i++) {
      for (let j = 0; j < numBuses; j++) {
          if (i !== j) {
              nondiagonalElements.push(Y[i][j]); // Collect non-diagonal elements
          }
      }
  }
  displaynonDiagonal(nondiagonalElements, numBuses);
}

// Display of Diagonal elements of Ybus matrix --

function displayDiagonal(diagonalElements) {
    let resultHtml = '<h3>Diagonal Elements of Ybus Matrix</h3><table>';
    diagonalElements.forEach((element, i) => {
        let busIndex = i + 1;
        let busLabel = `Y<sub>${busIndex},${busIndex}</sub>`;
        let realPart = element.re.toFixed(4);
        let imagPart = element.im.toFixed(4);
        let sign = element.im < 0 ? '-' : '+';
        let imagAbs = Math.abs(imagPart);
        resultHtml += `<tr><td>${busLabel}</td><td>${realPart} ${sign} ${imagAbs}i</td></tr>`;
    });
    resultHtml += '</table>';
    document.getElementById('resultdiagonal').innerHTML = resultHtml;
}

// Indices for the non-diagonal elements of Ybus matrix --
function generateBusIndices(m) {
    let indices = [];
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= m; j++) {
            if (i !== j) {
                indices.push([i, j]);
            }
        }
    }
    return indices;
}
function formatBusIndex(index) {
    return `Y<sub>${index[0]},${index[1]}</sub>`;
}

function displaynonDiagonal(nondiagonalElements, m) {
    let resultHtml = '<h3>Non-Diagonal Elements of Ybus Matrix</h3><table>';
    let busIndices = generateBusIndices(m);

    for (let i = 0; i < nondiagonalElements.length; i++) {
        let busIndex = busIndices[i];
        let busLabel = formatBusIndex(busIndex);

        let realPart = nondiagonalElements[i].re.toFixed(4);
        let imagPart = nondiagonalElements[i].im.toFixed(4);
        let sign = nondiagonalElements[i].im < 0 ? '-' : '+';
        let imagAbs = Math.abs(imagPart);

        resultHtml += `<tr><td>${busLabel}</td><td>${realPart} ${sign} ${imagAbs}i</td></tr>`;
    }

    resultHtml += '</table>';
    document.getElementById('resultnondiagonal').innerHTML = resultHtml;
}


// Function to calculate the Ybus matrix
function calculateYbus() {
    saveBusData();
    saveLineData();

    var numBuses = buses.length;
    var numLines = lines.length;

    // Initialize Y matrix
    Y = Array.from({ length: numBuses }, () => Array.from({ length: numBuses }, () => math.complex(0, 0)));

    // Calculate line admittances and update Ybus
    for (var i = 0; i < numLines; i++) {
        var from = lines[i].from - 1; // Convert to zero-based index
        var to = lines[i].to - 1; // Convert to zero-based index
        var R = lines[i].R;
        var X = lines[i].X;
        var B = lines[i].charging / 2; // Half charging admittance at each end
        var tap = lines[i].Tap; // Tap changing transformer value, 0 if no transformer
        var admittance = math.divide(1, math.complex(R, X));
        var shuntAdmittance = math.complex(0, B);
        if (tap > 0) {
            // Update Ybus matrix for tap-changing transformers
            var tapComplex = math.complex(tap, 0);
            var tapSquare = math.multiply(tapComplex, tapComplex);
            
            Y[from][to] = math.subtract(Y[from][to], math.divide(admittance, tapComplex));
            Y[to][from] = Y[from][to]; // Symmetric matrix

            var fromAdmittance = math.add(
                math.divide(admittance, tapSquare),
                math.multiply(math.divide(1, tapSquare), math.subtract(math.divide(1, tapComplex), 1), admittance),
                shuntAdmittance
            );

            var toAdmittance = math.add(
                admittance,
                math.multiply(math.subtract(1, math.divide(1, tapComplex)), admittance),
                shuntAdmittance
            );

            Y[from][from] = math.add(Y[from][from], fromAdmittance);
            Y[to][to] = math.add(Y[to][to], toAdmittance);
        } else {
            // Regular update without tap-changing transformers
            Y[from][to] = math.subtract(Y[from][to], admittance);
            Y[to][from] = Y[from][to]; // Symmetric matrix

            Y[from][from] = math.add(Y[from][from], admittance, shuntAdmittance);
            Y[to][to] = math.add(Y[to][to], admittance, shuntAdmittance);
        }
    }

    displayYbusMatrix();
}

// Function to display the Ybus matrix
function displayYbusMatrix() {
  var tableHtml = '<table><tr><th></th>';
  for (var i = 0; i < Y.length; i++) {
      tableHtml += `<th>${i+1}</th>`;
  }
  tableHtml += '</tr>';
  for (var i = 0; i < Y.length; i++) {
      tableHtml += `<tr><th>${i+1}</th>`;
      for (var j = 0; j < Y[i].length; j++) {
          tableHtml += `<td>${formatComplexNumber(Y[i][j], 4)}</td>`;
      }
      tableHtml += '</tr>';
  }
  tableHtml += '</table>';
  document.getElementById('ybusContainer').innerHTML = tableHtml;
}