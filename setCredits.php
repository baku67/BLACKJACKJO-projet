<?php

    include('config.php');

    session_start();


    $gainFromJS = ($_POST);

    foreach ($gainFromJS as $key => $value) {
        $gain = $value;
    }

    $query = "UPDATE users SET credits = credits + ? WHERE username = '".$_SESSION['username']."' ";

    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 's', $gain);
    mysqli_stmt_execute($stmt);
?>


