<!DOCTYPE html>

<?php
   include("config.php");
?>

<html lang="fr">
	<head>
		<title id="title">BlackJack Jo' - Jouer</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="styleJouer.css" id="stylesheet_1">
		<link rel="stylesheet" href="styleW3.css" id="stylesheet_2">
		<script type="text/javascript" src="scriptJouer.js"></script>
		<link rel="icon" href="Images/favicon.png">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
	</head>


	<body>

		<div class="containerMaster">


			<header id="header">
				<h1 id="title">BlackJack Jo'</h1>
				<div id="traitTitleSlide"></div>
				<br/>
				<div>
					<ul id="onglets">
						<li class="onglet"><a href="Hi-Lo.html" id="Hi-Lo">Hi-Lo</a></li>
						<li class="onglet" ><a href="index.php" id="jouer">JOUER !</a></li>
						<li class="onglet"><a href="compteur.html" id="Compteur">Compteur</a></li>
					</ul>
				</div>
			</header>



			

			<!-- BOUTONS Connection/Inscription -->
			<div id="connectionContainer">
				<button id="connectionButton" class="connectionButtons" onclick="document.getElementById('connectionModal').style.display='block'">Se connecter</button>
				<p class="connectionButtons">&nbsp;|&nbsp;</p>
				<button id="inscriptionButton" class="connectionButtons" onclick="document.getElementById('inscriptionModal').style.display='block'">S'inscrire</button>
			</div>
			<!-- FIN BOUTONS -->


			<!-- MODALS Connection/Inscription -->
			<div id="connectionModal" class="w3-modal">
				<div class="w3-modal-content">
					<div class="w3-container">
						<span onclick="document.getElementById('connectionModal').style.display='none'" class="w3-button w3-display-topright">&times;</span>
						<header class="modalHeader">
							<h2 style="text-align: center; font-family:Segoe UI,Arial,sans-serif; font-weight:400; color:rgb(223, 204, 204)">Connection</h2>
						</header>
						<br>
						<!-- FORM -->
					</div>
				</div>	
			</div>
			
			<div id="inscriptionModal" class="w3-modal">
				<div class="w3-modal-content">
					<div class="w3-container">
						<span onclick="document.getElementById('inscriptionModal').style.display='none'" class="w3-button w3-display-topright">&times;</span>
						<header class="modalHeader">
							<h2 style="text-align: center; font-family:Segoe UI,Arial,sans-serif; font-weight:400; color:rgb(223, 204, 204)">Inscription</h2>
						</header>
						<br>
						<!-- FORM -->
					</div>
				</div>
			</div>
			<!-- FIN MODALS -->
			

			






			
			<div id="container1">
				<div id="newGame" class="module-border-wrap">
					<a href="#" style="text-decoration: none;" id="lancerPartie">Nouvelle Partie !</a>
				</div>
			</div>




			<div id="footer">


				<div style="display:inline-flex;">
					<h3 id="footerTitle" style="letter-spacing: 3px;">  Comment jouer ...  </h3>
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
