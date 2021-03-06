<?php

    session_start();

    // WIP: input utilisateur (+ sauvegardé bdd)
    $limit = 12;
    
    $query = 'SELECT username, credits, Win, Lose, role, commentaires FROM users ORDER BY role, credits DESC LIMIT 10;   ';
    
    // Date inscription!  (ET DATE derniere connexion : prévoir Height des lignes)
    // $query = 'SELECT username, credits, Win, Lose, role, commentaires FROM users ORDER BY id DESC LIMIT 50;   ';
    // INNER JOIN logs ON username


    $result = mysqli_query($db, $query);

    // Compteur de résultats line pour compléter avec lignes vides
    $count = 0;

    

    // TITRE UserList
    echo("<h2 style=\"font-size:2.2em !important; position:relative; margin-top:30px; margin-bottom:15px; text-align:center; color:rgba(223, 204, 204, 0.9) !important; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\"><span style=\"color:rgb(255, 201, 104) !important;\">★</span> Liste Utilisateurs <span style=\"color:rgb(255, 201, 104) !important;\">★</span></h2>");

    // Nom Colonnes Liste Utilisateurs
    echo "<div class='' style='border-bottom: 1px solid #ffffff61; margin: 0 15px; background:linear-gradient(0deg, rgba(2,107,198,0.4) 0%, rgba(2,0,36,0) 100%);'>";
    echo 
        "<p class='paragrapheUserLineAdmin' style='margin-top:10px; position:relative; top:15px;'>"

            .  "<span style='gridArea:username; margin-top:10px; font-size:1.5em;'>" . "Nom" . "</span>"

            .  "<span style='gridArea:role; margin-top:10px; font-size:1.5em;'>" . "Role" . "</span>"
            
            .  "<span style='gridArea:credits; margin-top:10px; font-size:1.5em;'>". "Crédits" . "</span>"

            .  "<span style='gridArea:dateInsc; margin-top:10px; font-size:1.5em;'>". "Date Inscr." . "</span>"

            .  "<span style='gridArea:dateLastCo; margin-top:10px; font-size:1.5em;'>". "Date LastCo" . "</span>"

            .  "<span style='font-size:2.5em; font'>&#128465;</span>"
        
        .  "</p>";
    echo "<br/>";
    echo "</div>";
    // Fin 



    // ListContainer
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

            // Ligne userJoueur avec delteButton
            if ($row['role'] == 'joueur') {

                echo "<li class='historiqueLineAdmin userAdmin'>";

                    // Ligne User avec toutes les infos
                    echo 
                    "<div class='traitBlancHistoriqueLineHaut'></div>"

                        .  "<p class='paragrapheUserLineAdmin'>"

                            .  "<span class='username' style='gridArea:username; margin-top: 10px;'>" . $row['username'] . "</span>"

                            .  "<span style='gridArea:role; margin-top: 10px;' class='roleUsers'>" . $row['role'] . "</span>"
                            
                            .  "<span style='gridArea:credits;' class='gainHistorique'>". $row['credits'] . "</span>"

                            // Date inscription et derniere connexion 

                            .  "<span style='gridArea:dateInsc;' class='dateHistorique'>". "il y a 1 mois" . "</span>"

                            .  "<span style='gridArea:dateLastCo;' class='dateHistorique'>". "il y a 2 jours" . "</span>"

                            .  "<button class='deleteUserButton' style='gridArea:deleteButton; background-color:rgba(226,5,61,0.4); font-size:1.8em; position:relative; padding:5px 0; bottom:3px;'>" . "X" . "</button>"
                        
                        .  "</p>"

                    .  "<div class='traitBlancHistoriqueLineBas'></div>";

                    echo "<br/>";
                echo "</li>";
            }
            // Ligne userAdmin sans deleteButton
            elseif ($row['role'] == 'admin') {

                echo "<li class='historiqueLineAdmin userAdmin'>";

                    // Ligne User avec toutes les infos
                    echo 
                    "<div class='traitBlancHistoriqueLineHaut'></div>"

                        .  "<p class='paragrapheUserLineAdmin'>"

                            .  "<span class='username' style='gridArea:username; margin-top: 10px;'>" . $row['username'] . "</span>"

                            .  "<span style='gridArea:role; margin-top: 10px;' class='roleUsers'>" . $row['role'] . "</span>"
                            
                            .  "<span style='gridArea:credits;' class='gainHistorique'>". $row['credits'] . "</span>"

                            // Date inscription et derniere connexion 

                            .  "<span style='gridArea:dateInsc;' class='dateHistorique'>". "il y a 1 mois" . "</span>"

                            .  "<span style='gridArea:dateLastCo;' class='dateHistorique'>". "il y a 2 jours" . "</span>"

                            .  "<button class='deleteUserButton' style='gridArea:deleteButton; position:relative;'></button>"
                        
                        .  "</p>"

                    .  "<div class='traitBlancHistoriqueLineBas'></div>";

                    echo "<br/>";
                echo "</li>";

            }

    }

    // BOUTON AJOUT UTILISATEUR Avec role (rapide)
    echo 
    "<li id='addUserButton' style='background-color:rgba(31,176,68,0.6); height:60px; border-radius:8px; border: 4px solid rgba(3,255,184,0.7);' class='historiqueLineAdmin userAdmin;'>
    <button style='color:rgba(255,255,255,0.7); position:relative; font-size:2.5em; bottom: 15px;'>
    +
    </button>
    </li>";





    // Complète avec des lignes vides (jusqu'à LIMIT) pour JS
    for ($i=0; $i < ($limit-$count); $i++) {

            echo "<li class='historiqueLineAdmin userAdmin'>";

                // Fausses Lignes (fix elem inexistant JS)
                echo 
                   "<div class='traitBlancHistoriqueLineHaut'></div>"

                    .  "<p style='margin: 0 5%; display:grid; grid-template-columns: 1.1fr 1fr 1.1fr; grid-template-rows: 1fr; gap: 0px 10px; grid-template-areas: \"resultats gains dates\"; '>"
                    
                        .  "<span style='gridArea:resultats;' class='resultatCasHistorique' style='opacity:0;'>--</span>"
                    

                        .  "<span style='gridArea:gains;' class='gainHistorique' style='opacity:0;'>--</span>"

                        .  "<span style='gridArea:dates;' class='dateHistorique' style='opacity:0;'>--</span>"

                        .  "<span style='gridArea:dates;' class='dateHistorique' style='opacity:0;'>--</span>"
                    
                    .  "</p>"

                .  "<div class='traitBlancHistoriqueLineBas'></div>";

                echo "<br/>";
            echo "</li>";
    }


    echo "</ul>";

    
?>