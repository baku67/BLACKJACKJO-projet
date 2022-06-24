<?php

    include('config.php');


    $result = mysqli_query($db,"SELECT toggleSpeed FROM users WHERE username = '".$_SESSION['username']."' ");
    while($row = mysqli_fetch_array($result))
      {
      echo $row['toggleSpeed']; 
      }

    mysqli_close($db);

?>