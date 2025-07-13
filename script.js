let score1 = 0;
let score2 = 0;
let roundStarted = false;
let ready = false;
let winnerDeclared = false;

function updateScore() {
  document.getElementById("score1").textContent = score1;
  document.getElementById("score2").textContent = score2;
}

function declareWinner(winner) {
  document.getElementById("message").textContent = `🏆 Pemain ${winner} Menang Ronde!`;
  if (winner === 1) score1++;
  else score2++;
  updateScore();
  roundStarted = false;
  winnerDeclared = true;

  if (score1 >= 2 || score2 >= 2) {
    setTimeout(() => {
      document.getElementById("message").textContent = `🎉 Pemain ${winner} Menang Game! Skor Akhir ${score1} - ${score2}`;
      score1 = 0;
      score2 = 0;
      updateScore();
    }, 1500);
  }
}

function startRound() {
  roundStarted = true;
  ready = false;
  winnerDeclared = false;
  document.getElementById("message").textContent = "Bersiap...";

  let countdown = ["3", "2", "1"];
  let i = 0;

  let interval = setInterval(() => {
    document.getElementById("message").textContent = countdown[i];
    i++;
    if (i >= countdown.length) {
      clearInterval(interval);
      setTimeout(() => {
        ready = true;
        document.getElementById("message").textContent = "GO!";
        document.getElementById("message").classList.add("flash");
        setTimeout(() => {
          document.getElementById("message").classList.remove("flash");
        }, 300);
      }, 500);
    }
  }, 800);
}

document.addEventListener("keydown", (e) => {
  if (!roundStarted || winnerDeclared) return;

  const key = e.key.toLowerCase();
  if (!ready) {
    if (key === "a") {
      document.getElementById("message").textContent = "❌ Pemain 1 Diskualifikasi!";
      score2++;
    } else if (key === "l") {
      document.getElementById("message").textContent = "❌ Pemain 2 Diskualifikasi!";
      score1++;
    }
    updateScore();
    roundStarted = false;
    winnerDeclared = true;
    return;
  }

  if (ready) {
    if (key === "a") declareWinner(1);
    else if (key === "l") declareWinner(2);
  }
});
