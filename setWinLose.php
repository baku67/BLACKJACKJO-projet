<?php

    include('config.php');

    //  NE PAS OUBLIE SESSION START A CHAQUE PAGE 
    session_start();

    $valueFromJS = ($_POST);
    echo ('PhP Valeur gain passé du JS: ' . $valueFromJS);

    // *** fonction pour choper la value de l'array/objet passé du JS 
    foreach ($valueFromJS as $key => $value) {
        $value2 = $value;
        echo ('PhP Valeur gain passé du JS: ' . $value2);
    }


    if ($value2 == 1) :

        $query = "UPDATE users SET win = win + 1 WHERE username = '".$_SESSION['username']."' ";

    elseif ($value == -1) :

        $query = "UPDATE users SET lose = lose + 1 WHERE username = '".$_SESSION['username']."' ";

    endif;

    // if ($valueFromJS == 1) :

    //     $query = "UPDATE users SET win = win + 1 WHERE username = '".$_SESSION['username']."' ";

    // elseif ($valueFromJS == -1) :

    //     $query = "UPDATE users SET lose = lose + 1 WHERE username = '".$_SESSION['username']."' ";

    // endif;



    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 's', $value2);
    mysqli_stmt_execute($stmt);
?>