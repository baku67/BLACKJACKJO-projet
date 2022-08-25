<?php

    include('config.php');


    $result = mysqli_query($db,"SELECT streak FROM users WHERE username = '".$_SESSION['username']."' ");
    while($row = mysqli_fetch_array($result))
      {
        if ($row['streak'] !== null) {
          echo $row['streak']; 
        }
        else {
          echo "0";
        }
      }

    mysqli_close($db);

?>