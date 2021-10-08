    
    // Single App Application (No Framework) BON TUTO:    https://dev.to/dcodeyt/building-a-single-page-app-without-frameworks-hl9
    
    
    window.onload = function(){

      var score = 0;
      var mise = 0;

      // Partie
      var cards = ["2","3","4","5","6","7","8","9","10","1"];
      var createCardLi = document.createElement("li")
      var createCardImg = document.createElement("img")
      
      
      $(document).ready(function(){    
        $("#lancerPartie").click(function(){
            $("#container1").load("jouerPartie.html");
            setTimeout( function lancerPartie() {
                mise = prompt("{Manche 1} Entrez votre mise: ")
                document.getElementById("miseVar").innerHTML = mise;

                // APPEL NOUVELLE CARTE ONCLICK
                document.getElementById('newCard').addEventListener("click", addCardImage);
            }, 500)
        });
      });



      // NOUVELLE CARTE
      function addCardImage() {
        var img = document.createElement('img');
        img.src = "cartes\\2C.png";
        img.className = "imgPartie";
        document.getElementById("croupier").appendChild(img);
      }
      // FIN


      function scorePop() {
        document.getElementById("scoreContainer").classList.toggle('scorePop');
      }
      

      function scoreState() {
        if (score > 0) {
          document.getElementById("scoreVar").innerHTML = "+" + score;
          document.getElementById("scoreVar").classList.remove('neutral');
          document.getElementById("scoreVar").classList.remove('negative');
          document.getElementById("scoreVar").classList.add('positive');
        }
        else if (score == 0) {
          document.getElementById("scoreVar").classList.remove('positive');
          document.getElementById("scoreVar").classList.remove('negative');
          document.getElementById("scoreVar").classList.add('neutral');
        }
        else {
          document.getElementById("scoreVar").classList.remove('positive');
          document.getElementById("scoreVar").classList.remove('neutral');
          document.getElementById("scoreVar").classList.add('negative');
        }
      }

      

      // document.getElementById("miseVar").innerHTML = mise;
      document.getElementById("scoreVar").innerHTML = score;

      

      document.getElementById('scoreAdd').addEventListener("click", plus1);
      function plus1() {
        scorePop();
        score += 1;
        document.getElementById("scoreVar").innerHTML = score;
        scoreState();
        // Suppression de la classe togglé "scorePop" apres x temps
        setTimeout(function scoreDepop() {
          document.getElementById("scoreContainer").classList.toggle('scorePop');
        }, 500);
      }
      document.getElementById('scoreRem').addEventListener("click", minus1);
      function minus1() {
        scorePop();
        score -= 1;
        document.getElementById("scoreVar").innerHTML = score;
        scoreState();
        // Suppression de la classe togglé "scorePop" apres x temps
        setTimeout(function scoreDepop() {
          document.getElementById("scoreContainer").classList.toggle('scorePop');
        }, 500);
      }

      

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




