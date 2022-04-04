<?php




    session_start();

    // WIP: input utilisateur (+ sauvegardé bdd)
    $limit = 20;
    
    $query = 'SELECT username, winLose, gain, doubleBool, date FROM historique ORDER BY id DESC LIMIT 30;   ';
    $result = mysqli_query($db, $query);

    // Compteur de résultats line pour compléter avec lignes vides
    $count = 0;

    

    echo("<h2 style=\"font-size:2.2em !important; position:relative; margin-top:30px; margin-bottom:15px; text-align:center; color:rgba(223, 204, 204, 0.9) !important; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\"><span style=\"color:rgb(255, 201, 104) !important;\">★</span> Historique Global <span style=\"color:rgb(255, 201, 104) !important;\">★</span></h2>");
    


    // Nom Colonnes Liste Globale Historiques Parties

    echo "<div class='' style='margin: 0 30px; background-color:rgba(2, 107, 198, 0.2);'>";
    echo 
       "<div class='traitBlancHistoriqueLineHaut'></div>"

            .  "<p class='paragrapheHistoriqueLineAdmin' style='margin-top:10px;'>"

                .  "<span style='gridArea: username; font-size:1.5em;'>" . "Nom" . "</span>"

                .  "<span style='gridArea: resultats; font-size:1.5em;'>" . "Résultat" . "</span>"
                
                // Gain et doubleBool groupé (pour grid)
                .  "<span style='gridArea: gains; font-size:1.5em;'>". "Gain" . "</span>"

                .  "<span style='gridArea: dates; font-size:1.5em;'>". "Date" . "</span>"
            
            .  "</p>"

    .  "<div class='traitBlancHistoriqueLineBas'></div>";

    echo "<br/>";
    echo "</div>";










    echo "<ul id='listHistorique' style='font-size:2em;'>";


    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {
            $count += 1;

            if ($row['doubleBool'] == 1) {
                $double = 'x2';
            }
            elseif ($row['doubleBool'] == 0) {
                $double = 'x1';
            }


            if ($row['gain'] > 0) {
                $gainSigne = "+" . $row['gain'];
            }
            else {
                $gainSigne = $row['gain'];
            }



            echo "<li class='historiqueLine'>";

                // Ligne Historique avec toutes les infos
                echo 
                   "<div class='traitBlancHistoriqueLineHaut'></div>"

                .  "<p class='paragrapheHistoriqueLineAdmin'>"

                    .  "<span style='gridArea: username;'>" . $row['username'] . "</span>"

                    .  "<span style='gridArea: resultats;' class='resultatCasHistorique'>" . $row['winLose'] . "</span>"
                    
                    // Gain et doubleBool groupé (pour grid)
                    .  "<span style='gridArea: gains;'><span class='gainHistorique'>". $gainSigne . "</span>"

                    .  "<span class='doubleBoolHistorique'>" . " " . $double . "</span></span>"

                    .  "<span style='gridArea: dates;' class='dateHistorique'>". $row['date'] . "</span>"
                
                .  "</p>"

                .  "<div class='traitBlancHistoriqueLineBas'></div>";

                echo "<br/>";
            echo "</li>";
    }


    // Complète avec des lignes vides (jusqu'à LIMIT) pour JS
    for ($i=0; $i < ($limit-$count); $i++) {

            echo "<li class='historiqueLine'>";

                // Fausses Lignes (fix elem inexistant JS)
                echo 
                   "<div class='traitBlancHistoriqueLineHaut'></div>"

                .  "<p style='margin: 0 5%; display:grid; grid-template-columns: 1.1fr 1fr 1.1fr; grid-template-rows: 1fr; gap: 0px 10px; grid-template-areas: \"resultats gains dates\"; '>"
                   
                    .  "<span style='gridArea: resultats;' class='resultatCasHistorique' style='opacity:0;'>--</span>"
                

                    .  "<span style='gridArea: gains;' class='gainHistorique' style='opacity:0;'>--</span>"

                    // A faire: DATE fonction qui retourne "il y a 12 minutes" "il y a 2 jours" 
                    .  "<span style='gridArea: dates;' class='dateHistorique' style='opacity:0;'>--</span>"
                
                .  "</p>"

                .  "<div class='traitBlancHistoriqueLineBas'></div>";

                echo "<br/>";
            echo "</li>";
    }


    echo "</ul>";
    







?>