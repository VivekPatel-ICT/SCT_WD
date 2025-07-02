let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnDisplay = document.querySelector("#turn-display"); // New element

let turnO = true; // O starts

let winningPatterns = [
  [0, 1, 2], [0, 3, 6],
  [0, 4, 8], [1, 4, 7],
  [2, 4, 6], [3, 4, 5],
  [6, 7, 8], [2, 5, 8]
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    updateTurnDisplay();
    checkWinner();
  });
});

const updateTurnDisplay = () => {
  if (!msgContainer.classList.contains("hide")) return;
  turnDisplay.innerText = `Turn: ${turnO ? "O" : "X"}`;
};

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let p1 = boxes[pattern[0]].innerText;
    let p2 = boxes[pattern[1]].innerText;
    let p3 = boxes[pattern[2]].innerText;

    if (p1 !== "" && p2 !== "" && p3 !== "") {
      if (p1 === p2 && p2 === p3) {
        showWinner(p1);
      }
    }
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  resetBtn.style.display = "none";
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  resetBtn.style.display = "inline-block";
  updateTurnDisplay();
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
