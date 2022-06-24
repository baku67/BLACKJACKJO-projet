<?php

    include('config.php');


    $result = mysqli_query($db,"SELECT toggleMute FROM users WHERE username = '".$_SESSION['username']."' ");
    while($row = mysqli_fetch_array($result))
      {
      echo $row['toggleMute']; 
      }

    mysqli_close($db);

?>