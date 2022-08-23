<?php

    include('config.php');
    session_start();


    // Requete get : Pour éviter SQL > 10

    $result = mysqli_query($db,"SELECT streak FROM users WHERE username = '".$_SESSION['username']."' ");

    while($row = mysqli_fetch_array($result)) {
      $streakBefore = $row['streak'];
    }



    // Requete post (set)
        $streakFromJS = ($_POST);

        foreach ($streakFromJS as $key => $value) {
            $streakModifier = $value;
            // +1 ou +(-2) ou +0 selon Win/Lose/Push
        }

        // Vérification que le streak BDD dépasse pas 10 lors +1
        if ($streakBefore + $streakModifier < 11) {
            $query = "UPDATE users SET streak = streak + ? WHERE username = '".$_SESSION['username']."' ";
        }
        else {
            $query = "UPDATE users SET streak = streak WHERE username = '".$_SESSION['username']."' ";
        }

        $stmt = mysqli_prepare($db, $query);
        mysqli_stmt_bind_param($stmt, 's', $streakModifier);
        mysqli_stmt_execute($stmt);
?>


