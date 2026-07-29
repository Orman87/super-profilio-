/*=====================================
 K • ORMAN Portfolio
 Music Controller
=====================================*/


const music =
document.getElementById("backgroundMusic");


const musicToggle =
document.getElementById("musicToggle");


const panel =
document.getElementById("controlPanel");


const playBtn =
document.getElementById("playMusic");


const pauseBtn =
document.getElementById("pauseMusic");


const volume =
document.getElementById("volumeControl");



music.volume = 0.5;



// Open / close panel

musicToggle.addEventListener("click",()=>{

    panel.classList.toggle("open");

});



// Play

playBtn.addEventListener("click",()=>{

    music.play();

    musicToggle.classList.add("playing");

});



// Pause

pauseBtn.addEventListener("click",()=>{

    music.pause();

    musicToggle.classList.remove("playing");

});



// Volume

volume.addEventListener("input",(e)=>{

    music.volume = e.target.value;

});



// Try autoplay

window.addEventListener("load",()=>{

    music.play()
    .then(()=>{

        musicToggle.classList.add("playing");

    })
    .catch(()=>{

        console.log(
        "Browser blocked autoplay. Waiting for user interaction."
        );

    });

});
