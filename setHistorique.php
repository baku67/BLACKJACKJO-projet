<?php

    include('config.php');
    //  NE PAS OUBLIE SESSION START A CHAQUE PAGE 
    session_start();



    $vArray = $_POST['vArray'];
    $username = ($_SESSION['username']);

    $WinLose = $vArray[0];
    $resultatCas = $vArray[1];
    $gain = $vArray[2];
    // Formater la date en YYYY-MM-DD hh:mm:ss pour SQL(DATETIME) https://bobbyhadz.com/blog/javascript-format-date-yyyy-mm-dd-hh-mm-ss
    // $date = $vArray[3];
    $date = '2222-02-22';


    $query = "INSERT INTO historique (username, winLose, resultatCas, gain, date) VALUES (?, ?, ?, ?, ?)";
    

    // https://www.codegrepper.com/search.php?q=mysqli%20prepare%20for%20update%20records
    // https://www.php.net/manual/en/mysqli-stmt.bind-param.php
    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 'sssis', $username, $WinLose, $resultatCas, $gain, $date);
    mysqli_stmt_execute($stmt);

?>


