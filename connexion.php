<?php

include("config.php");

// Code pour empecher d'essayer de se co sur 'basilek.ovh' plutot que 'www.basilek.ovh'
// Empechait la première tentative de co (avant de rediriger vers l'url valide)
if ($_SERVER['HTTP_HOST'] == "basilek.ovh")
{
   $url = "http://www." . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
   header("Location: $url");
} 


//à mettre tout en haut du fichier .php, cette fonction propre à PHP servira à maintenir la $_SESSION
session_start();
//si le bouton "Connexion" est cliqué
if(isset($_POST['connexion'])){
    // on vérifie que le champ "Pseudo" n'est pas vide
    // empty vérifie à la fois si le champ est vide et si le champ existe belle et bien (is set)
    if(empty($_POST['username'])){
        echo "Le champ Pseudo est vide.";
    } else {
        // on vérifie maintenant si le champ "Mot de passe" n'est pas vide"
        if(empty($_POST['password'])){
            echo "Le champ Mot de passe est vide.";
        } else {
            // les champs pseudo & mdp sont bien postés et pas vides, on sécurise les données entrées par l'utilisateur
            //le htmlentities() passera les guillemets en entités HTML, ce qui empêchera en partie, les injections SQL
            $Pseudo = htmlentities($_POST['username'], ENT_QUOTES, "UTF-8"); 
            $MotDePasse = htmlentities($_POST['password'], ENT_QUOTES, "UTF-8");
            //$md5MotDePasse = md5($MotDePasse);

            //on se connecte à la base de données:
                $mysqli = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE); 

            //on vérifie que la connexion s'effectue correctement:
            if(!$mysqli){
                echo "Erreur de connexion à la base de données.";
                
            } else {
                //on fait maintenant la requête dans la base de données pour rechercher si ces données existent et correspondent:
                //si vous avez enregistré le mot de passe en md5() il vous faudra faire la vérification en mettant mdp = '".md5($MotDePasse)."' au lieu de mdp = '".$MotDePasse."'
                $Requete = mysqli_query($mysqli,"SELECT * FROM users WHERE username = '".$Pseudo."' AND password = '".md5($MotDePasse)."'");
                                
                //si il y a un résultat, mysqli_num_rows() nous donnera alors 1
                //si mysqli_num_rows() retourne 0 c'est qu'il a trouvé aucun résultat
                if(mysqli_num_rows($Requete) == 0) {
                    echo "Le pseudo ou le mot de passe est incorrect, le compte n'a pas été trouvé.";
                } else {
                    //on ouvre la session avec $_SESSION:
                    //la session peut être appelée différemment et son contenu aussi peut être autre chose que le pseudo
                    $_SESSION['username'] = $Pseudo;
                                        
                    // Redirection post connexion
                    header('Location: http://www.basilek.ovh/index.php');
                    exit;
                }
            }
        }
    }
}
if (isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION['username']);
    header("location: index.php");
}
?>

