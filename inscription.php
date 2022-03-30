<?php
    include("config.php");

    //on se connecte à la base de données:
    $mysqli = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE); 
    if(!$mysqli) {
        echo "Erreur de connexion à la base de données.";
        exit;
    }



    //traitement du formulaire:
    if(isset($_POST['username'],$_POST['password'])){
        //l'utilisateur à cliqué sur "S'inscrire", on demande donc si les champs sont défini avec "isset"
        if(empty($_POST['username'])){
            //le champ pseudo est vide, on arrête l'exécution du script et on affiche un message d'erreur
            echo "Le champ Identifiant est vide.";
        } elseif(!preg_match("#^[a-z0-9]+$#",$_POST['username'])){//le champ pseudo est renseigné mais ne convient pas au format qu'on souhaite qu'il soit, soit: que des lettres minuscule + des chiffres (je préfère personnellement enregistrer le pseudo de mes membres en minuscule afin de ne pas avoir deux pseudo identique mais différents comme par exemple: Admin et admin)
            echo "L'identifiant doit être renseigné en lettres minuscules sans accents, sans caractères spéciaux.";
        } elseif(strlen($_POST['username'])>25){//le pseudo est trop long, il dépasse 25 caractères
            echo "L'identifiant ne doit pas dépasser les 25 caractères.";
        } elseif(empty($_POST['password'])){//le champ mot de passe est vide
            echo "Le champ Mot de passe est vide.";
        } elseif(mysqli_num_rows(mysqli_query($mysqli,"SELECT * FROM users WHERE username='".$_POST['username']."'"))==1){//on vérifie que ce pseudo n'est pas déjà utilisé par un autre membre
            echo "Cet identifiant est déjà utilisé.";
        } else {
            //toutes les vérifications sont faites, on passe à l'enregistrement dans la base de données:
            if(!mysqli_query($mysqli,"INSERT INTO users SET username='".$_POST['username']."', password='".md5($_POST['password'])."'")){//on crypte le mot de passe avec la fonction propre à PHP: md5()
                echo "Une erreur s'est produite: ".mysqli_error($mysqli);
            } else {
                // mettre en place une connection direct au compte apres creation ici (puis index.php)
                //header('location: index.php');
                echo "Inscription réussie !";
            }

            // Logs 'action'=Inscription
            $dateNow = gmdate('Y-m-d h:i:s \G\M\T\+\2');
            $action = 'Inscription';
            $query = "INSERT INTO logs (username, action, date) VALUES (?, ?, ?)";
            $stmt = mysqli_prepare($db, $query);
            mysqli_stmt_bind_param($stmt, 'sss', $_POST['username'], $action, $dateNow);
            mysqli_stmt_execute($stmt);
            // Fin logs
        }
    }


?>