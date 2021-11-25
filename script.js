const gridRow = document.querySelectorAll("tr");
const gridCell = document.querySelectorAll("td");

// ======================================================================
// Register player info
// Included "playerOne == null" to prevent players from cancelling prompt
// ======================================================================

let playerOne = "";
const playerOneColour = "red";
while (playerOne == "" || playerOne == null) {
  playerOne = prompt("Player 1 (Red) - Please enter your name");
}

let playerTwo = "";
const playerTwoColour = "yellow";
while (playerTwo == "" || playerTwo == null) {
  playerTwo = prompt("Player 2 (Yellow) - Please enter your name");
}

let currentPlayer = 1;
const playerTurn = document.querySelector(".current-player");
playerTurn.innerText = `${playerOne} (Red)'s turn`;

// ======================================================================
// Add event listener to each cell using forEach to show rowIndex, cellIndex of clicked cell
// e.target: clicked cell <td>
// e.target.parentElement: parent element <tr> of clicked cell
// ======================================================================

gridCell.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const selectedCellIndex = e.target.cellIndex;
    const selectedRowIndex = e.target.parentElement.rowIndex;
    console.log(
      "Row-Column index of clicked cell: " +
        selectedRowIndex +
        ", " +
        selectedCellIndex
    );
  });
});

// ======================================================================
// Function to change cell colour
// ======================================================================

function changeColour(e) {
  const selectedCell = e.target.cellIndex;
  const arrWhiteCell = [];

  // Check the cell's colour starting from row[5] to row[0] to see if it's white
  // If cell in checked row is white, push selected cell into array

  for (let i = 5; i >= 0; i--) {
    if (gridRow[i].children[selectedCell].style.backgroundColor === "white") {
      arrWhiteCell.push(gridRow[i].children[selectedCell]);

      // Shows which cell (HTML) gets pushed into the array
      // console.log(gridRow[i].children[selectedCell]);

      // Alternate between players, Runs function to check for winning/draw condition below, alert showing game outcome, resets game

      if (currentPlayer === 1) {
        arrWhiteCell[0].style.backgroundColor = playerOneColour;
        if (checkWin()) {
          return alert(`${playerOne} (Red) wins!`), resetBoard();
        } else if (checkDraw()) {
          return alert("Game is a draw!"), resetBoard();
        } else {
          playerTurn.innerText = `${playerTwo} (Yellow)'s turn`;
          return (currentPlayer = 2);
        }
      } else {
        arrWhiteCell[0].style.backgroundColor = playerTwoColour;
        if (checkWin()) {
          return alert(`${playerTwo} (Yellow) wins!`), resetBoard();
        } else if (checkDraw()) {
          return alert("Game is a draw!"), resetBoard();
        } else {
          playerTurn.innerText = `${playerOne} (Red)'s turn`;
          return (currentPlayer = 1);
        }
      }
    }
  }
}

// Adds event listner to each cell, to run changeColour function when clicked
gridCell.forEach((e) => e.addEventListener("click", changeColour));

// ======================================================================
// Function to check for four of the same colour, first cell to be non-white
// ======================================================================

function checkFour(a, b, c, d) {
  return a != "white" && a == b && a == c && a == d;
}

// ======================================================================
// Functions to check for winning conditions / draw
// r = rowIndex, c = cellIndex
// gridRow[0].children[0] -> top left
// gridRow[0].children[6] -> top right
// gridRow[5].children[0] -> bottom left
// gridRow[5].children[6] -> bottom right
// ======================================================================

// ========================
// 1) Horizontal --
// ========================

function checkWin() {
  for (let r = 0; r <= 5; r++)
    for (let c = 0; c <= 3; c++)
      if (
        checkFour(
          gridRow[r].children[c].style.backgroundColor,
          gridRow[r].children[c + 1].style.backgroundColor,
          gridRow[r].children[c + 2].style.backgroundColor,
          gridRow[r].children[c + 3].style.backgroundColor
        )
      )
        return true;

  // ========================
  // 2) Veritical |
  // ========================

  for (let r = 3; r <= 5; r++)
    for (let c = 0; c <= 6; c++)
      if (
        checkFour(
          gridRow[r].children[c].style.backgroundColor,
          gridRow[r - 1].children[c].style.backgroundColor,
          gridRow[r - 2].children[c].style.backgroundColor,
          gridRow[r - 3].children[c].style.backgroundColor
        )
      )
        return true;

  // ========================
  // 3) Diagonal / (Up-Right)
  // ========================

  for (let r = 3; r <= 5; r++)
    for (let c = 0; c <= 3; c++)
      if (
        checkFour(
          gridRow[r].children[c].style.backgroundColor,
          gridRow[r - 1].children[c + 1].style.backgroundColor,
          gridRow[r - 2].children[c + 2].style.backgroundColor,
          gridRow[r - 3].children[c + 3].style.backgroundColor
        )
      )
        return true;

  // ========================
  // 4) Diagonal \ (Down-Right)
  // ========================

  for (let r = 0; r <= 2; r++)
    for (let c = 0; c <= 3; c++)
      if (
        checkFour(
          gridRow[r].children[c].style.backgroundColor,
          gridRow[r + 1].children[c + 1].style.backgroundColor,
          gridRow[r + 2].children[c + 2].style.backgroundColor,
          gridRow[r + 3].children[c + 3].style.backgroundColor
        )
      )
        return true;

  return false;
}

// ========================
// 5) Draw
// ========================

function checkDraw() {
  let arrColoured = [];
  for (i = 0; i < gridCell.length; i++) {
    if (gridCell[i].style.backgroundColor != "white") {
      arrColoured.push(gridCell[i]);
    }
  }
  if (arrColoured.length === gridCell.length) {
    return true;
  }
  const remainder = gridCell.length - arrColoured.length;
  console.log("Remaining spaces: " + remainder);
}

// ======================================================================
// Reset button
// ======================================================================

const resetButton = document.querySelector(".reset");
function resetBoard() {
  gridCell.forEach((cell) => {
    cell.style.backgroundColor = "white";
  });
  playerTurn.innerText = `${playerOne} (Red)'s turn`;
  return (currentPlayer = 1);
}

resetButton.addEventListener("click", resetBoard);
