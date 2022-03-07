<?php

    include('config.php');

    $nbrLose = mysqli_query($db,"SELECT Lose FROM users WHERE username = '".$_SESSION['username']."' ");
    $nbrWin = mysqli_query($db,"SELECT Win FROM users WHERE username = '".$_SESSION['username']."' ");

    $row1 = mysqli_fetch_assoc($nbrLose);
    $row2 = mysqli_fetch_assoc($nbrWin);

    echo "<p>" . round( $row2['Win'] / ($row2['Win'] + $row1['Lose']) * 100). " % &nbsp; Win" . "</p>"; 

    mysqli_close($db);

?>
