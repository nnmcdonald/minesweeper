// gameSizes[i] is the dimensions for the gameBoard corresponding
// to difficulties[i], difficulties[i] is the number of mines on the gameBoard
let gameSizes = [[9,9],[16,16],[16,30]]
let difficulties = ["10", "40", "99"];
let gameBoard = [];
// selectedButtons[i][j] indicates whether gameBoard[i][j] has been clicked,
// -1 denotes a flag, 0 denotes unselected button, 1 denotes a selected button
let selectedButtons = [];
let mines = 0;
let flags = 0;

function updateCellValues(xVal, yVal) {
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

function getGameSize() {
  // Used to access game dimensions in gameSizes
  let index = null;
  for(let i = 0; i < difficulties.length; i++) {
    if(mines == difficulties[i]) {
      return gameSizes[i];
    };
  };
  // An error occured
  return null;
};

function placeMines(dims) {
  // Place the mines in random locations, mines can be placed
  // anywhere there isn't already a mine (as indicated by -1)
  for(let i = 0; i < parseInt(mines); i++) {
    let randX = null;
    let randY = null;

    do {
      randX = Math.floor(Math.random() * dims[0]);
      randY = Math.floor(Math.random() * dims[1]);
    } while(gameBoard[randX][randY] === -1);
    updateCellValues(randX, randY);
  };
};

// Generates table representation of gameBoard in HTML
function getGameTableHTML(dims) {
  let gameBoardTable = "";
  let cellIdentifier = 0;
  gameBoardTable += '<table id="GameBoardTable">';
  for(let i = 0; i < dims[0]; i++) {
    gameBoardTable += '<tr>';
    for(let j = 0; j < dims[1]; j++) {
      gameBoardTable += "<td><button id='" + cellIdentifier +
                      "' class='Button-table'></button></td>";
      cellIdentifier++;
    };
  };
  gameBoardTable += "</table>";
  return gameBoardTable;
};

function createGameBoard() {
  let gameDims = getGameSize();
  // Initialize board values to 0
  for(let i = 0; i < gameDims[0]; i++) {
    gameBoard[i] = [];
    selectedButtons[i] = [];
    for(let j = 0; j < gameDims[1]; j++) {
      gameBoard[i][j] = 0;
      selectedButtons[i][j] = 0;
    };
  };
  placeMines(gameDims);

  return getGameTableHTML(gameDims);
};

// These buttons are hidden initially and when choosing the number of mines
function toggleGameButtons() {
  $("#NewGame").toggleClass("hidden");
  $("#ResetFlagButton").toggleClass("hidden");
  $("#ResetGameButton").toggleClass("hidden");
};

// The function to be called when a gameBoard button is clicked
let cellClicked = function(event) {
  let buttonID = parseInt($(this).attr("id"));
  let sizeOfGame = getGameSize();
  let firstIndex = Math.floor(buttonID / sizeOfGame[0]);
  let secondIndex = buttonID % sizeOfGame[1];
  // If this evaluates to true then the button has already been selected
  // or flagged
  if(selectedButtons[firstIndex][secondIndex] === 1) {
    // do nothing
  } else {
    if(event.which === 1) {
      if(selectedButtons[firstIndex][secondIndex] === -1) {
        // button is flagged, do nothing
      } else {
        selectedButtons[firstIndex][secondIndex] = 1;
        $(this).html(gameBoard[firstIndex][secondIndex]).toggleClass("disabled");
      };
    } else if(event.which === 3) {
      // unset a flag that was previously set
      if(selectedButtons[firstIndex][secondIndex] === -1) {
        selectedButtons[firstIndex][secondIndex] = 0;
        $(this).toggleClass("Button-table").toggleClass("Button-flagged");
        flags--;
      } else if(flags < parseInt(mines)) {
        selectedButtons[firstIndex][secondIndex] = -1;
        $(this).toggleClass("Button-table").toggleClass("Button-flagged");
        flags++;
      } else {
        // max flags set, do nothing
      }
    };
  };

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
    $("#GameBoardTable .Button-table").mousedown(cellClicked);
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

$("#ResetFlagButton").click(function() {
  flags = 0;
  let gameDims = getGameSize();
  for(let i = 0; i < gameDims[0]; i++) {
    for(let j = 0; j < gameDims[1]; j++) {
      if(selectedButtons[i][j] === -1) {
        let buttonID = $("#GameBoardTable #" + ((i * gameDims[0]) + j));
        buttonID.toggleClass("Button-table").toggleClass("Button-flagged");
        selectedButtons[i][j] = 0;
      };
    };
  };
});

// Reverts game to initial state
$("#ResetGameButton").click(function() {
  let gameDims = getGameSize();
  for(let i = 0; i < gameDims[0]; i++) {
    for(let j = 0; j < gameDims[1]; j++) {
      if(selectedButtons[i][j]) {
        let buttonID = $("#GameBoardTable #" + ((i * gameDims[0]) + j));
        buttonID.html("");
        buttonID.removeClass("disabled");
        selectedButtons[i][j] = 0;
      };
    };
  };
});
