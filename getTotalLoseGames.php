<?php

    include('config.php');

    $result = mysqli_query($db,"SELECT COUNT(*) AS amountGames FROM historique WHERE username = '".$_SESSION['username']."' AND winLose = 'LOSE' ");

    $row = mysqli_fetch_assoc($result);
    
    echo "<p id='amountLose' style='font-size:1.3em; margin:auto; color:#d25555; font-weight:bold;'>" . $row['amountGames'] . "</p>"; 
    
?>