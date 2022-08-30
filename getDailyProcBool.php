<?php

    include('config.php');


    


    // get du lastDateCo (BDD) puis compraison, si date differentes, 
    $result2 = mysqli_query($db,"SELECT dateLastCo FROM users WHERE username = '".$_SESSION['username']."' ");

    while($row = mysqli_fetch_array($result2)) {
        $lastCoDate = $row['dateLastCo']; 
    }
    $dateNow = date('Y-m-d');

    
        $result = mysqli_query($db,"SELECT firstDailyConnect FROM users WHERE username = '".$_SESSION['username']."' ");
        while($row = mysqli_fetch_array($result)) {
            $dailyConnectBool = $row['firstDailyConnect'];
        }

        $procDailyRewardBool = 0;


        // if ($lastCoDate != $dateNow) {
        //     Si dates différentes et getFirstDailyCo == 1, le laisser à 1, return (proc==true)      ATTENTION: il faut que la dateLastConnexion se MàJ avant ce calcul
        //     Si dates différentes et getFirstDailyCo == 0, re-set à 1, return (proc=true)
        // }
        // else {
        //     Si dates identiques et get.firstDailyCo == 1, return (proc=false)
        //     Si dates identiques et get.firstDailyCo == 0, re-set le firstDailyCo à 1 et return(proc=true)
        // }



        // En vrai juste en comparan les dates (bah oui ça suffit, j'ai créer un monstre)
        if (($dailyConnectBool == 0) && ($lastCoDate != $dateNow)) {
            $dailyConnectBool = 1;

            $query = "UPDATE users SET firstDailyConnect = ? WHERE username = '".$_SESSION['username']."' ";
            $stmt = mysqli_prepare($db, $query);
            mysqli_stmt_bind_param($stmt, 'i', $dailyConnectBool);
            mysqli_stmt_execute($stmt);

            $procDailyRewardBool = 1;
        }
        else if (($dailyConnectBool == 0) && ($lastCoDate == $dateNow)) {
            $dailyConnectBool = 1;

            $query = "UPDATE users SET firstDailyConnect = ? WHERE username = '".$_SESSION['username']."' ";
            $stmt = mysqli_prepare($db, $query);
            mysqli_stmt_bind_param($stmt, 'i', $dailyConnectBool);
            mysqli_stmt_execute($stmt);

            $procDailyRewardBool = 1;
        }
        else if (($dailyConnectBool == 1) && ($lastCoDate != $dateNow)) {
            $procDailyRewardBool = 1;
        }
        else if (($dailyConnectBool == 1) && ($lastCoDate == $dateNow)) {
            $procDailyRewardBool = 0;
        }



    include('setLastCoDate.php');


    echo $procDailyRewardBool;





    mysqli_close($db);

?>