<?php

    include('config.php');

    session_start();

    $misesFromJS = ($_POST);


    foreach ($misesFromJS as $key => $value) {
        $mises = $value;
    }

    $query = "UPDATE users SET credits = credits - ? WHERE username = '".$_SESSION['username']."' ";

    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 's', $mises);
    mysqli_stmt_execute($stmt);
?>


