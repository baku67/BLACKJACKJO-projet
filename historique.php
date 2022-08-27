<?php
    include('config.php');
    session_start();
    // Get role
    $query = mysqli_query($db,"SELECT role FROM users WHERE username = '".$_SESSION['username']."' ");
    while($row = mysqli_fetch_array($query)) {$role = $row['role']; }




    
    if ($role=='admin') :
        echo("<h2 style=\"font-size:2.5em !important; position:relative; margin-top:10px; margin-bottom:15px; text-align:center; color:rgb(255, 201, 104); font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\"><span style='font-size:0.6em;'>★</span><span style='font-size:0.8em;'>★</span>★ Espace Admin ★<span style='font-size:0.8em;'>★</span><span style='font-size:0.6em;'>★</span></h2>");
    elseif ($role=='joueur') :
        echo("<h2 style=\"font-size:2.2em !important; position:relative; margin-top:30px; margin-bottom:15px; text-align:center; color:rgb(223, 204, 204); font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\">- Dernières parties jouées -</h2>");
    endif;

?>
<div id="traitBlancHistorique"></div>



<!-- <?php
if ($role=='joueur') :
    echo
        '<div class="slidecontainer">
            <p style="position:relative; top:5px; font-size:1.3em; color:rgba(223, 204, 204, 0.9); font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif;">Taille: <span id="demo"></span></p>
            <input type="range" min="20" max="200" value="50" step="10" class="slider" id="myRange">
        </div>';
endif;
?> -->

<!-- Slider Range (input à finir) -->
<!-- <div class="slidecontainer">
    <p style="position:relative; top:5px; font-size:1.3em; color:rgba(223, 204, 204, 0.9); font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Taille: <span id="demo"></span></p>
    <input type="range" min="20" max="200" value="50" step="10" class="slider" id="myRange">
</div> -->
<script>
    // var slider = document.getElementById("myRange");
    // var output = document.getElementById("demo");
    // output.innerHTML = slider.value;
    // slider.oninput = function() {
    //     output.innerHTML = this.value;
    // }






    // Click Hide WinLose

        //C'est ce truc qui merde  
    var getHideWinLoseBool = true;

    function hideWinLose() {
        if (getHideWinLoseBool == true) {
            getHideWinLoseBool = false;
            document.getElementById("amountWin").style.opacity = "1";
            document.getElementById("amountLose").style.opacity = "1";
            document.getElementById("hideButton").innerHTML = "&nbsp;Hide&nbsp;";

            var winLoseHidedToPhp = {};
            winLoseHidedToPhp.value = getHideWinLoseBool;

            if (isConnected == true) {
                  $.ajax({
                    url: "setHideWinLose.php",
                    method: "post",
                    data: winLoseHidedToPhp,
                    success: function(res) {
                      console.log("(JS) AJAX POST bool 'winLoseHidedToPhp' (" + winLoseHidedToPhp.value + ") vers setHideWinLose.php réussi");
                    }
                })
            }
        }
        else {
            getHideWinLoseBool = true;
            document.getElementById("amountWin").style.opacity = "0";
            document.getElementById("amountLose").style.opacity = "0";
            document.getElementById("hideButton").innerHTML = "&nbsp;Show&nbsp;";

            var winLoseHidedToPhp = {};
            winLoseHidedToPhp.value = getHideWinLoseBool;

            if (isConnected == true) {
                  $.ajax({
                    url: "setHideWinLose.php",
                    method: "post",
                    data: winLoseHidedToPhp,
                    success: function(res) {
                      console.log("(JS) AJAX POST bool 'winLoseHidedToPhp' (" + winLoseHidedToPhp.value + ") vers setHideWinLose.php réussi");
                    }
                })
            }
        }
    }
    // Fin Click Hide WinLose



    // State HideWinLose
    var getHideWinLoseBool = <?php include('getHideWinLose.php');?>;

    if (getHideWinLoseBool == 0) {
        document.getElementById('hideButton').innerHTML = "&nbsp;Hide&nbsp;"
        document.getElementById("amountWin").style.opacity = "1";
        document.getElementById("amountLose").style.opacity = "1";
    }
    else {
        document.getElementById('hideButton').innerHTML = "&nbsp;Show&nbsp;"
        document.getElementById("amountWin").style.opacity = "0";
        document.getElementById("amountLose").style.opacity = "0";
    }
    // Fin State

</script>













<div id="historiqueListContainer" style="overflow-y:scroll; height:1000px; text-align:center; color:rgb(223, 204, 204); font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; letter-spacing:0px;">


    <?php

        // Historique: Vérification Admin/Connecté/Invite:
            if ( isset($_SESSION['username']) && $role=='admin' ) :
            
                ?>
                <div style="font-size:120%; border: 3.5px solid rgba(239, 59, 46, 0.6); border-radius:8px; margin-left:12%; margin-right:12%; margin-top:30px; margin-bottom:45px; padding-top:8px; padding-bottom:7px;">
                    <div id="nombreTotalContainer" style="display:inline-flex; margin:auto; font-size: 115%;">
                        <?php
                            echo "Parties jouées: &nbsp;";
                            include('getTotalGames.php');
                        ?>
                    </div>

                    <br><br>

                    <div id="totalWinLoseContainer" style="display:inline-flex; margin:auto;">
                        <div id="nombreWinContainer" style="display:inline-flex; margin:auto; margin-right: 15px;">
                            <?php
                                echo "Parties gagnées: &nbsp;";
                                include('getTotalWinGames.php');
                            ?>
                        </div>

                        <div id="nombreLoseContainer" style="display:inline-flex; margin:auto; margin-left: 15px;">
                            <?php
                                echo "Parties perdues: &nbsp;";
                                include('getTotalLoseGames.php');
                            ?>
                        </div>

                        <!-- *************************************************************************** -->
                        <!-- TEST: Affichage du statsStreak.php (Commentaires php fonctionnent) -->
                            <!-- <div style="display:inline-flex; margin:auto; margin-left: 15px;">
                                <?php
                                    echo "Stats.php: &nbsp;";
                                    include('statsStreak.php');
                                ?>
                            </div> -->
                        <!-- Fin test -->
                        <!-- *************************************************************************** -->

                        <div id="hideButtonContainer" style="position:relative; left:7%; border:3px solid rgb(172 113 108 / 80%); border-radius:5px; padding:2px;">
                            <button id="hideButton" onclick="hideWinLose()"></button>
                        </div>  
                    </div>

                    <!-- Affichage des DailyConnected/Invite GamesNbr -->
                    <br />
                        <div style="display:inline-flex; margin:auto;">
                        <?php
                                include('getDailyGamesNbr.php');
                            ?>
                        </div>
                    <!-- Fin -->


                </div>

                <?php
                include('getAdminHistorique.php');
                echo("</br></br></br>");
                include('getAdminUsers.php');
                echo("</br></br></br>");
                include('getAdminLogs.php');


            // Mode invité
            elseif (!isset($_SESSION['username'])) : 

                // PROBLEME (03/04/2022 02:53): Historique Invite n'affiche plus le header statique "- Derniere parties jouées -"
                // echo("<h2 style=\"font-size:2.2em !important; position:relative; margin-top:30px; margin-bottom:15px; text-align:center; color:rgb(255, 255, 255); font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\">- Dernières parties jouées -</h2>");
                //rien (historique hors connexion JS)


            // Joueur connecté (standard)
            else : 
                ?>
                <div id="nombreTotalContainer" style="display:inline-flex; margin:auto;">
                <?php
                    echo "Parties jouées: &nbsp;";
                    include('getTotalGames.php');
                ?>
                </div>

                <br>

                <div id="totalWinLoseContainer" style="display:inline-flex; margin:auto;">
                    <div id="nombreWinContainer" style="display:inline-flex; margin:auto; margin-right: 15px;">
                        <?php
                            echo "Parties gagnées: &nbsp;";
                            include('getTotalWinGames.php');
                        ?>
                    </div>

                    <div id="nombreLoseContainer" style="display:inline-flex; margin:auto; margin-left: 15px;">
                        <?php
                            echo "Parties perdues: &nbsp;";
                            include('getTotalLoseGames.php');
                        ?>
                    </div>
                </div>


                <?php
                include('getHistorique.php'); 

            endif;
        // FIN
        
    ?>

</div>