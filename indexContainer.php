<div id="container1" class="indexFadeInCentre3">

    <!-- Bouton "Nouvelle Partie" -->
    <?php  
        if (!isset($_SESSION['username'])) : 
    ?>
                <div id="newGame" class="module-border-wrap">
                    <a id="newGameLink" href="#" style="text-decoration: none;">Partie rapide !</a>
                </div>
    <?php 
        elseif (isset($_SESSION['username'])) : 
    ?>
                <div id="newGame" class="module-border-wrap">
                    <a id="newGameLink" href="#" style="text-decoration: none;">Nouvelle Partie !</a>
                </div>
    <?php 
        endif 
    ?>
    <!-- Fin -->



    <!-- Ratio (WIP voir Shedule: header, position, responsive+) -->
    <?php
    if (isset($_SESSION['username'])) : 
    ?>
        <div id='ratioDiv'>
            <h3 style="font-size:1.3em;">Ratio</h3>
            <div class="divider light" style="position:relative; bottom:16px; width:100%; -webkit-linear-gradient(left, rgb(90,90,90) 0%, rgba(255,255,255,1) 50%, rgb(90,90,90) 100%)"></div>
            <?php include('getRatio.php') ?>
        </div>
    <?php
    else :
    ?>
        <div id='ratioDiv'>
            <h3 style="font-size:1.3em;">Ratio</h3>
            <div id="traitBlancRatio"></div>
            <p id='ratioLine'>0 %</p>
        </div>
    <?php
    endif
    ?>
    <!-- Fin Ratio -->



    <!-- Classement (WIP voir Shedule: header, position, responsive+) -->
    
    <div id="classementDiv">

        <h3 id="classementTitle" style="font-size:1.3em; color:rgb(223, 204, 204);">Classement</h3>

        <div id="traitBlancClassement"></div>

        <div class="topLineDiv">

            <p>
                <span style="color: rgb(241 205 92 / 95%) !important">&#9733;</span>
                Top 1: &nbsp;&nbsp; 
            </p>

            <?php include('getHighScoreName.php'); ?>

            &nbsp;		
            <!-- <p style="color: #a09f39"> _ </p> -->
            &nbsp;

            <?php include('getHighScore.php'); ?>
            
            <img src="Images/souBlancBarre.png" alt="pièce" class="imageSouPetit" style="top:-3px !important">

        </div>

        <br>

        <div class="topLineDiv">

            <p>
                <span style="color: silver !important">&#9733;</span>
                Top 2: &nbsp;&nbsp; 
            </p>

            <?php include('getHighScore2Name.php'); ?>

            &nbsp;		
            <!-- <p style="color: #a09f39"> _ </p> -->
            &nbsp;

            <?php include('getHighScore2.php'); ?>
            
            <img src="Images/souBlancBarre.png" alt="pièce" class="imageSouPetit" style="top:-3px !important">

        </div>

        <br>

        <div class="topLineDiv">

            <p>
                <span style="color: #ba6555 !important">&#9733;</span>
                Top 3: &nbsp;&nbsp; 
            </p>

            <?php include('getHighScore3Name.php'); ?>

            &nbsp;		
            <!-- <p style="color: #a09f39"> _ </p> -->
            &nbsp;

            <?php include('getHighScore3.php'); ?>
            
            <img src="Images/souBlancBarre.png" alt="pièce" class="imageSouPetit" style="top:-3px !important">

        </div>

    </div>
    <!-- fin Classement -->

</div>