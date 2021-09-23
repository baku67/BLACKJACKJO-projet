    
    // Single App Application (No Framework) BON TUTO:    https://dev.to/dcodeyt/building-a-single-page-app-without-frameworks-hl9
    
    
    window.onload = function(){

        //#region  Var Compteurs
        var c2 = 0;
        var c3 = 0;
        var c4 = 0;
        var c5 = 0;
        var c6 = 0;
        var c7 = 0;
        var c8 = 0;
        var c9 = 0;
        var c10 = 0;
        var c11 = 0;
        var c12 = 0;
        var c13 = 0;
        var c14 = 0;
        //#endregion

        //#region MaxCards
        var nbrSabots = prompt("Combien de sabots? (0.5, 1, 2, 3,..)");
        document.getElementById("nbrSabotVar").innerHTML = nbrSabots;
        var maxCards = nbrSabots*4;
        document.getElementById('max1').innerHTML = maxCards;
        document.getElementById('max2').innerHTML = maxCards;
        document.getElementById('max3').innerHTML = maxCards;
        document.getElementById('max4').innerHTML = maxCards;
        document.getElementById('max5').innerHTML = maxCards;
        document.getElementById('max6').innerHTML = maxCards;
        document.getElementById('max7').innerHTML = maxCards;
        document.getElementById('max8').innerHTML = maxCards;
        document.getElementById('max9').innerHTML = maxCards;
        document.getElementById('max10').innerHTML = maxCards;
        document.getElementById('max11').innerHTML = maxCards;
        document.getElementById('max12').innerHTML = maxCards;
        document.getElementById('max13').innerHTML = maxCards;
        //#endregion

        //#region  OnClick --> Incr
        document.getElementById('nbrProc2').addEventListener("click", incr2);
        function incr2() {
          if (c2 < maxCards) {
            // Ajoute la classe 'classname' sous le nom 'classname'(html) à l'Element(id)   [Cas ou on incrémente] A RENOMMER (1er: classname = CSS, 2eme = HTMLadd)
          document.getElementById("nbrProc2").classList.add('classname') = 'className';
            c2 += 1;
            document.getElementById('c2').innerHTML = c2;
          }
          else {
            // Ajoute la classe 'classname' sous le nom 'classname'(html) à l'Element(id)   [Cas ou on est au max] A RENOMMER  (1er: classname = CSS, 2eme = HTMLadd)
            document.getElementById("nbrProc2").classList.add('classname') = 'className00';
            document.getElementById('c2').innerHTML = c2;
            // INSERTION CSS (tentative 1)
            //style.insertRule("#c2 {color: blue;}", 0);
          }
        }
        document.getElementById('nbrProc3').addEventListener("click", incr3);
        function incr3() {
          if (c3 < maxCards) {
            c3 += 1;
            document.getElementById('c3').innerHTML = c3;
          }
          else {
            document.getElementById('c3').innerHTML = c3;
          }
        }
        document.getElementById('nbrProc4').addEventListener("click", incr4);
        function incr4() {
          if (c4 < maxCards) {
            c4 += 1;
            document.getElementById('c4').innerHTML = c4;
          }
          else {
            document.getElementById('c4').innerHTML = c4;
          }
        }
        document.getElementById('nbrProc5').addEventListener("click", incr5);
        function incr5() {
          if (c5 < maxCards) {
            c5 += 1;
            document.getElementById('c5').innerHTML = c5;
          }
          else {
            document.getElementById('c5').innerHTML = c5;
          }
        }
        document.getElementById('nbrProc6').addEventListener("click", incr6);
        function incr6() {
          if (c6 < maxCards) {
            c6 += 1;
            document.getElementById('c6').innerHTML = c6;
          }
          else {
            document.getElementById('c6').innerHTML = c6;
          }
        }
        document.getElementById('nbrProc7').addEventListener("click", incr7);
        function incr7() {
          if (c7 < maxCards) {
            c7 += 1;
            document.getElementById('c7').innerHTML = c7;
          }
          else {
            document.getElementById('c7').innerHTML = c7;
          }
        }
        document.getElementById('nbrProc8').addEventListener("click", incr8);
        function incr8() {
          if (c8 < maxCards) {
            c8 += 1;
            document.getElementById('c8').innerHTML = c8;
          }
          else {
            document.getElementById('c8').innerHTML = c8;
          }
        }
        document.getElementById('nbrProc9').addEventListener("click", incr9);
        function incr9() {
          if (c9 < maxCards) {
            c9 += 1;
            document.getElementById('c9').innerHTML = c9;
          }
          else {
            document.getElementById('c9').innerHTML = c9;
          }
        }
        document.getElementById('nbrProc10').addEventListener("click", incr10);
        function incr10() {
          if (c10 < maxCards) {
            c10 += 1;
            document.getElementById('c10').innerHTML = c10;
          }
          else {
            document.getElementById('c10').innerHTML = c10;
          }
        }
        document.getElementById('nbrProc11').addEventListener("click", incr11);
        function incr11() {
          if (c11 < maxCards) {
            c11 += 1;
            document.getElementById('c11').innerHTML = c11;
          }
          else {
            document.getElementById('c11').innerHTML = c11;
          }
        }
        document.getElementById('nbrProc12').addEventListener("click", incr12);
        function incr12() {
          if (c12 < maxCards) {
            c12 += 1;
            document.getElementById('c12').innerHTML = c12;
          }
          else {
            document.getElementById('c12').innerHTML = c12;
          }
        }
        document.getElementById('nbrProc13').addEventListener("click", incr13);
        function incr13() {
          if (c13 < maxCards) {
            c13 += 1;
            document.getElementById('c13').innerHTML = c13;
          }
          else {
            document.getElementById('c13').innerHTML = c13;
          }
        }
        document.getElementById('nbrProc14').addEventListener("click", incr14);
        function incr14() {
          if (c14 < maxCards) {
            c14 += 1;
            document.getElementById('c14').innerHTML = c14;
          }
          else {
            document.getElementById('c14').innerHTML = c14;
          }
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




