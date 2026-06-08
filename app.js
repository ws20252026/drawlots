import { dataPool } from './data.js';


// 綁定燈籠點擊事件
document.getElementById('lantern').addEventListener('click', function() {
    const lantern = this;
    lantern.classList.add('shake-animation');
    
    // 延遲後執行隨機抽取
    setTimeout(() => {
        lantern.classList.remove('shake-animation');
        displayFortune();
    }, 600);
});

function displayFortune() {
    // 從 data.js 讀取 dataPool
    if (typeof dataPool === 'undefined') {
        alert("找不到資料檔案，請檢查 data.js 是否正確載入。");
        return;
    }

    const randomIndex = Math.floor(Math.random() * dataPool.length);
    const item = dataPool[randomIndex];
    
    // 寫入文字內容
    document.getElementById('fortune-title').innerText = item.fortune;
    document.getElementById('yi-text').innerText = item.yi;
    document.getElementById('ji-text').innerText = item.ji;
    document.getElementById('tip-text').innerHTML = item.tip;
    
    // --- 新增：處理漫畫載入提示的邏輯 ---
    const comicImg = document.getElementById('comic-img');
    const placeholder = document.getElementById('loading-placeholder');

    // 1. 初始化顯示狀態：顯示「載入中」，隱藏圖片
    placeholder.style.display = 'flex'; 
    comicImg.style.opacity = '0'; 
    
    // 2. 設定圖片來源
    comicImg.src = item.comic;
    
    // 3. 圖片載入完成後隱藏提示框
    comicImg.onload = function() {
        placeholder.style.display = 'none';
        comicImg.style.opacity = '1';
    };
    // --- 新增結束 ---
    
    // 顯示區塊並捲動
    const resultSection = document.getElementById('result-section');
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}
