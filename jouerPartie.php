<?php 
    include('connexion.php');
?>

<div id="deckContainer" style="text-align: center;">
    <span id="compteurDeck"></span> &nbsp; / &nbsp; <span id="compteurDeckMax"></span><!--<img src="Images/deckIcon.png" style="width:40px;"/>-->
    <br>
    <img id="imgCardDeck" class="imgPartie" style="margin-top: 5px;">
    <br><br>
    <span id="miseLocked" style="opacity: 0; padding:10px 2px 9px 15px; font-family:'Holtwood One SC', serif;"></span>
</div>

<div id="parametresPartieDiv" style="text-align:center; visiblity: visible">
    <p style="position:relative; width:100%; font-size:1.35em; padding-right:35px; opacity:0.4;">Mise max</p>

    <div style="display:inline-flex;">
        <p style="font-weight:bold; font-size:1.5em; opacity:0.6;">100 </p><!--<img class="imagesSou" src="Images/souBlanc.png"/>-->
    </div>
    <br/><br/>
    <p style="position:relative; width:100%; font-size:1.35em; padding-right:35px; opacity:0.4;">Decks</p>
    
    <div style="display:inline-flex;">
        <p style="font-weight:bold; font-size:1.5em; opacity:0.6;">2 </p><!--<img class="imagesSou" src="Images/paquets.png"/>-->
    </div>
</div>



<div class="background JouerContainer">

        <?php  if (!isset($_SESSION['username'])) : ?>
                <!-- Séparer le "Crédits: " du crédit pour style font le chiffre uniquement -->
                <!-- <p style=" font-size: 1.5em; font-family: 'Holtwood One SC', serif;" id="credits"></p> -->
                <p style=" font-size: 1.5em;" id="credits"></p>
        <?php endif ?>
    
        <ul id="list">
            <li>
                <div id="soundButtonContainer">
                    <button type="button" id="soundToggleButton">
                        <img id="soundToggleImage" src="Images/speakerMute_sourceMaxPng2Recenter4.png">
                    </button>
                </div>               
            </li>
            <li>
                <div id="speedButtonContainer">
                    <button type="button" id="speedToggleButton">
                        <img id="speedToggleImage" src="Images/fastForwardGrey.png">
                    </button>
                </div>            
            </li>
            <li>
                <div id="backgroundButtonContainer" data-mode="dark">
                    <button type="button" id="backgroundToggleButton">
                        <img id="backgroundToggleImage" src="Images/backgroundToggleImage.png">
                    </button>
                </div>            
            </li>

            
        </ul>

        <!-- Trait lumineux -->
        <div id="traitLumineux" class="divider light" style="visibility: hidden;"></div>
        <br>
        <!-- Fin -->




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






</div>