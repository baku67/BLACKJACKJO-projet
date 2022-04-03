<?php

    include('config.php');
    session_start();

    $username = ($_POST);


    // *** fonction pour choper la value de l'array/objet passé du JS 
    foreach ($username as $key => $value) {
        $usernameValue = $value;
    }


    // $query = "DELETE FROM users WHERE username =  '".$usernameValue."' ";
    $query = "DELETE FROM users WHERE username =  ? ";
    
    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 's', $usernameValue);
    mysqli_stmt_execute($stmt);

?>


