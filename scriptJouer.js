    
    // Single App Application (No Framework) BON TUTO:    https://dev.to/dcodeyt/building-a-single-page-app-without-frameworks-hl9
    
    
    window.onload = function(){

      var score = 0;
      var mise = 0;

      //  Collapse Footer
      var coll = document.getElementById("collapsible");
      var i;
      var content = document.getElementById("collapseContent");

      coll.addEventListener("click", function() {
        if (content.style.display === "block") {
          content.style.display = "none";
        }
        else {
          content.style.display = "block";
        }
      });
      // FIN

      // Tableau d'objets cards
      let cards = {
        C2 : {
          "id": 2,
          "cardImageURL": "cartes\\2C.png",
          "cardValue": 2
        },
        C3 : {
          "id": 3,
          "cardImageURL": "cartes\\3D.png",
          "cardValue": 3
        },
        C4 : {
          "id": 4,
          "cardImageURL": "cartes\\4H.png",
          "cardValue": 4
        },
        C5 : {
          "id": 5,
          "cardImageURL": "cartes\\5S.png",
          "cardValue": 5
        },
        C6 : {
          "id": 6,
          "cardImageURL": "cartes\\6C.png",
          "cardValue": 6
        }
      };




      // random pick of array  https://www.geeksforgeeks.org/how-to-select-a-random-element-from-array-in-javascript/
      
      //                            var cards = ["GFG_1", "GeeksForGeeks",
      //                                         "Geeks", "Computer Science Portal"];
      // Chope l'objet :            cards[Math.floor(Math.random() * cards.length)];

      //
      // Object.values(object1)
      // WIP: Object.values(C2[2])     //index 2 = url       (check indexStart en JS)
      //      Object.Values(C2[3])     //index 3 = valeur


      // chope l'objet selon critères(values) Inutil ici?
      // https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/
      // let car = cars.find(car => car.color === "red");



      





      $(document).ready(function(){    
        $("#lancerPartie").click(function(){
            $("#container1").load("jouerPartie.html");
            setTimeout( function lancerPartie() {
                mise = prompt("{MANCHE 1} ENTREZ VOTRE MISE: ")
                document.getElementById("miseVar").innerHTML = mise;

                // APPEL NOUVELLE CARTE ONCLICK (ici pour joueur)
                document.getElementById('newCard').addEventListener("click", addCardJoueur);
            }, 500)
        });
      });



      // NOUVELLE CARTE  > CROUPIER
      function addCardCroupier() {

        // Créer l'élément <img/>
        var img = document.createElement('img');

        // URL doit etre une var random du arrayCards ET AJOUTER Array.del (pour retirer la carte du pool)
        img.src = "cartes\\2C.png";

        // Ajoute une class à img
        img.className = "imgPartie";

        // Ajoute la var img à l'<ul> "#croupier"
        document.getElementById("croupier").appendChild(img);
      }
      // FIN


      // NOUVELLE CARTE  > JOUEUR
      function addCardJoueur() {
        var img = document.createElement('img');
        img.src = "cartes\\5S.png";
        img.className = "imgPartie";
        document.getElementById("joueur").appendChild(img);
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




