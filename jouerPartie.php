<?php 
    include('connexion.php');
?>

<div id="deckContainer" style="text-align: center;">
    <span id="compteurDeck"></span> &nbsp; / &nbsp; <span id="compteurDeckMax"></span>
    <br>
    <img src="Images/deck2.png" id="imgCardDeck" class="imgPartie" style="margin-top: 5px;">
    <br><br>
    <span id="miseLocked" style="opacity: 0;"></span>
</div>



<div class="background JouerContainer">

    
    
        <ul id="list">
            <li>
                <div id="soundButtonContainer">
                    <button type="button" id="soundToggleButton">
                        <img id="soundToggleImage" src="Images/speakerMax_sourceMax5.png">
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
                <div id="backgroundButtonContainer">
                    <button type="button" id="backgroundToggleButton">
                        <img id="backgroundToggleImage" src="Images/backgroundToggleImage.png">
                    </button>
                </div>            
            </li>

            <?php  if (!isset($_SESSION['username'])) : ?>
                <li style=" font-size: 1.5em; margin-top: 25px;" id="credits"></li>
			<?php endif ?>
        </ul>

        <!-- Trait lumineux -->
        <div id="traitLumineux" class="divider light" style="visibility: hidden;"></div>
        <!-- Fin -->

        <br>



        <ul class="list2" id="croupier">
            <!-- AJOUT DES CARTES ICI -->
        </ul>

        <br> 

        <span id="scoreCroupier" class="scores" style="visibility: hidden">0</span>





        <!-- PIRE SEPARATEUR (JOUEUR/CROUPIER) -->
        <!-- <p><br>
        <br>
        <br>
        <br>
        <br>
        <br></p> -->
        <!-- Fin du pire séparateur EU West -->

        <!-- Nouveau Séparateur avec "Gagné"/"Perdu" et backgroundColor correspondant -->
        <div id="separateur">
            <p id="resultatText"></p>
        </div>
        <!-- Fin -->


        <br>


        <span id="scoreJoueur" class="scores" style="visibility: hidden;">0</span>

        <div class="list2" id="joueur">
            <!-- AJOUT DES CARTES ICI -->
        </div>






</div>