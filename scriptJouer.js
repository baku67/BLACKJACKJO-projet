    
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




      // REGION ARRAY CARDS OBJECT
      //#region array of objects: "cards"
      // Tableau d'objets cards
      let cards = [
        C2a = {
          cardImageURL: "cartes\\2C.png",
          cardValue: 2
        },
        C2b = {
          cardImageURL: "cartes\\2D.png",
          cardValue: 2
        },
        C2c = {
          cardImageURL: "cartes\\2H.png",
          cardValue: 2
        },
        C2d = {
          cardImageURL: "cartes\\2S.png",
          cardValue: 2
        },
        C3a = {
          cardImageURL: "cartes\\3C.png",
          cardValue: 3
        },
        C3b = {
          cardImageURL: "cartes\\3D.png",
          cardValue: 3
        },
        C3c = {
          cardImageURL: "cartes\\3H.png",
          cardValue: 3
        },
        C3d = {
          cardImageURL: "cartes\\3S.png",
          cardValue: 3
        },
        C4a = {
          cardImageURL: "cartes\\4C.png",
          cardValue: 4
        },
        C4b = {
          cardImageURL: "cartes\\4D.png",
          cardValue: 4
        },
        C4c = {
          cardImageURL: "cartes\\4H.png",
          cardValue: 4
        },
        C4d = {
          cardImageURL: "cartes\\4S.png",
          cardValue: 4
        },
        C5a = {
          cardImageURL: "cartes\\5C.png",
          cardValue: 5
        },
        C5b = {
          cardImageURL: "cartes\\5D.png",
          cardValue: 5
        },
        C5c = {
          cardImageURL: "cartes\\5H.png",
          cardValue: 5
        },
        C5d = {
          cardImageURL: "cartes\\5S.png",
          cardValue: 5
        },
        C6a = {
          cardImageURL: "cartes\\6C.png",
          cardValue: 6
        },
        C6b = {
          cardImageURL: "cartes\\6D.png",
          cardValue: 6
        },
        C6c = {
          cardImageURL: "cartes\\6H.png",
          cardValue: 6
        },
        C6d = {
          cardImageURL: "cartes\\6S.png",
          cardValue: 6
        },
        C7a = {
          cardImageURL: "cartes\\7C.png",
          cardValue: 7
        },
        C7b = {
          cardImageURL: "cartes\\7D.png",
          cardValue: 7
        },
        C7c = {
          cardImageURL: "cartes\\7H.png",
          cardValue: 7
        },
        C7d = {
          cardImageURL: "cartes\\7S.png",
          cardValue: 7
        },
        C8a = {
          cardImageURL: "cartes\\8C.png",
          cardValue: 8
        },
        C8b = {
          cardImageURL: "cartes\\8D.png",
          cardValue: 8
        },
        C8c = {
          cardImageURL: "cartes\\8H.png",
          cardValue: 8
        },
        C8d = {
          cardImageURL: "cartes\\8S.png",
          cardValue: 8
        },
        C9a = {
          cardImageURL: "cartes\\9C.png",
          cardValue: 9
        },
        C9b = {
          cardImageURL: "cartes\\9D.png",
          cardValue: 9
        },
        C9c = {
          cardImageURL: "cartes\\9H.png",
          cardValue: 9
        },
        C9d = {
          cardImageURL: "cartes\\9S.png",
          cardValue: 9
        },
        C10a = {
          cardImageURL: "cartes\\10C.png",
          cardValue: 10
        },
        C10b = {
          cardImageURL: "cartes\\10D.png",
          cardValue: 10
        },
        C10c = {
          cardImageURL: "cartes\\10H.png",
          cardValue: 2
        },
        C10d = {
          cardImageURL: "cartes\\10S.png",
          cardValue: 10
        },
        C11a = {
          cardImageURL: "cartes\\JC.png",
          cardValue: 10
        },
        C11b = {
          cardImageURL: "cartes\\JD.png",
          cardValue: 10
        },
        C11c = {
          cardImageURL: "cartes\\JH.png",
          cardValue: 10
        },
        C11d = {
          cardImageURL: "cartes\\JS.png",
          cardValue: 10
        },
        C12a = {
          cardImageURL: "cartes\\QC.png",
          cardValue: 10
        },
        C12b = {
          cardImageURL: "cartes\\QD.png",
          cardValue: 10
        },
        C12c = {
          cardImageURL: "cartes\\QH.png",
          cardValue: 10
        },
        C12d = {
          cardImageURL: "cartes\\QS.png",
          cardValue: 10
        },
        C13a = {
          cardImageURL: "cartes\\KC.png",
          cardValue: 10
        },
        C13b = {
          cardImageURL: "cartes\\KD.png",
          cardValue: 10
        },
        C13c = {
          cardImageURL: "cartes\\KH.png",
          cardValue: 10
        },
        C13d = {
          cardImageURL: "cartes\\KS.png",
          cardValue: 10
        },
        C1a = {
          cardImageURL: "cartes\\AC.png",
          cardValue: 1
        },
        C1b = {
          cardImageURL: "cartes\\AD.png",
          cardValue: 1
        },
        C1c = {
          cardImageURL: "cartes\\AH.png",
          cardValue: 1
        },
        C1d = {
          cardImageURL: "cartes\\AS.png",
          cardValue: 1
        }
      ];
      //#endregion





      // JQUERY JAX : load.Contenu (partie)  
      $("#lancerPartie").click(function(){
          $("#container1").load("jouerPartie.html");
          setTimeout( function lancerPartie() {
              mise = prompt("{MANCHE 1} ENTREZ VOTRE MISE: ");
              document.getElementById("miseVar").innerHTML = mise;

              // BOUTON "CARTE"
              document.getElementById('newCard').addEventListener("click", addCardJoueur);

              // DEROULEMENT: 1ere carte visible pour croupier
              setTimeout( addCardCroupier(), 2000);


          }, 500)
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




