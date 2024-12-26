const board = document.getElementById('board');
let cells = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

// Create the board
function createBoard() {
  board.innerHTML = ''; // Clear the board
  cells.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.index = index;
    div.addEventListener('click', handleCellClick);
    board.appendChild(div);
  });
}

// Handle cell clicks
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (cells[index] || !gameActive) return; // Ignore if taken or game over

  cells[index] = currentPlayer; // Mark the cell
  event.target.textContent = currentPlayer; // Display the mark
  event.target.classList.add('taken'); // Mark as taken

  // Check for a winner first
  if (checkWinner()) {
    document.getElementById('message').textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
  } else if (cells.every(cell => cell)) { // Check for a tie
    document.getElementById('message').textContent = "It's a Tie! 🤝";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    document.getElementById('message').textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Check for a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winningCombinations.some(combination =>
    combination.every(index => cells[index] === currentPlayer)
  );
}

// Reset the game
function resetGame() {
  cells = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  document.getElementById('message').textContent = "Player X's Turn";
  createBoard();
}

// Initialize the board
createBoard();