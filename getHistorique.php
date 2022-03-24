<?php

    session_start();
    $query = "SELECT winLose, gain FROM historique WHERE username = '".$_SESSION['username']."' ";
    // ajouter le     ORDER BY 'id' DESC     puis   ~LIMIT 5
    // $query = "SELECT winLose, gain FROM historique WHERE username = '".$_SESSION['username']."' ORDER BY "id" DESC";
    // exemple SQL qui marche: SELECT winLose, gain FROM historique WHERE username = 'basile' ORDER BY "id" DESC;
    
    
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

