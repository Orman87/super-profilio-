/*=========================================
  K • ORMAN Portfolio
  Main Application Script
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

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
