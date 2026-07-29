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
