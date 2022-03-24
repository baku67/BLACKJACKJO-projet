<?php

    session_start();
    $query = 'SELECT winLose, gain FROM historique WHERE username = "'.$_SESSION['username'].'" ORDER BY id DESC LIMIT 5;   ';

    // EXEMPLE QUI MARCHE:    $query = "SELECT winLose, gain FROM historique WHERE username = 'basile' ORDER BY 'id' DESC LIMIT 3";

    
    
    $result = mysqli_query($db, $query);

    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {
        echo "<ul style='text-align: inline'>";
            echo "<li>";

                // Ligne avec toutes les infos
                echo "<p>"."<span id='resultatCasHistorique' style='margin-left:50px; padding:5px 15px; border:1px solid #cca5a5; border-radius:10px; '>" . $row['winLose']. "</span>"
                .  "&nbsp;&nbsp;&nbsp;"  
                .  "<span>". $row['gain'] . "</span>"."</p>";

                echo "<br/>";
            echo "</li>";
        echo "</ul>";
    }
    
?>

