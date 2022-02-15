<?php

    include('config.php');


    $result = mysqli_query($db,"SELECT credits FROM users WHERE username = '".$_SESSION['username']."' ");
    while($row = mysqli_fetch_array($result))
      {
      echo $row['credits']; 
      }

    mysqli_close($con);

?>