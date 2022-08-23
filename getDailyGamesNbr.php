<?php

    include('config.php');

    $todayDate = substr(date('Y-m-d H:i:s'), 0, 10);

    $result = mysqli_query($db,"SELECT COUNT(*) AS amountDailyInviteGames FROM historique WHERE username = '- Invite -' AND date LIKE '%$todayDate%'");
    $row = mysqli_fetch_assoc($result);

    $result2 = mysqli_query($db,"SELECT COUNT(*) AS amountDailyConnectedGames FROM historique WHERE username != 'Invite' AND date LIKE '%$todayDate%'");
    $row2 = mysqli_fetch_assoc($result2);

    echo "<p style='margin-right: 30px;'>Daily Invite: " . $row['amountDailyInviteGames'] . "</p>"; 
    echo "<p>Daily Connected: " . $row2['amountDailyConnectedGames'] . "</p>"; 


    
?>