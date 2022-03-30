<h2 style="position:relative; margin-top:30px; margin-bottom:15px; text-align:center; color:rgb(223, 204, 204); font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
- Dernières parties jouées -
</h2>

<div id="traitBlancHistorique"></div>

<div class="slidecontainer">
    <input type="range" min="20" max="200" value="50" step="10" class="slider" id="myRange">
    <p style="position:relative; top:5px; font-size:1.3em; color:rgba(223, 204, 204, 0.9); font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Taille: <span id="demo"></span></p>
</div>

<script>
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;

    slider.oninput = function() {
    output.innerHTML = this.value;
    }
</script>




<div id="historiqueListContainer" style="overflow:scroll; height:1000px; text-align:center; color:rgb(223, 204, 204); font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; letter-spacing:0px;">


    <?php
        include('config.php');
        session_start();

        if (!isset($_SESSION['username'])) :
            include('getHistoriqueInvite.html');
        else : 
            include('getHistorique.php');
        endif;
        
    ?>

</div>