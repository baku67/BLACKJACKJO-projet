<?php
    session_start();

    // WIP: input utilisateur (+ sauvegardé bdd)
    $limit = 20;
    
    $query = 'SELECT winLose, gain, scoreJoueur, scoreCroupier, doubleBool, date FROM historique WHERE username = "'.$_SESSION['username'].'" ORDER BY id DESC LIMIT 20;   ';
    $result = mysqli_query($db, $query);

    // Compteur de résultats line pour compléter avec lignes vides
    $count = 0;

    


    echo "<ul id='listHistorique' style='font-size:2em; '>";


    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {
            $count += 1;

            if ($row['doubleBool'] == 1) {
                $double = 'x2';
            }
            elseif ($row['doubleBool'] == 0) {
                $double = 'x1';
            }

            echo "<li class='historiqueLine'>";

                // Ligne avec toutes les infos
                echo 
                   "<p style='margin: 0 10%; display:grid; grid-template-columns: 1.1fr 0.8fr 1.1fr; grid-template-rows: 1fr; gap: 0px 50px; grid-template-areas: \"resultats gains dates\"; '>"

                .  "<span style='gridArea: resultats;' class='resultatCasHistorique'>" . $row['winLose']. "</span>"
                
                // Grouper gain et doubleBool (pour grid)
                .  "<span style='gridArea: gains;'><span class='gainHistorique'>". $row['gain'] . "</span>"

                .  "<span class='doubleBoolHistorique'>" . " " . $double . "</span></span>"

                // A faire: DATE fonction qui retourne "il y a 12 minutes" "il y a 2 jours" 
                .  "<span style='gridArea: dates;' class='dateHistorique'>". $row['date'] . "</span>"
                
                .  "</p>"

                .  "<div class='traitBlancHistoriqueLine'></div>";

                echo "<br/>";
            echo "</li>";
    }


    // Complète avec des lignes vides (jusqu'à LIMIT) pour JS
    for ($i=0; $i < ($limit-$count); $i++) {

            echo "<li class='historiqueLine'>";

                // Fausses Lignes (fix elem inexistant JS)
                echo 
                   "<p style='margin: 0 10%; display:grid; grid-template-columns: 1.1fr 0.8fr 1.1fr; grid-template-rows: 1fr; gap: 0px 0px; grid-template-areas: \"resultats gains dates\"; '>"
                   
                .  "<span style='gridArea: resultats;' class='resultatCasHistorique' style='opacity:0;'>--</span>"
            

                .  "<span style='gridArea: gains;' class='gainHistorique' style='opacity:0;'>--</span>"

                // A faire: DATE fonction qui retourne "il y a 12 minutes" "il y a 2 jours" 
                .  "<span style='gridArea: dates;' class='dateHistorique' style='opacity:0;'>--</span>"
                
                .  "</p>";

                echo "<br/>";
            echo "</li>";
    }


    echo "</ul>";
    
?>

