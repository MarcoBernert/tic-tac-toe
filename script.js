let fields = [
    null,
    null,
    'cross',
    'circle',
    'cross',
    'circle',
    null,
    null,
    null
];

let currentPlayer = 'circle'; // Beginn mit 'circle'

function render() {
    let container = document.getElementById('container');
    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'cross') {
                symbol = generateAnimatedCrossSVG();
            } else if (fields[index] === 'circle') {
                symbol = generateAnimatedCircleSVG();
            }
            tableHTML += `<td onclick="placeSymbol(${index}, this)">${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    container.innerHTML = `<div id="innerContainer"></div>` + tableHTML;
}

function placeSymbol(index, tdElement) {
    if (!fields[index]) { // Überprüfen, ob das Feld leer ist
        fields[index] = currentPlayer; // Setze den aktuellen Spieler
        tdElement.innerHTML = fields[index] === 'cross' ? generateAnimatedCrossSVG() : generateAnimatedCircleSVG(); // Einsetzen des entsprechenden SVG-Codes
        tdElement.onclick = null; // Entfernen der onclick-Funktion
        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross'; // Wechsle den aktuellen Spieler
        checkGameEnd(); // Überprüfe, ob das Spiel vorbei ist
    }
}

function checkGameEnd() {
    // Gewinnkombinationen
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Linien
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Linien
        [0, 4, 8], [2, 4, 6] // Diagonale Linien
    ];

    // Überprüfe jede Gewinnkombination
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(combination);
            return;
        }
    }
}

function drawWinningLine(combination) {
    // Berechne die Positionen der Zellen in der Gewinnkombination
    const cellPositions = combination.map(index => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return { row, col };
    });

    // Berechne die Positionen der Linie (Mittelpunkt der Zellen)
    const linePositions = cellPositions.map(({ row, col }) => ({
        x: (col + 0.5) * 100, // 100px: Breite/Höhe einer Zelle
        y: (row + 0.5) * 100
    }));

    // Zeichne eine Linie über die Zellen
    const svgContainer = document.getElementById('innerContainer');
    const svgCode = `
        <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
            <line x1="${linePositions[0].x}" y1="${linePositions[0].y}" x2="${linePositions[2].x}" y2="${linePositions[2].y}" stroke="white" stroke-width="5" />
        </svg>
    `;
    svgContainer.insertAdjacentHTML('beforeend', svgCode);
}


function generateAnimatedCircleSVG() {
    const circleColor = '#01b0ef';
    const animationDuration = '0.5s';
    const circleSize = 70;
    const strokeWidth = 4; // Ändere die Strichstärke hier nach Bedarf
  
    const svgCode = `
      <svg width="${circleSize}" height="${circleSize}" viewBox="0 0 ${circleSize} ${circleSize}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${circleSize / 2}" cy="${circleSize / 2}" r="${circleSize / 2 - strokeWidth / 2}" fill="none" stroke="${circleColor}" stroke-width="${strokeWidth}">
          <animate attributeName="r" from="0" to="${circleSize / 2 - strokeWidth / 2}" dur="${animationDuration}" fill="freeze" />
        </circle>
      </svg>
    `;
  
    return svgCode;
  }
  

  function generateAnimatedCrossSVG() {
    const crossColor = '#fdc000';
    const animationDuration = '0.5s';
    const svgSize = 70;
    const strokeWidth = 8; // Ändere die Strichstärke hier nach Bedarf
  
    const svgCode = `
      <svg width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}" xmlns="http://www.w3.org/2000/svg">
        <line x1="${strokeWidth}" y1="${strokeWidth}" x2="${svgSize - strokeWidth}" y2="${svgSize - strokeWidth}" stroke="${crossColor}" stroke-width="${strokeWidth}">
          <animate attributeName="x1" from="${svgSize / 2}" to="${strokeWidth}" dur="${animationDuration}" fill="freeze" />
          <animate attributeName="y1" from="${svgSize / 2}" to="${strokeWidth}" dur="${animationDuration}" fill="freeze" />
          <animate attributeName="x2" from="${svgSize / 2}" to="${svgSize - strokeWidth}" dur="${animationDuration}" fill="freeze" />
          <animate attributeName="y2" from="${svgSize / 2}" to="${svgSize - strokeWidth}" dur="${animationDuration}" fill="freeze" />
        </line>
        <line x1="${svgSize - strokeWidth}" y1="${strokeWidth}" x2="${strokeWidth}" y2="${svgSize - strokeWidth}" stroke="${crossColor}" stroke-width="${strokeWidth}">
          <animate attributeName="x1" from="${svgSize - strokeWidth}" to="${strokeWidth}" dur="${animationDuration}" fill="freeze" />
          <animate attributeName="y1" from="${strokeWidth}" to="${svgSize - strokeWidth}" dur="${animationDuration}" fill="freeze" />
          <animate attributeName="x2" from="${strokeWidth}" to="${svgSize - strokeWidth}" dur="${animationDuration}" fill="freeze" />
          <animate attributeName="y2" from="${svgSize - strokeWidth}" to="${strokeWidth}" dur="${animationDuration}" fill="freeze" />
        </line>
      </svg>
    `;
  
    return svgCode;
  }
  
render();
