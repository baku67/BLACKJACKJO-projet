<?php

    include('config.php');

    //  NE PAS OUBLIE SESSION START A CHAQUE PAGE 
    session_start();

    $turboBool = ($_POST);

    // Transformer le turbobool(type?) en 0 ou 1 (smtp:i = integer) 

    // *** fonction pour choper la value de l'array/objet passé du JS 
    foreach ($turboBool as $key => $value) {
        // $bool = $value;
        $bool = $value;
        echo ('PhP Valeur bool passé du JS: ' . $bool);
     }


    $query = "UPDATE users SET toggleSpeed = ? WHERE username = '".$_SESSION['username']."' ";
    echo ($turboBool);

    // https://www.codegrepper.com/search.php?q=mysqli%20prepare%20for%20update%20records
    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 'i', $bool);
    mysqli_stmt_execute($stmt);

    // https://stackoverflow.com/questions/7537377/how-to-include-a-php-variable-inside-a-mysql-statement
    // $smt = $pdo->prepare($db, $query);
    // $smt->execute([$bool]);
?>