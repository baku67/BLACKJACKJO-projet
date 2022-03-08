<?php

    include('config.php');


    $result = mysqli_query($db,"SELECT credits AS maximum FROM users ORDER BY credits DESC LIMIT 2,1;");

    $row = mysqli_fetch_assoc($result);
    
    echo "<p style='margin-top:2px;'>" . $row['maximum'] . "</p>"; 
    
    mysqli_close($db);

?>