<?php

include("config.php");

// Code pour empecher d'essayer de se co sur 'basilek.ovh' plutot que 'www.basilek.ovh'
// Empechait la première tentative de co (avant de rediriger vers l'url valide)
if ($_SERVER['HTTP_HOST'] == "blackjackjo.com")
{
   $url = "https://www." . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
   header("Location: $url");
} 

// Date pour logs Connexion/Deconnexion
// date ok, heure à l'ouest /!\
$dateNow = gmdate('Y-m-d h:i:s \G\M\T\+\2');

//à mettre tout en haut du fichier .php, cette fonction propre à PHP servira à maintenir la $_SESSION
session_start();

//si le bouton "Connexion" est cliqué
if(isset($_POST['connexion'])){
    if(empty($_POST['username'])){
        echo "Le champ Pseudo est vide.";
    } else {
        if(empty($_POST['password'])){
            echo "Le champ Mot de passe est vide.";
        } else {
            // les champs pseudo & mdp sont bien postés et pas vides, on sécurise les données entrées par l'utilisateur
            //le htmlentities() passera les guillemets en entités HTML, ce qui empêchera en partie, les injections SQL
            //Mr DIEMER: utiliser mysqli_real_escape_string() car nom de famille peuvent avoir des guillemets (qui seraient traduis en ~&neds;)
            $Pseudo = htmlentities($_POST['username'], ENT_QUOTES, "UTF-8"); 
            $MotDePasse = htmlentities($_POST['password'], ENT_QUOTES, "UTF-8");


            $mysqli = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE); 

            if(!$mysqli){
                echo "Erreur de connexion à la base de données.";
                
            } else {

                $Requete = mysqli_query($mysqli,"SELECT * FROM users WHERE username = '".$Pseudo."' AND password = '".md5($MotDePasse)."'");
                                
                if(mysqli_num_rows($Requete) == 0) {
                    header('Location: https://www.blackjackjo.com/index.php');
                    echo "Le pseudo ou le mot de passe est incorrect, le compte n'a pas été trouvé.";
                } else {
                    //on ouvre la session avec $_SESSION:
                    //la session peut être appelée différemment et son contenu aussi peut être autre chose que le pseudo
                    $_SESSION['username'] = $Pseudo;

                    // Logs 'action'=Connexion
                    $action = 'Connexion';
                    $query = "INSERT INTO logs (username, action, date) VALUES (?, ?, ?)";
                    $stmt = mysqli_prepare($db, $query);
                    mysqli_stmt_bind_param($stmt, 'sss', $_SESSION['username'], $action, $dateNow);
                    mysqli_stmt_execute($stmt);
                    // Fin logs
                                        
                    // Redirection post connexion
                    header('Location: https://www.blackjackjo.com/index.php');
                    exit;
                }
            }
        }
    }
}
if (isset($_GET['logout'])) {

    // Logs 'action'=Connexion
    $action = 'Deconnexion';
    $query = "INSERT INTO logs (username, action, date) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 'sss', $_SESSION['username'], $action, $dateNow);
    mysqli_stmt_execute($stmt);
    // Fin logs

    session_destroy();
    unset($_SESSION['username']);
    header("location: index.php");
}
?>

