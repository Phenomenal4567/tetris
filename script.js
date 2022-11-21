const width = 10;
const grid = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll(".grid div"));

const scoreDisplay = document.querySelector("#score");
const levelDisplay = document.querySelector("#level");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");

const music = document.getElementById("music");
const drop = document.getElementById("drop");

let playBtn = document.querySelector(".play");
let pause = document.querySelector(".pause");
let nextRandom = 0;
let timerId = "";
let score = 0;
let levels = 0;

// colors
const colors = ["orange", "red", "blue", "green", "purple"];
// the tetrominos
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const theTetrominos = [
  lTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

let currentRoatation = 0;
let currentPosition = 4;

let random = Math.floor(Math.random() * theTetrominos.length);
let current = theTetrominos[random][currentRoatation];

// draw first rotation
function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add("tetromino");
  squares[currentPosition + index].style.backgroundColor = colors[random];
  });
}

// undraw the tetromino
function undraw() {
  current.forEach((index) => {
   squares[currentPosition + index].classList.remove("tetromino");
 squares[currentPosition + index].style.backgroundColor = "";
  });
}

// for speed in tetromino
// timerId = setInterval(moveDown, 1000);

function freeze() {
  if (
    current.some((index) =>
      squares[currentPosition + index + width].classList.contains("taken")
    )
  ) {
    current.forEach((index) =>
      squares[currentPosition + index].classList.add("taken")
    );
    //start new tetromino falling
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * theTetrominos.length);
    current = theTetrominos[random][currentRoatation];
    currentPosition = 4;
    draw();
    displayShape();
    addScore();
    gameOver();
  }
}

// move tetromino left unless it at the edge

function left() {
  undraw();
  const isLeftEdge = current.some(
    (index) => (currentPosition + index) % width === 0
  );
  if (!isLeftEdge) currentPosition -= 1;
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition += 1;
  }
  draw();
  drop.play();
}
function right() {
  undraw();
  const isRightEdge = current.some(
    (index) => (currentPosition + index) % width === width - 1
  );
  if (!isRightEdge) currentPosition += 1;
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition -= 1;
  }
  drop.play();
  draw();
}
function down() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

function rotate() {
  drop.play();
  undraw();
  currentRoatation++;
  if (currentRoatation === current.length) {
    currentRoatation = 0;
  }
  current = theTetrominos[random][currentRoatation];
  draw();
}

// display next tetromino
const displaySquares = document.querySelectorAll(".mini-grid div");
const displayWidth = 4;
let displayIndex = 0;

const upNextTetrominoes = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
  [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
  [0, 1, displayWidth, displayWidth + 1], //oTetromino
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
];

// display on mini-grid
function displayShape() {
  displaySquares.forEach((square) => {
 square.classList.remove("tetromino");
 //   squares.style.backgroundColor = ""
  });
  upNextTetrominoes[nextRandom].forEach((index) => {
 displaySquares[displayIndex + index].classList.add("tetromino");
//   displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
   });
}

startBtn.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = "";
  } else {
    draw();
    music.play();
    music.loop = true 
    timerId = setInterval(down, 400);
  }
  nextRandom = Math.floor(Math.random() * theTetrominos.length);
  displayShape();

  if (playBtn) {
    pause.classList.toggle("pauseShow");
    playBtn.classList.toggle("playnone");
  }
});

pauseBtn.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = "";
  } else {
    draw();
    music.play();
    music.loop = true 
    timerId = setInterval(down, 400);
  }
  nextRandom = Math.floor(Math.random() * theTetrominos.length);
  displayShape();

  if (playBtn) {
    pause.classList.toggle("pauseShow");
    playBtn.classList.toggle("playnone");
  }
});
//level

// add score
function addScore() {
  for (let i = 0; i < 199; i += width) {
    const row = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];

    if (row.every((index) => squares[index].classList.contains("taken"))) {
      score += 10;
      scoreDisplay.innerHTML = score;

      row.forEach((index) => {
        squares[index].classList.remove("taken");
        squares[index].classList.remove("tetromino");
    squares[index].style.backgroundColor = "";
      });
      const squareRemoved = squares.splice(i, width);
      squares = squareRemoved.concat(squares);
      squares.forEach((cell) => grid.appendChild(cell));
    }
  }
}

// game over
function gameOver() {
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    clearInterval(timerId);
   let general = document.querySelector(".general")
   let grade = document.querySelector("#grade")
    general.classList.add("generalshow")
  grade.innerHTML = score;
  }
}
