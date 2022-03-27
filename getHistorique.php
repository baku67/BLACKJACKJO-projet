<?php
    session_start();

    $limit = 20;
    
    $query = 'SELECT winLose, gain, date FROM historique WHERE username = "'.$_SESSION['username'].'" ORDER BY id DESC LIMIT 20;   ';
    // ajouter (SELECT) scoreJoueur et scoreCroupier
    
    $result = mysqli_query($db, $query);

    $count = 0;



    echo "<ul id='listHistorique' style='font-size:2em; '>";


    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {
            $count += 1;

            echo "<li>";

                // Ligne avec toutes les infos
                echo 
                "<p>"."<span class='resultatCasHistorique'>" . $row['winLose']. "</span>"
                .  "&nbsp;&nbsp;&nbsp;"


                .  "<span class='gainHistorique'>". $row['gain'] . "</span>"

                .  "&nbsp;&nbsp;&nbsp;&nbsp;"
                // A faire: DATE fonction qui retourne "il y a 12 minutes" "il y a 2 jours" 
                .  "<span class='dateHistorique'>". $row['date'] . "</span>"."</p>";

                echo "<br/>";
            echo "</li>";
    }


    for ($i=0; $i < ($limit-$count); $i++) {

            echo "<li>";

                // Ligne avec toutes les infos
                echo 
                "<p>"."<span class='resultatCasHistorique' style='opacity:0;'>--</span>"
                .  "&nbsp;&nbsp;&nbsp;"


                .  "<span class='gainHistorique' style='opacity:0;'>--</span>"

                .  "&nbsp;&nbsp;&nbsp;&nbsp;"
                // A faire: DATE fonction qui retourne "il y a 12 minutes" "il y a 2 jours" 
                .  "<span class='dateHistorique' style='opacity:0;'>--</span>"."</p>";

                echo "<br/>";
            echo "</li>";
    }


    echo "</ul>";
    
?>

