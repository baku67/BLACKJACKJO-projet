<?php

    include('config.php');
    //  NE PAS OUBLIE SESSION START A CHAQUE PAGE 
    session_start();



    $vArray = $_POST['vArray'];
    $username = ($_SESSION['username']);

    $WinLose = $vArray[0];
    $resultatCas = $vArray[1];
    $gain = $vArray[2];
    $scoreJoueur = $vArray[3];
    $scoreCroupier = $vArray[4];
    $doubleBool = $vArray[5];
    // Formater la date en YYYY-MM-DD hh:mm:ss pour SQL(DATETIME) https://bobbyhadz.com/blog/javascript-format-date-yyyy-mm-dd-hh-mm-ss
    $date = $vArray[6];

    $gainPairBet = $vArray[7];
    $gain213Bet = $vArray[8];

    $mise = $vArray[9];
    $misePairBet = $vArray[10];
    $mise213Bet = $vArray[11];

    $PairBet = $vArray[12];
    $bet213 = $vArray[13];

    $mainJoueur = implode(",", $vArray[14]);
    $mainCroupier = implode(",", $vArray[15]);


    $query = "INSERT INTO historique (username, winLose, resultatCas, gain, scoreJoueur, scoreCroupier, doubleBool, date, gainPairBet, gain213Bet, pairBet, bet213, misePairBet, mise213Bet, mise, mainJoueur, mainCroupier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
   

    // https://www.codegrepper.com/search.php?q=mysqli%20prepare%20for%20update%20records
    // https://www.php.net/manual/en/mysqli-stmt.bind-param.php

    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 'sssiiiisiissiiiss', $username, $WinLose, $resultatCas, $gain, $scoreJoueur, $scoreCroupier, $doubleBool, $date, $gainPairBet, $gain213Bet, $PairBet, $bet213, $misePairBet, $mise213Bet, $mise, $mainJoueur, $mainCroupier);
    mysqli_stmt_execute($stmt);

?>


