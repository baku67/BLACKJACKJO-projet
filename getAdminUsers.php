<?php




    session_start();

    // WIP: input utilisateur (+ sauvegardé bdd)
    $limit = 20;
    
    $query = 'SELECT username, credits, Win, Lose, role, commentaires FROM users ORDER BY id DESC LIMIT 50;   ';
    
    // Date inscription!  (ET DATE derniere connexion : prévoir Height des lignes)
    // $query = 'SELECT username, credits, Win, Lose, role, commentaires FROM users ORDER BY id DESC LIMIT 50;   ';
    // INNER JOIN logs ON username

    // FIN

    $result = mysqli_query($db, $query);
    $result2 = mysqli_query($db, $query2);

    // Compteur de résultats line pour compléter avec lignes vides
    $count = 0;

    


    echo("</br>");
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

                // Ligne User avec toutes les infos
                echo 
                   "<div class='traitBlancHistoriqueLineHaut'></div>"

                    .  "<p class='paragrapheUserLineAdmin'>"

                        .  "<span style='gridArea: username;'>" . $row['username'] . "</span>"

                        .  "<span style='gridArea: role;' class='roleUsers'>" . $row['role'] . "</span>"
                        
                        .  "<span style='gridArea: credits;' class='gainHistorique'>". $row['credits'] . "</span>"

                        // Date inscription et derniere connexion 

                        .  "<span style='gridArea: dateInsc;' class='dateHistorique'>". "il y a 1 mois (DUR)" . "</span>"

                        .  "<span style='gridArea: dateLastCo;' class='dateHistorique'>". "il y a 2 jours (DUR)" . "</span>"
                    
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

                        .  "<span style='gridArea: dates;' class='dateHistorique' style='opacity:0;'>--</span>"

                        .  "<span style='gridArea: dates;' class='dateHistorique' style='opacity:0;'>--</span>"
                    
                    .  "</p>"

                .  "<div class='traitBlancHistoriqueLineBas'></div>";

                echo "<br/>";
            echo "</li>";
    }


    echo "</ul>";
    







?>