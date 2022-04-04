<?php

    include('config.php');
    session_start();

    $username = ($_POST);

    foreach ($username as $key => $value) {
        // FONCTIONNE: $usernameValue = 'test';

        // $usernameValue = $value;
        $usernameValue = strval($value);
        // $usernameValue = "\"" . strval($value) . "\"";
    }

    // $usernameValue = 'test';



    $query = "DELETE FROM users WHERE username = ? ";



    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 's', $usernameValue);
    mysqli_stmt_execute($stmt);

    
?>


