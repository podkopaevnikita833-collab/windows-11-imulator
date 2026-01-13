window.isVirusActive = false;
let virusTimer, chaosInterval, countdownInterval, timeLeft = 60;

window.onload = () => {
    // 1. Убираем загрузку
    setTimeout(() => {
        document.getElementById('boot-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('boot-screen').style.display = 'none', 500);

        // 2. ПОКАЗЫВАЕМ ПЛАШКУ made by nikika
        const splash = document.getElementById('dev-splash');
        splash.style.display = 'block';
        setTimeout(() => {
            splash.style.opacity = '0';
            splash.style.transition = 'opacity 0.5s';
            setTimeout(() => splash.style.display = 'none', 500);
        }, 3000);

    }, 1500);
    updateClock();
};

function updateClock() {
    let now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    setTimeout(updateClock, 1000);
}

window.toggleStart = function(force) {
    const menu = document.getElementById('start-menu');
    if (typeof force === 'boolean') {
        force ? menu.classList.add('show') : menu.classList.remove('show');
    } else {
        menu.classList.toggle('show');
    }
}

// ВИРУС
window.triggerVirus = function() {
    if(window.isVirusActive) return;
    window.isVirusActive = true;
    timeLeft = 60;
    
    document.getElementById('virus-notification').style.display = 'block';
    
    countdownInterval = setInterval(() => {
        timeLeft--;
        const disp = document.getElementById('timer-display');
        if(disp) disp.innerText = timeLeft;
        if(timeLeft <= 0) clearInterval(countdownInterval);
    }, 1000);

    virusTimer = setTimeout(startChaos, 60000);
}

window.clearVirus = function() {
    window.isVirusActive = false;
    document.getElementById('virus-notification').style.display = 'none';
    clearTimeout(virusTimer);
    clearInterval(countdownInterval);
    clearInterval(chaosInterval);
}

function startChaos() {
    document.getElementById('hacked-screen').style.display = 'flex';
    chaosInterval = setInterval(() => {
        const folder = document.createElement('div');
        folder.className = 'spam-folder';
        folder.innerHTML = '<span>📁</span>HACKED';
        folder.style.left = Math.random() * (window.innerWidth - 60) + 'px';
        folder.style.top = Math.random() * (window.innerHeight - 70) + 'px';
        document.getElementById('desktop').appendChild(folder);
    }, 100);
}