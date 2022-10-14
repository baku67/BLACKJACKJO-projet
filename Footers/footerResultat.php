<script>
    if (isConnected == false) {
        document.getElementById("gainExp").style.color = "grey";
        document.getElementById("gainExp").style.opacity = "0.7";

        document.getElementById("gainExpBet").style.color = "grey";
        document.getElementById("gainExpBet").style.opacity = "0.7";
    }
</script>


<p id="gainExp"></p>
<p id="gainExpBet"></p>
<p id="expProgress"></p>
<script>
    setTimeout(function() {
        $.get("getExpProgress.php", function(data) {
            document.getElementById("expProgress").innerHTML = data + "&nbsp;%";
        });
    }, 500)

</script>

<!-- Jauge XP miniature ? -->
<!-- <div id="jaugeExp" class="jaugeExp jaugeExpProgress">
    <span id="dataExpProgress" data-progress=""></span>
</div> -->

<!-- Exemple Jauge (streak ici) -->
<!-- <div id="jaugeContainer" class="jaugeContainer jaugeProgress">
    <span id="dataProgress" data-progress=""></span>
</div> -->


<div id="footerResultatContainer">

    <!-- <h1 id="resultatFooter" style="text-align:center; margin-block-start:0.2em;">Gains</h1> -->

    <div id="footerResultatLine">
        <p id="miseLockedFooter"></p>
        <img src="Images/arrowResultat.png" class="arrowResultat">
        <p id="miseResultat"></p>
    </div>
    <br>
    <div id="footerResultatLinePair">
        <p id="misePairLockedFooter"></p>
        <img src="Images/arrowResultat.png" class="arrowResultatSideBets">
        <p id="misePairResultat"></p>
    </div>
    <br>
    <div id="footerResultatLine213">
        <p id="mise213LockedFooter"></p>
        <img src="Images/arrowResultat.png" class="arrowResultatSideBets">
        <p id="mise213Resultat"></p>
    </div>


</div>

<br><br>

<div>
    <!-- Faire pop le bouton après decompte? -->
    <button id="relancer">
        <img src="Images/reload.png" alt="reload" id="reloadPng">
    </button>
</div>
