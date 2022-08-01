<?php

    include('config.php');

    $result = mysqli_query($db,"SELECT COUNT(*) AS amountGames FROM historique WHERE username = '".$_SESSION['username']."' AND (winLose = 'WIN' OR winLose = 'BJ') ");

    $row = mysqli_fetch_assoc($result);
    
    echo "<p style='font-size:1.1em; margin:auto;'>" . $row['amountGames'] . "</p>"; 
    
?>