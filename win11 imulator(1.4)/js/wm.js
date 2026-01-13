class WindowManager {
    constructor() {
        this.windows = {};
        this.zIndex = 100;
    }

    open(appId) {
        if (this.windows[appId]) {
            this.focus(appId);
            return;
        }

        const win = document.createElement('div');
        win.className = 'window active';
        win.id = `win-${appId}`;
        win.style.left = (50 + Math.random()*50) + 'px';
        win.style.top = (50 + Math.random()*50) + 'px';
        win.style.width = appId === 'edge' ? '900px' : '600px';
        win.style.height = appId === 'edge' ? '600px' : '400px';
        win.style.zIndex = ++this.zIndex;

        const content = window.getAppContent(appId);

        win.innerHTML = `
            <div class="title-bar" onmousedown="wm.dragStart(event, '${appId}')">
                <div class="win-title">${content.title}</div>
                <div class="win-controls">
                    <div class="ctrl-btn min" onclick="wm.toggle('${appId}')"></div>
                    <div class="ctrl-btn max" onclick="wm.max('${appId}')"></div>
                    <div class="ctrl-btn cls" onclick="wm.close('${appId}')"></div>
                </div>
            </div>
            <div class="win-body">
                ${content.html}
                <div class="app-watermark">made by nikika</div>
            </div>
        `;
        
        win.onmousedown = () => this.focus(appId);
        document.body.appendChild(win);
        this.windows[appId] = win;
    }

    close(appId) {
        if(this.windows[appId]) {
            this.windows[appId].remove();
            delete this.windows[appId];
        }
    }

    toggle(appId) {
        if(this.windows[appId]) {
            const win = this.windows[appId];
            win.style.display = win.style.display === 'none' ? 'flex' : 'none';
            if(win.style.display === 'flex') this.focus(appId);
        } else {
            this.open(appId);
        }
    }

    max(appId) {
        const win = this.windows[appId];
        if(win.style.width === '100%') {
            win.style.width = '600px'; win.style.height = '400px'; win.style.top='50px'; win.style.left='50px';
        } else {
            win.style.width = '100%'; win.style.height = 'calc(100% - 48px)'; win.style.top='0'; win.style.left='0';
        }
    }

    focus(appId) {
        if(this.windows[appId]) this.windows[appId].style.zIndex = ++this.zIndex;
    }

    dragStart(e, appId) {
        const win = this.windows[appId];
        if(win.style.width === '100%') return;
        let shiftX = e.clientX - win.getBoundingClientRect().left;
        let shiftY = e.clientY - win.getBoundingClientRect().top;
        function move(e) {
            win.style.left = e.pageX - shiftX + 'px';
            win.style.top = e.pageY - shiftY + 'px';
        }
        document.addEventListener('mousemove', move);
        document.onmouseup = () => document.removeEventListener('mousemove', move);
    }
}

window.wm = new WindowManager();