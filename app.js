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
    
    // 寫入內容
    document.getElementById('fortune-title').innerText = item.fortune;
    document.getElementById('yi-text').innerText = item.yi;
    document.getElementById('ji-text').innerText = item.ji;
    document.getElementById('tip-text').innerText = item.tip;
    
    const comicImg = document.getElementById('comic-img');
    comicImg.src = item.comic;
    
    // 顯示區塊並捲動
    const resultSection = document.getElementById('result-section');
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}
