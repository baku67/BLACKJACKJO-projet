<?php

    include('config.php');

    $result = mysqli_query($db,"SELECT COUNT(*) AS amountGames FROM historique WHERE username = '".$_SESSION['username']."' AND (winLose = 'WIN' OR winLose = 'BJ') ");

    $row = mysqli_fetch_assoc($result);
    
    echo "<p id='amountWin' style='font-size:1.3em; margin:auto; color:#0b9a0b; font-weight:bold;'>" . $row['amountGames'] . "</p>"; 
    
?>