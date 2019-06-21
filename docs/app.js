((script, init) => {
    if (document.readyState !== 'loading') {
        return init(script);
    }
    document.addEventListener('DOMContentLoaded', () => { init(script); });
})(document.currentScript, (script) => {
    class PotionBoard extends HTMLElement {
        static Init(tagname = 'potion-board') { if (!customElements.get(tagname)) {
            customElements.define(tagname, this);
        } }
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: 'open' });
            const style = document.createElement('style');
            style.textContent =
                [
                    ':host { display: block; width: 100%; height: 100%; }',
                    ':host > div { position: relative; width: 100%; height: 100%; overflow: hidden; }',
                    ':host > div > div { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }',
                    '.back { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; grid-template-rows: 1fr 1fr 1fr 1fr; }',
                    '::slotted( potion-botttle ) { display: block; width: 25%; height: 25%; position: absolute; transition: top 0.5s, left 0.5s; }',
                    '::slotted( [ x = "0" ] ) { left: 0; }',
                    '::slotted( [ x = "1" ] ) { left: 25%; }',
                    '::slotted( [ x = "2" ] ) { left: 50%; }',
                    '::slotted( [ x = "3" ] ) { left: 75%; }',
                    '::slotted( [ y = "0" ] ) { top: 0; }',
                    '::slotted( [ y = "1" ] ) { top: 25%; }',
                    '::slotted( [ y = "2" ] ) { top: 50%; }',
                    '::slotted( [ y = "3" ] ) { top: 75%; }',
                ].join('');
            const back = document.createElement('div');
            back.classList.add('back');
            const front = document.createElement('div');
            front.appendChild(document.createElement('slot'));
            const contents = document.createElement('div');
            contents.appendChild(back);
            contents.appendChild(front);
            shadow.appendChild(style);
            shadow.appendChild(contents);
        }
    }
    PotionBoard.Init(script.dataset.tagname);
});
((script, init) => {
    if (document.readyState !== 'loading') {
        return init(script);
    }
    document.addEventListener('DOMContentLoaded', () => { init(script); });
})(document.currentScript, (script) => {
    class PotionBottle extends HTMLElement {
        static Init(tagname = 'potion-botttle') { if (!customElements.get(tagname)) {
            customElements.define(tagname, this);
        } }
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: 'open' });
            const style = document.createElement('style');
            style.textContent =
                [
                    ':host { display: block; width: 2rem; height: 2rem; }',
                ].join('');
            const contents = document.createElement('div');
            contents.style.width = '90%';
            contents.style.height = '90%';
            contents.style.backgroundColor = 'lightgray';
            shadow.appendChild(style);
            shadow.appendChild(contents);
        }
        get x() { return parseInt(this.getAttribute('x') || '') || 0; }
        set x(value) { this.setAttribute('x', value + ''); }
        get y() { return parseInt(this.getAttribute('y') || '') || 0; }
        set y(value) { this.setAttribute('y', value + ''); }
        get capacity() { return parseInt(this.getAttribute('capacity') || '') || 0; }
        set capacity(value) { this.setAttribute('capacity', value + ''); }
    }
    PotionBottle.Init(script.dataset.tagname);
});
((script, init) => {
    if (document.readyState !== 'loading') {
        return init(script);
    }
    document.addEventListener('DOMContentLoaded', () => { init(script); });
})(document.currentScript, (script) => {
    class SwipeArea extends HTMLElement {
        static Init(tagname = 'swipe-area') { if (!customElements.get(tagname)) {
            customElements.define(tagname, this);
        } }
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: 'open' });
            const style = document.createElement('style');
            style.textContent =
                [
                    ':host { display: block; width: 100%; height: 100%; }',
                    ':host( [ disable ] ) { pointer-events: none; }',
                ].join('');
            shadow.appendChild(style);
            this.cancel();
            let touched = false;
            this.addEventListener('touchstart', (event) => { touched = true; this.begin(event.touches[0].clientX, event.touches[0].clientY); });
            this.addEventListener('touchmove', (event) => { this.move(event.touches[0].clientX, event.touches[0].clientY); });
            this.addEventListener('touchend', (event) => { this.end(); });
            this.addEventListener('touchcancel', (event) => { this.cancel(); });
            let onmouse = false;
            this.addEventListener('mousedown', (event) => { onmouse = true; if (touched) {
                return;
            } this.begin(event.clientX, event.clientY); });
            this.addEventListener('mousemove', (event) => { if (!onmouse || touched) {
                return;
            } this.move(event.clientX, event.clientY); });
            this.addEventListener('mouseup', (event) => { if (!touched) {
                this.end();
            } touched = onmouse = false; });
            this.addEventListener('mouseleave', (event) => { this.cancel(); });
            this.addEventListener('contextmenu', (event) => { event.stopPropagation(); });
        }
        begin(x, y) {
            this.sx = this.ex = x;
            this.sy = this.ey = y;
        }
        move(x, y) {
            this.ex = x;
            this.ey = y;
        }
        end() {
            if (Number.isNaN(this.sx) || Number.isNaN(this.sy) || Number.isNaN(this.ex) || Number.isNaN(this.ey)) {
                return;
            }
            if (!(this.sx === this.ex && this.sy === this.ey)) {
                return;
            }
            if (this.distance ** 2 < (this.ex - this.sx) ** 2 + (this.ey - this.sy) ** 2) {
                return;
            }
            this.dispatchEvent(new CustomEvent('swipe', { detail: {
                    sx: this.sx,
                    sy: this.sy,
                    ex: this.ex,
                    ey: this.ey,
                    radian: Math.atan2(this.ex - this.sx, this.ey - this.sy),
                } }));
        }
        cancel() {
            this.sx = this.sy = this.ex = this.ey = NaN;
        }
        get disable() { return this.hasAttribute('disable'); }
        set disable(value) { if (value) {
            this.setAttribute('disable', 'disable');
        }
        else {
            this.removeAttribute('disable');
        } }
        get distance() { return parseInt(this.getAttribute('distance') || '') || 30; }
        set distance(value) { this.setAttribute('distance', value + ''); }
    }
    SwipeArea.Init(script.dataset.tagname);
});
class Game {
    constructor(app) {
        this.app = app;
        app.board().appendChild(app.createPotion(1, 1));
        app.board().appendChild(app.createPotion(1, 2));
    }
    rand(max = 4) { return Math.floor(Math.random() * max); }
    swipe(key) {
        console.log(key);
        const map = this.app.map();
        switch (key) {
            case Key.Up: return this.moveUp(map);
        }
        return [];
    }
    moveUp(map) {
        const removes = [];
        console.log(map.map((v) => { return v ? 1 : 0; }).join(''));
        for (let x = 0; x < 4; ++x) {
            for (let y = 1; y < 4; ++y) {
                const b = map[y * 4 + x];
                if (!b) {
                    continue;
                }
                for (let _ = y - 1; 0 <= _; --_) {
                    const a = map[_ * 4 + x];
                    if (a) {
                        if (this.canMerge(a, b)) {
                            this.merge(a, b);
                            b.x = x;
                            b.y = _;
                            map[y * 4 + x] = null;
                        }
                        else {
                            break;
                        }
                    }
                    else {
                        b.x = x;
                        b.y = _;
                        map[_ * 4 + x] = b;
                        map[(_ + 1) * 4 + x] = null;
                    }
                }
            }
        }
        console.log(map.map((v) => { return v ? 1 : 0; }).join(''));
        return removes;
    }
    canMerge(a, b) {
        return a.capacity + b.capacity <= 3;
    }
    merge(a, b) {
        a.capacity += b.capacity;
    }
}
var Key;
(function (Key) {
    Key[Key["Up"] = 0] = "Up";
    Key[Key["Down"] = 1] = "Down";
    Key[Key["Left"] = 2] = "Left";
    Key[Key["Right"] = 3] = "Right";
})(Key || (Key = {}));
class App {
    constructor(config) {
        this.config = config;
        this.game = null;
        this.initKey();
        this.initInput();
    }
    initKey() {
        this.keys =
            {
                37: Key.Left,
                65: Key.Left,
                38: Key.Up,
                87: Key.Up,
                39: Key.Right,
                68: Key.Right,
                40: Key.Down,
                83: Key.Down,
            };
    }
    initInput() {
        this.config.swipe.addEventListener('swipe', (event) => {
            if (!this.game) {
                return;
            }
            this.swipe(this.radianToKey(event.detail.radian));
        });
        document.addEventListener('keydown', (event) => {
            if (!this.game) {
                return;
            }
            const key = this.keys[event.keyCode];
            if (key === undefined) {
                return;
            }
            this.swipe(key);
        });
    }
    radianToKey(radian) {
        if (radian <= -Math.PI * 3 / 4) {
            return Key.Left;
        }
        if (radian <= -Math.PI / 4) {
            return Key.Up;
        }
        if (radian <= Math.PI / 4) {
            return Key.Right;
        }
        if (radian <= Math.PI * 3 / 4) {
            return Key.Down;
        }
        return Key.Left;
    }
    swipe(key) {
        if (!this.game) {
            return;
        }
        this.game.swipe(key).forEach((remove) => {
            this.board().removeChild(remove);
        });
    }
    start() {
        if (this.game) {
            return;
        }
        this.clear();
        this.game = new Game(this);
    }
    clear() {
        const board = this.board();
        const children = board.children;
        for (let i = children.length - 1; 0 <= i; --i) {
            board.removeChild(children[i]);
        }
    }
    board() { return this.config.board; }
    createPotion(x, y) {
        const potion = new (customElements.get('potion-botttle'))();
        if (x !== undefined && y != undefined) {
            potion.x = x;
            potion.y = y;
        }
        return potion;
    }
    map() {
        const map = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
        this.board().querySelectorAll('potion-botttle').forEach((potion) => {
            map[4 * potion.y + potion.x] = potion;
        });
        return map;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        customElements.whenDefined('potion-board'),
        customElements.whenDefined('potion-botttle'),
        customElements.whenDefined('swipe-area'),
    ]).then(() => {
        const app = new App({
            board: document.querySelector('potion-board'),
            swipe: document.querySelector('swipe-area'),
        });
        app.start();
    });
});
