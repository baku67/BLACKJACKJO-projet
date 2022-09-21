<?php 
    include('connexion.php');
?>

<div id="deckContainer" style="text-align: center;">
    <span id="compteurDeck"></span> &nbsp; / &nbsp; <span id="compteurDeckMax"></span><!--<img src="Images/deckIcon.png" style="width:40px;"/>-->
    <br>
    <img id="imgCardDeck" class="imgPartie" style="margin-top: 5px;">
    <br>
    
    <!-- MiseLocked popé from JS -->
    <!-- <span id="miseLocked" style="font-family:'Holtwood One SC', serif;"></span> -->
</div>

 <!-- WIP CARTE DE DISTRIBUTION (animation CSS) -->
<img id="cardAnim" class="imgPartie">

<div id="parametresPartieDiv" style="text-align:center; visiblity: visible">
    <p style="position:relative; width:100%; font-size:1.35em; opacity:0.4;">Mise max</p>

    <div style="display:inline-flex;">
        <p style="font-weight:bold; font-size:1.5em; opacity:0.6;">100 </p><!--<img class="imagesSou" src="Images/souBlanc.png"/>-->
    </div>
    <br>
    <p style="position:relative; width:100%; font-size:1.35em; opacity:0.4;">Decks</p>
    
    <div style="display:inline-flex;">
        <p style="font-weight:bold; font-size:1.5em; opacity:0.6;">2 </p><!--<img class="imagesSou" src="Images/paquets.png"/>-->
    </div>
    <br><br>
</div>



<div class="background JouerContainer">

        <?php  if (!isset($_SESSION['username'])) : ?>
                <!-- ReStyle creditInvite: juste mettre le cred inline avec conn/insc  -->
                <p id="credits"></p>
        <?php endif ?>
    
        <ul id="list">
            <li>
                <div id="soundButtonContainer">
                    <button type="button" id="soundToggleButton">
                        <img id="soundToggleImage" style="opacity:0;" src="Images/speakerMute.png">
                    </button>
                </div>               
            </li>
            <li>
                <div id="speedButtonContainer">
                    <button type="button" id="speedToggleButton">
                        <img id="speedToggleImage" style="opacity:0;" src="Images/fastForwardGrey.png">
                    </button>
                </div>            
            </li>
            <li>
                <div id="backgroundButtonContainer" data-mode="light">
                    <button type="button" id="backgroundToggleButton">
                        <img id="backgroundToggleImage" style="opacity:0;" src="Images/moonGrey.png">
                    </button>
                </div>            
            </li>
        </ul>









        <ul class="list2" id="croupier">
            <!-- AJOUT DES CARTES ICI -->
        </ul>
        <br> 
        <span id="scoreCroupier" class="scores" style="visibility: hidden">0</span>



        <!-- Nouveau Séparateur avec "Gagné"/"Perdu" et backgroundColor correspondant -->
        <div id="separateur">
            <p id="resultatText"></p>
        </div>
        <br>
        <!-- Fin -->


    
        <span id="scoreJoueur" class="scores" style="visibility: hidden;">0</span>
        <div class="list2" id="joueur">
            <!-- AJOUT DES CARTES ICI -->
        </div>








        <!-- ANIMS ALERT PHASE (mise, choix) -->

        <!-- class .glitch à ajouter via JS (avec timeOut) pour coincider avec la phaseLente ? 
        Non il y a une anim Bézier, mettre jsute le delai qu'il faut 
        Par contre l'exemple est avec un hover -->

        <!-- Celui la pop avec le load du jouerPartie, pour le choix c'est une autre histoire -->
        <div id="phaseMiserAlert">
            <p id="textMise" class="glitchPhaseLente">
                Mise
                <!-- <span id="firstLetter">M</span>
                <span id="secondLetter">i</span>
                <span id="thirdLetter">s</span>
                <span id="fourthLetter">e</span> -->
            </p>
        </div>
        <div id="traitUnderlineInverse"></div>


        <!-- Il faut qui soit créé à l'écart du viewport, puis au moment du load footerChoix, on ajoute des classes d'anims (pas d'anims sur l'id de base) -->
        <div id="phaseChoixAlert">
            <p id="textChoix" style="">
                Choix
            </p>
        </div>
        <div id="traitUnderlineInverseChoix"></div>

        <!-- FIN ANIMS -->



</div>








