import { dataPool } from './data.js';

// 等待 DOM 完全載入後再執行
document.addEventListener('DOMContentLoaded', () => {
    const shaker = document.getElementById("shaker");
    const resultSection = document.getElementById("result-section");

    if (!shaker) {
        console.error("找不到 ID 為 shaker 的元素！請檢查 index.html");
        return;
    }

    function performShake() {
        console.log("燈籠被觸發了！"); // 檢查這行有沒有出現
        if (shaker.classList.contains("shake-animation")) return;
        
        shaker.classList.add("shake-animation");
        
        setTimeout(() => {
            shaker.classList.remove("shake-animation");
            const item = dataPool[Math.floor(Math.random() * dataPool.length)];
            
            // 寫入內容
            document.getElementById("display-fortune").innerText = item.fortune;
            document.getElementById("display-yi").innerText = item.yi;
            document.getElementById("display-ji").innerText = item.ji;
            document.getElementById("display-tip").innerText = item.tip;
            
            const comicImg = document.getElementById("display-comic");
            if (item.comic && item.comic.startsWith('http')) {
                comicImg.src = item.comic;
                comicImg.style.display = "block";
            } else {
                comicImg.style.display = "none";
            }

            resultSection.style.display = "block";
            resultSection.scrollIntoView({ behavior: "smooth" });
        }, 1000);
    }

    shaker.addEventListener("click", performShake);
});
