<?php

    include('config.php');

    $result = mysqli_query($db,"SELECT COUNT(*) AS amountGames FROM historique WHERE username = '".$_SESSION['username']."' ");

    $row = mysqli_fetch_assoc($result);
    
    echo "<p style='font-size:1.3em; margin:auto; font-weight:bold;'>" . $row['amountGames'] . "</p>"; 
    
?>