<?php

    include('config.php');


    $result = mysqli_query($db,"SELECT firstDailyConnect FROM users WHERE username = '".$_SESSION['username']."' ");
    while($row = mysqli_fetch_array($result)) {

      $dailyConnectBool = $row['firstDailyConnect'];
    }


    if ($dailyConnectBool == 0) {
        $dailyConnectBool = 1

        $query = "UPDATE users SET firstDailyConnect = ? WHERE username = '".$_SESSION['username']."' ";
        $stmt = mysqli_prepare($db, $query);
        mysqli_stmt_bind_param($stmt, 'i', $dailyConnectBool);
        mysqli_stmt_execute($stmt);

        $procDailyRewardBool = 1;
      }
      else {
        $procDailyRewardBool = 0;
    }



    echo $procDailyRewardBool;




    
    mysqli_close($db);

?>