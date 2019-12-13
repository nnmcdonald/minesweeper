// gameSizes[i] is the dimensions for the gameBoard corresponding
// to difficulties[i], difficulties[i] is the number of mines on the gameBoard
let gameSizes = [[9,9],[16,16],[16,30]]
let difficulties = ["10", "40", "99"];
let gameBoard = [];
let mines = 0;

function updateCellValues3(xVal, yVal) {
  gameBoard[xVal][yVal] = -1;
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      try {
        if(gameBoard[xVal+1-i][yVal+1-j] != -1) {
          gameBoard[xVal+1-i][yVal+1-j]++;
        };
      } catch(error) {
        // do nothing
      };
    };
  };
};

function createGameBoard() {
  // Used to access game dimensions in gameSizes
  let index = null;
  for(let i = 0; i < difficulties.length; i++) {
    if(mines == difficulties[i]) {
      index = i;
      break;
    };
  };
  // Initialize board values to 0
  for(let i = 0; i < gameSizes[index][0]; i++) {
    gameBoard[i] = [];
    for(let j = 0; j < gameSizes[index][1]; j++) {
      gameBoard[i][j] = 0;
    };
  };
  for(let i = 0; i < parseInt(mines); i++) {
    let randX = null;
    let randY = null;

    do {
      randX = Math.floor(Math.random() * gameSizes[index][0]);
      randY = Math.floor(Math.random() * gameSizes[index][1]);
    } while(gameBoard[randX][randY] === -1);
    updateCellValues3(randX, randY);
  };
  let gameBoardTable = "";
  let cellIdentifier = 0;
  gameBoardTable += '<table id="GameBoardTable">';
  for(let i = 0; i < gameSizes[index][0]; i++) {
    gameBoardTable += '<tr>';
    for(let j = 0; j < gameSizes[index][1]; j++) {
      gameBoardTable += "<td><button id='" + cellIdentifier +
                      "' class='Button-table'>" + gameBoard[i][j] + "</button></td>";
      cellIdentifier++;
    };
  };
  gameBoardTable += "</table>";
  return gameBoardTable;
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
    gameSection.html(createGameBoard());
    toggleGameButtons();
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

$("#ResetGameButton").click(function() {
  console.log(Math.random());
});
