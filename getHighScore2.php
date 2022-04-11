<?php

    include('config.php');


    $result = mysqli_query($db,"SELECT credits AS maximum FROM users ORDER BY credits DESC LIMIT 1,1;");

    $row = mysqli_fetch_assoc($result);
    
    echo "<p class='highScores'>" . $row['maximum'] . "</p>"; 
    
    mysqli_close($db);

?>