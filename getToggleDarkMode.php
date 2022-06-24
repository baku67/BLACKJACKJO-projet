<?php

    include('config.php');


    $result = mysqli_query($db,"SELECT toggleDarkMode FROM users WHERE username = '".$_SESSION['username']."' ");
    while($row = mysqli_fetch_array($result))
      {
      echo $row['toggleDarkMode']; 
      }

    mysqli_close($db);

?>