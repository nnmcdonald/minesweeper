let gameSizes = []
let difficulties = [10, 40, 99];
let gameBoard = [];
let mines = 0;

function generateGame() {
  return "Game in progress.";
};

function displayMineCountButtons() {
  let gameSection = $("#GameSection");
  let mineCountButtons = "<div class='container-flex'><h2>Please select number of mines:</h2></div>";
  for(let i = 0; i < difficulties.length; i++) {
    mineCountButtons += "<button id='" + difficulties[i] + "' class='Button'>" + difficulties[i] + "</button>";
  };
  gameSection.html(mineCountButtons);

  $("#GameSection .Button").click(function() {
    mines = $(this).attr("id");
    gameSection.html(generateGame());
    console.log(mines);
  });
};

$("#StartGame").click(function() {
  $("#StartGame").toggleClass("hidden");
  $("#NewGame").toggleClass("hidden");
  $("#ResetFlagButton").toggleClass("hidden");
  $("#ResetGameButton").toggleClass("hidden");
  displayMineCountButtons();
});

$("#NewGame").click(function() {
  displayMineCountButtons();
});
