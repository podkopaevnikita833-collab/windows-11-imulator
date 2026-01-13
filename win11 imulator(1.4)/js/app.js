// Конфигурация иконок
const apps = [
    {id: 'pc', name: 'This PC', icon: '<span>📁</span>', action: 'explorer'},
    {id: 'edge', name: 'Nikika Edge', icon: '<img src="logo.png" onerror="this.src=\'https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg\'">', action: 'edge'},
    {id: 'notepad', name: 'Word', icon: '<span>📝</span>', action: 'notepad'},
    {id: 'cmd', name: 'Terminal', icon: '<span>💻</span>', action: 'cmd'},
    {id: 'trash', name: 'Trash', icon: '<span>🗑️</span>', action: 'trash'},
    {id: 'calc', name: 'Calc', icon: '<span>🧮</span>', action: 'calc'}
];

// Генерация иконок
const desk = document.getElementById('desktop');
const pinned = document.getElementById('start-pinned');

apps.forEach((app, i) => {
    // Рабочий стол
    if(app.id !== 'calc') {
        const d = document.createElement('div');
        d.className = 'd-icon';
        d.style.left = '10px';
        d.style.top = (10 + i * 100) + 'px';
        d.innerHTML = `${app.icon}<p>${app.name}</p>`;
        d.ondblclick = () => wm.open(app.action);
        desk.appendChild(d);
    }
    // Меню Пуск
    const p = document.createElement('div');
    p.className = 'p-app';
    p.innerHTML = `${app.icon}<span>${app.name}</span>`;
    p.onclick = () => { wm.open(app.action); toggleStart(false); };
    pinned.appendChild(p);
});

// Контент окон
window.getAppContent = function(appId) {
    switch(appId) {
        case 'edge':
            return {
                title: 'Nikika Edge',
                html: `
                    <div class="edge-nav">
                        <button onclick="document.getElementById('fr').src='pages/home.html'">🏠</button>
                        <input type="text" class="edge-url" value="https://nikika-edge.net" readonly>
                    </div>
                    <iframe id="fr" class="edge-frame" src="pages/home.html"></iframe>
                `
            };
        case 'cmd':
            return {
                title: 'Terminal',
                html: `
                <div style="background:black; color:#0f0; height:100%; padding:10px; font-family:monospace; overflow-y:auto;" onclick="document.getElementById('cmd-in').focus()">
                    <div>Windows PowerShell [Version 1.0]</div><br>
                    <div id="cmd-hist"></div>
                    <div style="display:flex;"><span>User></span><input id="cmd-in" style="background:transparent; color:#0f0; border:none; outline:none; flex:1; font-family:monospace;" onkeydown="handleCmd(event)"></div>
                </div>`
            };
        case 'notepad':
            return { title: 'Notepad', html: '<textarea style="width:100%; height:100%; border:none; padding:10px; resize:none; outline:none; font-family:monospace;"></textarea>' };
        default:
            return { title: 'App', html: '<h1>App not found</h1>' };
    }
};

window.handleCmd = function(e) {
    if(e.key === 'Enter') {
        const val = e.target.value.trim();
        const hist = document.getElementById('cmd-hist');
        hist.innerHTML += `<div>User> ${val}</div>`;
        if(val === 'clear') {
            if(window.isVirusActive) {
                window.clearVirus();
                hist.innerHTML += `<div style="color:lime">✅ ВИРУС УДАЛЕН. СИСТЕМА СПАСЕНА.</div>`;
            } else { hist.innerHTML = ''; }
        } else { hist.innerHTML += `<div>Команда не найдена. Попробуйте 'help'.</div>`; }
        e.target.value = '';
    }
}