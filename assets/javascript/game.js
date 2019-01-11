//    Crystal Game Psudo Code
      // reset Game
      // Generate random target number
      // Generate random values for each crystal and assign to image

      // play game and update page
      //   did win? update
      //   did loose? update

      // Update win/lost score

      // reset game

// 

// doc.ready code when the DOM is loaded.
$(document).ready(function() {

    // The number we add to by clicking crystals = "Your Total Score is". 
    var yourMatchingNumber = 0;
  
    // Generates the random number to try to match.
    var randomNum = randomNumGen();
  
    // Starting variables, 0 wins, 0 losses crystals set to 0.
    var wins = 0;
    var losses = 0;
    var crystals;

    // Create a random number between 19 and 120.
    function randomNumGen() {
      return Math.floor(Math.random() * 102) + 19;
        }
  
    // Function that generates random numbers for each crystal and returns random number and crystals image.
    function randomNumCrystals() {
      return {
        red: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "assets/images/red.png"
        },
        blue: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "assets/images/blue.png"
        },
        yellow: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "assets/images/yellow.png"
        },
        green: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "assets/images/green.png"
        }
      };
    }
  
    // Resets the game to 0 - Generate random crystal values -
    // - Generate a random target number and render it to the page.
    function setGame() {
      yourMatchingNumber = 0;
      crystals = randomNumCrystals();
      randomNum = randomNumGen();
      $("#random-area").text(randomNum);
    }
  
    // Update the page =
        // If the user won...
       // Show "you won" - Restart game - generate new random number.
       // else If the user lost...
      // Show "you lost", - Restart game - generate new random number.
    function updateDom(didUserWin) {
      $("#win-area").empty();
      if (didUserWin === true) {
        $("#win-area").append($("<p>").text("You Won The Last Game"));
        setGame();
        renderMatchingNumber();
      }

      else if (didUserWin === false) {
        $("#win-area").append($("<p>").text("You Lost The Last Game"));
        setGame();
        renderMatchingNumber();
      }
  
      // Build win/loss display and append it to page.
      var wSpan = $("<span>").text(wins);
      var lSpan = $("<span>").text(losses);
  
      var pWins = $("<p>").text("Total Wins: ");
      var pLosses = $("<p>").text("Total Losses: ");
  
      pWins.append(wSpan);
      pLosses.append(lSpan);
  
      $("#win-area").append(pWins);
      $("#win-area").append(pLosses);
    }
  
    // Render crystals to page.
    function renderCrystals() {
      for (var key in crystals) {
        var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
        var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
        crystalDiv.append(crystalImg);
        $("#crystal-area").append(crystalDiv);
      }
    }
  
    // Update our total score number based on which crystal was clicked.
    function updateMatchingNumber(crystal) {
      yourMatchingNumber += crystals[crystal.attr("data-name")].points;
    }
  
    // Render your total score number to the "score area div".
    function renderMatchingNumber() {
      var scoreNumDiv = $("<div id='score-number'>").text(yourMatchingNumber);
      $("#score-area").html();
      $("#score-area").html(scoreNumDiv);
    }
  
    // Call functions to start the game
    setGame();
    updateDom();
    renderCrystals();
    renderMatchingNumber();
  
    // on.click event for crystals - Update our total score number and re-render it on page.
    $(".crystals-button").on("click", function(event) {
      updateMatchingNumber($(this));
      renderMatchingNumber();
  
    // Check for won or lost.
    // If our total score number equals the random number ==   // Increment wins +1 , restart game, update page.
    // Else If our guess number exceeded our target number ==       // Increment loss +1, restart game, and update page.
      if (yourMatchingNumber === randomNum) {
        wins++;
        setGame();
        updateDom(true);
      }

      else if (yourMatchingNumber > randomNum) {
        losses++;
        setGame();
        updateDom(false);
      }
    });
  
  });
  