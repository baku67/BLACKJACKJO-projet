    
    window.onload = function(){

      // FIX MOZILLA ZOOM
        // const browser = window.browser || window.chrome;

        // function onError(error) {
        //   console.log(`Error: ${error}`);
        // }
    
        // var setting = browser.tabs.setZoom(2);
        // setting.then(null, onError);
      // FIN FIX

      var audioCardSound = new Audio("Audio/addCardSound.mp3");
      audioCardSound.volume = 0.4;

      var audioCoinWin = new Audio("Audio/winCoinSound.mp3");
      audioCoinWin.volume = 0.4;

      var audioExplosionBust = new Audio("Audio/explosionSound.mp3");
      audioExplosionBust.volume = 0.04;

      var audioPush = new Audio("Audio/pushSound.mp3");
      audioPush.volume = 0.4;

      var audioToken = new Audio("Audio/tokenSound.mp3");
      audioToken.volume = 0.7;

      var audioDecompte = new Audio("Audio/decompteSound.mp3");
      audioDecompte.volume = 0.02;

      var audioMiser = new Audio("Audio/soundMise.wav");
      audioMiser.volume = 0.3;

      var toggleHand = true;
      
      var removed = false;

      // Réinitialisé dans le NewGame (tableau des valeurs derniers jetons ajoutés en vue de retour arriere)
      let logTokenValues = [];
      let logTokenValuesPair = [];
      let logTokenValues213 = [];

      var cartesSortiesPartie = [];
      var cartesJoueurSortiesPartie = [];

      var WinLose = "";

      var nbrCardsJoueur;
      var nbrCardsCroupier;

      var credits = 0;
      var gain = 0;
      var gainFront = 0;
      var gainPairBet = 0;

      var ingame = false;

      var newValue;
      var score = 0;
      var mise = 0;
      var scoreTotalJoueur = 0;
      var scoreTotalCroupier = 0;
      var isPhaseMise = false;

      var PreviousMiseNormale = 0;
      var PreviousMisePair = 0;
      var PreviousMise213 = 0;

      var consecutivBets = false;

      var miseEnCours;
      var misePairEnCours = 0;
      var mise213EnCours;
      var miseLocked;
      var misePairLocked = 0;
      var mise213Locked;

      var firstProc = false;

      var toggleCardSimplist = true;


      var compteurDeck = cards.length;
      var compteurDeckMax = cards.length;

      var burstJoueur = false;

      var asJoueur = new Boolean;
      var asCroupier = new Boolean;
      var asCroupier2 = false;
      
      var ChoixActif = false;

      var misesResultatDiff;

      var doubleBool = 0;


      let historiqueInviteArray = [];







// IFRAME WIP 
      // function displayMessage (evt) {
      //   var message;
      //   if (evt.origin !== "http://portfolio.basilek.ovh") {
      //       message = "You are not worthy";
      //   } else {
      //       message = "I got " + evt.data + " from " + evt.origin;
      //   }   
      //   document.getElementById("received-message").innerHTML = message;
      // }
      
      // if (window.addEventListener) {
      //     // For standards-compliant web browsers
      //     window.addEventListener("message", displayMessage, false);
      // } else {
      //     window.attachEvent("onmessage", displayMessage);
      // }

// Solution 2: https://stackoverflow.com/questions/27269406/change-style-of-an-element-inside-iframe-cross-domain-i-own-the-second-domain?fbclid=IwAR1t2ioKteVnuU7ykGgDw42EpOMy77W7PGdqz1MB0ZV1SdLCCgAxLQTEYAI
    // handleMessage = function(e) {
    //   if(e.origin === 'http://www.portfolio.basilek.ovh') {
    //     var action = e.data.split(':')[0]
    //     if(action === 'changeStyle') {
    //       //do style change
    //       document.getElementById("header").style.width = "0px !important";
    //     }
    //   }
    // }
    // window.addEventListener("message", handleMessage, false);

    // Test log de message recu depuis Portfolio
    function receivedMessageFromPortfolio ( event ) {
      console.log('changeStyle', event );
      // alert("bla", event);
      document.getElementById("header").style.width = "0px !important";
    }
    window.addEventListener("message", receivedMessageFromPortfolio, false);






      






      if (isConnected == true && toggleDMfromPhp == true) {

        document.querySelector('#deconnexionImg').src = "../Images/deconnexion_darkMode.png";

        let body = document.querySelector('body');
        body.dataset.theme = "dark";

        cards.forEach(element => {
          element.cardImageURL = element.cardImageURL.substring(0, 9) + "_darkMode.png";
        });

        var imgElemArray = document.querySelectorAll('.imgPartieDM');
        imgElemArray.forEach(element => {
          element.src = element.src.substring(0, 37) + "_darkMode.png";
        });


        if (document.getElementById("backCardCroupier") !== null) {
          document.getElementById("backCardCroupier").src = "../Images/deck3_darkMode2.png";
        }
      }





















































      if (isConnected == false) {
        document.getElementById("connectionContainer").style.marginRight = "0px";

        refreshAnimJauge();
      }
      else {
        document.getElementById("connectionContainer").style.marginRight = "55px";
        document.getElementById("imgStreak").style.top = "20.3%";

        refreshAnimJauge();
        
      }


      function refreshAnimJauge() {

        // document.getElementById("dataProgress").classList.add("jaugeFlashAnim");
        // setTimeout(function() {
        //   document.getElementById("dataProgress").classList.remove("jaugeFlashAnim");
        // }, 300)

        setTimeout(function() {

          $(".jaugeContainer span").each(function () {
            $(this).animate(
              {
                width: $(this).attr("data-progress") + "%",
              },
              500
            );
            $(this).text($(this).attr("data-progress") + "%");
          });
        }, 500)
      }





      function refreshLvl() {
        setTimeout(function() {
          $.ajax({
            url: "getLevel.php",
            success: function(data) {
              if (document.getElementById("lvlText") !== null ) {
                document.getElementById("lvlText").innerHTML = parseInt(data);
              }
            }
          })  
        }, 600);
      }













      // appelé dans le index?
      // function sideFramePC() {

      //   var sideLeftDiv = document.createElement("div");
      //   sideLeftDiv.setAttribute("id", "sideLeftDiv");
      //   sideLeftDiv.innerHTML = "<p>sideLeftConseil</p>";

      //   var sideRightDiv = document.createElement("div");
      //   sideRightDiv.setAttribute("id", "sideRightDiv");
      //   sideRightDiv.innerHTML = "<p>sideRightConseil</p>";


      //   document.body.append(sideRightDiv);
      //   document.body.append(sideLeftDiv);
      // }








      // Front du dailyReward
      if ((isConnected == true) && (document.getElementById("dailyRewardBool") != null)) {
        // Bool switché onPurpose pour tester
        if (document.getElementById("dailyRewardBool").innerText == "1") {

          setTimeout(function() {
            document.getElementById("dailyRewardDiv").style.display = "block";
            document.getElementById("dailyRewardDiv").classList.add('fadeInDailyReward');
          }, 1100)

          document.getElementById('newGame').classList.add("is-blurred");
          document.getElementById('ratioDiv').classList.add("is-blurred");
          document.getElementById('footer').classList.add("is-blurred");
          document.getElementById('header').classList.add("is-blurred");
          document.getElementById('classementDiv').classList.add("is-blurred");
          document.getElementById('connectionContainer').classList.add("is-blurred");
          document.getElementById('jaugeContainerMaster').classList.add("is-blurred");
        }
      }

      document.getElementById("amountDailyReward").addEventListener("click", function() {
        if (document.getElementById("dailyRewardDiv").style.display == "block") {

          setTimeout(function() {
            document.getElementById("dailyRewardDiv").classList.remove('fadeInDailyReward');
            document.getElementById("dailyRewardDiv").classList.add('fadeOutDailyRewards');
          }, 50)

          setTimeout(function() {
            document.getElementById("dailyRewardDiv").style.display = "none";
          }, 500)

          // Ajout du reward (front qui correspond au back):
          setTimeout(function() {
            document.getElementById("creditsConnected").innerText = (parseInt(document.getElementById("creditsConnected").innerText) + 100);
            creditsConnected += 100;
            document.getElementById("creditsConnected").classList.add("refreshCreditAnim");
          }, 150)

          document.getElementById('newGame').classList.remove("is-blurred");
          document.getElementById('ratioDiv').classList.remove("is-blurred");
          document.getElementById('footer').classList.remove("is-blurred");
          document.getElementById('header').classList.remove("is-blurred");
          document.getElementById('classementDiv').classList.remove("is-blurred");
          document.getElementById('connectionContainer').classList.remove("is-blurred");
          document.getElementById('jaugeContainerMaster').classList.remove("is-blurred");
        }
      })
      // Fin dailyReward



















      // Boutons Toggle

      if (isConnected == true) {

        if (toggleSpeed == 1) {
          toggleSpeed = true;
        }
        else {
          toggleSpeed = false;
        }
        var setTimeOutMultiplierBool = toggleSpeed;

        if (toggleDMfromPhp == 1) {
          toggleDMfromPhp = true;
        }
        else {
          toggleDMfromPhp = false;
        }
        var darkModeBool = toggleDMfromPhp;

        if (toggleMutefromPhp == 1) {
          toggleMutefromPhp = true;
        }
        else {
          toggleMutefromPhp = false;
        }
        var SoundMuteBool = toggleMutefromPhp;
      }

      else  {
        var setTimeOutMultiplierBool = false;
        var darkModeBool = true;
        var SoundMuteBool = true;
        // var toggleSpeed = false;
      }   
      
      
      var setTimeOutMultiplier = 0.65;






      //  Collapse Footer
      var coll = document.getElementById("collapsible");
      var content = document.getElementById("collapseContent");
      var isCollapsed = false;
      footerCollapse();
      if (darkModeBool == true) {
        document.getElementById("arrowPng").setAttribute("src", "Images/arrowUpWhitePng_darkMode.png");
      }
      else {
        document.getElementById("arrowPng").setAttribute("src", "Images/arrowUpWhitePng.png");
      };
      document.getElementById("arrowPng").style.position = "relative";
      document.getElementById("arrowPng").style.bottom = "13px";
      document.getElementById("arrowPng").style.opacity = "0.6";

      

      coll.addEventListener("click", function() {
        if (content.style.display === "block") {
          footerCollapse();
          document.getElementById("collapseContent").style.height = "0px";
          document.getElementById("footer").classList.remove("footerOnPartie");
          document.getElementById("footer").classList.add("collapseFooter");
          // document.getElementById("footer").style.height = "0px";  
        }
        else {
          footerShow();
          document.getElementById("collapseContent").style.height = "";
          document.getElementById("footer").classList.remove("collapseFooter");
          document.getElementById("footer").classList.add("footerOnPartie");
          // document.getElementById("footer").style.height = "";  
        }
      });
      // FIN

      function footerCollapse() {
        content.style.display = "none";

        if (darkModeBool == true) {
          document.getElementById("arrowPng").setAttribute("src", "Images/arrowUpWhitePng_darkMode.png");
        }
        else {
          document.getElementById("arrowPng").setAttribute("src", "Images/arrowUpWhitePng.png");
        };
        document.getElementById("arrowPng").style.position = "relative";
        document.getElementById("arrowPng").style.bottom = "13px";
        document.getElementById("arrowPng").style.opacity = "0.6";

        isCollapsed = true;
      }
      function footerShow() {
        content.style.display = "block";

        if (darkModeBool == true) {
          document.getElementById("arrowPng").setAttribute("src", "Images/arrowDownWhitePng_darkMode.png");
        }
        else {
          document.getElementById("arrowPng").setAttribute("src", "Images/arrowDownWhitePng.png");
        };
        document.getElementById("arrowPng").style.bottom = "0px";
        document.getElementById("arrowPng").style.opacity = "0.6";


        isCollapsed = false;
      }
      

















      var modalInscription = document.getElementById("inscriptionModal");
      var modalConnection = document.getElementById("connectionModal");

      if ((document.getElementById("connectionButton") !== null ) && (document.getElementById("inscriptionButton") !== null)) {
        document.getElementById("connectionButton").addEventListener("click", function() {
          document.getElementById('connectionModal').style.display='block';
        })
        document.getElementById("inscriptionButton").addEventListener("click", function() {
          document.getElementById('inscriptionModal').style.display='block';
        })  
      }

      // Fermeture des modals inscription/connection onClick exterieur
      window.onclick = function(event) {
        if (event.target == modalConnection) {

          modalConnection.style.display = "none";
          removeBlurred()
        }
        if (event.target == modalInscription) {

          modalInscription.style.display = "none";
          removeBlurred()
        }
      }

      // Fermeture des modals isncription/connection onclick croix
      document.getElementById("closeConnectionModal").addEventListener("click", function() {
        modalConnection.style.display='none';
        removeBlurred()
      })
      document.getElementById("closeInscriptionModal").addEventListener("click", function() {
        modalInscription.style.display='none';
        removeBlurred()
      })

      document.getElementById("closeConnectionModal2").addEventListener("click", function() {
        modalConnection.style.display='none';
        removeBlurred()
      })
      document.getElementById("closeInscriptionModal2").addEventListener("click", function() {
        modalInscription.style.display='none';
        removeBlurred()
      })
      


      if ((document.getElementById("connectionButton") !== null) && (document.getElementById("inscriptionButton") !== null)) {
        document.getElementById("connectionButton").addEventListener("click", function() {
          addBlur()
        })
        document.getElementById("inscriptionButton").addEventListener("click", function() {
          addBlur()
        })
      }


      function removeBlurred() {
        document.getElementById('newGame').classList.remove("is-blurred");
        document.getElementById('ratioDiv').classList.remove("is-blurred");
        document.getElementById('footer').classList.remove("is-blurred");
        document.getElementById('header').classList.remove("is-blurred");
        document.getElementById('classementDiv').classList.remove("is-blurred");
        document.getElementById('connectionContainer').classList.remove("is-blurred");
        document.getElementById('jaugeContainerMaster').classList.remove("is-blurred");
      }
      function addBlur() {
        document.getElementById('newGame').classList.add("is-blurred");
        document.getElementById('ratioDiv').classList.add("is-blurred");
        document.getElementById('footer').classList.add("is-blurred");
        document.getElementById('header').classList.add("is-blurred");
        document.getElementById('classementDiv').classList.add("is-blurred");
        document.getElementById('connectionContainer').classList.add("is-blurred");
        document.getElementById('jaugeContainerMaster').classList.add("is-blurred");
      }













      // Activation Crédits Brut mode invité (hors partie)
      // ******************************** *
      if (isConnected == true) {
        console.log('isConnected: ' + isConnected);
        //
        document.getElementById("creditsConnected").innerHTML = creditsConnected;
        credits = creditsConnected;
      }
      // ******************************** *








      // Le proc pair empeche le proc 21+3 'brelan'? (Sinon je check d'abors pour le 21+3, toujours supérieur??)
      // "Pair" prend en compte les 2 premieres cards Joueur (les autres osef)
      function checkPairResult() {

        let pairBet = "Lost";
        let gainPairBet = 0;

        if ((cartesJoueurSortiesPartie[0].cardName == cartesJoueurSortiesPartie[1].cardName) && (cartesJoueurSortiesPartie[0].cardColor != cartesJoueurSortiesPartie[1].cardColor) && (cartesJoueurSortiesPartie[0].cardFamily != cartesJoueurSortiesPartie[1].cardFamily)) {
          pairBet = "mixedPair";
        }
        else if ((cartesJoueurSortiesPartie[0].cardName == cartesJoueurSortiesPartie[1].cardName) && (cartesJoueurSortiesPartie[0].cardColor == cartesJoueurSortiesPartie[1].cardColor) && (cartesJoueurSortiesPartie[0].cardFamily != cartesJoueurSortiesPartie[1].cardFamily)) {
          pairBet = "coloredPair";
        }
        else if ((cartesJoueurSortiesPartie[0].cardName == cartesJoueurSortiesPartie[1].cardName) && (cartesJoueurSortiesPartie[0].cardColor == cartesJoueurSortiesPartie[1].cardColor) && (cartesJoueurSortiesPartie[0].cardFamily == cartesJoueurSortiesPartie[1].cardFamily)) {
          pairBet = "perfectPair";
        }
        else {
          pairBet = "Lost";
        };


        switch (pairBet) {

          case "Lost":
            gainPairBet = 0;
            break;

          case "mixedPair":
            gainPairBet = misePairLocked * 6;
            break;

          case "coloredPair": 
            gainPairBet = misePairLocked * 12;
            break;

          case "perfectPair": 
            gainPairBet = misePairLocked * 25;
          break;
        }

        
        setTimeout(function() {
          // Autre que perdu, proc que si miseBet présente:
          if ((pairBet != "Lost") && (misePairLocked > 0)) {
            var pairBetText;
            if(pairBet == "mixedPair") {pairBetText = "Mixed Pair"} else if(pairBet == "coloredPair") {pairBetText = "Colored Pair";} else if(pairBet == "perfectPair") {pairBetText = "Perfect Pair";}
            document.getElementById("misePairLocked").innerHTML = "<span style='font-size:1.7rem; font-weight:bold;'>&#10003;</span> " + pairBetText;
            document.getElementById("misePairLocked").classList.add("misePairProcTextAnim");  

            // Surbrillance des 2 cards Joueur: (adapter l'anim au degres de rareté, effet gold en plus?)
            var handJoueur = document.getElementById("joueur").childNodes;
            for (var i=0; i < 2; i++) {
              // if (handJoueur[i].nodeName.toLowerCase() == 'img') {
                handJoueur[i].classList.add("surbrillanceCardsPair");
                if (toggleCardSimplist) {
                  handJoueur[i].style.border = "4px solid rgba(0, 255, 234, 0.7)";
                  
                }
              // }
            }
  
          }
          // Perdu avec miseBet présente:
          else if ((pairBet == "Lost") && (misePairLocked > 0)) {
            document.getElementById("misePairLocked").innerHTML = "<span style='font-size:1.7rem; font-weight:bold;'>&#10008;</span> Lost";
            document.getElementById("misePairLocked").classList.add("misePairProcTextAnim"); 
            document.getElementById("misePairLocked").classList.add("styleLost"); 
            // Si lost, color orange (DM/LM à mettre)
            document.getElementById("misePairLocked").style.color = "rgba(239, 59, 46, 0.75)";
          }  
          // Proc None :/
          else if ((misePairLocked == 0) && (pairBet != "Lost")) {
            document.getElementById("misePairLockedNbrNone").innerHTML = "None &nbsp;<span style='font-size:1.3rem; color:rgba(0, 255, 234, 0.8);'>:(</span>";
          
            // Surbrillance grey des 2 cards Joueur: 
            // var handJoueur = document.getElementById("joueur").childNodes;
            // for (var i=0; i < 2; i++) {
            //   if (handJoueur[i].nodeName.toLowerCase() == 'img') {
            //     handJoueur[i].classList.add("surbrillanceCardsProcNone");
            //   }
            // }
            
          }
        }, 1000)      

        return gainPairBet;
      }



      function check213Result() {

        let bet213 = "Lost";
        let gain213Bet = 0;

        var diff0 = 0;
        var diff1 = 0;
        var diff2 = 0;

        // Si premiere carte Unique AS
        if ((cartesSortiesPartie[0].cardOrdre == 14) && (cartesSortiesPartie[1].cardOrdre != 14) && (cartesSortiesPartie[2].cardOrdre != 14)) {
          diff0 = -13
        }
        // Si deuxieme carte Unique AS
        if ((cartesSortiesPartie[1].cardOrdre == 14) && (cartesSortiesPartie[0].cardOrdre != 14) && (cartesSortiesPartie[2].cardOrdre != 14)) {
          diff1 = -13;
        }
        // Si troisieme carte Unique AS
        if ((cartesSortiesPartie[2].cardOrdre == 14) && (cartesSortiesPartie[0].cardOrdre != 14) && (cartesSortiesPartie[1].cardOrdre != 14)) {
          diff2 = -13;
        }


        // LES AS s'adaptent
        if (((Math.abs(cartesSortiesPartie[0].cardOrdre - cartesSortiesPartie[1].cardOrdre) == 1) &&
        (((Math.abs(cartesSortiesPartie[0].cardOrdre - cartesSortiesPartie[2].cardOrdre) == 1) && (Math.abs(cartesSortiesPartie[1].cardOrdre - cartesSortiesPartie[2].cardOrdre) != 1)) ||
        ((Math.abs(cartesSortiesPartie[1].cardOrdre - cartesSortiesPartie[2].cardOrdre) == 1) && (Math.abs(cartesSortiesPartie[0].cardOrdre - cartesSortiesPartie[2].cardOrdre) != 1))))  
        ||  
        (((Math.abs((cartesSortiesPartie[0].cardOrdre + diff0) - (cartesSortiesPartie[1].cardOrdre + diff1)) == 1) &&
        (((Math.abs((cartesSortiesPartie[0].cardOrdre + diff0) - (cartesSortiesPartie[2].cardOrdre + diff2) == 1) && (Math.abs((cartesSortiesPartie[1].cardOrdre + diff1) - (cartesSortiesPartie[2].cardOrdre + diff2) != 1)) ||
        ((Math.abs((cartesSortiesPartie[1].cardOrdre + diff1) - (cartesSortiesPartie[2].cardOrdre + diff2) == 1) && (Math.abs((cartesSortiesPartie[0].cardOrdre + diff0) - (cartesSortiesPartie[2].cardOrdre + diff2) != 1))))
        ))))))  {
            // check pour vérifier qu'il y ait pas de paire 
            if ((cartesSortiesPartie[0].cardOrdre != cartesSortiesPartie[1].cardOrdre) && (cartesSortiesPartie[0].cardOrdre != cartesSortiesPartie[2].cardOrdre) && (cartesSortiesPartie[1].cardOrdre != cartesSortiesPartie[2].cardOrdre)) {
              if ((cartesSortiesPartie[0].cardFamily == cartesSortiesPartie[1].cardFamily) && (cartesSortiesPartie[1].cardFamily == cartesSortiesPartie[2].cardFamily)) {
                bet213 = "Straight Flush"; // 3 cartes de suite de la même FAMILLE
              }
              else {
                bet213 = "Straight"; // 3 cartes de suite
              }
            }
        }
        else if (((Math.abs(cartesSortiesPartie[1].cardOrdre - cartesSortiesPartie[2].cardOrdre) == 1) &&
        (((Math.abs(cartesSortiesPartie[0].cardOrdre - cartesSortiesPartie[1].cardOrdre) == 1) && (Math.abs(cartesSortiesPartie[0].cardOrdre - cartesSortiesPartie[2].cardOrdre) != 1)) ||
        ((Math.abs(cartesSortiesPartie[0].cardOrdre - cartesSortiesPartie[2].cardOrdre) == 1) && (Math.abs(cartesSortiesPartie[0].cardOrdre - cartesSortiesPartie[1].cardOrdre) != 1))))  
        ||  
        (((Math.abs((cartesSortiesPartie[1].cardOrdre + diff1) - (cartesSortiesPartie[2].cardOrdre + diff2)) == 1) &&
        (((Math.abs((cartesSortiesPartie[0].cardOrdre + diff0) - (cartesSortiesPartie[1].cardOrdre + diff1) == 1) && (Math.abs((cartesSortiesPartie[0].cardOrdre + diff0) - (cartesSortiesPartie[2].cardOrdre + diff2) != 1)) ||
        ((Math.abs((cartesSortiesPartie[0].cardOrdre + diff0) - (cartesSortiesPartie[2].cardOrdre + diff2) == 1) && (Math.abs((cartesSortiesPartie[0].cardOrdre + diff0) - (cartesSortiesPartie[1].cardOrdre + diff1) != 1))))
        ))))))  {
            // check pour vérifier qu'il y ait pas de paire 
            if ((cartesSortiesPartie[0].cardOrdre != cartesSortiesPartie[1].cardOrdre) && (cartesSortiesPartie[0].cardOrdre != cartesSortiesPartie[2].cardOrdre) && (cartesSortiesPartie[1].cardOrdre != cartesSortiesPartie[2].cardOrdre)) {
              if ((cartesSortiesPartie[0].cardFamily == cartesSortiesPartie[1].cardFamily) && (cartesSortiesPartie[1].cardFamily == cartesSortiesPartie[2].cardFamily)) {
                bet213 = "Straight Flush"; // 3 cartes de suite de la même FAMILLE
              }
              else {
                bet213 = "Straight"; // 3 cartes de suite
              }
            }
        }
        else if (((Math.abs(cartesSortiesPartie[0].cardOrdre - cartesSortiesPartie[2].cardOrdre) == 1) &&
        (((Math.abs(cartesSortiesPartie[0].cardOrdre - cartesSortiesPartie[1].cardOrdre) == 1) && (Math.abs(cartesSortiesPartie[1].cardOrdre - cartesSortiesPartie[2].cardOrdre) != 1)) ||
        ((Math.abs(cartesSortiesPartie[1].cardOrdre - cartesSortiesPartie[2].cardOrdre) == 1) && (Math.abs(cartesSortiesPartie[0].cardOrdre - cartesSortiesPartie[1].cardOrdre) != 1))))
        ||  
        (((Math.abs((cartesSortiesPartie[0].cardOrdre + diff0) - (cartesSortiesPartie[2].cardOrdre + diff2)) == 1) &&
        (((Math.abs((cartesSortiesPartie[0].cardOrdre + diff0) - (cartesSortiesPartie[1].cardOrdre + diff1) == 1) && (Math.abs((cartesSortiesPartie[1].cardOrdre + diff1) - (cartesSortiesPartie[2].cardOrdre + diff2) != 1)) ||
        ((Math.abs((cartesSortiesPartie[1].cardOrdre + diff1) - (cartesSortiesPartie[2].cardOrdre + diff2) == 1) && (Math.abs((cartesSortiesPartie[0].cardOrdre + diff0) - (cartesSortiesPartie[1].cardOrdre + diff1) != 1))))
        ))))))  {

            // check pour vérifier qu'il y ait pas de paire 
            if ((cartesSortiesPartie[0].cardOrdre != cartesSortiesPartie[1].cardOrdre) && (cartesSortiesPartie[0].cardOrdre != cartesSortiesPartie[2].cardOrdre) && (cartesSortiesPartie[1].cardOrdre != cartesSortiesPartie[2].cardOrdre)) {
              if ((cartesSortiesPartie[0].cardFamily == cartesSortiesPartie[1].cardFamily) && (cartesSortiesPartie[1].cardFamily == cartesSortiesPartie[2].cardFamily)) {
                bet213 = "Straight Flush"; // 3 cartes de suite de la même FAMILLE
              }
              else {
                bet213 = "Straight"; // 3 cartes de suite
              }
            }
        }

        
        else {
          if (((cartesSortiesPartie[0].cardFamily == cartesSortiesPartie[1].cardFamily) && (cartesSortiesPartie[0].cardFamily == cartesSortiesPartie[2].cardFamily)) && ((cartesSortiesPartie[0].cardName == cartesSortiesPartie[1].cardName) && (cartesSortiesPartie[0].cardName == cartesSortiesPartie[2].cardName))) {
            bet213 = "Suited Trips"; // 3 cartes de la meme FAMILLE et meme NOMS
          }
          else {
            // Attention, marche que si 3+ decks !
            if ((cartesSortiesPartie[0].cardName == cartesSortiesPartie[1].cardName) && (cartesSortiesPartie[0].cardName == cartesSortiesPartie[2].cardName)) {
              bet213 = "Three of a kind"; // Brelan (3 cartes memes NOMS)
            }
            else {
              if ((cartesSortiesPartie[0].cardFamily == cartesSortiesPartie[1].cardFamily) && ( cartesSortiesPartie[0].cardFamily == cartesSortiesPartie[2].cardFamily)) {
                bet213 = "Flush" // 3 cartes meme FAMILLE
              }
              else {
                bet213 = "Lost"; 
              }
            }
          }
        }




        switch (bet213) {

          case "Lost":
            gain213Bet = 0;
            break;

          case "Flush":
            gain213Bet = mise213Locked * 5;
            break;

          case "Straight": 
            gain213Bet = mise213Locked * 10;
            break;

          case "Three of a kind": 
            gain213Bet = mise213Locked * 30;
            break;

          case "Straight Flush": 
            gain213Bet = mise213Locked * 40;
            break;

          case "Suited Trips": 
            gain213Bet = mise213Locked * 100;
            break;

        }

        setTimeout( function() {
          // Autre que perdu, proc que si miseBet présente:
          if ((bet213 != "Lost") && (mise213Locked > 0)) {
              document.getElementById("mise213Locked").innerHTML = "<span style='font-size:1.7rem; font-weight:bold;'>&#10003;</span> " + bet213;
              document.getElementById("mise213Locked").classList.add("mise213ProcTextAnim");   

              // Sinon mettre un delai avnt de faire les anim Purple

              if ((gainPairBet != 0) && (misePairLocked > 0)) {
                // // Cas ou le ProcPair est deja lancé sur les 2 cards Joueur (bleu), on ajoute juste la card Croupier purple
                var handCroupier = document.getElementById("croupier").childNodes;
                for (var i=0; i < 1; i++) {
                  // if (handCroupier[i].nodeName.toLowerCase() == 'img') {
                    handCroupier[i].classList.add("surbrillanceCards213");
                    if (toggleCardSimplist) {
                      handCroupier[i].style.border = "4px solid rgba(255, 55, 250, 0.9)";
                    }
                  // }
                }
              }
              else {
                // Surbrillance des 2 cards Joueur et card Croupier: (adapter l'anim au degres de rareté, effet gold en plus?)
                var handJoueur = document.getElementById("joueur").childNodes;
                for (var i=0; i < 2; i++) {
                  // if (handJoueur[i].nodeName.toLowerCase() == 'img') {
                    handJoueur[i].classList.add("surbrillanceCards213");
                    if (toggleCardSimplist) {
                      handJoueur[i].style.border = "4px solid rgba(255, 55, 250, 0.9)";
                    }
                  // }
                }
                var handCroupier = document.getElementById("croupier").childNodes;
                for (var i=0; i < 1; i++) {
                  // if (handCroupier[i].nodeName.toLowerCase() == 'img') {
                    handCroupier[i].classList.add("surbrillanceCards213");
                    if (toggleCardSimplist) {
                      handCroupier[i].style.border = "4px solid rgba(255, 55, 250, 0.9)";
                    }
                  }
                // }

              }
          }
          // Perdu avec miseBet présente:
          else if ((bet213 == "Lost") && (mise213Locked > 0)) {
            document.getElementById("mise213Locked").innerHTML = "<span style='font-size:1.7rem; font-weight:bold;'>&#10008;</span> Lost";
              document.getElementById("mise213Locked").classList.add("mise213ProcTextAnim");  
              document.getElementById("mise213Locked").classList.add("styleLost"); 
              // Si lost, color orange (DM/LM à mettre)
              document.getElementById("mise213Locked").style.color = "rgba(239, 59, 46, 0.75)";
          }
          // Proc None :/
          else if ((mise213Locked == 0) && (bet213 != "Lost")) {
            document.getElementById("mise213LockedNbrNone").innerHTML = "None &nbsp;<span style='font-size:1.3rem; color:rgba(255, 55, 250, 1);'>:(</span>";
          
            // Surbrillance grey des cards (pas bo)
            // if ((gainPairBet != 0) && (misePairLocked > 0)) {
            //     // Cas ou le ProcPair est deja lancé sur les 2 cards Joueur (bleu), on ajoute juste la card Croupier grey
            //     var handCroupier = document.getElementById("croupier").childNodes;
            //     for (var i=0; i < 1; i++) {
            //       if (handCroupier[i].nodeName.toLowerCase() == 'img') {
            //         handCroupier[i].classList.add("surbrillanceCardsProcNone");
            //       }
            //     }          
            // }
            // else {
            //   // SurbrillanceGrey des 2 cards Joueur et card Croupier:
            //   var handJoueur = document.getElementById("joueur").childNodes;
            //   for (var i=0; i < 2; i++) {
            //     if (handJoueur[i].nodeName.toLowerCase() == 'img') {
            //       handJoueur[i].classList.add("surbrillanceCardsProcNone");
            //     }
            //   }
            //   var handCroupier = document.getElementById("croupier").childNodes;
            //   for (var i=0; i < 1; i++) {
            //     if (handCroupier[i].nodeName.toLowerCase() == 'img') {
            //       handCroupier[i].classList.add("surbrillanceCardsProcNone");
            //     }
            //   }          
            // }
          }

            
          // Si les 2 bets actif, position du 21+3
          if ((misePairLocked > 0) && (mise213Locked > 0)) {
            document.getElementById("mise213Locked").style.top = "10px";
          }
        }, 1000)
                
        return gain213Bet;

      }









        // OPacity des token réduite si indisponible
        // Check a chaque click Token, et au moment du load phaseMise
        function checkTokenGrised() {
          if ((credits-miseEnCours-misePairEnCours-mise213EnCours) < 100) {
            document.getElementById("blackToken").style.opacity = "0.3";
          }
          else {
            document.getElementById("blackToken").style.opacity = "1";
          }
          
          if ((credits-miseEnCours-misePairEnCours-mise213EnCours) < 25) {
            document.getElementById("blueToken").style.opacity = "0.3";
          }
          else {
            document.getElementById("blueToken").style.opacity = "1";
          }

          if ((credits-miseEnCours-misePairEnCours-mise213EnCours) < 10) {
            document.getElementById("greenToken").style.opacity = "0.3";
          }
          else {
            document.getElementById("greenToken").style.opacity = "1";
          }

          if ((credits-miseEnCours-misePairEnCours-mise213EnCours) < 5) {
            document.getElementById("redToken").style.opacity = "0.3";
          }
          else {
            document.getElementById("redToken").style.opacity = "1";
          }

          if ((credits-miseEnCours-misePairEnCours-mise213EnCours) < 1) {
            document.getElementById("whiteToken").style.opacity = "0.3";
          }
          else {
            document.getElementById("whiteToken").style.opacity = "1";
          }
        }














        // Juste utile pour choix (pas mise)
        function animAlertOnClickChoix() {
          setTimeout( function() {
            if (document.getElementById('phaseChoixAlert') !== null) {
              // document.getElementById('textChoix').classList.add('phaseChoixAlert2Flash');
              document.getElementById('phaseChoixAlert').classList.add("phaseChoixAlert2");
              document.getElementById('traitUnderlineInverseChoix').classList.add("traitUnderlineInverse2FlashChoix");
            }
          // }, 380)
          }, 230)


          setTimeout( function() {
            if (document.getElementById('phaseChoixAlert') !== null) {
              // document.getElementById('textChoix').classList.remove('phaseChoixAlert2Flash');
              document.getElementById('phaseChoixAlert').classList.remove("phaseChoixAlert2");
              document.getElementById('traitUnderlineInverseChoix').classList.remove("traitUnderlineInverse2FlashChoix");

            }
          // }, 731)
          }, 581)

        }








        if (document.getElementById("lvlText") !== null) {
          if (document.getElementById("lvlText").innerText.length < 2 ) {
            document.getElementById("lvlText").style.right = "30px";
            document.getElementById("lvlText").style.bottom = "3px";
            document.getElementById("lvlText").style.fontSize = "0.7em";
          }
        }
        
        



        function handWin(hand) {
          if (hand == "joueur") {
            // var handJoueur = document.getElementById("joueur").childNodes;
            // for (var i=0; i < handJoueur.length; i++) {
            //   handJoueur[i].style.color = "rgba(0, 255, 234, 0.7)";
            // }
            var temp0 = document.querySelectorAll("#joueur .imgSimplNbr");
            temp0.forEach(element => {
              element.style.color = "rgba(0, 255, 234, 0.7)";
            });

            var temp1 = document.querySelectorAll("#joueur .imgSimplSuit");
            temp1.forEach(element => {
              var result = element.src.slice(0, -4) + "WinPair.png";
              element.src = result;
            });

            // var temp2 = document.querySelectorAll("#joueur .crown");
            // temp2.forEach(element => {
            //   element.src = "Images/crownWin.png";
            // });
          }
          else if (hand == "croupier") {
            var handCroupier = document.getElementById("croupier").childNodes;
            for (var i=0; i < handCroupier.length; i++) {
              handCroupier[i].style.color = "rgba(0, 255, 234, 0.7)";
            }

            var temp2 = document.querySelectorAll("#croupier .imgSimplNbr");
            temp2.forEach(element => {
              element.style.color = "rgba(0, 255, 234, 0.7)";
            });

            var temp3 = document.querySelectorAll("#croupier .imgSimplSuit");
            temp3.forEach(element => {
              var result = element.src.slice(0, -4) + "WinPair.png";
              element.src = result;
            });

            // var temp4 = document.querySelectorAll("#croupier .crown");
            // temp4.forEach(element => {
            //   element.src = "Images/crownWin.png";
            // });
          }
        }


        function handPush() {
          var handJoueur = document.getElementById("joueur").childNodes;
          var handCroupier = document.getElementById("croupier").childNodes;

          for (var i=0; i < handCroupier.length; i++) {
            handCroupier[i].style.color = "rgb(164 167 0 / 80%)";
          }
          for (var i=0; i < handJoueur.length; i++) {
            handCroupier[i].style.color = "rgb(164 167 0 / 80%)";
          }

          let temp0 = document.querySelectorAll("#joueur .imgSimplNbr");
          temp0.forEach(element => {
            element.style.color = "rgb(164 167 0 / 80%)";
          });

          let temp1 = document.querySelectorAll("#joueur .imgSimplSuit");
          temp1.forEach(element => {
            element.src = element.src.slice(0, -4) + "Push.png";
          });

          let temp2 = document.querySelectorAll("#croupier .imgSimplNbr");
          temp2.forEach(element => {
            element.style.color = "rgb(164 167 0 / 80%)";
          });

          let temp3 = document.querySelectorAll("#croupier .imgSimplSuit");
          temp3.forEach(element => {
            element.src = element.src.slice(0, -4) + "Push.png";
          });



        }


        function handBust(hand) {
          if (hand == "joueur") {
            var handJoueur = document.getElementById("joueur").childNodes;
            for (var i=0; i < handJoueur.length; i++) {
              handJoueur[i].style.color = "rgb(199 13 11 / 90%)";
            }

            let temp0 = document.querySelectorAll("#joueur .imgSimplNbr");
            temp0.forEach(element => {
              element.style.color = "rgb(199 13 11 / 90%)";
            });
  
            // let temp1 = document.querySelectorAll("#joueur .imgSimplSuit");
            // temp1.forEach(element => {
            //   element.src = element.src.slice(0, -4) + "Bust.png";
            // });
  
          }
          else if (hand == "croupier") {
            var handCroupier = document.getElementById("croupier").childNodes;
            for (var i=0; i < handCroupier.length; i++) {
              handCroupier[i].style.color = "rgb(199 13 11 / 90%)";
            }

            let temp0 = document.querySelectorAll("#croupier .imgSimplNbr");
            temp0.forEach(element => {
              element.style.color = "rgb(199 13 11 / 90%)";
            });
  
            // let temp1 = document.querySelectorAll("#croupier .imgSimplSuit");
            // temp1.forEach(element => {
            //   element.src = element.src.slice(0, -4) + "Bust.png";
            // });
          }

        }


        function handBJ(hand) {
          if (hand == "joueur") {
            var handJoueur = document.getElementById("joueur").childNodes;
            for (var i=0; i < handJoueur.length; i++) {
              handJoueur[i].style.color = "rgba(255, 55, 250, 0.9)";
            }

            let temp0 = document.querySelectorAll("#joueur .imgSimplNbr");
            temp0.forEach(element => {
              element.style.color = "rgba(255, 55, 250, 0.9)";
            });
  
            let temp1 = document.querySelectorAll("#joueur .imgSimplSuit");
            temp1.forEach(element => {
              element.src = element.src.slice(0, -4) + "BJ.png";
            });
  
          }
        }
























        $("#historique").click(function() {


          // Modal Confirmation if ingame (ingame Fait), à ajouter pour Jouer et Guide aussi
          // Cancel
          document.getElementById("cancel").addEventListener("click", function() {
            setTimeout(function() {
              document.getElementById("modalLeave").style.display = "none";
              document.getElementById("modalLeave").style.left = "-50% !important";
            }, 500)

            setTimeout(function() {
              document.getElementById("modalLeave").classList.remove('fadeInDailyReward');
              document.getElementById("modalLeave").classList.add('fadeOutDailyRewards');
            }, 50)    

            document.getElementById('footer').classList.remove("is-blurred");
            document.getElementById('header').classList.remove("is-blurred");
            document.getElementById('container1').classList.remove("is-blurred");
            document.getElementById('connectionContainer').classList.remove("is-blurred");
            document.getElementById('jaugeContainerMaster').classList.remove("is-blurred");    
          })

          if (ingame == true) {
            document.getElementById("modalLeave").style.display = "block";
            document.getElementById("modalLeave").classList.remove('fadeOutDailyRewards');
            document.getElementById("modalLeave").classList.add('fadeInDailyReward');

            document.getElementById('footer').classList.add("is-blurred");
            document.getElementById('header').classList.add("is-blurred");
            document.getElementById('container1').classList.add("is-blurred");
            document.getElementById('connectionContainer').classList.add("is-blurred");
            document.getElementById('jaugeContainerMaster').classList.add("is-blurred");

            // Confirm
            document.getElementById("confirm").addEventListener("click", function() {

              setTimeout(function() {
                document.getElementById("modalLeave").style.display = "none";
                document.getElementById("modalLeave").style.left = "-50% !important";
              }, 500)
  
              setTimeout(function() {
                document.getElementById("modalLeave").classList.remove('fadeInDailyReward');
                document.getElementById("modalLeave").classList.add('fadeOutDailyRewards');
              }, 50)    
  
              document.getElementById('footer').classList.remove("is-blurred");
              document.getElementById('header').classList.remove("is-blurred");
              document.getElementById('container1').classList.remove("is-blurred");
              document.getElementById('connectionContainer').classList.remove("is-blurred");
              document.getElementById('jaugeContainerMaster').classList.remove("is-blurred");

              loadHistoriqueOnglet();
            })
          }
          else {
            loadHistoriqueOnglet();
          }



          function loadHistoriqueOnglet() {


            $("#container1").load("historique.php", function() {
    
              if (document.getElementById("sideBetDiv") !== null) {
                document.getElementById("sideBetDiv").remove();
              }
  
              if (document.getElementById("footer") !== null) {
                document.getElementById("footer").remove();
              }
  
  
              // MODE INVITÉ:
              if (isConnected == false) {
  
                  console.log("Array utilisée par getHistoriqueInvite.html: " + historiqueInviteArray);
  
                  var limit = 50;
  
                  $("#historiqueListContainer").append(
                  "<ul id='listHistorique' style='font-size:2em;'>"
                  );
  
                  for (var i = 0; i < historiqueInviteArray.length; i++) 
                  {
                      console.log("Ligne de l'array utilisée: " + historiqueInviteArray[i]);
  
                      // Transformation bool(TINYINT) double en string pour style
                      if (historiqueInviteArray[i][5] == 1) {
                        var double = " x2";
                      }
                      else {
                        var double = " x1";
                      }
  
                      // Pour le doubleBool: traduire le TINYINT en ' x2' ou ' x1'
                      $('#listHistorique').append(
                          "<li class='historiqueLine'>" +
                            "<div class='traitBlancHistoriqueLineHaut'></div>" +
                              "<p style='margin: 0 5%; display:grid; grid-template-columns: 1.1fr 1fr 1.1fr; grid-template-rows: 1fr; gap: 0px 10px; grid-template-areas: \"resultats gains dates\"; '>" +
                              "<span style='gridArea: resultats;' class='resultatCasHistorique'>" + historiqueInviteArray[i][0] + "</span>" + 
                              "<span style='gridArea: gains;'><span class='gainHistorique'>" + historiqueInviteArray[i][2] + "</span>" + 
                              "<span class='doubleBoolHistorique'>" + double + "</span></span>" + 
                              "<span style='gridArea: dates;' class='dateHistorique'>" + historiqueInviteArray[i][6] + "</span>" +
                              "</p>" +
                            "<div class='traitBlancHistoriqueLineBas'></div>" + 
                          "<br/>" + 
                          "</li>"
                      ); 
                  }
  
                  // Complétion avec lignes vides:
                  for (var i = 0; i < limit-historiqueInviteArray.length; i++) 
                  {
                      $('#listHistorique').append(
                        "<li class='historiqueLine'>" +
                          "<div class='traitBlancHistoriqueLineHaut'></div>" +
                            "<p style='margin: 0 5%; display:grid; grid-template-columns: 1.1fr 1fr 1.1fr; grid-template-rows: 1fr; gap: 0px 10px; grid-template-areas: \"resultats gains dates\"; '>" +
                            "<span style='gridArea: resultats;' >" + "--" + "</span>" + 
                            "<span style='gridArea: gains;'><span >" + "--" + "</span>" + 
                            "<span class='doubleBoolHistorique'>" + " x1" + "</span></span>" + 
                            "<span style='gridArea: dates; position: relative; top: 4px'>" + "--" + "</span>" +
                            "</p>" +
                          "<div class='traitBlancHistoriqueLineBas'></div>" + 
                        "<br/>" + 
                        "</li>"
                      ); 
                  };
  
                  $("#historiqueListContainer").append(
                  "</ul>"
                  );
  
              }
  
  
      
              //*** Style des backgrounds
              for (let i = 0; i < 30; i++) {
      
                let HistoriqueLineContainer = document.getElementsByClassName("historiqueLine")[i];
                let resultatCasHistoriqueLine = document.getElementsByClassName("resultatCasHistorique")[i];
      
                if (resultatCasHistoriqueLine.innerHTML == 'LOSE') {
                  HistoriqueLineContainer.classList.add('historiqueLineLose');
                }
                else if (resultatCasHistoriqueLine.innerHTML == 'WIN') {
                  HistoriqueLineContainer.classList.add('historiqueLineWin');
                }
                else if (resultatCasHistoriqueLine.innerHTML == 'PUSH') {
                  HistoriqueLineContainer.classList.add('historiqueLinePush');
                }
                else if (resultatCasHistoriqueLine.innerHTML == 'BJ') {
                  HistoriqueLineContainer.classList.add('historiqueLineBJ');
                }
                else {
                }
                //***  FIN backgrounds
      
    
      
                //***  Style des resultatCas    
                var historiqueBjBool = false;
      
                if (resultatCasHistoriqueLine.innerHTML == 'LOSE') {
                  resultatCasHistoriqueLine.style.color = "#df2c2c";
                  resultatCasHistoriqueLine.style.border = "1px solid rgba(216, 52, 52, 0.5)";
                  resultatCasHistoriqueLine.classList.add('backgroundLose');
                }
                else if (resultatCasHistoriqueLine.innerHTML == 'WIN') {
                  resultatCasHistoriqueLine.style.color = "rgb(0 255 111)";
                  resultatCasHistoriqueLine.style.border = "1px solid rgba(154,255,121,0.5)";
                  resultatCasHistoriqueLine.classList.add('backgroundWin');
                }
                else if (resultatCasHistoriqueLine.innerHTML == 'PUSH') {
                  resultatCasHistoriqueLine.style.color = "#bebe5e";
                }
                else if (resultatCasHistoriqueLine.innerHTML == 'BJ') {
                  resultatCasHistoriqueLine.style.color = "rgba(255,214,0,0.9)";
                  resultatCasHistoriqueLine.style.letterSpacing = "3px";
                  resultatCasHistoriqueLine.style.fontWeight = "bold";
                  resultatCasHistoriqueLine.style.border = "1px solid rgba(255,186,4,0.7)";
                  resultatCasHistoriqueLine.style.textShadow = "-1px -1px 0 rgba(0,0,0,0.5), 1px -1px 0 rgba(0,0,0,0.5), -1px 1px 0 rgba(0,0,0,0.5), 1px 1px 0 rgba(0,0,0,0.5)";
                  resultatCasHistoriqueLine.classList.add('backgroundBJ');
  
                  historiqueBjBool = true;
                }
                else {
                }
                //***  FIN resultatCas
      
      
                //***  Style des gains    
                let gainsHistoriqueLine = document.getElementsByClassName("gainHistorique")[i];
      
                if (parseInt(gainsHistoriqueLine.innerHTML) < 0) {
                  gainsHistoriqueLine.style.color = "rgb(255 77 77)";
                }
                else if (parseInt(gainsHistoriqueLine.innerHTML) > 0) {
                  if (historiqueBjBool == true) {
                    gainsHistoriqueLine.style.color = "rgba(255,214,0,0.9)";
                    historiqueBjBool = false;
                  }
                  else {
                    gainsHistoriqueLine.style.color = "#14e56f";
                  }
                }
                else if (parseInt(gainsHistoriqueLine.innerHTML) == 0) {
                  gainsHistoriqueLine.style.color = "rgba(228, 228, 183, 0.7)";
                }
                else {
                }
      
                //Style double:
                let doubleBoolHistoriqueLine = document.getElementsByClassName("doubleBoolHistorique")[i];
      
                if (doubleBoolHistoriqueLine.innerHTML == ' x2') {
                  gainsHistoriqueLine.style.border = "2px solid rgba(255,215,0,0.4)";
                  gainsHistoriqueLine.style.padding = "2px 10px";
                  gainsHistoriqueLine.style.borderRadius = "6px";
                  doubleBoolHistoriqueLine.style.display = "inline-block";
                  doubleBoolHistoriqueLine.style.fontSize = "0.8em";
                  doubleBoolHistoriqueLine.style.color = "rgba(255,215,0,0.8)";
  
                  gainsHistoriqueLine.style.position = "relative";
                  gainsHistoriqueLine.style.left = "12px";
                  gainsHistoriqueLine.style.top = "-1px";
                  gainsHistoriqueLine.style.backgroundColor = "rgba(255, 215, 0, 0.05)";
      
                }
                else if (doubleBoolHistoriqueLine.innerHTML == ' x1') {
                  gainsHistoriqueLine.style.border = "0px solid gold";
                }
                else {
                }
                //*** FIN gains
      
      
      
                // Style et Formattage Date  
                let dateHistoriqueElem = document.getElementsByClassName("dateHistorique")[i];
                let dateHtml = dateHistoriqueElem.innerHTML.slice(0, -3);
      
                // fonction qui compare la date avec la date actuelle et qui retourne la différence sous la forme "il y a ... sec/min/h/jour"
                console.log(i, dateHistoriqueElem, dateHtml);
                
                var year = parseInt(dateHtml.charAt(0)+ dateHtml.charAt(1) + dateHtml.charAt(2) + dateHtml.charAt(3));
                console.log("Année: " + year);
      
                var month = parseInt(dateHtml.charAt(5) + dateHtml.charAt(6));
                console.log("Moi: " + month);
      
                var day = parseInt(dateHtml.charAt(8) + dateHtml.charAt(9));
                console.log("Jour: " + day);
      
                var hour = parseInt(dateHtml.charAt(11) + dateHtml.charAt(12));
                console.log("Heures: " + hour);
      
                var minute = parseInt(dateHtml.charAt(14) + dateHtml.charAt(15));
                console.log("Minutes: " + minute);
      
                console.log("Date partie: " + hour + ":" + minute + ", " + day + "/" + month + "/" + year);
      
                
                let todayDate = new Date();
                anneeActuelle = todayDate.getFullYear();
                moiActuel = (todayDate.getMonth() +1);
                jourActuel = todayDate.getDate(); 
                heureActuelle = todayDate.getHours();
                minuteActuelle = todayDate.getMinutes();
      
      
                console.log("Date partie: " + hour + ":" + minute + ", " + day + "/" + month + "/" + year);
                console.log("Date actuelle: " + "" + jourActuel + "/" + moiActuel + "/" + anneeActuelle);
      
                var suffixePluriel;
      
                if (year != anneeActuelle) {
                  if (anneeActuelle-year > 1) { suffixePluriel = "s"; }
                  else { suffixePluriel = ''; }
                  document.getElementsByClassName("dateHistorique")[i].innerHTML = "il y a " + (anneeActuelle - year) + " an" + suffixePluriel;
                }
                else if ((year == anneeActuelle) && (month != moiActuel)) {
                  document.getElementsByClassName("dateHistorique")[i].innerHTML = "il y a " + (moiActuel - month) + " mois";
                }
                else if ((year == anneeActuelle) && (month == moiActuel) && (day != jourActuel)) {
                  if (jourActuel-day > 1) { suffixePluriel = "s"; }
                  else { suffixePluriel = ''; }
      
                  if (jourActuel-day == 1) {
                    document.getElementsByClassName("dateHistorique")[i].innerHTML = "Hier";
                  }
                  else if (jourActuel-day == 2) {
                    document.getElementsByClassName("dateHistorique")[i].innerHTML = "Avant-hier";
                  }
                  else {
                    document.getElementsByClassName("dateHistorique")[i].innerHTML = "il y a " + (jourActuel - day) + " jour" + suffixePluriel;
                  }
                  
                }
                // BUG: affiche il y a 1h au changement d'heure:     Pour différence heure (afficher en heure que si differences Minutes >= 60 !)
                // Et afficher 'à l'instant' de 0 à 1min (prendre en compte les secondes et faire pareil différence>60 ?)
                else if ((year == anneeActuelle) && (month == moiActuel) && (day == jourActuel) && (hour != heureActuelle)) {
                  if (heureActuelle-hour > 1) { suffixePluriel = "s"; }
                  else { suffixePluriel = ''; }
  
                  document.getElementsByClassName("dateHistorique")[i].innerHTML = "il y a " + (heureActuelle - hour) + " heure" + suffixePluriel;
                }
                else if ((year == anneeActuelle) && (month == moiActuel) && (day == jourActuel) && (hour == heureActuelle) && (minute != minuteActuelle)) {
                  if (minuteActuelle-minute > 1) { suffixePluriel = "s"; }
                  else { suffixePluriel = ''; }
                  document.getElementsByClassName("dateHistorique")[i].innerHTML = "il y a " + (minuteActuelle - minute) + " minute" + suffixePluriel;
                }
                else {
                  document.getElementsByClassName("dateHistorique")[i].innerHTML = "à l'instant";
                }
      
              }
              //*** FIN Date
  
  
  
  
              //Style de la liste Users (ADMIN)
              for (let i = 0; i <= 15; i++) {
                if(document.getElementsByClassName("username")[i] !== null){
                
                  let UserLineContainer = document.getElementsByClassName("historiqueLineAdmin")[i];
                  let roleUserLine = document.getElementsByClassName("roleUsers")[i];
  
                  if (roleUserLine.innerHTML == 'admin') {
                    roleUserLine.style.color = 'rgba(251,226,87,1)';
                    UserLineContainer.classList.add('historiqueLineBJ');
                  }
                  else if (roleUserLine.innerHTML == 'joueur') {
                    roleUserLine.style.color = 'rgba(215,235,251,1)';
                    UserLineContainer.classList.add('historiqueLinePush');
                  }
  
                  // Bouton DELETE
                  let deleteUserButtonLine = document.getElementsByClassName("deleteUserButton")[i];
  
                    var usernameLineToPhp = {};
                    usernameLineToPhp.value = document.getElementsByClassName("username")[i].innerText;  
  
                    // 1er click: Opacity+Border WARNING,  2eme click: Comfirmation suppression
                    if (roleUserLine.innerHTML == 'joueur') {
                      deleteUserButtonLine.addEventListener("click", function() {
                        document.getElementsByClassName("deleteUserButton")[i].style.backgroundColor = 'rgba(226,5,61,1)';
                        document.getElementsByClassName("deleteUserButton")[i].style.padding = '7px 3px';
                        document.getElementsByClassName("deleteUserButton")[i].style.bottom = '5px';
                        document.getElementsByClassName("deleteUserButton")[i].style.left = '1px';
                        document.getElementsByClassName("deleteUserButton")[i].style.borderRadius = '4px';
  
                        document.getElementsByClassName("deleteUserButton")[i].classList.add('deleteUserRed');
                        document.getElementsByClassName("historiqueLineAdmin")[i].style.border = '5px solid rgba(226,5,61,0.8)';
                        document.getElementsByClassName("historiqueLineAdmin")[i].style.borderRadius = '12px';
  
                        let deleteUserButtonLine1 = document.getElementsByClassName("deleteUserButton")[i];
  
  
                        deleteUserButtonLine1.addEventListener("click", function() {
                          $.ajax({
                            url: "deleteUser.php",
                            method: "post",
                            data: usernameLineToPhp,
                            success: function() {
                              console.log("Ajax delete user success: " + usernameLineToPhp);
                              location.reload();
                            }
                          })
                        });
  
                      });
                    }
                }
              }
              // FIN
  
              // Onclick Button addUser (ADMIN)
              document.getElementById('addUserButton').addEventListener("click", function() {
                alert('Fonctionalité à venir...');
              })
            
            });
          }

          
      });




      $("#guide").click(function() {

        $("#container1").load("guide.php");
        
      });

      // $('#jouer').click(function() {

      //   $('#container1').load("indexContainer.php");

      //   setTimeout(function() {
      //     newGameListener();
      //   }, 1500)

      // });




      function retourArriereButtonListener() {
        document.getElementById("retourArriereButton").addEventListener("click", function() {
          // fonction de rafraichissement de la mise en cours (Si il y a matière)
          if (toggleSideBet == "normal") {
            if (miseEnCours != 0) {
              miseEnCours = miseEnCours - logTokenValues[0];
              if (isConnected == true) {
                document.getElementById("miseEnCours").classList.add("fadeOutMiseEnCourReverse");
                setTimeout(function() {
                  document.getElementById("miseEnCours").classList.remove("fadeOutMiseEnCourReverse");
                  document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
                  document.getElementById("miseEnCours").classList.add("fadeInMiseEnCourReverse");
                }, 150)
                setTimeout(function() {
                  document.getElementById("miseEnCours").classList.remove("fadeInMiseEnCourReverse");
                }, 300)
              }
              else {
                document.getElementById("miseEnCours").classList.add("fadeOutMiseEnCourReverse");
                setTimeout(function() {
                  document.getElementById("miseEnCours").classList.remove("fadeOutMiseEnCourReverse");    
                  document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
                  document.getElementById("miseEnCours").classList.add("fadeOutMiseEnCourReverse");
                }, 150)
                setTimeout(function() {
                  document.getElementById("miseEnCours").classList.remove("fadeInMiseEnCourReverse");
                }, 300)
              }

              // Enlever le sou si mise la mise passe à 0 apres calcul retourArriere
              if (miseEnCours == 0) {
                // if (isConnected == true) {
                  document.getElementById("miseEnCours").classList.add("fadeOutMiseEnCourReverse");
                  setTimeout(function() {
                    document.getElementById("miseEnCours").classList.remove("fadeOutMiseEnCourReverse");
                    document.getElementById("miseEnCours").innerHTML = miseEnCours;
                    document.getElementById("miseEnCours").classList.add("fadeInMiseEnCourReverse");
                  }, 150)
                  setTimeout(function() {
                    document.getElementById("miseEnCours").classList.remove("fadeInMiseEnCourReverse")
                  }, 300);
                // }
                // else {
                //   document.getElementById("miseEnCours").innerHTML = miseEnCours;
                // }  
              }

              // fonction qui remove le premier var du tableau
              logTokenValues.shift();
              refreshEraseOpacity(toggleSideBet);

              // Rafraichit l'état style du bouton (par exemple si denouveau = 0)
              miseBoutonStyle();
            } 
          }

          else if (toggleSideBet == "pair") {
            if (misePairEnCours != 0) {
              misePairEnCours = misePairEnCours - logTokenValuesPair[0];
              if (isConnected == true) {
                document.getElementById("sideBet1Mise").classList.add("fadeOutMiseEnCourReverse");
                setTimeout(function() {
                  document.getElementById("sideBet1Mise").classList.remove("fadeOutMiseEnCourReverse");
                  document.getElementById("sideBet1Mise").innerHTML = "<span>" + misePairEnCours + "</span><img src='Images/souBarre.png' class=\"imageSouSideBets\">";
                  document.getElementById("sideBet1Mise").classList.add("fadeInMiseEnCourReverse");
                }, 150)
                setTimeout(function() {
                  document.getElementById("sideBet1Mise").classList.remove("fadeInMiseEnCourReverse")
                }, 300);
              }
              else {
                document.getElementById("sideBet1Mise").classList.add("fadeOutMiseEnCourReverse");
                setTimeout(function() {
                  document.getElementById("sideBet1Mise").classList.remove("fadeOutMiseEnCourReverse");    
                  document.getElementById("sideBet1Mise").innerHTML = "<span>" + misePairEnCours + "</span><img src='Images/souBlancBarre.png' class=\"imageSouSideBets\">";
                  document.getElementById("sideBet1Mise").classList.add("fadeInMiseEnCourReverse");
                }, 150)
                setTimeout(function() {
                  document.getElementById("sideBet1Mise").classList.remove("fadeInMiseEnCourReverse")
                }, 300);
              }

              // Enlever le sou si mise la mise passe à 0 apres calcul retourArriere
              if (misePairEnCours == 0) {
                // if (isConnected == true) {
                  document.getElementById("sideBet1Mise").classList.add("fadeOutMiseEnCourReverse");
                  setTimeout(function() {
                    document.getElementById("sideBet1Mise").classList.remove("fadeOutMiseEnCourReverse");
                    document.getElementById("sideBet1Mise").innerHTML = misePairEnCours;
                    document.getElementById("sideBet1Mise").classList.add("fadeInMiseEnCourReverse");
                  }, 150)
                  setTimeout(function() {
                    document.getElementById("sideBet1Mise").classList.remove("fadeInMiseEnCourReverse")
                  }, 300);  
                // }
                // else {
                //   document.getElementById("sideBet1Mise").innerHTML = misePairEnCours;
                // }  
              }

            // fonction qui remove le premier var du tableau
            logTokenValuesPair.shift();
            refreshEraseOpacity(toggleSideBet);

            } 
          }

          else if (toggleSideBet == "21+3") {
            if (mise213EnCours != 0) {
              mise213EnCours = mise213EnCours - logTokenValues213[0];
              if (isConnected == true) {
                document.getElementById("sideBet2Mise").classList.add("fadeOutMiseEnCourReverse");
                setTimeout(function() {
                  document.getElementById("sideBet2Mise").classList.remove("fadeOutMiseEnCourReverse");
                  document.getElementById("sideBet2Mise").innerHTML = "<span>" + mise213EnCours + "</span><img src='Images/souBarre.png' class=\"imageSouSideBets\">";
                  document.getElementById("sideBet2Mise").classList.add("fadeInMiseEnCourReverse");
                }, 150)
                setTimeout(function() {
                  document.getElementById("sideBet2Mise").classList.remove("fadeInMiseEnCourReverse")
                }, 300);
              }
              else {
                document.getElementById("sideBet2Mise").classList.add("fadeOutMiseEnCourReverse");
                setTimeout(function() {
                  document.getElementById("sideBet2Mise").classList.remove("fadeOutMiseEnCourReverse");
                  document.getElementById("sideBet2Mise").innerHTML = "<span>" + mise213EnCours + "</span><img src='Images/souBlancBarre.png' class=\"imageSouSideBets\">";
                  document.getElementById("sideBet2Mise").classList.add("fadeInMiseEnCourReverse");
                }, 150)
                setTimeout(function() {
                  document.getElementById("sideBet2Mise").classList.remove("fadeInMiseEnCourReverse")
                }, 300);
              }

              // Enlever le sou si mise la mise passe à 0 apres calcul retourArriere
              if (mise213EnCours == 0) {
                // if (isConnected == true) {
                  document.getElementById("sideBet2Mise").classList.add("fadeOutMiseEnCourReverse");
                  setTimeout(function() {
                    document.getElementById("sideBet2Mise").classList.remove("fadeOutMiseEnCourReverse");  
                    document.getElementById("sideBet2Mise").innerHTML = mise213EnCours;
                    document.getElementById("sideBet2Mise").classList.add("fadeInMiseEnCourReverse");
                  }, 150)
                  setTimeout(function() {
                    document.getElementById("sideBet2Mise").classList.remove("fadeInMiseEnCourReverse")
                  }, 300);
                // }
                // else {
                //   document.getElementById("sideBet2Mise").innerHTML = mise213EnCours;
                // }  
              }

            // fonction qui remove le premier var du tableau
            logTokenValues213.shift();
            refreshEraseOpacity(toggleSideBet);

            } 
          }

          checkTokenGrised();

        });
      }


      function eraseButtonListener() {
        document.getElementById("eraseButton").addEventListener("click", function() {
          // fonction de rafraichissement de la mise en cours (Si il y a matière)
          if (toggleSideBet == "normal") {
            if (miseEnCours != 0) {
              miseEnCours = 0;
              if (isConnected == true) {
                document.getElementById("miseEnCours").innerHTML = miseEnCours;
              }
              else {
                document.getElementById("miseEnCours").innerHTML = miseEnCours;
              }

            // fonction qui reset le tableau
            logTokenValues = [];
            refreshEraseOpacity(toggleSideBet);

            // Rafraichit l'état style du bouton (par exemple si denouveau = 0)
            miseBoutonStyle();
            } 
          }

          else if (toggleSideBet == "pair") {
            if (misePairEnCours != 0) {
              misePairEnCours = 0;
              if (isConnected == true) {
                document.getElementById("sideBet1Mise").innerHTML = misePairEnCours;
              }
              else {
                document.getElementById("sideBet1Mise").innerHTML = misePairEnCours;
              }

            // fonction qui remove le premier var du tableau
            logTokenValuesPair = [];
            refreshEraseOpacity(toggleSideBet);
            } 
          }

          else if (toggleSideBet == "21+3") {
            if (mise213EnCours != 0) {
              mise213EnCours = 0;
              if (isConnected == true) {
                document.getElementById("sideBet2Mise").innerHTML = mise213EnCours;
              }
              else {
                document.getElementById("sideBet2Mise").innerHTML = mise213EnCours;
              }

            // fonction qui remove le premier var du tableau
            logTokenValues213 = [];
            refreshEraseOpacity(toggleSideBet);
            } 
          }

          checkTokenGrised();

        });
      }








      function refreshSideBetsToggle(bet) {

        var sideBet1 = document.getElementById("sideBet1");
        var sideBet2 = document.getElementById("sideBet2");

        var sideBet1Title = document.getElementById("sideBet1Title");
        var sideBet2Title = document.getElementById("sideBet2Title");


        if (bet == "pair") {
          sideBet1.style.borderColor = "rgba(0, 255, 234, 0.8)"; // cian
          sideBet1.style.backgroundColor = "rgba(0, 255, 234, 0.1)"; // cian
          sideBet1.style.boxShadow = "-0px 0px 50px 5px rgba(0, 255, 234, 0.4)";
          if (darkModeBool) {sideBet1.style.borderWidth = "3px";}
          else {sideBet1.style.borderWidth = "4px";}
          sideBet1.style.transform = "translateY(2px)";

          sideBet2.style.borderColor = "var(--borderColor-sideBet2)";
          sideBet2.style.backgroundColor = "var(--bgColor-sideBet2)"; 
          sideBet2.style.boxShadow = "";
          sideBet2.style.borderWidth = "3px 3px 7px 3px";
          sideBet2.style.transform = "translateY(0px)";

          sideBet1Title.style.color = "rgba(0, 255, 234, 0.8)";
          sideBet2Title.style.color = "var(--color-sideBet2Title)";

          // Les opacity dynamique selon toggleBet ne marchent plus a cause de l'anim forwards fadeInMiseEnCours (effet cool)
          if (miseEnCours > 0) {
            document.getElementById("miseEnCours").style.cssText = "opacity: 0.6 !important";
          }
          else {
            document.getElementById("miseEnCours").style.cssText = "opacity: 0.3 !important";
          }
          if (mise213EnCours > 0) {
            document.getElementById("sideBet2Mise").style.cssText = "opacity: 0.6 !important";
          }
          else {
            document.getElementById("sideBet2Mise").style.cssText = "opacity: 0.3 !important";
          }
          document.getElementById("sideBet1Mise").style.cssText = "opacity: 1";


          document.getElementById("footerTitle").innerHTML = " - Side Bet - ";

          document.getElementById("footer").style.borderTop = "4px solid rgba(0, 255, 234, 0.7)";
          document.getElementById("footer").style.boxShadow = "-0px -3px 50px 5px rgba(0, 255, 234, 0.4)";

          document.getElementById("traitLumineuxFooter").style.background = "-webkit-linear-gradient(left, #10111b 0%, rgba(0, 255, 234, 0.8) 50%, #10111b 100%)";

          document.getElementById("whiteToken").src = "Tokens/sideBet1TokenA.png";
          document.getElementById("redToken").src = "Tokens/sideBet1TokenB.png";
          document.getElementById("greenToken").src = "Tokens/sideBet1TokenA.png";
          document.getElementById("blueToken").src = "Tokens/sideBet1TokenB.png";
          document.getElementById("blackToken").src = "Tokens/sideBet1TokenA.png";

          document.getElementById("retourArriereImg").classList.remove("retourArriereSideBet2");
          document.getElementById("retourArriereImg").classList.add("retourArriereSideBet1");

          document.getElementById("eraseImg").classList.remove("eraseSideBet2");
          document.getElementById("eraseImg").classList.add("eraseSideBet1");
        }

        else if (bet == "21+3") {
          sideBet2.style.borderColor = "rgba(255, 55, 250, 0.9)"; // purple
          sideBet2.style.backgroundColor = "rgba(255, 55, 250, 0.15)"; // purple
          sideBet2.style.boxShadow = "-0px 0px 50px 5px rgba(255, 55, 250, 0.5)";
          if (darkModeBool) {sideBet2.style.borderWidth = "3px";}
          else {sideBet2.style.borderWidth = "4px";}
          sideBet2.style.transform = "translateY(2px)";

          sideBet1.style.borderColor = "var(--borderColor-sideBet1)";
          sideBet1.style.backgroundColor = "var(--bgColor-sideBet1)"; 
          sideBet1.style.boxShadow = "";
          sideBet1.style.borderWidth = "3px 3px 7px 3px";
          sideBet1.style.transform = "translateY(0px)";

          sideBet1Title.style.color = "var(--color-sideBet1Title)";
          sideBet2Title.style.color = "rgba(255, 55, 250, 1)";

          // Les opacity dynamique selon toggleBet ne marchent plus a cause de l'anim forwards fadeInMiseEnCours (effet cool)
          if (miseEnCours > 0) {
            document.getElementById("miseEnCours").style.cssText = "opacity: 0.6 !important";
          }
          else {
            document.getElementById("miseEnCours").style.cssText = "opacity: 0.3 !important";
          }
          if (misePairEnCours > 0) {
            document.getElementById("sideBet1Mise").style.cssText = "opacity: 0.6 !important";
          }
          else {
            document.getElementById("sideBet1Mise").style.cssText = "opacity: 0.3 !important";
          }
          document.getElementById("sideBet2Mise").style.cssText = "opacity: 1 !important";


          document.getElementById("footerTitle").innerHTML = " - Side Bet - ";

          document.getElementById("footer").style.borderTop = "4px solid rgba(255, 55, 250, 0.8)";
          document.getElementById("footer").style.boxShadow = "-0px -3px 50px 5px rgba(255, 55, 250, 0.5)";

          document.getElementById("traitLumineuxFooter").style.background = "-webkit-linear-gradient(left, #10111b 0%, rgba(255, 55, 250, 0.8) 50%, #10111b 100%)";

          document.getElementById("whiteToken").src = "Tokens/sideBet2TokenA.png";
          document.getElementById("redToken").src = "Tokens/sideBet2TokenB.png";
          document.getElementById("greenToken").src = "Tokens/sideBet2TokenA.png";
          document.getElementById("blueToken").src = "Tokens/sideBet2TokenB.png";
          document.getElementById("blackToken").src = "Tokens/sideBet2TokenA.png";

          document.getElementById("retourArriereImg").src = "Images/retourArriereWhiteSideBet1_darkMode.png";

          document.getElementById("retourArriereImg").classList.remove("retourArriereSideBet1");
          document.getElementById("retourArriereImg").classList.add("retourArriereSideBet2");

          document.getElementById("eraseImg").classList.remove("eraseSideBet1");
          document.getElementById("eraseImg").classList.add("eraseSideBet2");
        }

        else if (bet == "normal") {
          sideBet1.style.borderColor = "var(--borderColor-sideBet1)";
          sideBet1.style.backgroundColor = "var(--bgColor-sideBet1)"; 
          sideBet1.style.borderWidth = "3px 3px 7px 3px";
          sideBet1.style.transform = "translateY(0px)";

          sideBet2.style.borderColor = "var(--borderColor-sideBet2)";
          sideBet2.style.backgroundColor = "var(--bgColor-sideBet2)"; 
          sideBet2.style.borderWidth = "3px 3px 7px 3px";
          sideBet2.style.transform = "translateY(0px)";

          sideBet1Title.style.color = "var(--color-sideBet1Title)";
          sideBet2Title.style.color = "var(--color-sideBet2Title)";

          sideBet1.style.boxShadow = "";
          sideBet2.style.boxShadow = "";

          // Les opacity dynamique selon toggleBet ne marchent plus a cause de l'anim forwards fadeInMiseEnCours (effet cool)
          if (mise213EnCours > 0) {
            document.getElementById("sideBet2Mise").style.cssText = "opacity: 0.6 !important";
          }
          else {
            document.getElementById("sideBet2Mise").style.cssText = "opacity: 0.3 !important";
          }
          if (misePairEnCours > 0) {
            document.getElementById("sideBet1Mise").style.cssText = "opacity: 0.6 !important";
          }
          else {
            document.getElementById("sideBet1Mise").style.cssText = "opacity: 0.3 !important";
          }
          document.getElementById("miseEnCours").style.cssText = "opacity: 1 !important";


          document.getElementById("footerTitle").innerHTML = " - Mise - ";

          // A adapter au DM state
            document.getElementById("footer").style.borderTop = "4px solid var(--footerBorderTop-Color)";
            document.getElementById("footer").style.boxShadow = "-0px -3px 50px 5px rgba(239, 59, 46, 0.5)";

            document.getElementById("traitLumineuxFooter").style.background = "var(--traitFooterMise-color)";

            if (darkModeBool == true) {
              document.getElementById("whiteToken").src = "Tokens/whiToken_darkMode.png";
              document.getElementById("redToken").src = "Tokens/redToken_darkMode.png";
              document.getElementById("greenToken").src = "Tokens/greToken_darkMode.png";
              document.getElementById("blueToken").src = "Tokens/bluToken_darkMode.png";
              document.getElementById("blackToken").src = "Tokens/blaToken_darkMode.png";  
            }
            else {
              document.getElementById("whiteToken").src = "Tokens/whiToken.png";
              document.getElementById("redToken").src = "Tokens/redToken.png";
              document.getElementById("greenToken").src = "Tokens/greToken.png";
              document.getElementById("blueToken").src = "Tokens/bluToken.png";
              document.getElementById("blackToken").src = "Tokens/blaToken.png";
            }

            document.getElementById("retourArriereImg").src = "Images/retourArriereWhite_darkMode.png";

            document.getElementById("retourArriereImg").classList.remove("retourArriereSideBet1");
            document.getElementById("retourArriereImg").classList.remove("retourArriereSideBet2");

            document.getElementById("eraseImg").classList.remove("eraseSideBet2");
            document.getElementById("eraseImg").classList.remove("eraseSideBet1");  
        }
      }




      var toggleSideBet = "normal";

      function sideBetListeners() {

        document.getElementById("sideBet1").addEventListener("click", function() {
          if (toggleSideBet != "pair") {
            toggleSideBet = "pair";
            refreshSideBetsToggle(toggleSideBet);
            refreshEraseOpacity(toggleSideBet); 
          }
          else {
            toggleSideBet = "normal";
            refreshSideBetsToggle(toggleSideBet); 
            refreshEraseOpacity(toggleSideBet); 
          }
        })

        document.getElementById("sideBet2").addEventListener("click", function() {
          if (toggleSideBet != "21+3") {
            toggleSideBet = "21+3";
            refreshSideBetsToggle(toggleSideBet); 
            refreshEraseOpacity(toggleSideBet); 
          }
          else {
            toggleSideBet = "normal";
            refreshSideBetsToggle(toggleSideBet); 
            refreshEraseOpacity(toggleSideBet); 
          }
        })
      }




      function popSideBets() {
        // Div contenant les sideBets 
        const sideBetDiv = document.createElement("div");
        sideBetDiv.setAttribute("id", "sideBetDiv");


        // 1er sideBet
        const sideBet1 = document.createElement("div");
        sideBet1.setAttribute("id", "sideBet1");

        const sideBet1Title = document.createElement("p");
        sideBet1Title.setAttribute("id", "sideBet1Title");
        sideBet1Title.innerHTML = "Pair";

        const sideBet1Mise = document.createElement("p");
        sideBet1Mise.setAttribute("id", "sideBet1Mise");
        sideBet1Mise.innerHTML = "0";

        sideBet1.appendChild(sideBet1Title);
        sideBet1.appendChild(sideBet1Mise);
        // Fin


        // 2eme sideBet
        const sideBet2 = document.createElement("div");
        sideBet2.setAttribute("id", "sideBet2");

        const sideBet2Title = document.createElement("p");
        sideBet2Title.setAttribute("id", "sideBet2Title");
        sideBet2Title.innerHTML = "21+3";

        const sideBet2Mise = document.createElement("p");
        sideBet2Mise.setAttribute("id", "sideBet2Mise");
        sideBet2Mise.innerHTML = "0";

        sideBet2.appendChild(sideBet2Title);
        sideBet2.appendChild(sideBet2Mise);
        //Fin


        // Ajout des sideBets à la div avant de l'insérer
        sideBetDiv.appendChild(sideBet1);
        sideBetDiv.appendChild(sideBet2);

        // Insertion de l'elem dans footer (+aboslute CSS)
        if (document.getElementById("footer") !== null ) {
          var footerElem = document.getElementById("footer");
          footerElem.insertBefore(sideBetDiv, footerElem.firstChild);  
        }

        sideBetListeners();
      }


      function popPreviousBets() {
        // Pop du bouton "Previous Bet" si 2 mêmes mises de suite
        // if ((PreviousMiseNormale !== 0) && (consecutivBets == true)) {
          if (PreviousMiseNormale !== 0) {
            setTimeout(function() {

              const previousBetsDiv = document.createElement("div");
              previousBetsDiv.setAttribute("id", "previousBetsDiv");
              previousBetsDiv.innerHTML = 
              "<p id='previousBetsTitle'>- Previous Bet -</p><p id='previousBetsLine'><span id='previousMiseNormale'>" + PreviousMiseNormale + "</span>&nbsp; <span id='firstSlash'>/</span> &nbsp;<span id='previousMisePair'>" + PreviousMisePair + "</span>&nbsp;<span id='secondSlash'>|</span>&nbsp;<span id='previousMise213'>" + PreviousMise213 +"</span></p>";
              
              const flechePreviousBets = document.createElement("img");
              flechePreviousBets.setAttribute("id", "flechePreviousBets");

              previousBetsDiv.prepend(flechePreviousBets);
              document.getElementById("sideBetDiv").append(previousBetsDiv); 


              if (PreviousMisePair == 0) {
                document.getElementById("previousMisePair").style.color = "grey";
                document.getElementById("previousMisePair").style.opacity = "0.7";
              }
              if (PreviousMise213 == 0) {
                document.getElementById("previousMise213").style.color = "grey";
                document.getElementById("previousMise213").style.opacity = "0.7";
              }

              document.getElementById("previousBetsDiv").addEventListener("click", function() {

                // Anims miserAlert
                setTimeout( function() {
                  document.getElementById('textMise').classList.add("phaseMiserAlert2Flash");
                  document.getElementById('traitUnderlineInverse').classList.add("traitUnderlineInverse2Flash");
                  document.getElementById('phaseMiserAlert').classList.add("phaseMiserAlert2");
                }, 200)
                // Fin anims

                miseEnCours = PreviousMiseNormale;
                misePairEnCours = PreviousMisePair;
                mise213EnCours = PreviousMise213;
                document.getElementById("flechePreviousBets").classList.add("flechePreviousAnim");
                document.getElementById("previousBetsDiv").classList.add("previousBoutonClick");
                document.getElementById("previousBetsTitle").classList.add("previousBoutonClick");

                setTimeout(function() {
                  miseLock();
                }, 500)
              })
            }, 750)
        }
      }



      function popRetourArriereErase() {

        // Div
        const retourArriereEraseDiv = document.createElement("div");
        retourArriereEraseDiv.setAttribute("id", "retourArriereEraseDiv");

        // Retour Arriere (img dans button)
        const retourArriere = document.createElement("button");
        retourArriere.setAttribute("id", "retourArriereButton")
        const retourArriereImg = document.createElement("img");
        retourArriereImg.setAttribute("src", "Images/retourArriereWhite.png");
        retourArriereImg.setAttribute("id", "retourArriereImg");
        retourArriere.appendChild(retourArriereImg);

        // Erase
        const erase = document.createElement("button");
        erase.setAttribute("id", "eraseButton")
        const eraseImg = document.createElement("img");
        eraseImg.setAttribute("src", "Images/erase.png");
        eraseImg.setAttribute("id", "eraseImg");
        erase.appendChild(eraseImg);
        
        // AppendChild des retourArriere et Erase, et pop de la div
        retourArriereEraseDiv.appendChild(retourArriere);
        retourArriereEraseDiv.appendChild(erase);

        document.getElementById("sideBetDiv").appendChild(retourArriereEraseDiv);

      }







































     




      function newGameListener() {

        // JQUERY JAX : load Partie
        $("#newGame").click(function(){

            document.querySelector("#newGame").disabled = true;

            document.getElementById("newGameLink").classList.add("newGameLinkFadeOut");
            // Disparition du textLink et adaptation du bouton avant les anims
            setTimeout( function() {
              document.getElementById("newGameLink").innerText = "";
            }, 100)
            document.getElementById("newGame").classList.add("animBoutonPartie");

            document.getElementById("ratioDiv").classList.add("indexElemFadeOutOnNewGame");
            document.getElementById("classementDiv").classList.add("indexElemFadeOutOnNewGame");


            setTimeout( function delaiLoadPartie() {

              $("#container1").load("jouerPartie.php");
            
              setTimeout( function lancerPartie() {


                  removed = false;

                  logTokenValues = [];

                  cartesSortiesPartie = [];
                  cartesJoueurSortiesPartie = [];

                  nbrCardsJoueur = 0;
                  nbrCardsCroupier = 0;

                  var winLose = 0;

                  doubleBool = 0;

                  // *Speed State*
                  if ((setTimeOutMultiplierBool == true) && (document.getElementById("speedButtonContainer") !== null)) {
                    // document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                    setTimeOutMultiplier = 0.47;

                    document.getElementById("speedToggleImage").style.opacity = "1";
                    if (darkModeBool == true) {
                      document.getElementById("speedToggleImage").src = 'Images/fastForward_darkMode.png';
                    }
                    else {
                      document.getElementById("speedToggleImage").src = 'Images/fastForwardWhite.png';
                    }
                  }
                  else if (document.getElementById("speedButtonContainer") !== null) {
                    // document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                    document.getElementById("speedToggleImage").style.opacity = "1";
                    
                    setTimeOutMultiplier = 0.65;

                    if (darkModeBool) {
                      document.getElementById("speedToggleImage").src = 'Images/fastForwardGrey.png';
                    }
                    else {
                      document.getElementById("speedToggleImage").src = 'Images/fastForwardGreyLM.png';
                    }
                  }
                  //****

                  
                  // *Mute State*
                  if ((SoundMuteBool == true) && (document.getElementById("soundButtonContainer") !== null )) {
                    
                    document.getElementById("soundToggleImage").style.opacity = "1";

                    // document.getElementById("soundButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                    // document.getElementById("soundToggleImage").style.marginLeft = "5px";
                    audioCardSound.volume = 0;
                    audioCoinWin.volume = 0;
                    audioExplosionBust.volume = 0;
                    audioPush.volume = 0;
                    audioDecompte.volume = 0;
                    audioToken.volume = 0;
                    audioMiser.volume = 0;
                    if (darkModeBool) {
                      document.getElementById("soundToggleImage").src = 'Images/speakerMute.png';
                    }
                    else {
                      document.getElementById("soundToggleImage").src = 'Images/speakerMuteLM.png';
                    }
                  }
                  else if (document.getElementById("soundButtonContainer") !== null ) {
                    
                    document.getElementById("soundToggleImage").style.opacity = "1";
                    
                    // document.getElementById("soundButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                    // document.getElementById("soundToggleImage").style.marginLeft = "3px";
                    audioCardSound.volume = 0.5;  
                    audioCoinWin.volume = 0.4;
                    audioExplosionBust.volume = 0.04;
                    audioPush.volume = 0.4;
                    audioDecompte.volume = 0.02;
                    audioToken.volume = 0.7;
                    audioMiser.volume = 0.3;
                    if (darkModeBool == true) {
                      document.getElementById("soundToggleImage").src = 'Images/speakerMax_darkMode.png';
                    }
                    else {
                      document.getElementById("soundToggleImage").src = 'Images/speakerMax_sourceMax5.png';
                    }
                  }
                  //****




                  // *Dark Mode State*
                  if ((darkModeBool == true) && (document.getElementById("backgroundButtonContainer") !== null)) {
                    
                    document.getElementById('backgroundToggleImage').style.opacity = "1";
                    document.getElementById('backgroundToggleImage').src = "Images/moon_darkMode.png";
                    
                    // document.getElementById("backgroundButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                    let body = document.querySelector('body');
                    body.dataset.theme = "dark";

                    // Fix 1er switch DM/LM need 2 clic 
                    document.getElementById("backgroundButtonContainer").dataset.mode = "light";
                    // Fin


                    cards.forEach(element => {
                      element.cardImageURL = element.cardImageURL.substring(0, 9) + "_darkMode.png";
                    });

                    var imgElemArray = document.querySelectorAll('.imgPartieDM');
                    imgElemArray.forEach(element => {
                      element.src = element.src.substring(0, 37) + "_darkMode.png";
                    });

                    if (document.querySelectorAll('.pokerChips') !== null) {
                      var imgTokens = document.querySelectorAll('.pokerChips');
                      imgTokens.forEach(element => {
                        element.src = element.src.substring(0, 43) + "_darkMode.png";
                      });
                    }

                    if (document.getElementById("backCardCroupier") !== null) {
                      document.getElementById("backCardCroupier").src = "../Images/deck3_darkMode2.png";
                    }
                  }
                  else if (document.getElementById("backgroundButtonContainer") !== null) {

                    document.getElementById('backgroundToggleImage').style.opacity = "1";
                    document.getElementById('backgroundToggleImage').src = "Images/moonGrey.png";


                    // document.getElementById("backgroundButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                    let body = document.querySelector('body');
                    body.dataset.theme = "light";

                    // Fix 1er switch DM/LM need 2 clic 
                    document.getElementById("backgroundButtonContainer").dataset.mode = "dark";
                    // Fin

                    
                    cards.forEach(element => {
                      element.cardImageURL = element.cardImageURL.substring(0, 9) + ".png";
                    });

                    var imgElemArray = document.querySelectorAll('.imgPartieDM');
                    imgElemArray.forEach(element => {
                      element.src = element.src.substring(0, 37) + ".png";
                    });
                    
                    if (document.querySelectorAll('.pokerChips') !== null) {
                      var imgTokens = document.querySelectorAll('.pokerChips');
                      imgTokens.forEach(element => {
                        element.src = element.src.substring(0, 43) + ".png";
                      });
                    }

                    if (document.getElementById("backCardCroupier") !== null) {
                      document.getElementById("backCardCroupier").src = "../Images/deck3.png";
                    }
                  }
                  //****


                  // Activation Crédits Brut mode invité (en partie)
                  // ******************************** *
                  if (isConnected == false) {
                    console.log('isConnected: ' + isConnected);
                    credits = 100;
                    if (document.getElementById("credits") !== null) {
                      document.getElementById("credits").innerHTML = "<i class='fa-solid fa-star'></i> Invité &nbsp;&nbsp;<span id=\"creditsInvite\">" + credits + "</span>" + "&nbsp;<img src='Images/souBlancBarre.png' class=\"imageSouDeco\">";
                      document.getElementById("credits").style.position = "relative";
                      document.getElementById("credits").style.bottom = "10px";
                    }
                    // document.getElementById("traitLumineux").style.visibility = "visible";
                    document.getElementById("jaugeContainer").style.bottom = "-50px";
                    document.getElementById("imgStreak").style.top = "19.5%";
                    document.getElementById("streakNumber").style.top = "20.5%";

                    document.getElementById("connectionContainer").remove();
                  }
                  else {
                    console.log('isConnected: ' + isConnected);
                    if (document.getElementById("creditsConnected") !== null) {
                      document.getElementById("creditsConnected").innerHTML = creditsConnected;
                    }
                  }
                  // ******************************** *
                  if (document.getElementById("compteurDeck") !== null)  {
                    document.getElementById("compteurDeck").innerHTML = compteurDeck;
                  }
                  if (document.getElementById("compteurDeckMax") !== null) {
                    document.getElementById("compteurDeckMax").innerHTML = compteurDeckMax;  
                  }




                  // ******************************** *
                  // BOUTON TOGGLE SON
                  if (document.getElementById("soundButtonContainer") !== null ) {
                    document.getElementById("soundButtonContainer").addEventListener("click", function() {
                      if (SoundMuteBool == true) {
                        SoundMuteBool = false;
                        // document.getElementById("soundButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                        // document.getElementById("soundToggleImage").style.marginLeft = "3px";
                        audioCardSound.volume = 0.5;  
                        audioCoinWin.volume = 0.4;
                        audioExplosionBust.volume = 0.04;
                        audioPush.volume = 0.4;
                        audioDecompte.volume = 0.02;
                        audioToken.volume = 0.7;
                        audioMiser.volume = 0.3;
                        if (darkModeBool == true) {
                          document.getElementById("soundToggleImage").src = 'Images/speakerMax_darkMode.png';
                        }
                        else {
                          document.getElementById("soundToggleImage").src = 'Images/speakerMax_sourceMax5.png';
                        }                    }
                      else {
                        SoundMuteBool = true;
                        // document.getElementById("soundButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                        // document.getElementById("soundToggleImage").style.marginLeft = "5px";
                        audioCardSound.volume = 0;
                        audioCoinWin.volume = 0;
                        audioExplosionBust.volume = 0;
                        audioPush.volume = 0;
                        audioDecompte.volume = 0;
                        audioToken.volume = 0;
                        audioMiser.volume = 0;
                        if (darkModeBool) {
                          document.getElementById("soundToggleImage").src = 'Images/speakerMute.png';
                        }
                        else {
                          document.getElementById("soundToggleImage").src = 'Images/speakerMuteLM.png';
                        }
                      }
                      var setSoundMuteBoolToPhp = {};
                      setSoundMuteBoolToPhp.value = SoundMuteBool;
                      if (isConnected == true) {
                        $.ajax({
                          url: "setToggleMute.php",
                          method: "post",
                          data: setSoundMuteBoolToPhp,
                          success: function(res) {
                            console.log("(JS) AJAX POST bool 'setSoundMuteBoolToPhp' " + res + " vers setToggleMute.php réussi");
                          }
                        });
                      }
                    });
                  }
                  
                  // FIN bouton toggle sons
                  // ******************************** *

                  // ******************************** *
                  // BOUTON TOGGLE SPEED
                  if (document.getElementById("speedButtonContainer") !== null) {
                    document.getElementById("speedButtonContainer").addEventListener("click", function() {
                      if (setTimeOutMultiplierBool == true) {
                        setTimeOutMultiplierBool = false;
                        // document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                        setTimeOutMultiplier = 0.65;
                        if (darkModeBool) {
                          document.getElementById("speedToggleImage").src = 'Images/fastForwardGrey.png';
                        }
                        else {
                          document.getElementById("speedToggleImage").src = 'Images/fastForwardGreyLM.png';
                        }
                      }
                      else {
                        setTimeOutMultiplierBool = true;
                        // document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                        setTimeOutMultiplier = 0.47;

                        if (darkModeBool == true) {
                          document.getElementById("speedToggleImage").src = 'Images/fastForward_darkMode.png';
                        }
                        else {
                          document.getElementById("speedToggleImage").src = 'Images/fastForwardWhite.png';
                        }
                      }
                    
                      // Envoi du State toggle ajax si connecté
                      var setTimeOutMultiplierBoolToPhp = {};
                      setTimeOutMultiplierBoolToPhp.value = setTimeOutMultiplierBool;
                      if (isConnected == true) {
                        $.ajax({
                          url: "setToggleTurbo.php",
                          method: "post",
                          data: setTimeOutMultiplierBoolToPhp,
                          success: function(res) {
                            console.log("(JS) AJAX POST bool 'setTimeOutMultiplierBool' " + res + " vers setToggleTurbo.php réussi");
                          }
                        });
                      }
                    });
                  }
                  // FIN bouton toggle speed
                  // ******************************** 





                  
                  // Toggle Design
                  // ******************************** *
                  if (document.getElementById("backgroundButtonContainer") !== null) {
                    document.getElementById("backgroundButtonContainer").addEventListener("click", function() {
                    
                      console.log("darkModeBool juste AVANT clique sur le bouton: " + darkModeBool);

                      // toggle la backCardCroupier et les img src des li deja present

                      let body = document.querySelector('body');
                      let mode = this.dataset.mode;
                      body.dataset.theme = mode;

                      // Changement du state dark/light
                      if (this.dataset.mode == "dark") {
                        darkModeBool = true;
                        this.dataset.mode = "light";

                        document.querySelector('meta[name="theme-color"]').setAttribute("content", "#11131f");

                        if (isCollapsed == true) {
                          document.getElementById("arrowPng").setAttribute("src", "Images/arrowUpWhitePng_darkMode.png");
                        }
                        else {
                          document.getElementById("arrowPng").setAttribute("src", "Images/arrowDownWhitePng_darkMode.png");
                        }
      

                        if (document.getElementById('soundToggleImage') !== null) {
                          if (SoundMuteBool == true) {
                            document.getElementById('soundToggleImage').src = "../Images/speakerMute.png";
                          }
                          else {
                            document.getElementById('soundToggleImage').src = "../Images/speakerMax_darkMode.png";
                          }
                        }

                        if (document.getElementById('backgroundToggleImage') !== null) {
                          document.getElementById('backgroundToggleImage').src = "../Images/moon_darkMode.png";
                        }

                        if (document.querySelector('#speedToggleImage') !== null) {
                          if (toggleSpeed == true) {
                            document.querySelector('#speedToggleImage').src = "../Images/fastForward_darkMode.png";
                          }
                          else {
                            document.querySelector('#speedToggleImage').src = "../Images/fastForwardGrey.png";
                          }
                        }

                        if (document.querySelector('#deconnexionImg') !== null) {
                          document.querySelector('#deconnexionImg').src = "../Images/deconnexion_darkMode.png";
                        }

                        cards.forEach(element => {
                          element.cardImageURL = element.cardImageURL.substring(0, 9) + "_darkMode.png";
                        });

                        var imgElemArray = document.querySelectorAll('.imgPartieDM');
                        imgElemArray.forEach(element => {
                          element.src = element.src.substring(0, 37) + "_darkMode.png";
                        });

                        if (document.querySelectorAll('.pokerChips') !== null) {
                          var imgTokens = document.querySelectorAll('.pokerChips');
                          imgTokens.forEach(element => {
                            element.src = element.src.substring(0, 43) + "_darkMode.png";
                          });
                        }

                        if (document.getElementById("backCardCroupier") !== null) {
                          document.getElementById("backCardCroupier").src = "../Images/deck3_darkMode2.png";
                        }
                      }
                
                      else {

                        darkModeBool = false;
                        this.dataset.mode = "dark";

                        document.querySelector('meta[name="theme-color"]').setAttribute("content", "#ffffff");

                        if (isCollapsed == true) {
                          document.getElementById("arrowPng").setAttribute("src", "Images/arrowUpWhitePng.png");
                        }
                        else {
                          document.getElementById("arrowPng").setAttribute("src", "Images/arrowDownWhitePng.png");
                        }


                        if (document.getElementById('soundToggleImage') !== null) {
                          if (SoundMuteBool == true) {
                            document.getElementById('soundToggleImage').src = "../Images/speakerMuteLM.png";
                          }
                          else {
                            document.getElementById('soundToggleImage').src = "../Images/speakerMax_sourceMax5.png";
                          }
                        }
        

                        if (document.getElementById('backgroundToggleImage') !== null) {
                          document.getElementById('backgroundToggleImage').src = "../Images/moonGrey.png";
                        }

                        // toggleSpeed initteignable ici
                        if (document.querySelector('#speedToggleImage') !== null) {
                          if (toggleSpeed == true) {
                            document.querySelector('#speedToggleImage').src = "../Images/fastForwardWhite.png";
                          }
                          else {
                            document.querySelector('#speedToggleImage').src = "../Images/fastForwardGreyLM.png";
                          }
                        }


                        if (document.querySelector('#deconnexionImg') !== null) {
                          document.querySelector('#deconnexionImg').src = "../Images/deconnexion.png";
                        }

                        cards.forEach(element => {
                          element.cardImageURL = element.cardImageURL.substring(0, 9) + ".png";
                        });

                        var imgElemArray = document.querySelectorAll('.imgPartieDM');
                        imgElemArray.forEach(element => {
                          element.src = element.src.substring(0, 37) + ".png";
                        });

                        if (document.querySelectorAll('.pokerChips') !== null) {
                          var imgTokens = document.querySelectorAll('.pokerChips');
                          imgTokens.forEach(element => {
                            element.src = element.src.substring(0, 43) + ".png";
                          });
                        }

                        if (document.getElementById("backCardCroupier") !== null) {
                          document.getElementById("backCardCroupier").src = "../Images/deck3.png";
                        }
                      }


                      // Envoi du State toggle ajax si connecté
                      var darkModeBoolToPhp = {};
                      darkModeBoolToPhp.value = darkModeBool;

                      if (isConnected == true) {
                        $.ajax({
                          url: "setToggleDarkMode.php",
                          method: "post",
                          data: darkModeBoolToPhp,
                          success: function(res) {
                            console.log("(JS) AJAX POST bool 'darkModeBoolToPhp' " + res + " vers setToggleDarkMode.php réussi");
                          }
                        });
                      }

                      console.log("darkModeBool APRES clique sur le bouton: " + darkModeBool);

                    });
                  }
                  



                  $.ajax({
                    async: false,
                    url: "Footers/footerMiseModul.html",
                    dataType: "html",
                    success: function(response) {
                      $("#container3").html(response);

                      // TEST vert lors mise
                      document.getElementById("footer").style.boxShadow = "-0px -3px 11vh 5px rgba(239, 59, 46, 0.6)";
                      // document.getElementById("footer").style.boxShadow = "-0px -3px 50px 5px rgba(246, 251, 17, 0.5)";
                      document.getElementById("header").style.boxShadow = "";


                      checkTokenGrised();

                      document.getElementById("header").classList.add('headerOnPartie');

                      document.getElementById("footer").classList.add('footerOnPartie');

                      document.getElementById("footer").style.boxShadow = "-0px -3px 110 5px rgba(239, 59, 46, 0.6)";


                      popSideBets();
                      // Ici logiquement pas besoin du previousMise:
                      // popPreviousBets();
                      popRetourArriereErase();

                      if ((darkModeBool == true) && (document.querySelectorAll('.pokerChips') !== null)) {
                          var imgTokens = document.querySelectorAll('.pokerChips');
                          imgTokens.forEach(element => {
                            element.src = element.src.substring(0, 43) + "_darkMode.png";
                          });
                      }
                      else if ((darkModeBool == false) && (document.querySelectorAll('.pokerChips') !== null)) {
                          var imgTokens = document.querySelectorAll('.pokerChips');
                          imgTokens.forEach(element => {
                            element.src = element.src.substring(0, 43) + ".png";
                          });
                      }

                      ChoixActif = false;

                      if (isConnected == true && darkModeBool == true) {
                        if (document.querySelectorAll('.pokerChips') !== null) {
                          var imgTokens = document.querySelectorAll('.pokerChips');
                          imgTokens.forEach(element => {
                            element.src = element.src.substring(0, 43) + "_darkMode.png";
                          });
                        }
                      }

                      // Boutons RetourArriere et erase
                      retourArriereButtonListener()
                      eraseButtonListener();

        

                      //*** Zone FooterBorder Clignotement (marrant pourquoi ça marche pas? à supprimer de toute facon)     
                      document.querySelector("#footer").classList.add("miserActif2");  

                      footerShow();
                      phaseMise();
                      initMiseSideBets();
                      document.getElementById("footerTitle").innerHTML = " - Mise -";
                      window.onload = tokensClick();
                    }
                  });
                  miseBoutonStyle();
                  document.getElementById("boutonMiser").addEventListener("click", function() {
                    miseLock();  
                  })

                }, 500)
            }, 790)

          });

        }





        


      newGameListener();


      //***   WIP: Relancer    ***\\
      function relancer() {

        $("#relancer").click(function(){

          asCroupier = false;
          asCroupier2 = false;

          // *** Fadeout
          document.getElementById("separateur").style.boxShadow = "";
          document.getElementById("scoreCroupier").classList.add("fadeOut2");
          document.getElementById("scoreJoueur").classList.add("fadeOut2");
          var handCroupier = document.getElementById("croupier").childNodes;
          for (var i=0; i < handCroupier.length; i++) {
            // if (handCroupier[i].nodeName.toLowerCase() == 'img') {
              handCroupier[i].style.boxShadow = "";
            // }
          }
          var handJoueur = document.getElementById("joueur").childNodes;
          for (var i=0; i < handJoueur.length; i++) {
            // if (handJoueur[i].nodeName.toLowerCase() == 'img') {
              handJoueur[i].style.boxShadow = "";
            // }
          }
          document.getElementById("footerResultatContainer").classList.add("fadeOutFinDePartie");
          document.getElementById("separateur").style.opacity = 0;
          document.getElementById("scoreCroupier").classList.add("fadeOutFinDePartie"); // !important
          document.getElementById("scoreJoueur").classList.add("fadeOutFinDePartie");
          // ***Fin fadeout

          PreviousMiseNormale = miseEnCours;
          PreviousMisePair = misePairEnCours;
          PreviousMise213 = mise213EnCours;

          // Anim stack cards
          if (toggleCardSimplist) {
            var imgElemArray = document.querySelectorAll('.imgSimpl1');
            imgElemArray.forEach(element => {
              element.style.margin = "0 -7.6em 0 0.4em";
              element.style.transform = "rotate(0deg) translateX(-56px)";
              element.style.bottom = "0px";
              // Enlever aussi les border ici?
            });
            setTimeout(function() {
              imgElemArray.forEach(element => {
                element.classList.add('allCardsFadeOutSlide');
              });
            }, 450)
          }
          else {
            var imgElemArray = document.querySelectorAll('.imgPartie');
            imgElemArray.forEach(element => {
              element.style.margin = "0 -7.6em 0 0.4em";
              element.style.transform = "rotate(0deg) translateX(-56px)";
              element.style.bottom = "0px";
            });
            setTimeout(function() {
              imgElemArray.forEach(element => {
                element.classList.add('allCardsFadeOutSlide');
              });
            }, 450)
          }

          document.getElementById("jaugeContainer").style.backgroundColor = "var(--bgColor-jaugeVide)";

          document.getElementById("footer").style.boxShadow = "";
          document.getElementById("header").style.boxShadow = "";

          // Le .remove() marche pas ici, ducoup workaround degueu:  :/
          if (document.getElementById("toggleHandDiv") !== null ) { // cas BJ
            document.getElementById("toggleHandDiv").innerHTML = "";
            document.getElementById("toggleHandDiv").style.border = "0px solid red";
          }

          firstProc = false;

          mise213EnCours = 0;
          misePairEnCours = 0;
          miseEnCours = 0;

          ingame = false;
          WinLose = "";
          gainFront = 0;

          // Evite le spam du reload():
          document.querySelector("#relancer").disabled = true;

          if (document.getElementById("creditsConnected") !== null) {
            document.getElementById("creditsConnected").classList.remove("refreshCreditAnim");
          }

          // Refresh footer/header gradient animation
          document.getElementById("footer").classList.remove("footerOnPartie");
          document.getElementById("footer").classList.remove("footerOnPartie2");
          setTimeout( function() {
            document.getElementById("footer").classList.add("footerOnPartie");
            document.getElementById("footer").classList.add("footerOnPartieRedecale");
          }, 0);
          document.getElementById("header").classList.remove("headerOnPartie");
          document.getElementById("header").classList.remove("headerOnPartie2");
          setTimeout( function() {
            document.getElementById("header").classList.add("headerOnPartie");
            document.getElementById("header").classList.add("headerOnPartieRedecale");
          }, 0);
          // Fin refresh

          toggleSideBet = "normal";
          document.getElementById("traitLumineuxFooter").style.background = "var(--traitFooterMise-color)";

          var winLose = 0;

          doubleBool = 0;

          // TimeOut calé sur l'anim des fadeOut des elements
          setTimeout(function() {
            $.ajax({
              async: false,
              url: "jouerPartie.php",
              dataType: "html",
              success: function(response) {
                $("#container1").html(response);

                if (document.getElementById("toggleHandDiv") !== null ) {
                  document.getElementById("toggleHandDiv").remove();
                }

                if (cards.length < 60) {
                  // Ancienne méthode:
                  // melangeDeck(darkModeBool);

                  // Nouvelle méthode: Proc de la fonction mélange() et attribution du return compteurDeck:
                  compteurDeck = melangeDeck(darkModeBool);
                  document.getElementById("compteurDeck").innerHTML = compteurDeck;
                  document.getElementById("compteurDeckMax").innerHTML = compteurDeck;  // marche pas ?           
                }

                cartesSortiesPartie = [];
                cartesJoueurSortiesPartie = [];

                asJoueur = false;
                asCroupier = false;
                nbrCardsJoueur = 0;
                nbrCardsCroupier = 0;
                removed = false;

                //** Récupérer le nouveau Crédits 
                if (isConnected == false) {
                  document.getElementById("credits").innerHTML = "<i class='fa-solid fa-star'></i> Invité &nbsp;&nbsp;<span id=\"creditsInvite\">" + credits + "</span>" + "&nbsp;<img src='Images/souBlancBarre.png' class=\"imageSouDeco\">";
                  document.getElementById("credits").style.position = "relative";
                  document.getElementById("credits").style.bottom = "10px";
                }
                else if (isConnected == true) {
                  document.getElementById("creditsConnected").innerHTML = credits;
                }
                // FIN

                //**** Garder l'état Toggle lors Relance
                // *Mute*
                document.getElementById("soundToggleImage").style.opacity = "1";

                if (SoundMuteBool == true) {
                  if (darkModeBool) {
                    document.getElementById("soundToggleImage").src = 'Images/speakerMute.png';
                  }
                  else {
                    document.getElementById("soundToggleImage").src = 'Images/speakerMuteLM.png';
                  }
                }
                else {
                  // SoundMuteBool = true;
                  if (darkModeBool == true) {
                    document.getElementById("soundToggleImage").src = 'Images/speakerMax_darkMode.png';
                  }
                  else {
                    document.getElementById("soundToggleImage").src = 'Images/speakerMax_sourceMax5.png';
                  }                
                }

                // *Speed*
                document.getElementById("speedToggleImage").style.opacity = "1";

                if (setTimeOutMultiplierBool == true) {
                  if (darkModeBool == true) {
                    document.getElementById("speedToggleImage").src = 'Images/fastForward_darkMode.png';
                  }
                  else {
                    document.getElementById("speedToggleImage").src = 'Images/fastForwardWhite.png';
                  }
                }
                else {
                  if (darkModeBool) {
                    document.getElementById("speedToggleImage").src = 'Images/fastForwardGrey.png';
                  }
                  else {
                    document.getElementById("speedToggleImage").src = 'Images/fastForwardGreyLM.png';
                  }
                }
                //****


                // *DarkMode*
                document.getElementById("backgroundToggleImage").style.opacity = "1";

                if (darkModeBool == true) {
                  document.getElementById("backgroundToggleImage").src = "Images/moon_darkMode.png";
                }
                else {
                  document.getElementById("backgroundToggleImage").src = "Images/moonGrey.png";

                }



                // ****************************** * 
                // BOUTON TOGGLE Mute
                document.getElementById("soundButtonContainer").addEventListener("click", function() {
                  if (SoundMuteBool == true) {
                    SoundMuteBool = false;
                    // document.getElementById("soundButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                    // document.getElementById("soundToggleImage").style.marginLeft = "3px";
                    audioCardSound.volume = 0.5;  
                    audioCoinWin.volume = 0.4;
                    audioExplosionBust.volume = 0.04;
                    audioPush.volume = 0.4;
                    audioDecompte.volume = 0.02;
                    audioToken.volume = 0.7;
                    audioMiser.volume = 0.3;
                    if (darkModeBool == true) {
                      document.getElementById("soundToggleImage").src = 'Images/speakerMax_darkMode.png';
                    }
                    else {
                      document.getElementById("soundToggleImage").src = 'Images/speakerMax_sourceMax5.png';
                    }
                  }
                  else {
                    SoundMuteBool = true;
                    // document.getElementById("soundButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                    // document.getElementById("soundToggleImage").style.marginLeft = "13px";
                    audioCardSound.volume = 0;
                    audioCoinWin.volume = 0;
                    audioExplosionBust.volume = 0;
                    audioPush.volume = 0;
                    audioDecompte.volume = 0;
                    audioToken.volume = 0;
                    audioMiser.volume = 0;
                    //
                    document.getElementById("soundToggleImage").src = 'Images/speakerMute.png';
                  }

                  var setSoundMuteBoolToPhp = {};
                  setSoundMuteBoolToPhp.value = SoundMuteBool;
                  if (isConnected == true) {
                    $.ajax({
                      url: "setToggleMute.php",
                      method: "post",
                      data: setSoundMuteBoolToPhp,
                      success: function(res) {
                        console.log("(JS) AJAX POST bool 'setSoundMuteBoolToPhp' " + res + " vers setToggleMute.php réussi");
                      }
                    });
                  }
                });
                // FIN bouton toggle sons
                // ******************************** *

  
                // ******************************** *
                // BOUTON TOGGLE SPEED
                document.getElementById("speedButtonContainer").addEventListener("click", function() {
                  if (setTimeOutMultiplierBool == true) {
                    setTimeOutMultiplierBool = false;
                    // document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                    setTimeOutMultiplier = 0.65;
                    if (darkModeBool) {
                      document.getElementById("speedToggleImage").src = 'Images/fastForwardGrey.png';
                    }
                    else {
                      document.getElementById("speedToggleImage").src = 'Images/fastForwardGreyLM.png';
                    }
                  }
                  else {
                    setTimeOutMultiplierBool = true;
                    // document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                    setTimeOutMultiplier = 0.47;
                    if (darkModeBool == true) {
                      document.getElementById("speedToggleImage").src = 'Images/fastForward_darkMode.png';
                    }
                    else {
                      document.getElementById("speedToggleImage").src = 'Images/fastForwardWhite.png';
                    }
                  }

                  // Envoi du State toggle ajax si connecté
                  var setTimeOutMultiplierBoolToPhp = {};
                  setTimeOutMultiplierBoolToPhp.value = setTimeOutMultiplierBool;

                  if (isConnected == true) {
                    $.ajax({
                      url: "setToggleTurbo.php",
                      method: "post",
                      data: setTimeOutMultiplierBoolToPhp,
                      success: function(res) {
                        console.log("(JS) AJAX POST bool 'setTimeOutMultiplierBool' " + res + " vers setToggleTurbo.php réussi");
                      }
                    })
                  }
                });

                document.getElementById("backgroundButtonContainer").addEventListener("click", function() {

                  // toggle la backCardCroupier et les img src des li deja present

                  let body = document.querySelector('body');
                  let mode = this.dataset.mode;
                  body.dataset.theme = mode;

                  // Changement du state dark/light
                  if (this.dataset.mode == "dark") {
                    this.dataset.mode = "light";
                    darkModeBool = true;

                    document.querySelector('meta[name="theme-color"]').setAttribute("content", "#11131f");

                    if (isCollapsed == true) {
                      document.getElementById("arrowPng").setAttribute("src", "Images/arrowUpWhitePng_darkMode.png");
                    }
                    else {
                      document.getElementById("arrowPng").setAttribute("src", "Images/arrowDownWhitePng_darkMode.png");
                    }

                    if (document.getElementById('backgroundToggleImage') !== null) {
                      document.getElementById('backgroundToggleImage').src = "../Images/moon_darkMode.png";
                    }

                    document.querySelector('#deconnexionImg').src = "../Images/deconnexion_darkMode.png";

                    cards.forEach(element => {
                      element.cardImageURL = element.cardImageURL.substring(0, 9) + "_darkMode.png";
                    });

                    var imgElemArray = document.querySelectorAll('.imgPartieDM');
                    imgElemArray.forEach(element => {
                      element.src = element.src.substring(0, 37) + "_darkMode.png";
                    });

                    if (document.querySelectorAll('.pokerChips') !== null) {
                      var imgTokens = document.querySelectorAll('.pokerChips');
                      imgTokens.forEach(element => {
                        element.src = element.src.substring(0, 43) + "_darkMode.png";
                      });
                    }

                    if (document.getElementById("backCardCroupier") !== null) {
                      document.getElementById("backCardCroupier").src = "../Images/deck3_darkMode2.png";
                    }
                  }
            
                  else {
                    this.dataset.mode = "dark";
                    darkModeBool = false;
                    console.log("darkModeBool: " + darkModeBool);

                    document.querySelector('meta[name="theme-color"]').setAttribute("content", "#ffffff");

                    if (isCollapsed == true) {
                      document.getElementById("arrowPng").setAttribute("src", "Images/arrowUpWhitePng.png");
                    }
                    else {
                      document.getElementById("arrowPng").setAttribute("src", "Images/arrowDownWhitePng.png");
                    }

                    if (document.getElementById('backgroundToggleImage') !== null) {
                      document.getElementById('backgroundToggleImage').src = "../Images/moonGrey.png";
                    }

                    document.querySelector('#deconnexionImg').src = "../Images/deconnexion.png";

                    cards.forEach(element => {
                      element.cardImageURL = element.cardImageURL.substring(0, 9) + ".png";
                    });

                    var imgElemArray = document.querySelectorAll('.imgPartieDM');
                    imgElemArray.forEach(element => {
                      element.src = element.src.substring(0, 37) + ".png";
                    });

                    if (document.querySelectorAll('.pokerChips') !== null) {
                      var imgTokens = document.querySelectorAll('.pokerChips');
                      imgTokens.forEach(element => {
                        element.src = element.src.substring(0, 43) + ".png";
                      });
                    }

                    if (document.getElementById("backCardCroupier") !== null) {
                      document.getElementById("backCardCroupier").src = "../Images/deck3.png";
                    }
                  }
                  console.log("darkModeBool: " + darkModeBool);


                  // Envoi du State toggle ajax si connecté
                  var darkModeBoolToPhp = {};
                  darkModeBoolToPhp.value = darkModeBool;

                  if (isConnected == true) {
                    $.ajax({
                      url: "setToggleDarkMode.php",
                      method: "post",
                      data: darkModeBoolToPhp,
                      success: function(res) {
                        console.log("(JS) AJAX POST bool 'darkModeBoolToPhp' " + res + " vers setToggleDarkMode.php réussi");
                      }
                    });
                  }
                });


              }
            });
          }, 800);


          scoreTotalJoueur = 0;
          scoreTotalCroupier = 0;





          setTimeout( function lancerPartie() {
              document.getElementById("compteurDeck").innerHTML = compteurDeck;
              document.getElementById("compteurDeckMax").innerHTML = compteurDeckMax;
              $.ajax({
                async: false,
                url: "Footers/footerMiseModul.html",
                dataType: "html",
                success: function(response) {
                  $("#container3").html(response);

                  checkTokenGrised();

                  // TEST vert lors mise
                  document.getElementById("footer").style.boxShadow = "-0px -3px 11vh 5px rgba(239, 59, 46, 0.6)";
                  // document.getElementById("footer").style.boxShadow = "-0px -3px 50px 5px rgba(246, 251, 17, 0.5)";
                  document.getElementById("header").style.boxShadow = "";

                  popSideBets();
                  popPreviousBets();
                  popRetourArriereErase();

                  // *Dark Mode State*
                  if (darkModeBool == true) {

                    // Fix 1er switch DM/LM need 2 clic 
                    document.getElementById("backgroundButtonContainer").dataset.mode = "light";
                    // Fin fix
                    // document.getElementById("backgroundButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                    let body = document.querySelector('body');
                    body.dataset.theme = "dark";
                    // Fin 2.0  

                    if (document.querySelectorAll('.pokerChips') !== null) {
                      var imgTokens = document.querySelectorAll('.pokerChips');
                      imgTokens.forEach(element => {
                        element.src = element.src.substring(0, 43) + "_darkMode.png";
                      });
                    }
                  }
                  else {  
                    
                    // Fix 1er switch DM/LM need 2 clic 
                    document.getElementById("backgroundButtonContainer").dataset.mode = "dark";
                    // Fin fix
                    // document.getElementById("backgroundButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                    let body = document.querySelector('body');
                    body.dataset.theme = "light";
                    // Fin 2.0  



                    if (document.querySelectorAll('.pokerChips') !== null) {
                      var imgTokens = document.querySelectorAll('.pokerChips');
                      imgTokens.forEach(element => {
                        element.src = element.src.substring(0, 43) + ".png";
                      });
                    }
                  }

                  // RESET des tableaus TokenLogs 
                  logTokenValues = [];
                  logTokenValuesPair = [];
                  logTokenValues213 = [];
                  
                  // Boutons RetourArriere et erase
                  retourArriereButtonListener();
                  eraseButtonListener();


                  footerShow();
                  phaseMise();
                  initMiseSideBets();
                  document.getElementById("footerTitle").innerHTML = " - Mise -";
                  window.onload = tokensClick();
                }
              });
              miseBoutonStyle();
              document.getElementById("boutonMiser").addEventListener("click", function() {
                miseLock();  
              })
          }, 800)
        });

      }


    
      function DecrementGain() {
          if (SoundMuteBool == false) {
            audioDecompte.play();
          }

        setTimeout( function() {
            if (miseLocked > 0) {
            miseLocked = miseLocked - 1;
            if ( isConnected == true) {
              document.getElementById("miseResultatTxt").innerHTML = miseLocked;
            }
            else {
              document.getElementById("miseResultatTxt").innerHTML = miseLocked;
            }            
            document.getElementById("miseResultatTxt").classList.add("addColorToResultatRed");
            DecrementGain();
            }
        }, (210/miseLocked) * setTimeOutMultiplier);
      } 

      function IncrementGain(miseLockedMultiplied) {
          if (SoundMuteBool == false) {
            audioDecompte.play();
          }
          misesResultatDiff = miseLockedMultiplied - miseLocked;

        setTimeout( function() {
            if (miseLocked < miseLockedMultiplied) {
              miseLocked = miseLocked + 1;
              if ( isConnected == true) {
                document.getElementById("miseResultatTxt").innerHTML = miseLocked;
              }
              else {
                document.getElementById("miseResultatTxt").innerHTML = miseLocked;
              }            
              document.getElementById("miseResultatTxt").classList.add("addColorToResultatBJ");
              IncrementGain(miseLockedMultiplied);
            }
        }, (210/misesResultatDiff) * setTimeOutMultiplier);
      } 
    




      function IncrDecrGainPair(gainPairBet) {

        var resultatPairDiff = Math.abs(gainPairBet - misePairLocked);

        if (gainPairBet > 0) {
          IncrementGainPair(gainPairBet);
        }
        else {
          decrementPairGain();
        }

        function IncrementGainPair(gainPairBet) {
          if (document.getElementById("misePairResultatTxt") !== null) {
            document.getElementById("misePairResultatTxt").style.color = "rgba(0, 255, 234, 1)";
          }
          setTimeout( function() {
            if (misePairLocked < gainPairBet) {
              misePairLocked = misePairLocked + 1;
              if ( isConnected == true) {
                document.getElementById("misePairResultatTxt").innerHTML = misePairLocked;
              }
              else {
                document.getElementById("misePairResultatTxt").innerHTML = misePairLocked;
              }            
              // document.getElementById("miseResultatTxt").classList.add("addColorToResultatBJ");
              IncrementGainPair(gainPairBet);
            }
          }, (210/resultatPairDiff) * setTimeOutMultiplier);
        }

        function decrementPairGain() {
          if (document.getElementById("misePairResultatTxt") !== null) {
            document.getElementById("misePairResultatTxt").style.color = "rgba(239, 59, 46, 1)";
          }
          setTimeout( function() {
            if (misePairLocked > 0) {
              misePairLocked = misePairLocked - 1;
            if ( isConnected == true) {
              document.getElementById("misePairResultatTxt").innerHTML = misePairLocked;
            }
            else {
              document.getElementById("misePairResultatTxt").innerHTML = misePairLocked;
            }            
            // document.getElementById("miseResultatTxt").classList.add("addColorToResultatBJ");
            decrementPairGain();
            }
          }, (210/resultatPairDiff) * setTimeOutMultiplier);
        }
      }





      function IncrDecrGain213(gain213Bet) {

        var resultatPairDiff = Math.abs(gain213Bet - mise213Locked);

        if (gain213Bet > 0) {
          IncrementGain213(gain213Bet);
        }
        else {
          decrement213Gain();
        }

        function IncrementGain213(gain213Bet) {
          if (document.getElementById("mise213ResultatTxt") !== null) {
            document.getElementById("mise213ResultatTxt").style.color = "rgba(255, 55, 250, 1)";
          }
          setTimeout( function() {
            if (mise213Locked < gain213Bet) {
              mise213Locked = mise213Locked + 1;
              if ( isConnected == true) {
                document.getElementById("mise213ResultatTxt").innerHTML = mise213Locked;
              }
              else {
                document.getElementById("mise213ResultatTxt").innerHTML = mise213Locked;
              }            
              // document.getElementById("miseResultatTxt").classList.add("addColorToResultatBJ");
              IncrementGain213(gain213Bet);
            }
          }, (210/resultatPairDiff) * setTimeOutMultiplier);
        }

        function decrement213Gain() {
          if (document.getElementById("mise213ResultatTxt") !== null) {
            document.getElementById("mise213ResultatTxt").style.color = "rgba(239, 59, 46, 1)";
          }
          setTimeout( function() {
            if (mise213Locked > 0) {
              mise213Locked = mise213Locked - 1;
            if ( isConnected == true) {
              document.getElementById("mise213ResultatTxt").innerHTML = mise213Locked;
            }
            else {
              document.getElementById("mise213ResultatTxt").innerHTML = mise213Locked;
            }            
            // document.getElementById("miseResultatTxt").classList.add("addColorToResultatBJ");
            decrement213Gain();
            }
          }, (210/resultatPairDiff) * setTimeOutMultiplier);
        }
      }
      

      
    
  
    

        
        
      












      function miseBoutonStyle() {
        let button = document.querySelector("#boutonMiser");
        if (miseEnCours > 0) {
          document.getElementById("boutonMiser").classList.add("miserActif");
          document.getElementById("boutonMiser").style.opacity = "1";
          document.getElementById("boutonMiser").style.cursor = "pointer";
          button.disabled = false;
        }
        else {
          document.getElementById("boutonMiser").classList.remove("miserActif");
          document.getElementById("boutonMiser").style.opacity = "0.4";
          document.getElementById("boutonMiser").style.cursor = "default";
          button.disabled = true;
        }
      }


      function double() {

        doubleBool = 1;

        // Déplacé en amont car delai sur l'appel
        // // Envoi de la miseLocked à retirer (Double)
        // if (isConnected) {
        //   var miseDoublePhp = {};
        //   miseDoublePhp.value = (miseLocked);
        //   $.ajax({
        //     url: "setMises.php",
        //     method: "post",
        //     data: miseDoublePhp,
        //     success: function(res) {
        //       console.log("MISE DOUBLE ENVOYEE");
        //     }
        //   });
        // }

        // credits = credits - miseLocked;

        // // Maj front du credits (Co,Deco)
        // if (isConnected == false) {
        //   document.getElementById("creditsInvite").innerHTML = credits;
        // }
        // else {
        //   document.getElementById("creditsConnected").innerHTML = credits;
        // }


        $.ajax({
          async: false,
          url: "Footers/footerDistribution.html",
          dataType: "html",
          success: function(response) {
            $("#chipsContainer").html(response);
            ChoixActif = false;
            document.getElementById("footerTitle").innerHTML = " - En attente -";
          }
        });

        // Déplacé en amont à cause du delai sur l'appel
        // miseLocked = miseLocked * 2;
        // document.getElementById("miseLockedNbr").innerHTML =  miseLocked;
        // // Ajout de l'indice x2 sous miseLocked ou a coté de mise ?
        // // let x2Icon = document.createElement("span");
        // // x2Icon.setAttribute("id", "x2Icon");
        // document.getElementById("miseTitle").innerHTML = "Mise <span style='color:rgb(241, 205, 92); font-family:Calibri !important; font-weight:bold;'>x2</span>"


        setTimeout(function() {
          addCardJoueur();
          // (test: pb de 10/20 qui perd contre un 17 croupier (avec 1as), et affichage toujours 10/20)
          if (asJoueur == true) {
            if (scoreTotalJoueur + 10 < 22) {
              scoreTotalJoueur = scoreTotalJoueur + 10;
            }
            document.getElementById('scoreJoueur').innerHTML = scoreTotalJoueur;
          }

        }, 1000);

      }











      function animsBouton(choixBoutonPresse) {

        document.getElementById("choixStand").style.opacity = "0";
        document.getElementById("choixDoubler").style.opacity = "0";
        document.getElementById("choixHit").style.opacity = "0";

        document.querySelectorAll('.choices').forEach(function(elem) {
          let choixDuBoutonParcouru = elem.getAttribute("id");
          if (choixDuBoutonParcouru == choixBoutonPresse) {

            //anim elem pressé (anim 2 temps)
            // elem.style.opacity = "0.7";
            // elem.classList.add("glowBoutonChoixPresse");
            elem.innerHTML = "";
            elem.classList.add("animBoutonChoixPresse");

          }
          else {

            //anim autres elem (grisé tres tres vite instant et opa 0.5) ET DESACTIVER LE CLICK
            elem.classList.add("boutonGrisedAnim");
          

          }
        })
      };





























      

      // Lock de la mise
      function miseLock() {

          setTimeout(function() {
            document.getElementById("footer").style.boxShadow = "0px 3px 13vh 5px rgba(128, 128, 128, 0.55)";
            document.getElementById("header").style.boxShadow = "0px 3px 13vh 5px rgba(128, 128, 128, 0.55)";
          }, 650)

          ingame = true;

          // document.getElementById("parametresPartieDiv").classList.add("fadeOut2");
          document.getElementById("parametresPartieDiv").innerHTML = "";
          document.getElementById("parametresPartieDiv").classList.add("fadeIn2");

          // Depop du sideBet et retour borderTopFooter normal
          document.getElementById("sideBetDiv").remove();
          document.getElementById("traitLumineuxFooter").style.background = "var(--traitFooterMise-color)";
          document.getElementById("footer").style.borderTop = "4px solid var(--footerBorderTop-Color)";
          document.getElementById("footer").style.boxShadow = "";


          // Anims miserAlert
          document.getElementById('textMise').classList.add("phaseMiserAlert2Flash");
          document.getElementById('traitUnderlineInverse').classList.add("traitUnderlineInverse2Flash");
          
          setTimeout( function() {
            document.getElementById('phaseMiserAlert').classList.add("phaseMiserAlert2");
          }, 0)
          // Fin anims

          document.getElementById("header").classList.remove("headerOnPartie2");
          document.getElementById("footer").classList.remove("footerOnPartie2");
          document.getElementById("header").classList.remove("headerOnPartieRedecale");
          document.getElementById("footer").classList.remove("footerOnPartieRedecale");

          setTimeout(function() {
            document.getElementById("header").classList.add("headerOnPartie2");
            document.getElementById("footer").classList.add("footerOnPartie2");
          }, 0);


          if (SoundMuteBool == false) {
            audioMiser.play();
          }

          document.querySelector("#boutonMiser").style.opacity = "0.4";
          
          // Vérouillage des mises
          miseLocked = miseEnCours;
          misePairLocked = misePairEnCours;
          mise213Locked = mise213EnCours;

          if ((miseLocked == PreviousMiseNormale) && (misePairLocked == PreviousMisePair) && (mise213Locked == PreviousMise213)) {
            consecutivBets = true;
          }

          // credits = (credits - miseLocked - misePairLocked - mise213Locked);
          console.log("Mises Lockées: \n" + "miseLocked: " + miseLocked + ",\n" + "misePairLocked: " + misePairLocked + ",\n" + "mise213Locked: " + mise213EnCours + ".");


          // Titre Mise Normale
          let miseTitle = document.createElement("h6");
          miseTitle.setAttribute("id", "miseTitle");
          miseTitle.innerText = "Mise";
          document.getElementById("deckContainer").append(miseTitle); 
          document.getElementById("miseTitle").classList.add("miseTitleAnim");

          // Titre sideBets
          let sideBetsTitle = document.createElement("h6");
          sideBetsTitle.setAttribute("id", "sideBetsTitle");
          sideBetsTitle.innerText = "Side Bets";
          document.getElementById("parametresPartieDiv").append(sideBetsTitle); 
          
          // Traits SideBets et Mise
          let traitSouligneBet = document.createElement("div");
          traitSouligneBet.setAttribute("id", "traitSouligneBet");
          document.getElementById("parametresPartieDiv").append(traitSouligneBet); 
          let traitSouligneMise = document.createElement("div");
          traitSouligneMise.setAttribute("id", "traitSouligneMise");
          document.getElementById("deckContainer").append(traitSouligneMise); 
          document.getElementById("traitSouligneMise").classList.add("traitSouligneMiseAnim");

          // Ajout border lors switch param/sideBets:
          document.getElementById("parametresPartieDiv").classList.add("borderParamPartie");
          

          // Creation des elem avant Apparition des mises Locked sous le deck / sideBets:
          // Mise normale
          let miseLockedElement = document.createElement('span');
          miseLockedElement.setAttribute('id', 'miseLocked');
          miseLockedElement.classList.add('miseLockedAnim');
          document.getElementById("deckContainer").append(miseLockedElement);

          // Déplacé à la fin car laggy
          // document.getElementById("miseLocked").classList.add('animMiseNormale');

          // Mise Bets
          if (misePairLocked > 0) {
            // Saut de ligne 
            // document.getElementById("parametresPartieDiv").append(document.createElement("br"));

            let misePairLockedElement = document.createElement("span");
            misePairLockedElement.setAttribute("id", "misePairLocked");
            misePairLockedElement.classList.add("misePairLockedAnim");
            document.getElementById("parametresPartieDiv").append(misePairLockedElement);  
          }
          // Pour "None"
          else {
            document.getElementById("parametresPartieDiv").append(document.createElement("br"));

            let misePairLockedElement = document.createElement("span");
            misePairLockedElement.setAttribute("id", "misePairLockedNone");
            document.getElementById("parametresPartieDiv").append(misePairLockedElement);  
          }

          if (mise213Locked > 0) {
            document.getElementById("parametresPartieDiv").append(document.createElement("br"));

            let mise213LockedElement = document.createElement("span");
            mise213LockedElement.setAttribute("id", "mise213Locked");
            mise213LockedElement.classList.add("mise213LockedAnim");
            document.getElementById("parametresPartieDiv").append(mise213LockedElement);
          }
          // Pour "None"
          else {
            document.getElementById("parametresPartieDiv").append(document.createElement("br"));
            document.getElementById("parametresPartieDiv").append(document.createElement("br"));

            let mise213LockedElement = document.createElement("span");
            mise213LockedElement.setAttribute("id", "mise213LockedNone");
            document.getElementById("parametresPartieDiv").append(mise213LockedElement); 
          }
          // Fin
       




          // Pop des misesLocked sous le deck
          if (isConnected == false) {
            // TimeOut pour ajouter le chiffre apres l'anim du miseLockContainer (bugué):
            // setTimeout(function() {
              document.getElementById("miseLocked").innerHTML = 
              "<span id='miseLockedNbr'>" + miseLocked + "</span><img src='Images/souBlancBarre.png' class='imageSouPetit' style='margin-left:2px;'/>";
            
              if (misePairLocked > 0) {
                document.getElementById("misePairLocked").innerHTML = 
                "<span id='misePairLockedNbr'>" + misePairLocked + "</span><img src='Images/souBlancBarre.png' class='imageSouSideBets' style='margin-left:2px;'/>";  
              }
              else {
                document.getElementById("misePairLockedNone").innerHTML = 
                "<span id='misePairLockedNbrNone'>None</span>";  
              }
              
              if (mise213Locked > 0) {
                document.getElementById("mise213Locked").innerHTML = 
                "<span id='mise213LockedNbr'>" + mise213Locked + "</span><img src='Images/souBlancBarre.png' class='imageSouSideBets' style='margin-left:2px;'/>";  
              }
              else {
                document.getElementById("mise213LockedNone").innerHTML = 
                "<span id='mise213LockedNbrNone'>None</span>";  
              }
              // }, 800)
          }
          else if (isConnected == true) {
            // TimeOut pour ajouter le chiffre apres l'anim du miseLockContainer (bugué):
            // setTimeout(function() {
              document.getElementById("miseLocked").innerHTML = 
              "<span id='miseLockedNbr'>" + miseLocked + "</span><img src='Images/souBarre.png' class='imageSouPetit' style='margin-left:2px;'/>";
            
              if (misePairLocked > 0) {
                document.getElementById("misePairLocked").innerHTML = 
                "<span id='misePairLockedNbr'>" + misePairLocked + "</span><img src='Images/souBarre.png' class='imageSouSideBets' style='margin-left:2px;'/>";
              }
              else {
                document.getElementById("misePairLockedNone").innerHTML = 
                "<span id='misePairLockedNbrNone'>None</span>";
              }
            
              if (mise213Locked > 0) {
                document.getElementById("mise213Locked").innerHTML = 
                "<span id='mise213LockedNbr'>" + mise213Locked + "</span><img src='Images/souBarre.png' class='imageSouSideBets' style='margin-left:2px;'/>";  
              }
              else {
                document.getElementById("mise213LockedNone").innerHTML = 
                "<span id='mise213LockedNbrNone'>None</span>";  
              }
              // }, 800)
          }

          // Refresh du credits Front
          if (isConnected == false) {
            document.getElementById("credits").innerHTML = "<i class='fa-solid fa-star'></i> Invité &nbsp;&nbsp;<span id=\"creditsInvite\">" + (credits - miseLocked - misePairLocked - mise213Locked) + "</span>" + "&nbsp;<img src='Images/souBlancBarre.png' class=\"imageSouDeco\">";
            credits = (credits - miseLocked - misePairLocked - mise213Locked);
          }
          else if (isConnected == true) {
            document.getElementById("creditsConnected").innerHTML = (credits - (miseLocked + misePairLocked + mise213Locked));
            credits = (credits - miseLocked - misePairLocked - mise213Locked);
            // Anim creditFlash rouge ?
          }

          // Mise BDD (A revoir si besoin des mises différenciées par bet pour historique par exemple)
          var misesToPhp = {};
          misesToPhp.value = (miseLocked+mise213Locked+misePairLocked);

          $.ajax({
            url: "setMises.php",
            method: "post",
            data: misesToPhp,
            success: function(res) {
              console.log("MISES ENVOYEES");
            }
          });
    
          document.getElementById("miseEnCours").classList.add("fadeOut");

          document.getElementById("boutonMiser").disabled = true;
          document.getElementById("boutonMiser").style.cursor = "default";
          
          document.getElementById("boutonMiser").classList.remove("miserActif");

          setTimeout(function() {
            $.ajax({
              async: false,
              url: "Footers/footerDistribution.html",
              dataType: "html",
              success: function(response) {
                $("#chipsContainer").html(response);
                ChoixActif = false;
                document.getElementById("footerTitle").innerHTML = " - En attente... -";
              }
            });
          }, 700 * setTimeOutMultiplier);
          
          setTimeout(function() {
            $.ajax({
              async: false,
              url: "Footers/footerPhaseChoix.html",
              dataType: "html",
              success: function(response) {
                $("#chipsContainer").html(response);

                // Assurance:
                if (asCroupier2 == true) {
                  const assuranceDiv = document.createElement("div");
                  assuranceDiv.setAttribute("id", "assuranceDiv");
                  const assuranceImg = document.createElement("img");
                  assuranceImg.setAttribute("id", "assuranceImg");
                  const assuranceMise = document.createElement("p");
                  assuranceMise.setAttribute("id", "assuranceMise");
                  assuranceDiv.append(assuranceImg);
                  assuranceDiv.append(assuranceMise);

                  document.getElementById("hitStandDoubleContainer").append(assuranceDiv);

                  document.getElementById("assuranceMise").innerHTML = Math.ceil(miseLocked/2) + "<img src='Images/souBarre_darkMode.png' id='souAssurance' class='imageSouPetit'>";

                  // Envoi de la moitié de la miseNormal BDD
                  document.getElementById("assuranceDiv").addEventListener("click", function() {

                    if (isConnected == true) {
                      document.getElementById("creditsConnected").innerHTML = credits - (miseLocked/2);
                    }
                    else {
                      document.getElementById("creditsInvite").innerHTML = credits - (miseLocked/2);
                    }

                    document.getElementById("assuranceMise").style.color = "#2E5FFF";
                    document.getElementById("assuranceMise").innerHTML = "&#10003;";

                    var assuranceToPhp = {};
                    assuranceToPhp.value = (miseLocked/2);

                    $.ajax({
                      url: "setMises.php",
                      method: "post",
                      data: assuranceToPhp,
                      success: function(res) {
                        console.log("Assurance ENVOYEE");
                      }
                    });

                  })

                }


                // FooterShadow bleu lors choix
                document.getElementById("footer").style.boxShadow = "-0px -3px 15vh 5px rgba(17, 52, 251, 0.65)";
                document.getElementById("header").style.boxShadow = "";

                ChoixActif = true;
                document.getElementById("footerTitle").innerHTML = " - Choix -";

                if (scoreTotalJoueur > 8 && scoreTotalJoueur < 12) {
                  if ((document.getElementById("double") !==null ) && (document.getElementById("choixDoubler") !== null)) {
                    document.getElementById("double").style.boxShadow = "-0px -3px 30px 5px rgba(252, 227, 3, 1)";
                    document.getElementById("double").style.opacity = "1";
                    document.getElementById("choixDoubler").style.opacity = "1";
                  }
                }
                else {
                  document.getElementById("choixDoubler").style.opacity = "0.8";
                  document.getElementById("double").style.opacity = "0.8";
                }

                if (document.getElementById("hit") !== null) {
                  document.getElementById("hit").addEventListener("click", function() {

                    // document.getElementById("xAnim").classList.add("xAnimReverse");

                    document.getElementById('textChoix').classList.add("phaseChoixAlert2Flash");
  
                    animAlertOnClickChoix();
  
                    
                    animsBouton("hit");
                    // setTimeout(function() {
                      hit();
                    // }, 750)
  
                  });
                }

                
                //***  shortcut Hit
                  function doc_keyHit(e) {
                    if ((e.key === '+') && (ChoixActif == true)) {
                        hit();
                    }
                  }
                  document.addEventListener('keyup', doc_keyHit, false);
                // *** FIN

                if (document.getElementById("stand") !== null) {
                  document.getElementById("stand").addEventListener("click", function() {

                    document.getElementById("footer").style.boxShadow = "";

                    document.querySelector("#hit").disabled = true;
                    document.querySelector("#stand").disabled = true;
                    document.querySelector("#double").disabled = true;

                    document.getElementById('textChoix').classList.add("phaseChoixAlert2Flash");
                    document.getElementById('traitUnderlineInverseChoix').classList.add("traitUnderlineInverse2FlashChoix");
  
  
                    // Plutot mettre un fade out ou voir l'anim (trop brusque le depop) TimeOut trop long 
                    document.getElementById('textChoix').classList.add("phaseChoixAlert2Flash");
                    document.getElementById('phaseChoixAlert').classList.add("phaseChoixAlert2");
                    // document.getElementById("xAnim").classList.add("xAnimReverse");

                    setTimeout(function() {
                      if (document.getElementById("phaseChoixAlert") !==null ) {
                        document.getElementById("phaseChoixAlert").remove();
                        // document.getElementById("xAnim").classList.remove("xAnimReverse");
                      }
                    }, 2901);
  
                    
                    // Si AS parmis les 2 premieres cartes distribuées: (on est dans miseLock() )
                    // Le pb c'est qu'ici le scoreTotal est deja +10 lors du pop (si parmi les 2 preieres card, j'ai test et si l'as est la troisieme cartes, ca stand bien avec le footerDistrib)
                    if (asJoueur == true) {
                      if (scoreTotalJoueur + 10 < 22) {
                        scoreTotalJoueur = scoreTotalJoueur + 10;
                      }
                      document.getElementById('scoreJoueur').innerHTML = scoreTotalJoueur;
                    }

                    animsBouton("stand");
                    setTimeout(function() {
                      setTimeout(function() {
                        document.getElementById("footer").style.boxShadow = "";
                        document.getElementById("header").style.boxShadow = "0px 3px 13vh 5px rgba(128, 128, 128, 0.55)";
                      }, 200);
    
                      lancerPhaseCroupier();
                    }, 750)
  
                  });
                }


                  //***  shortcut Stand
                  function doc_keyStand(e) {
                    if ((e.key === '-') && (ChoixActif == true)) {
                        lancerPhaseCroupier();
                    }
                  }
                  document.addEventListener('keyup', doc_keyStand, false);
                  //*** FIN

                if ((document.getElementById("double") !== null) && (credits-miseLocked <= 0)) {
                  document.getElementById("double").style.opacity = "0.3";
                  document.getElementById("double").style.color = "grey";
                  document.getElementById("choixDoubler").style.color = "grey";
                  document.getElementById("double").style.border = "4px solid grey";
                  document.getElementById("double").addEventListener("click", function() {
                    document.getElementById("double").classList.add("shakeX2");
                    setTimeout(function() {
                      document.getElementById("double").classList.remove("shakeX2");
                    }, 501)
                  })  
                }
                else if ((document.getElementById("double") !== null) && (credits-miseLocked > 0)) {
                  document.getElementById("double").addEventListener("click", function() {

                    document.getElementById("footer").style.boxShadow = "";

                    document.querySelector("#hit").disabled = true;
                    document.querySelector("#stand").disabled = true;
                    document.querySelector("#double").disabled = true;

                    document.getElementById('textChoix').classList.add("phaseChoixAlert2Flash");
                    document.getElementById('traitUnderlineInverseChoix').classList.add("traitUnderlineInverse2FlashChoix");
  
  
                    // Plutot mettre un fade out ou voir l'anim (trop brusque le depop) TimeOut trop long 
                    document.getElementById('textChoix').classList.add("phaseChoixAlert2Flash");
                    document.getElementById('phaseChoixAlert').classList.add("phaseChoixAlert2");
                    // document.getElementById("xAnim").classList.add("xAnimReverse");
                    setTimeout(function() {
                      if (document.getElementById("phaseChoixAlert") !==null ) {
                        document.getElementById("phaseChoixAlert").remove();
                        // document.getElementById("xAnim").classList.remove("xAnimReverse");
                      }
                    }, 2901);
  
                    // animAlertOnClickChoix();
                    animsBouton("double");

                    // // Envoi de la miseLocked à retirer (Double)
                    if (isConnected) {
                      var miseDoublePhp = {};
                      miseDoublePhp.value = (miseLocked);
                      $.ajax({
                        url: "setMises.php",
                        method: "post",
                        data: miseDoublePhp,
                        success: function(res) {
                          console.log("MISE DOUBLE ENVOYEE");
                        }
                      });
                    }

                    credits = credits - miseLocked;

                    // Maj front du credits (Co,Deco)
                    if (isConnected == false) {
                      document.getElementById("creditsInvite").innerHTML = credits;
                    }
                    else {
                      document.getElementById("creditsConnected").innerHTML = credits;
                    }

                    miseLocked = miseLocked * 2;
                    document.getElementById("miseLockedNbr").innerHTML =  miseLocked;
                    // Ajout de l'indice x2 sous miseLocked ou a coté de mise ?
                    // let x2Icon = document.createElement("span");
                    // x2Icon.setAttribute("id", "x2Icon");
                    document.getElementById("miseTitle").innerHTML = "Mise <span style='color:rgb(241, 205, 92); font-family:Calibri !important; font-weight:bold;'>x2</span>"

                    setTimeout(function() {
                      double();
                    }, 750)
  
                  });
                }


                //***  shortcut Double
                function doc_keyDouble(e) {
                  if ((e.key === '*') && (ChoixActif == true)){
                      double();
                  }
                }
                document.addEventListener('keyup', doc_keyDouble, false);
                //*** FIN 

              }
            });
          }, 8000 * setTimeOutMultiplier);

          // Anims alertChoix
            setTimeout(function() {
              if ((document.getElementById("traitUnderlineInverseChoix")!=null) && (document.getElementById('phaseChoixAlert')!==null)) {
                document.getElementById("traitUnderlineInverseChoix").classList.add("traitUnderlineInverseChoix1");
                document.getElementById('phaseChoixAlert').classList.add("phaseChoixAlert1");

                // let xAnimWrapper = document.createElement("div");
                // xAnimWrapper.setAttribute("id", "xAnimWrapper");
                // let xAnim = document.createElement("div");
                // xAnim.setAttribute("id", "xAnim");
                // xAnimWrapper.append(xAnim);

                // document.getElementById("jouerContainer1").append(xAnimWrapper);
              }
              // Fin
            }, 8001 * setTimeOutMultiplier);

          // Fin Anims alertChoix


          setTimeout(function() {
            addCardJoueur();
          }, (2000 * setTimeOutMultiplier));
          setTimeout(function() {
            distribAnim("croupier");
            addCardCroupier();
          }, (3750 * setTimeOutMultiplier));
          setTimeout(function() {
            addCardJoueur();
          }, (5500 * setTimeOutMultiplier));
          setTimeout(function() {
            addBackCardCroupier();
          }, (7250 * setTimeOutMultiplier));

          // setTimeout(function() {
          //   addCardJoueur();
          // }, (2000 * (setTimeOutMultiplier+0.10)));
          // setTimeout(function() {
          //   distribAnim("croupier");
          //   addCardCroupier();
          // }, (3750 * (setTimeOutMultiplier+0.10)));
          // setTimeout(function() {
          //   addCardJoueur();
          // }, (5500 * (setTimeOutMultiplier+0.10)));
          // setTimeout(function() {
          //   addBackCardCroupier();
          // }, (7250 * (setTimeOutMultiplier+0.10)));


          // Check le betPair (apres les 2 premieres cardJoueur), et return le gain:
          setTimeout( function() {

            gainPairBet = checkPairResult();
            console.log("SIDE BET PAIR GAIN: " + gainPairBet);  

            gain213Bet = check213Result();
            console.log("SIDE BET 21+3 GAIN: " + gain213Bet);  

          }, (6000 * setTimeOutMultiplier));

          document.getElementById("miseLocked").classList.add('animMiseNormale');
      }


      function addBackCardCroupier() {

        distribAnim("croupier");

        var img = document.createElement('img');
        img.id = "backCardCroupier";
        img.className = "imgPartie";

        if (darkModeBool == true) {
          img.src = "Images/deck3_darkMode2.png";
        }
        else {
          img.src = "Images/deck3.png";
        }

        if (SoundMuteBool == false) {
          audioCardSound.play();
        }
        document.getElementById("croupier").appendChild(img);
      }

      var choix;

      function hit() {

        document.querySelector("#hit").disabled = true;
        document.querySelector("#stand").disabled = true;
        document.querySelector("#double").disabled = true;

        $.ajax({
          async: false,
          url: "Footers/footerDistribution.html",
          dataType: "html",
          success: function(response) {
            $("#chipsContainer").html(response);
            ChoixActif = false;
            document.getElementById("footerTitle").innerHTML = " - En attente -";
          }
        });

        setTimeout(function() {
          addCardJoueur();
        }, 1000 * setTimeOutMultiplier);

        setTimeout(function() {
          $.ajax({
            async: false,
            url: "Footers/footerPhaseChoix.html",
            dataType: "html",
            success: function(response) {
              ChoixActif = true;

              // TEST bleu lors choix
              document.getElementById("footer").style.boxShadow = "-0px -3px 15vh 5px rgba(17, 52, 251, 0.65)";
              document.getElementById("header").style.boxShadow = "";

              $("#chipsContainer").html(response);
              document.getElementById("footerTitle").innerHTML = " - Choix -";

              // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              // Selon les règles Francaises ou US: On peut que doubler apres les 2 premieres cartes si elles totalisent 9,10 ou 11 (à commenter ?) (1/2)
              if (scoreTotalJoueur > 8 && scoreTotalJoueur < 12) {
                if ((document.getElementById("double") !==null ) && (document.getElementById("choixDoubler") !== null)) {
                  document.getElementById("double").style.boxShadow = "-0px -3px 30px 5px rgba(252, 227, 3, 1)";
                  document.getElementById("double").style.opacity = "1";
                  document.getElementById("choixDoubler").style.opacity = "1";
                }
              }
              else {
                document.getElementById("choixDoubler").style.opacity = "0.8";
                document.getElementById("double").style.opacity = "0.8";
              }

              if (document.getElementById('textChoix') !== null) {
                document.getElementById('textChoix').classList.remove("phaseChoixAlert2Flash");
              }

              // if (document.getElementById("xAnim") !== null) {
              //   document.getElementById("xAnim").classList.remove("xAnimReverse");
              // }

              document.getElementById("hit").addEventListener("click", function() {

                document.getElementById('textChoix').classList.add("phaseChoixAlert2Flash");

                choix = "hit";


                animAlertOnClickChoix();

                animsBouton("hit");
                // setTimeout(function() {
                  hit();
                // }, 750)

              });
              //***  shortcut Hit
              function doc_keyHit(e) {
                if ((e.key === '+') && (ChoixActif == true)) {
                    hit();
                }
              }
              document.addEventListener('keyup', doc_keyHit, false);
              // *** FIN 
              

              document.getElementById("stand").addEventListener("click", function() {

                document.getElementById("footer").style.boxShadow = "";

                document.querySelector("#hit").disabled = true;
                document.querySelector("#stand").disabled = true;
                document.querySelector("#double").disabled = true;

                choix = "stand";

                document.getElementById('textChoix').classList.add("phaseChoixAlert2Flash");
                document.getElementById('traitUnderlineInverseChoix').classList.add("traitUnderlineInverse2FlashChoix");
                document.getElementById('phaseChoixAlert').classList.add("phaseChoixAlert2");
                // document.getElementById("xAnim").classList.add("xAnimReverse");
                setTimeout(function() {
                  if (document.getElementById("phaseChoixAlert") !==null ) {
                    document.getElementById("phaseChoixAlert").remove();
                    // document.getElementById("xAnim").classList.remove("xAnimReverse");
                  }
                }, 2901);



                if (asJoueur == true) {
                  //  IF NOT BURST
                  if (scoreTotalJoueur + 10 < 22) {
                    scoreTotalJoueur = scoreTotalJoueur + 10;
                  }
                  else if (scoreTotalJoueur + 10 == 21) {
                    setTimeout(function() {
                      document.getElementById("footer").style.boxShadow = "";
                      document.getElementById("header").style.boxShadow = "0px 3px 13vh 5px rgba(128, 128, 128, 0.55)";
                    }, 200);
                    document.getElementById("scoreJoueur").innerHTML = (scoreTotalJoueur + 10);
                    lancerPhaseCroupier();
                  }
                  document.getElementById('scoreJoueur').innerHTML = (scoreTotalJoueur);

                }
                animsBouton("stand");

                setTimeout(function() {

                  setTimeout(function() {
                    document.getElementById("footer").style.boxShadow = "";
                    document.getElementById("header").style.boxShadow = "0px 3px 13vh 5px rgba(128, 128, 128, 0.55)";
                  }, 200);

                  lancerPhaseCroupier();

                }, 750)
            });

              //***  shortcut Stand
              function doc_keyStand(e) {
                if ((e.key === '-') && (ChoixActif == true)) {
                    lancerPhaseCroupier();
                }
              }
              document.addEventListener('keyup', doc_keyStand, false);
              //*** FIN

              // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              // Selon les règles Francaises ou US: On peut que doubler apres les 2 premieres cartes si elles totalisent 9,10 ou 11 (à commenter ?) (2/2)
              if (credits-miseLocked <= 0) {
                document.getElementById("double").style.opacity = "0.3";
                document.getElementById("double").style.color = "grey";
                document.getElementById("choixDoubler").style.color = "grey";
                document.getElementById("double").style.border = "4px solid grey";
                document.getElementById("double").addEventListener("click", function() {
                  document.getElementById("double").classList.add("shakeX2");
                  setTimeout(function() {
                    document.getElementById("double").classList.remove("shakeX2");
                  }, 501)
                })
              }
              else if (credits-miseLocked > 0) {
                document.getElementById("double").addEventListener("click", function() {

                  document.getElementById("footer").style.boxShadow = "";

                  document.querySelector("#hit").disabled = true;
                  document.querySelector("#stand").disabled = true;
                  document.querySelector("#double").disabled = true;

                  choix = "double";

                  document.getElementById('textChoix').classList.add("phaseChoixAlert2Flash");
                  document.getElementById('traitUnderlineInverseChoix').classList.add("traitUnderlineInverse2FlashChoix");
                  document.getElementById('phaseChoixAlert').classList.add("phaseChoixAlert2");
                  // document.getElementById("xAnim").classList.add("xAnimReverse");
                  setTimeout(function() {
                    if (document.getElementById("phaseChoixAlert") !==null ) {
                      document.getElementById("phaseChoixAlert").remove();
                      // document.getElementById("xAnim").classList.remove("xAnimReverse");
                    }                
                  }, 2901);

                  animsBouton("double");

                  // // Envoi de la miseLocked à retirer (Double)
                  if (isConnected) {
                    var miseDoublePhp = {};
                    miseDoublePhp.value = (miseLocked);
                    $.ajax({
                      url: "setMises.php",
                      method: "post",
                      data: miseDoublePhp,
                      success: function(res) {
                        console.log("MISE DOUBLE ENVOYEE");
                      }
                    });
                  }

                  credits = credits - miseLocked;

                  // Maj front du credits (Co,Deco)
                  if (isConnected == false) {
                    document.getElementById("creditsInvite").innerHTML = credits;
                  }
                  else {
                    document.getElementById("creditsConnected").innerHTML = credits;
                  }

                  miseLocked = miseLocked * 2;
                  document.getElementById("miseLockedNbr").innerHTML =  miseLocked;
                  // Ajout de l'indice x2 sous miseLocked ou a coté de mise ?
                  // let x2Icon = document.createElement("span");
                  // x2Icon.setAttribute("id", "x2Icon");
                  document.getElementById("miseTitle").innerHTML = "Mise <span style='color:rgb(241, 205, 92); font-family:Calibri !important; font-weight:bold;'>x2</span>"
                  

                  setTimeout(function() {
                    double();
                  }, 750)
                });
              }
              //***  shortcut Double
              function doc_keyDouble(e) {
                if ((e.key === '*') && (ChoixActif == true)){
                    double();
                }
              }
              document.addEventListener('keyup', doc_keyDouble, false);
              //*** FIN 


            }

            

          });
        }, 2250 * (setTimeOutMultiplier*1.1));


        // Ce code est exécuté même apres un Stand() : PB
        setTimeout(function() {
          // Anims alertChoix
          if (choix == "hit") {
            if (document.getElementById('phaseChoixAlert') !== null) {
              document.getElementById('phaseChoixAlert').classList.add("phaseChoixAlert1");
            }
            // if (document.getElementById("xAnim") !== null) {
              
            // }

          }
          
        }, 2251 * setTimeOutMultiplier*1.1);

      }




      function lancerPhaseCroupierAfterBurst() {

        document.getElementById("footer").style.boxShadow = "";
        document.getElementById("header").style.boxShadow = "0px 3px 13vh 5px rgba(128, 128, 128, 0.55)";

        addCardCroupierRecursiveAfterBurst();

        function addCardCroupierRecursiveAfterBurst() {

          if (document.getElementById("backCardCroupier") !== null) {
            setTimeout(function() {
              document.getElementById("backCardCroupier").classList.add("fadeOut2");
            }, 750 * setTimeOutMultiplier)
          }
  
          if (document.getElementById("backCardCroupier") !== null) {
            setTimeout(function() {
              document.getElementById("backCardCroupier").remove();
            }, 1200 * setTimeOutMultiplier)
          }
          
          if (scoreTotalCroupier < 17) {
            setTimeout(function() {
              addCardCroupier(false, true);
              addCardCroupierRecursiveAfterBurst();
            }, 1200 * setTimeOutMultiplier)
          }
          else {
            // resultats
            if ((scoreTotalCroupier > 16) && (scoreTotalCroupier < 22)) {
              setTimeout(function() {
                document.getElementById("scoreCroupier").style.color = "rgb(0 255 234 / 100%)";
                document.getElementById("scoreCroupier").style.textShadow = "1px 1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, -1px -1px 0 #000000, 1px 0px 0 #000000, 0px 1px 0 #000000, -1px 0px 0 #000000, 0px -1px 0 #000000";
                document.getElementById("scoreCroupier").style.border = "3px solid rgb(0 255 234 / 70%)";
                // Glow reste bleu
              }, 400);
            }
            else if (scoreTotalCroupier > 21) {
              setTimeout(function() {
                document.getElementById("scoreCroupier").style.backgroundColor = "rgb(160 13 27)"
                document.getElementById("scoreCroupier").style.color = "rgba(239,230,230, 1)"
                document.getElementById("scoreCroupier").style.textShadow = "1px 1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, -1px -1px 0 #000000, 1px 0px 0 #000000, 0px 1px 0 #000000, -1px 0px 0 #000000, 0px -1px 0 #000000";
                document.getElementById("scoreCroupier").style.border = "3px solid rgba(130,14,39, 1)";
                // Glow repasse a rouge (bustCroupier):
                handBust("croupier"); 
              }, 400);
            }

            // WIP fix: affichage bouton relancer seulement après la fin de la distribution
              // Apparition bouton (après PhaseCroupier sinon MessUp si cliqué trop tot)
              setTimeout(function() { 
                document.getElementById("relancer").classList.add("fadeInResultat");
                document.getElementById("relancer").style.visibility = "visible";
                // Disparition boutton onClick
                document.getElementById("relancer").addEventListener("click", function() {
                    document.getElementById("reloadPng").classList.add('rotateReloadPng');
                    document.getElementById("relancer").classList.add('reloadColorAnim');
                  
                    setTimeout( function() { 
                      if (document.getElementById("relancer") !== null) {
                        document.getElementById("relancer").style.visibility = "hidden";
                      }
                    }, 1500)
                })
              }, 500)
          }
        }

        
      }




      function expDB(expGain) {

        var expToPhp = {};
          expToPhp.value = expGain;

          $.ajax({
            url: "setExp.php",
            method: "post",
            data: expToPhp,
            success: function(res) {
              console.log("(JS) success POST expGain: " + expToPhp.value);
            }
          });
      };




      function removeSideBetsFooter() {
        if (misePairLocked == 0) {
          document.getElementById("footerResultatLinePair").remove();
        }
        if (mise213Locked == 0) {
          document.getElementById("footerResultatLine213").remove();
        } 
        if ((misePairLocked == 0) && (mise213Locked == 0)) {
          document.getElementById("footerResultatLine").style.top = "50%";
          document.getElementById("footerResultatLine").style.transform = "translate(10%, -50%)";
        }
        // XOR existe pas en JS
        else if ((misePairLocked != 0) && (mise213Locked == 0) || (misePairLocked == 0) && (mise213Locked != 0)) {
          // Pour bien centré si i y a 1 seul bet (mais bon)
        }
      }





      function lancerPhaseCroupier() {

          var firstCardRevealed = false;

          $.ajax({
            async: false,
            url: "Footers/footerDistribution.html",
            dataType: "html",
            success: function(response) {
              $("#chipsContainer").html(response);
              ChoixActif = false;
              document.getElementById("footerTitle").innerHTML = " - En attente -";
            }
          });

          var scoreTotalCroupierTemp = scoreTotalCroupier;

          addCardCroupierRecursive();

            
          function addCardCroupierRecursive() {
            if ( removed == false) {
              removed = true;
              setTimeout(function() {
                document.getElementById("backCardCroupier").classList.add("fadeOut2");
              }, 1550 * setTimeOutMultiplier)
              setTimeout(function() {
                document.getElementById("backCardCroupier").remove();
              }, 2150 * setTimeOutMultiplier)
            }

            // if (asCroupier == true) )

            // else {
            //   if (scoreTotalCroupier < 17) {
            //     setTimeout(function() {
            //       if (firstCardRevealed == true) {
            //         addCardCroupier(firstCardRevealed);  
            //       }
            //       else {
            //         addCardCroupier(firstCardRevealed);
            //         firstCardRevealed = true;
            //       }
            //       addCardCroupierRecursive();
            //     }, 2150 * setTimeOutMultiplier)
            //   }
            //   else {
            //     resultat();
            //   }
            // }

            if (scoreTotalCroupierTemp < 17) {
              setTimeout(function() {
                if (firstCardRevealed == true) {
                  scoreTotalCroupierTemp = addCardCroupier(firstCardRevealed);  
                }
                else {
                  scoreTotalCroupierTemp = addCardCroupier(firstCardRevealed);
                  firstCardRevealed = true;
                }
                addCardCroupierRecursive();
              }, 2150 * setTimeOutMultiplier)
            }
            else {
              resultat();
            }
          };



          



          function resultat() {
            setTimeout(function() {
              if (scoreTotalCroupier > scoreTotalJoueur && scoreTotalCroupier < 22) {

                WinLose = 'LOSE';
                resultatCas = 'Wasted';
                console.log("scoreTotalCroupier: " + scoreTotalCroupier);

                setTimeout(function() {

                  // Changements du background jauge et Connexion car ressort pas assez:
                  document.getElementById("jaugeContainer").style.backgroundColor = "rgb(105, 105, 105)";
                  // moins marqué: "0 0 black"
                  if (isConnected) {
                    document.getElementById("connectedLine").style.textShadow = "1px 1px black";
                  }
                  else {
                    document.getElementById("credits").style.textShadow = "1px 1px black";
                  }
                  if (document.getElementById("toggleHandDiv") !== null) {
                    document.getElementById("toggleHandDiv").style.boxShadow = "0px -1px black";
                  }

                  document.getElementById("footer").style.zIndex = "-1";
                  document.getElementById("header").style.zIndex = "-1";
                  document.getElementById("footer").style.boxShadow = "0px -3px 42vh 30px rgba(239, 59, 46, 0.9)";
                  document.getElementById("header").style.boxShadow = "0px 3px 42vh 30px rgba(0, 255, 234, 0.55)";


                  if (toggleCardSimplist) {
                    handWin("croupier");
                  }

                  var handCroupier = document.getElementById("croupier").childNodes;
                  for (var i=0; i < handCroupier.length; i++) {
                    // if (handCroupier[i].nodeName.toLowerCase() == 'img') {
                      handCroupier[i].classList.remove("surbrillanceCards213");
                      handCroupier[i].style.boxShadow = "0px 0px 20px 3px rgb(0 255 234 / 60%)";
                      if (toggleCardSimplist) {
                        handCroupier[i].style.borderColor = "rgb(0 255 234 / 70%)";
                      }
                    // }
                  }
                  var handJoueur = document.getElementById("joueur").childNodes;
                  for (var i=0; i < handJoueur.length; i++) {
                    // if (handJoueur[i].nodeName.toLowerCase() == 'img') {
                      handJoueur[i].classList.remove("surbrillanceCards213");
                      handJoueur[i].classList.remove("surbrillanceCardsPair");
                      handJoueur[i].style.boxShadow = "0px 0px 20px 3px rgb(239 59 46 / 90%)";
                      if (toggleCardSimplist) {
                        handJoueur[i].style.borderColor = "rgb(239 59 46 / 80%)";
                      }

                    // }
                  }

                }, 465)
    


                $.ajax({
                  async: false,
                  url: "Footers/footerResultat.html",
                  dataType: "html",
                  success: function(response) {
                    $("#container3").html(response);
                    console.log(scoreTotalCroupier);
                    ChoixActif = false;
                    document.getElementById("footerTitle").innerHTML = " - Gains -";

                    document.getElementById("gainExp").innerText = "+20 XP";

                    // Mise lockée
                    document.getElementById("miseLockedFooter").innerHTML = miseLocked;
                    document.getElementById("misePairLockedFooter").innerHTML = misePairLocked;
                    document.getElementById("mise213LockedFooter").innerHTML = mise213Locked;
                    // fin

                    // Résultat Gains 
                    if ( isConnected == true) {
                      document.getElementById("miseResultat").innerHTML = "<span id='miseResultatTxt'>" + miseLocked + '</span><img src="Images/souBarre.png" class="imagesSouResultat">';
                      document.getElementById("misePairResultat").innerHTML = "<span id='misePairResultatTxt'>" + misePairLocked + '</span><img src="Images/souBarre.png" class="imageSouSideBets">';
                      document.getElementById("mise213Resultat").innerHTML = "<span id='mise213ResultatTxt'>" + mise213Locked + '</span><img src="Images/souBarre.png" class="imageSouSideBets">';
                    }
                    else {
                      document.getElementById("miseResultat").innerHTML = "<span id='miseResultatTxt'>" + miseLocked + '</span><img src="Images/souBlancBarre.png" class="imagesSouResultat">';
                      document.getElementById("misePairResultat").innerHTML = "<span id='misePairResultatTxt'>" + misePairLocked + '</span><img src="Images/souBlancBarre.png" class="imageSouSideBets">';
                      document.getElementById("mise213Resultat").innerHTML = "<span id='mise213ResultatTxt'>" + mise213Locked + '</span><img src="Images/souBlancBarre.png" class="imageSouSideBets">';
                    }       
                    
                    removeSideBetsFooter();

                    setTimeout( function() {
                      DecrementGain();
                    }, 1500); 
                    setTimeout( function() {
                      IncrDecrGainPair(gainPairBet);
                    }, 1750);
                    setTimeout( function() {
                      IncrDecrGain213(gain213Bet);
                    }, 2000);

                    // WIP gain (ajouter effet refresh CSS)
                    setTimeout( function() {

                      // gain = -miseLocked;
                      gainHistorique = -miseLocked;
                      gain = 0;
                      ajoutGain(gain);
                      ingame = false;


                      winLose = -1;
                      winLoseDB(winLose);

                      majStreak(WinLose);

                    }, 500);

                    expDB(20);

                    refreshLvl();              


                    document.getElementById("deckContainer").remove();
                    document.getElementById("cardAnim").remove();
                    document.getElementById("parametresPartieDiv").remove();

                    document.getElementById("scoreJoueur").style.backgroundColor = "rgb(160 13 27)";

                    document.getElementById("scoreCroupier").style.color = "rgb(0 255 234 / 100%)";
                    document.getElementById("scoreJoueur").style.color = "rgba(239,230,230,1)";

                    document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)";
                    document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)";

                    document.getElementById("scoreCroupier").style.border = "1px solid rgb(0 255 234 / 70%)";
                    document.getElementById("scoreJoueur").style.border = "1px solid rgba(255,1,49,0.5)";                  
                    // Fin Perdu





                    // Séparateur
                    setTimeout(function() {

                      //Apparition
                      document.getElementById("resultatText").classList.add("resultatTextLose");
                      document.getElementById("separateur").classList.add("styleSeparateurLose");

                      if (darkModeBool == true) {
                        document.getElementById("resultatText").classList.add("resultatTextWastedDM");
                        document.getElementById("separateur").classList.add("styleSeparateurWastedDM");
                      }
                      else {
                        document.getElementById("separateur").classList.add(".styleSeparateurLose");
                      }

                      if (SoundMuteBool == false) {
                        audioExplosionBust.play();
                      }



                      // Animation scale() qui pop avec fadeIn()
                      document.getElementById("separateur").classList.add("separateurContainerWidthAnim");
                      document.getElementById("separateur").classList.add("fadeInResultat");
                      document.getElementById("separateur").classList.add("scaleBoom");

                      // TEXT
                      document.getElementById("resultatText").innerText = "WASTED";
                    }, 250);
                    // Fin séparateur

                    popBoutonReload();

                    // Bouton Rejouer
                    relancer();
                  }
                });
              }



              if (scoreTotalCroupier > 21) {

                setTimeout(function() {

                  // Changements du background jauge et Connexion car ressort pas assez:
                  document.getElementById("jaugeContainer").style.backgroundColor = "rgb(131, 131, 131)";
                  // moins marqué: "0 0 black"
                  if (isConnected) {
                    document.getElementById("connectedLine").style.textShadow = "1px 1px black";
                  }
                  else {
                    document.getElementById("credits").style.textShadow = "1px 1px black";
                  }
                  if (document.getElementById("toggleHandDiv") !== null) {
                    document.getElementById("toggleHandDiv").style.boxShadow = "0px -1px black";
                  }

                  document.getElementById("footer").style.zIndex = "-1";
                  document.getElementById("header").style.zIndex = "-1";
                  document.getElementById("footer").style.boxShadow = "0px -3px 42vh 30px rgba(0, 255, 234, 0.55)";
                  document.getElementById("header").style.boxShadow = "0px 3px 42vh 30px rgba(239, 59, 46, 0.9)";

                  if (toggleCardSimplist) {
                    handWin("joueur");
                  }

                  var handCroupier = document.getElementById("croupier").childNodes;
                  for (var i=0; i < handCroupier.length; i++) {
                    // if (handCroupier[i].nodeName.toLowerCase() == 'img') {
                      handCroupier[i].classList.remove("surbrillanceCards213");
                      handCroupier[i].style.boxShadow = "0px 0px 20px 3px rgb(239 59 46 / 90%)";
                      if (toggleCardSimplist) {
                        handCroupier[i].style.borderColor = "rgb(239 59 46 / 80%)";
                      }

                    // }
                  }
                  var handJoueur = document.getElementById("joueur").childNodes;
                  for (var i=0; i < handJoueur.length; i++) {
                    // if (handJoueur[i].nodeName.toLowerCase() == 'img') {
                      handJoueur[i].classList.remove("surbrillanceCards213");
                      handJoueur[i].classList.remove("surbrillanceCardsPair");
                      handJoueur[i].style.boxShadow = "0px 0px 20px 3px rgb(0 255 234 / 60%)";
                      if (toggleCardSimplist) {
                        handJoueur[i].style.borderColor = "rgb(0 255 234 / 70%)";
                      }
                    // }
                  }

                }, 465)


                if ((document.getElementById("phaseChoixAlert") !==null) && (document.getElementById("traitUnderlineInverseChoix") !==null)) {
                  document.getElementById("phaseChoixAlert").remove();
                  document.getElementById("traitUnderlineInverseChoix").remove();
                }


                WinLose = 'WIN';
                resultatCas = 'Big Win';
                console.log("scoreTotalCroupier: " + scoreTotalCroupier);


                setTimeout(function() {
                  $.ajax({
                    async: false,
                    url: "Footers/footerResultat.html",
                    dataType: "html",
                    success: function(response) {
                      $("#container3").html(response);
                      ChoixActif = false;
                      document.getElementById("footerTitle").innerHTML = " - Gains -";

                        document.getElementById("gainExp").innerText = "+100 XP";
    
                        // Mise lockée
                        document.getElementById("miseLockedFooter").innerHTML = miseLocked;
                        document.getElementById("misePairLockedFooter").innerHTML = misePairLocked;
                        document.getElementById("mise213LockedFooter").innerHTML = mise213Locked;
                        // fin
    
                        // Résultat Gains 
                        if ( isConnected == true) {
                          document.getElementById("miseResultat").innerHTML = "<span id='miseResultatTxt'>" + miseLocked + '</span><img src="Images/souBarre.png" class="imagesSouResultat">';
                          document.getElementById("misePairResultat").innerHTML = "<span id='misePairResultatTxt'>" + misePairLocked + '</span><img src="Images/souBarre.png" class="imageSouSideBets">';
                          document.getElementById("mise213Resultat").innerHTML = "<span id='mise213ResultatTxt'>" + mise213Locked + '</span><img src="Images/souBarre.png" class="imageSouSideBets">';
                        }
                        else {
                          document.getElementById("miseResultat").innerHTML = "<span id='miseResultatTxt'>" + miseLocked + '</span><img src="Images/souBlancBarre.png" class="imagesSouResultat">';
                          document.getElementById("misePairResultat").innerHTML = "<span id='misePairResultatTxt'>" + misePairLocked + '</span><img src="Images/souBlancBarre.png" class="imageSouSideBets">';
                          document.getElementById("mise213Resultat").innerHTML = "<span id='mise213ResultatTxt'>" + mise213Locked + '</span><img src="Images/souBlancBarre.png" class="imageSouSideBets">';
                        }  
                        
                        removeSideBetsFooter();

                        setTimeout( function() {
                          IncrementGain(miseLockedMultiplied);
                        }, 1500);
                        setTimeout( function() {
                          IncrDecrGainPair(gainPairBet);
                        }, 1750);
                        setTimeout( function() {
                          IncrDecrGain213(gain213Bet);
                        }, 2000);

                        setTimeout( function() {

                          // gain = miseLocked;
                          gainHistorique = miseLocked;
                          gainFront = (miseLocked*2);
                          gain = (miseLocked*2);
                          ajoutGain(gain);
                          ingame = false;

                          winLose = 1;
                          winLoseDB(winLose);

                          majStreak(WinLose);
                          

                        }, 500);

                        expDB(100);

                        refreshLvl();

                        // function: (en partant de la mise vers le gains réel)
                        var miseLockedMultiplied = miseLocked * 2;

                        // Fin résultat Gains
    
                      // FIN WIP
                      

                      document.getElementById("deckContainer").remove();
                      document.getElementById("cardAnim").remove();
                      document.getElementById("parametresPartieDiv").remove();
    
                      document.getElementById("scoreCroupier").style.backgroundColor = "rgb(160 13 27)";

                      document.getElementById("scoreCroupier").style.color = "rgba(239,230,230,1)";
                      document.getElementById("scoreJoueur").style.color = "rgb(0 255 234 / 100%)";

                      document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)";
                      document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)";

                      document.getElementById("scoreCroupier").style.border = "1px solid rgba(255,1,49,0.5)";
                      document.getElementById("scoreJoueur").style.border = "1px solid rgb(0 255 234 / 70%)";


                      // Séparateur
                      setTimeout(function() {
                        //Apparition
                        document.getElementById("resultatText").classList.add("resultatTextWin");
                        document.getElementById("separateur").classList.add("styleSeparateurWin");

                        if (SoundMuteBool == false) {
                          audioCoinWin.play();
                        }

                        // Animation scale() qui pop avec fadeIn()
                        document.getElementById("separateur").classList.add("separateurContainerWidthAnim");
                        document.getElementById("separateur").classList.add("fadeInResultat");
                        document.getElementById("separateur").classList.add("scaleBoom");

                        // TEXT
                        document.getElementById("resultatText").innerText = "BIG WIN";
                      }, 250);
                      // Fin séparateur
    
                      popBoutonReload();

                      // Bouton Rejouer
                      relancer();
                    }
                  });
                }, 0);
              }




              if (scoreTotalJoueur > scoreTotalCroupier) {

                setTimeout(function() {

                  // Changements du background jauge et Connexion car ressort pas assez:
                  document.getElementById("jaugeContainer").style.backgroundColor = "rgb(131, 131, 131)";
                  // moins marqué: "0 0 black"
                  if (isConnected) {
                    document.getElementById("connectedLine").style.textShadow = "1px 1px black";
                  }
                  else {
                    document.getElementById("credits").style.textShadow = "1px 1px black";
                  }                  
                  if (document.getElementById("toggleHandDiv") !== null) {
                    document.getElementById("toggleHandDiv").style.boxShadow = "0px -1px black";
                  }

                  document.getElementById("footer").style.zIndex = "-1";
                  document.getElementById("header").style.zIndex = "-1";
                  document.getElementById("footer").style.boxShadow = "0px -3px 42vh 30px rgba(0, 255, 234, 0.55)";
                  document.getElementById("header").style.boxShadow = "0px 3px 42vh 30px rgba(239, 59, 46, 0.9)";

                  if (toggleCardSimplist) {
                    handWin("joueur");
                  }

                  var handCroupier = document.getElementById("croupier").childNodes;
                  for (var i=0; i < handCroupier.length; i++) {
                    // if (handCroupier[i].nodeName.toLowerCase() == 'img') {
                      handCroupier[i].classList.remove("surbrillanceCards213");
                      handCroupier[i].style.boxShadow = "0px 0px 20px 3px rgb(239 59 46 / 90%)";
                      if (toggleCardSimplist) {
                        handCroupier[i].style.borderColor = "rgb(239 59 46 / 80%)";
                      }
                    // }
                  }
                  var handJoueur = document.getElementById("joueur").childNodes;
                  for (var i=0; i < handJoueur.length; i++) {
                    // if (handJoueur[i].nodeName.toLowerCase() == 'img') {
                      handJoueur[i].classList.remove("surbrillanceCards213");
                      handJoueur[i].classList.remove("surbrillanceCardsPair");
                      handJoueur[i].style.boxShadow = "0px 0px 20px 3px rgb(0 255 234 / 60%)";
                      if (toggleCardSimplist) {
                        handJoueur[i].style.borderColor = "rgb(0 255 234 / 70%)";
                      }
                    // }
                  }

                }, 465)


                if ((document.getElementById("phaseChoixAlert") !==null) && (document.getElementById("traitUnderlineInverseChoix") !==null)) {
                  document.getElementById("phaseChoixAlert").remove();
                  document.getElementById("traitUnderlineInverseChoix").remove();
                }

                WinLose = 'WIN';
                resultatCas = 'Big Win';
                console.log("scoreTotalCroupier: " + scoreTotalCroupier);

                setTimeout(function() {
                  $.ajax({
                    async: false,
                    url: "Footers/footerResultat.html",
                    dataType: "html",
                    success: function(response) {
                      $("#container3").html(response);
                      ChoixActif = false;
                      document.getElementById("footerTitle").innerHTML = " - Gains -";

                      document.getElementById("gainExp").innerText = "+100 XP";
    
                      // Mise lockée
                      document.getElementById("miseLockedFooter").innerHTML = miseLocked;
                      document.getElementById("misePairLockedFooter").innerHTML = misePairLocked;
                      document.getElementById("mise213LockedFooter").innerHTML = mise213Locked;
                      // fin
  
                      // Résultat Gains 
                      if ( isConnected == true) {
                        document.getElementById("miseResultat").innerHTML = "<span id='miseResultatTxt'>" + miseLocked + '</span><img src="Images/souBarre.png" class="imagesSouResultat">';
                        document.getElementById("misePairResultat").innerHTML = "<span id='misePairResultatTxt'>" + misePairLocked + '</span><img src="Images/souBarre.png" class="imageSouSideBets">';
                        document.getElementById("mise213Resultat").innerHTML = "<span id='mise213ResultatTxt'>" + mise213Locked + '</span><img src="Images/souBarre.png" class="imageSouSideBets">';
                      }
                      else {
                        document.getElementById("miseResultat").innerHTML = "<span id='miseResultatTxt'>" + miseLocked + '</span><img src="Images/souBlancBarre.png" class="imagesSouResultat">';
                        document.getElementById("misePairResultat").innerHTML = "<span id='misePairResultatTxt'>" + misePairLocked + '</span><img src="Images/souBlancBarre.png" class="imageSouSideBets">';
                        document.getElementById("mise213Resultat").innerHTML = "<span id='mise213ResultatTxt'>" + mise213Locked + '</span><img src="Images/souBlancBarre.png" class="imageSouSideBets">';
                      }   
                      
                      removeSideBetsFooter();

                      setTimeout( function() {
                        IncrementGain(miseLockedMultiplied);
                      }, 1500);
                      setTimeout( function() {
                        IncrDecrGainPair(gainPairBet);
                      }, 1750);
                      setTimeout( function() {
                        IncrDecrGain213(gain213Bet);
                      }, 2000);

                      setTimeout( function() {

                        // gain = miseLocked;
                        gainHistorique = miseLocked;
                        gainFront = (miseLocked*2);
                        gain = (miseLocked*2);
                        ajoutGain(gain);
                        ingame = false;

                        winLose = 1;
                        winLoseDB(winLose);

                        majStreak(WinLose);

                      }, 500);

                      expDB(100);

                      refreshLvl();                      
                      
                      var miseLockedMultiplied = miseLocked * 2;

                      
  
                      document.getElementById("deckContainer").remove();
                      document.getElementById("cardAnim").remove();
                      document.getElementById("parametresPartieDiv").remove();
    
                      document.getElementById("scoreCroupier").style.backgroundColor = "rgb(160 13 27)";
  
                      document.getElementById("scoreCroupier").style.color = "rgba(239,230,230,1)";
                      document.getElementById("scoreJoueur").style.color = "rgb(0 255 234 / 100%)";
  
                      document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)";
                      document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)";
  
                      document.getElementById("scoreCroupier").style.border = "1px solid rgba(255,1,49,0.5)";
                      document.getElementById("scoreJoueur").style.border = "1px solid rgb(0 255 234 / 70%)";
  
                      
                      // Séparateur
                      setTimeout(function() {
                        //Apparition
                        document.getElementById("resultatText").classList.add("resultatTextWin");
                        document.getElementById("separateur").classList.add("styleSeparateurWin");

                        if (SoundMuteBool == false) {
                          audioCoinWin.play();
                        }

                        // Animation scale() qui pop avec fadeIn()
                        document.getElementById("separateur").classList.add("separateurContainerWidthAnim");
                        document.getElementById("separateur").classList.add("fadeInResultat");
                        document.getElementById("separateur").classList.add("scaleBoom");

                        // TEXT
                        document.getElementById("resultatText").innerText = "BIG WIN";
                      }, 250);
                      // Fin séparateur
    
                      popBoutonReload();
      
                      // Bouton Rejouer
                      relancer();
                    }
                  });
                }, 0);
              }



              if (scoreTotalJoueur == scoreTotalCroupier) {

                if ((document.getElementById("phaseChoixAlert") !==null) && (document.getElementById("traitUnderlineInverseChoix") !==null)) {
                  document.getElementById("phaseChoixAlert").remove();
                  document.getElementById("traitUnderlineInverseChoix").remove();
                }

                setTimeout(function() {

                  // Changements du background jauge et Connexion car ressort pas assez:
                  document.getElementById("jaugeContainer").style.backgroundColor = "rgb(131, 131, 131)";
                  // moins marqué: "0 0 black"
                  if (isConnected) {
                    document.getElementById("connectedLine").style.textShadow = "1px 1px black";
                  }
                  else {
                    document.getElementById("credits").style.textShadow = "1px 1px black";
                  }                  
                  if (document.getElementById("toggleHandDiv") !== null) {
                    document.getElementById("toggleHandDiv").style.boxShadow = "0px -1px black";
                  }

                  document.getElementById("footer").style.zIndex = "-1";
                  document.getElementById("header").style.zIndex = "-1";
                  document.getElementById("footer").style.boxShadow = "0px -3px 42vh 30px rgba(164, 167, 0, 0.8)";
                  document.getElementById("header").style.boxShadow = "0px 3px 42vh 30px rgba(164, 167, 0, 0.8)";

                  var handCroupier = document.getElementById("croupier").childNodes;
                  for (var i=0; i < handCroupier.length; i++) {
                    // if (handCroupier[i].nodeName.toLowerCase() == 'img') {
                      handCroupier[i].classList.remove("surbrillanceCards213");
                      handCroupier[i].style.boxShadow = "0px 0px 20px 3px rgb(164 167 0 / 90%)";
                      if (toggleCardSimplist) {
                        handCroupier[i].style.borderColor = "rgb(164 167 0 / 80%)";
                      }

                    // }
                  }
                  var handJoueur = document.getElementById("joueur").childNodes;
                  for (var i=0; i < handJoueur.length; i++) {
                    // if (handJoueur[i].nodeName.toLowerCase() == 'img') {
                      handJoueur[i].classList.remove("surbrillanceCards213");
                      handJoueur[i].classList.remove("surbrillanceCardsPair");
                      handJoueur[i].style.boxShadow = "0px 0px 20px 3px rgb(164 167 0 / 90%)";
                      if (toggleCardSimplist) {
                        handJoueur[i].style.borderColor = "rgb(164 167 0 / 80%)";
                      }
                    // }
                  }
                  if (toggleCardSimplist) {
                    handPush();
                  }


                }, 465)

                
                WinLose = 'PUSH';
                resultatCas = 'Push';
                console.log("scoreTotalCroupier: " + scoreTotalCroupier);

                $.ajax({
                  async: false,
                  url: "Footers/footerResultat.html",
                  dataType: "html",
                  success: function(response) {
                    $("#container3").html(response);
                    ChoixActif = false;
                    document.getElementById("footerTitle").innerHTML = " - Gains -";

                    document.getElementById("gainExp").innerText = "+50 XP";
    
                    // Mise lockée
                    document.getElementById("miseLockedFooter").innerHTML = miseLocked;
                    document.getElementById("misePairLockedFooter").innerHTML = misePairLocked;
                    document.getElementById("mise213LockedFooter").innerHTML = mise213Locked;
                    // fin

                    // Résultat Gains 
                    if ( isConnected == true) {
                      document.getElementById("miseResultat").innerHTML = "<span id='miseResultatTxt'>" + miseLocked + '</span><img src="Images/souBarre.png" class="imagesSouResultat">';
                      document.getElementById("misePairResultat").innerHTML = "<span id='misePairResultatTxt'>" + misePairLocked + '</span><img src="Images/souBarre.png" class="imageSouSideBets">';
                      document.getElementById("mise213Resultat").innerHTML = "<span id='mise213ResultatTxt'>" + mise213Locked + '</span><img src="Images/souBarre.png" class="imageSouSideBets">';
                    }
                    else {
                      document.getElementById("miseResultat").innerHTML = "<span id='miseResultatTxt'>" + miseLocked + '</span><img src="Images/souBlancBarre.png" class="imagesSouResultat">';
                      document.getElementById("misePairResultat").innerHTML = "<span id='misePairResultatTxt'>" + misePairLocked + '</span><img src="Images/souBlancBarre.png" class="imageSouSideBets">';
                      document.getElementById("mise213Resultat").innerHTML = "<span id='mise213ResultatTxt'>" + mise213Locked + '</span><img src="Images/souBlancBarre.png" class="imageSouSideBets">';
                    }

                    
                    removeSideBetsFooter();

                    setTimeout( function() {

                      gainFront = miseLocked;
                      gain = miseLocked;
                      gainHistorique = 0;
                      ajoutGain(gain);
                      ingame = false;

                      majStreak(WinLose);

                    }, 500);

                    setTimeout( function() {
                      IncrDecrGainPair(gainPairBet);
                    }, 1750);
                    setTimeout( function() {
                      IncrDecrGain213(gain213Bet);
                    }, 2000);
                    
                    expDB(50);

                    refreshLvl();


                    document.getElementById("miseResultat").classList.add("addColorToResultatYellow");
                      // Fin résultat Gains
                    
                    document.getElementById("deckContainer").remove();
                    document.getElementById("cardAnim").remove();
                    document.getElementById("parametresPartieDiv").remove();



                    document.getElementById("scoreCroupier").style.color = "rgb(61,61,61)";
                    document.getElementById("scoreJoueur").style.color = "rgb(61,61,61)";

                    document.getElementById("scoreCroupier").style.textShadow = "#0d0d0d 0px 0px 1px";
                    document.getElementById("scoreJoueur").style.textShadow = "#0d0d0d 0px 0px 1px";

                    document.getElementById("scoreCroupier").style.backgroundColor = "rgb(249 217 42)";
                    document.getElementById("scoreJoueur").style.backgroundColor = "rgb(249 217 42)"; 

                    
                    // Séparateur
                    setTimeout(function() {
                      //Apparition
                      document.getElementById("resultatText").classList.add("resultatTextPush");
                      document.getElementById("separateur").classList.add("styleSeparateurPush");
                      document.getElementById("separateur").classList.add("separateurContainerWidthAnim");
                      

                      if (SoundMuteBool == false) {
                        audioPush.play();
                      }

                      // Animation scale() qui pop avec fadeIn()
                      document.getElementById("separateur").classList.add("fadeInResultat");
                      document.getElementById("separateur").classList.add("scaleBoom");

                      // TEXT
                      document.getElementById("resultatText").innerText = "Push";
                    }, 250);
                    // Fin séparateur
  
                    popBoutonReload();
  
                    // Bouton Rejouer
                    relancer();
                  }
                });
  


              }
            }, 1300);

          }  
      }


      function cssMiseEnCours() {
        if (miseEnCours > 0) {
          document.getElementById("miseEnCours").style.right ="15px";
        }
      }


      function popBoutonReload() {
        // Apparition bouton (après PhaseCroupier sinon MessUp si cliqué trop tot)
        setTimeout(function() { 
          document.getElementById("relancer").classList.add("fadeInResultat");
          document.getElementById("relancer").style.visibility = "visible";
          // Disparition boutton onClick
          document.getElementById("relancer").addEventListener("click", function() {
            document.getElementById("reloadPng").classList.add('rotateReloadPng');
            document.getElementById("relancer").classList.add('reloadColorAnim');

            setTimeout( function() { 
              if (document.getElementById("relancer") != null)
               {document.getElementById("relancer").style.visibility = "hidden";}
            }, 1500);
          })
        }, 2000)
      }

      





// Anim: fade out et slide vers le bas (rapide et blur), puis innerHML et anim vers le bas et fadeOut (-blur)
      function refreshMisesEnCours(casMise) {
        if (casMise == "normal") {

          if (isConnected == true) {
            document.getElementById("miseEnCours").classList.add("fadeOutMiseEnCour");
            setTimeout(function() {
              document.getElementById("miseEnCours").classList.remove("fadeOutMiseEnCour");
              document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
              document.getElementById("miseEnCours").classList.add("fadeInMiseEnCour");
            }, 100)
            setTimeout(function() {
              document.getElementById("miseEnCours").classList.remove("fadeInMiseEnCour");
            }, 200);
          }
          else {
            document.getElementById("miseEnCours").classList.add("fadeOutMiseEnCour");
            setTimeout(function() {
              document.getElementById("miseEnCours").classList.remove("fadeOutMiseEnCour");
              document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
              document.getElementById("miseEnCours").classList.add("fadeInMiseEnCour");
            }, 100)
            setTimeout(function() {
              document.getElementById("miseEnCours").classList.remove("fadeInMiseEnCour");
            }, 200);
          }
        }
        else if (casMise == "pair") {
          if (isConnected == true) {
            document.getElementById("sideBet1Mise").classList.add("fadeOutMiseEnCour");
            setTimeout(function() {
              document.getElementById("sideBet1Mise").classList.remove("fadeOutMiseEnCour");
              document.getElementById("sideBet1Mise").innerHTML = "<span>" + misePairEnCours + "</span><img src='Images/souBarre.png' class=\"imageSouSideBets\">";
              document.getElementById("sideBet1Mise").classList.add("fadeInMiseEnCourTest");
            }, 100)
            setTimeout(function() {
              document.getElementById("sideBet1Mise").classList.remove("fadeInMiseEnCourTest");
            }, 200);
          }
          else {
            document.getElementById("sideBet1Mise").classList.add("fadeOutMiseEnCour");
            setTimeout(function() {
              document.getElementById("sideBet1Mise").classList.remove("fadeOutMiseEnCour");
              document.getElementById("sideBet1Mise").innerHTML = "<span>" + misePairEnCours + "</span><img src='Images/souBlancBarre.png' class=\"imageSouSideBets\">";
              document.getElementById("sideBet1Mise").classList.add("fadeInMiseEnCourTest");
            }, 100)
            setTimeout(function() {
              document.getElementById("sideBet1Mise").classList.remove("fadeInMiseEnCourTest");
            }, 200);          
          }
        }
        else if (casMise == "21+3") {
          if (isConnected == true) {
            document.getElementById("sideBet2Mise").classList.add("fadeOutMiseEnCour");
            setTimeout(function() {
              document.getElementById("sideBet2Mise").classList.remove("fadeOutMiseEnCour");
              document.getElementById("sideBet2Mise").innerHTML = "<span>" + mise213EnCours + "</span><img src='Images/souBarre.png' class=\"imageSouSideBets\">";
              document.getElementById("sideBet2Mise").classList.add("fadeInMiseEnCour");
            }, 100)
            setTimeout(function() {
              document.getElementById("sideBet2Mise").classList.remove("fadeInMiseEnCour");
            }, 200);
          }
          else {
            document.getElementById("sideBet2Mise").classList.add("fadeOutMiseEnCour");
            setTimeout(function() {
              document.getElementById("sideBet2Mise").classList.remove("fadeOutMiseEnCour");
              document.getElementById("sideBet2Mise").innerHTML = "<span>" + mise213EnCours + "</span><img src='Images/souBlancBarre.png' class=\"imageSouSideBets\">";
              document.getElementById("sideBet2Mise").classList.add("fadeInMiseEnCour");
            }, 100)
            setTimeout(function() {
              document.getElementById("sideBet2Mise").classList.remove("fadeInMiseEnCour");
            }, 200);          
          }
        }
      }











      function refreshEraseOpacity(toggleSideBet) {
        if (toggleSideBet == "normal") {
          // Si tableau vide, mise == 0 (Oui j'ai fait compliqué)
          if (logTokenValues.length == 0) {
            document.getElementById("retourArriereImg").style.opacity = "0.4";
            document.getElementById("eraseImg").style.opacity = "0.4";
          }
          else {
            document.getElementById("retourArriereImg").style.opacity = "1";
            document.getElementById("eraseImg").style.opacity = "1";
          }  
        }

        if (toggleSideBet == "pair") {
          // Si tableau vide, mise == 0 (Oui j'ai fait compliqué)
          if (logTokenValuesPair.length == 0) {
            document.getElementById("sideBet1Mise").style.left = "0px";

            // Cyan ressort plus que les autres couleurs (need 0.2 mais pop pas adapté)
            document.getElementById("retourArriereImg").style.opacity = "0.4";
            document.getElementById("eraseImg").style.opacity = "0.4";
          }
          else {
            document.getElementById("sideBet1Mise").style.left = "11px";

            document.getElementById("retourArriereImg").style.opacity = "1";
            document.getElementById("eraseImg").style.opacity = "1";
          }  
        }

        if (toggleSideBet == "21+3") {
          // Si tableau vide, mise == 0 (Oui j'ai fait compliqué)
          if (logTokenValues213.length == 0) {
            document.getElementById("sideBet2Mise").style.left = "0px";

            document.getElementById("retourArriereImg").style.opacity = "0.4";
            document.getElementById("eraseImg").style.opacity = "0.4";
          }
          else {
            document.getElementById("sideBet2Mise").style.left = "11px";

            document.getElementById("retourArriereImg").style.opacity = "1";
            document.getElementById("eraseImg").style.opacity = "1";
          }  
        }


      }





      



      function tokensClick() {
        
          document.getElementById("whiteToken").addEventListener("click", function() {

            if (SoundMuteBool == false) {
              audioToken.play();
            }

            if (toggleSideBet == "normal") {
              if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 1) && (miseEnCours < 100)) {
                addLastTokenClickToTab(1);
                miseEnCours += 1;
                refreshEraseOpacity(toggleSideBet);

                refreshMisesEnCours(toggleSideBet);
                miseBoutonStyle();
                cssMiseEnCours();  
              }
            }
            else if (toggleSideBet == "pair") {
              if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 1) && (misePairEnCours < 100)) {
                addLastTokenClickToTabPair(1);
                misePairEnCours += 1;
                refreshEraseOpacity(toggleSideBet);

                refreshMisesEnCours(toggleSideBet);
                miseBoutonStyle();
                cssMiseEnCours();
              }
            }
            else if (toggleSideBet == "21+3") {
              if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 1) && (mise213EnCours < 100)) {
                addLastTokenClickToTab213(1);
                mise213EnCours += 1;
                refreshEraseOpacity(toggleSideBet);

                refreshMisesEnCours(toggleSideBet);
                miseBoutonStyle();
                cssMiseEnCours();
              }
            }

            checkTokenGrised();
          
          })


          document.getElementById("redToken").addEventListener("click", function() {

            if (SoundMuteBool == false) {
              audioToken.play();
            }

            if (toggleSideBet == "normal") {
              if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 5) && (miseEnCours < 100)) {
                addLastTokenClickToTab(5);
                miseEnCours += 5;
                refreshEraseOpacity(toggleSideBet);

                refreshMisesEnCours(toggleSideBet);
                miseBoutonStyle();
                cssMiseEnCours();  
              }
            }
            else if (toggleSideBet == "pair") {
              if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 5) && (misePairEnCours < 100)) {
                addLastTokenClickToTabPair(5);
                misePairEnCours += 5;
                refreshEraseOpacity(toggleSideBet);

                refreshMisesEnCours(toggleSideBet);
                miseBoutonStyle();
                cssMiseEnCours();
              }
            }
            else if (toggleSideBet == "21+3") {
              if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 5) && (mise213EnCours < 100)) {
                addLastTokenClickToTab213(5);
                mise213EnCours += 5;
                refreshEraseOpacity(toggleSideBet);

                refreshMisesEnCours(toggleSideBet);
                miseBoutonStyle();
                cssMiseEnCours();
              }
            }

            checkTokenGrised();

          })
        

          document.getElementById("greenToken").addEventListener("click", function() {

            if (SoundMuteBool == false) {
              audioToken.play();
            }

            if (toggleSideBet == "normal") {
              if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 10) && (miseEnCours < 100)) {
                addLastTokenClickToTab(10);
                miseEnCours += 10;
                refreshEraseOpacity(toggleSideBet);

                refreshMisesEnCours(toggleSideBet);
                miseBoutonStyle();
                cssMiseEnCours();  
              }
            }
            else if (toggleSideBet == "pair") {
              if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 10) && (misePairEnCours < 100)) {
                addLastTokenClickToTabPair(10);
                misePairEnCours += 10;
                refreshEraseOpacity(toggleSideBet);

                refreshMisesEnCours(toggleSideBet);
                miseBoutonStyle();
                cssMiseEnCours();
              }
            }
            else if (toggleSideBet == "21+3") {
              if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 10) && (mise213EnCours < 100)) {
                addLastTokenClickToTab213(10);
                mise213EnCours += 10;
                refreshEraseOpacity(toggleSideBet);

                refreshMisesEnCours(toggleSideBet);
                miseBoutonStyle();
                cssMiseEnCours();
              }
            }

            checkTokenGrised();

          })
       

        document.getElementById("blueToken").addEventListener("click", function() {

          if (SoundMuteBool == false) {
            audioToken.play();
          }

          if (toggleSideBet == "normal") {
            if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 25) && (miseEnCours < 100)) {
              addLastTokenClickToTab(25);
              miseEnCours += 25;
              refreshEraseOpacity(toggleSideBet);

              refreshMisesEnCours(toggleSideBet);
              miseBoutonStyle();
              cssMiseEnCours();  
            }
          }
          else if (toggleSideBet == "pair") {
            if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 25) && (misePairEnCours < 100)) {
              addLastTokenClickToTabPair(25);
              misePairEnCours += 25;
              refreshEraseOpacity(toggleSideBet);

              refreshMisesEnCours(toggleSideBet);
              miseBoutonStyle();
              cssMiseEnCours();
            }
          }
          else if (toggleSideBet == "21+3") {
            if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 25) && (mise213EnCours < 100)) {
              addLastTokenClickToTab213(25);
              mise213EnCours += 25;
              refreshEraseOpacity(toggleSideBet);

              refreshMisesEnCours(toggleSideBet);
              miseBoutonStyle();
              cssMiseEnCours();
            }
          }

          checkTokenGrised();

        })

        

        document.getElementById("blackToken").addEventListener("click", function() {

          if (SoundMuteBool == false) {
            audioToken.play();
          }

          if (toggleSideBet == "normal") {
            if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 100) && (miseEnCours+100 <= 100)) {
              addLastTokenClickToTab(100);
              miseEnCours += 100;
              refreshEraseOpacity(toggleSideBet);

              refreshMisesEnCours(toggleSideBet);
              miseBoutonStyle();
              cssMiseEnCours();  
            }
          }
          else if (toggleSideBet == "pair") {
            if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 100) && (miseEnCours+100 <= 100)) {
              addLastTokenClickToTabPair(100);
              misePairEnCours += 100;
              refreshEraseOpacity(toggleSideBet);

              refreshMisesEnCours(toggleSideBet);
              miseBoutonStyle();
              cssMiseEnCours();
            }
          }
          else if (toggleSideBet == "21+3") {
            if (((credits-miseEnCours-misePairEnCours-mise213EnCours) >= 100) && (miseEnCours+100 <= 100)) {
              addLastTokenClickToTab213(100);
              mise213EnCours += 100;
              refreshEraseOpacity(toggleSideBet);

              refreshMisesEnCours(toggleSideBet);
              miseBoutonStyle();
              cssMiseEnCours();
            }
          }

          checkTokenGrised();

        })

      }

      function addLastTokenClickToTab(value) {
        logTokenValues.unshift(value);
        console.log("Tableau mise Normale: " + logTokenValues);
      }

      function addLastTokenClickToTabPair(value) {
        logTokenValuesPair.unshift(value);
        console.log("Tableau mise Pair: " + logTokenValuesPair);
      }

      function addLastTokenClickToTab213(value) {
        logTokenValues213.unshift(value);
        console.log("Tableau mise 21+3: " + logTokenValues213);
      }
      
      

      // Phase mise
      function phaseMise() {
        isPhaseMise = true;
        miseEnCours = 0;
        document.getElementById("miseEnCours").innerHTML = miseEnCours;


      }

      // Mise SideBets refresh
      function initMiseSideBets() {
        misePairEnCours = 0;
        mise213EnCours = 0;
  
        document.getElementById("sideBet1Mise").innerHTML = misePairEnCours;
        document.getElementById("sideBet1Mise").innerHTML = mise213EnCours;
      }









































      // NOUVELLE CARTE  > CROUPIER (+ScoreTOTAL)
      function addCardCroupier(firstCardCroupierRevealed, shadow) {

        if (firstCardCroupierRevealed == true) {
          distribAnim("croupier");
        }

        nbrCardsCroupier = nbrCardsCroupier + 1;

        // Créer l'élément <img/>
        // var img = document.createElement('img');
        // Pick l'objet et le stock dans une VAR
        let pickedCardObject = cards[Math.floor(Math.random()*cards.length)];
        if (toggleCardSimplist == false) {
          var img = document.createElement('img');
          img.src = pickedCardObject.cardImageURL;
          if (shadow) {
            img.style.boxShadow = "rgb(0 255 234 / 60%) 0px 0px 20px 3px";
          }
          document.getElementById("croupier").style.display = "block";
        }
        else {
          document.getElementById("croupier").style.display = "inline-flex";
          document.getElementById("croupier").style.marginBottom = "17px";

          var imgSimpl = document.createElement("div");
          imgSimpl.setAttribute("class", "imgSimpl1");
          if (shadow) {
            imgSimpl.style.boxShadow = "rgb(0 255 234 / 60%) 0px 0px 20px 3px";
            imgSimpl.style.borderColor = "rgb(0 255 234 / 70%)";
          }

          var imgSimplNbr = document.createElement("span");
          imgSimplNbr.setAttribute("class", "imgSimplNbr");
          if (toggleCardSimplist && shadow) {
            imgSimplNbr.style.color = "rgb(0 255 234 / 70%)";
          }


          var crown = document.createElement("img");
          crown.setAttribute("class", "crown");
          // Inversion crown pour croupier:
          // crown.style.transform = "rotate(-15deg)";
          // Crown en bas pour croupier:
          crown.style.top = "85%";
          // crown.style.transform = "rotate(180deg)";
          crown.src = "Images/crown3.png";


          if (pickedCardObject.cardName == "as") {
            imgSimplNbr.innerHTML = "AS";
            imgSimplNbr.style.fontSize = "2.8em";
          }
          else if (pickedCardObject.cardName == "king") {
            imgSimplNbr.innerHTML = "K";
            imgSimpl.append(crown);
            // ajouter la classe specifique a la tete
          }
          else if (pickedCardObject.cardName == "queen") {
            imgSimplNbr.innerHTML = "Q";
            imgSimpl.append(crown);
            // ajouter la classe specifique a la tete
          }
          else if (pickedCardObject.cardName == "joker") {
            imgSimplNbr.innerHTML = "J";
            // Spécifique font:
            imgSimplNbr.style.fontSize = "2.7em";
            imgSimpl.append(crown);
            // ajouter la classe specifique a la tete
          }
          else {
            imgSimplNbr.innerHTML = pickedCardObject.cardValue;
          }


          var imgSimplSuit = document.createElement("img");
          imgSimplSuit.setAttribute("class", "imgSimplSuit");
          imgSimplSuit.src = "Images/" + pickedCardObject.cardFamily + ".png";
          if (toggleCardSimplist && shadow) {
            imgSimplSuit.src = "Images/" + pickedCardObject.cardFamily + "WinPair.png";
          }

          if ((pickedCardObject.cardFamily == "heart") || (pickedCardObject.cardFamily == "diamond")) {
            // imgSimpl.style.backgroundColor = "rgb(66 11 20)";
            imgSimpl.style.backgroundColor = "rgb(44 11 16)";
            
          }

          var br = document.createElement("br");
          imgSimpl.append(imgSimplNbr);
          imgSimpl.append(br);
          imgSimpl.append(imgSimplSuit);

          
        }


        // Ajout de la carte pickée dans l'array cartesSortiesPartie
        cartesSortiesPartie.unshift(pickedCardObject);
        // Associe la VALUE de la KEY "cardImageUrl", à l'attribut HTML de l'<img> créé
        // img.src = pickedCardObject.cardImageURL;
        // if (shadow) {
        //   img.style.boxShadow = "rgb(0 255 234 / 60%) 0px 0px 20px 3px";
        // }

        // Plutot mettre compteur d'AS croupier, si le compteur > 1, ...

        if (pickedCardObject.cardValue == 1) {
          asCroupier = true;
          asCroupier2 = true;
        }


        // Scores Total Croupier
        scoreTotalCroupier += pickedCardObject.cardValue;

        setTimeout (function() {
          // Refresh FadeInAnimation Score
          var elementScore = document.getElementById("scoreCroupier");
          elementScore.classList.remove("scores");
          void elementScore.offsetWidth;
          elementScore.classList.add("scores");

          //WIP AS 
          if (asCroupier == true) {
            if (scoreTotalCroupier + 10 > 21) {
              document.getElementById('scoreCroupier').innerHTML = scoreTotalCroupier;
            }
            else if ((scoreTotalCroupier + 10) == 21) {
              document.getElementById('scoreCroupier').innerHTML = (scoreTotalCroupier + 10);
              scoreTotalCroupier += 10;
            }
            else if ((scoreTotalCroupier + 10) < 21) {
              if (nbrCardsCroupier > 1) {
                document.getElementById('scoreCroupier').innerHTML = scoreTotalCroupier + "&nbsp;/&nbsp;" + (scoreTotalCroupier + 10);
                scoreTotalCroupier += 10;
              }
              else {
                document.getElementById('scoreCroupier').innerHTML = scoreTotalCroupier + 10;
                scoreTotalCroupier += 10;
              }
              // document.getElementById('scoreCroupier').innerHTML = scoreTotalCroupier + "&nbsp;&nbsp;/&nbsp;&nbsp;" + (scoreTotalCroupier + 10);
              // scoreTotalCroupier += 10;
            }
          }
          else {
            document.getElementById('scoreCroupier').innerHTML = scoreTotalCroupier;
          }
          // FIN

          document.getElementById('scoreCroupier').innerHTML = scoreTotalCroupier;

          document.getElementById('scoreCroupier').classList.add("scoreBorder");
          document.getElementById("scoreCroupier").style.visibility = "visible";
        }, 400);
      
        // Index de la pickedCard pour Splice() {càd remove from array by id}
        var picketCardIndex = cards.indexOf(pickedCardObject);
        cards.splice(picketCardIndex, 1);
        // fin

        // Classe pour le darkMode
        if (toggleCardSimplist == false) {
          img.classList.add("imgPartie", "imgPartieDM");
        }
        // img.classList.add("imgPartie", "imgPartieDM");


        if (SoundMuteBool == false) {
          audioCardSound.play();
        }

        // Ajoute la var img à l'<ul> "#croupier"
        if (toggleCardSimplist == false) {
          document.getElementById("croupier").appendChild(img);
        }
        else {
          document.getElementById("croupier").appendChild(imgSimpl);
        }
        // document.getElementById("croupier").appendChild(img);
        // document.getElementById("croupier").appendChild(pickedCardObject.cardImageSimpl);

        // Si nbrCard > 5, margin negative, puis de plus en plus:
        if (nbrCardsCroupier > 7) {
          var croupierDiv = document.getElementById("croupier").childNodes;
          console.log(croupierDiv);
          for (var i=0; i < croupierDiv.length; i++) {
            // if (croupierDiv[i].nodeName.toLowerCase() == 'img') {
              croupierDiv[i].style.margin = "0em -1.5em";
              if (toggleCardSimplist == false) {
                croupierDiv[i].style.border = "2px solid rgb(36 36 36)";
              }            
            // }
          }
        }
        else if (nbrCardsCroupier == 7) {
          var croupierDiv = document.getElementById("croupier").childNodes;
          console.log(croupierDiv);
          for (var i=0; i < croupierDiv.length; i++) {
            // if (croupierDiv[i].nodeName.toLowerCase() == 'img') {
              croupierDiv[i].style.margin = "0em -1.3em";
              if (toggleCardSimplist == false) {
                croupierDiv[i].style.border = "2px solid rgb(36 36 36)";
              }            
            // }
          }
        }
        else if (nbrCardsCroupier == 6) {
          var croupierDiv = document.getElementById("croupier").childNodes;
          console.log(croupierDiv);
          for (var i=0; i < croupierDiv.length; i++) {
            // if (croupierDiv[i].nodeName.toLowerCase() == 'img') {
              croupierDiv[i].style.margin = "0em -1.2em";
              if (toggleCardSimplist == false) {
                croupierDiv[i].style.border = "2px solid rgb(36 36 36)";
              }
            // }
          }
        }
        else if (nbrCardsCroupier == 5) {
          var croupierDiv = document.getElementById("croupier").childNodes;
          console.log(croupierDiv);
          for (var i=0; i < croupierDiv.length; i++) {
            // if (croupierDiv[i].nodeName.toLowerCase() == 'img') {
              croupierDiv[i].style.margin = "0em -1em";
              if (toggleCardSimplist == false) {
                croupierDiv[i].style.border = "2px solid rgb(36 36 36)";
              }
            // }
          }

        }



        // if (burstJoueur == false) {
          decrementCompteurDeck();
        // }

        // Mise a jour du score High-Low
        if (pickedCardObject.cardValue < 7) {
          setTimeout(function() {
            // plus1();
          }, 500);
        }
        else if (pickedCardObject.cardValue > 9) {
          setTimeout(function() {
            // minus1();
          }, 500);
        }
        else {
          // ScoePop quand même (ou au moins un truc, genre rafraichissement)
        }

        return scoreTotalCroupier;

      }
      // FIN



      function distribAnim(destination) {
        if (destination == "joueur") {
          var cardAnim = document.querySelector("#cardAnim");
          cardAnim.classList.add("animDistribCardJoueur");
  
          setTimeout(function() {
            cardAnim.classList.remove('animDistribCardJoueur');
          }, 550)
        }
        else if (destination == "croupier") {
          if (document.querySelector("#cardAnim") != null) {
            var cardAnim = document.querySelector("#cardAnim");
            cardAnim.classList.add("animDistribCardCroupier");
    
            setTimeout(function() {
              cardAnim.classList.remove('animDistribCardCroupier');
            }, 550)
  
          }
        }


      }



      // NOUVELLE CARTE  > JOUEUR (+ScoreTOTAL)
      function addCardJoueur() {

        // WIP Animation Distribution Carte
        distribAnim("joueur");
        // FIN


        // var img = document.createElement('img');
        let pickedCardObject = cards[Math.floor(Math.random()*cards.length)];

        if (toggleCardSimplist == false) {
          var img = document.createElement('img');
          img.src = pickedCardObject.cardImageURL;
          document.getElementById("croupier").style.display = "block";
        }
        else {
          document.getElementById("croupier").style.display = "inline-flex";
          document.getElementById("croupier").style.marginBottom = "17px";

          var imgSimpl = document.createElement("div");
          imgSimpl.setAttribute("class", "imgSimpl1");

          var imgSimplNbr = document.createElement("span");
          imgSimplNbr.setAttribute("class", "imgSimplNbr");
          imgSimplNbr.innerHTML = pickedCardObject.cardValue;

          var crown = document.createElement("img");
          crown.setAttribute("class", "crown");
          crown.src = "Images/crown3.png";

          if (pickedCardObject.cardName == "as") {
            imgSimplNbr.innerHTML = "AS";
            imgSimplNbr.style.fontSize = "2.8em";
          }
          else if (pickedCardObject.cardName == "king") {
            imgSimplNbr.innerHTML = "K";
            imgSimpl.append(crown);
            // ajouter la classe specifique a la tete
          }
          else if (pickedCardObject.cardName == "queen") {
            imgSimplNbr.innerHTML = "Q";
            imgSimpl.append(crown);
            // ajouter la classe specifique a la tete
          }
          else if (pickedCardObject.cardName == "joker") {
            imgSimplNbr.innerHTML = "J";
            // Spécifique font:
            imgSimplNbr.style.fontSize = "2.7em";
            imgSimpl.append(crown);
            // ajouter la classe specifique a la tete
          }
          else {
            imgSimplNbr.innerHTML = pickedCardObject.cardValue;
          }

          var imgSimplSuit = document.createElement("img");
          imgSimplSuit.setAttribute("class", "imgSimplSuit");
          imgSimplSuit.src = "Images/" + pickedCardObject.cardFamily + ".png";

          if ((pickedCardObject.cardFamily == "heart") || (pickedCardObject.cardFamily == "diamond")) {
            // imgSimpl.style.backgroundColor = "rgb(66 11 20)";
            imgSimpl.style.backgroundColor = "rgb(44 11 16)";
          }

          var br = document.createElement("br");

          imgSimpl.append(imgSimplNbr);
          imgSimpl.append(br);
          imgSimpl.append(imgSimplSuit);


        }
        // Ajout de la carte pickée dans l'array cartesSortiesPartie
        cartesSortiesPartie.unshift(pickedCardObject);
        cartesJoueurSortiesPartie.unshift(pickedCardObject);
        // console.log("Tableau des cartes sorties *partie*: " + JSON.stringify(cartesSortiesPartie));
        // Association de l'url image à la carte pickée
        // img.src = pickedCardObject.cardImageURL;
        

        //WIP AS
        if (pickedCardObject.cardValue == 1) {
          asJoueur = true;
        }
        //FIN

        scoreTotalJoueur += pickedCardObject.cardValue;

        // MàJ score avec petit delai (et refresh CSS)
        setTimeout(function() {
          var elementScore = document.getElementById("scoreJoueur");
          elementScore.classList.remove("scores");
          void elementScore.offsetWidth;
          elementScore.classList.add("scores");


          // PB quand jai un AS parmis les 2 premieres et que j'obtioent un 21 avec la 3eme card, ca stand pas (si AS = 3eme cards, tout marche je crois)
          // VOIR aussi le check21noBj

          //WIP AS 
          if (asJoueur == true) {
            if ((scoreTotalJoueur + 10) > 21) {
              document.getElementById('scoreJoueur').innerHTML = scoreTotalJoueur;
            }
            else if ((scoreTotalJoueur + 10) == 21) {
              document.getElementById('scoreJoueur').innerHTML = (scoreTotalJoueur + 10);
              // 21 hors BJ vu qu'on est dans le addCardJoueur(hit), ducoup ajouter le lancerPhaseCroupier() ici direct ??
              // EDIT: il y a deja un check 21 hors BJ dans le addCardJourur(hit), avec un lancerPhaseCroupier() dedans
              // A test

              // ici Le check21horsBJ() est exécuté (appelé plus bas, conditions similaires)
            }
            else if ((scoreTotalJoueur + 10) < 21) {
              document.getElementById('scoreJoueur').innerHTML = scoreTotalJoueur + "&nbsp/&nbsp;" + (scoreTotalJoueur + 10);
              // et scoreJoueur (la variable) = scoreJoueur + 10 ??
              scoreJoueur += 10;
            }
          }
          else {
            document.getElementById('scoreJoueur').innerHTML = scoreTotalJoueur;
          }
          //FIN

          document.getElementById('scoreJoueur').classList.add("scoreBorder");
          document.getElementById("scoreJoueur").style.visibility = "visible";
        }, 400);

        var picketCardIndex = cards.indexOf(pickedCardObject);
        cards.splice(picketCardIndex, 1);

        // Classe pour le darkMode
        if (toggleCardSimplist == false) {
          img.classList.add("imgPartie", "imgPartieDM");
        }
        // img.classList.add("imgPartie", "imgPartieDM");

        if (SoundMuteBool == false) {
          audioCardSound.play();
        }

        nbrCardsJoueur = nbrCardsJoueur + 1;



        setTimeout(function() {

          if (toggleCardSimplist == false) {
            document.getElementById("joueur").appendChild(img);
          }
          else {
            document.getElementById("joueur").appendChild(imgSimpl);
          }
          // document.getElementById("joueur").appendChild(img);
          // document.getElementById("joueur").appendChild(pickedCardObject.cardImageSimpl);
          // Ptit flash border anim lorsque la carte append


          // WIP: Eventail
          // Mettre un case plutot (plus opti?)
          if (nbrCardsJoueur > 7) {

            var joueurDiv = document.getElementById("joueur").childNodes;
              
            for (var i=0; i < joueurDiv.length; i++) {
              // if (joueurDiv[i].nodeName.toLowerCase() == 'img') {
                joueurDiv[i].style.margin = "0em -1.8em";
                if (toggleCardSimplist == false) {
                  joueurDiv[i].style.border = "2px solid rgb(36 36 36)";
                }
              // }
            }

            document.getElementById("joueur").style.bottom = "273px";
            document.getElementById("scoreJoueur").style.bottom = "465px";

            if (toggleHand == true) {

            }

          }
          else if (nbrCardsJoueur == 7) {

            var joueurDiv = document.getElementById("joueur").childNodes;

            for (var i=0; i < joueurDiv.length; i++) {
              // if (joueurDiv[i].nodeName.toLowerCase() == 'img') {
                joueurDiv[i].style.margin = "0em -1.6em";
                if (toggleCardSimplist == false) {
                  joueurDiv[i].style.border = "2px solid rgb(36 36 36)";
                }
              // }
            }

            document.getElementById("joueur").style.bottom = "273px";
            document.getElementById("scoreJoueur").style.bottom = "465px";

            if (toggleHand == true) {
              joueurDiv[0].style.transform = "rotate(-26deg)";
              joueurDiv[0].style.position = "relative";
              joueurDiv[0].style.bottom = "-39px";

              joueurDiv[1].style.transform = "rotate(-16deg)";
              joueurDiv[1].style.position = "relative";
              joueurDiv[1].style.bottom = "-15px";

              joueurDiv[2].style.transform = "rotate(-7deg)";
              joueurDiv[2].style.position = "relative";
              joueurDiv[2].style.bottom = "-5px";

              joueurDiv[3].style.transform = "rotate(0deg)";
              joueurDiv[3].style.position = "relative";
              joueurDiv[3].style.bottom = "0px";

              joueurDiv[4].style.transform = "rotate(6deg)";
              joueurDiv[4].style.position = "relative";
              joueurDiv[4].style.bottom = "-5px";

              joueurDiv[5].style.transform = "rotate(15deg)";
              joueurDiv[5].style.position = "relative";
              joueurDiv[5].style.bottom = "-20px";

              joueurDiv[6].style.transform = "rotate(25deg)";
              joueurDiv[6].style.position = "relative";
              joueurDiv[6].style.bottom = "-44px";
            }

          }
          else if (nbrCardsJoueur == 6) {

            var joueurDiv = document.getElementById("joueur").childNodes;

            for (var i=0; i < joueurDiv.length; i++) {
              // if (joueurDiv[i].nodeName.toLowerCase() == 'img') {
                joueurDiv[i].style.margin = "0em -1.4em";
                if (toggleCardSimplist == false) {
                  joueurDiv[i].style.border = "2px solid rgb(36 36 36)";
                }
              // }
            }

            document.getElementById("joueur").style.bottom = "273px";
            document.getElementById("scoreJoueur").style.bottom = "465px";

            // Marche pas (class anim oblige)
            document.getElementById("footer").style.borderRadius = "50% 50% 0px 0px / 104px !important";

            if (toggleHand == true) {
              joueurDiv[0].style.transform = "rotate(-21deg)";
              joueurDiv[0].style.position = "relative";
              joueurDiv[0].style.bottom = "-25px";

              joueurDiv[1].style.transform = "rotate(-12deg)";
              joueurDiv[1].style.position = "relative";
              joueurDiv[1].style.bottom = "-5px";

              joueurDiv[2].style.transform = "rotate(-3deg)";
              joueurDiv[2].style.position = "relative";
              joueurDiv[2].style.bottom = "2px";

              joueurDiv[3].style.transform = "rotate(3deg)";
              joueurDiv[3].style.position = "relative";
              joueurDiv[3].style.bottom = "2px";

              joueurDiv[4].style.transform = "rotate(12deg)";
              joueurDiv[4].style.position = "relative";
              joueurDiv[4].style.bottom = "-8px";

              joueurDiv[5].style.transform = "rotate(21deg)";
              joueurDiv[5].style.position = "relative";
              joueurDiv[5].style.bottom = "-28px";
            }

          }
          else if (nbrCardsJoueur == 5) {

            var joueurDiv = document.getElementById("joueur").childNodes;

            for (var i=0; i < joueurDiv.length; i++) {
              // if (joueurDiv[i].nodeName.toLowerCase() == 'img') {
                joueurDiv[i].style.margin = "0em -1.2em";
                if (toggleCardSimplist == false) {
                  joueurDiv[i].style.border = "2px solid rgb(36 36 36)";
                }
              // }
            }

            document.getElementById("joueur").style.bottom = "273px";
            document.getElementById("scoreJoueur").style.bottom = "465px";

            // Marche pas (class anim oblige)
            document.getElementById("footer").style.borderRadius = "50% 50% 0px 0px / 104px !important";

            if (toggleHand == true) {
              joueurDiv[0].style.transform = "rotate(-16deg)";
              joueurDiv[0].style.position = "relative";
              joueurDiv[0].style.bottom = "-25px";

              joueurDiv[1].style.transform = "rotate(-7deg)";
              joueurDiv[1].style.position = "relative";
              joueurDiv[1].style.bottom = "-5px";

              joueurDiv[2].style.transform = "rotate(0deg)";
              joueurDiv[2].style.position = "relative";
              joueurDiv[2].style.bottom = "-0px";

              joueurDiv[3].style.transform = "rotate(6deg)";
              joueurDiv[3].style.position = "relative";
              joueurDiv[3].style.bottom = "-6px";

              joueurDiv[4].style.transform = "rotate(15deg)";
              joueurDiv[4].style.position = "relative";
              joueurDiv[4].style.bottom = "-23px";
            }

          }
          else if (nbrCardsJoueur == 4) {

            var joueurDiv = document.getElementById("joueur").childNodes;

            for (var i=0; i < joueurDiv.length; i++) {
              // if (joueurDiv[i].nodeName.toLowerCase() == 'img') {
                joueurDiv[i].style.margin = "0em -1em";
                if (toggleCardSimplist == false) {
                  joueurDiv[i].style.border = "2px solid rgb(36 36 36)";
                }
            // }
            }

            document.getElementById("joueur").style.bottom = "273px";
            document.getElementById("scoreJoueur").style.bottom = "465px";

            // Marche pas (class anim oblige)
            document.getElementById("footer").style.borderRadius = "50% 50% 0px 0px / 104px !important";

            if (toggleHand == true) {
              joueurDiv[0].style.transform = "rotate(-16deg)";
              joueurDiv[0].style.position = "relative";
              joueurDiv[0].style.bottom = "-25px";

              joueurDiv[1].style.transform = "rotate(-7deg)";
              joueurDiv[1].style.position = "relative";
              joueurDiv[1].style.bottom = "-5px";

              joueurDiv[2].style.transform = "rotate(6deg)";
              joueurDiv[2].style.position = "relative";
              joueurDiv[2].style.bottom = "-6px";

              joueurDiv[3].style.transform = "rotate(15deg)";
              joueurDiv[3].style.position = "relative";
              joueurDiv[3].style.bottom = "-23px";
            }

          }
          else if (nbrCardsJoueur == 3)  {

            var joueurDiv = document.getElementById("joueur").childNodes;

            for (var i=0; i < joueurDiv.length; i++) {
              // if (joueurDiv[i].nodeName.toLowerCase() == 'img') {
                joueurDiv[i].style.margin = "0em -0.8em";
                if (toggleCardSimplist == false) {
                  joueurDiv[i].style.border = "2px solid rgb(36 36 36)";
                }
              // }
            }
            document.getElementById("joueur").style.bottom = "273px";
            document.getElementById("scoreJoueur").style.bottom = "465px";

            // Marche pas (class anim oblige)
            document.getElementById("footer").style.borderRadius = "50% 50% 0px 0px / 104px !important";

            if (toggleHand == true) {
              joueurDiv[0].style.transform = "rotate(-16deg)";
              joueurDiv[0].style.position = "relative";
              joueurDiv[0].style.bottom = "-14px";          

              joueurDiv[1].style.transform = "rotate(0deg)";
              joueurDiv[1].style.position = "relative";
              joueurDiv[1].style.bottom = "-0px";

              joueurDiv[2].style.transform = "rotate(15deg)";
              joueurDiv[2].style.position = "relative";
              joueurDiv[2].style.bottom = "-17px";
            }
          }


          // Affichage du boutonToggle (1 unique fois)
          if ((nbrCardsJoueur > 2) && (firstProc == false)) {
            firstProc = true;

            var toggleHandDiv = document.createElement("div");
            toggleHandDiv.setAttribute("id", "toggleHandDiv");

            if (toggleHand == true) {
              var arrowLeft = document.createElement("span");
              arrowLeft.setAttribute("id", "arrowLeft");
              arrowLeft.classList.add("arrowsToggleHand");
              arrowLeft.innerHTML = "&#8678;";
              var toggleHandImg = document.createElement("img");
              toggleHandImg.setAttribute("id", "toggleHandImg");
              var arrowRight = document.createElement("span");
              arrowRight.setAttribute("id", "arrowRight");
              arrowRight.classList.add("arrowsToggleHand");
              arrowRight.innerHTML = "&#8680;";
            }
            else if (toggleHand == false) {
              var arrowLeft = document.createElement("span");
              arrowLeft.setAttribute("id", "arrowLeft");
              arrowLeft.classList.add("arrowsToggleHand");
              arrowLeft.innerHTML = "&#8680;";
              var toggleHandImg = document.createElement("img");
              toggleHandImg.setAttribute("id", "toggleHandImg");
              toggleHandImg.style.content = "url('Images/toggleHandImg4.png')";
              var arrowRight = document.createElement("span");
              arrowRight.setAttribute("id", "arrowRight");
              arrowRight.classList.add("arrowsToggleHand");
              arrowRight.innerHTML = "&#8678;";
            }

            toggleHandDiv.appendChild(arrowLeft);
            toggleHandDiv.appendChild(toggleHandImg);
            toggleHandDiv.appendChild(arrowRight);

            document.getElementById("footer").appendChild(toggleHandDiv);
          // }

            // Listener toggle hand
            if (document.getElementById("toggleHandDiv") !== null) {
              document.getElementById("toggleHandDiv").addEventListener("click", function() {

                if (toggleHand == true) {
                  toggleHand = false;
                  //Changement de l'affichage du bouton: (petite anim fadeOut/fadeIn ?)
                  document.getElementById("toggleHandImg").style.content = "url('Images/toggleHandImg4.png')";
                  document.getElementById("arrowRight").innerHTML = "&#8678;";
                  document.getElementById("arrowLeft").innerHTML = "&#8680;";

                  var joueurDiv = document.getElementById("joueur").childNodes;
                  for (var i=0; i < joueurDiv.length; i++) {
                    // if (joueurDiv[i].nodeName.toLowerCase() == 'img') {
                      joueurDiv[i].style.margin = "0em -0.8em";
                      if (toggleCardSimplist == false) {
                        joueurDiv[i].style.border = "2px solid rgb(36 36 36)";
                      }
                      joueurDiv[i].style.transform = "";
                      joueurDiv[i].style.bottom = "";
                    // }
                  }
                }

                else if (toggleHand == false) {
                  toggleHand = true;

                  // Remmettre l'affichage eventail pour les cartes deja présentes
                  //Changement de l'affichage du bouton: (petite anim fadeOut/fadeIn ?)
                  document.getElementById("toggleHandImg").style.content = "url('Images/toggleAlignImg4.png')";
                  document.getElementById("arrowRight").innerHTML = "&#8680;";
                  document.getElementById("arrowLeft").innerHTML = "&#8678;";

                  var joueurDiv = document.getElementById("joueur").childNodes;
                  // for (var i=0; i < joueurDiv.length; i++) {
                  //   if (joueurDiv[i].nodeName.toLowerCase() == 'img') {

                  if (nbrCardsJoueur == 3) {
                    for (var i=0; i < joueurDiv.length; i++) {
                      // if (joueurDiv[i].nodeName.toLowerCase() == 'img') {
                          joueurDiv[i].style.margin = "0em -0.8em";
                      // }
                    }

                    joueurDiv[0].style.transform = "rotate(-16deg)";
                    joueurDiv[0].style.position = "relative";
                    joueurDiv[0].style.bottom = "-14px";          
      
                    joueurDiv[1].style.transform = "rotate(0deg)";
                    joueurDiv[1].style.position = "relative";
                    joueurDiv[1].style.bottom = "-0px";
      
                    joueurDiv[2].style.transform = "rotate(15deg)";
                    joueurDiv[2].style.position = "relative";
                    joueurDiv[2].style.bottom = "-17px";        
                  }
                  else if (nbrCardsJoueur == 4) {
                    for (var i=0; i < joueurDiv.length; i++) {
                      // if (joueurDiv[i].nodeName.toLowerCase() == 'img') {
                        joueurDiv[i].style.margin = "0em -1em";
                      // }
                    }

                    joueurDiv[0].style.transform = "rotate(-16deg)";
                    joueurDiv[0].style.position = "relative";
                    joueurDiv[0].style.bottom = "-25px";
      
                    joueurDiv[1].style.transform = "rotate(-7deg)";
                    joueurDiv[1].style.position = "relative";
                    joueurDiv[1].style.bottom = "-5px";
      
                    joueurDiv[2].style.transform = "rotate(6deg)";
                    joueurDiv[2].style.position = "relative";
                    joueurDiv[2].style.bottom = "-6px";
      
                    joueurDiv[3].style.transform = "rotate(15deg)";
                    joueurDiv[3].style.position = "relative";
                    joueurDiv[3].style.bottom = "-23px";        
                  }
                  else if (nbrCardsJoueur == 5) {
                    for (var i=0; i < joueurDiv.length; i++) {
                      // if (joueurDiv[i].nodeName.toLowerCase() == 'img') {
                        joueurDiv[i].style.margin = "0em -1.2em";
                      // }
                    }

                    joueurDiv[0].style.transform = "rotate(-16deg)";
                    joueurDiv[0].style.position = "relative";
                    joueurDiv[0].style.bottom = "-25px";
      
                    joueurDiv[1].style.transform = "rotate(-7deg)";
                    joueurDiv[1].style.position = "relative";
                    joueurDiv[1].style.bottom = "-5px";
      
                    joueurDiv[2].style.transform = "rotate(0deg)";
                    joueurDiv[2].style.position = "relative";
                    joueurDiv[2].style.bottom = "-0px";
      
                    joueurDiv[3].style.transform = "rotate(6deg)";
                    joueurDiv[3].style.position = "relative";
                    joueurDiv[3].style.bottom = "-6px";
      
                    joueurDiv[4].style.transform = "rotate(15deg)";
                    joueurDiv[4].style.position = "relative";
                    joueurDiv[4].style.bottom = "-23px";        
                  }
                  else if (nbrCardsJoueur == 6) {
                    for (var i=0; i < joueurDiv.length; i++) {
                      // if (joueurDiv[i].nodeName.toLowerCase() == 'img') {
                        joueurDiv[i].style.margin = "0em -1.4em";
                      // }
                    }

                    joueurDiv[0].style.transform = "rotate(-21deg)";
                    joueurDiv[0].style.position = "relative";
                    joueurDiv[0].style.bottom = "-25px";
      
                    joueurDiv[1].style.transform = "rotate(-12deg)";
                    joueurDiv[1].style.position = "relative";
                    joueurDiv[1].style.bottom = "-5px";
      
                    joueurDiv[2].style.transform = "rotate(-3deg)";
                    joueurDiv[2].style.position = "relative";
                    joueurDiv[2].style.bottom = "2px";
      
                    joueurDiv[3].style.transform = "rotate(3deg)";
                    joueurDiv[3].style.position = "relative";
                    joueurDiv[3].style.bottom = "2px";
      
                    joueurDiv[4].style.transform = "rotate(12deg)";
                    joueurDiv[4].style.position = "relative";
                    joueurDiv[4].style.bottom = "-8px";
      
                    joueurDiv[5].style.transform = "rotate(21deg)";
                    joueurDiv[5].style.position = "relative";
                    joueurDiv[5].style.bottom = "-28px";        
                  }
                  else if (nbrCardsJoueur == 7) {
                    for (var i=0; i < joueurDiv.length; i++) {
                      // if (joueurDiv[i].nodeName.toLowerCase() == 'img') {
                        joueurDiv[i].style.margin = "0em -1.6em";
                      // }
                    }

                    joueurDiv[0].style.transform = "rotate(-26deg)";
                    joueurDiv[0].style.position = "relative";
                    joueurDiv[0].style.bottom = "-39px";
      
                    joueurDiv[1].style.transform = "rotate(-16deg)";
                    joueurDiv[1].style.position = "relative";
                    joueurDiv[1].style.bottom = "-15px";
      
                    joueurDiv[2].style.transform = "rotate(-7deg)";
                    joueurDiv[2].style.position = "relative";
                    joueurDiv[2].style.bottom = "-5px";
      
                    joueurDiv[3].style.transform = "rotate(0deg)";
                    joueurDiv[3].style.position = "relative";
                    joueurDiv[3].style.bottom = "-0px";
      
                    joueurDiv[4].style.transform = "rotate(6deg)";
                    joueurDiv[4].style.position = "relative";
                    joueurDiv[4].style.bottom = "-5px";
      
                    joueurDiv[5].style.transform = "rotate(15deg)";
                    joueurDiv[5].style.position = "relative";
                    joueurDiv[5].style.bottom = "-20px";
      
                    joueurDiv[6].style.transform = "rotate(25deg)";
                    joueurDiv[6].style.position = "relative";
                    joueurDiv[6].style.bottom = "-44px";        
                  }
                  else if (nbrCardsJoueur > 7) {

                  }
                }
              })
            }
          }

          decrementCompteurDeck()

          // checkBurstJoueur();
          if (checkBurstJoueur() == true) {
            setTimeout(function() {

              // Changements du background jauge et Connexion car ressort pas assez:
              document.getElementById("jaugeContainer").style.backgroundColor = "rgb(105, 105, 105)";
              // moins marqué: "0 0 black"
              if (isConnected) {
                document.getElementById("connectedLine").style.textShadow = "1px 1px black";
              }
              else {
                document.getElementById("credits").style.textShadow = "1px 1px black";
              }              
              if (document.getElementById("toggleHandDiv") !== null) {
                document.getElementById("toggleHandDiv").style.boxShadow = "0px -1px black";
              }

              document.getElementById("footer").style.zIndex = "-1";
              document.getElementById("header").style.zIndex = "-1";
              document.getElementById("footer").style.boxShadow = "0px -3px 42vh 30px rgba(239, 59, 46, 0.9)";
              document.getElementById("header").style.boxShadow = "0px 3px 42vh 30px rgba(0, 255, 234, 0.55)";

              if (toggleCardSimplist) {
                handWin("croupier");
                handBust("joueur");
              }

              var handCroupier = document.getElementById("croupier").childNodes;
              for (var i=0; i < handCroupier.length; i++) {
                // if (handCroupier[i].nodeName.toLowerCase() == 'img') {
                  handCroupier[i].classList.remove("surbrillanceCards213");
                  handCroupier[i].style.boxShadow = "0px 0px 20px 3px rgba(0, 255, 234, 0.60)";
                  if (toggleCardSimplist) {
                    handCroupier[i].style.borderColor = "rgba(0, 255, 234, 0.70)";
                  }

                // }
              }
              var handJoueur = document.getElementById("joueur").childNodes;
              for (var i=0; i < handJoueur.length; i++) {
                // if (handJoueur[i].nodeName.toLowerCase() == 'img') {
                  handJoueur[i].classList.remove("surbrillanceCards213");
                  handJoueur[i].classList.remove("surbrillanceCardsPair");
                  handJoueur[i].style.boxShadow = "0px 0px 20px 3px rgba(239, 59, 46, 0.9)";
                  if (toggleCardSimplist) {
                    handJoueur[i].style.borderColor = "rgba(239, 59, 46, 0.8)";
                  }
                // }
              }

            }, 1650)
          }

          // check21noBJ();
          if ((scoreTotalJoueur == 21) && (nbrCardsJoueur > 2)) {
            if ((document.getElementById("phaseChoixAlert") !==null) && (document.getElementById("traitUnderlineInverseChoix") !==null)) {
              document.getElementById("phaseChoixAlert").remove();
              document.getElementById("traitUnderlineInverseChoix").remove();
            }
            // La phase Croupier se lance mais le footer change pas (parce que ducoup on est encore dans le addCardJoueur ?):/
            // rajout manuelle du load footer à test :
            setTimeout(function() {
              $.ajax({
                async: false,
                url: "Footers/footerDistribution.html",
                dataType: "html",
                success: function(response) {
                  $("#chipsContainer").html(response);
                  ChoixActif = false;
                  document.getElementById("footerTitle").innerHTML = " - En attente -";
                }
              });
              setTimeout(function() {
                setTimeout(function() {
                  document.getElementById("footer").style.boxShadow = "";
                  document.getElementById("header").style.boxShadow = "0px 3px 13vh 5px rgba(128, 128, 128, 0.55)";
                }, 150);

                lancerPhaseCroupier(); 
              }, 550);
            }, 470);
          }

          // Check BJ
          if (checkBJjoueur() == true) {
            setTimeout(function() {

              // Changements du background jauge et Connexion car ressort pas assez:
              document.getElementById("jaugeContainer").style.backgroundColor = "rgb(131, 131, 131)";
              if (isConnected) {
                document.getElementById("connectedLine").style.textShadow = "1px 1px black";
              }
              else {
                document.getElementById("credits").style.textShadow = "1px 1px black";
              }
              if (document.getElementById("toggleHandDiv") !== null) {
                document.getElementById("toggleHandDiv").style.boxShadow = "0px -1px black";
              }

              document.getElementById("footer").style.zIndex = "-1";
              document.getElementById("header").style.zIndex = "-1";
              document.getElementById("footer").style.boxShadow = "0px -3px 42vh 30px rgba(255, 55, 250, 0.9)";
              document.getElementById("header").style.boxShadow = "0px 3px 42vh 30px rgba(239, 59, 46, 0.9)";  

              if (toggleCardSimplist) {
                handBJ("joueur");
                // handBust("croupier");
              }
              
              var handCroupier = document.getElementById("croupier").childNodes;
              for (var i=0; i < handCroupier.length; i++) {
                // if (handCroupier[i].nodeName.toLowerCase() == 'img') {
                  handCroupier[i].classList.remove("surbrillanceCards213");
                  handCroupier[i].style.boxShadow = "0px 0px 20px 3px rgba(239, 59, 46, 0.9)";
                  if (toggleCardSimplist) {
                    handCroupier[i].style.borderColor = "rgba(239, 59, 46, 0.8)";
                  }
                // }
              }
              var handJoueur = document.getElementById("joueur").childNodes;
              for (var i=0; i < handJoueur.length; i++) {
                // if (handJoueur[i].nodeName.toLowerCase() == 'img') {
                  handJoueur[i].classList.remove("surbrillanceCards213");
                  handJoueur[i].classList.remove("surbrillanceCardsPair");
                  handJoueur[i].style.boxShadow = "0px 0px 20px 3px rgba(255, 55, 250, 0.9)";
                  if (toggleCardSimplist) {
                    handJoueur[i].style.borderColor = "rgba(255, 55, 250, 0.9)";
                  }
                // }
              }
            }, 1600)
          }
  
        }, 470);


        
        // Mise a jour du score High-Low
        if (pickedCardObject.cardValue < 7) {
          setTimeout(function() {
            // plus1();
          }, 500);
        }
        else if (pickedCardObject.cardValue > 9) {
          setTimeout(function() {
            // minus1();
          }, 500);
        }
        else {
          // ScoePop quand même (ou au moins un truc, genre rafraichissement)
        }
        
      }


      function decrementCompteurDeck() {
        compteurDeck = compteurDeck - 1;
        if (document.getElementById("compteurDeck") !== null) {
          document.getElementById("compteurDeck").innerHTML = compteurDeck;
        }
      }


      // Envoi Defaite/Victoire +1 pour calcul ratio
      function winLoseDB(winLose) {
        var winLoseToPhp = {};
        winLoseToPhp.value = winLose;


        $.ajax({
          url: "setWinLose.php",
          method: "post",
          data: winLoseToPhp,
          success: function(res) {
            console.log("(JS) AJAX POST var winLose(" + res + ") vers setWinLose.php réussi");
          }
        })
      }
      // Fin ratio







      function historiqueDB(WinLose, resultatCas, gainHistorique) {

        // Ancienne méthode: fuseau horaire non pris en compte
        // var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        // Formattage du toLocalString (yyyy/mm/dd -> dd-mm-yyyy  + hh:mm:ss) date pour SQL DATETIME
        var date = new Date().toLocaleString().replace("/", "-").replace("/", "-").replace(",", "");
          var dd = date.slice(0, 2);
          var mm = date.slice(3, 5);
          var yyyy = date.slice(6, 10);
          var hh = date.slice(11, 13);
          var mi = date.slice(14, 16);
          var ss = date.slice(17, 19);
        date = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss;



        // Array envoyé au php
        var historiqueToPhp = [];
        historiqueToPhp[0] = WinLose;
        historiqueToPhp[1] = resultatCas;
        historiqueToPhp[2] = gainHistorique;
        historiqueToPhp[3] = scoreTotalJoueur;
        historiqueToPhp[4] = scoreTotalCroupier;
        historiqueToPhp[5] = doubleBool;
        historiqueToPhp[6] = date;
        
        console.log("Array JS: [" + historiqueToPhp + "]");

        // Envoi de l'array
        if (isConnected == true) {
          $.ajax({
            url: "setHistorique.php",
            method: "post",
            data: { vArray: historiqueToPhp },
            success: function() {
              console.log("ajax:OnSuccess setHistorique.php");
            }
          });
        }
        else {
          $.ajax({
            url: "setHistoriqueInvite.php",
            method: "post",
            data: { vArray: historiqueToPhp },
            success: function() {
            }
          });
        }
        
      }





      function historiqueInvite(WinLose, resultatCas, gainHistorique) {

        // Ancienne méthode: fuseau horaire non pris en compte
        // var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        // Formattage du toLocalString (yyyy/mm/dd -> dd-mm-yyyy  + hh:mm:ss) date pour SQL DATETIME
        var date = new Date().toLocaleString().replace("/", "-").replace("/", "-").replace(",", "");
          var dd = date.slice(0, 2);
          var mm = date.slice(3, 5);
          var yyyy = date.slice(6, 10);
          var hh = date.slice(11, 13);
          var mi = date.slice(14, 16);
          var ss = date.slice(17, 19);
        date = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss;

        // Array déclaré dans le newGame 
        var historiqueInviteLine = [];
        historiqueInviteLine[0] = WinLose;
        historiqueInviteLine[1] = resultatCas;
        historiqueInviteLine[2] = gainHistorique;
        historiqueInviteLine[3] = scoreTotalJoueur;
        historiqueInviteLine[4] = scoreTotalCroupier;
        historiqueInviteLine[5] = doubleBool;
        historiqueInviteLine[6] = date;

        historiqueInviteArray.push(historiqueInviteLine);

        // Stockage de l'array: https://stackoverflow.com/questions/40200350/keep-data-after-page-refresh
        // if (typeof(Storage) !== "undefined") {
        //   localStorage.setItem("historiqueInviteArrayStored", historiqueInviteArray);
        // } else {
        //   // Sorry! No Web Storage support
        // }

        console.log("Array JS Line: [" + historiqueInviteLine + "]");
        console.log("Array JS Total: [" + historiqueInviteArray + "]");
      }












      // WIP Streak
        function majStreak(winLose) {

          var resultatStreak;

          if (winLose == "WIN") {
            resultatStreak = 1;
            var progressBeforeRefresh = document.getElementById('dataProgress').getAttribute("data-progress");
            var preogressNumBeforeRefresh = parseInt(document.getElementById("streakNumber").innerHTML);

            // Jamais entré car refresh autre part: (donc pas de verifs ce qui cause le pb refresh streak 0 over 10)
            if (document.getElementById('dataProgress').setAttribute("data-progress", parseInt(progressBeforeRefresh) + 10) <= 100 ) {
              document.getElementById('dataProgress').setAttribute("data-progress", parseInt(progressBeforeRefresh) + 10);
            }

            // Refresh du StreakNbr
            setTimeout( function() {
              // Vérif front streak>10 
              if ((preogressNumBeforeRefresh + 1) < 11 ) {
                document.getElementById("streakNumber").innerText = (preogressNumBeforeRefresh + 1);

                if (isConnected == true) {
                  let newDataProgress = (preogressNumBeforeRefresh + 1);
                  let streakPourcentage = (newDataProgress*10).toString();
      
                  document.getElementById('dataProgress').setAttribute("data-progress", streakPourcentage);
                }
                else {
                  let newDataProgress = (preogressNumBeforeRefresh + 1);
                  let streakPourcentage = (newDataProgress*10).toString();
      
                  document.getElementById('dataProgress').setAttribute("data-progress", streakPourcentage);
                }
  
  
              }
              else {
                document.getElementById("streakNumber").innerText = (preogressNumBeforeRefresh);
              }

            }, 500)

            refreshAnimJauge();
          }


          else if (winLose == "BJ") {
            resultatStreak = 1;
            var progressBeforeRefresh = document.getElementById('dataProgress').getAttribute("data-progress");
            var preogressNumBeforeRefresh = parseInt(document.getElementById("streakNumber").innerHTML);

            // Jamais entré car refresh autre part: (donc pas de verifs ce qui cause le pb refresh streak 0 over 10)
            if (document.getElementById('dataProgress').setAttribute("data-progress", parseInt(progressBeforeRefresh) + 10) <= 100 ) {
              document.getElementById('dataProgress').setAttribute("data-progress", parseInt(progressBeforeRefresh) + 10);
            }

            // Refresh du StreakNbr
            setTimeout( function() {
              // Vérif front streak>10 
              if ((preogressNumBeforeRefresh + 1) < 11 ) {
                document.getElementById("streakNumber").innerText = (preogressNumBeforeRefresh + 1);

                if (isConnected == true) {
                  let newDataProgress = (preogressNumBeforeRefresh + 1);
                  let streakPourcentage = (newDataProgress*10).toString();
      
                  document.getElementById('dataProgress').setAttribute("data-progress", streakPourcentage);
                }
                else {
                  let newDataProgress = (preogressNumBeforeRefresh + 1);
                  let streakPourcentage = (newDataProgress*10).toString();
      
                  document.getElementById('dataProgress').setAttribute("data-progress", streakPourcentage);
                }

  
              }
              else {
                document.getElementById("streakNumber").innerText = (preogressNumBeforeRefresh);
              }

            }, 500)

            refreshAnimJauge();
          }


          else if (winLose == "LOSE") {
            resultatStreak = -2;
            var progressBeforeRefresh = document.getElementById('dataProgress').getAttribute("data-progress");
            var preogressNumBeforeRefresh = parseInt(document.getElementById("streakNumber").innerHTML);

            // Jamais entré car refresh autre part: (donc pas de verifs ce qui cause le pb refresh streak 0 over 10)
            if (document.getElementById('dataProgress').setAttribute("data-progress", parseInt(progressBeforeRefresh) - 20) >= 0 ) {
              document.getElementById('dataProgress').setAttribute("data-progress", parseInt(progressBeforeRefresh) - 20);
            }

            // Refresh du StreakNbr
            setTimeout( function() {
              if ((preogressNumBeforeRefresh - 2) >= 0 ) {
                document.getElementById("streakNumber").innerText = (preogressNumBeforeRefresh - 2);

                if (isConnected == true) {
                  let newDataProgress = (preogressNumBeforeRefresh - 2);
                  let streakPourcentage = (newDataProgress*10).toString();
      
                  document.getElementById('dataProgress').setAttribute("data-progress", streakPourcentage);
                }
                else {
                  let newDataProgress = (preogressNumBeforeRefresh - 2);
                  let streakPourcentage = (newDataProgress*10).toString();
      
                  document.getElementById('dataProgress').setAttribute("data-progress", streakPourcentage);
                }

                
              }
              else if ((preogressNumBeforeRefresh - 2) < 0) {
                document.getElementById("streakNumber").innerText = 0;

                if (isConnected == true) {      
                  document.getElementById('dataProgress').setAttribute("data-progress", 0);
                }

              }

            }, 500)
            
            refreshAnimJauge();
          }


          else if (winLose == "PUSH") {
            resultatStreak = 0;
          }




          if (isConnected == true) {
            var streakModifierToPhp = {};
            streakModifierToPhp.value = resultatStreak;
  
            $.ajax({
              url: "setStreak.php",
              method: "post",
              data: streakModifierToPhp,
              success: function() {
                console.log("Streak modifier: " + resultatStreak);
              }
  
            })
          }
          
        }


































        

      //
      // Envoi/Refresh du crédits et appel historiqueDB();
      if (isConnected == true) {
        function ajoutGain(gain) {

          console.log("Credits avant mise: " + (credits + miseLocked + mise213Locked + misePairEnCours));
          console.log("Crédits avant refresh res: " + credits);
          console.log("MiseNormale: " + miseLocked + ", MisePair: " + misePairLocked + ", Mise213: " + mise213Locked + ".");
          console.log("GainNormal: " + gainFront + ", GainPair: " + gainPairBet + ", Gain213: " + gain213Bet + ".");
          console.log("Crédits après refresh res: " + (credits + gainFront + gainPairBet + gain213Bet));
          // alert(
          //   "Credits avant mise: " + (credits + miseLocked + mise213Locked + misePairEnCours) + "\n" + 
          //   "Crédits avant refresh: " + credits + "\n" +
          //   "MiseNormale: " + miseLocked + ", MisePair: " + misePairLocked + ", Mise213: " + mise213Locked + ".\n" + 
          //   "GainNormal: " + gainFront + ", GainPair: " + gainPairBet + ", Gain213: " + gain213Bet + ".\n" +
          //   "Crédits après refresh: " + (credits + gainFront + gainPairBet + gain213Bet) + "."
          // );

          if ((WinLose == "WIN") || (WinLose == "BJ") ) {
            document.getElementById("creditsConnected").classList.add("refreshCreditAnim");
            document.getElementById("creditsConnected").innerHTML = (credits + gainFront + gainPairBet + gain213Bet);
          }
          else if (WinLose == "PUSH") {
            // Refresh credit front sans anim
            document.getElementById("creditsConnected").innerHTML = (credits + gainFront + gainPairBet + gain213Bet);
          }
          else {
            // Refresh Credits front meme si lose, si il ya des gain SideBets:
            if ((gainPairBet > 0) || (gain213Bet > 0)) {
              document.getElementById("creditsConnected").classList.add("refreshCreditAnimBJ");
              document.getElementById("creditsConnected").innerHTML = (credits + gainPairBet + gain213Bet);
            }
          }
          


          credits = (credits + gainFront + gainPairBet + gain213Bet);

          var gainToPhp = {};
          // Est-ce que le gain des sideBets prend en compte le decompte des misesSideBets? (BDD mises fait)
          gainToPhp.value = (gain + gainPairBet + gain213Bet);


          console.log("(JS) Gain: " + gain);
          $.ajax({
            url: "setCredits.php",
            method: "post",
            data: gainToPhp,
            success: function(res) {
              console.log("(JS) success POST gains: " + res);
            }
          });

          // A replacer la ou est appelé ajoutGain();
          historiqueDB(WinLose, resultatCas, gainHistorique);
        }
      }
      else if (isConnected == false) {
        function ajoutGain(gain) {

          console.log("Credits avant mise: " + (credits + miseLocked + mise213Locked + misePairEnCours));
          console.log("Crédits avant refresh res: " + credits);
          console.log("MiseNormale: " + miseLocked + ", MisePair: " + misePairLocked + ", Mise213: " + mise213Locked + ".");
          console.log("GainNormal: " + gainFront + ", GainPair: " + gainPairBet + ", Gain213: " + gain213Bet + ".");
          console.log("Crédits après refresh res: " + (credits + gainFront + gainPairBet + gain213Bet));

          // flash crédits Invite à faire
          if ((WinLose == "WIN") || (WinLose == "BJ")) {
            document.getElementById("credits").innerHTML = "<i class='fa-solid fa-star'></i> Invité &nbsp;&nbsp;<span id=\"creditsInvite\">" + (credits + gainFront + gainPairBet + gain213Bet) + "</span>" + "&nbsp;<img src='Images/souBlancBarre.png' class=\"imageSouDeco\">";
            document.getElementById("creditsInvite").classList.add("refreshCreditAnimInvite");
          } 
          else if (WinLose == "PUSH") {
            // Refresh credit front sans anim
            if (isConnected) {
              document.getElementById("creditsConnected").innerHTML = (credits + gainFront + gainPairBet + gain213Bet);
            }
            else {
              document.getElementById("creditsInvite").innerHTML = (credits + gainFront + gainPairBet + gain213Bet);
            }
          }
          else {
            // Refresh Credits front meme si lose, si il ya des gain SideBets:
            if ((gainPairBet > 0) || (gain213Bet > 0)) {
              document.getElementById("credits").innerHTML = "<i class='fa-solid fa-star'></i> Invité &nbsp;&nbsp;<span id=\"creditsInvite\">" + (credits + gainPairBet + gain213Bet) + "</span>" + "&nbsp;<img src='Images/souBlancBarre.png' class=\"imageSouDeco\">";;
              document.getElementById("creditsInvite").classList.add("refreshCreditAnimInvite");
            }
          }


          credits = (credits + gainFront + gainPairBet + gain213Bet);

          historiqueInvite(WinLose, resultatCas, gainHistorique);

          historiqueDB(WinLose, resultatCas, gainHistorique);
        }
      }
      
      

      function checkBurstJoueur() {
        if (scoreTotalJoueur > 21) {

          if ((document.getElementById("phaseChoixAlert") !==null) && (document.getElementById("traitUnderlineInverseChoix") !==null)) {
            document.getElementById("phaseChoixAlert").remove();
            document.getElementById("traitUnderlineInverseChoix").remove();
          }
          // Var pour array historiquePhp
          WinLose = 'LOSE';
          resultatCas = 'Bust';
          console.log("scoreTotalCroupier: " + scoreTotalCroupier);
          // gain = gain
          // date est pris dans la fonction historiqueDB

            burstJoueur = true;

            setTimeout(function() {
              $.ajax({
                async: false,
                url: "Footers/footerResultat.html",
                dataType: "html",
                success: function(response) {
                  $("#container3").html(response);
                  ChoixActif = false;
                  document.getElementById("footerTitle").innerHTML = " - Gains -";

                    document.getElementById("gainExp").innerText = "+20 XP";

                    // Mise lockée
                    document.getElementById("miseLockedFooter").innerHTML = miseLocked;
                    document.getElementById("misePairLockedFooter").innerHTML = misePairLocked;
                    document.getElementById("mise213LockedFooter").innerHTML = mise213Locked;
                    // fin

                    // Résultat Gains 
                    if ( isConnected == true) {
                      document.getElementById("miseResultat").innerHTML = "<span id='miseResultatTxt'>" + miseLocked + '</span><img src="Images/souBarre.png" class="imagesSouResultat">';
                      document.getElementById("misePairResultat").innerHTML = "<span id='misePairResultatTxt'>" + misePairLocked + '</span><img src="Images/souBarre.png" class="imageSouSideBets">';
                      document.getElementById("mise213Resultat").innerHTML = "<span id='mise213ResultatTxt'>" + mise213Locked + '</span><img src="Images/souBarre.png" class="imageSouSideBets">';
                    }
                    else {
                      document.getElementById("miseResultat").innerHTML = "<span id='miseResultatTxt'>" + miseLocked + '</span><img src="Images/souBlancBarre.png" class="imagesSouResultat">';
                      document.getElementById("misePairResultat").innerHTML = "<span id='misePairResultatTxt'>" + misePairLocked + '</span><img src="Images/souBlancBarre.png" class="imageSouSideBets">';
                      document.getElementById("mise213Resultat").innerHTML = "<span id='mise213ResultatTxt'>" + mise213Locked + '</span><img src="Images/souBlancBarre.png" class="imageSouSideBets">';
                    }  
                    
                    removeSideBetsFooter();

                    setTimeout( function() {
                      DecrementGain();
                    }, 1500);
                    setTimeout( function() {
                      IncrDecrGainPair(gainPairBet);
                    }, 1750);
                    setTimeout( function() {
                      IncrDecrGain213(gain213Bet);
                    }, 2000);

                    // WIP gain (ajouter effet refresh CSS)
                      setTimeout( function() {

                        // gain = -miseLocked;
                        gainHistorique = -miseLocked;
                        gain = 0;
                        ajoutGain(gain);
                        ingame = false;

                        winLose = -1;
                        winLoseDB(winLose);

                        majStreak(WinLose);

                      }, 500)

                      expDB(20);

                      refreshLvl();
                      
                    // Fin résultat Gains

                  
                  document.getElementById("deckContainer").remove();
                  document.getElementById("cardAnim").remove();
                  document.getElementById("parametresPartieDiv").remove();
                  // document.getElementById("deckContainer").classList.add("fadeOut");

                  //*** Perdu BURST 
                  document.getElementById("scoreJoueur").style.backgroundColor = "rgb(160 13 27)"
                  document.getElementById("scoreJoueur").style.color = "rgba(239,230,230, 1)"
                  document.getElementById("scoreJoueur").style.textShadow = "1px 1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, -1px -1px 0 #000000, 1px 0px 0 #000000, 0px 1px 0 #000000, -1px 0px 0 #000000, 0px -1px 0 #000000";
                  document.getElementById("scoreJoueur").style.border = "3px solid rgba(130,14,39, 1)";
                  // Fin Perdu BURST



                  
                  // Séparateur
                  setTimeout(function() {

                    if (SoundMuteBool == false) {
                      audioExplosionBust.play();
                    }

                    //Apparition
                    document.getElementById("resultatText").classList.add("resultatTextBust");
                    if (darkModeBool == true) {
                      document.getElementById("resultatText").classList.add("resultatTextBustDM");
                      document.getElementById("separateur").classList.add("styleSeparateurBustDM");
                    }
                    else {
                      document.getElementById("separateur").classList.add("styleSeparateurBust");
                    }
  
                    // Animation scale() qui pop avec fadeIn()
                    document.getElementById("separateur").classList.add("separateurContainerWidthAnim");
                    document.getElementById("separateur").classList.add("fadeInResultat");
                    document.getElementById("separateur").classList.add("scaleBoom");
                  
                    document.getElementById("resultatText").innerText = "BUST";
                  }, 250);
                  // Fin séparateur

                  setTimeout(function() {
                    lancerPhaseCroupierAfterBurst();
                  }, 500 * setTimeOutMultiplier);


                  // Bouton Rejouer
                  relancer();
                }
              });
            }, 1050);
            return true;
        }

        else if ((scoreTotalJoueur < 21) && (doubleBool==1)) {

          document.getElementById("footer").style.boxShadow = "";
          document.getElementById("header").style.boxShadow = "0px 3px 13vh 30px rgba(128, 128, 128, 0.55)";

          lancerPhaseCroupier();
          return false;
        }

      }












      
      function checkBJjoueur() {
        if ((scoreTotalJoueur + 10 == 21) && (nbrCardsJoueur == 2) && (asJoueur == true)) {

          if ((document.getElementById("phaseChoixAlert") !==null) && (document.getElementById("traitUnderlineInverseChoix") !==null)) {
            document.getElementById("phaseChoixAlert").remove();
            document.getElementById("traitUnderlineInverseChoix").remove();
          }
          console.log("nbrCardsJoueur: " + nbrCardsJoueur + "&nbscp; |true BLACKJACK|");

          WinLose = 'BJ';
          resultatCas = 'BlackJack';


          if (toggleCardSimplist) {
            var imgElemArray = document.querySelectorAll('.imgSimpl1');
            imgElemArray.forEach(element => {
              element.style.margin = "0 -5px";
              // Anim juste quand toggleSimpliste POur l'instant
              element.classList.add("blackjackAnimCards");
            });          
          }


          setTimeout(function() {
            $.ajax({
              async: false,
              url: "Footers/footerResultat.html",
              dataType: "html",
              success: function(response) {
                $("#container3").html(response);
                ChoixActif = false;
                document.getElementById("footerTitle").innerHTML = " - Gains -";

                  document.getElementById("gainExp").innerText = "+250 XP";

                  // Mise lockée
                  document.getElementById("miseLockedFooter").innerHTML = miseLocked;
                  document.getElementById("misePairLockedFooter").innerHTML = misePairLocked;
                  document.getElementById("mise213LockedFooter").innerHTML = mise213Locked;
                  // fin

                  // Résultat Gains 
                  var miseLockedMultiplied = 3 * miseLocked;
                  if ( isConnected == true) {
                    document.getElementById("miseResultat").innerHTML = "<span id='miseResultatTxt'>" + miseLocked + '</span><img src="Images/souBarre.png" class="imagesSouResultat">';
                    document.getElementById("misePairResultat").innerHTML = "<span id='misePairResultatTxt'>" + misePairLocked + '</span><img src="Images/souBarre.png" class="imageSouSideBets">';
                    document.getElementById("mise213Resultat").innerHTML = "<span id='mise213ResultatTxt'>" + mise213Locked + '</span><img src="Images/souBarre.png" class="imageSouSideBets">';
                  }
                  else {
                    document.getElementById("miseResultat").innerHTML = "<span id='miseResultatTxt'>" + miseLocked + '</span><img src="Images/souBlancBarre.png" class="imagesSouResultat">';
                    document.getElementById("misePairResultat").innerHTML = "<span id='misePairResultatTxt'>" + misePairLocked + '</span><img src="Images/souBlancBarre.png" class="imageSouSideBets">';
                    document.getElementById("mise213Resultat").innerHTML = "<span id='mise213ResultatTxt'>" + mise213Locked + '</span><img src="Images/souBlancBarre.png" class="imageSouSideBets">';
                  }    
                  
                  removeSideBetsFooter();

                  setTimeout( function() {
                    IncrementGain(miseLockedMultiplied);
                  }, 1500);
                  setTimeout( function() {
                    IncrDecrGainPair(gainPairBet);
                  }, 1750);
                  setTimeout( function() {
                    IncrDecrGain213(gain213Bet);
                  }, 2000);
                  
                  // WIP gain (ajouter effet refresh CSS)
                  setTimeout( function() {
                    gainHistorique = (miseLocked * 2);
                    gainFront = (miseLocked * 3);
                    gain = (miseLocked * 3);
                    ajoutGain(gain);
                    ingame = false;

                    winLose = 1;
                    winLoseDB(winLose);

                    majStreak(WinLose);

                  }, 500)

                  expDB(250);

                  refreshLvl();

                  // Fin résultat Gains

                // FIN WIP
                


                document.getElementById("deckContainer").remove();
                document.getElementById("cardAnim").remove();
                document.getElementById("parametresPartieDiv").remove();

                //*** Perdu BURST 
                document.getElementById("scoreCroupier").style.backgroundColor = "rgb(160 13 27)";

                document.getElementById("scoreCroupier").style.color = "rgba(239,230,230,1)";
                document.getElementById("scoreJoueur").style.color = "rgba(254,101,250,1)";

                document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)";
                document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)";

                document.getElementById("scoreCroupier").style.border = "1px solid rgba(255,1,49,0.5)";
                document.getElementById("scoreJoueur").style.border = "1px solid rgba(254, 101, 250, 0.85)";

                document.getElementById('scoreJoueur').innerHTML = (scoreTotalJoueur + 10);
                // Fin Perdu BURST


                // Séparateur
                setTimeout(function() {
                  document.getElementById("resultatText").classList.add("resultatTextBJ");
                  document.getElementById("separateur").classList.add("styleSeparateurBlackJack");

                  if (SoundMuteBool == false) {
                    audioCoinWin.play();
                  }

                  // Animation scale() qui pop avec fadeIn()
                  document.getElementById("separateur").classList.add("separateurContainerWidthAnim");
                  document.getElementById("separateur").classList.add("fadeInResultat");
                  document.getElementById("separateur").classList.add("scaleBoom");
                  // document.getElementById("separateur").classList.add("marginFix");
                
                  // TEXT
                  document.getElementById("resultatText").innerText = "BlackJack !";
                }, 250);
                // Fin Séparateur

                popBoutonReload();

                // Bouton Rejouer
                relancer();
              }
            });

          }, 1100);
          return true;
        }
        else {
          return false;
        }
      }

      




      //***  CHIFFRES POP
      // function misePop() {
      //   document.getElementById("miseEnCours").classList.toggle('scorePop');
      // }
      // function scorePop() {
      //   document.getElementById("scoreContainer").classList.toggle('scorePop');
      // }
      //*** 
      





      // ------------------------------------------------
      //  HiLo Score MODULE
      //  Sortir le module HiLo à part du module chnageant

      function scoreState() {
        if (score > 0) {
          document.getElementById("scoreVar").innerHTML = "+" + score;
          document.getElementById("scoreVar").classList.remove('neutral');
          document.getElementById("scoreVar").classList.remove('negative');
          document.getElementById("scoreVar").classList.add('positive');
          const scoreContainer = document.querySelector("#scoreContainer");
          // scoreContainer.style.border = "3px solid green";
        }
        else if (score == 0) {
          document.getElementById("scoreVar").classList.remove('positive');
          document.getElementById("scoreVar").classList.remove('negative');
          document.getElementById("scoreVar").classList.add('neutral');
          // scoreContainer.style.border = "3px solid rgba(255,255,255,0.5)";
        }
        else {
          document.getElementById("scoreVar").classList.remove('positive');
          document.getElementById("scoreVar").classList.remove('neutral');
          document.getElementById("scoreVar").classList.add('negative');
          // scoreContainer.style.border = "3px solid red";
        }
      }

      //document.getElementById("scoreVar").innerHTML = score;

      // document.getElementById('scoreAdd').addEventListener("click", plus1);
      // function plus1() {
      //   scorePop();
      //   score += 1;
      //   document.getElementById("scoreVar").innerHTML = score;
      //   scoreState();
      //   // Suppression de la classe togglé "scorePop" apres x temps
      //   setTimeout(function scoreDepop() {
      //     document.getElementById("scoreContainer").classList.toggle('scorePop');
      //   }, 500);
      // }
      // // document.getElementById('scoreRem').addEventListener("click", minus1);
      // function minus1() {
      //   // !!! A réactiver pour faire marcher la fonction
      //   // scorePop();
      //   score -= 1;
      //   document.getElementById("scoreVar").innerHTML = score;
      //   scoreState();
      //   // Suppression de la classe togglé "scorePop" apres x temps
      //   setTimeout(function scoreDepop() {
      //     document.getElementById("scoreContainer").classList.toggle('scorePop');
      //   }, 500);
      // }
      //*** FIN
    }