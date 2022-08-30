<?php

    $dateLastCo = date('Y-m-d');

    $query = "UPDATE users SET dateLastCo = ? WHERE username = '".$_SESSION['username']."' ";

    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 's', $dateLastCo);
    mysqli_stmt_execute($stmt);
?>