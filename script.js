// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Love Counter Logic ---
    // 真實的交往紀念日: 2024/07/13
    const startDate = new Date('2024-07-13T00:00:00'); 

    function updateLoveCounter() {
        const now = new Date();
        const diff = now - startDate;

        // 計算各單位
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const years = Math.floor(days / 365);
        const remainingDays = days % 365;
        
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        // 更新 DOM
        document.getElementById('years').innerText = String(years).padStart(2, '0');
        document.getElementById('days').innerText = String(remainingDays).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    // 每秒更新一次
    setInterval(updateLoveCounter, 1000);
    updateLoveCounter();

    // --- 2. Countdown Logic ---
    function updateCountdowns() {
        const now = new Date();
        const currentYear = now.getFullYear();

        // 女朋友的生日倒數 (2005/03/15) -> Month 是 0 開始的，所以 2 代表 3 月
        let bday = new Date(currentYear, 2, 15); 
        if (now > bday) { // 如果今年的生日已經過了，就往下一年算
            bday.setFullYear(currentYear + 1);
        }
        const bdayDiff = Math.ceil((bday - now) / (1000 * 60 * 60 * 24));
        document.getElementById('bday-countdown').innerText = `還有 ${bdayDiff} 天`;

        // 我的生日倒數 (2002/08/10) -> 7 代表 8 月
        let myBday = new Date(currentYear, 7, 10); 
        if (now > myBday) {
            myBday.setFullYear(currentYear + 1);
        }
        const myBdayDiff = Math.ceil((myBday - now) / (1000 * 60 * 60 * 24));
        document.getElementById('my-bday-countdown').innerText = `還有 ${myBdayDiff} 天`;

        // 週年紀念倒數 (2024/07/13) -> 6 代表 7 月
        let anniv = new Date(currentYear, 6, 13); 
        if (now > anniv) {
            anniv.setFullYear(currentYear + 1);
        }
        const annivDiff = Math.ceil((anniv - now) / (1000 * 60 * 60 * 24));
        const nextYearAnniv = anniv.getFullYear() - 2024; // 從 2024 開始算
        document.getElementById('anniv-countdown').innerText = `還有 ${annivDiff} 天 (邁向第 ${nextYearAnniv} 年!)`;
    }
    
    updateCountdowns();

    // --- 3. Scroll Animations (Intersection Observer) ---
    // 這個功能會在往下捲動時，讓照片跟故事卡片一張張「浮現」出來
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // 動畫只播放一次
            }
        });
    }, {
        threshold: 0.15, // 當元素露出 15% 時觸發
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 導覽列捲動效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(255, 255, 255, 0.7)';
        }
    });
});
