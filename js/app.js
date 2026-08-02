/*=========================================
  K • ORMAN Portfolio
  Main Application Script
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
 NAVBAR
==============================*/

const navbar =
document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

navbar.classList.toggle(
"scrolled",
window.scrollY>40
);

});

const menuBtn =
document.getElementById("menuBtn");

const navLinks =
document.getElementById("navLinks");

menuBtn.addEventListener("click",()=>{

navLinks.classList.toggle("open");

});

  const sections =
document.querySelectorAll("section");

const links =
document.querySelectorAll("#navLinks a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=
section.offsetTop-120;

if(window.scrollY>=top){

current=section.id;

}

});

links.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

  function updateClock(){

const now=new Date();

document.getElementById("live-time").textContent=
now.toLocaleTimeString();

document.getElementById("live-date").textContent=
now.toDateString();

}

updateClock();

setInterval(updateClock,1000);


  /*==============================
BOOT SCREEN
==============================*/

const bootLines =
document.querySelectorAll(".boot-console p");

const progress =
document.getElementById("progressBar");

const percent =
document.getElementById("percent");

let current = 0;

bootLines.forEach((line,index)=>{

setTimeout(()=>{

line.style.opacity="1";

line.style.transform="translateX(0)";

line.style.transition=".4s";

},index*350);

});

const loaderInterval =
setInterval(()=>{

current++;

progress.style.width=current+"%";

percent.textContent=current+"%";

if(current>=100){

clearInterval(loaderInterval);

setTimeout(()=>{

loader.style.opacity="0";

loader.style.pointerEvents="none";

setTimeout(()=>{

loader.remove();

},600);

},500);

}

},30);


  const settingsBtn = document.querySelector(".settings-btn");

const themePanel = document.querySelector(".theme-panel");

settingsBtn.addEventListener("click", () => {

    themePanel.classList.toggle("open");

});

    // -----------------------------
    // Loader
    // -----------------------------
    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.pointerEvents = "none";

            setTimeout(() => {
                loader.remove();
            }, 500);

        }, 1500);
    });

    // -----------------------------
    // Typing Animation
    // -----------------------------
    const typingElement = document.getElementById("typing");

    const professions = window.profile.profession;

    let professionIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentText = professions[professionIndex];

        if (!deleting) {

            typingElement.textContent =
                currentText.substring(0, characterIndex++);

            if (characterIndex > currentText.length) {

                deleting = true;

                setTimeout(typeEffect, 1800);

                return;

            }

        } else {

            typingElement.textContent =
                currentText.substring(0, characterIndex--);

            if (characterIndex < 0) {

                deleting = false;

                professionIndex++;

                if (professionIndex >= professions.length)
                    professionIndex = 0;

            }

        }

        setTimeout(typeEffect, deleting ? 45 : 90);

    }

    typeEffect();

  // ==============================
// Skills Animation
// ==============================


const skillBars =
document.querySelectorAll(".skill-progress");


const skillsObserver =
new IntersectionObserver(entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


const bar = entry.target;


bar.style.width =
bar.dataset.progress + "%";


}


});


},{
threshold:0.5
});



skillBars.forEach(bar=>{

skillsObserver.observe(bar);

});

  const badge = document.getElementById("featuredBadge");

const container =
document.getElementById("fireworks-container");

badge.addEventListener("click",()=>{

const duration=10000;

const end=Date.now()+duration;

const interval=setInterval(()=>{

for(let i=0;i<15;i++){

const particle=
document.createElement("div");

particle.className="firework";

particle.style.left=
Math.random()*window.innerWidth+"px";

particle.style.top=
Math.random()*window.innerHeight+"px";

particle.style.background=
`hsl(${Math.random()*360},100%,60%)`;

particle.style.setProperty(
"--x",
(Math.random()*300-150)+"px"
);

particle.style.setProperty(
"--y",
(Math.random()*300-150)+"px"
);

container.appendChild(particle);

setTimeout(()=>{

particle.remove();

},1800);

}

const star=
document.createElement("div");

star.className="star";

star.innerHTML="⭐";

star.style.left=
Math.random()*100+"vw";

container.appendChild(star);

setTimeout(()=>{

star.remove();

},3000);

if(Date.now()>end){

clearInterval(interval);

}

},250);

});

    // -----------------------------
    // Smooth Navigation
    // -----------------------------
    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", e => {

                e.preventDefault();

                const target =
                    document.querySelector(link.getAttribute("href"));

                if (target) {

                    target.scrollIntoView({

                        behavior: "smooth"

                    });

                }

            });

        });

    // -----------------------------
    // Dynamic Copyright
    // -----------------------------
    const footer = document.querySelector("footer p");

    if (footer) {

        footer.innerHTML =
            `© ${new Date().getFullYear()} Designed & Developed with ❤️ by <strong>${window.profile.name}</strong>`;

    }

    // -----------------------------
    // Console Greeting
    // -----------------------------
    console.log(`
%c
╔══════════════════════════════════════╗
║                                      ║
║      Welcome, Developer! 👋          ║
║                                      ║
║      You're viewing the source       ║
║      of K • ORMAN Portfolio          ║
║                                      ║
║      Thanks for stopping by.         ║
║                                      ║
╚══════════════════════════════════════╝
`,
"color:#00d4ff;font-size:14px;font-weight:bold;");
});
