let users = {}; // Store users and their scores
let currentUser = null; // Keep track of the logged-in user
let gameButtons, playAgainButton, resultText, leaderboardList;

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  showAuthSection();
  setupAuthListeners();
});

function showAuthSection() {
  document.querySelector("#game-area").innerHTML = `
    <div id="user-auth">
      <h2>Register or Login</h2>
      <input type="text" id="username" placeholder="Enter your name" />
      <button id="register-btn">Register</button>
      <button id="login-btn">Login</button>
      <p id="auth-message" style="color: red; font-weight: bold;"></p>
    </div>
  `;
}

function setupAuthListeners() {
  document.querySelector("#game-area").addEventListener("click", (e) => {
    const username = document.querySelector("#username").value.trim();
    const authMessage = document.querySelector("#auth-message");

    if (e.target.id === "register-btn") {
      if (!username) {
        authMessage.textContent = "Please enter a username!";
        return;
      }
      if (users[username]) {
        authMessage.textContent = "Username already registered. Please log in.";
      } else {
        users[username] = { wins: 0, losses: 0 };
        authMessage.textContent = "Registration successful! Please log in.";
      }
    }

    if (e.target.id === "login-btn") {
      if (!username) {
        authMessage.textContent = "Please enter a username!";
        return;
      }
      if (!users[username]) {
        authMessage.textContent = "Username not found. Please register first.";
      } else {
        currentUser = username;
        startGame();
      }
    }
  });
}

function startGame() {
  document.querySelector("#game-area").innerHTML = `
    <h2>Welcome, ${currentUser}!</h2>
    <div id="game-buttons">
      <button id="rock">Rock</button>
      <button id="paper">Paper</button>
      <button id="scissors">Scissors</button>
    </div>
    <p id="result-text"></p>
    <button id="restart-btn" style="display: none;">Play Again</button>
  `;

  gameButtons = document.querySelectorAll("#game-buttons button");
  playAgainButton = document.querySelector("#restart-btn");
  resultText = document.querySelector("#result-text");
  leaderboardList = document.querySelector("#leaderboard-list");

  setupGameListeners();
}

function setupGameListeners() {
  playAgainButton.addEventListener("click", () => {
    enableGameButtons();
    resultText.textContent = "";
  });

  gameButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const userChoice = button.id;
      const computerChoice = getComputerChoice();
      determineWinner(userChoice, computerChoice);
      updateLeaderboard();
      disableGameButtons();
    });
  });
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(userChoice, computerChoice) {
  let result;
  if (userChoice === computerChoice) {
    result = "It's a tie!";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win!";
    users[currentUser].wins++;
  } else {
    result = "You lose!";
    users[currentUser].losses++;
  }

  resultText.textContent = `You chose ${userChoice}. Computer chose ${computerChoice}. ${result}`;
  playAgainButton.style.display = "block";
}

function updateLeaderboard() {
  leaderboardList.innerHTML = ""; // Clear previous leaderboard
  for (const user in users) {
    const userStats = users[user];
    const listItem = document.createElement("li");
    listItem.textContent = `${user}: ${userStats.wins} Wins, ${userStats.losses} Losses`;
    leaderboardList.appendChild(listItem);
  }
}

function disableGameButtons() {
  gameButtons.forEach((button) => {
    button.disabled = true;
  });
}

function enableGameButtons() {
  gameButtons.forEach((button) => {
    button.disabled = false;
  });
}
