let settingFlags = false;
let board = null;

let gameButtons = [
  '<button id="StartGame" class="Button">Start Game</button>',
  '<button id="NewGame" class="hidden Button">New Game</button>',
  '<button id="GameRules" class="Button" onclick="document.location.href = \'https://en.wikipedia.org/wiki/Minesweeper_(video_game)\'">Game Rules</button>',
  '<button id="AddFlagsButton" class="hidden Button">Add Flags</button>',
  '<button id="DoneAddingFlagsButton" class="hidden Button">Done</button>',
  '<button id="ResetFlagButton" class="hidden Button">Reset Flags</button>',
  '<button id="ResetGameButton" class="hidden Button">Reset Game</button>',
]

function getGameButtonsString() {
  let gbString = "";
  for(let i = 0; i < gameButtons.length; i++) {
    gbString += gameButtons[i];
  };
  return gbString;
}

$("#GameButtons").html(getGameButtonsString());

// These buttons are hidden initially and when choosing the number of mines
function toggleGameButtons() {
  $("#NewGame").toggleClass("hidden");
  $("#AddFlagsButton").toggleClass("hidden");
  $("#ResetFlagButton").toggleClass("hidden");
  $("#ResetGameButton").toggleClass("hidden");
};

function revealMines() {
  let dims = board.getGameSize();
  for(let i = 0; i < dims[0]; i++) {
    for(let j = 0; j < dims[1]; j++) {
      if(board.gameBoard[i][j] === -1) {
        $("#GameBoardTable #" + ((i * dims[1]) + j)).html("<img class='bomb' src='images/boom.png'>");
      };
    };
  };
};

function hideMines() {
  let dims = board.getGameSize();
  for(let i = 0; i < dims[0]; i++) {
    for(let j = 0; j < dims[1]; j++) {
      if(board.gameBoard[i][j] === -1) {
        $("#GameBoardTable #" + ((i * dims[1]) + j)).html("");
      };
    };
  };
};

function toggleGame() {
  $("#GameSection").toggleClass("disabled");
};

function gameLost() {
  revealMines();
  $("#Outcome").html("Sorry, You Lost");
  $("#GameSection").addClass("disabled");
};

function gameWon() {
  $("#Outcome").html("Congratulations, You Win!");
  $("#GameSection").addClass("disabled");
};

// The function to be called when a gameBoard button is clicked
let cellClicked = function() {
  let buttonID = parseInt($(this).attr("id"));
  let sizeOfGame = board.getGameSize();
  let firstIndex = Math.floor(buttonID / sizeOfGame[1]);
  let secondIndex = buttonID % sizeOfGame[1];
  // If this evaluates to true then the button has already been selected
  // or flagged
  if(board.selectedButtons[firstIndex][secondIndex] === 1) {
    // do nothing
  } else {
    if(!settingFlags) {
      if(board.selectedButtons[firstIndex][secondIndex] === -1) {
        // button is flagged, do nothing
      } else {
        board.selectedButtons[firstIndex][secondIndex] = 1;
        if(board.gameBoard[firstIndex][secondIndex] === -1) {
          gameLost();
        } else {
          $(this).html(board.gameBoard[firstIndex][secondIndex]).toggleClass("disabled");
          switch(board.gameBoard[firstIndex][secondIndex]) {
            case 1:
              $(this).css("color", "blue");
              break;
            case 2:
              $(this).css("color", "green");
              break;
            case 3:
              $(this).css("color", "red");
              break;
            case 4:
              $(this).css("color", "purple");
              break;
            case 5:
              $(this).css("color", "maroon");
              break;
            case 6:
              $(this).css("color", "turquoise");
              break;
            case 7:
              $(this).css("color", "black");
              break;
            case 8:
              $(this).css("color", "gray");
          }
          board.deprecateUnselectedButtonCount();
          if(board.unselectedButtonCount === parseInt(mines)) {
            gameWon();
          }
        };
      };
    } else {
      // unset a flag that was previously set
      if(board.selectedButtons[firstIndex][secondIndex] === -1) {
        board.selectedButtons[firstIndex][secondIndex] = 0;
        $(this).toggleClass("Button-table").toggleClass("Button-flagged");
        board.removeFlag();
      } else if(board.flags < parseInt(board.mines)) {
        board.selectedButtons[firstIndex][secondIndex] = -1;
        $(this).toggleClass("Button-table").toggleClass("Button-flagged");
        board.addFlag();
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
    board = new MinesweeperGameBoard(mines);
    mineCountSection.toggleClass("hidden");
    gameSection.html(board.getGameTableHTML());
    $("#GameBoardTable .Button-table").click(cellClicked);
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
  $("#Outcome").html("");
  $("#GameSection").removeClass("disabled");
  hideMines();
  board = null;
});

function toggleFlagSelection() {
  $("#DoneAddingFlagsButton").toggleClass("hidden")
  toggleGameButtons();
  settingFlags = !settingFlags;
};

$("#AddFlagsButton, #DoneAddingFlagsButton").click(function() {
  toggleFlagSelection();
});

$("#ResetFlagButton").click(function() {
  board.resetFlags();

  let gameDims = board.getGameSize();
  for(let i = 0; i < gameDims[0]; i++) {
    for(let j = 0; j < gameDims[1]; j++) {
      if(board.selectedButtons[i][j] === -1) {
        let buttonID = $("#GameBoardTable #" + ((i * gameDims[1]) + j));
        buttonID.toggleClass("Button-table").toggleClass("Button-flagged");
        board.unselectButton(i, j);
      };
    };
  };
});

// Reverts game to initial state
$("#ResetGameButton").click(function() {
  board.resetUnselectedButtonsCount();
  $("#Outcome").html("");
  $("#GameSection").removeClass("disabled");
  hideMines();
  let gameDims = board.getGameSize();
  for(let i = 0; i < gameDims[0]; i++) {
    for(let j = 0; j < gameDims[1]; j++) {
      if(board.selectedButtons[i][j]) {
        let buttonID = $("#GameBoardTable #" + ((i * gameDims[1]) + j));
        if(board.selectedButtons[i][j] === 1) {
          buttonID.html("");
          buttonID.removeClass("disabled");
        } else {
          buttonID.toggleClass("Button-table").toggleClass("Button-flagged");
        };
        board.unselectButton(i, j);
      };
    };
  };
});
