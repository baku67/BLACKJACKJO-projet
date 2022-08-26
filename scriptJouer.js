    
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

      var doubleBool = 0;


      let historiqueInviteArray = [];
      // historiqueInviteArray.push(historiqueInviteArrayStored);
      // var historiqueInviteArrayStored = localStorage.getItem("historiqueInviteArrayStored");


      // Stockage de l'array: https://stackoverflow.com/questions/40200350/keep-data-after-page-refresh
      // if (typeof(Storage) !== "undefined") {
      //   localStorage.setItem("historiqueInviteArrayStored", historiqueInviteArray);
      // } else {
      // } 







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

        document.querySelector('#deconnexionImg').src = "";

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
          document.getElementById("backCardCroupier").src = "../Images/deck3_darkMode.png";
        }
      }



















      if (isConnected == false) {
        document.getElementById("connectionContainer").style.marginRight = "0px";
      }
      else {
        document.getElementById("connectionContainer").style.marginRight = "55px";
        document.getElementById("imgStreak").style.top = "20.3%";

        refreshAnimJauge();
        
      }

      function refreshAnimJauge() {
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

      else {
        var setTimeOutMultiplierBool = false;
        var darkModeBool = true;
        var SoundMuteBool = true;
      }   
      
      
      var setTimeOutMultiplier = 0.7;






      //  Collapse Footer
      var coll = document.getElementById("collapsible");
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
                // gainsHistoriqueLine.style.color = "#bebe5e";
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

                // WIP
                // if ()

                // FIN WIP

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
      });




      $("#guide").click(function() {

        $("#container1").load("guide.php");
        
      });

      // $("#jouer").click(function() {

      //   $("#container1").load("index.php");
        
      // });








































































        

      // JQUERY JAX : load Partie
      $("#newGame").click(function(){

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

                // document.getElementById("header").classList.add('headerOnPartie');

                // document.getElementById("footer").classList.add('footerOnPartie');

                // Faire de meme avec titleOnPartie (pour finir bleu sur le fond orange si dark mode)

                removed = false;

                logTokenValues = [];

                nbrCardsJoueur = 0;

                var winLose = 0;

                doubleBool = 0;

                // *Speed State*
                if ((setTimeOutMultiplierBool == true) && (document.getElementById("speedButtonContainer") !== null)) {
                  document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                  setTimeOutMultiplier = 0.4;
                  document.getElementById("speedToggleImage").src = 'Images/fastForwardWhite.png';
                }
                else if (document.getElementById("speedButtonContainer") !== null) {
                  document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                  setTimeOutMultiplier = 0.7;
                  document.getElementById("speedToggleImage").src = 'Images/fastForwardGrey.png';
                }
                //****

                
                // *Mute State*
                if ((SoundMuteBool == true) && (document.getElementById("soundButtonContainer") !== null )) {
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
                else if (document.getElementById("soundButtonContainer") !== null ) {
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
                //****




                // *Dark Mode State*
                if ((darkModeBool == true) && (document.getElementById("backgroundButtonContainer") !== null)) {
                  document.getElementById("backgroundButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
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
                    document.getElementById("backCardCroupier").src = "../Images/deck3_darkMode.png";
                  }
                }
                else if (document.getElementById("backgroundButtonContainer") !== null) {
                  document.getElementById("backgroundButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
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
                  document.getElementById("credits").innerHTML = "Crédits: &nbsp;&nbsp;" + "<span id=\"creditsInvite\">" + credits + "</span>" + "&nbsp;<img src='Images/souBlancBarre.png' class=\"imageSouDeco\">";
                  document.getElementById("credits").style.position = "relative";
                  document.getElementById("credits").style.bottom = "7px";
                  // document.getElementById("traitLumineux").style.visibility = "visible";
                  document.getElementById("jaugeContainer").style.bottom = "-52px";
                  document.getElementById("imgStreak").style.top = "22.5%";
                }
                else {
                  console.log('isConnected: ' + isConnected);
                  document.getElementById("creditsConnected").innerHTML = creditsConnected;
                  // document.getElementById("traitLumineux").style.visibility = "visible";
                  // document.getElementById("traitLumineux").style.position = 'relative';
                  // document.getElementById("traitLumineux").style.bottom = '20px';
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
                      document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                      setTimeOutMultiplier = 0.7;
                      document.getElementById("speedToggleImage").src = 'Images/fastForwardGrey.png';
                    }
                    else {
                      setTimeOutMultiplierBool = true;
                      document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                      setTimeOutMultiplier = 0.4;
                      document.getElementById("speedToggleImage").src = 'Images/fastForwardWhite.png';
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
                        document.getElementById("backCardCroupier").src = "../Images/deck3_darkMode.png";
                      }
                    }
              
                    else {
                      darkModeBool = false;
                      this.dataset.mode = "dark";

  
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
                




                // document.getElementById("footer").classList.add("footerHeightAnim");



                $.ajax({
                  async: false,
                  url: "Footers/footerMiseModul.html",
                  dataType: "html",
                  success: function(response) {
                    $("#container3").html(response);

                    document.getElementById("header").classList.add('headerOnPartie');

                    document.getElementById("footer").classList.add('footerOnPartie');

                    ChoixActif = false;
                    // document.getElementById("collapsible").style.visibility = "visible";

                    if (isConnected == true && darkModeBool == true) {
                      if (document.querySelectorAll('.pokerChips') !== null) {
                        var imgTokens = document.querySelectorAll('.pokerChips');
                        imgTokens.forEach(element => {
                          element.src = element.src.substring(0, 43) + "_darkMode.png";
                        });
                      }
                    }

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
        }, 790)

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

          // Faire de meme avec titleOnPartie (pour finir bleu sur le fond orange si dark mode)

          // Fin refresh

          var winLose = 0;

          doubleBool = 0;

          


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
              // BOUTON TOGGLE Mute
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
                  document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
                  setTimeOutMultiplier = 0.7;
                  document.getElementById("speedToggleImage").src = 'Images/fastForwardGrey.png';
                }
                else {
                  setTimeOutMultiplierBool = true;
                  document.getElementById("speedButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
                  setTimeOutMultiplier = 0.4;
                  document.getElementById("speedToggleImage").src = 'Images/fastForwardWhite.png';
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

                  document.querySelector('#deconnexionImg').src = "../Images/deconnexion_darkMode.png"

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
                    document.getElementById("backCardCroupier").src = "../Images/deck3_darkMode.png";
                  }
                }
          
                else {
                  this.dataset.mode = "dark";
                  darkModeBool = false;
                  console.log("darkModeBool: " + darkModeBool);

                  document.querySelector('#deconnexionImg').src = "../Images/deconnexion_darkMode.png"

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


                  // *Dark Mode State*
                  if (darkModeBool == true) {

                    // Fix 1er switch DM/LM need 2 clic 
                    document.getElementById("backgroundButtonContainer").dataset.mode = "light";
                    // Fin fix
                    document.getElementById("backgroundButtonContainer").style.backgroundColor = "rgba(130,14,39,0.8)";
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
                    document.getElementById("backgroundButtonContainer").style.backgroundColor = "rgba(25, 39, 95, 0.8)";
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

        doubleBool = 1;

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


        // IF NOT BUST après le addCardJoueur ! {
        setTimeout(function() {
          // lancerPhaseCroupier();
        }, 2000);
      }
      

      // Lock de la mise
      function miseLock() {
        document.getElementById("boutonMiser").addEventListener("click", function() {

          // Marche po (anim boutonMiser onClick)
            // setTimeout( function() {
            //   document.getElementById("boutonMiser").innerText = "";
            // }, 100)
            // document.getElementById("boutonMiser").classList.add("boutonMiserAnim");
          // Fin marche po

          // document.querySelector("#footer").classList.remove("miserActif2");  

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

          // Faire de meme avec titleOnPartie (pour finir bleu sur le fond orange si dark mode)



          if (SoundMuteBool == false) {
            audioMiser.play();
          }

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
                      if (document.getElementById("relancer") !== null) {
                        document.getElementById("relancer").style.visibility = "hidden";
                      }
                    }, 1500)
                })
              }, 500)
          }
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
                if (firstCardRevealed == true) {
                  addCardCroupier(firstCardRevealed);  
                }
                else {
                  addCardCroupier(firstCardRevealed);
                  firstCardRevealed = true;
                }
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

                      majStreak(WinLose);

                    }, 500)
                    //

                    document.getElementById("deckContainer").remove();
                    document.getElementById("cardAnim").remove();
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
                      // document.getElementById("resultatText").classList.add("resultatTextLose");
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

                          majStreak(WinLose);

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
                      document.getElementById("cardAnim").remove();
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
                        document.getElementById("separateur").classList.add("separateurContainerWidthAnim");
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

                          majStreak(WinLose);

                        }, 500)
  
                        var miseLockedMultiplied = miseLocked * 2;

                      
  
                      document.getElementById("deckContainer").remove();
                      document.getElementById("cardAnim").remove();
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
                        document.getElementById("separateur").classList.add("separateurContainerWidthAnim");
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

                        majStreak(WinLose);

                      }, 500)
                      
                      document.getElementById("miseResultat").classList.add("addColorToResultatYellow");

                      // Fin résultat Gains
  
                    // FIN WIP
                  
  
                    document.getElementById("deckContainer").remove();
                    document.getElementById("cardAnim").remove();
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
                      document.getElementById("separateur").classList.add("separateurContainerWidthAnim");
                      

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
              if (document.getElementById("relancer") != null)
               {document.getElementById("relancer").style.visibility = "hidden";}
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

          distribAnim("croupier");

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
        // img.className = "imgPartie";

        // Classe pour le darkMode
        img.classList.add("imgPartie", "imgPartieDM");

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

        // img.className = "imgPartie";

        // Classe pour le darkMode
        img.classList.add("imgPartie", "imgPartieDM");

        if (SoundMuteBool == false) {
          audioCardSound.play();
        }
        // TEST audio coupé et non audio = 0;
        // audioCardSound.play();


        setTimeout(function() {
          document.getElementById("joueur").appendChild(img);
        }, 470);
        // document.getElementById("joueur").appendChild(img);

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
        historiqueToPhp[2] = gain;
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





      function historiqueInvite(WinLose, resultatCas, gain) {

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
        historiqueInviteLine[2] = gain;
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
      if (isConnected == true) {

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
              }
            }, 500)
            
            refreshAnimJauge();
          }


          else if (winLose == "PUSH") {
            resultatStreak = 0;
          }




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
      // else {
      //   function majStreak(winLose) {
          
      //   }
      // }
































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

          historiqueInvite(WinLose, resultatCas, gain);

          historiqueDB(WinLose, resultatCas, gain);
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

                        majStreak(winLose);

                      }, 500)

                    //
                    // Fin résultat Gains

                  // FIN WIP
                  
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
            }, 1200);
        }

        else if ((scoreTotalJoueur < 21) && (doubleBool==1)) {
          lancerPhaseCroupier();
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

                    majStreak(WinLose);

                  }, 500)
                    
                  // Fin résultat Gains

                // FIN WIP
                


                document.getElementById("deckContainer").remove();
                document.getElementById("cardAnim").remove();
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