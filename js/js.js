$(function () {

  $(".start-button").on("click", function(){
    $("main").show();
    $(".start-game").hide();
  })

  const WORDSARRAY = ["kangaroo", "wombat", "bandicoot", "echidnas", "bowerbird"];
  const CURRENTWORD = (WORDSARRAY[Math.floor(Math.random() * WORDSARRAY.length)]).toUpperCase();
  
  console.log("Don't try to cheat! Okay fine... for developers purpose, the word is '" + CURRENTWORD + "'");

  answerArray = CURRENTWORD.split("");
  for (let i = 0; i < CURRENTWORD.length; i++) {
    $(".current-word").append('<div class="letter ' + i + '"></div>');
    $(".current-word").find(":nth-child(" + (i + 1) + ")").text(answerArray[i]);
  }

  let wrongGuesses = 0;
  $(".hanging-man").attr("src", "img/" + wrongGuesses + ".png");

  $(".letters>div>p").on("click", function () {
    $(this).addClass("used");
    let matchFound = false;
    let userInput = $(this).text();
    console.log(userInput);

    for (i = 0; i < CURRENTWORD.length; i++) {
      if (userInput === CURRENTWORD[i]) {
        $(".current-word").find(":nth-child(" + (i + 1) + ")").addClass("winner");
        matchFound = true;
      }
    }

    let goodGuesses = [];
    $(".letter").each(function (index) {
      if ($(this).hasClass("winner")) {
        goodGuesses.push(index);
      }

      if (goodGuesses.length === CURRENTWORD.length) {
        $(".restart").text("Play again?");
        $(".letters").hide();
        $(".message").text("You won!").show();
      }
    });

    if (matchFound === false) {
      wrongGuesses += 1;
      $(".hanging-man").attr("src", "img/" + wrongGuesses + ".png");
    }

    if (wrongGuesses === 8) {
      $(".restart").text("Play again?");
      $(".letters").hide();
      $(".message").text("You lost!").show();
    }

  });

  $(".restart").on("click", function () {
    location.reload();
  })

});