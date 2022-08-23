<?php
    session_start();
    
    $query = 'SELECT winLose FROM historique WHERE username = "'.$_SESSION['username'].'" ORDER BY id DESC;   ';
    $result = mysqli_query($db, $query);

    $checkCompteurWin = 0;
    $checkCompteurLose = 0;
    $checkCompteurPsuh = 0;

    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

        if ( ($row['winLose'] == "WIN") || ($row['winLose'] =="BJ") ) {
        }
        else if ($row['winLose'] == "LOSE") {
        }
        else if ($row['winLose'] == "PUSH") {
        }

    }

    echo("\n Compteur Win: " . $checkCompteurWin . ", Compteur Lose: " . $checkCompteurLose . ", Compteur Push: " . $checkCompteurPsuh);

    // foreach elem:    
                    //  Lire le cas result
                    //  Le stocker
                    //  Lire le prochain
                    //  Si same, incrémenter un compteur de suite
                    //  Si different, ajouter le x1 aux nombre de x1 du cas correspondant
                    //  Itérer les 2 dernieres actions 

                    // Skip si PUSH (garder le streak en cours)
                    // BJ = Win

    // Possibilité d'afficher une jauge par user qui montre le % de streak de chaque lvlStreak (dans historique.php)
    // Rappel: Streak -2 si lose

?>