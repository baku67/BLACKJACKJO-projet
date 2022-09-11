<?php

    include('config.php');

    session_start();


    $exp = 0;

    $lvl = 1;
    $expNeeded = 250;


    $result = mysqli_query($db,"SELECT exp FROM users WHERE username = '".$_SESSION['username']."' ");


    while($row = mysqli_fetch_array($result)) {

        if ($row['exp'] !== null) {
            $exp = $row['exp'];
        }



        while ($exp > 0) {
            if ($exp >= $expNeeded) {
    
                $lvl = ($lvl + 1);
                $finalLvl += 1;
    
                $exp = ($exp - $expNeeded);
    
                if ( $lvl < 30 ) {
                    $expNeeded = ($expNeeded * 1.12);
                }
                else {
                    $expNeeded = ($expNeeded * 1.3);
                    // Lvl Max: ajouter un reward
                }
            }
            else {
                $restExp = $exp;
                $exp = 0;            
            }
        }

        
    }
    

    echo($lvl);

    mysqli_close($db);

?>