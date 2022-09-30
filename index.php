<!DOCTYPE html>

<?php
	include('connexion.php');
?>


<html lang="fr">
	<head>
		<title id="title">BlackJack Jo'</title>
		<link rel="icon" href="Images/favicon3.png">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" type="text/javascript"></script>
		<meta charset="UTF-8">
		<meta name="theme-color" content="rgba(17, 19, 31, 0.8)">
		<meta name="description" content="BlackJack en ligne sans argent réel">
		<meta name="author" content="Basile Kuntz">
		<meta name="keywords" content="blackjack, casino, jeu, gratuit, cartes, croupier, carte">
		<link rel="stylesheet" href="Styles/style.css" id="stylesheet_1">
		<link rel="stylesheet" href="Styles/MediaQueries1.css" id="stylesheet_3">
		<link rel="stylesheet" href="Styles/MediaQueries2.css" id="stylesheet_4">
		<link rel="stylesheet" href="Styles/MediaQueries3.css" id="stylesheet_5">
		<link rel="stylesheet" href="Styles/styleW3.css" id="stylesheet_2">
		<script type="text/javascript" src="scriptJouer.js"></script>
		<script type="text/javascript" src="deck.js"></script>
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Bellota:ital,wght@1,300;1,700&display=swap" rel="stylesheet">		
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		
		<!-- <script src="dist/long-press.min.js"></script> -->
		<script src="https://kit.fontawesome.com/698848973e.js" crossorigin="anonymous"></script>
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Bellota+Text:ital,wght@1,300&family=Courgette&family=Holtwood+One+SC&family=Kavoon&display=swap" rel="stylesheet">
		<?php 
			if (!isset($_SESSION['username'])) :  
		?>
				<script> 
					isConnected = false; 
					console.log('estPasConnecté');  
					var toggleSpeed = false;

				</script>

		<?php
			else :
		?>
				<script> isConnected = true; console.log('estConnecté');</script>  

				<script type="text/javascript">

					// Get.php des données User
					var creditsConnected = <?php include('getCredits.php'); ?>; // Don't forget the extra semicolon!
					console.log('getCredits.php: ' + creditsConnected);  
					
					var toggleSpeed = <?php include('getToggleTurbo.php'); ?>; // Don't forget the extra semicolon!
					console.log('getToggleTurbo.php: ' + toggleSpeed);

					var toggleDMfromPhp = <?php include('getToggleDarkMode.php'); ?>; // Don't forget the extra semicolon!
					console.log('getToggleDarkMode.php: ' + toggleDMfromPhp);

					var toggleMutefromPhp = <?php include('getToggleMute.php'); ?>; // Don't forget the extra semicolon!
					console.log('getToggleMute.php: ' + toggleMutefromPhp);

				</script>
		<?php
			endif;
		?>

		<script>
			var username="<?php echo $_SESSION['username']; ?>";
		</script>



		
		
	</head>



	<body id="body2">


		<!-- Ce script doit rester dans body2 (pas dans head) -->
		<script>
			var x = window.matchMedia("(min-width: 800px)");

			const iframe = document.createElement("iframe");
			iframe.setAttribute("id", "iframePC");
			iframe.setAttribute("src", "index2.php")
			// document.getElementById("body2").append(iframe);

			if (x.matches) {
				document.getElementById("body2").append(iframe);
			}
			else {
				alert("mobile (<800px width)");
				$("#body2").load("index2.php");
			}
			
		</script>
		<!-- <iframe id="iframePC" src="index2.php"></iframe> -->



	</body>
	

	

</html>
