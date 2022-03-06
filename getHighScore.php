<?php

    include('config.php');


    $result = mysqli_query($db,"SELECT MAX(credits) AS maximum FROM users");

    $row = mysqli_fetch_assoc($result);
    
    echo "<p style='margin-top:2px;'>" . $row['maximum'] . "</p>"; 
    
    mysqli_close($db);

?>