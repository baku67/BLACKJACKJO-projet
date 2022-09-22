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

	
	

	<body id="body" data-theme="dark">

		<!-- Zone de var Php non confidentiel, non affiché -->
		<div id="dailyRewardBool" style="position:absolute; opacity:0; width:0; height:0; font-size:0px;"><?php include("getDailyProcBool.php");?></div>
		<!-- Fin -->

		<!-- Modal dailyReward -->
		<div id="dailyRewardDiv" style="display:none; opacity:0; position:absolute; left:100%; border-radius:10px; box-shadow: 0px 9px 0px rgba(0, 0, 0, 0.9); width:54%; height:9%; padding:2% 4% 4% 4%; font-weight:400; top:50%; left:50%; transform:translate(-50%, -50%); z-index:2; background-color:rgba(239, 59, 46, 1); text-align:center; font-size:1.9em; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; color:rgb(17 19 31); border:3px solid black;">Daily Reward: <br><p id="amountDailyReward" style="position:relative; top:50%; transform:translateY(-50%); padding:17px 20px; width:40%; text-align:center; margin:auto; border-radius:7px; border:3px solid rgb(42 37 37 / 80%); background-color:rgb(215 47 35); box-shadow:rgb(0 0 0 / 90%);"><i class="fa-solid fa-meteor fa-beat" style="position:fixed; left:10%; bottom:13%; color:#11131f; font-size:1.7em; opacity:0.9;"></i> +100</p></div>
		
		<!-- Modal confirmation leave Game -->
		<div id="modalLeave" style="display:none; opacity:0; position:absolute; left:100%; border-radius:10px; box-shadow: 0px 9px 0px rgba(0, 0, 0, 0.9); width:54%; height:15%; padding:2% 4% 4% 4%; font-weight:400; top:50%; left:50%; transform:translate(-50%, -50%); z-index:2; background-color:rgba(239, 59, 46, 1); text-align:center; font-size:1.9em; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; color:rgb(17 19 31); border:3px solid black;">Si vous quittez la partie maintenant, vos mises seront perdues. Continuer ?<br><br><div style="display:inline;"><button id="confirm">Oui</button><button id="cancel">Annuler</button></div></div>

		<!-- Fin -->


		<div class="containerMaster">


			<header id="header">
				<h1 id="title2" style="font-family: 'Kavoon', cursive">BlackJack Jo'</h1>  
				<!-- <p id="received-message">ici<p> -->
				<div id="traitTitleSlide"></div>
				<br/>
				<div>
					<ul id="onglets" class="indexFadeInOnglets1">
						<li class="onglet"><button id="guide">Guide</button></li>
						<li class="onglet" ><a id="jouer" href="index.php" >JOUER !</a></li>
						<?php  if (!isset($_SESSION['username'])) : ?>
							<li class="onglet"><button id="historique">Historique</button></li>
						<?php  elseif (isset($_SESSION['username'])) : ?>
							<li class="onglet"><button id="historique">Compte</button></li>
						<?php endif ?>
					</ul>
				</div>
			</header>



			

			<!-- BOUTONS Connection/Inscription -->
			<div id="connectionContainer" class="indexFadeInConnexion2">

				<!-- Bouton Connexion/Inscription (désactivé si connecté) -->
				<?php  if (!isset($_SESSION['username'])) : ?>

					<!-- Test script -->
					<!-- Fin test -->

					<!-- Anciennement "Se connecter / S'inscrire"-->
					<button id="connectionButton" class="connectionButtons">Connexion</button>
					<p class="connectionButtons">&nbsp;|&nbsp;</p>
					<button id="inscriptionButton" class="connectionButtons">Inscription</button>
				<?php endif ?>
				<!-- Fin -->

				<!-- Affichage User courant et bouton déconnexion (à la place des boutons connection/inscription)  -->
				<?php  if (isset($_SESSION['username'])) : ?>

					<!-- Test script -->
					<!-- Fin test -->


					<p style="position:relative; left:29px; bottom:0.95em; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size:1.2em; color:rgba(223, 204, 204, 0.9);">

					
						<strong style="font-size:1.4em; text-shadow:0 0 3px rgb(43 39 39);"><span style="color:rgba(238,182,50,1); font-size:1.5em; position:relative; top:2px; left:16px;"><i class="fa-solid fa-star"></i><span id="lvlText"><?php include('getLevel.php'); ?></span></span><span style="text-decoration:underline 4px rgba(238,182,50,1); position:relative; bottom:2px; left:7px;"><?php echo ucfirst($_SESSION['username']);?></span></strong>

						&nbsp;&nbsp;&nbsp;

						<span id="traitSeparateurConnecte">|</span>

						&nbsp;&nbsp;

						<!-- <span style="font-family: 'Bellota',cursive; font-size:1.3em; color:rgba(203,202,192,1); font-weight:700;" >Crédits:</span> -->
						<span style="font-family: 'Bellota',cursive; font-size:1.3em; color:rgba(203,202,192,1); font-weight:700;" ></span>

						&nbsp; 

						<span id="creditsConnected"></span>

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






			<!-- WIP jauge -->

				
			
				<?php  if (isset($_SESSION['username'])) : ?>

					<div id="jaugeContainerMaster" class="indexFadeInJauge" style="display: inline; margin: 0px auto;">
						<img id="imgStreak" class="indexFadeInImgStreak" src="" alt="Streak">
						<p id="streakNumber"><?php include('getStreak.php') ?></p>	
						<div id="jaugeContainer" class="jaugeContainer jaugeProgress">
							<span id="dataProgress" data-progress=""></span>
						</div>
					</div>

				<?php elseif (!isset($_SESSION['username'])) : ?>

					<div id="jaugeContainerMaster" class="indexFadeInJauge" style="display: inline; margin: 0px auto;">
						<img id="imgStreak" class="indexFadeInImgStreak" src="" alt="Streak">
						<p id="streakNumber">0</p>	
						<div id="jaugeContainer" class="jaugeContainer jaugeProgress" style="bottom:-13px;">
							<span id="dataProgress" data-progress="0"></span>
						</div>
					</div>

				<?php endif ?>

				<script type="text/javascript">
					if (isConnected == true) {
						let streakFromPhp = '<?php include('getStreak.php'); ?>';
						let streakPourcentage = (streakFromPhp*10).toString();

						document.getElementById('dataProgress').setAttribute("data-progress", streakPourcentage);
					}
				</script>
			
			<!-- Fin WIP jauge -->









			<!-- MODALS Connection/Inscription -->
			<div id="connectionModal" class="w3-modal">
				<div class="w3-modal-content w3-animate-zoom">
					<div class="modalContour">
						<span id="closeConnectionModal" class="w3-button w3-display-topright">&times;</span>
						<header class="modalHeader">
							<h2 class="modalHeaderText">Connexion</h2>
						</header>
						<br>

						<!-- NOUVEAU FORM -->
						<form class="w3-container" action="connexion.php" method="post">
							<label><b class="modalText">Identifiant</b></label>
									<input class="inputModal" type="text" placeholder="Entrer votre identifiant" name="username" required>
							<br />
							<label><b class="modalText">Mot de passe</b></label>
									<input class="inputModal" type="password" placeholder="Entrer votre mot de passe" name="password" required>
							<br />
							<!-- <input type="submit" name="connexion" value="Connexion" /> -->
							<button class="w3-button w3-block w3-blue w3-section w3-padding" type="submit" name="connexion" value="Connexion">Se connecter</button>
						</form>
						<!-- FIN NOUVEAU FORM -->


						<div class="w3-container w3-padding-16 w3-light-grey">
							<button id="closeConnectionModal2" type="button" class="w3-button w3-red">Annuler</button>
							<span class="w3-right w3-padding w3-hide-small"><a href="#">mot de passe</a> oublié?</span>
						</div>
						<!-- FIN FORM -->

					</div>
				</div>	
			</div>
			
			<div id="inscriptionModal" class="w3-modal">
				<div class="w3-modal-content w3-animate-zoom">
					<div class="modalContour">
						<span id="closeInscriptionModal" class="w3-button w3-display-topright">&times;</span>
						<header class="modalHeader">
							<h2 class="modalHeaderText">Inscription</h2>
						</header>
						<br>

						<!-- NOUVEAU FORM -->
						<form class="w3-container" action="inscription.php" method="post">
							<div class="w3-section">
								<label><b class="modalText">E-mail</b></label>
									<input class="w3-input w3-border fixBoxSizing w3-margin-bottom" type="" placeholder="Entrez votre adresse mail" name="mail" required>
								<label><b class="modalText">Identifiant</b></label>
									<input class="w3-input w3-border w3-margin-bottom fixBoxSizing" type="text" placeholder="Entrer un identifiant" name="username" required>
								<label><b class="modalText">Mot de passe</b></label>
									<input class="w3-input w3-border fixBoxSizing w3-margin-bottom" type="password" placeholder="Entrer un mot de passe" name="password" required>
								<label><b class="modalText">Confirmer le mot de passe</b></label>
									<input class="w3-input w3-border fixBoxSizing" type="password" placeholder="Réécrivez le mot de passe" name="password2" required>
								<button class="w3-button w3-block w3-blue w3-section w3-padding" type="submit" value="S'inscrire">S'inscrire</button>
								<!-- <input class="w3-check w3-margin-top" type="checkbox"> J'accepte les termes et conditions d'utilisation -->
							</div>
						</form>
						<!-- FIN NOUVEAU FORM -->


						<div class="w3-container w3-padding-16 w3-light-grey">
							<button id="closeInscriptionModal2" type="button" class="w3-button w3-red">Annuler</button>
						</div>
						<!-- FIN FORM -->
					</div>
				</div>
			</div>
			<!-- FIN MODALS -->
			
			
			
			<div id="container1" class="indexFadeInCentre3">

				<!-- Bouton "Nouvelle Partie" -->
				<?php  
					if (!isset($_SESSION['username'])) : 
				?>
						<button id="newGame" class="module-border-wrap">
							<a id="newGameLink" href="#" style="text-decoration: none;">Partie rapide !</a>
						</button>
				<?php 
					elseif (isset($_SESSION['username'])) : 
				?>
						<button id="newGame" class="module-border-wrap">
							<a id="newGameLink" href="#" style="text-decoration: none;">Nouvelle Partie !</a>
						</button>
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
						<p id='ratioLine'>0 %</p>
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
						<!-- <p style="color: #a09f39"> _ </p> -->
						&nbsp;

						<?php include('getHighScore.php'); ?>
						
						<img src="Images/souBlancBarre.png" alt="pièce" class="imageSouPetit" style="top:-3px !important">

					</div>

					<br>

					<div class="topLineDiv">

						<p>
							<span style="color: silver !important">&#9733;</span>
							Top 2: &nbsp;&nbsp; 
						</p>

						<?php include('getHighScore2Name.php'); ?>

						&nbsp;		
						<!-- <p style="color: #a09f39"> _ </p> -->
						&nbsp;

						<?php include('getHighScore2.php'); ?>
						
						<img src="Images/souBlancBarre.png" alt="pièce" class="imageSouPetit" style="top:-3px !important">

					</div>

					<br>

					<div class="topLineDiv">

						<p>
							<span style="color: #ba6555 !important">&#9733;</span>
							Top 3: &nbsp;&nbsp; 
						</p>

						<?php include('getHighScore3Name.php'); ?>

						&nbsp;		
						<!-- <p style="color: #a09f39"> _ </p> -->
						&nbsp;

						<?php include('getHighScore3.php'); ?>
						
						<img src="Images/souBlancBarre.png" alt="pièce" class="imageSouPetit" style="top:-3px !important">

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
						<!-- <div id="scoreContainer"> -->
							<!-- <h2 class="scoreElem" style="margin-block-end: 0em;">High-Low</h2>
							<br>
							<h3 id="scoreHighLow">score</h3>
							<p class="scoreElem"><span id="scoreVar">0</span></p> -->
						<!-- </div> -->
					</div>

				</div>
		
			</div>
		</div>

    </body>

</html>
