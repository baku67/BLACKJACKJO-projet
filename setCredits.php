<?php

    include('config.php');

    mysqli_query($db,"UPDATE users SET credits = $creditConnected WHERE username '".$_SESSION['username']."' ");

?>


