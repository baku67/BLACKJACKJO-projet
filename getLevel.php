<?php

    include('config.php');

    $exp = 0;


    $result = mysqli_query($db,"SELECT exp FROM users WHERE username = '".$_SESSION['username']."' ");

    while($row = mysqli_fetch_array($result)) {

        if ($row['exp'] !== null) {
            $exp = $row['exp'];
        }
    }






    $lvl = 1;
    $expNeeded = 300;


    while ($exp > 0) {
        // calculerLvl et décrémenter $exp
        if ($exp >= $expNeeded) {
            $lvl = ($lvl + 1);
            $exp = ($exp - $expNeeded);
            // Taux d'augmentation  de l'expérience nécessaire pour le Lvl suivant
            $expNeeded = ($expNeeded * 1.1);
                // TEST Affichage des besoins d'exp
                // echo("expNeeded: " . $expNeeded . "\n");
        }
        else {
            // Reste d'exp après calcul pour affichage progression
            $restExp = $exp;
            $exp = 0;            
                // echo("restExp: " . $restExp . "\n");
        }
    }


    echo($lvl);





    mysqli_close($db);

?>




<!-- 
// Formule suite géo (augmentation de 150% xp requis): 
        // u(0) (lvl.1) = 200px
        // u(n+1) = 1.5 U(n)  -->