let gameSizes = []
let difficulties = [10, 40, 99];

$("#StartGame").click(function() {
  $("#StartGame").toggleClass("hidden");
  $("#ResetFlagButton").toggleClass("hidden");
  $("#ResetGameButton").toggleClass("hidden");
  let gameSection = $("#GameSection");
  let mineCountButtons = "<div class='container-flex'><h2>Please select number of mines:</h2></div>";
  for(let i = 0; i < difficulties.length; i++) {
    mineCountButtons += "<button id='" + difficulties[i] + "' class='Button'>" + difficulties[i] + "</button>";
  };
  gameSection.html(mineCountButtons);
  $("#GameSection .Button").click(function() {
    mines = $(this).attr("id");
    console.log(mines);
  });
});

let mines = 0;



let gameBoard = [];
