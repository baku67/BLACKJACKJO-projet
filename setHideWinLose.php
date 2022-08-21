<?php

    include('config.php');

    //  NE PAS OUBLIE SESSION START A CHAQUE PAGE 
    session_start();

    $hideBool = ($_POST);

    foreach ($hideBool as $key => $value) {
        $bool = $value;
    }

    if ($bool == "true") {
        $bool = 1; 
    }
    else {
        $bool = 0;
    }

    $query = "UPDATE users SET hideWinLose = ? WHERE username = '".$_SESSION['username']."' ";

    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 'i', $bool);
    mysqli_stmt_execute($stmt);
?>