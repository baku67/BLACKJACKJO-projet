<?php

    include('config.php');

    //  NE PAS OUBLIE SESSION START A CHAQUE PAGE 
    session_start();

    $gainFromJS = ($_POST);


    // *** fonction pour choper la value de l'array/objet passé du JS 
    foreach ($gainFromJS as $key => $value) {
        $gain = $value;
        echo ('PhP Valeur gain passé du JS: ' . $gain);
     }


    $query = "UPDATE users SET credits = credits + ? WHERE username = '".$_SESSION['username']."' ";

    // https://www.codegrepper.com/search.php?q=mysqli%20prepare%20for%20update%20records
    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 's', $gain);
    mysqli_stmt_execute($stmt);

    // https://stackoverflow.com/questions/7537377/how-to-include-a-php-variable-inside-a-mysql-statement
    // $smt = $pdo->prepare($db, $query);
    // $smt->execute([$gain]);
?>


