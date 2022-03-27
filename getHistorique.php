<?php
    session_start();

    
    $query = 'SELECT winLose, gain, date FROM historique WHERE username = "'.$_SESSION['username'].'" ORDER BY id DESC LIMIT 5;   ';
    // ajouter (SELECT) scoreJoueur et scoreCroupier
    
    $result = mysqli_query($db, $query);





    echo "<ul id='listHistorique' style='text-align: inline'>";


    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {
            echo "<li>";

                // Ligne avec toutes les infos
                echo 
                "<p>"."<span class='resultatCasHistorique' style='margin-left:50px; padding:5px 15px; border:1px solid #cca5a5; border-radius:10px; '>" . $row['winLose']. "</span>"
                .  "&nbsp;&nbsp;&nbsp;"


                .  "<span class='gainHistorique'>". $row['gain'] . "</span>"

                .  "&nbsp;&nbsp;&nbsp;&nbsp;"
                // A faire: DATE fonction qui retourne "il y a 12 minutes" "il y a 2 jours" 
                .  "<span class='dateHistorique'>". $row['date'] . "</span>"."</p>";

                echo "<br/>";
            echo "</li>";
    }


    echo "</ul>";
    
?>

