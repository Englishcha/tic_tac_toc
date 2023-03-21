const cellElements = document.querySelectorAll("[data-cell]");
const circle = "o";
const xClass = "x";
let circleTurn;

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circle : xClass;
  placeMark(cell, currentClass);
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  if (currentClass == "x") {
    document.getElementsByTagName("body")[0].style.cursor = "progress";
  } else {
    document.getElementsByTagName("body")[0].style.cursor = "cell";
  }
  if (checkWin(currentClass)) {
    if (currentClass == "x") {
      alert("Player 1 Won");
    } else {
      alert("Player 2 Won");
    }
    window.location.reload();
  } else if (isDraw()) {
    alert("Draw");
    window.location.reload();
  } else {
    setTurn();
  }
}

function setTurn() {
  circleTurn = !circleTurn;
}

const winning = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin(currentClass) {
  return winning.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(circle) || cell.classList.contains(xClass);
  });
}
