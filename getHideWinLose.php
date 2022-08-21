<?php

    include('config.php');


    $result = mysqli_query($db,"SELECT hideWinLose FROM users WHERE username = '".$_SESSION['username']."' ");
    while($row = mysqli_fetch_array($result))
      {
      echo $row['hideWinLose']; //Boolean BDD (0 ou 1)
      }

    mysqli_close($db);

?>