<?php

    include('config.php');


    $result = mysqli_query($db,"SELECT username FROM users WHERE credits = (SELECT credits FROM users ORDER BY credits DESC LIMIT 1,1)");
    

    $row = mysqli_fetch_assoc($result);
    
    echo "<p style='font-size:0.9em; font-weight:bold; color:silver !important;'>" . ucfirst($row['username']) . "</p>"; 
    
    mysqli_close($db);

?>