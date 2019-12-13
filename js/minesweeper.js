// gameSizes[i] is the dimensions for the gameBoard corresponding
// to difficulties[i], difficulties[i] is the number of mines on the gameBoard
let gameSizes = [[9,9],[16,16],[16,30]]
let difficulties = ["10", "40", "99"];
let gameBoard = [];
let mines = 0;

function createGameBoard(index) {
  for(let i = 0; i < gameSizes[index][0]; i++) {
    gameBoard[i] = [];
    for(let j = 0; j < gameSizes[index][1]; j++) {
      gameBoard[i][j] = null;
    };
  };
  console.log(gameBoard);
};

function generateGame() {
  for(let i = 0; i < difficulties.length; i++) {
    if(mines == difficulties[i]) {
      createGameBoard(i);
      break;
    };
    // TODO create table to display board
  };
  return "Game in progress.";
};

// These buttons are hidden initially and when choosing the number of mines
function toggleGameButtons() {
  $("#NewGame").toggleClass("hidden");
  $("#ResetFlagButton").toggleClass("hidden");
  $("#ResetGameButton").toggleClass("hidden");
};

function displayMineCountButtons() {
  let gameSection = $("#GameSection");
  let mineCountSection = $("#MineCountButtons");
  let mineCountButtons = "";
  for(let i = 0; i < difficulties.length; i++) {
    mineCountButtons += "<button id='" + difficulties[i] + "' class='Button'>" + difficulties[i] + "</button>";
  };
  gameSection.html("<h2>Please choose number of mines.</h2>");
  mineCountSection.html(mineCountButtons);
  mineCountSection.toggleClass("hidden");

  $("#MineCountButtons .Button").click(function() {
    mines = $(this).attr("id");
    mineCountSection.toggleClass("hidden");
    gameSection.html(generateGame());
    toggleGameButtons();
    console.log(mines);
  });
};

$("#StartGame").click(function() {
  $("#StartGame").toggleClass("hidden");
  displayMineCountButtons();
});

$("#NewGame").click(function() {
  toggleGameButtons();
  displayMineCountButtons();
  gameBoard = [];
});
