<!DOCTYPE html>

<?php
	include('connexion.php')
?>


<html lang="fr">
	<head>
		<title id="title">BlackJack Jo'</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="styleJouer.css" id="stylesheet_1">
		<link rel="stylesheet" href="styleW3.css" id="stylesheet_2">
		<script type="text/javascript" src="scriptJouer.js"></script>
		<link rel="icon" href="Images/favicon.png">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<meta name="description" content="BlackJackJo est un site d'entraînement au jeu de carte Blakjack. Le site est codé dans le cadre d'un projet étudiant de développement web et est régulièrement mis à jour.">
	
		<!--  Changer la valeur du boolean isConnected -->

		<?php 
			if (!isset($_SESSION['username'])) :
		?>
				<script> isConnected = false; console.log('estPasConnecté');</script>

		<?php
			else :
		?>
				<script> isConnected = true; console.log('estConnecté');</script>
		<?php
			endif;
		?>


	</head>

	
	

	<body>

		<div class="containerMaster">


			<header id="header">
				<h1 id="title">BlackJack Jo'</h1>
				<div id="traitTitleSlide"></div>
				<br/>
				<div>
					<ul id="onglets">
						<li class="onglet"><a href="guide.html" id="Hi-Lo">Guide</a></li>
						<li class="onglet" ><a href="index.php" id="jouer">JOUER !</a></li>
						<li class="onglet"><a href="scores.html" id="Compteur">Scores</a></li>
					</ul>
				</div>
			</header>



			

			<!-- BOUTONS Connection/Inscription -->
			<div id="connectionContainer">

				<!-- Bouton Connexion/Inscription (désactivé si connecté) -->
				<?php  if (!isset($_SESSION['username'])) : ?>

					<!-- Test script -->
					<!-- Fin test -->

					<button id="connectionButton" class="connectionButtons" onclick="document.getElementById('connectionModal').style.display='block'">Se connecter</button>
					<p class="connectionButtons">&nbsp;|&nbsp;</p>
					<button id="inscriptionButton" class="connectionButtons" onclick="document.getElementById('inscriptionModal').style.display='block'">S'inscrire</button>
				<?php endif ?>
				<!-- Fin -->

				<!-- Affichage User courant et bouton déconnexion (à la place des boutons connection/inscription)  -->
				<?php  if (isset($_SESSION['username'])) : ?>

					<!-- Test script -->
					<!-- Fin test -->


					<p style="position:relative; bottom: 0.6em; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size:1.2em; color:rgba(223, 204, 204, 0.8);">
						<strong style="font-size:1.4em; text-shadow:0 0 3px rgb(43 39 39);">

							<span>&#9733;</span>
							<?php 
								echo $_SESSION['username']; 
							?>
							<span>&#9733;</span>

						</strong>

						&nbsp;&nbsp;<span style="font-size:1.7em;">|</span>&nbsp;&nbsp;

						Crédits:&nbsp; <span style="color: rgb(241 205 92 / 95%) !important; text-shadow: 0 0 4px rgb(255 213 2)" id="creditsConnected"> 00, -</span>
						<strong style="color: rgb(241 205 92 / 95%) !important">
							<?php echo $_SESSION['credit']; ?>
							
						</strong>
					</p>

					<p>
						<a href="index.php?logout='1'" id="deconnexionLink" style="">
							<!-- Déconnexion -->
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


						<!-- Ancien form -->
						<!-- <form class="w3-container" action="" method="post">
							<div class="w3-section">
								<label><b>Identifiant</b></label>
									<input class="w3-input w3-border w3-margin-bottom fixBoxSizing" type="text" placeholder="Entrer votre identifiant" name="username" required>
								<label><b>Mot de passe</b></label>
									<input class="w3-input w3-border fixBoxSizing" type="password" placeholder="Entrer votre mot de passe" name="password" required>
								<button class="w3-button w3-block w3-blue w3-section w3-padding" type="submit">Se connecter</button>
								<input class="w3-check w3-margin-top" type="checkbox" checked="checked"> Se souvenir de moi
							</div>
						</form> -->
						<!-- Fin ancien form -->


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


						<!-- Ancien form -->
						<!-- <form class="w3-container" action="" method="post">
							<div class="w3-section">
								<label><b>E-mail</b></label>
									<input class="w3-input w3-border fixBoxSizing w3-margin-bottom" type="password" placeholder="Entrez votre adresse mail" name="mail" required>
								<label><b>Identifiant</b></label>
									<input class="w3-input w3-border w3-margin-bottom fixBoxSizing" type="text" placeholder="Entrer un identifiant" name="username" required>
								<label><b>Mot de passe</b></label>
									<input class="w3-input w3-border fixBoxSizing w3-margin-bottom" type="password" placeholder="Entrer un mot de passe" name="password" required>
								<label><b>Confirmer le mot de passe</b></label>
									<input class="w3-input w3-border fixBoxSizing" type="password" placeholder="Réécrivez le mot de passe" name="password2" required>
								<button class="w3-button w3-block w3-blue w3-section w3-padding" type="submit">S'inscrire</button>
								<input class="w3-check w3-margin-top" type="checkbox"> J'accepte les termes et conditions d'utilisation
							</div>
						</form> -->
						<!-- Fin ancien form -->



						<div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
							<button onclick="document.getElementById('inscriptionModal').style.display='none'" type="button" class="w3-button w3-red">Annuler</button>
						</div>
						<!-- FIN FORM -->
					</div>
				</div>
			</div>
			<!-- FIN MODALS -->
			
			
			
			<div id="container1">
				<!-- Bouton "Nouvelle Partie" si invité -->
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
			</div>

			

			<div id="footer">
				
				<div style="display:inline-flex;">
					<h3 id="footerTitle" style="letter-spacing: 1px;">  Comment jouer ...  </h3>
					<button type="button" id="collapsible"><img src="Images/arrowDownWhitePng.png" id="arrowPng" style="height:1em;"></button>
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
