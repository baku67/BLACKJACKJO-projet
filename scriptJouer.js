    
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
          document.getElementById("arrowPng").setAttribute("src", "arrowUp.png")
        }
        else {
          content.style.display = "block";
          document.getElementById("arrowPng").setAttribute("src", "arrowDown.png")
        }
      });
      // FIN

      
      // Tableau d'objets cards
      let cards = [
        C2 = {
          id: 2,
          cardImageURL: "cartes\\2C.png",
          cardValue: 2
        },
        C3 = {
          id: 3,
          cardImageURL: "cartes\\3D.png",
          cardValue: 3
        },
        C4 = {
          id: 4,
          cardImageURL: "cartes\\4H.png",
          cardValue: 4
        },
        C5 = {
          id: 5,
          cardImageURL: "cartes\\5S.png",
          cardValue: 5
        },
        C6 = {
          id: 6,
          cardImageURL: "cartes\\6C.png",
          cardValue: 6
        }
      ];



      // JQUERY JAX : load.Contenu (partie)
      $(document).ready(function(){    
        $("#lancerPartie").click(function(){
            $("#container1").load("jouerPartie.html");
            setTimeout( function lancerPartie() {
                mise = prompt("{MANCHE 1} ENTREZ VOTRE MISE: ");
                document.getElementById("miseVar").innerHTML = mise;

                // APPEL NOUVELLE CARTE ONCLICK (ici pour joueur)
                document.getElementById('newCard').addEventListener("click", addCardCroupier);
            }, 500)
        });
      });


      // // TEST Wait 1
      // $(document).ready(function(){    
      //   $("#lancerPartie").click(function(){
            
      //     $("#container1").load("Wait.html");
      //       setTimeout( function lancerPartie() {
                
      //           mise = prompt("{MANCHE 1} ENTREZ VOTRE MISE: ");
      //           $("#container1").load("jouerPartie.html");

      //           document.getElementById("miseVar").innerHTML = mise;

      //           document.getElementById('newCard').addEventListener("click", addCardJoueur);
      //       }, 500)
      //   });
      // });
      // // FIN
      
      // // TEST Wait 2: CALLBACK
      // $(document).ready(function(){    
      //   $("#lancerPartie").click(function(){
      //       first(second);
      //       document.getElementById("miseVar").innerHTML = mise;
      //       document.getElementById('newCard').addEventListener("click", addCardJoueur);
      //   });
      // });
      // function first(callback) {
      //   $("#container1").load("Wait.html");
      //   mise = prompt("{MANCHE 1} ENTREZ VOTRE MISE: ");
      //   callback();
      // }
      // function second() {
      //   $("#container1").load("jouerPartie.html");
      // }
      // // FIN






      // NOUVELLE CARTE  > CROUPIER
      function addCardCroupier() {

        // Créer l'élément <img/>
        var img = document.createElement('img');

        // AJOUTER Array.del 
        
        // Pick l'objet et le stock dans une VAR
        let pickedCardObject = cards[Math.floor(Math.random()*cards.length)]
        // Associe la VALUE de la KEY "cardImageUrl", à l'attribut HTML de l'<img> créé
        img.src = pickedCardObject.cardImageURL;
        // Stock la VALUE de la KEY "cardValue" à une var
        var pickedCardValue = pickedCardObject.cardValue;
        // {Suppression de l'objet}
        // - https://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript?rq=1
        // - Library "Sugar.js": 
        //      HTML: https://raw.githubusercontent.com/andrewplummer/Sugar/2.0.4/dist/sugar.min.js
        //      JS:   someArray.remove(function(el) { return el.Name === "Kristian"; });
        //.......................

        // Affichage Valeur card pickée
        console.log(pickedCardValue);
        // img.src = C3.cardImageURL;
        // FIN

        // Ajoute class à img pour CSS
        img.className = "imgPartie";

        // Ajoute la var img à l'<ul> "#croupier"
        document.getElementById("croupier").appendChild(img);
      }
      // FIN


      // NOUVELLE CARTE  > JOUEUR
      function addCardJoueur() {
        var img = document.createElement('img');
        img.src = cards[Math.floor(Math.random()*cards.length)].cardImageURL;
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




