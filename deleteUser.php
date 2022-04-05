<?php

    include('config.php');
    session_start();

    $username = ($_POST);

    foreach ($username as $key => $value) {
        $usernameValue = strval($value);
    }


    $query = "DELETE FROM users WHERE username = ? ";



    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 's', $usernameValue);
    mysqli_stmt_execute($stmt);

    
?>


