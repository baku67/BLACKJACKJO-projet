<?php
    include('config.php');
    session_start();
    // Get role
    $query = mysqli_query($db,"SELECT role FROM users WHERE username = '".$_SESSION['username']."' ");
    while($row = mysqli_fetch_array($query)) {$role = $row['role']; }

    if ($role=='admin') :
        echo("<h2 style=\"font-size:2.2em !important; position:relative; margin-top:30px; margin-bottom:15px; text-align:center; color:rgb(223, 204, 204); font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\">★ Historique Global ★</h2>");
    elseif ($role=='joueur') :
        echo("<h2 style=\"font-size:2.2em !important; position:relative; margin-top:30px; margin-bottom:15px; text-align:center; color:rgb(223, 204, 204); font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\">- Dernières parties jouées -</h2>");
    endif;

?>
<div id="traitBlancHistorique"></div>



<!-- Slider Range (input à finir) -->
<div class="slidecontainer">
    <p style="position:relative; top:5px; font-size:1.3em; color:rgba(223, 204, 204, 0.9); font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Taille: <span id="demo"></span></p>
    <input type="range" min="20" max="200" value="50" step="10" class="slider" id="myRange">
</div>
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
                include('getAdminHistorique.php');
                include('getAdminUsers.php');

            elseif (!isset($_SESSION['username'])) : 
                //rien (historique hors connexion JS)

            else : 
                include('getHistorique.php'); 

            endif;
        // FIN
        
    ?>

</div>