import { dataPool } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const shaker = document.getElementById("shaker");
    const resultSection = document.getElementById("result-section");

    function performShake() {
        if (shaker.classList.contains("shake-animation")) return;
        shaker.classList.add("shake-animation");
        setTimeout(() => {
            shaker.classList.remove("shake-animation");
            const item = dataPool[Math.floor(Math.random() * dataPool.length)];
            document.getElementById("display-fortune").innerText = item.fortune;
            document.getElementById("display-yi").innerText = item.yi;
            document.getElementById("display-ji").innerText = item.ji;
            document.getElementById("display-tip").innerText = item.tip;
            const comicImg = document.getElementById("display-comic");
            comicImg.src = item.comic;
            resultSection.style.display = "block";
            resultSection.scrollIntoView({ behavior: "smooth" });
        }, 1000);
    }
    shaker.addEventListener("click", performShake);
});
