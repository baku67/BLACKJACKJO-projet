<?php

    include('config.php');

    $nbrLose = mysqli_query($db,"SELECT Lose FROM users WHERE username = '".$_SESSION['username']."' ");
    $nbrWin = mysqli_query($db,"SELECT Win FROM users WHERE username = '".$_SESSION['username']."' ");

    $row1 = mysqli_fetch_assoc($nbrLose);
    $row2 = mysqli_fetch_assoc($nbrWin);

    // Gère le probleme ratio NAN à l'inscription:
    if (  is_nan(round( $row2['Win'] / ($row2['Win'] + $row1['Lose']) * 100))   ):
        echo "0 %";
    else:
        echo "<p id='ratioLine'>" . round( $row2['Win'] / ($row2['Win'] + $row1['Lose']) * 100). "%&nbsp;Win" . "</p>"; 
    endif;
    // Fin

    mysqli_close($db);

?>