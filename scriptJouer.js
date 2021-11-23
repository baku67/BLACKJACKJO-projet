    
    window.onload = function(){

      
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
      

      //  Collapse Footer
      var coll = document.getElementById("collapsible");
      var i;
      var content = document.getElementById("collapseContent");
      var isCollapsed = false;
      footerCollapse();
      document.getElementById("arrowPng").setAttribute("src", "arrowUp.png");
      

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
        document.getElementById("arrowPng").setAttribute("src", "arrowUp.png");
        isCollapsed = true;
        checkMiseWarning();
      }
      function footerShow() {
        content.style.display = "block";
        document.getElementById("arrowPng").setAttribute("src", "arrowDown.png");
        isCollapsed = false;
        checkMiseWarning();
      }
      


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
      ];
      //#endregion

      

      // JQUERY JAX : load Partie
      $("#newGame").click(function(){

          $("#container1").load("jouerPartie.html");

          setTimeout( function lancerPartie() {

              document.getElementById("compteurDeck").innerHTML = compteurDeck;
              document.getElementById("compteurDeckMax").innerHTML = compteurDeckMax;
              

              $.ajax({
                async: false,
                url: "footerMiseModul.html",
                dataType: "html",
                success: function(response) {
                  $("#container3").html(response);
                  // document.getElementById("collapsible").style.visibility = "visible";
                  footerShow();
                  phaseMise();
                  document.getElementById("footerTitle").innerHTML = " - MISE -";
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


      //***   WIP: Relancer    ***\\

      function relancer() {
      //   $("#relancer").click(function(){
      //     $("#container1").load("jouerPartie.html");
      //     scoreTotalJoueur = 0;
      //     scoreTotalCroupier = 0;
      //     setTimeout( function lancerPartie() {
      //         document.getElementById("compteurDeck").innerHTML = compteurDeck;
      //         document.getElementById("compteurDeckMax").innerHTML = compteurDeckMax;
      //         $.ajax({
      //           async: false,
      //           url: "footerMiseModul.html",
      //           dataType: "html",
      //           success: function(response) {
      //             $("#container3").html(response);
      //             footerShow();
      //             phaseMise();
      //             document.getElementById("footerTitle").innerHTML = " - MISE -";
      //             window.onload = tokensClick();
      //             checkMiseWarning();
      //           }
      //         });
      //         miseBoutonStyle();
      //         miseLock();  
      //     }, 500)
      //   });
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
          document.getElementById("boutonMiser").style.opacity = "0.4";
          document.getElementById("boutonMiser").style.cursor = "default";
          button.disabled = true;
          // Label "Entrez d'abord une mise"
        }
      }
      

      // Lock de la mise
      function miseLock() {
        document.getElementById("boutonMiser").addEventListener("click", function() {
          document.querySelector("#boutonMiser").style.opacity = "0.4";
          
          miseLocked = miseEnCours;
          document.getElementById("miseLocked").innerHTML = "Mise: " + "&nbsp;" + miseLocked + "&nbsp;" + "&#8364;";
    

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
              url: "footerNone.html",
              dataType: "html",
              success: function(response) {
                $("#chipsContainer").html(response);
                document.getElementById("footerTitle").innerHTML = " - Distribution... -";
              }
            });
          }, 700);
          
          setTimeout(function() {
            $.ajax({
              async: false,
              url: "footerPhase2Modul.html",
              dataType: "html",
              success: function(response) {
                $("#chipsContainer").html(response);
                document.getElementById("footerTitle").innerHTML = " - Choix -";

                  if (scoreTotalJoueur > 8 && scoreTotalJoueur < 12) {
                    document.getElementById("double").style.opacity = 1;
                  }

                document.getElementById("hit").addEventListener("click", function() {

                  hit();

                });
                document.getElementById("stand").addEventListener("click", function() {
                  lancerPhaseCroupier();
                });
                document.getElementById("double").addEventListener("click", function() {

                  miseLocked = miseLocked * 2;
                  document.getElementById("miseLocked").innerHTML = "Mise: " + "&nbsp;" + miseLocked + "&nbsp;" + "&#8364;";

                  setTimeout(function() {
                    addCardJoueur();
                  }, 1000);

                  setTimeout(function() {
                    lancerPhaseCroupier();
                  }, 2000);

                });

              }
            });
          }, 8000);

          setTimeout(function() {
            addCardJoueur();
          }, 2000);
          setTimeout(function() {
            addCardCroupier();
          }, 3750);
          setTimeout(function() {
            addCardJoueur();
          }, 5500);
          setTimeout(function() {
            addBackCardCroupier();
          }, 7000);

        })
      }


      function addBackCardCroupier() {
        var img = document.createElement('img');
        img.id = "backCardCroupier";
        img.className = "imgPartie";
        img.src = "deck2.png";
        document.getElementById("croupier").appendChild(img);
      }


      function hit() {

        $.ajax({
          async: false,
          url: "footerNone.html",
          dataType: "html",
          success: function(response) {
            $("#chipsContainer").html(response);
            document.getElementById("footerTitle").innerHTML = " - Distribution... -";
          }
        });

        setTimeout(function() {
          addCardJoueur();
        }, 1000);

        setTimeout(function() {
          $.ajax({
            async: false,
            url: "footerPhase2Modul.html",
            dataType: "html",
            success: function(response) {
              $("#chipsContainer").html(response);
              document.getElementById("footerTitle").innerHTML = " - Choix... -";
              document.getElementById("hit").addEventListener("click", function() {

                hit();

              });
              document.getElementById("stand").addEventListener("click", function() {
                lancerPhaseCroupier();
              });
              document.getElementById("double").addEventListener("click", function() {

                miseLocked = miseLocked * 2;
                document.getElementById("miseLocked").innerHTML = "Mise: " + "&nbsp;" + miseLocked + "&nbsp;" + "&#8364;";

                setTimeout(function() {
                  addCardJoueur();
                }, 1000);

                setTimeout(function() {
                  lancerPhaseCroupier();
                }, 2000);

              });
            }
          });
        }, 1250);
      }



      function lancerPhaseCroupier() {
          $.ajax({
            async: false,
            url: "footerNone.html",
            dataType: "html",
            success: function(response) {
              $("#chipsContainer").html(response);
              document.getElementById("footerTitle").innerHTML = " - Distribution... -";
            }
          });

          addCardCroupierRecursive();

          function addCardCroupierRecursive() {
            setTimeout(function() {
              document.getElementById("backCardCroupier").classList.add("fadeOut2");
            }, 1550)

            setTimeout(function() {
              document.getElementById("backCardCroupier").remove();
            }, 2150)
            
            if (scoreTotalCroupier < 17) {
              setTimeout(function() {
                addCardCroupier();
                addCardCroupierRecursive();
              }, 2150)
            }
            else {
              resultat();
            }
          };

          function resultat() {
            setTimeout(function() {
              if (scoreTotalCroupier > scoreTotalJoueur && scoreTotalCroupier < 22) {
                $.ajax({
                  async: false,
                  url: "footerCroupierWin.html",
                  dataType: "html",
                  success: function(response) {
                    $("#container3").html(response);
                    console.log(scoreTotalCroupier);
                    document.getElementById("footerTitle").innerHTML = " - Perdu -";

                    // Perdu
                      // rubans de Win/Loose
                    document.getElementById("croupier").style.backgroundColor = "rgba(61,255,1,0.3)";
                    document.getElementById("joueur").style.backgroundColor = "rgba(255,1,49,0.3)";
                      // Fin rubans
                    
                    document.getElementById("scoreCroupier").style.backgroundColor = "rgba(59,217,10,1)"
                    document.getElementById("scoreJoueur").style.backgroundColor = "rgba(215,31,48,1)"

                    document.getElementById("scoreCroupier").style.color = "rgba(255,245,0,1)"
                    document.getElementById("scoreJoueur").style.color = "rgba(239,230,230,1)"

                    document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)"
                    document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)"

                    document.getElementById("scoreCroupier").style.border = "1px solid rgba(58,157,32,0.5)";
                    document.getElementById("scoreJoueur").style.border = "1px solid rgba(255,1,49,0.5)";                  
                    // Fin Perdu
                  
                    // Bouton Rejouer
                    relancer();
                  }
                });
              }

              if (scoreTotalCroupier > 21) {
                $.ajax({
                  async: false,
                  url: "footerCroupierBurst.html",
                  dataType: "html",
                  success: function(response) {
                    $("#container3").html(response);
                    console.log(scoreTotalCroupier);
                    document.getElementById("footerTitle").innerHTML = " - Gagné -";

                    // Gagné
                      // rubans de Win/Loose
                    document.getElementById("croupier").style.backgroundColor = "rgba(255,1,49,0.3)";
                    document.getElementById("joueur").style.backgroundColor = "rgba(61,255,1,0.3)";
                      // Fin rubans
                    
                    document.getElementById("scoreCroupier").style.backgroundColor = "rgba(215,31,48,1)"
                    document.getElementById("scoreJoueur").style.backgroundColor = "rgba(59,217,10,1)"

                    document.getElementById("scoreCroupier").style.color = "rgba(239,230,230,1)"
                    document.getElementById("scoreJoueur").style.color = "rgba(255,245,0,1)"

                    document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)"
                    document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)"

                    document.getElementById("scoreCroupier").style.border = "1px solid rgba(255,1,49,0.5)";
                    document.getElementById("scoreJoueur").style.border = "1px solid rgba(58,157,32,0.5)";
                    // Fin Gagné
                  
                    // Bouton Rejouer
                    relancer();
                  }
                });
              }

              if (scoreTotalJoueur > scoreTotalCroupier) {
                $.ajax({
                  async: false,
                  url: "footerJoueurGagne.html",
                  dataType: "html",
                  success: function(response) {
                    $("#container3").html(response);
                    console.log(scoreTotalCroupier);
                    document.getElementById("footerTitle").innerHTML = " - Gagné -";

                    // Gagné
                      // rubans de Win/Loose
                    document.getElementById("croupier").style.backgroundColor = "rgba(255,1,49,0.3)";
                    document.getElementById("joueur").style.backgroundColor = "rgba(61,255,1,0.3)";
                      // Fin rubans

                    document.getElementById("scoreCroupier").style.backgroundColor = "rgba(215,31,48,1)"
                    document.getElementById("scoreJoueur").style.backgroundColor = "rgba(59,217,10,1)"

                    document.getElementById("scoreCroupier").style.color = "rgba(239,230,230,1)"
                    document.getElementById("scoreJoueur").style.color = "rgba(255,245,0,1)"

                    document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)"
                    document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)"

                    document.getElementById("scoreCroupier").style.border = "1px solid rgba(255,1,49,0.5)";
                    document.getElementById("scoreJoueur").style.border = "1px solid rgba(58,157,32,0.5)";
                    // Fin Gagné
                  
                    // Bouton Rejouer
                    relancer();
                  }
                });
              }

              if (scoreTotalJoueur == scoreTotalCroupier) {
                $.ajax({
                  async: false,
                  url: "footerPush.html",
                  dataType: "html",
                  success: function(response) {
                    $("#container3").html(response);
                    console.log(scoreTotalCroupier);
                    document.getElementById("footerTitle").innerHTML = " - Egualité -";

                    // Égalité
                      // rubans jaunes
                    document.getElementById("scoreCroupier").style.border = "solid 2px rgba(0,0,0,0.5)";
                    document.getElementById("scoreJoueur").style.border = "solid 2px rgba(0,0,0,0.5)";
                      // Fin rubans

                    document.getElementById("croupier").style.backgroundColor = "rgba(255,246,1,0.5)";
                    document.getElementById("joueur").style.backgroundColor = "rgba(255,246,1,0.5)";

                    document.getElementById("croupier").style.border = "1px solid rgba(255,246,1,0.7)";
                    document.getElementById("joueur").style.border = "1px solid rgba(255,246,1,0.7)";

                    document.getElementById("scoreCroupier").style.color = "rgba(0,0,0,0.6)";
                    document.getElementById("scoreJoueur").style.color = "rgba(0,0,0,0.6)";

                    document.getElementById("scoreCroupier").style.textShadow = "0px 0px 2px white"
                    document.getElementById("scoreJoueur").style.textShadow = "0px 0px 2px white"

                    document.getElementById("scoreCroupier").style.backgroundColor = "rgba(255,246,1,1)";
                    document.getElementById("scoreJoueur").style.backgroundColor = "rgba(255,246,1,1)";
                    // Fin Égalité
                  
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

      function tokensClick() {
        document.getElementById("whiteToken").addEventListener("click", function() {
          miseEnCours += 1;
          document.getElementById("miseEnCours").innerHTML = miseEnCours + " &#8364;";
          miseBoutonStyle();
          misePop();
          setTimeout(function scoreDepop() {
            document.getElementById("miseEnCours").classList.toggle('scorePop');
          }, 500);
          cssMiseEnCours();
        })
        document.getElementById("redToken").addEventListener("click", function() {
          miseEnCours += 5;
          document.getElementById("miseEnCours").innerHTML = miseEnCours + " &#8364;";
          miseBoutonStyle();
          misePop();
          setTimeout(function scoreDepop() {
            document.getElementById("miseEnCours").classList.toggle('scorePop');
          }, 500);
          cssMiseEnCours();
        })
        document.getElementById("greenToken").addEventListener("click", function() {
          miseEnCours += 10;
          document.getElementById("miseEnCours").innerHTML = miseEnCours + " &#8364;";
          miseBoutonStyle();
          misePop();
          setTimeout(function scoreDepop() {
            document.getElementById("miseEnCours").classList.toggle('scorePop');
          }, 500);
          cssMiseEnCours();
        })
        document.getElementById("blueToken").addEventListener("click", function() {
          miseEnCours += 25;
          document.getElementById("miseEnCours").innerHTML = miseEnCours + " &#8364;";
          miseBoutonStyle();
          misePop();
          setTimeout(function scoreDepop() {
            document.getElementById("miseEnCours").classList.toggle('scorePop');
          }, 500);
          cssMiseEnCours();
        })
        document.getElementById("blackToken").addEventListener("click", function() {
          miseEnCours += 100;

          document.getElementById("miseEnCours").innerHTML = miseEnCours + " &#8364;";
          miseBoutonStyle();
          misePop();
          setTimeout(function scoreDepop() {
            document.getElementById("miseEnCours").classList.toggle('scorePop');
          }, 500);
          cssMiseEnCours();
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

        // Choix du AS non affiché pour le croupier (titre)
        // if (pickedCardObject.cardValue == 1) {
        //   asCroupier = true;
        // }
        //FIN

        // Scores Total Croupier
        scoreTotalCroupier += pickedCardObject.cardValue;

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
        document.getElementById("croupier").appendChild(img);

        decrementCompteurDeck()

        checkMiseWarning();


        // Mise a jour du score High-Low
        if (pickedCardObject.cardValue < 7) {
          setTimeout(function() {
            plus1();
          }, 500);
        }
        else if (pickedCardObject.cardValue > 9) {
          setTimeout(function() {
            minus1();
          }, 500);
        }
        else {
          // ScoePop quand même (ou au moins un truc, genre rafraichissement)
        }

      }
      // FIN




      // NOUVELLE CARTE  > JOUEUR (+ScoreTOTAL)
      function addCardJoueur() {
        var img = document.createElement('img');
        let pickedCardObject = cards[Math.floor(Math.random()*cards.length)];
        img.src = pickedCardObject.cardImageURL;
        

        //WIP AS
        if (pickedCardObject.cardValue == 1) {
          asJoueur = true;
          console.log(asJoueur + " TRUE!");
        }
        //FIN

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
              document.getElementById('scoreJoueur').innerHTML = scoreTotalJoueur + " / " + (scoreTotalJoueur + 10);
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
        document.getElementById("joueur").appendChild(img);

        decrementCompteurDeck()

        checkMiseWarning();

        checkBurstJoueur();
        checkBJjoueur();

        // Mise a jour du score High-Low
        if (pickedCardObject.cardValue < 7) {
          setTimeout(function() {
            plus1();
          }, 500);
        }
        else if (pickedCardObject.cardValue > 9) {
          setTimeout(function() {
            minus1();
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


      function checkBurstJoueur() {
        if (scoreTotalJoueur > 21) {
            burstJoueur = true;

            setTimeout(function() {
              $.ajax({
                async: false,
                url: "footerBurstJoueur.html",
                dataType: "html",
                success: function(response) {
                  $("#container3").html(response);
                  document.getElementById("footerTitle").innerHTML = " - Perdu -";

                  // Perdu BURST (Ajouter icone boom.png (assez grand) dans le séparateur)

                    // Rubans Gagné/Perdu 
                  // document.getElementById("croupier").style.backgroundColor = "rgba(61,255,1,0.3)";
                  // document.getElementById("joueur").style.backgroundColor = "rgba(255,1,49,0.3)";

                  // document.getElementById("croupier").style.border = "1px solid rgba(61,255,1,0.5)";
                  // document.getElementById("joueur").style.border = "1px solid rgba(255,1,49,0.5)";
                    // Fin rubans

                  document.getElementById("scoreCroupier").style.backgroundColor = "rgba(59,217,10,1)"
                  document.getElementById("scoreJoueur").style.backgroundColor = "rgba(215,31,48,1)"

                  document.getElementById("scoreCroupier").style.color = "rgba(255,245,0,1)"
                  document.getElementById("scoreJoueur").style.color = "rgba(239,230,230,1)"

                  document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)"
                  document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)"

                  document.getElementById("scoreCroupier").style.border = "1px solid rgba(58,157,32,0.5)";
                  document.getElementById("scoreJoueur").style.border = "1px solid rgba(255,1,49,0.5)";
                  // Fin Perdu BURST



                  // WIP separateur avec résultat
                  // Animation scale() qui pop avec fadeIn()

                  document.getElementById("separateur").classList.add("fadeInResultat");
                  document.getElementById("separateur").classList.add("marginFix");


                  document.getElementById("separateur").style.background = "rgba(142,0,27,0.80) url(\"boomPng.png\") no-repeat scroll 50% 50%";
                  // document.getElementById("separateur").style.border = "4px solid rgba(215,31,48, 0.80)";
                  document.getElementById("separateur").style.borderTop = "1px solid rgba(130,14,39, 0.70)"
                  document.getElementById("separateur").style.borderBottom = "1px solid rgba(130,14,39, 0.70)"
                  document.getElementById("separateur").style.borderRight = "6px solid rgba(130,14,39, 0.80)";
                  document.getElementById("separateur").style.borderLeft = "6px solid rgba(130,14,39, 0.80)"
                  document.getElementById("separateur").style.borderRadius = "10px";

                  document.getElementById("resultatText").innerText = "BUST";

                  // Fin separateur





                  // Bouton Rejouer
                  relancer();
                }
              });
            }, 1200);
        }
      }

      
      function checkBJjoueur() {
        // ATTENTION: Bugued à cause du WIP AS (pour l'instant la valeur de l'AS est 1, deuxième score (21) juste affiché)
        // Proc lors de faux BlackJack (Add condition nbrCardJoueur == 2)

        if (scoreTotalJoueur == 21) {
          //      "|| nbrOfJoueurCards == 2"     (pour le vrai BJ)

            setTimeout(function() {
              $.ajax({
                async: false,
                url: "footerBJjoueur.html",
                dataType: "html",
                success: function(response) {
                  $("#container3").html(response);
                  document.getElementById("footerTitle").innerHTML = " - BlackJack! -";
                  
                  // Gagné BLACKJACK (Ajouter icone BJ.png (assez grand) dans le séparateur)
                    // Rubans Gagné/Perdu
                  document.getElementById("croupier").style.backgroundColor = "rgba(255,1,49,0.3)";
                  document.getElementById("joueur").style.backgroundColor = "rgba(61,255,1,0.3)";
                    // Fin rubans
                  
                  document.getElementById("scoreCroupier").style.backgroundColor = "rgba(215,31,48,1)"
                  document.getElementById("scoreJoueur").style.backgroundColor = "rgba(59,217,10,1)"

                  document.getElementById("scoreCroupier").style.color = "rgba(239,230,230,1)"
                  document.getElementById("scoreJoueur").style.color = "rgba(255,245,0,1)"

                  document.getElementById("scoreCroupier").style.textShadow = "0 0 2px rgba(0,0,0,1)"
                  document.getElementById("scoreJoueur").style.textShadow = "0 0 2px rgba(0,0,0,1)"

                  document.getElementById("scoreCroupier").style.border = "1px solid rgba(255,1,49,0.5)";
                  document.getElementById("scoreJoueur").style.border = "1px solid rgba(58,157,32,0.5)";
                  // Fin Gagné BLACKJACK

                  // Bouton Rejouer
                  relancer();
                }
              });
            }, 1250);
        }
      }




      //***  CHIFFRES POP
      function misePop() {
        document.getElementById("miseEnCours").classList.toggle('scorePop');
      }
      function scorePop() {
        document.getElementById("scoreContainer").classList.toggle('scorePop');
      }
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
          scoreContainer.style.border = "3px solid rgba(255,255,255,0.5)";
        }
        else {
          document.getElementById("scoreVar").classList.remove('positive');
          document.getElementById("scoreVar").classList.remove('neutral');
          document.getElementById("scoreVar").classList.add('negative');
          // scoreContainer.style.border = "3px solid red";
        }
      }

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
      //*** FIN

      // dans addCardCroupier(joueur croupier les 2) ajouter
      // if scoreCard
      //   plus1();
      // else if scorecard
      //   minus1();
      // else (aucun changement)
      //   rien

    }