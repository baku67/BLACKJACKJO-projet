<?php

    session_start();

    // WIP: input utilisateur (+ sauvegardé bdd)
    $limit = 20;
    
    $query = 'SELECT id, username, action, date FROM logs ORDER BY id DESC LIMIT 20;';
    $result = mysqli_query($db, $query);

    // Compteur de résultats line pour compléter avec lignes vides
    $count = 0;



    // Titre section
    echo("<h2 style=\"font-size:2.2em !important; position:relative; margin-top:30px; margin-bottom:15px; text-align:center; color:rgba(223, 204, 204, 0.9) !important; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\"><span style=\"color:rgb(255, 201, 104) !important;\">★</span> Journal d'activité <span style=\"color:rgb(255, 201, 104) !important;\">★</span></h2>");


    // Nom Colonnes Liste Globale Historiques Parties
    echo "<div class='' style='margin: 0 30px; background-color:rgba(2, 107, 198, 0.2);'>";
    echo 
       "<div class='traitBlancHistoriqueLineHaut'></div>"

            .  "<p class='paragrapheLogsLineAdmin' style='margin-top:10px;'>"

                .  "<span style='gridArea: username; font-size:1.5em;'>" . "Nom" . "</span>"

                .  "<span style='gridArea: action; font-size:1.5em;'>" . "Action" . "</span>"
                
                .  "<span style='gridArea: date; font-size:1.5em;'>". "Date" . "</span>"
            
            .  "</p>"

    .  "<div class='traitBlancHistoriqueLineBas'></div>";
    echo "<br/>";
    echo "</div>";






    // Liste Ligne Journal

    echo "<ul id='listHistorique' style='font-size:2em;'>";


    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {

            echo "<li class='historiqueLine'>";

                // Ligne Historique avec toutes les infos
                echo 
                   "<div class='traitBlancHistoriqueLineHaut'></div>"

                    .  "<p class='paragrapheLogsLineAdmin'>"

                        .  "<span style='gridArea: username;'>" . $row['username'] . "</span>"

                        .  "<span style='gridArea: resultats;' class='resultatCasHistorique'>" . $row['action'] . "</span>"

                        .  "<span style='gridArea: dates;' class='dateHistorique'>". $row['date'] . "</span>"
                    
                    .  "</p>"

                .  "<div class='traitBlancHistoriqueLineBas'></div>";

                echo "<br/>";
            echo "</li>";
    }





    echo "</ul>";






?>
