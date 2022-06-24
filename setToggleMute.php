<?php

    include('config.php');

    //  NE PAS OUBLIE SESSION START A CHAQUE PAGE 
    session_start();

    $muteBool = ($_POST);

    foreach ($muteBool as $key => $value) {
        $booloo = $value;
    }

    if ($booloo == "true") {
        $booloo = 1; 
    }
    else {
        $booloo = 0;
    }

    $query = "UPDATE users SET toggleMute = ? WHERE username = '".$_SESSION['username']."' ";

    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 'i', $booloo);
    mysqli_stmt_execute($stmt);
?>