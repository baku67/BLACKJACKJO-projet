<?php

    include('config.php');


    $result = mysqli_query($db,"SELECT username FROM users WHERE credits = (SELECT MAX(credits) FROM users)");
    

    $row = mysqli_fetch_assoc($result);
    
    echo "<p style='font-size:0.9em; font-weight:bold; color:rgb(241 205 92 / 95%) !important;'>" . ucfirst($row['username']) . "</p>"; 
    
    mysqli_close($db);

?>