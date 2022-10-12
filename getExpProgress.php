<?php

    include('config.php');

    session_start();




    $result = mysqli_query($db,"SELECT exp FROM users WHERE username = '".$_SESSION['username']."' ");


    while($row = mysqli_fetch_array($result)) {

        $exp = 0;

        $lvl = 1;
        $expNeeded = 350;
    

        if ($row['exp'] !== null) {
            $exp = $row['exp'];
        }



        while ($exp > 0) {
            if ($exp >= $expNeeded) {
    
                $lvl = ($lvl + 1);
    
                $exp = ($exp - $expNeeded);
    
                if ( $lvl < 20 ) {
                    $expNeeded = ($expNeeded * 1.15);
                }
                else if ( $lvl < 100 ) {
                    $expNeeded = $expNeeded;
                }
                else {
                    $expNeeded = $expNeeded;
                    
                    // Bloquer le lvl a 100 mais continuer les rewards
                }
            }
            else {
                $restExp = $exp;
                $exp = 0;            
            }
        }

        
    }

    // $number = (abs($restExp-$expNeeded)/(($restExp + $expNeeded)/2))*100;
    // $percentage = number_format((float)$number, 2, '.', '');

    $percentage = intval(ceil(($restExp/$expNeeded)*100));
    


    // echo(ceil($restExp). " / " . ceil($expNeeded));
    // echo($percentage . "%");
    echo($percentage);

    mysqli_close($db);

?>