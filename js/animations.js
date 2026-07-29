/*==================================
 K • ORMAN Portfolio
 Tech Animation Engine
==================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


const symbols =
document.querySelectorAll(
"#tech-background span"
);



symbols.forEach(symbol=>{


symbol.style.fontSize =
Math.floor(
Math.random()*15+18
)
+"px";



symbol.style.animationDuration =
Math.floor(
Math.random()*8+8
)
+"s";



});



});
