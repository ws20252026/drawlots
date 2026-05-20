import { dataPool } from "./data.js";

const shaker = document.getElementById("shaker");
const resultSection = document.getElementById("result-section");
const permBtn = document.getElementById("permission-btn");

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
    // 只有當 comic 有網址時才顯示
    if (item.comic && item.comic.startsWith("http")) {
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

// 手機搖晃權限與偵測
if (
  typeof DeviceMotionEvent !== "undefined" &&
  typeof DeviceMotionEvent.requestPermission === "function"
) {
  permBtn.style.display = "inline-block";
  permBtn.onclick = () => {
    DeviceMotionEvent.requestPermission().then((res) => {
      if (res === "granted") {
        permBtn.style.display = "none";
        window.addEventListener("devicemotion", handleMotion);
      }
    });
  };
} else {
  window.addEventListener("devicemotion", handleMotion);
}

function handleMotion(e) {
  const acc = e.accelerationIncludingGravity;
  if (
    acc &&
    (Math.abs(acc.x) > 15 || Math.abs(acc.y) > 15 || Math.abs(acc.z) > 15)
  )
    performShake();
}
