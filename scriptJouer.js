    
    window.onload = function(){

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

      
      var removed = false;


      // réinitialisé dans le NewGame (tableau des valeurs derniers jetons ajoutés en vue de retour arriere)
      let logTokenValues = [];

      var nbrCardsJoueur;

      var credits = 0;
      // var creditsConnected = 0;
      var gain = 0;

      var newValue;
      var score = 0;
      var mise = 0;
      var scoreTotalJoueur = 0;
      var scoreTotalCroupier = 0;
      var isPhaseMise = false;

      var miseEnCours;
      var miseLocked;

      var compteurDeck = 52;
      var compteurDeckMax = 52;

      var burstJoueur = false;

      var asJoueur = new Boolean;
      var asCroupier = new Boolean;
      
      var ChoixActif = false;

      var misesResultatDiff;

      
      var backgroundToggle = new Boolean;

      var setTimeOutMultiplierBool = false;
      var setTimeOutMultiplier = 1;
      
      // Template utilisé dans le NewGame load
      // function toggleSpeed() {
      //   if (setTimeOutMultiplierBool == true) {
      //     setTimeOutMultiplierBool = false;
      //     setTimeOutMultiplier = 1;
      //   }
      //   else {
      //     setTimeOutMultiplierBool = true;
      //     setTimeOutMultiplier = 0.5;
      //   }
      // }






      var SoundMuteBool = false;

      // Template utilisé dans le NewGame load
      // function toggleMute() {
      //   if (SoundMuteBool == true) {
      //     SoundMuteBool = false;
      //     audioCardSound.volume = 0.5;
      //   }
      //   else {
      //     SoundMuteBool = true;
      //     audioCardSound.volume = 0;
      //   }
      // }
      









      //  Collapse Footer
      var coll = document.getElementById("collapsible");
      var i;
      var content = document.getElementById("collapseContent");
      var isCollapsed = false;
      footerCollapse();
      document.getElementById("arrowPng").setAttribute("src", "Images/arrowUpWhitePng.png");
      document.getElementById("arrowPng").style.position = "relative";
      document.getElementById("arrowPng").style.bottom = "13px";
      document.getElementById("arrowPng").style.opacity = "0.6";

      

      coll.addEventListener("click", function() {
        if (content.style.display === "block") {
          footerCollapse();
        }
        else {
          footerShow();
        }
      });
      // FIN

      function footerCollapse() {
        content.style.display = "none";
        document.getElementById("arrowPng").setAttribute("src", "Images/arrowUpWhitePng.png");
        document.getElementById("arrowPng").style.position = "relative";
        document.getElementById("arrowPng").style.bottom = "13px";
        document.getElementById("arrowPng").style.opacity = "0.6";

        isCollapsed = true;
        checkMiseWarning();
      }
      function footerShow() {
        content.style.display = "block";
        document.getElementById("arrowPng").setAttribute("src", "Images/arrowDownWhitePng.png");
        document.getElementById("arrowPng").style.bottom = "0px";
        document.getElementById("arrowPng").style.opacity = "0.6";


        isCollapsed = false;
        checkMiseWarning();
      }
      


      var nbrDecks;

      // document.getElementById("title").style.left = "0%";




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
          cardValue: 10
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
          cardValue: 1,
          cardValue2: 10
        },
        C1b = {
          cardImageURL: "cartes\\AD.png",
          cardValue: 1,
          cardValue2: 10
        },
        C1c = {
          cardImageURL: "cartes\\AH.png",
          cardValue: 1,
          cardValue2: 10
        },
        C1d = {
          cardImageURL: "cartes\\AS.png",
          cardValue: 1,
          cardValue2: 10
        }
        // TRICHE TEST AS (attention virgule)
        // C1e = {
        //   cardImageURL: "cartes\\AC.png",
        //   cardValue: 1,
        //   cardValue2: 10
        // },
        // C1f = {
        //   cardImageURL: "cartes\\AD.png",
        //   cardValue: 1,
        //   cardValue2: 10
        // },
        // C1g = {
        //   cardImageURL: "cartes\\AH.png",
        //   cardValue: 1,
        //   cardValue2: 10
        // },
        // C1h = {
        //   cardImageURL: "cartes\\AS.png",
        //   cardValue: 1,
        //   cardValue2: 10
        // },
        // C1i = {
        //   cardImageURL: "cartes\\AC.png",
        //   cardValue: 1,
        //   cardValue2: 10
        // },
        // C1j = {
        //   cardImageURL: "cartes\\AD.png",
        //   cardValue: 1,
        //   cardValue2: 10
        // },
        // C1k = {
        //   cardImageURL: "cartes\\AH.png",
        //   cardValue: 1,
        //   cardValue2: 10
        // },
        // C1l = {
        //   cardImageURL: "cartes\\AS.png",
        //   cardValue: 1,
        //   cardValue2: 10
        // },
        // C1m = {
        //   cardImageURL: "cartes\\AC.png",
        //   cardValue: 1,
        //   cardValue2: 10
        // },
        // C1n = {
        //   cardImageURL: "cartes\\AD.png",
        //   cardValue: 1,
        //   cardValue2: 10
        // },
        // C1o = {
        //   cardImageURL: "cartes\\AH.png",
        //   cardValue: 1,
        //   cardValue2: 10
        // },
        // C1p = {
        //   cardImageURL: "cartes\\AS.png",
        //   cardValue: 1,
        //   cardValue2: 10
        // }
        // FIN TRICHE
      ];
      //#endregion


      var modalInscription = document.getElementById("inscriptionModal");
      var modalConnection = document.getElementById("connectionModal");
      
      window.onclick = function(event) {
        if (event.target == modalConnection) {
          modalConnection.style.display = "none";
        }
        if (event.target == modalInscription) {
          modalInscription.style.display = "none";
        }
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

     
      

      // JQUERY JAX : load Partie
      $("#newGame").click(function(){

          $("#container1").load("jouerPartie.php");
          

          setTimeout( function lancerPartie() {

              document.getElementById("header").classList.add('headerOnPartie');
              // document.getElementById("header").classList.add("classTest");

              document.getElementById("footer").classList.add('footerOnPartie');

              removed = false;

              logTokenValues = [];

              nbrCardsJoueur = 0;

              // Activation Crédits Brut mode invité (en partie)
              // ******************************** *
              if (isConnected == false) {
                console.log('isConnected: ' + isConnected);
                credits = 100;
                document.getElementById("credits").innerHTML = "Crédits: &nbsp;&nbsp;" + credits + "&nbsp;<img src='Images/souBleu.png' class=\"imageSouDeco\">";
                document.getElementById("credits").style.position = "relative";
                document.getElementById("credits").style.top = "7px";
                document.getElementById("traitLumineux").style.visibility = "visible";
              }
              else {
                console.log('isConnected: ' + isConnected);
                //
                document.getElementById("creditsConnected").innerHTML = creditsConnected;
                document.getElementById("traitLumineux").style.visibility = "visible";
                document.getElementById("traitLumineux").style.position = 'relative';
                document.getElementById("traitLumineux").style.bottom = '20px';
              }
              
              // ******************************** *
 
              document.getElementById("compteurDeck").innerHTML = compteurDeck;
              document.getElementById("compteurDeckMax").innerHTML = compteurDeckMax;

              document.getElementById("backgroundToggleImage").src = "Images/backgroundToggleImageActif.png";


              // ******************************** *
              // BOUTON TOGGLE SON
              document.getElementById("soundButtonContainer").addEventListener("click", function() {
                if (SoundMuteBool == true) {
                  SoundMuteBool = false;
                  document.getElementById("soundButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                  document.getElementById("soundToggleImage").style.marginLeft = "3px";
                  audioCardSound.volume = 0.5;  
                  audioCoinWin.volume = 0.4;
                  audioExplosionBust.volume = 0.04;
                  audioPush.volume = 0.4;
                  audioDecompte.volume = 0.02;
                  audioToken.volume = 0.7;
                  audioMiser.volume = 0.3;
                  document.getElementById("soundToggleImage").src = 'Images/speakerMax_sourceMax5.png';
                }
                else {
                  SoundMuteBool = true;
                  document.getElementById("soundButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                  document.getElementById("soundToggleImage").style.marginLeft = "5px";
                  audioCardSound.volume = 0;
                  audioCoinWin.volume = 0;
                  audioExplosionBust.volume = 0;
                  audioPush.volume = 0;
                  audioDecompte.volume = 0;
                  audioToken.volume = 0;
                  audioMiser.volume = 0;
                  document.getElementById("soundToggleImage").src = 'Images/speakerMute_sourceMaxPng2Recenter4.png';
                }
              });
              // FIN bouton toggle sons
              // ******************************** *

 
              // ******************************** *
              // BOUTON TOGGLE SPEED
              document.getElementById("speedButtonContainer").addEventListener("click", function() {
                if (setTimeOutMultiplierBool == true) {
                  setTimeOutMultiplierBool = false;
                  document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                  setTimeOutMultiplier = 1;
                  document.getElementById("speedToggleImage").src = 'Images/fastForwardGrey.png';
                }
                else {
                  setTimeOutMultiplierBool = true;
                  document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                  setTimeOutMultiplier = 0.55;
                  document.getElementById("speedToggleImage").src = 'Images/fastForwardWhite.png';
                }
              });
              // FIN bouton toggle speed
              // ******************************** *


              // Toggle Design
              // ******************************** *
              document.getElementById("backgroundButtonContainer").addEventListener("click", function() {
                if (backgroundToggle == true) {
                  backgroundToggle = false;
                  document.getElementById("backgroundToggleImage").src = "Images/backgroundToggleImageActif.png";
                  
                  // TEST
                  // document.getElementById("footer").style.backgroundImage = 'linear-gradient(-45deg, rgba(104,3,42,1) 0%, rgba(146,14,91,1) 33%, rgba(13,88,94,1) 67%, rgba(26,32,57,1) 100%) !important;';
                }
                else {
                  backgroundToggle = true;
                  document.getElementById("backgroundToggleImage").src = 'Images/backgroundToggleImage.png';

                }
              })
              // Fin bouton toggle Design
              // ******************************** *


              $.ajax({
                async: false,
                url: "Footers/footerMiseModul.html",
                dataType: "html",
                success: function(response) {
                  $("#container3").html(response);
                  ChoixActif = false;
                  // document.getElementById("collapsible").style.visibility = "visible";

                  document.getElementById("retourArriereButton").addEventListener("click", function() {
                    // fonction de rafraichissement de la mise en cours (Si il y a matière)
                    if (miseEnCours != 0) {
                      miseEnCours = miseEnCours - logTokenValues[0];
                      if (isConnected == true) {
                        document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
                      }
                      else {
                        document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
                      }
                      // fonction qui remove le premier var du tableau
                    logTokenValues.shift();

                    // Rafraichit l'état style du bouton (par exemple si denouveau = 0)
                    miseBoutonStyle();
                    } 
                  });

                    //*** Zone FooterBorder Clignotement      
                    document.querySelector("#footer").classList.add("miserActif2");  

                    // IF Click sur footer: remove Miser Actif2 et add footerBorderWhite (ci dessous sans le timeOut)
                    // setTimeout( function() {
                    //   document.querySelector("#footer").classList.remove("miserActif2"); 
                    //   document.querySelector("#footer").classList.add("footerBorderWhite");  
                    // }, 2500);
                    //*** Fin


                  footerShow();
                  phaseMise();
                  document.getElementById("footerTitle").innerHTML = " - Mise -";
                  window.onload = tokensClick();
                  checkMiseWarning();
                }
              });
              miseBoutonStyle();
              miseLock();  

              // document.getElementById("scoreJoueur").style.visibility = "visible";
              // document.getElementById("scoreCroupier").style.visibility = "visible";
          }, 500)
      });
      // Fonctions Mute/Speed



      //***   WIP: Relancer    ***\\
      function relancer() {

        $("#relancer").click(function(){
          
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

          

          $.ajax({
            async: false,
            url: "jouerPartie.php",
            dataType: "html",
            success: function(response) {
              $("#container1").html(response);

              asJoueur = false;
              nbrCardsJoueur = 0;
              removed = false;

              //** Récupérer le nouveau Crédits 
              if (isConnected == false) {
                document.getElementById("credits").innerHTML = "Crédits: &nbsp;&nbsp;" + credits + "&nbsp;<img src='Images/souBleu.png' class=\"imageSouDeco\">";
              }
              else if (isConnected == true) {
                document.getElementById("creditsConnected").innerHTML = credits;
              }
              // FIN

              //**** Garder l'état Toggle lors Relance
              // *Mute*
              if (SoundMuteBool == true) {
                document.getElementById("soundToggleImage").src = 'Images/speakerMute_sourceMaxPng2Recenter4.png';
                document.getElementById("soundToggleImage").style.marginLeft = "5px";
              }
              else {
                // SoundMuteBool = true;
                document.getElementById("soundToggleImage").src = 'Images/speakerMax_sourceMax5.png';
                document.getElementById("soundToggleImage").style.marginLeft = "3px";
              }

              // *Speed*
              if (setTimeOutMultiplierBool == true) {
                document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                document.getElementById("speedToggleImage").src = 'Images/fastForwardWhite.png';

              }
              else {
                document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                document.getElementById("speedToggleImage").src = 'Images/fastForwardGrey.png';
              }
              //****


              // ****************************** * 
              // BOUTON TOGGLE SPEED
              document.getElementById("soundButtonContainer").addEventListener("click", function() {
                if (SoundMuteBool == true) {
                  SoundMuteBool = false;
                  document.getElementById("soundButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                  document.getElementById("soundToggleImage").style.marginLeft = "3px";
                  audioCardSound.volume = 0.5;  
                  audioCoinWin.volume = 0.4;
                  audioExplosionBust.volume = 0.04;
                  audioPush.volume = 0.4;
                  audioDecompte.volume = 0.02;
                  audioToken.volume = 0.7;
                  audioMiser.volume = 0.3;
                  document.getElementById("soundToggleImage").src = 'Images/speakerMax_sourceMax5.png';
                }
                else {
                  SoundMuteBool = true;
                  document.getElementById("soundButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                  document.getElementById("soundToggleImage").style.marginLeft = "13px";
                  // Inutile car ajout de if pour tout les .play()
                  audioCardSound.volume = 0;
                  audioCoinWin.volume = 0;
                  audioExplosionBust.volume = 0;
                  audioPush.volume = 0;
                  audioDecompte.volume = 0;
                  audioToken.volume = 0;
                  audioMiser.volume = 0;
                  //
                  document.getElementById("soundToggleImage").src = 'Images/speakerMute_sourceMaxPng2Recenter4.png';
                }
              });
              // FIN bouton toggle sons
              // ******************************** *

 
              // ******************************** *
              // BOUTON TOGGLE SPEED
              // document.getElementById("speedButtonContainer").style.cursor = "pointer";
              document.getElementById("speedButtonContainer").addEventListener("click", function() {
                if (setTimeOutMultiplierBool == true) {
                  setTimeOutMultiplierBool = false;
                  document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                  setTimeOutMultiplier = 1;
                  document.getElementById("speedToggleImage").src = 'Images/fastForwardGrey.png';
                }
                else {
                  setTimeOutMultiplierBool = true;
                  document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                  setTimeOutMultiplier = 0.65;
                  document.getElementById("speedToggleImage").src = 'Images/fastForwardWhite.png';
                }
              });

            }
          });


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

                  // RESET du tableau TokenLogs
                  logTokenValues = [];
                  //
                  // Bouton RetourArriere
                  document.getElementById("retourArriereButton").addEventListener("click", function() {
                    // fonction de rafraichissement de la mise en cours (Si il y a matière)
                    if (miseEnCours != 0) {
                      miseEnCours = miseEnCours - logTokenValues[0];
                      if (isConnected == true) {
                        document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
                      }
                      else {
                        document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
                      }
                      // fonction qui remove le premier var du tableau
                    logTokenValues.shift();

                    // Rafraichit l'état style du bouton (par exemple si denouveau = 0)
                    miseBoutonStyle();
                    } 
                  });
                  // FIN


                  footerShow();
                  phaseMise();
                  document.getElementById("footerTitle").innerHTML = " - Mise -";
                  window.onload = tokensClick();
                  checkMiseWarning();
                }
              });
              miseBoutonStyle();
              miseLock();  
          }, 500)
        });

      }



      // function: (en partant de la mise vers le gains réel)
      function DecrementGain() {

        // adapter la longueur du son: calculer le temps pris pour decrement/increment du miseResultat (((110/miseLocked) * setTimeOutMultiplier) * miseLocked)   (en ms)
        // provoquer un fadeOut du son à partir d'avant ce moment
        if (SoundMuteBool == false) {
          audioDecompte.play();
        }
        // TEST audio coupé et non audio = 0;
        // audioDecompte.play();


        setTimeout( function() {
            if (miseLocked > 0) {
            miseLocked = miseLocked - 1;
            document.getElementById("miseResultat").innerHTML = miseLocked;
            document.getElementById("miseResultat").classList.add("addColorToResultatRed");
            DecrementGain();
            }
        }, (110/miseLocked) * setTimeOutMultiplier);
      } 
      // fin fonction



      // function (en partant de la mise vers le gains réel)
      function IncrementGain(miseLockedMultiplied) {

        if (SoundMuteBool == false) {
          audioDecompte.play();
        }
        // TEST audio coupé et non audio = 0;
        // audioDecompte.play();

        misesResultatDiff = miseLockedMultiplied - miseLocked;

        setTimeout( function() {
            if (miseLocked < miseLockedMultiplied) {
            miseLocked = miseLocked + 1;
            document.getElementById("miseResultat").innerHTML = miseLocked;
            document.getElementById("miseResultat").classList.add("addColorToResultatBJ");
            IncrementGain(miseLockedMultiplied);
            }
        }, (110/misesResultatDiff) * setTimeOutMultiplier);
      } 
      // fin fonction












      function miseBoutonStyle() {
        let button = document.querySelector("#boutonMiser");
        if (miseEnCours > 0) {
          document.getElementById("boutonMiser").classList.add("miserActif");
          document.getElementById("boutonMiser").style.opacity = "1";
          document.getElementById("boutonMiser").style.cursor = "pointer";
          button.disabled = false;
        }
        // *** ATTENTION NOUVELLE REGLE: pas de mise > 25% du credits (hors double) ***
        // else if (miseEnCours > (credits * 25 / 100)) {
        //   document.getElementById("boutonMiser").classList.remove("miserActif");
        //   document.getElementById("boutonMiser").style.opacity = "0.4";
        //   document.getElementById("boutonMiser").style.cursor = "default";
        //   button.disabled = true;
        // }
        else {
          document.getElementById("boutonMiser").classList.remove("miserActif");
          document.getElementById("boutonMiser").style.opacity = "0.4";
          document.getElementById("boutonMiser").style.cursor = "default";
          button.disabled = true;
          // Label "Entrez d'abord une mise"
        }
      }

      function double() {
        // Le double fonctionne normalement, mais à la toute fin, le ("miselocked" -> "miseResultat")  devient (0 -> 0)
        // Comparer loadFooters Hit() et double() car double pas assez réactif

        $.ajax({
          async: false,
          url: "Footers/footerDistribution.html",
          dataType: "html",
          success: function(response) {
            $("#chipsContainer").html(response);
            ChoixActif = false;
            document.getElementById("footerTitle").innerHTML = " - Distribution... -";
          }
        });

        miseLocked = miseLocked * 2;
        document.getElementById("miseLocked").innerHTML = "Mise: " + "&nbsp;" + "<span style='color:rgb(241 205 92 / 95%); text-shadow: 0 0 4px rgb(255 213 2);'>" + miseLocked + "</span>";

        setTimeout(function() {
          addCardJoueur();
        }, 1000);

        setTimeout(function() {
          lancerPhaseCroupier();
        }, 2000);
      }
      

      // Lock de la mise
      function miseLock() {
        document.getElementById("boutonMiser").addEventListener("click", function() {

          document.querySelector("#footer").classList.remove("miserActif2");  


          // mettre des remove et setTimeOut comme avec l'autre[TENTÉ] (regarder dans l'inspecteur: ya toujours la class redecalge et comme ya le fill-mode: forward...)
          document.getElementById("header").classList.remove("headerOnPartie2");
          document.getElementById("footer").classList.remove("footerOnPartie2");
          document.getElementById("header").classList.remove("headerOnPartieRedecale");
          document.getElementById("footer").classList.remove("footerOnPartieRedecale");

          setTimeout(function() {
            document.getElementById("header").classList.add("headerOnPartie2");
            document.getElementById("footer").classList.add("footerOnPartie2");
          }, 0);
          // document.getElementById("header").classList.add("headerOnPartie2");
          // document.getElementById("footer").classList.add("footerOnPartie2");


          if (SoundMuteBool == false) {
            audioMiser.play();
          }
          // TEST Audio coupé et non audio = 0;
          // audioMiser.play();

          document.querySelector("#boutonMiser").style.opacity = "0.4";
          
          miseLocked = miseEnCours;
          document.getElementById("miseLocked").style.opacity = "0.9";
          document.getElementById("miseLocked").innerHTML = "Mise: " + "&nbsp;" + "<span style='color:rgb(241 205 92 / 95%); text-shadow: 0 0 4px rgb(255 213 2);'>" + miseLocked + "</span>";
      

          if (isConnected == false) {
            document.getElementById("credits").innerHTML = "Crédits: &nbsp;&nbsp;" + (credits - miseLocked) + "&nbsp;<img src='Images/souBleu.png' class=\"imageSouDeco\">";
          }
          else if (isConnected == true) {
            document.getElementById("creditsConnected").innerHTML = (credits - miseLocked);
          }
    

          // DELETE MiseEnCours du Footer onClick (OK)
          // let parent = document.getElementById("infanticide");
          // let child = document.getElementById("miseEnCours");
          // parent.removeChild(child);

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

                ChoixActif = true;
                document.getElementById("footerTitle").innerHTML = " - Choix -";

                  if (scoreTotalJoueur > 8 && scoreTotalJoueur < 12) {
                    document.getElementById("double").style.opacity = 1;
                    document.getElementById("choixDoubler").style.opacity = 1;
                  }

                document.getElementById("hit").addEventListener("click", function() {

                  hit();

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
                  // 
                  if (asJoueur == true) {
                    if (scoreTotalJoueur + 10 < 22) {
                      scoreTotalJoueur = scoreTotalJoueur + 10;
                    }
                    document.getElementById('scoreJoueur').innerHTML = scoreTotalJoueur;
                  }
                  lancerPhaseCroupier();
                });

                //***  shortcut Stand
                  function doc_keyStand(e) {
                    if ((e.key === '-') && (ChoixActif == true)) {
                        lancerPhaseCroupier();
                    }
                  }
                  document.addEventListener('keyup', doc_keyStand, false);
                //*** FIN

                document.getElementById("double").addEventListener("click", function() {
                  double();
                });

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

          setTimeout(function() {
            addCardJoueur();
          }, (2000 * setTimeOutMultiplier));
          setTimeout(function() {
            addCardCroupier();
          }, (3750 * setTimeOutMultiplier));
          setTimeout(function() {
            addCardJoueur();
          }, (5500 * setTimeOutMultiplier));
          setTimeout(function() {
            addBackCardCroupier();
          }, (7250 * setTimeOutMultiplier));

        })
      }


      function addBackCardCroupier() {
        var img = document.createElement('img');
        img.id = "backCardCroupier";
        img.className = "imgPartie";
        img.src = "Images/deck2.png";

        // test audio coupé et non audio = 0
        // audioCardSound.play();
        if (SoundMuteBool == false) {
          audioCardSound.play();
        }
        document.getElementById("croupier").appendChild(img);
      }


      function hit() {

        $.ajax({
          async: false,
          url: "Footers/footerDistribution.html",
          dataType: "html",
          success: function(response) {
            $("#chipsContainer").html(response);
            ChoixActif = false;
            document.getElementById("footerTitle").innerHTML = " - Distribution... -";
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

              $("#chipsContainer").html(response);
              document.getElementById("footerTitle").innerHTML = " - Choix -";


              document.getElementById("hit").addEventListener("click", function() {

                hit();

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
                if (asJoueur == true) {
                  //  IF NOT BURST
                  if (scoreTotalJoueur + 10 < 22) {
                    scoreTotalJoueur = scoreTotalJoueur + 10;
                  }
                  // POURQUOI AFFICHAGE +10 ALORS QUE DEJA LA VAR EST +10 ??????? 
                  document.getElementById('scoreJoueur').innerHTML = (scoreTotalJoueur);

                }
                lancerPhaseCroupier();
              });

              //***  shortcut Stand
              function doc_keyStand(e) {
                if ((e.key === '-') && (ChoixActif == true)) {
                    lancerPhaseCroupier();
                }
              }
              document.addEventListener('keyup', doc_keyStand, false);
              //*** FIN


              document.getElementById("double").addEventListener("click", function() {
                double();
              });
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
      }




      function lancerPhaseCroupierAfterBurst() {
        // $.ajax({
        //   async: false,
        //   url: "Footers/footerDistribution.html",
        //   dataType: "html",
        //   success: function(response) {
        //     $("#chipsContainer").html(response);
        //     document.getElementById("footerTitle").innerHTML = " - Distribution... -";
        //   }
        // });


        addCardCroupierRecursiveAfterBurst();

        function addCardCroupierRecursiveAfterBurst() {
          setTimeout(function() {
            document.getElementById("backCardCroupier").classList.add("fadeOut2");
          }, 1550 * setTimeOutMultiplier)
  
          setTimeout(function() {
            document.getElementById("backCardCroupier").remove();
          }, 2150 * setTimeOutMultiplier)
          
          if (scoreTotalCroupier < 17) {
            setTimeout(function() {
              addCardCroupier();
              addCardCroupierRecursiveAfterBurst();
            }, 2150 * setTimeOutMultiplier)
          }
          else {
            // resultat();
            if ((scoreTotalCroupier > 16) && (scoreTotalCroupier < 22)) {
              setTimeout(function() {
                document.getElementById("scoreCroupier").style.backgroundColor = "rgba(59,217,10,1)"
                document.getElementById("scoreCroupier").style.color = "rgba(255,245,0, 1)"
                document.getElementById("scoreCroupier").style.textShadow = "1px 1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, -1px -1px 0 #000000, 1px 0px 0 #000000, 0px 1px 0 #000000, -1px 0px 0 #000000, 0px -1px 0 #000000";
                document.getElementById("scoreCroupier").style.border = "3px solid rgba(58,157,32, 1)";
              }, 400);
            }
            else if (scoreTotalCroupier > 21) {
              setTimeout(function() {
                document.getElementById("scoreCroupier").style.backgroundColor = "rgba(215,31,48,1)"
                document.getElementById("scoreCroupier").style.color = "rgba(239,230,230, 1)"
                document.getElementById("scoreCroupier").style.textShadow = "1px 1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, -1px -1px 0 #000000, 1px 0px 0 #000000, 0px 1px 0 #000000, -1px 0px 0 #000000, 0px -1px 0 #000000";
                document.getElementById("scoreCroupier").style.border = "3px solid rgba(130,14,39, 1)";
              }, 400);
            }
          }
        };

        
      }



      function lancerPhaseCroupier() {
          $.ajax({
            async: false,
            url: "Footers/footerDistribution.html",
            dataType: "html",
            success: function(response) {
              $("#chipsContainer").html(response);
              ChoixActif = false;
              document.getElementById("footerTitle").innerHTML = " - Distribution... -";
            }
          });

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

            
            if (scoreTotalCroupier < 17) {
              setTimeout(function() {
                addCardCroupier();
                addCardCroupierRecursive();
              }, 2150 * setTimeOutMultiplier)
            }
            else {
              //Ajouter un if avec bool BurstJoueur (si burstJoueur)?
              // if (burstJoueur = false) {
              //   resultat();
              // }
              resultat();
            }
          };




          function resultat() {
            setTimeout(function() {
              if (scoreTotalCroupier > scoreTotalJoueur && scoreTotalCroupier < 22) {
                $.ajax({
                  async: false,
                  url: "Footers/footerCroupierWin.html",
                  dataType: "html",
                  success: function(response) {
                    $("#container3").html(response);
                    console.log(scoreTotalCroupier);
                    ChoixActif = false;
                    document.getElementById("footerTitle").innerHTML = " - Résultat -";

                    // Mise lockée
                    document.getElementById("miseLockedFooter").innerHTML = miseLocked;
                    // fin

                    // Résultat Gains 
                    document.getElementById("miseResultat").innerHTML = miseLocked;
                    setTimeout( function() {
                      DecrementGain();
                    }, 1500); 

                    // WIP gain (ajouter effet refresh CSS)
                    setTimeout( function() {
                      gain = -miseLocked;
                      ajoutGain(gain)
                    }, 500)
                    //
                    

                    document.getElementById("deckContainer").remove();

                    // Perdu
                      // rubans de Win/Loose
                      // document.getElementById("croupier").style.backgroundColor = "rgba(61,255,1,0.3)";
                      // document.getElementById("joueur").style.backgroundColor = "rgba(255,1,49,0.3)";
                      // Fin rubans
                    
                    document.getElementById("scoreCroupier").style.backgroundColor = "rgba(59,217,10,1)";
                    document.getElementById("scoreJoueur").style.backgroundColor = "rgba(215,31,48,1)";

                    document.getElementById("scoreCroupier").style.color = "rgba(255,245,0,1)";
                    document.getElementById("scoreJoueur").style.color = "rgba(239,230,230,1)";

                    document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)";
                    document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)";

                    document.getElementById("scoreCroupier").style.border = "1px solid rgba(58,157,32,0.5)";
                    document.getElementById("scoreJoueur").style.border = "1px solid rgba(255,1,49,0.5)";                  
                    // Fin Perdu

                    // Séparateur
                    setTimeout(function() {
                      //Apparition
                      document.getElementById("resultatText").classList.add("resultatTextLose");
                      document.getElementById("separateur").classList.add("styleSeparateurLose");

                      if (SoundMuteBool == false) {
                        audioExplosionBust.play();
                      }
                      // TEST audio coupé et non audio = 0 
                      // audioExplosionBust.play();

                      // Animation scale() qui pop avec fadeIn()
                      document.getElementById("separateur").classList.add("fadeInResultat");
                      document.getElementById("separateur").classList.add("scaleBoom");
                      // document.getElementById("separateur").classList.add("marginFix");

                      // TEXT
                      document.getElementById("resultatText").innerText = "WASTED";
                    }, 250);
                    // Fin séparateur

                    // Apparition bouton (après PhaseCroupier sinon MessUp si cliqué trop tot)
                    setTimeout(function() { 
                      document.getElementById("relancer").classList.add("fadeInResultat");
                      document.getElementById("relancer").style.visibility = "visible";

                      // Disparition boutton onClick
                      document.getElementById("relancer").addEventListener("click", function() {
                        // document.getElementById("relancer").classList.add("fadeOut");
                        document.getElementById("relancer").style.visibility = "hidden";
                      })
                    }, 2000)

                    // Bouton Rejouer
                    relancer();
                  }
                });
              }



            if (scoreTotalCroupier > 21) {
              setTimeout(function() {
                $.ajax({
                  async: false,
                  url: "Footers/footerJoueurGagne.html",
                  dataType: "html",
                  success: function(response) {
                    $("#container3").html(response);
                    ChoixActif = false;
                    document.getElementById("footerTitle").innerHTML = " - Résultat -";
  
                      // Mise lockée
                      document.getElementById("miseLockedFooter").innerHTML = miseLocked;
                      // fin
  
                      // Résultat Gains 
                      document.getElementById("miseResultat").innerHTML = miseLocked;
                      setTimeout( function() {
                        IncrementGain(miseLockedMultiplied);
                      }, 1500);

                      setTimeout( function() {
                        gain = miseLocked;
                        ajoutGain(gain)
                      }, 500)

                      
                        // function: (en partant de la mise vers le gains réel)
                        var miseLockedMultiplied = miseLocked * 2;
                        // function IncrementGain() {
                        //   setTimeout( function() {
                        //       if (miseLocked < miseLockedMultiplied) {
                        //       miseLocked = miseLocked + 1;
                        //       document.getElementById("miseResultat").innerHTML = miseLocked;
                        //       document.getElementById("miseResultat").classList.add("addColorToResultatGreen");
                        //       IncrementGain();
                        //       }
                        //   }, 20);
                        // } 
                        // fin fonction
                      // Fin résultat Gains
  
                    // FIN WIP
                    

                    document.getElementById("deckContainer").remove();
                    // document.getElementById("deckContainer").classList.add("fadeOut");
  
                    document.getElementById("scoreCroupier").style.backgroundColor = "rgba(215,31,48,1)";
                    document.getElementById("scoreJoueur").style.backgroundColor = "rgba(59,217,10,1)";

                    document.getElementById("scoreCroupier").style.color = "rgba(239,230,230,1)";
                    document.getElementById("scoreJoueur").style.color = "rgba(255,245,0,1)";

                    document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)";
                    document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)";

                    document.getElementById("scoreCroupier").style.border = "1px solid rgba(255,1,49,0.5)";
                    document.getElementById("scoreJoueur").style.border = "1px solid rgba(58,157,32,0.5)";


                    // Séparateur
                    setTimeout(function() {
                      //Apparition
                      document.getElementById("resultatText").classList.add("resultatTextWin");
                      document.getElementById("separateur").classList.add("styleSeparateurWin");

                      
                      if (SoundMuteBool == false) {
                        audioCoinWin.play();
                      }
                      // TEST audio coupé et non audio = 0;
                      // audioCoinWin.play();

                      // Animation scale() qui pop avec fadeIn()
                      document.getElementById("separateur").classList.add("fadeInResultat");
                      document.getElementById("separateur").classList.add("scaleBoom");
                      // document.getElementById("separateur").classList.add("marginFix");

                      // TEXT
                      document.getElementById("resultatText").innerText = "BIG WIN";
                    }, 250);
                    // Fin séparateur
  
                    // Apparition bouton (après PhaseCroupier sinon MessUp si cliqué trop tot)
                    setTimeout(function() { 
                      document.getElementById("relancer").classList.add("fadeInResultat");
                      document.getElementById("relancer").style.visibility = "visible";

                      // Disparition boutton onClick
                      document.getElementById("relancer").addEventListener("click", function() {
                        // document.getElementById("relancer").classList.add("fadeOut");
                        document.getElementById("relancer").style.visibility = "hidden";
                      })
                    }, 2000)

                    // Bouton Rejouer
                    relancer();
                  }
                });
              }, 0);
            }

              if (scoreTotalJoueur > scoreTotalCroupier) {
                setTimeout(function() {
                  $.ajax({
                    async: false,
                    url: "Footers/footerJoueurGagne.html",
                    dataType: "html",
                    success: function(response) {
                      $("#container3").html(response);
                      ChoixActif = false;
                      document.getElementById("footerTitle").innerHTML = " - Résultat -";
    
                        // Mise lockée
                        document.getElementById("miseLockedFooter").innerHTML = miseLocked;
                        // fin
    
                        // Résultat Gains 
                        document.getElementById("miseResultat").innerHTML = miseLocked;
                        setTimeout( function() {
                          IncrementGain(miseLockedMultiplied);
                        }, 1500);

                        setTimeout( function() {
                          gain = miseLocked;
                          ajoutGain(gain)
                        }, 500)
  
                        
                          // function: (en partant de la mise vers le gains réel)
                          var miseLockedMultiplied = miseLocked * 2;
                          // function IncrementGain() {
                          //   setTimeout( function() {
                          //       if (miseLocked < miseLockedMultiplied) {
                          //       miseLocked = miseLocked + 1;
                          //       document.getElementById("miseResultat").innerHTML = miseLocked;
                          //       document.getElementById("miseResultat").classList.add("addColorToResultatGreen");
                          //       IncrementGain();
                          //       }
                          //   }, 20);
                          // } 
                          // fin fonction
                        // Fin résultat Gains
    
                      // FIN WIP
                      
  
                      document.getElementById("deckContainer").remove();
                      // document.getElementById("deckContainer").classList.add("fadeOut");
    
                      document.getElementById("scoreCroupier").style.backgroundColor = "rgba(215,31,48,1)";
                      document.getElementById("scoreJoueur").style.backgroundColor = "rgba(59,217,10,1)";
  
                      document.getElementById("scoreCroupier").style.color = "rgba(239,230,230,1)";
                      document.getElementById("scoreJoueur").style.color = "rgba(255,245,0,1)";
  
                      document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)";
                      document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)";
  
                      document.getElementById("scoreCroupier").style.border = "1px solid rgba(255,1,49,0.5)";
                      document.getElementById("scoreJoueur").style.border = "1px solid rgba(58,157,32,0.5)";
  
                      
                      // Séparateur
                      setTimeout(function() {
                        //Apparition
                        document.getElementById("resultatText").classList.add("resultatTextWin");
                        document.getElementById("separateur").classList.add("styleSeparateurWin");

                        if (SoundMuteBool == false) {
                          audioCoinWin.play();
                        }
                        // TEST audio coupé et non audio = 0
                        // audioCoinWin.play();

                        // Animation scale() qui pop avec fadeIn()
                        document.getElementById("separateur").classList.add("fadeInResultat");
                        document.getElementById("separateur").classList.add("scaleBoom");
                        // document.getElementById("separateur").classList.add("marginFix");

                        // TEXT
                        document.getElementById("resultatText").innerText = "BIG WIN";
                      }, 250);
                      // Fin séparateur
    
                      // Apparition bouton (après PhaseCroupier sinon MessUp si cliqué trop tot)
                      setTimeout(function() { 
                        document.getElementById("relancer").classList.add("fadeInResultat");
                        document.getElementById("relancer").style.visibility = "visible";

                        // Disparition boutton onClick
                        document.getElementById("relancer").addEventListener("click", function() {
                          // document.getElementById("relancer").classList.add("fadeOut");
                          document.getElementById("relancer").style.visibility = "hidden";
                        })
                      }, 2000)
      
                      // Bouton Rejouer
                      relancer();
                    }
                  });
                }, 0);
              }

              if (scoreTotalJoueur == scoreTotalCroupier) {

                $.ajax({
                  async: false,
                  url: "Footers/footerBurstJoueur.html",
                  dataType: "html",
                  success: function(response) {
                    $("#container3").html(response);
                    ChoixActif = false;
                    document.getElementById("footerTitle").innerHTML = " - Résultat -";
  
                    // WIP footerResultat
                      // WIP: Fade In du résultat
                        // document.getElementById("container3").visibility = "hidden";
                        // document.getElementById("container3").classList.add("fadeIn2");
                      // Fin WIP: Fade In du résultat
  
                      // Mise lockée
                      document.getElementById("miseLockedFooter").innerHTML = miseLocked;
                      // fin
  
                      // Résultat Gains 
                      document.getElementById("miseResultat").innerHTML = miseLocked;

                      setTimeout( function() {
                        gain = 0;
                        ajoutGain(gain)
                      }, 500)
                      
                      document.getElementById("miseResultat").classList.add("addColorToResultatYellow");

                      // Fin résultat Gains
  
                    // FIN WIP
                  
  
                    document.getElementById("deckContainer").remove();
  


                    document.getElementById("scoreCroupier").style.color = "rgb(11 136 6)";
                    document.getElementById("scoreJoueur").style.color = "rgb(11 136 6)";

                    document.getElementById("scoreCroupier").style.textShadow = "#0d0d0d 0px 0px 1px";
                    document.getElementById("scoreJoueur").style.textShadow = "#0d0d0d 0px 0px 1px";

                    document.getElementById("scoreCroupier").style.backgroundColor = "rgb(252 176 69)";
                    document.getElementById("scoreJoueur").style.backgroundColor = "rgb(252 176 69)"; 

                    
                    // Séparateur
                    setTimeout(function() {
                      //Apparition
                      document.getElementById("resultatText").classList.add("resultatTextPush");
                      document.getElementById("separateur").classList.add("styleSeparateurPush");

                      if (SoundMuteBool == false) {
                        audioPush.play();
                      }
                      // TEST audio coupé et non audio = 0;
                      // audioPush.play();

                      // Animation scale() qui pop avec fadeIn()
                      document.getElementById("separateur").classList.add("fadeInResultat");
                      document.getElementById("separateur").classList.add("scaleBoom");
                      // document.getElementById("separateur").classList.add("marginFix");

                      // TEXT
                      document.getElementById("resultatText").innerText = "Push";
                    }, 250);
                    // Fin séparateur
  
                    // Apparition bouton (après PhaseCroupier sinon MessUp si cliqué trop tot)
                    setTimeout(function() { 
                      document.getElementById("relancer").classList.add("fadeInResultat");
                      document.getElementById("relancer").style.visibility = "visible";

                      // Disparition boutton onClick
                    document.getElementById("relancer").addEventListener("click", function() {
                      // document.getElementById("relancer").classList.add("fadeOut");
                      document.getElementById("relancer").style.visibility = "hidden";
                    })
                    }, 2000)
  
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
          document.getElementById("miseEnCours").className ="miseEnCours";
        }
      }

      function addLastTokenClickToTab(value) {
        logTokenValues.unshift(value);
        console.log(logTokenValues);
      }




      function tokensClick() {

          // Créer une var global créditpotentiel
        
          document.getElementById("whiteToken").addEventListener("click", function() {
          
            if ((credits-miseEnCours) >= 1) {
              addLastTokenClickToTab(1);
    

              if (SoundMuteBool == false) {
                audioToken.play();
              }
              // Test audio coupé et non audio = 0;
              // audioToken.play();
    
              miseEnCours += 1;

              if (isConnected == true) {
                document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
              }
              else {
                document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
              }

              miseBoutonStyle();
              // misePop();
              // setTimeout(function scoreDepop() {
              //   document.getElementById("miseEnCours").classList.toggle('scorePop');
              // }, 500);
              cssMiseEnCours();
            }
          })
        //*** Backup WhiteTokenClick
        // document.getElementById("whiteToken").addEventListener("click", function() {
          
        //   addLastTokenClickToTab(1);

        //   audioToken.play();

        //   miseEnCours += 1;
        //   document.getElementById("miseEnCours").innerHTML = miseEnCours + " &#8364;";
        //   miseBoutonStyle();
        //   misePop();
        //   setTimeout(function scoreDepop() {
        //     document.getElementById("miseEnCours").classList.toggle('scorePop');
        //   }, 500);
        //   cssMiseEnCours();
        // })
        // FIN backup

          document.getElementById("redToken").addEventListener("click", function() {

            if ((credits-miseEnCours) >= 5) {
              addLastTokenClickToTab(5);

              if (SoundMuteBool == false) {
                audioToken.play();
              }
              // Test audio coupé et non audio = 0;
              // audioToken.play();

              miseEnCours += 5;

              if (isConnected == true) {
                document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
              }
              else {
                document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
              }

              miseBoutonStyle();
              // misePop();
              // setTimeout(function scoreDepop() {
              //   document.getElementById("miseEnCours").classList.toggle('scorePop');
              // }, 500);
              cssMiseEnCours();
            }

          })
        

          document.getElementById("greenToken").addEventListener("click", function() {

            if ((credits-miseEnCours) >= 10) {
              addLastTokenClickToTab(10);

              if (SoundMuteBool == false) {
                audioToken.play();
              }
              // Test audio coupé et non audio = 0;
              // audioToken.play();

              miseEnCours += 10;

              if (isConnected == true) {
                document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
              }
              else {
                document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
              }
              
              miseBoutonStyle();
              // misePop();
              // setTimeout(function scoreDepop() {
              //   document.getElementById("miseEnCours").classList.toggle('scorePop');
              // }, 500);
              cssMiseEnCours();
            }

          })
       

        document.getElementById("blueToken").addEventListener("click", function() {

          if ((credits-miseEnCours) >= 25) {
            addLastTokenClickToTab(25);

            if (SoundMuteBool == false) {
              audioToken.play();
            }
            // Test audio coupé et non audio = 0;
            // audioToken.play();

            miseEnCours += 25;

            if (isConnected == true) {
              document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
            }
            else {
              document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
            }
              
            miseBoutonStyle();
            // misePop();
            // setTimeout(function scoreDepop() {
            //   document.getElementById("miseEnCours").classList.toggle('scorePop');
            // }, 500);
            cssMiseEnCours();
          }

        })

        

        document.getElementById("blackToken").addEventListener("click", function() {

          if ((credits-miseEnCours) >= 100) {
            addLastTokenClickToTab(100);

            if (SoundMuteBool == false) {
              audioToken.play();
            }
            // Test audio coupé et non audio = 0;
            // audioToken.play();

            miseEnCours += 100;

            if (isConnected == true) {
              document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
            }
            else {
              document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
            }
              
            miseBoutonStyle();
            // misePop();
            // setTimeout(function scoreDepop() {
            //   document.getElementById("miseEnCours").classList.toggle('scorePop');
            // }, 500);
            cssMiseEnCours();
          }
        })


      }
      
      

      

      // WARNING si footerMise collapsed quand phase de Mise
      function checkMiseWarning() {
        // if ((isCollapsed == true) && (isPhaseMise == true)) {
        //     document.getElementById("footerTitle").innerHTML = "- MISE -  /!\\";
        // }
        // else {
        // document.getElementById("footerTitle").innerHTML = "- MISE -";
        // }
      }


      // Phase mise
      function phaseMise() {
        isPhaseMise = true;
        miseEnCours = 0;
        document.getElementById("miseEnCours").innerHTML = miseEnCours;
      }



      // NOUVELLE CARTE  > CROUPIER (+ScoreTOTAL)
      function addCardCroupier() {

        // Créer l'élément <img/>
        var img = document.createElement('img');
        // Pick l'objet et le stock dans une VAR
        let pickedCardObject = cards[Math.floor(Math.random()*cards.length)]
        // Associe la VALUE de la KEY "cardImageUrl", à l'attribut HTML de l'<img> créé
        img.src = pickedCardObject.cardImageURL;

        //Choix du AS non affiché pour le croupier (titre)
        if (pickedCardObject.cardValue == 1) {
          asCroupier = true;
        }
        //FIN

        // Scores Total Croupier
        if (asCroupier == true) {
          asCroupier = false;
          if (scoreTotalCroupier + 10 > 21) {
            scoreTotalCroupier += pickedCardObject.cardValue;
          }
          else {
            scoreTotalCroupier += (pickedCardObject.cardValue + 10);
          }
        }
        else {
          scoreTotalCroupier += pickedCardObject.cardValue;
        }

        // scoreTotalCroupier += pickedCardObject.cardValue;

        setTimeout (function() {
          // Refresh FadeInAnimation Score
          var elementScore = document.getElementById("scoreCroupier");
          elementScore.classList.remove("scores");
          void elementScore.offsetWidth;
          elementScore.classList.add("scores");

          // Choix du AS non affiché pour le croupier (titre)
          // if (asCroupier == true) {
          //   document.getElementById('scoreCroupier').style.letterSpacing = 0;
          //   document.getElementById('scoreCroupier').innerHTML = scoreTotalCroupier + " / " + (scoreTotalCroupier + 10);
          // }
          // else {
          //   document.getElementById('scoreCroupier').innerHTML = scoreTotalCroupier;
          // }
          //FIN
          document.getElementById('scoreCroupier').innerHTML = scoreTotalCroupier;

          document.getElementById('scoreCroupier').classList.add("scoreBorder");
          document.getElementById("scoreCroupier").style.visibility = "visible";
        }, 400);
      
        // Index de la pickedCard pour Splice() {càd remove from array by id}
        var picketCardIndex = cards.indexOf(pickedCardObject);
        cards.splice(picketCardIndex, 1);
        // fin
        // cards.splice(picketCardIndex, 1);

        // Ajoute class à img pour CSS
        img.className = "imgPartie";

        // Ajoute la var img à l'<ul> "#croupier"
        if (SoundMuteBool == false) {
          audioCardSound.play();
        }
        // Test audio coupé et non audio = 0;
        // audioCardSound.play();


        document.getElementById("croupier").appendChild(img);

        if (burstJoueur == false) {
          decrementCompteurDeck();
        }

        checkMiseWarning();


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
      // FIN



      function distribAnim() {
        var img = document.createElement('img')
        img.classList.add("deckAnimStyle");
        // img.style.width = "75px";
        // img.style.position = "absolute";
        // img.style.left = "15%";
        // img.style.top = "18%";
        // img.style.borderRadius = "3px";
        img.src = "Images/deck2.png";

        document.getElementById('deckContainer').appendChild(img);
      }



      // NOUVELLE CARTE  > JOUEUR (+ScoreTOTAL)
      function addCardJoueur() {


        // WIP Animation Distribution Carte
        distribAnim();
        // FIN

        var img = document.createElement('img');
        let pickedCardObject = cards[Math.floor(Math.random()*cards.length)];
        img.src = pickedCardObject.cardImageURL;
        

        //WIP AS
        if (pickedCardObject.cardValue == 1) {
          asJoueur = true;
          // console.log("WIP AS see line --->");

          // newValue = scoreTotalJoueur + 10;
        }
        //FIN
        nbrCardsJoueur = nbrCardsJoueur + 1;
        console.log("nbrCardsJoueur: " + nbrCardsJoueur);

        scoreTotalJoueur += pickedCardObject.cardValue;

        

        // MàJ score avec petit delai (et refresh CSS)
        setTimeout(function() {
          var elementScore = document.getElementById("scoreJoueur");
          elementScore.classList.remove("scores");
          void elementScore.offsetWidth;
          elementScore.classList.add("scores");

          //
          //WIP AS 
          if (asJoueur == true) {
            if ((scoreTotalJoueur + 10) > 21) {
              document.getElementById('scoreJoueur').innerHTML = scoreTotalJoueur;
            }
            else {
              document.getElementById('scoreJoueur').innerHTML = scoreTotalJoueur + "&nbsp;&nbsp;/&nbsp;&nbsp;" + (scoreTotalJoueur + 10);
            }
          }
          else {
            document.getElementById('scoreJoueur').innerHTML = scoreTotalJoueur;
          }
          //FIN

          // document.getElementById('scoreJoueur').innerHTML = scoreTotalJoueur;  // Avec if bool AS , innerHTML = ... / ....
          document.getElementById('scoreJoueur').classList.add("scoreBorder");
          document.getElementById("scoreJoueur").style.visibility = "visible";
        }, 400);

        var picketCardIndex = cards.indexOf(pickedCardObject);
        cards.splice(picketCardIndex, 1);

        img.className = "imgPartie";

        if (SoundMuteBool == false) {
          audioCardSound.play();
        }
        // TEST audio coupé et non audio = 0;
        // audioCardSound.play();


        document.getElementById("joueur").appendChild(img);

        decrementCompteurDeck()

        checkMiseWarning();

        checkBurstJoueur();
        checkBJjoueur();

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
        document.getElementById("compteurDeck").innerHTML = compteurDeck;
      }

      if (isConnected == true) {
        function ajoutGain(gain) {
          document.getElementById("creditsConnected").innerHTML = (credits + gain);
          credits = credits + gain;

          var gainToPhp = {};
          gainToPhp.value = gain;

          console.log("(JS) Gain: " + gain);
          $.ajax({
            url: "setCredits.php",
            method: "post",
            data: gainToPhp,
            success: function(res) {
              console.log("(JS) success POST: " + res);
            }
          })
        }
      }
      else if (isConnected == false) {
        function ajoutGain(gain) {
          document.getElementById("credits").innerHTML = "Crédits: &nbsp;" + (credits + gain) + "<img src='Images/souBleu.png' class=\"imageSouDeco\">";
          credits = credits + gain;
        }
      }
      

      

      function checkBurstJoueur() {
        if (scoreTotalJoueur > 21) {
            burstJoueur = true;

            setTimeout(function() {
              $.ajax({
                async: false,
                url: "Footers/footerBurstJoueur.html",
                dataType: "html",
                success: function(response) {
                  $("#container3").html(response);
                  ChoixActif = false;
                  document.getElementById("footerTitle").innerHTML = " - Résultat -";

                  // WIP footerResultat
                    // WIP: Fade In du résultat
                      // document.getElementById("container3").visibility = "hidden";
                      // document.getElementById("container3").classList.add("fadeIn2");
                    // Fin WIP: Fade In du résultat

                    // Mise lockée
                    document.getElementById("miseLockedFooter").innerHTML = miseLocked;
                    // fin

                    // Résultat Gains 
                    
                    document.getElementById("miseResultat").innerHTML = miseLocked;
                    setTimeout( function() {
                      DecrementGain();
                    }, 1500);

                    // WIP gain (ajouter effet refresh CSS)
                      setTimeout( function() {
                        gain = -miseLocked;
                        ajoutGain(gain)
                      }, 500)
                    //

                    
                      
                    // Fin résultat Gains

                  // FIN WIP
                  

                  document.getElementById("deckContainer").remove();
                  // document.getElementById("deckContainer").classList.add("fadeOut");


                  //*** Perdu BURST 
                  document.getElementById("scoreJoueur").style.backgroundColor = "rgba(215,31,48,1)"
                  document.getElementById("scoreJoueur").style.color = "rgba(239,230,230, 1)"
                  document.getElementById("scoreJoueur").style.textShadow = "1px 1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, -1px -1px 0 #000000, 1px 0px 0 #000000, 0px 1px 0 #000000, -1px 0px 0 #000000, 0px -1px 0 #000000";
                  document.getElementById("scoreJoueur").style.border = "3px solid rgba(130,14,39, 1)";
                  // Fin Perdu BURST

                  
                  // Séparateur
                  setTimeout(function() {
                    //Apparition
                    document.getElementById("resultatText").classList.add("resultatTextBust");
                    document.getElementById("separateur").classList.add("styleSeparateurBust");
  

                    if (SoundMuteBool == false) {
                      audioExplosionBust.play();
                    }
                    // TEST audio coupé et non audio = 0;
                    // audioExplosionBust.play();
  
                    // Animation scale() qui pop avec fadeIn()
                    document.getElementById("separateur").classList.add("fadeInResultat");
                    document.getElementById("separateur").classList.add("scaleBoom");
                    // document.getElementById("separateur").classList.add("marginFix");
                  
                    // TEXT
                    document.getElementById("resultatText").innerText = "BUST";
                  }, 250);
                  // Fin séparateur

                  setTimeout(function() {
                    lancerPhaseCroupierAfterBurst();
                  }, 750)

                  // Apparition bouton (après PhaseCroupier sinon MessUp si cliqué trop tot)
                  setTimeout(function() { 
                    document.getElementById("relancer").classList.add("fadeInResultat");
                    document.getElementById("relancer").style.visibility = "visible";

                    // Disparition boutton onClick
                    document.getElementById("relancer").addEventListener("click", function() {
                      // document.getElementById("relancer").classList.add("fadeOut");
                      document.getElementById("relancer").style.visibility = "hidden";
                    })
                  }, 2000)

                  // Bouton Rejouer
                  relancer();
                }
              });
            }, 1200);
        }
      }












      // document.getElementById('scoreJoueur').innerHTML = (scoreTotalJoueur + 10);





      // *******************************************************************************
      // Si 21 (hors-BlackJack) = le jeu s'arrète et Joueur gagne direct,  il faut un check:
      //
      // FUNCTION CHECK21() {
        if ((scoreTotalJoueur == 21) && (nbrCardsJoueur > 2)) {
          //      "&& nbrOfJoueurCards == 2"     (pour le vrai BJ)
          console.log("nbrCardsJoueur: " + nbrCardsJoueur + "&nbscp; |~~~  21  ~~~|");

          setTimeout(function() {
            $.ajax({
              async: false,
              url: "Footers/footerJoueurGagne.html",
              dataType: "html",
              success: function(response) {
                $("#container3").html(response);
                ChoixActif = false;
                document.getElementById("footerTitle").innerHTML = " - Résultat -";

                // WIP footerResultat
                  // WIP: Fade In du résultat
                    // document.getElementById("container3").visibility = "hidden";
                    // document.getElementById("container3").classList.add("fadeIn2");
                  // Fin WIP: Fade In du résultat

                  // Mise lockée
                  document.getElementById("miseLockedFooter").innerHTML = miseLocked;
                  // fin

                  // Résultat Gains 
                  var miseLockedMultiplied = 2 * miseLocked;
                  document.getElementById("miseResultat").innerHTML = miseLocked;
                  setTimeout( function() {
                    IncrementGain(miseLockedMultiplied);
                  }, 1500);
                  
                    // DOUBLON ??
                    // var miseLockedMultiplied = 3 * miseLocked;

                  // WIP gain (ajouter effet refresh CSS)
                  setTimeout( function() {
                    gain = miseLocked;
                    ajoutGain(gain)
                  }, 500)
                  //
                    
                  // Fin résultat Gains

                // FIN WIP
                


                document.getElementById("deckContainer").remove();
                // document.getElementById("deckContainer").classList.add("fadeOut");

                //*** Perdu BURST 
                document.getElementById("scoreCroupier").style.backgroundColor = "rgba(215,31,48,1)";
                document.getElementById("scoreJoueur").style.backgroundColor = "rgba(59,217,10,1)";

                document.getElementById("scoreCroupier").style.color = "rgba(239,230,230,1)";
                document.getElementById("scoreJoueur").style.color = "rgba(255,245,0,1)";

                document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)";
                document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)";

                document.getElementById("scoreCroupier").style.border = "1px solid rgba(255,1,49,0.5)";
                document.getElementById("scoreJoueur").style.border = "1px solid rgba(58,157,32,0.5)";
                // Fin Perdu BURST


                // Séparateur
                setTimeout(function() {
                  document.getElementById("resultatText").classList.add("resultatTextBJ");
                  document.getElementById("separateur").classList.add("styleSeparateurBlackJack");

                  audioCoinWin.play();

                  // Animation scale() qui pop avec fadeIn()
                  document.getElementById("separateur").classList.add("fadeInResultat");
                  document.getElementById("separateur").classList.add("scaleBoom");
                  // document.getElementById("separateur").classList.add("marginFix");
                
                  // TEXT
                  document.getElementById("resultatText").innerText = "21 !";
                }, 250);
                // Fin Séparateur

                // Apparition bouton (après PhaseCroupier sinon MessUp si cliqué trop tot)
                setTimeout(function() { 
                  document.getElementById("relancer").classList.add("fadeInResultat");
                  document.getElementById("relancer").style.visibility = "visible";

                  // Disparition boutton onClick
                  document.getElementById("relancer").addEventListener("click", function() {
                    // document.getElementById("relancer").classList.add("fadeOut");
                    document.getElementById("relancer").style.visibility = "hidden";
                  })
                }, 2000)

                // Bouton Rejouer
                relancer();
              }
            });
          }, 1200);
        }

      // }
      // *******************************************************************************









      // TRUE BLACKJACK
      // *******************************************************************************
      
      function checkBJjoueur() {
        // Proc lors de faux BlackJack (Add condition nbrCardJoueur == 2)

        if ((scoreTotalJoueur + 10 == 21) && (nbrCardsJoueur == 2) && (asJoueur == true)) {
          //      "&& nbrOfJoueurCards == 2"     (pour le vrai BJ)
          console.log("nbrCardsJoueur: " + nbrCardsJoueur + "&nbscp; |true BLACKJACK|");

          setTimeout(function() {
            $.ajax({
              async: false,
              url: "Footers/footerJoueurGagne.html",
              dataType: "html",
              success: function(response) {
                $("#container3").html(response);
                ChoixActif = false;
                document.getElementById("footerTitle").innerHTML = " - Résultat -";

                // WIP footerResultat
                  // WIP: Fade In du résultat
                    // document.getElementById("container3").visibility = "hidden";
                    // document.getElementById("container3").classList.add("fadeIn2");
                  // Fin WIP: Fade In du résultat

                  // Mise lockée
                  document.getElementById("miseLockedFooter").innerHTML = miseLocked;
                  // fin

                  // Résultat Gains 
                  var miseLockedMultiplied = 3 * miseLocked;
                  document.getElementById("miseResultat").innerHTML = miseLocked;
                  setTimeout( function() {
                    IncrementGain(miseLockedMultiplied);
                  }, 1500);
                  
                    // DOUBLON ??
                    // var miseLockedMultiplied = 3 * miseLocked;

                  // WIP gain (ajouter effet refresh CSS)
                  setTimeout( function() {
                    gain = miseLocked * 2;
                    ajoutGain(gain)
                  }, 500)
                  //
                    
                  // Fin résultat Gains

                // FIN WIP
                


                document.getElementById("deckContainer").remove();
                // document.getElementById("deckContainer").classList.add("fadeOut");

                //*** Perdu BURST 
                document.getElementById("scoreCroupier").style.backgroundColor = "rgba(215,31,48,1)";
                document.getElementById("scoreJoueur").style.backgroundColor = "rgba(59,217,10,1)";

                document.getElementById("scoreCroupier").style.color = "rgba(239,230,230,1)";
                document.getElementById("scoreJoueur").style.color = "rgba(255,245,0,1)";

                document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)";
                document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)";

                document.getElementById("scoreCroupier").style.border = "1px solid rgba(255,1,49,0.5)";
                document.getElementById("scoreJoueur").style.border = "1px solid rgba(58,157,32,0.5)";

                document.getElementById('scoreJoueur').innerHTML = (scoreTotalJoueur + 10);
                // Fin Perdu BURST


                // Séparateur
                setTimeout(function() {
                  document.getElementById("resultatText").classList.add("resultatTextBJ");
                  document.getElementById("separateur").classList.add("styleSeparateurBlackJack");

                  if (SoundMuteBool == false) {
                    audioCoinWin.play();
                  }
                  // Test audio coupé et non audio = 0;
                  // audioCoinWin.play();

                  // Animation scale() qui pop avec fadeIn()
                  document.getElementById("separateur").classList.add("fadeInResultat");
                  document.getElementById("separateur").classList.add("scaleBoom");
                  // document.getElementById("separateur").classList.add("marginFix");
                
                  // TEXT
                  document.getElementById("resultatText").innerText = "BlackJack !";
                }, 250);
                // Fin Séparateur

                // Apparition bouton (après PhaseCroupier sinon MessUp si cliqué trop tot)
                setTimeout(function() { 
                  document.getElementById("relancer").classList.add("fadeInResultat");
                  document.getElementById("relancer").style.visibility = "visible";

                  // Disparition boutton onClick
                  document.getElementById("relancer").addEventListener("click", function() {
                    // document.getElementById("relancer").classList.add("fadeOut");
                    document.getElementById("relancer").style.visibility = "hidden";
                  })
                }, 2000)

                // Bouton Rejouer
                relancer();
              }
            });
          }, 1200);
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