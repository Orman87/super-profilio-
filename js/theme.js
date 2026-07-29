/*=========================================
  K • ORMAN Portfolio
  Theme Engine
=========================================*/

const themes = {

    ocean: {
        "--primary": "#00d4ff",
        "--secondary": "#3b82f6",
        "--bg": "#050816",
        "--surface": "#111827",
        "--text": "#ffffff"
    },

    purple: {
        "--primary": "#a855f7",
        "--secondary": "#7c3aed",
        "--bg": "#12061d",
        "--surface": "#241038",
        "--text": "#ffffff"
    },

    emerald: {
        "--primary": "#10b981",
        "--secondary": "#22c55e",
        "--bg": "#041510",
        "--surface": "#0d2c20",
        "--text": "#ffffff"
    },

    crimson: {
        "--primary": "#ef4444",
        "--secondary": "#f97316",
        "--bg": "#170505",
        "--surface": "#2d0b0b",
        "--text": "#ffffff"
    },

    sunset: {
        "--primary": "#fb923c",
        "--secondary": "#facc15",
        "--bg": "#1c0f05",
        "--surface": "#2e1908",
        "--text": "#ffffff"
    },

    aurora: {
        "--primary": "#06b6d4",
        "--secondary": "#8b5cf6",
        "--bg": "#06121b",
        "--surface": "#102330",
        "--text": "#ffffff"
    },

    light: {
        "--primary": "#2563eb",
        "--secondary": "#9333ea",
        "--bg": "#f4f7fb",
        "--surface": "#ffffff",
        "--text": "#111827"
    }

};

/*==============================
SETTINGS BUTTON
==============================*/

.settings-btn{

position:fixed;

bottom:25px;

right:25px;

width:58px;

height:58px;

border:none;

border-radius:50%;

background:var(--primary);

color:white;

font-size:22px;

cursor:pointer;

z-index:999;

box-shadow:0 0 25px var(--primary);

transition:.35s;

}

.settings-btn:hover{

transform:rotate(90deg) scale(1.08);

}

.theme-panel{

position:fixed;

bottom:95px;

right:25px;

width:220px;

background:var(--surface);

border-radius:18px;

padding:18px;

display:flex;

flex-direction:column;

gap:10px;

box-shadow:var(--shadow);

transform:translateY(20px);

opacity:0;

pointer-events:none;

transition:.35s;

z-index:999;

}

.theme-panel.open{

transform:translateY(0);

opacity:1;

pointer-events:auto;

}

.theme-panel h3{

margin-bottom:5px;

}

.theme-panel button{

padding:12px;

border:none;

border-radius:12px;

background:rgba(255,255,255,.05);

color:var(--text);

cursor:pointer;

transition:.3s;

}

.theme-panel button:hover{

background:var(--primary);

color:#000;

  }

function applyTheme(name){

    const theme = themes[name];

    if(!theme) return;

    Object.entries(theme).forEach(([property,value])=>{

        document.documentElement.style.setProperty(property,value);

    });

    localStorage.setItem("portfolio-theme",name);

}

document.addEventListener("DOMContentLoaded",()=>{

    const savedTheme =
        localStorage.getItem("portfolio-theme") || "ocean";

    applyTheme(savedTheme);

});
