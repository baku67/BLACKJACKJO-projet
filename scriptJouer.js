    
    // Single App Application (No Framework) BON TUTO:    https://dev.to/dcodeyt/building-a-single-page-app-without-frameworks-hl9
    
    
    window.onload = function(){

        //#region  Var Compteurs

        var score = 0;

        var c2 = 0;
        var c3 = 0;

        //#endregion

        //#region MaxCards
        var mise = prompt("MISE : ");
        document.getElementById("miseVar").innerHTML = mise;
        document.getElementById("scoreVar").innerHTML = score;

        document.getElementById('max1').innerHTML = maxCards;

        //#endregion





        //#region  OnClick --> Incr
        document.getElementById('scoreAdd').addEventListener("click", plus1);
        function plus1() {
          alert("hello");
          score += 1;
          document.getElementById('scoreVar').innerHTML = score;
        }
        //#endregion


    }







    
      
    
    




/* 
SON discret sur ONGLET: HOVER et CARTES

<!doctype html>
<html>
  <head>
    <title>Audio</title>
  </head>
  <body>

    <script>
      function play() {
        var audio = document.getElementById("audio");
        audio.play();
      }
    </script>

    <input type="button" value="PLAY" onclick="play()">
    <audio id="audio" src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"></audio>

  </body>
</html>

OU   

  var audio = new Audio("C:\Users\basil\OneDrive\Documents\~~ DEV Blackjack repo~~\BlackJackJooo\sons\DEAL.mp3");
  audio.oncanplaythrough = function(){audio.play();} 
  */




