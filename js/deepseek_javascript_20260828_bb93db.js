/*=========================================
  K • ORMAN Portfolio
  Main Application Script
  Version: 2.0.0
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
     NAVBAR - FIXED
    ==============================*/
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    // Scroll effect
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
    });

    // Mobile menu toggle
    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            navLinks.classList.toggle("open");
            
            const icon = this.querySelector("i");
            if (icon) {
                icon.className = navLinks.classList.contains("open") 
                    ? "fas fa-times" 
                    : "fas fa-bars";
            }
        });

        document.addEventListener("click", function(e) {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove("open");
                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.className = "fas fa-bars";
                }
            }
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", function() {
                navLinks.classList.remove("open");
                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.className = "fas fa-bars";
                }
            });
        });
    }

    /*==============================
     NETWORK STATUS
    ==============================*/
    function updateNetwork() {
        const status = document.getElementById("network-status");
        if (status) {
            if (navigator.onLine) {
                status.textContent = "🟢 Online";
                status.style.color = "#22c55e";
            } else {
                status.textContent = "🔴 Offline";
                status.style.color = "#ef4444";
            }
        }
    }

    window.addEventListener("online", updateNetwork);
    window.addEventListener("offline", updateNetwork);
    updateNetwork();

    /*==============================
     ACTIVE NAV LINK
    ==============================*/
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll("#navLinks a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.id;
            }
        });

        links.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });

    /*==============================
     CLOCK & DATE
    ==============================*/
    function updateClock() {
        const now = new Date();
        const timeEl = document.getElementById("live-time");
        const dateEl = document.getElementById("live-date");
        
        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            });
        }
        
        if (dateEl) {
            dateEl.textContent = now.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });
        }
    }

    updateClock();
    setInterval(updateClock, 1000);

    /*==============================
     BATTERY STATUS
    ==============================*/
    const batteryEl = document.getElementById("battery-level");
    if (batteryEl && "getBattery" in navigator) {
        navigator.getBattery().then(battery => {
            function updateBattery() {
                const level = Math.round(battery.level * 100);
                batteryEl.textContent = level + "%" + (battery.charging ? " ⚡" : "");
            }
            updateBattery();
            battery.addEventListener("levelchange", updateBattery);
            battery.addEventListener("chargingchange", updateBattery);
        }).catch(() => {
            batteryEl.textContent = "N/A";
        });
    } else if (batteryEl) {
        batteryEl.textContent = "N/A";
    }

    /*==============================
     BOOT SCREEN
    ==============================*/
    const loader = document.getElementById("loader");
    const bootLines = document.querySelectorAll(".boot-console p");
    const progress = document.getElementById("progressBar");
    const percent = document.getElementById("percent");

    let currentProgress = 0;

    bootLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = "1";
            line.style.transform = "translateX(0)";
            line.style.transition = ".4s";
        }, index * 350);
    });

    const loaderInterval = setInterval(() => {
        currentProgress++;
        if (progress) {
            progress.style.width = currentProgress + "%";
        }
        if (percent) {
            percent.textContent = currentProgress + "%";
        }
        
        if (currentProgress >= 100) {
            clearInterval(loaderInterval);
            setTimeout(() => {
                if (loader) {
                    loader.style.opacity = "0";
                    loader.style.pointerEvents = "none";
                    setTimeout(() => {
                        loader.remove();
                    }, 600);
                }
            }, 500);
        }
    }, 30);

    /*==============================
     THEME PANEL TOGGLE
    ==============================*/
    const settingsBtn = document.querySelector(".settings-btn");
    const themePanel = document.querySelector(".theme-panel");

    if (settingsBtn && themePanel) {
        settingsBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            themePanel.classList.toggle("open");
        });

        document.addEventListener("click", function(e) {
            if (!settingsBtn.contains(e.target) && !themePanel.contains(e.target)) {
                themePanel.classList.remove("open");
            }
        });
    }

    /*==============================
     MUSIC CONTROLS - COMPLETE FIX
    ==============================*/
    // Get elements
    const musicToggle = document.getElementById("musicToggle");
    const controlPanel = document.getElementById("controlPanel");
    const audio = document.getElementById("backgroundMusic");
    const playBtn = document.getElementById("playMusic");
    const pauseBtn = document.getElementById("pauseMusic");
    const volumeControl = document.getElementById("volumeControl");

    // Music state
    let isMusicPlaying = false;

    // Function to toggle music
    function toggleMusic() {
        if (!audio) return;

        if (isMusicPlaying) {
            audio.pause();
            isMusicPlaying = false;
            if (musicToggle) {
                musicToggle.textContent = "🔇";
                musicToggle.style.background = "rgba(255,0,0,0.3)";
            }
        } else {
            // Try to play
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isMusicPlaying = true;
                    if (musicToggle) {
                        musicToggle.textContent = "🎵";
                        musicToggle.style.background = "rgba(0,212,255,0.3)";
                    }
                }).catch(error => {
                    console.warn("Audio playback was prevented:", error);
                    // Show user they need to interact first
                    if (musicToggle) {
                        musicToggle.textContent = "⚠️";
                        setTimeout(() => {
                            musicToggle.textContent = "🎵";
                        }, 2000);
                    }
                });
            }
        }
    }

    // Music Toggle Button (Main control)
    if (musicToggle) {
        musicToggle.addEventListener("click", function(e) {
            e.stopPropagation();
            toggleMusic();
        });
    }

    // Control Panel toggle
    if (musicToggle && controlPanel) {
        // Double click to open control panel
        musicToggle.addEventListener("dblclick", function(e) {
            e.stopPropagation();
            controlPanel.classList.toggle("open");
        });

        // Or add a separate way to open - long press or tap
        let pressTimer;
        musicToggle.addEventListener("touchstart", function(e) {
            pressTimer = setTimeout(() => {
                controlPanel.classList.toggle("open");
            }, 500);
        });
        musicToggle.addEventListener("touchend", function() {
            clearTimeout(pressTimer);
        });
        musicToggle.addEventListener("touchmove", function() {
            clearTimeout(pressTimer);
        });

        // For desktop - right click or shift+click
        musicToggle.addEventListener("contextmenu", function(e) {
            e.preventDefault();
            controlPanel.classList.toggle("open");
        });

        // Close panel when clicking outside
        document.addEventListener("click", function(e) {
            if (controlPanel && !controlPanel.contains(e.target) && !musicToggle.contains(e.target)) {
                controlPanel.classList.remove("open");
            }
        });
    }

    // Play button
    if (playBtn && audio) {
        playBtn.addEventListener("click", function() {
            audio.play().then(() => {
                isMusicPlaying = true;
                if (musicToggle) {
                    musicToggle.textContent = "🎵";
                    musicToggle.style.background = "rgba(0,212,255,0.3)";
                }
                controlPanel.classList.remove("open");
            }).catch(error => {
                console.warn("Play failed:", error);
            });
        });
    }

    // Pause button
    if (pauseBtn && audio) {
        pauseBtn.addEventListener("click", function() {
            audio.pause();
            isMusicPlaying = false;
            if (musicToggle) {
                musicToggle.textContent = "🔇";
                musicToggle.style.background = "rgba(255,0,0,0.3)";
            }
            controlPanel.classList.remove("open");
        });
    }

    // Volume control
    if (volumeControl && audio) {
        volumeControl.addEventListener("input", function() {
            audio.volume = parseFloat(this.value);
        });
    }

    // Handle audio ending
    if (audio) {
        audio.addEventListener("ended", function() {
            isMusicPlaying = false;
            if (musicToggle) {
                musicToggle.textContent = "🎵";
                musicToggle.style.background = "rgba(0,0,0,0.7)";
            }
        });

        // Handle errors
        audio.addEventListener("error", function(e) {
            console.warn("Audio error:", e);
            if (musicToggle) {
                musicToggle.textContent = "❌";
                setTimeout(() => {
                    musicToggle.textContent = "🎵";
                }, 3000);
            }
        });
    }

    // Keyboard shortcut: Space to toggle music
    document.addEventListener("keydown", function(e) {
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
            if (e.key === " " || e.key === "Space") {
                e.preventDefault();
                toggleMusic();
            }
        }
    });

    // Auto-play on user interaction (first click anywhere)
    let firstInteraction = false;
    document.addEventListener("click", function() {
        if (!firstInteraction && audio && !isMusicPlaying) {
            firstInteraction = true;
            // Optional: auto-start music on first interaction
            // Uncomment below if you want music to auto-start on first click
            // toggleMusic();
        }
    }, { once: false });

    /*==============================
     TYPING ANIMATION
    ==============================*/
    const typingElement = document.getElementById("typing");

    if (typeof window.profile !== "undefined" && window.profile.profession) {
        const professions = window.profile.profession;
        let professionIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentText = professions[professionIndex];

            if (!deleting) {
                typingElement.textContent = currentText.substring(0, characterIndex++);
                if (characterIndex > currentText.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1800);
                    return;
                }
            } else {
                typingElement.textContent = currentText.substring(0, characterIndex--);
                if (characterIndex < 0) {
                    deleting = false;
                    professionIndex++;
                    if (professionIndex >= professions.length) professionIndex = 0;
                }
            }

            setTimeout(typeEffect, deleting ? 45 : 90);
        }

        typeEffect();
    }

    /*==============================
     SKILLS ANIMATION
    ==============================*/
    const skillBars = document.querySelectorAll(".skill-progress");

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.progress + "%";
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });

    /*==============================
     FIREWORKS FEATURE
    ==============================*/
    const badge = document.getElementById("featuredBadge");
    const container = document.getElementById("fireworks-container");

    if (badge && container) {
        badge.addEventListener("click", () => {
            const duration = 10000;
            const end = Date.now() + duration;
            
            const interval = setInterval(() => {
                for (let i = 0; i < 15; i++) {
                    const particle = document.createElement("div");
                    particle.className = "firework";
                    particle.style.left = Math.random() * window.innerWidth + "px";
                    particle.style.top = Math.random() * window.innerHeight + "px";
                    particle.style.background = `hsl(${Math.random() * 360},100%,60%)`;
                    particle.style.setProperty("--x", (Math.random() * 300 - 150) + "px");
                    particle.style.setProperty("--y", (Math.random() * 300 - 150) + "px");
                    container.appendChild(particle);
                    
                    setTimeout(() => {
                        particle.remove();
                    }, 1800);
                }

                const star = document.createElement("div");
                star.className = "star";
                star.innerHTML = "⭐";
                star.style.left = Math.random() * 100 + "vw";
                container.appendChild(star);
                
                setTimeout(() => {
                    star.remove();
                }, 3000);

                if (Date.now() > end) {
                    clearInterval(interval);
                }
            }, 250);
        });
    }

    /*==============================
     VISITOR COUNTER
    ==============================*/
    const visitorCard = document.querySelector(".visitor-card");
    const visitorCount = document.getElementById("visitor-count");
    let visitorAlreadyCounted = false;

    function fallbackCounter() {
        if (!visitorCount) return;
        
        let count = localStorage.getItem("visitorCount_orman");
        if (count === null) {
            count = 1;
        } else {
            count = parseInt(count) + 1;
        }
        localStorage.setItem("visitorCount_orman", count);
        
        animateVisitorCount(count);
        console.log("✅ Fallback visitor counted:", count);
    }

    function animateVisitorCount(target) {
        if (!visitorCount) return;
        
        target = Number(target) || 0;
        const duration = 650;
        const startTime = performance.now();

        function animate(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentNumber = Math.floor(eased * target);
            visitorCount.textContent = currentNumber.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                visitorCount.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(animate);
    }

    async function countVisitor() {
        if (visitorAlreadyCounted || !visitorCount) {
            return;
        }

        visitorAlreadyCounted = true;
        visitorCount.textContent = "0";

        try {
            if (typeof Counter !== "undefined") {
                const counter = new Counter({ workspace: "ORMAN-TECH" });
                const COUNTER_NAME = "first-counter-5160";
                
                const result = await counter.up(COUNTER_NAME);
                console.log("✅ Visitor counted via API:", result);
                
                const total = Number(result.value) || 0;
                animateVisitorCount(total);
            } else {
                fallbackCounter();
            }
        } catch (error) {
            console.error("❌ CounterAPI error:", error);
            fallbackCounter();
        }
    }

    if (visitorCard) {
        const visitorObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !visitorAlreadyCounted) {
                    console.log("👁 Visitor section reached - counting...");
                    countVisitor();
                    visitorObserver.unobserve(visitorCard);
                }
            });
        }, { threshold: 0.5 });

        visitorObserver.observe(visitorCard);
    }

    /*==============================
     SMOOTH NAVIGATION
    ==============================*/
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    /*==============================
     DYNAMIC COPYRIGHT
    ==============================*/
    const footer = document.querySelector("footer p");
    if (footer && typeof window.profile !== "undefined" && window.profile.name) {
        footer.innerHTML = `© ${new Date().getFullYear()} Designed & Developed with ❤️ by <strong>${window.profile.name}</strong>`;
    }

    /*==============================
     CONSOLE GREETING
    ==============================*/
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