const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

let startTime = 0;
let elapsedTime = 0;
let interval;
let running = false;

function formatTime(ms) {
  const date = new Date(ms);
  const h = String(date.getUTCHours()).padStart(2, "0");
  const m = String(date.getUTCMinutes()).padStart(2, "0");
  const s = String(date.getUTCSeconds()).padStart(2, "0");
  const msPart = String(date.getUTCMilliseconds()).padStart(3, "0");
  return `${h}:${m}:${s}.${msPart}`;
}

function startTimer() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
    }, 10);
    running = true;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(interval);
    running = false;
  }
}

function resetTimer() {
  clearInterval(interval);
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
  laps.innerHTML = "";
  running = false;
}

function addLap() {
  if (running) {
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.children.length + 1}: ${formatTime(elapsedTime)}`;
    laps.appendChild(li);
  }
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
