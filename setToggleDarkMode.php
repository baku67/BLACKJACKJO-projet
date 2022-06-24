<?php

    include('config.php');

    //  NE PAS OUBLIE SESSION START A CHAQUE PAGE 
    session_start();

    $darkModeBool = ($_POST);

    foreach ($darkModeBool as $key => $value) {
        $boolo = $value;
    }

    if ($boolo == "true") {
        $boolo = 1; 
    }
    else {
        $boolo = 0;
    }

    $query = "UPDATE users SET toggleDarkMode = ? WHERE username = '".$_SESSION['username']."' ";

    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 'i', $boolo);
    mysqli_stmt_execute($stmt);
?>