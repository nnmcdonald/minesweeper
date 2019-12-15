// gameSizes[i] is the dimensions for the gameBoard corresponding
// to difficulties[i], difficulties[i] is the number of mines on the gameBoard
let gameSizes = [[9,9],[16,16],[16,30]];
let difficulties = ["10", "40","99"];

class MinesweeperGameBoard {
  constructor(mineCount) {
    this.mines = mineCount;
    this.flags = 0;
    this.gameBoard = [];
    this.selectedButtons = [];
    this.unselectedButtonCount = 0;
    this.createGameBoard();
  };

  createGameBoard() {
    let gameDims = this.getGameSize();
    this.resetUnselectedButtonsCount();
    // Initialize board values to 0
    for(let i = 0; i < gameDims[0]; i++) {
      this.gameBoard[i] = [];
      this.selectedButtons[i] = [];
      for(let j = 0; j < gameDims[1]; j++) {
        this.gameBoard[i][j] = 0;
        this.selectedButtons[i][j] = 0;
      };
    };
    this.placeMines(gameDims);
  };

  getGameSize() {
    // Used to access game dimensions in gameSizes
    let index = null;
    for(let i = 0; i < difficulties.length; i++) {
      if(this.mines === difficulties[i]) {
        return gameSizes[i];
      };
    };
    // An error occured
    return null;
  };

  placeMines(dims) {
    // Place the mines in random locations, mines can be placed
    // anywhere there isn't already a mine (as indicated by -1)
    for(let i = 0; i < parseInt(this.mines); i++) {
      let randX = null;
      let randY = null;

      do {
        randX = Math.floor(Math.random() * dims[0]);
        randY = Math.floor(Math.random() * dims[1]);
      } while(this.gameBoard[randX][randY] === -1);
      this.updateCellValues(randX, randY);
    };
  };

  updateCellValues(xVal, yVal) {
    this.gameBoard[xVal][yVal] = -1;
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        try {
          if(this.gameBoard[xVal+1-i][yVal+1-j] != -1) {
            this.gameBoard[xVal+1-i][yVal+1-j]++;
          };
        } catch(error) {
          // do nothing
        };
      };
    };
  };

  // Generates table representation of gameBoard in HTML
  getGameTableHTML() {
    let dims = this.getGameSize();
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
      gameBoardTable += '</tr>';
    };
    gameBoardTable += "</table>";
    return gameBoardTable;
  };

  resetUnselectedButtonsCount() {
    let gameDims = this.getGameSize();
    this.unselectedButtonCount = gameDims[0] * gameDims[1];
  };

  deprecateUnselectedButtonCount() {
    this.unselectedButtonCount--;
  }

  removeFlag() {
    this.flags--;
  }

  addFlag() {
    this.flags++;
  }

  resetFlags() {
    this.unselectedButtonCount += this.flags;
    this.flags = 0;
  }

  unselectButton(i, j) {
    this.selectedButtons[i][j] = 0;
  }
}
