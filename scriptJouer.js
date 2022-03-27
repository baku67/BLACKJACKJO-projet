    
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

      
      var removed = false;

      // Réinitialisé dans le NewGame (tableau des valeurs derniers jetons ajoutés en vue de retour arriere)
      let logTokenValues = [];

      var nbrCardsJoueur;

      var credits = 0;
      var gain = 0;

      var newValue;
      var score = 0;
      var mise = 0;
      var scoreTotalJoueur = 0;
      var scoreTotalCroupier = 0;
      var isPhaseMise = false;

      var miseEnCours;
      var miseLocked;

      var compteurDeck = cards.length;
      var compteurDeckMax = cards.length;

      var burstJoueur = false;

      var asJoueur = new Boolean;
      var asCroupier = new Boolean;
      
      var ChoixActif = false;

      var misesResultatDiff;



      // Boutons Toggle
      var backgroundToggle = new Boolean;
      var setTimeOutMultiplierBool = false;
      var setTimeOutMultiplier = 0.8;
      var SoundMuteBool = true;
      // fin Boutons




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
      }
      function footerShow() {
        content.style.display = "block";
        document.getElementById("arrowPng").setAttribute("src", "Images/arrowDownWhitePng.png");
        document.getElementById("arrowPng").style.bottom = "0px";
        document.getElementById("arrowPng").style.opacity = "0.6";


        isCollapsed = false;
      }
      


      var nbrDecks;

      // document.getElementById("title").style.left = "0%";






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














      // A mettre dans un fichier différent
      $("#historique").click(function() {

          $("#container1").load("historique.php", function() {

            //***  Style des resultatCas
            for (let i = 0; i < 5; i++) {

              let resultatCasHistoriqueLine = document.getElementsByClassName("resultatCasHistorique")[i];
              var historiqueBjBool = false;

              if (resultatCasHistoriqueLine.innerHTML == 'LOSE') {
                resultatCasHistoriqueLine.style.color = "#df2c2c";
              }
              else if (resultatCasHistoriqueLine.innerHTML == 'WIN') {
                resultatCasHistoriqueLine.style.color = "#14e56f";
              }
              else if (resultatCasHistoriqueLine.innerHTML == 'PUSH') {
                resultatCasHistoriqueLine.style.color = "#bebe5e";
              }
              else if (resultatCasHistoriqueLine.innerHTML == 'BJ') {
                resultatCasHistoriqueLine.style.color = "purple";
                historiqueBjBool = true;
              }
            }
            //***  FIN resultatCas


            //***  Style des gains
            for (let i = 0; i < 5; i++) {

              let gainsHistoriqueLine = document.getElementsByClassName("gainHistorique")[i];

              if (parseInt(gainsHistoriqueLine.innerHTML) < 0) {
                gainsHistoriqueLine.style.color = "#df2c2c";
              }
              else if (parseInt(gainsHistoriqueLine.innerHTML) > 0) {
                if (historiqueBjBool == true) {
                  gainsHistoriqueLine.style.color = "purple";
                  historiqueBjBool = false;
                }
                else {
                  gainsHistoriqueLine.style.color = "#14e56f";
                }
              }
              else if (parseInt(gainsHistoriqueLine.innerHTML) == 0) {
                gainsHistoriqueLine.style.color = "#bebe5e";
              }
            }
            //*** FIN gains



            // Style et Formattage Date (personnel)
            for (let i = 0; i < 5; i++) {

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



              anneeActuelle = new Date().getFullYear();
              moiActuel = new Date().getMonth();
              jourActuel = new Date().getDate(); 


              if (year != anneeActuelle) {
                document.getElementsByClassName("dateHistorique")[i].innerHTML = "il y a " + (year - anneeActuelle) + " année(s)";
              }
              else if (month != moiActuel) {
                document.getElementsByClassName("dateHistorique")[i].innerHTML = "il y a " + (moiActuel - month) + " moi(s)";
              }
              else if (day != jourActuel) {
                document.getElementsByClassName("dateHistorique")[i].innerHTML = "il y a " + (jourActuel - day) + " jour(s)";
              }







              // Dans l'ordre
              // Si mois différents :
              // Si jour différents : 
              // Si heures différents : 
              // Si minutes différents : 
              // Supprimer les secondes















            }
            //*** FIN Date
          

          });

          // document.getElementsByClassName("resultatCasHistorique")[0].style.color = "red";

      });


      $("#guide").click(function() {

        $("#container1").load("guide.php");
        
      });

      // $("#jouer").click(function() {

      //   $("#container1").load("index.php");
        
      // });




























        

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

              var winLose = 0;


              // Activation Crédits Brut mode invité (en partie)
              // ******************************** *
              if (isConnected == false) {
                console.log('isConnected: ' + isConnected);
                credits = 100;
                document.getElementById("credits").innerHTML = "Crédits: &nbsp;&nbsp;" + credits + "&nbsp;<img src='Images/souBlancBarre.png' class=\"imageSouDeco\">";
                document.getElementById("credits").style.position = "relative";
                document.getElementById("credits").style.top = "7px";
                document.getElementById("traitLumineux").style.visibility = "visible";
              }
              else {
                console.log('isConnected: ' + isConnected);
                document.getElementById("creditsConnected").innerHTML = creditsConnected;
                document.getElementById("traitLumineux").style.visibility = "visible";
                document.getElementById("traitLumineux").style.position = 'relative';
                document.getElementById("traitLumineux").style.bottom = '20px';
              }
              // ******************************** *
 


              document.getElementById("compteurDeck").innerHTML = compteurDeck;
              document.getElementById("compteurDeckMax").innerHTML = compteurDeckMax;



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
                  setTimeOutMultiplier = 0.8;
                  document.getElementById("speedToggleImage").src = 'Images/fastForwardGrey.png';

                  // $.ajax({
                  //   // Voir si true(JS) = 1(SQL) car en SQL boolean == TINYINT(1)
                  //   url: "setToggleTurbo.php",
                  //   method: "post",
                  //   data: setTimeOutMultiplierBool,
                  //   success: function(res) {
                  //     console.log("(JS) AJAX POST bool 'setTimeOutMultiplierBool' " + res + " vers setToggleTurbo.php réussi");
                  //   }
                  // })
                }
                else {
                  setTimeOutMultiplierBool = true;
                  document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                  setTimeOutMultiplier = 0.4;
                  document.getElementById("speedToggleImage").src = 'Images/fastForwardWhite.png';

                  $.ajax({
                    // Voir si true(JS) = 1(SQL) car en SQL boolean == TINYINT(1)
                    url: "setToggleTurbo.php",
                    method: "post",
                    data: setTimeOutMultiplierBool,
                    success: function(res) {
                      console.log("(JS) AJAX POST bool 'setTimeOutMultiplierBool' " + res + " vers setToggleTurbo.php réussi");
                    }
                  })
                }
              });
              // FIN bouton toggle speed
              // ******************************** *


              // Toggle Design
              // ******************************** *
              // document.getElementById("backgroundButtonContainer").addEventListener("click", function() {
              //   if (backgroundToggle == true) {
              //     backgroundToggle = false;
              //     // document.getElementById("backgroundToggleImage").src = "Images/backgroundToggleImageActif.png";
                  
              //     // TEST
              //     // document.getElementById("footer").style.backgroundImage = 'linear-gradient(-45deg, rgba(104,3,42,1) 0%, rgba(146,14,91,1) 33%, rgba(13,88,94,1) 67%, rgba(26,32,57,1) 100%) !important;';
              //   }
              //   else {
              //     backgroundToggle = true;
              //     // document.getElementById("backgroundToggleImage").src = 'Images/backgroundToggleImage.png';

              //   }
              // })
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
                }
              });
              miseBoutonStyle();
              miseLock();  

          }, 500)
      });



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

          var winLose = 0;
          

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
                document.getElementById("credits").innerHTML = "Crédits: &nbsp;&nbsp;" + credits + "&nbsp;<img src='Images/souBlancBarre.png' class=\"imageSouDeco\">";
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
                }
              });
              miseBoutonStyle();
              miseLock();  
          }, 500)
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
              document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBarre.png" class="imagesSouResultat">';
            }
            else {
              document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBlancBarre.png" class="imagesSouResultat">';
            }            
            document.getElementById("miseResultat").classList.add("addColorToResultatRed");
            DecrementGain();
            }
        }, (110/miseLocked) * setTimeOutMultiplier);
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
              document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBarre.png" class="imagesSouResultat">';
            }
            else {
              document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBlancBarre.png" class="imagesSouResultat">';
            }            
            document.getElementById("miseResultat").classList.add("addColorToResultatBJ");
            IncrementGain(miseLockedMultiplied);
            }
        }, (110/misesResultatDiff) * setTimeOutMultiplier);
      } 












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
            document.getElementById("footerTitle").innerHTML = " - En attente -";
          }
        });

        miseLocked = miseLocked * 2;
        document.getElementById("miseLocked").innerHTML = "<span style='color:rgb(241 205 92 / 95%); font-size:1.8rem; text-shadow: 0 0 4px rgb(255 213 2);'>" + miseLocked + "</span><img src='Images/souBarre.png' class='imageSouPetit'/> " ;

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



          if (isConnected == false) {
            document.getElementById("miseLocked").innerHTML = "<span style='color:rgb(241 205 92 / 95%); font-size:1.8rem; text-shadow: 0 0 4px rgb(255 213 2);'>" + miseLocked + "</span><img src='Images/souBlancBarre.png' class='imageSouPetit'/> ";
          }
          else if (isConnected == true) {
          document.getElementById("miseLocked").innerHTML = "<span style='color:rgb(241 205 92 / 95%); font-size:1.8rem; text-shadow: 0 0 4px rgb(255 213 2);'>" + miseLocked + "</span><img src='Images/souBarre.png' class='imageSouPetit'/> ";
          }

          if (isConnected == false) {
            document.getElementById("credits").innerHTML = "Crédits: &nbsp;&nbsp;" + (credits - miseLocked) + "&nbsp;<img src='Images/souBlancBarre.png' class=\"imageSouDeco\">";
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
          }, 750 * setTimeOutMultiplier)
  
          setTimeout(function() {
            document.getElementById("backCardCroupier").remove();
          }, 1200 * setTimeOutMultiplier)
          
          if (scoreTotalCroupier < 17) {
            setTimeout(function() {
              addCardCroupier();
              addCardCroupierRecursiveAfterBurst();
            }, 1200 * setTimeOutMultiplier)
          }
          else {
            // resultats
            if ((scoreTotalCroupier > 16) && (scoreTotalCroupier < 22)) {
              setTimeout(function() {
                document.getElementById("scoreCroupier").style.color = "rgba(255,245,0,1)";
                document.getElementById("scoreCroupier").style.textShadow = "1px 1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, -1px -1px 0 #000000, 1px 0px 0 #000000, 0px 1px 0 #000000, -1px 0px 0 #000000, 0px -1px 0 #000000";
                document.getElementById("scoreCroupier").style.border = "3px solid rgba(58,157,32, 1)";
              }, 400);
            }
            else if (scoreTotalCroupier > 21) {
              setTimeout(function() {
                document.getElementById("scoreCroupier").style.backgroundColor = "rgb(160 13 27)"
                document.getElementById("scoreCroupier").style.color = "rgba(239,230,230, 1)"
                document.getElementById("scoreCroupier").style.textShadow = "1px 1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, -1px -1px 0 #000000, 1px 0px 0 #000000, 0px 1px 0 #000000, -1px 0px 0 #000000, 0px -1px 0 #000000";
                document.getElementById("scoreCroupier").style.border = "3px solid rgba(130,14,39, 1)";
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
                  setTimeout( function() { 
                    document.getElementById("relancer").style.visibility = "hidden";
                  }, 1500);
                })
              }, 500)
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
              document.getElementById("footerTitle").innerHTML = " - En attente -";
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

                WinLose = 'LOSE';
                resultatCas = 'Wasted';

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
                    if ( isConnected == true) {
                      document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBarre.png" class="imagesSouResultat">';
                    }
                    else {
                      document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBlancBarre.png" class="imagesSouResultat">';
                    }                    
                    setTimeout( function() {
                      DecrementGain();
                    }, 1500); 

                    // WIP gain (ajouter effet refresh CSS)
                    setTimeout( function() {
                      gain = -miseLocked;
                      ajoutGain(gain);

                      winLose = -1;
                      winLoseDB(winLose);

                    }, 500)
                    //
                    

                    document.getElementById("deckContainer").remove();
                    document.getElementById("parametresPartieDiv").remove();


                    
                    // document.getElementById("scoreCroupier").style.backgroundColor = "rgba(59,217,10,1)";
                    document.getElementById("scoreJoueur").style.backgroundColor = "rgb(160 13 27)";

                    document.getElementById("scoreCroupier").style.color = "rgba(255,245,0,1)";
                    document.getElementById("scoreJoueur").style.color = "rgba(239,230,230,1)";

                    document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)";
                    document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)";

                    document.getElementById("scoreCroupier").style.border = "1px solid rgba(255, 245, 0, 0.7)";
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

                    popBoutonReload();

                    // Bouton Rejouer
                    relancer();
                  }
                });
              }



              if (scoreTotalCroupier > 21) {

                WinLose = 'WIN';
                resultatCas = 'Big Win';

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
                        if ( isConnected == true) {
                          document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBarre.png" class="imagesSouResultat">';
                        }
                        else {
                          document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBlancBarre.png" class="imagesSouResultat">';
                        }                      
                        setTimeout( function() {
                          IncrementGain(miseLockedMultiplied);
                        }, 1500);

                        setTimeout( function() {
                          gain = miseLocked;
                          ajoutGain(gain);

                          winLose = 1;
                          winLoseDB(winLose);

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
                      document.getElementById("parametresPartieDiv").remove();
                      // document.getElementById("deckContainer").classList.add("fadeOut");
    
                      document.getElementById("scoreCroupier").style.backgroundColor = "rgb(160 13 27)";
                      // document.getElementById("scoreJoueur").style.backgroundColor = "rgba(59,217,10,1)";

                      document.getElementById("scoreCroupier").style.color = "rgba(239,230,230,1)";
                      document.getElementById("scoreJoueur").style.color = "rgba(255,245,0,1)";

                      document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)";
                      document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)";

                      document.getElementById("scoreCroupier").style.border = "1px solid rgba(255,1,49,0.5)";
                      document.getElementById("scoreJoueur").style.border = "1px solid rgba(255, 245, 0, 0.7)";


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
    
                      popBoutonReload();

                      // Bouton Rejouer
                      relancer();
                    }
                  });
                }, 0);
              }

              if (scoreTotalJoueur > scoreTotalCroupier) {

                WinLose = 'WIN';
                resultatCas = 'Big Win';

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
                        if ( isConnected == true) {
                          document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBarre.png" class="imagesSouResultat">';
                        }
                        else {
                          document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBlancBarre.png" class="imagesSouResultat">';
                        }                        
                        setTimeout( function() {
                          IncrementGain(miseLockedMultiplied);
                        }, 1500);

                        setTimeout( function() {
                          gain = miseLocked;
                          ajoutGain(gain);

                          winLose = 1;
                          winLoseDB(winLose);

                        }, 500)
  
                        
                        var miseLockedMultiplied = miseLocked * 2;

                      
  
                      document.getElementById("deckContainer").remove();
                      document.getElementById("parametresPartieDiv").remove();
                      // document.getElementById("deckContainer").classList.add("fadeOut");
    
                      document.getElementById("scoreCroupier").style.backgroundColor = "rgb(160 13 27)";
                      // document.getElementById("scoreJoueur").style.backgroundColor = "rgba(59,217,10,1)";
  
                      document.getElementById("scoreCroupier").style.color = "rgba(239,230,230,1)";
                      document.getElementById("scoreJoueur").style.color = "rgba(255,245,0,1)";
  
                      document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)";
                      document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)";
  
                      document.getElementById("scoreCroupier").style.border = "1px solid rgba(255,1,49,0.5)";
                      document.getElementById("scoreJoueur").style.border = "1px solid rgba(255, 245, 0, 0.7)";
  
                      
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
    
                      popBoutonReload();
      
                      // Bouton Rejouer
                      relancer();
                    }
                  });
                }, 0);
              }



              if (scoreTotalJoueur == scoreTotalCroupier) {

                WinLose = 'PUSH';
                resultatCas = 'Push';

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
                      if ( isConnected == true) {
                        document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBarre.png" class="imagesSouResultat">';
                      }
                      else {
                        document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBlancBarre.png" class="imagesSouResultat">';
                      }
                      setTimeout( function() {
                        gain = 0;
                        ajoutGain(gain);
                      }, 500)
                      
                      document.getElementById("miseResultat").classList.add("addColorToResultatYellow");

                      // Fin résultat Gains
  
                    // FIN WIP
                  
  
                    document.getElementById("deckContainer").remove();
                    document.getElementById("parametresPartieDiv").remove();



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
          document.getElementById("miseEnCours").className ="miseEnCours";
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
            setTimeout( function() { 
              document.getElementById("relancer").style.visibility = "hidden";
            }, 1500);
          })
        }, 2000)
      }

      


      function tokensClick() {
        
          document.getElementById("whiteToken").addEventListener("click", function() {
          
            if ((credits-miseEnCours) >= 1) {
    
              if (SoundMuteBool == false) {
                audioToken.play();
              }
    
              if (miseEnCours < 100) {
                addLastTokenClickToTab(1);
                miseEnCours += 1;
              }

              if (isConnected == true) {
                document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
              }
              else {
                document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
              }

              miseBoutonStyle();
              cssMiseEnCours();
            }
          })


          document.getElementById("redToken").addEventListener("click", function() {

            if ((credits-miseEnCours) >= 5) {

              if (SoundMuteBool == false) {
                audioToken.play();
              }

              if (miseEnCours <= 95) {
                addLastTokenClickToTab(5);
                miseEnCours += 5;
              }

              if (isConnected == true) {
                document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
              }
              else {
                document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
              }

              miseBoutonStyle();
              cssMiseEnCours();
            }

          })
        

          document.getElementById("greenToken").addEventListener("click", function() {

            if ((credits-miseEnCours) >= 10) {

              if (SoundMuteBool == false) {
                audioToken.play();
              }

              if (miseEnCours <= 90) {
                addLastTokenClickToTab(10);
                miseEnCours += 10;
              }

              if (isConnected == true) {
                document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
              }
              else {
                document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
              }
              
              miseBoutonStyle();
              cssMiseEnCours();
            }

          })
       

        document.getElementById("blueToken").addEventListener("click", function() {

          if ((credits-miseEnCours) >= 25) {
            

            if (SoundMuteBool == false) {
              audioToken.play();
            }

            if (miseEnCours <= 75) {
              addLastTokenClickToTab(25);
              miseEnCours += 25;
            }

            if (isConnected == true) {
              document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
            }
            else {
              document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
            }
              
            miseBoutonStyle();
            cssMiseEnCours();
          }

        })

        

        document.getElementById("blackToken").addEventListener("click", function() {

          if ((credits-miseEnCours) >= 100) {

            if (SoundMuteBool == false) {
              audioToken.play();
            }

            if (miseEnCours == 0) {
              addLastTokenClickToTab(100);
              miseEnCours += 100;
            }

            if (isConnected == true) {
              document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBarre.png' class=\"imagesSou\">";
            }
            else {
              document.getElementById("miseEnCours").innerHTML = miseEnCours + "<img src='Images/souBlancBarre.png' class=\"imagesSou\">";
            }
              
            miseBoutonStyle();
            cssMiseEnCours();
          }
        })


      }

      function addLastTokenClickToTab(value) {
        logTokenValues.unshift(value);
        console.log(logTokenValues);
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
        img.src = "Images/deck2.png";

        document.getElementById('deckContainer').appendChild(img);
      }



      // NOUVELLE CARTE  > JOUEUR (+ScoreTOTAL)
      function addCardJoueur() {


        // WIP Animation Distribution Carte
        // distribAnim();
        // FIN

        var img = document.createElement('img');
        let pickedCardObject = cards[Math.floor(Math.random()*cards.length)];
        img.src = pickedCardObject.cardImageURL;
        

        //WIP AS
        if (pickedCardObject.cardValue == 1) {
          asJoueur = true;
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

        checkBurstJoueur();
        check21noBJ();
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


      function historiqueDB(WinLose, resultatCas, gain) {
        var date = new Date();

        // Array envoyé au php
        var historiqueToPhp = [];
        historiqueToPhp[0] = WinLose;
        historiqueToPhp[1] = resultatCas;
        historiqueToPhp[2] = gain;
        historiqueToPhp[3] = date.toString();
        //historiqueToPhp[4] = scoreJoueur;
        //historiqueToPhp[5] = scoreCroupier();

        console.log("Array JS: [" + historiqueToPhp + "]");

        // Envoi de l'array
        $.ajax({
          url: "setHistorique.php",
          method: "post",
          data: { vArray: historiqueToPhp },
          succes: function(res) {
            console.log("ALLLLLLLOOOOOOOOOOOO prout: " + res);
          }
        });
      }


      // Envoi/Refresh du crédits et appel historiqueDB();
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
              console.log("(JS) success POST gains: " + res);
            }
          });

          // A replacer la ou est appelé ajoutGain();
          historiqueDB(WinLose, resultatCas, gain);
        }
      }
      else if (isConnected == false) {
        function ajoutGain(gain) {
          document.getElementById("credits").innerHTML = "Crédits: &nbsp;" + (credits + gain) + "<img src='Images/souBlancBarre.png' class=\"imageSouDeco\">";
          credits = credits + gain;
        }
      }
      
      

      function checkBurstJoueur() {
        if (scoreTotalJoueur > 21) {

          // Var pour array historiquePhp
          WinLose = 'LOSE';
          resultatCas = 'Bust';
          // gain = gain
          // date est pris dans la fonction historiqueDB

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
                    
                    if ( isConnected == true) {
                      document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBarre.png" class="imagesSouResultat">';
                    }
                    else {
                      document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBlancBarre.png" class="imagesSouResultat">';
                    }                    
                    setTimeout( function() {
                      DecrementGain();
                    }, 1500);

                    // WIP gain (ajouter effet refresh CSS)
                      setTimeout( function() {
                        gain = -miseLocked;
                        ajoutGain(gain);

                        winLose = -1;
                        winLoseDB(winLose);

                      }, 500)
                    //

                    
                      
                    // Fin résultat Gains

                  // FIN WIP
                  

                  document.getElementById("deckContainer").remove();
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
                  }, 500 * setTimeOutMultiplier);


                  // Bouton Rejouer
                  relancer();
                }
              });
            }, 1200);
        }
      }











      // 21 hors BlackJack: Enlever la possibilité de choisir 
      function check21noBJ() {
        if ((scoreTotalJoueur == 21) && (nbrCardsJoueur > 2)) {

          // Pourquoi j'ai eu le moyen de choisir pendant le lancerPhaseCroupier() qui devrait load footerDistribution?
          lancerPhaseCroupier(); 

          
        }
      }






      
      function checkBJjoueur() {

        if ((scoreTotalJoueur + 10 == 21) && (nbrCardsJoueur == 2) && (asJoueur == true)) {
          console.log("nbrCardsJoueur: " + nbrCardsJoueur + "&nbscp; |true BLACKJACK|");

          WinLose = 'BJ';
          resultatCas = 'BlackJack';

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
                  if ( isConnected == true) {
                    document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBarre.png" class="imagesSouResultat">';
                  }
                  else {
                    document.getElementById("miseResultat").innerHTML = miseLocked + '<img src="Images/souBlancBarre.png" class="imagesSouResultat">';
                  }                  
                  setTimeout( function() {
                    IncrementGain(miseLockedMultiplied);
                  }, 1500);
                  
                    // DOUBLON ??
                    // var miseLockedMultiplied = 3 * miseLocked;

                  // WIP gain (ajouter effet refresh CSS)
                  setTimeout( function() {
                    gain = miseLocked * 2;
                    ajoutGain(gain);

                    winLose = 1;
                    winLoseDB(winLose);

                  }, 500)
                  //
                    
                  // Fin résultat Gains

                // FIN WIP
                


                document.getElementById("deckContainer").remove();
                document.getElementById("parametresPartieDiv").remove();
                // document.getElementById("deckContainer").classList.add("fadeOut");

                //*** Perdu BURST 
                document.getElementById("scoreCroupier").style.backgroundColor = "rgb(160 13 27)";
                // document.getElementById("scoreJoueur").style.backgroundColor = "rgba(59,217,10,1)";

                document.getElementById("scoreCroupier").style.color = "rgba(239,230,230,1)";
                document.getElementById("scoreJoueur").style.color = "rgba(255,245,0,1)";

                document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)";
                document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)";

                document.getElementById("scoreCroupier").style.border = "1px solid rgba(255,1,49,0.5)";
                document.getElementById("scoreJoueur").style.border = "1px solid rgba(255, 245, 0, 0.7)";

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

                popBoutonReload();

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