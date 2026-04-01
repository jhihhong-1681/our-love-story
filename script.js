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
        
        // 更新 DOM
        document.getElementById('years').innerText = String(years).padStart(2, '0');
        document.getElementById('days').innerText = String(remainingDays).padStart(2, '0');
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
        document.getElementById('anniv-countdown').innerHTML = `還有 ${annivDiff} 天<br><span style="font-size: 0.9rem; font-weight: normal;">(邁向第 ${nextYearAnniv} 年!)</span>`;
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

    // --- 4. Scratch & Win Logic ---
    const prizes = [
        // 30% 男方特權 (6/20)
        "🎉 阿瑄請客：手搖飲一杯 (阿紘指定)",
        "🎉 恭喜中獎：獲得阿瑄專屬捏肩 10 分鐘",
        "🎉 阿瑄請客：今日午餐/晚餐由阿瑄買單！",
        "🎉 恭喜中獎：阿瑄需大喊阿紘超帥 3 次",
        "🎉 恭喜中獎：獲得「阿紘決策權」一次",
        "🎉 恭喜中獎：獲得阿瑄的無條件跑腿一次",
        // 70% 銘謝惠顧 (14/20)
        "💔 銘謝惠顧：請阿紘帶阿瑄去吃一頓好吃的",
        "💔 銘謝惠顧：阿紘必須請喝阿瑄最愛的手搖",
        "💔 好可惜：請阿紘幫阿瑄溫柔吹頭髮一次",
        "💔 沒中：阿紘化身專屬司機，接送一次",
        "💔 刮龜啦：阿紘必須請吃生乳捲或小蛋糕",
        "💔 差一點：交出溫暖抱抱 30 秒 (不得拒絕)",
        "💔 銘謝惠顧：獲得阿紘洗碗 / 整理桌面一次",
        "💔 再試一次：獲得阿紘陪逛街服務 (需具備耐心)",
        "💔 沒刮中：懲罰阿紘稱讚阿瑄 3 分鐘不間斷",
        "💔 差一點點：下次出遊由阿紘全面規劃行程",
        "💔 好可惜：阿紘今晚負責決定宵夜且買單",
        "💔 沒中：獲得阿紘精心拍攝美照 10 張",
        "💔 銘謝惠顧：阿紘必須獻唱一首情歌",
        "💔 再接再厲：獲得「阿紘無條件買單」$150"
    ];

    const fabBtn = document.getElementById('open-scratch');
    const modal = document.getElementById('scratch-modal');
    const closeBtn = document.getElementById('close-scratch');
    const canvas = document.getElementById('scratch-canvas');
    if(canvas){
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const resultDiv = document.getElementById('scratch-result');
        const playAgainBtn = document.getElementById('btn-play-again');
        
        let isDrawing = false;
        let isRevealed = false;

        function initScratchCard() {
            isRevealed = false;
            playAgainBtn.style.display = 'none';
            
            // Pick random prize
            const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
            const color = randomPrize.startsWith('🎉') ? '#ff4081' : '#636e72';
            resultDiv.innerHTML = `<span style="font-size:1.1rem; color:${color}; font-weight:bold;">${randomPrize}</span>`;
            
            // Setup canvas
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#e0e0e0'; // Silver
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = '22px "Noto Sans TC", sans-serif';
            ctx.fillStyle = '#888';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('用滑鼠或手指刮開看看 ✨', canvas.width / 2, canvas.height / 2);
        }
        
        initScratchCard();

        // Open/Close Modal
        fabBtn.addEventListener('click', () => {
            modal.classList.add('active');
            if (isRevealed) initScratchCard(); 
        });
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        playAgainBtn.addEventListener('click', initScratchCard);
        
        // Scratch logic
        function getMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            let clientX = e.clientX;
            let clientY = e.clientY;
            if(e.touches && e.touches.length > 0){
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }
            // Deal with CSS scaling differences if any
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            return {
                x: (clientX - rect.left) * scaleX,
                y: (clientY - rect.top) * scaleY
            };
        }

        function startDraw(e) {
            isDrawing = true;
            scratch(e);
        }

        function endDraw() {
            isDrawing = false;
            checkReveal();
        }

        function scratch(e) {
            if (!isDrawing || isRevealed) return;
            e.preventDefault(); // Prevent scrolling on touch
            const pos = getMousePos(e);
            
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2);
            ctx.fill();
        }

        function checkReveal() {
            if (isRevealed) return;
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let transparentPixels = 0;
            
            for (let i = 3; i < data.length; i += 4) {
                if (data[i] === 0) transparentPixels++;
            }
            
            const totalPixels = data.length / 4;
            const percentage = (transparentPixels / totalPixels) * 100;
            
            if (percentage > 40) { // 降低清除門檻到 40%
                isRevealed = true;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                playAgainBtn.style.display = 'block';
                
                // Confetti effect
                if (window.confetti) {
                    confetti({
                        particleCount: 150,
                        spread: 80,
                        origin: { y: 0.6 },
                        colors: ['#ff9a9e', '#fecfef', '#a18cd1', '#fbc2eb']
                    });
                }
            }
        }

        // Events
        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mousemove', scratch);
        canvas.addEventListener('mouseup', endDraw);
        canvas.addEventListener('mouseleave', endDraw);
        
        canvas.addEventListener('touchstart', startDraw, {passive: false});
        canvas.addEventListener('touchmove', scratch, {passive: false});
        canvas.addEventListener('touchend', endDraw);
    }

});
