const state = {
  player: null,
  size: null,
  mode: null,
  startTime: null,
  timer: null
};

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function formatTime(sec) {
  return `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
}

function startTimer() {
  state.startTime = Date.now();
  state.timer = setInterval(() => {
    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    document.getElementById("timer").textContent = formatTime(elapsed);
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timer);
}

/* ---------- Grid ---------- */

function renderEmptyGrid(size) {
  const board = document.getElementById("board");
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const input = document.createElement("input");
    input.className = "cell";
    input.maxLength = 1;
    board.appendChild(input);
  }
}

/* ---------- Flow ---------- */

document.querySelectorAll("[data-player]").forEach(b =>
  b.onclick = () => {
    state.player = b.dataset.player;
    showScreen("screen-size");
  }
);

document.querySelectorAll("[data-size]").forEach(b =>
  b.onclick = () => {
    state.size = Number(b.dataset.size);
    showScreen("screen-mode");
  }
);

document.querySelectorAll("[data-mode]").forEach(b =>
  b.onclick = () => {
    state.mode = b.dataset.mode;
    startGame();
  }
);

document.getElementById("stop-game").onclick = () => {
  stopTimer();
  showScreen("screen-player");
};

function startGame() {
  showScreen("screen-game");

  document.getElementById("game-info").textContent =
    `Player ${state.player} • ${state.size}×${state.size} • ${state.mode}`;

  renderEmptyGrid(state.size);
  startTimer();
}

/* ---------- Init ---------- */
showScreen("screen-player");
