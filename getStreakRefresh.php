<?php

    include('config.php');


    $result = mysqli_query($db,"SELECT streak FROM users WHERE username = '".$_SESSION['username']."' ");
    while($row = mysqli_fetch_array($result))
      {
      echo $row['streak']; 
      }

    mysqli_close($db);

?>