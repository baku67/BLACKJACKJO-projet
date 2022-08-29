<?php

    include('config.php');

    $exp = 0;


    $result = mysqli_query($db,"SELECT exp FROM users WHERE username = '".$_SESSION['username']."' ");

    while($row = mysqli_fetch_array($result)) {

        if ($row['exp'] !== null) {
            $exp = $row['exp'];
        };
    };





    $lvl = 1;
    $expNeeded = 300;


    while ($exp > 0) {
        if ($exp >= $expNeeded) {

            $lvl = ($lvl + 1);
            $exp = ($exp - $expNeeded);

            if ( $lvl < 30 ) {
                $expNeeded = ($expNeeded * 1.15);
            }
            else {
                $expNeeded = ($expNeeded * 1.5);
            }
        }
        else {
            $restExp = $exp;
            $exp = 0;            
        };
    };

    echo($lvl);

    mysqli_close($db);

?>