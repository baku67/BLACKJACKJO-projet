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
		<meta name="description" content="Application de BlackJack en ligne">
		<meta name="author" content="Basile Kuntz">
		<meta name="keywords" content="Blackjack, Casino, Jeu">
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
		
		
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Bellota+Text:ital,wght@1,300&family=Courgette&family=Holtwood+One+SC&family=Kavoon&display=swap" rel="stylesheet">

		<?php 
			if (!isset($_SESSION['username'])) :
		?>
				<script> 
					isConnected = false; 
					console.log('estPasConnecté');
				</script>

		<?php
			else :
		?>
				<script> isConnected = true; console.log('estConnecté');</script>
				<!-- Méthode Ajax XMLHttpRequest (js/php) -->
				<!-- <script type="text/javascript" src="scriptJouerPhp.js"></script> -->
				<script type="text/javascript">
					var creditsConnected = <?php include('getCredits.php'); ?>; // Don't forget the extra semicolon!
					console.log('var js creditConnected: ' + creditsConnected);
				</script>
		<?php
			endif;
		?>


	</head>

	
	

	<body>

		<div class="containerMaster">


			<header id="header">
				<h1 id="title" style="font-family: 'Kavoon', cursive">BlackJack Jo'</h1>
				<div id="traitTitleSlide"></div>
				<br/>
				<div>
					<ul id="onglets">
						<li class="onglet"><button id="guide">Guide</button></li>
						<li class="onglet" ><a href="index.php" id="jouer">JOUER !</a></li>
						<li class="onglet"><button id="historique">Historique</button></li>
					</ul>
				</div>
			</header>



			

			<!-- BOUTONS Connection/Inscription -->
			<div id="connectionContainer">

				<!-- Bouton Connexion/Inscription (désactivé si connecté) -->
				<?php  if (!isset($_SESSION['username'])) : ?>

					<!-- Test script -->
					<!-- Fin test -->

					<!-- Anciennement "Se connecter / S'inscrire"-->
					<button id="connectionButton" class="connectionButtons" onclick="document.getElementById('connectionModal').style.display='block'">Connexion</button>
					<p class="connectionButtons">&nbsp;|&nbsp;</p>
					<button id="inscriptionButton" class="connectionButtons" onclick="document.getElementById('inscriptionModal').style.display='block'">Inscription</button>
				<?php endif ?>
				<!-- Fin -->

				<!-- Affichage User courant et bouton déconnexion (à la place des boutons connection/inscription)  -->
				<?php  if (isset($_SESSION['username'])) : ?>

					<!-- Test script -->
					<!-- Fin test -->


					<p style="position:relative; left:29px; bottom:1.1em; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size:1.2em; color:rgba(223, 204, 204, 0.9);">
						
						<strong style="font-size:1.4em; text-shadow:0 0 3px rgb(43 39 39);">
							<span style="color:rgba(255,237,144,1);">&#9733;</span>
							<?php 
								echo $_SESSION['username']; 
							?>
							<span style="color:rgba(255,237,144,1);">&#9733;</span>
						</strong>

						&nbsp;&nbsp;&nbsp;
						
						<span style="font-size:1.7em;">|</span>
						
						&nbsp;&nbsp;

						<!-- <span style="font-family: 'Bellota',cursive; font-size:1.3em; color:rgba(203,202,192,1); font-weight:700;" >Crédits:</span> -->
						<span style="font-family: 'Bellota',cursive; font-size:1.3em; color:rgba(203,202,192,1); font-weight:700;" ></span>

						&nbsp; 
						
						<span style="color: rgb(241 205 92 / 95%) !important; text-shadow: 0 0 4px rgb(255 213 2); font-family: 'Holtwood One SC', serif;" id="creditsConnected"></span>
						
						<span>
							<img src="Images/souBarre.png" alt="pièce" class="imageSouPetit">
						</span>
		
					</p>

					<!-- Déconnexion -->
					<p>
						<a href="index.php?logout='1'" id="deconnexionLink" style="">
							
							<img src="Images/deconnexion.png" alt="deconnexion" id="deconnexionImg" style="">
						</a>
            		</p>

				<?php endif ?>
				<!-- Fin -->


			</div>
			<!-- FIN BOUTONS -->


			<!-- MODALS Connection/Inscription -->
			<div id="connectionModal" class="w3-modal">
				<div class="w3-modal-content w3-animate-zoom">
					<div>
						<span onclick="document.getElementById('connectionModal').style.display='none'" class="w3-button w3-display-topright">&times;</span>
						<header class="modalHeader">
							<h2 style="text-align: center; font-family:Segoe UI,Arial,sans-serif; font-weight:400; color:rgb(223, 204, 204)">Connexion</h2>
						</header>
						<br>

						<!-- NOUVEAU FORM -->
						<form class="w3-container" action="connexion.php" method="post">
							<label><b>Identifiant</b></label>
									<input class="w3-input w3-border w3-margin-bottom fixBoxSizing" type="text" placeholder="Entrer votre identifiant" name="username" required>
							<br />
							<label><b>Mot de passe</b></label>
									<input class="w3-input w3-border fixBoxSizing" type="password" placeholder="Entrer votre mot de passe" name="password" required>
							<br />
							<!-- <input type="submit" name="connexion" value="Connexion" /> -->
							<button class="w3-button w3-block w3-blue w3-section w3-padding" type="submit" name="connexion" value="Connexion">Se connecter</button>
							<input class="w3-check w3-margin-top" type="checkbox" checked="checked"> Se souvenir de moi
						</form>
						<!-- FIN NOUVEAU FORM -->


						<div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
							<button onclick="document.getElementById('connectionModal').style.display='none'" type="button" class="w3-button w3-red">Annuler</button>
							<span class="w3-right w3-padding w3-hide-small"><a href="#">mot de passe</a> oublié?</span>
						</div>
						<!-- FIN FORM -->

					</div>
				</div>	
			</div>
			
			<div id="inscriptionModal" class="w3-modal">
				<div class="w3-modal-content w3-animate-zoom">
					<div">
						<span onclick="document.getElementById('inscriptionModal').style.display='none'" class="w3-button w3-display-topright">&times;</span>
						<header class="modalHeader">
							<h2 style="text-align: center; font-family:Segoe UI,Arial,sans-serif; font-weight:400; color:rgb(223, 204, 204)">Inscription</h2>
						</header>
						<br>

						<!-- NOUVEAU FORM -->
						<form class="w3-container" action="inscription.php" method="post">
							<div class="w3-section">
								<label><b>E-mail</b></label>
									<input class="w3-input w3-border fixBoxSizing w3-margin-bottom" type="" placeholder="Entrez votre adresse mail" name="mail" required>
								<label><b>Identifiant</b></label>
									<input class="w3-input w3-border w3-margin-bottom fixBoxSizing" type="text" placeholder="Entrer un identifiant" name="username" required>
								<label><b>Mot de passe</b></label>
									<input class="w3-input w3-border fixBoxSizing w3-margin-bottom" type="password" placeholder="Entrer un mot de passe" name="password" required>
								<label><b>Confirmer le mot de passe</b></label>
									<input class="w3-input w3-border fixBoxSizing" type="password" placeholder="Réécrivez le mot de passe" name="password2" required>
								<button class="w3-button w3-block w3-blue w3-section w3-padding" type="submit" value="S'inscrire">S'inscrire</button>
								<input class="w3-check w3-margin-top" type="checkbox"> J'accepte les termes et conditions d'utilisation
							</div>
						</form>
						<!-- FIN NOUVEAU FORM -->


						<div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
							<button onclick="document.getElementById('inscriptionModal').style.display='none'" type="button" class="w3-button w3-red">Annuler</button>
						</div>
						<!-- FIN FORM -->
					</div>
				</div>
			</div>
			<!-- FIN MODALS -->
			
			
			
			<div id="container1">

				<!-- Bouton "Nouvelle Partie" -->
				<?php  
					if (!isset($_SESSION['username'])) : 
				?>
							<div id="newGame" class="module-border-wrap">
								<a href="#" style="text-decoration: none;">Partie rapide !</a>
							</div>
				<?php 
					elseif (isset($_SESSION['username'])) : 
				?>
							<div id="newGame" class="module-border-wrap">
								<a href="#" style="text-decoration: none;">Nouvelle Partie !</a>
							</div>
				<?php 
					endif 
				?>
				<!-- Fin -->



				<!-- Ratio (WIP voir Shedule: header, position, responsive+) -->
				<?php
				if (isset($_SESSION['username'])) : 
				?>
					<div id='ratioDiv'>
						<h3 style="font-size:1.3em;">Ratio</h3>
						<div class="divider light" style="position:relative; bottom:16px; width:100%; -webkit-linear-gradient(left, rgb(90,90,90) 0%, rgba(255,255,255,1) 50%, rgb(90,90,90) 100%)"></div>
						<?php include('getRatio.php') ?>
					</div>
				<?php
				else :
				?>
					<div id='ratioDiv'>
						<h3 style="font-size:1.3em;">Ratio</h3>
						<div id="traitBlancRatio"></div>
						<p id='ratioLine'>-- %</p>
					</div>
				<?php
				endif
				?>
				<!-- Fin Ratio -->



				<!-- Classement (WIP voir Shedule: header, position, responsive+) -->
				
				<div id="classementDiv">

					<h3 id="classementTitle" style="font-size:1.3em; color:rgb(223, 204, 204);">Classement</h3>

					<div id="traitBlancClassement"></div>

					<div class="topLineDiv">

						<p>
							<span style="color: rgb(241 205 92 / 95%) !important">&#9733;</span>
							Top 1: &nbsp;&nbsp; 
						</p>

						<?php include('getHighScoreName.php'); ?>

						&nbsp;		
						<p style="color: #a09f39"> _ </p>
						&nbsp;

						<?php include('getHighScore.php'); ?>
						
						<img src="Images/souBlancBarre.png" alt="pièce" class="imageSouPetit" style="top:-9px !important">

					</div>

					<br>

					<div class="topLineDiv">

						<p>
							<span style="color: silver !important">&#9733;</span>
							Top 2: &nbsp;&nbsp; 
						</p>

						<?php include('getHighScore2Name.php'); ?>

						&nbsp;		
						<p style="color: #a09f39"> _ </p>
						&nbsp;

						<?php include('getHighScore2.php'); ?>
						
						<img src="Images/souBlancBarre.png" alt="pièce" class="imageSouPetit" style="top:-9px !important">

					</div>

					<br>

					<div class="topLineDiv">

						<p>
							<span style="color: #ba6555 !important">&#9733;</span>
							Top 3: &nbsp;&nbsp; 
						</p>

						<?php include('getHighScore3Name.php'); ?>

						&nbsp;		
						<p style="color: #a09f39"> _ </p>
						&nbsp;

						<?php include('getHighScore3.php'); ?>
						
						<img src="Images/souBlancBarre.png" alt="pièce" class="imageSouPetit" style="top:-9px !important">

					</div>

				</div>
				<!-- fin Classement -->

			</div>

			

			<div id="footer">
				
				<div style="display:inline-flex;">
					<h3 id="footerTitle">  Comment jouer ...  </h3>
					<button type="button" id="collapsible"><img src="Images/arrowDownWhitePng.png" id="arrowPng" style="height:0.8em;"></button>
				</div>


				<div id="collapseContent" style="display: none;">

					<div id="traitLumineuxFooter" class="divider light"></div>
					<!-- <div id="traitBlanc"></div> -->


					<break></break>
			

					<div id="container3">
						<div id="scoreContainer">
							<!-- <h2 class="scoreElem" style="margin-block-end: 0em;">High-Low</h2>
							<br>
							<h3 id="scoreHighLow">score</h3>
							<p class="scoreElem"><span id="scoreVar">0</span></p> -->
						</div>
					</div>

				</div>
		
			</div>
		</div>

    </body>

</html>
