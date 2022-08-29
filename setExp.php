<?php

    include('config.php');
    session_start();


    $expFromJS = ($_POST);

    foreach ($expFromJS as $key => $value) {
        $exp = $value;
    }


    $query = "UPDATE users SET exp = exp + ? WHERE username = '".$_SESSION['username']."' ";

    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 'i', $exp);
    mysqli_stmt_execute($stmt);

?>


<!-- 
// BlackJack + 250xp
    // DoubleWin + 100 + 50 xp
    // Win + 100xp
    // Push + 50xp
    // Lose + 20xp ?
    // Assurance --
    // Side bets -- -->
