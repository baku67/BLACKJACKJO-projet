<!DOCTYPE html>

<?php
	include('connexion.php');
?>


<html lang="fr">
	<head>
		<title id="title">BlackJack Jo' - Jeu de blackjack en ligne 100% gratuit</title>
		<link rel="icon" href="Images/faviconRedim.png">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" type="text/javascript"></script>
		<meta charset="UTF-8">
		<meta name="theme-color" content="rgba(17, 19, 31, 0.8)">
		<meta name="description" content="Jouez au BlackJack en ligne et sans argent réel!  - 100% Gratuit - Inscrivez-vous pour garder vos gains et débloquer de nouvelles fonctionalités!">
		<meta name="author" content="Basile Kuntz">
		<meta name="keywords" content="blackjack, casino, jeu, gratuit, cartes, croupier, carte">
		<link rel="stylesheet" href="Styles/style.css" id="stylesheet_1">
		<link rel="stylesheet" href="Styles/MediaQueries1.css" id="stylesheet_3">
		<link rel="stylesheet" href="Styles/MediaQueries2.css" id="stylesheet_4">
		<link rel="stylesheet" href="Styles/MediaQueries3.css" id="stylesheet_5">
		<link rel="stylesheet" href="Styles/styleW3.css" id="stylesheet_2">
		<!-- Script ajouté si Mobile -->
		<!-- <script type="text/javascript" src="scriptJouer.js"></script> -->
		<script type="text/javascript" src="deck.js"></script>
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Bellota:ital,wght@1,300;1,700&display=swap" rel="stylesheet">		
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		
		<!-- <script src="dist/long-press.min.js"></script> -->
		<script src="https://kit.fontawesome.com/698848973e.js" crossorigin="anonymous"></script>
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
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
				<script>
					isConnected = true; 
					console.log('estConnecté');
				</script> 

				<script type="text/javascript">

					// Get.php des données User
					var creditsConnected = <?php include('getCredits.php'); ?>; 
					
					var toggleSpeed = <?php include('getToggleTurbo.php'); ?>; 

					var toggleDMfromPhp = <?php include('getToggleDarkMode.php'); ?>; 

					var toggleMutefromPhp = <?php include('getToggleMute.php'); ?>; 

					var expProgressVarPhp = <?php include('getExpProgress.php'); ?>;
					// var expProgressVar = expProgressVarPhp.toString().slice(0, -1);
					var streakFromPhp = '<?php include('getStreak.php'); ?>';

				</script>
		<?php
			endif;
		?>

		<script>
			var username="<?php echo $_SESSION['username']; ?>";
		</script>







		
		
	</head>



	<body id="body" data-theme="dark">























		<!-- dailyProc -->
		<div id="dailyRewardBool" style="position:absolute; opacity:0; width:0; height:0; font-size:0px;"><?php include("getDailyProcBool.php");?></div>
		<!-- Fin -->

		<!-- Modal dailyReward -->
		<div id="dailyRewardDiv" style="display:none; opacity:0; position:absolute; left:100%; border-radius:10px; box-shadow: 0px 9px 0px rgba(0, 0, 0, 0.9); width:54%; height:9%; padding:2% 4% 4% 4%; font-weight:400; top:50%; left:50%; transform:translate(-50%, -50%); z-index:2; background-color:rgba(239, 59, 46, 1); text-align:center; font-size:1.9em; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; color:rgb(17 19 31); border:3px solid black;">Daily Reward: <br><p id="amountDailyReward"><i class="fa-solid fa-meteor fa-beat" style="position:fixed; left:10%; bottom:13%; color:#11131f; font-size:1.7em; opacity:0.9;"></i> +100</p></div>
		
		<!-- Modal confirmation leave Game -->
		<div id="modalLeave">Si vous quittez la partie maintenant, vos mises seront perdues. <span style="text-decoration:underline; text-decoration-thickness:2px; text-underline-offset:5px; text-decoration-color: rgba(17, 19, 31, 0.5);">Continuer ?<span><br><br><div style="display:inline;"><button id="confirm"><i class="fa-solid fa-triangle-exclamation"></i> Oui</button><button id="cancel">Annuler</button></div></div>

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


					<p id="connectedLine">

					
						<strong style="font-size:1.4em; text-shadow:0 0 3px rgb(43 39 39);"><span style="color:rgba(238,182,50,1); font-size:1.5em; position:relative; top:2px; left:16px;"><i id="starLvl" class="fa-solid fa-star"></i><span id="lvlText"><?php include('getLevel.php'); ?></span></span><span style="position:relative; bottom:2px; left:7px;"><?php echo ucfirst($_SESSION['username']);?></span></strong>

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
						// let streakFromPhp = '<?php include('getStreak.php'); ?>';
						let streakPourcentage = (streakFromPhp*10).toString();

						document.getElementById('dataProgress').setAttribute("data-progress", streakPourcentage);
					}
				</script>
			
			<!-- Fin WIP jauge -->

			<!-- Error si mdp/user faux -->
			<?php 
			if (isset($_SESSION['messageErrorCo'])) {
			?>
			<p id="errorCo" class="fadeIn2">
				<?php
				echo $_SESSION['messageErrorCo'];
				unset($_SESSION['messageErrorCo']);
				?>
			</p>
			<?php
			}
			?>
			<!-- Fin errorCo -->













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

					<h3 id="classementTitle">Classement</h3>

					<div id="traitBlancClassement"></div>

					<div class="topLineDiv">

						<p>
							<span style="color: rgb(241 205 92 / 95%) !important">&#9733;</span>
							Top 1: &nbsp;&nbsp; 
						</p>

						<?php include('getHighScoreName.php'); ?>

						&nbsp;		
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

					<break></break>	

					<div id="container3">
					</div>

				</div>
		
			</div>
		</div>






		<!-- SCRIPT EMULATEUR PHONE SUR PC -->
		<script>

			var x = window.matchMedia("(min-width: 767px)");

			var emulateurOn;

			const iframe = document.createElement("iframe");
			iframe.setAttribute("id", "iframePC");
			iframe.setAttribute("src", "indexBackup.php");
			if (isConnected) {
				iframe.style.boxShadow = "rgba(0, 255, 234, 0.4) 0px 0px 60px 4px";
			}
			else {
				iframe.style.boxShadow = "rgba(239, 59, 46, 0.5) 0px 0px 60px 4px";
			}


			if (x.matches) {
				// Affichage emulateurMobil sur PC

				// Pas de script dans l'index (vide ici)
				var script = document.createElement('script');
				script.src = "";
				document.head.appendChild(script);

				document.body.innerHTML = "";
				document.getElementById("body").append(iframe);
				emulateurOn = true;
				if (isConnected) {document.getElementById("iframePC").style.boxShadow = "rgba(0, 255, 234, 0.4) 0px 0px 60px 4px"}
				else {document.getElementById("iframePC").style.boxShadow = "rgba(239, 59, 46, 0.5) 0px 0px 60px 4px"}



				if (isConnected == false) {
					const sideLeftDiv = document.createElement("div");
					sideLeftDiv.setAttribute("id", "sideLeftDiv");
					sideLeftDiv.innerHTML = "<p id='titleSideDivLeft' class='titleSideDiv'>Créer un compte !<span id='sideCrossLeft'>&#x2715;</span></p>";
					sideLeftDiv.append(document.createElement("br"));

					const listSideLeft = document.createElement("ul");
					listSideLeft.setAttribute("id", "listSideLeft");


					const list1 = document.createElement("li");
					list1.setAttribute("id", "list1");
					list1.classList.add("listX");
					list1.innerHTML = "<p>Sauvegardez vos gains</p>";
					listSideLeft.append(list1);
					const list2 = document.createElement("li");
					list2.setAttribute("id", "list2");
					list2.classList.add("listX");
					list2.innerHTML = "<p>Gagnez des niveaux et des récompenses</p>";
					listSideLeft.append(list2);
					const list3 = document.createElement("li");
					list3.setAttribute("id", "list3");
					list3.classList.add("listX");
					list3.innerHTML = "<p>Débloquez de nouvelles fonctionalités</p>";
					listSideLeft.append(list3);
					const list4 = document.createElement("li");
					list4.setAttribute("id", "list4");
					list4.classList.add("listX");
					list4.innerHTML = "<p>Accédez à vos statistiques personnelles</p>";
					listSideLeft.append(list4);
					const list0 = document.createElement("li");
					list0.setAttribute("id", "list0");
					list0.classList.add("listX");
					list0.innerHTML = "<p style='color:rgba(255,215,0,0.7);font-style:italic;font-weight:bolder;'>* Aucun argent réel *</p>";
					listSideLeft.append(list0);

					const subscribeButton = document.createElement("li");
					subscribeButton.setAttribute("id", "subscribeButton");
					subscribeButton.innerHTML = "<p id='subscribText'>C'est parti !</p>";

					const flecheSubscribe = document.createElement("img");
					flecheSubscribe.setAttribute("id", "flecheSubscribe");
					subscribeButton.prepend(flecheSubscribe);

					listSideLeft.append(subscribeButton);


					const subscribeButton2 = document.createElement("li");
					subscribeButton2.setAttribute("id", "subscribeButton2");
					subscribeButton2.innerHTML = "<p id='subscribText2'>Se connecter</p>";

					const flecheSubscribe2 = document.createElement("img");
					flecheSubscribe2.setAttribute("id", "flecheSubscribe2");
					subscribeButton2.prepend(flecheSubscribe2);

					listSideLeft.append(subscribeButton2);



					sideLeftDiv.append(listSideLeft);




					const sideRightDiv = document.createElement("div");
					sideRightDiv.setAttribute("id", "sideRightDiv");
					sideRightDiv.innerHTML = "<p id='titleSideDivRight' class='titleSideDiv'>Règles du site<span id='sideCrossRight'>&#x2715;</span></p>";
					sideRightDiv.append(document.createElement("br"));

					const listSideRight = document.createElement("ul");
					listSideRight.setAttribute("id", "listSideRight");


					const list1b = document.createElement("li");
					list1b.setAttribute("id", "list1b");
					list1b.classList.add("listX");
					list1b.innerHTML = "<p>Jauge Win Streak</p>";
					listSideRight.append(list1b);
					const list2b = document.createElement("li");
					list2b.setAttribute("id", "list2b");
					list2b.classList.add("listX");
					list2b.innerHTML = "<p>Side Bets</p>";
					listSideRight.append(list2b);
					const list3b = document.createElement("li");
					list3b.setAttribute("id", "list3b");
					list3b.classList.add("listX");
					list3b.innerHTML = "<p>Mélange: sous 60 cartes</p>";
					listSideRight.append(list3b);
					const list4b = document.createElement("li");
					list4b.setAttribute("id", "list4b");
					list4b.classList.add("listX");
					list4b.innerHTML = "<p>Double down</p>";
					listSideRight.append(list4b);
					const list0b = document.createElement("li");
					list0b.setAttribute("id", "list0b");
					list0b.classList.add("listX");
					list0b.innerHTML = "<p>Assurance</p>";
					listSideRight.append(list0b);

					sideRightDiv.append(listSideRight);




					document.getElementById("body").append(sideRightDiv);
					document.getElementById("body").append(sideLeftDiv);



					// Anim subscribe button:
					const subscribeModal = document.createElement("div");
					subscribeModal.setAttribute("id", "subscribeModal");
					subscribeModal.style.cssText = "font-size:1.65em; transform:scale(0.9) translate(10px, -75px); opacity: 0;";

					subscribeModal.innerHTML = '<form class="w3-container" action="inscription.php" method="post"><div class="w3-section"><label><b class="modalText">E-mail</b></label><input class="w3-input w3-border fixBoxSizing w3-margin-bottom maSauce" type="" placeholder="Entrez votre adresse mail" name="mail" required><label><b class="modalText">Identifiant</b></label><input class="w3-input w3-border w3-margin-bottom fixBoxSizing maSauce" type="text" placeholder="Entrer un identifiant" name="username" required><label><b class="modalText">Mot de passe</b></label><input class="w3-input w3-border fixBoxSizing w3-margin-bottom maSauce" type="password" placeholder="Entrer un mot de passe" name="password" required><label><b class="modalText">Confirmation</b></label><input class="w3-input w3-border fixBoxSizing maSauce" style="margin-bottom:75px;" type="password" placeholder="Réécrivez le mot de passe" name="password2" required><button class="w3-button w3-block w3-blue w3-section w3-padding maSauceSubmit" type="submit" value="S\'inscrire">Go !</button></div></form><div class="w3-container w3-padding-16 w3-light-grey"></div>';
					


					const subscribeModal2 = document.createElement("div");
					subscribeModal2.setAttribute("id", "subscribeModal2");
					subscribeModal2.style.cssText = "font-size:1.65em; transform:scale(0.9) translate(10px, -75px); opacity: 0;";

					subscribeModal2.innerHTML = '<form class="w3-container" action="connexion.php" method="post"><div class="w3-section"><label><b class="modalText">Identifiant</b></label><input class="w3-input w3-border w3-margin-bottom fixBoxSizing maSauce" type="text" placeholder="Entrer un identifiant" name="username" required><label><b class="modalText">Mot de passe</b></label><input class="w3-input w3-border fixBoxSizing w3-margin-bottom maSauce" type="password" placeholder="Entrer un mot de passe" name="password" required><button class="w3-button w3-block w3-blue w3-section w3-padding maSauceSubmit" type="submit" value="connexion" name="connexion">Go !</button></div></form><div class="w3-container w3-padding-16 w3-light-grey"></div>';



					document.getElementById("subscribeButton").addEventListener("click", function() {
						document.getElementById("flecheSubscribe").classList.add("flecheSubscribeAnim");
						document.getElementById("subscribeButton").classList.add("subscribeButtonActiv");
						setTimeout(function() {
							document.getElementById("listSideLeft").classList.add("fadeOut3");
							setTimeout(function() {
								document.getElementById("listSideLeft").remove();

								document.getElementById("sideLeftDiv").append(subscribeModal);
								document.getElementById("subscribeModal").classList.add("fadeIn4");
							}, 500)
						}, 250)
					})

					document.getElementById("subscribeButton2").addEventListener("click", function() {
						document.getElementById("flecheSubscribe2").classList.add("flecheSubscribeAnim");
						document.getElementById("subscribeButton2").classList.add("subscribeButtonActiv");
						setTimeout(function() {
							document.getElementById("listSideLeft").classList.add("fadeOut3");
							setTimeout(function() {
								document.getElementById("listSideLeft").remove();

								document.getElementById("sideLeftDiv").append(subscribeModal2);
								document.getElementById("subscribeModal2").classList.add("fadeIn4");
							}, 500)
						}, 250)
					})


					// Pour l'instant: cross met juste un fadeOut puis remove et no way back (pas de collapsed)
					document.getElementById("sideCrossRight").addEventListener("click", function() {
						document.getElementById("listSideRight").classList.add("fadeOut2");
						setTimeout(function() {
							document.getElementById("titleSideDivRight").classList.add("fadeOut2");
						}, 250)
						setTimeout(function() {
							document.getElementById("sideRightDiv").classList.add("fadeOut2");
						}, 500)
					})
					document.getElementById("sideCrossLeft").addEventListener("click", function() {
						if (document.getElementById("listSideLeft") !== null) {
							document.getElementById("listSideLeft").classList.add("fadeOut2");
							setTimeout(function() {
								document.getElementById("titleSideDivLeft").classList.add("fadeOut2");
							}, 250)
							setTimeout(function() {
								document.getElementById("sideLeftDiv").classList.add("fadeOut2");
							}, 500)
						}
						else {
							document.getElementById("subscribeModal").classList.add("fadeOut3");
							setTimeout(function() {
								document.getElementById("subscribeModal").remove();
								document.getElementById("titleSideDivLeft").classList.add("fadeOut2");
							}, 300)
							setTimeout(function() {
								document.getElementById("sideLeftDiv").classList.add("fadeOut2");
							}, 500)
						}
					})
				}
				// Affichage des sideDiv quand connecté (jaugeStreak, xp, ptit historique, deco, toggle, etc...)
				else {

					var experienceDiv = document.createElement("div");
					experienceDiv.setAttribute("id", "experienceDiv");

					var experienceTitle = document.createElement("p");
					experienceTitle.setAttribute("id", "experienceTitle");
					experienceTitle.innerHTML = "Progression";

					var experienceNbr = document.createElement("p");
					experienceNbr.setAttribute("id", "experienceNbr");
					experienceNbr.innerHTML = "<p><span id='expIcone'>EXP</span>&nbsp;&nbsp;" + expProgressVarPhp + " %</p>";




					// ATTENTION Pour l'instant ce jauge Streak seert aussi au jauge EXP
					var jaugeContainerMaxPC = document.createElement("div");
					jaugeContainerMaxPC.setAttribute('id', 'jaugeContainerMaxPC');
					jaugeContainerMaxPC.classList.add("jaugeContainer2", "jaugeProgress");

					var dataProgressMax = document.createElement("span");
					dataProgressMax.setAttribute("id", "dataProgressMax");

					let streakPourcentage = (streakFromPhp*10).toString();
					dataProgressMax.setAttribute("data-progress", streakPourcentage);

					jaugeContainerMaxPC.append(dataProgressMax);

					
						



					experienceDiv.append(experienceTitle);
					experienceDiv.append(document.createElement("br"));
					experienceDiv.append(experienceNbr);

					// Append JaugeMax EXP
					experienceDiv.append(streakEmulNbr);
					experienceDiv.append(document.createElement("br"));
					experienceDiv.append(jaugeContainerMaxPC);


							



					var streakDiv = document.createElement("div");
					streakDiv.setAttribute("id", "streakDiv");

					var streakTitle = document.createElement("p");
					streakTitle.setAttribute("id", "streakTitle");
					streakTitle.innerHTML = "Streak";

					var streakEmulNbr = document.createElement("p");
					streakEmulNbr.setAttribute("id", "streakEmulNbr");
					streakEmulNbr.innerHTML = "<img id='imgFireStreakPC' src='Images/fire_maxPurple.png'>" + streakFromPhp;


					streakDiv.append(streakTitle);
					streakDiv.append(document.createElement("br"));
					streakDiv.append(streakEmulNbr);

					// Append JaugeMax Streak
					streakDiv.append(document.createElement("br"));
					streakDiv.append(jaugeContainerMaxPC);




					document.getElementById("body").append(experienceDiv);
					document.getElementById("body").append(streakDiv);

				}


				// Ajouter un "A propos du dev" redirect Portfolio



			}
			else {
				// Affichage normal (mobile)
				var script = document.createElement('script');
				script.src = "scriptJouer.js";
				document.head.appendChild(script);

				emulateurOn = false;
			}

		</script>
		<!-- FIN EMULATEUR -->





		<!-- <script>

			window.onmessage = function(e) {
				if (e.data == 'hello') {

					// Fonctionne que lors du rafraischissment de l'indexParent, (le message s'envoi pas lors de la co dans l'iframe)
					
					// alert("co");
					document.getElementById("iframePC").style.boxShadow = "rgba(0, 255, 234, 0.5) 0px 0px 60px 4px";

				}
			};
		</script> -->





	</body>
	

	

</html>
