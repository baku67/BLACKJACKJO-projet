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



<?php
if ($role=='joueur') :
    echo
        '<div class="slidecontainer">
            <p style="position:relative; top:5px; font-size:1.3em; color:rgba(223, 204, 204, 0.9); font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif;">Taille: <span id="demo"></span></p>
            <input type="range" min="20" max="200" value="50" step="10" class="slider" id="myRange">
        </div>';
endif;
?>

<!-- Slider Range (input à finir) -->
<!-- <div class="slidecontainer">
    <p style="position:relative; top:5px; font-size:1.3em; color:rgba(223, 204, 204, 0.9); font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Taille: <span id="demo"></span></p>
    <input type="range" min="20" max="200" value="50" step="10" class="slider" id="myRange">
</div> -->
<script>
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
    }
</script>
<!-- Fin Slider -->





<div id="historiqueListContainer" style="overflow-y:scroll; height:1000px; text-align:center; color:rgb(223, 204, 204); font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; letter-spacing:0px;">


    <?php

        // Historique: Vérification Admin/Connecté/Invite:
            if ( isset($_SESSION['username']) && $role=='admin' ) :
            
                ?>
                <div id="nombreTotalContainer" style="display:inline-flex; margin:auto; font-size: 115%;">
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