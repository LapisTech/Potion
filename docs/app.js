((script, init) => {
    if (document.readyState !== 'loading') {
        return init(script);
    }
    document.addEventListener('DOMContentLoaded', () => { init(script); });
})(document.currentScript, (script) => {
    ((component, tagname = 'dialog-box') => {
        if (customElements.get(tagname)) {
            return;
        }
        customElements.define(tagname, component);
    })(class DialogBox extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: 'open' });
            const style = document.createElement('style');
            style.innerHTML =
                [
                    ':host { background: rgba( 0, 0, 0, 0.8 ); display: block; opacity: 0; transition: opacity 0.5s; visibility: hidden; position: absolute; top: 0; left: 0; width: 100%; height: 100%; }',
                    ':host( [open] ) { visibility: visible; opacity: 1; }',
                    ':host > div { min-width: 20%; max-width: 90%; max-height: 90%; min-height: 1rem; }',
                ].join('');
            const contents = document.createElement('div');
            contents.appendChild(document.createElement('slot'));
            shadow.appendChild(style);
            shadow.appendChild(contents);
            contents.addEventListener('click', (event) => { event.stopPropagation(); });
            this.addEventListener('click', () => { this.close(); });
        }
        get open() { return this.hasAttribute('open'); }
        set open(value) { if (value) {
            this.setAttribute('open', 'open');
        }
        else {
            this.removeAttribute('open');
        } }
        close() { this.open = false; }
        show() { this.open = true; }
    }, script.dataset.tagname);
});
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
            this.shaking = false;
            const shadow = this.attachShadow({ mode: 'open' });
            const style = document.createElement('style');
            style.textContent =
                [
                    ':host { display: block; width: 2rem; height: 2rem; opacity: 1; --back: #1a1a1a; --front: #464646; }',
                    ':host > div { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; transition: opacity 0.5s; }',
                    ':host( [ disable ] ) > div { opacity: 0; }',
                    ':host( [ create ] ) > div > svg { width: 0; }',
                    ':host > div > svg { display: block; width: 100%; height: 100%; transition: width 0.5s; }',
                    ':host > div > svg g > path { transition: all 0.5s; }',
                    ':host( [ color="0" ] ) { --back: #c81f00; --front: #ff2800; }',
                    ':host( [ color="1" ] ) { --back: #bda700; --front: #ffe100; }',
                    ':host( [ color="2" ] ) { --back: #090094; --front: #0c00cc; }',
                    ':host( [ color="00" ] ) { --back: #aa1a00; --front: #db2200; }',
                    ':host( [ color="01" ] ) { --back: #c56300; --front: #ff8101; }',
                    ':host( [ color="02" ] ) { --back: #580158; --front: #800180; }',
                    ':host( [ color="11" ] ) { --back: #a28f00; --front: #efd300; }',
                    ':host( [ color="12" ] ) { --back: #014e01; --front: #018001; }',
                    ':host( [ color="22" ] ) { --back: #07006f; --front: #0b00b4; }',
                    ':host( [ color="000" ] ) { --back: #970000; --front: #d40000; }',
                    ':host( [ color="001" ] ) { --back: #ba4000; --front: #ff5700; }',
                    ':host( [ color="002" ] ) { --back: #781c39; --front: #ad2952; }',
                    ':host( [ color="111" ] ) { --back: #948300; --front: #cab200; }',
                    ':host( [ color="011" ] ) { --back: #a56e00; --front: #ffab01; }',
                    ':host( [ color="112" ] ) { --back: #568c01; --front: #80d101; }',
                    ':host( [ color="222" ] ) { --back: #040049; --front: #080088; }',
                    ':host( [ color="022" ] ) { --back: #372b5c; --front: #5c479a; }',
                    ':host( [ color="122" ] ) { --back: #00796c; --front: #009e8c; }',
                    ':host( [ neutralizer ] ) { --back: lightgray; --front: white; }',
                ].join('');
            const contents = document.createElement('div');
            contents.appendChild(this.createSVG());
            shadow.appendChild(style);
            shadow.appendChild(contents);
        }
        createSVG() {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttributeNS(null, 'viewBox', '0 0 100 100');
            svg.setAttributeNS(null, 'height', '100');
            svg.setAttributeNS(null, 'width', '100');
            svg.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid meet');
            const clippath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
            clippath.id = 'clip';
            clippath.appendChild(this.createPath('M 73.05507,5.055078 C 72.01136,5.055138 71.16529,5.901215 71.16523,6.944922 V 9.776953 L 57.09589,16.811719 C 53.20117,15.578212 49.14047,14.948643 45.05507,14.944922 C 22.96368,14.944922 5.05507,32.853533 5.05507,54.944922 C 5.05507,65.553581 9.26934,75.727738 16.7708,83.229193 C 24.27226,90.730648 34.44641,94.944922 45.05507,94.944922 C 55.66374,94.944922 65.83789,90.730648 73.33935,83.229193 C 80.84081,75.727738 85.05507,65.553581 85.05507,54.944922 C 85.03982,50.873078 84.40293,46.827435 83.1664,42.947852 L 90.22305,28.834766 H 93.05507 C 94.09879,28.834706 94.94486,27.988629 94.94492,26.944922 V 22.944922 C 94.94492,22.443705 94.7458,21.963018 94.3914,21.608594 L 78.3914,5.608594 C 78.03697,5.25419 77.5563,5.055087 77.05507,5.055078 Z', 'fill:#4d4d4d'));
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            defs.appendChild(clippath);
            svg.appendChild(defs);
            svg.appendChild(this.createPath('M 73.05488,1.0550781 C 69.84958,1.0552631 67.16541,3.7394388 67.16523,6.9447266 A 4.0004,4.0004 0 0 0 67.16523,6.9449219 V 7.3048828 L 56.71699,12.529102 C 52.92169,11.482361 49.00076,10.948512 45.05879,10.944922 A 4.0004,4.0004 0 0 0 45.05508,10.944922 C 20.80193,10.944922 1.05508,30.691772 1.05508,54.944922 C 1.05508,66.61291 5.69187,77.807103 13.94238,86.057617 C 22.1929,94.308133 33.38709,98.944922 45.05508,98.944922 C 56.72308,98.944922 67.91727,94.308133 76.16777,86.057617 C 84.41829,77.807103 89.05508,66.612909 89.05508,54.944922 A 4.0004,4.0004 0 0 0 89.05508,54.929883 C 89.04037,51.004155 88.49999,47.10073 87.45098,43.322852 L 92.69512,32.834766 H 93.05508 A 4.0004,4.0004 0 0 0 93.05527,32.834766 C 96.26057,32.834581 98.94474,30.150405 98.94492,26.945117 A 4.0004,4.0004 0 0 0 98.94492,26.944922 V 22.944922 C 98.94492,21.384363 98.32328,19.883714 97.21992,18.780273 A 4.0004,4.0004 0 0 0 97.21992,18.780078 L 81.21992,2.7800781 A 4.0004,4.0004 0 0 0 81.21973,2.7800781 C 80.11631,1.6767262 78.61555,1.0551061 77.05508,1.0550781 H 73.05508 A 4.0004,4.0004 0 0 0 73.05488,1.0550781 Z M 73.05508,5.0550781 H 77.05508 C 77.55631,5.0550871 78.03698,5.2541897 78.39141,5.6085938 L 94.39141,21.608594 C 94.74581,21.963018 94.94492,22.443705 94.94492,22.944922 V 26.944922 C 94.94486,27.988629 94.0988,28.834706 93.05508,28.834766 H 90.22305 L 83.16641,42.947852 C 84.40294,46.827435 85.03983,50.873078 85.05508,54.944922 C 85.05508,65.553581 80.84072,75.727647 73.33926,83.229102 C 65.8378,90.730557 55.66375,94.944922 45.05508,94.944922 C 34.44642,94.944922 24.27216,90.730557 16.7707,83.229102 C 9.26924,75.727647 5.05508,65.553581 5.05508,54.944922 C 5.05508,32.853533 22.96369,14.944922 45.05508,14.944922 C 49.14048,14.948643 53.20118,15.578212 57.0959,16.811719 L 71.16523,9.7769531 V 6.9449219 C 71.16529,5.9012149 72.01137,5.0551381 73.05508,5.0550781 Z', 'fill:#1a1a1a'));
            this.back = this.createPath(this.liquid(), 'fill:var(--back)');
            this.front = this.createPath(this.liquid(), 'fill:var(--front)');
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttributeNS(null, 'clip-path', 'url(#clip)');
            g.appendChild(this.back);
            g.appendChild(this.front);
            svg.appendChild(g);
            svg.appendChild(this.createPath('M 73.055078,5.0550781 C 72.011368,5.0551381 71.165294,5.9012149 71.165234,6.9449219 V 9.7769531 L 57.095898,16.811719 C 53.201178,15.578212 49.140478,14.948643 45.055078,14.944922 C 22.963688,14.944922 5.0550781,32.853533 5.0550781,54.944922 C 5.0550781,65.553581 9.2694384,75.727647 16.770898,83.229102 C 24.272358,90.730557 34.446418,94.944922 45.055078,94.944922 C 55.663748,94.944922 65.837798,90.730557 73.339258,83.229102 C 80.840718,75.727647 85.055078,65.553581 85.055078,54.944922 C 85.039828,50.873078 84.402936,46.827435 83.166406,42.947852 L 90.223047,28.834766 H 93.055078 C 94.098798,28.834706 94.944862,27.988629 94.944922,26.944922 V 22.944922 C 94.944922,22.443705 94.745806,21.963018 94.391406,21.608594 L 78.391406,5.6085938 C 78.036976,5.2541897 77.556308,5.0550872 77.055078,5.0550781 Z M 75.331836,9.2216797 H 76.111914 L 90.77832,23.888086 V 24.668164 H 90.223047 A 4.1670831,4.1670831 0 0 0 86.496289,26.971289 L 79.439648,41.084375 A 4.1670831,4.1670831 0 0 0 79.196484,44.213086 C 80.303384,47.685947 80.873781,51.307401 80.888281,54.952344 C 80.886301,64.454849 77.112594,73.563578 70.393164,80.283008 C 63.671984,87.004192 54.560268,90.77832 45.055078,90.77832 C 35.549898,90.77832 26.438172,87.004192 19.716992,80.283008 C 12.995792,73.561823 9.2216797,64.450114 9.2216797,54.944922 C 9.2216797,35.106611 25.213547,19.113528 45.051367,19.111523 C 48.711207,19.114856 52.348861,19.678965 55.837891,20.783984 A 4.1670831,4.1670831 0 0 0 58.959375,20.538477 L 73.028711,13.503711 A 4.1670831,4.1670831 0 0 0 75.331836,9.7769531 Z M 44.422266,24.951562 C 34.983286,25.150706 26.184449,29.784735 20.680469,37.455469 A 2.0002,2.0002 0 1 0 23.930469,39.787305 C 28.702499,33.136675 36.322911,29.123442 44.506641,28.950781 A 2.0002,2.0002 0 1 0 44.422266,24.951562 Z M 52.283984,25.899023 A 2,2 0 0 0 50.370117,27.381445 A 2,2 0 0 0 51.784375,29.830859 A 2,2 0 0 0 54.233789,28.416602 A 2,2 0 0 0 52.819727,25.967188 A 2,2 0 0 0 52.283984,25.899023 Z M 70.745703,64.051562 A 2.0002,2.0002 0 0 0 68.911719,65.282422 C 65.869829,72.302412 59.893546,77.624211 52.569336,79.835352 C 45.245106,82.046493 37.322382,80.920659 30.904102,76.756641 A 2.0002,2.0002 0 1 0 28.727148,80.112305 C 36.130568,84.915455 45.276981,86.215174 53.725391,83.664648 C 62.173791,81.114121 69.073046,74.970333 72.581836,66.872852 A 2.0002,2.0002 0 0 0 70.745703,64.051562 Z', 'fill:#f2f2f2'));
            return svg;
        }
        createPath(d, style) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttributeNS(null, 'd', d);
            path.setAttributeNS(null, 'style', style);
            return path;
        }
        liquid(type = 1) {
            const h = 90 - this.capacity * 20;
            const l = h + (type % 3 - 1) * 30;
            const r = h - (type % 3 - 1) * 30;
            return `M 0,${h} V 100 H 100 V ${h} C 50,${l} 50,${r} 0,${h} Z`;
        }
        shakeSync(type) {
            this.back.setAttributeNS(null, 'd', this.liquid(type));
            this.front.setAttributeNS(null, 'd', this.liquid(2 - type));
        }
        shake(type, wait) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.shakeSync(type);
                    resolve();
                }, wait);
            });
        }
        async update() {
            if (this.shaking) {
                return Promise.resolve();
            }
            this.shaking = true;
            this.shakeSync(0);
            await this.shake(2, 500);
            await this.shake(1, 500);
            this.shaking = false;
        }
        get x() { return parseInt(this.getAttribute('x') || '') || 0; }
        set x(value) { this.setAttribute('x', value + ''); }
        get y() { return parseInt(this.getAttribute('y') || '') || 0; }
        set y(value) { this.setAttribute('y', value + ''); }
        get capacity() { return parseInt(this.getAttribute('capacity') || '') || 0; }
        set capacity(value) { this.setAttribute('capacity', value + ''); }
        get color() { return this.getAttribute('color') || ''; }
        set color(value) { this.setAttribute('color', (value + '').split('').sort().join('')); }
        get neutralizer() { return this.hasAttribute('neutralizer'); }
        set neutralizer(value) { if (value) {
            this.setAttribute('neutralizer', 'neutralizer');
        }
        else {
            this.removeAttribute('neutralizer');
        } }
        get disable() { return this.hasAttribute('disable'); }
        set disable(value) { if (value) {
            this.setAttribute('disable', 'disable');
        }
        else {
            this.removeAttribute('disable');
        } }
        canMerge(potion) {
            if (this.disable || potion.disable) {
                return false;
            }
            return this.capacity + potion.capacity <= 3 ||
                (this.color === '012' && potion.color === '012') ||
                (this.neutralizer !== potion.neutralizer && 3 <= this.capacity && 3 <= potion.capacity);
        }
        merge(potion) {
            if (this.neutralizer !== potion.neutralizer) {
                this.remove();
            }
            else if (this.color === '012' && potion.color === '012') {
                this.toNeutralizer();
            }
            else {
                this.color += potion.color;
                this.capacity += potion.capacity;
            }
            potion.remove();
            return true;
        }
        remove() {
            this.disable = true;
            return new Promise((resolve) => {
                setTimeout(() => {
                    const p = this.parentElement;
                    if (p) {
                        p.removeChild(this);
                    }
                    resolve();
                }, 500);
            });
        }
        use() {
            return new Promise((resolve) => {
                setTimeout(() => { this.remove().then(resolve); }, 1000);
            });
        }
        create() {
            this.setAttribute('create', 'create');
            return new Promise((resolve) => {
                setTimeout(() => { this.removeAttribute('create'); resolve(); }, 500);
            });
        }
        isGood() {
            switch (this.color) {
                case '000':
                case '111':
                case '222':
                    return true;
            }
            return false;
        }
        toNeutralizer() {
            this.color = '';
            this.neutralizer = true;
        }
        static get observedAttributes() { return ['capacity', 'x', 'y']; }
        attributeChangedCallback(attrName, oldVal, newVal) {
            if (oldVal === newVal) {
                return;
            }
            this.update();
        }
    }
    PotionBottle.Init(script.dataset.tagname);
});
((script, init) => {
    if (document.readyState !== 'loading') {
        return init(script);
    }
    document.addEventListener('DOMContentLoaded', () => { init(script); });
})(document.currentScript, (script) => {
    ((component, tagname = 'scroll-box') => {
        if (customElements.get(tagname)) {
            return;
        }
        customElements.define(tagname, component);
    })(class ScrollBox extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: 'open' });
            const style = document.createElement('style');
            style.innerHTML =
                [
                    ':host { --back: rgba( 0, 0, 0, 0.8 ); --front: #a0a0a0; --size: 10px; display: block; width: 100%; height: fit-content; overflow: auto; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; }',
                    ':host::-webkit-scrollbar { overflow: hidden; width: var( --size ); height: var( --size ); background: var( --back ); border-radius: var( --size ); }',
                    ':host::-webkit-scrollbar-button { display: none; }',
                    ':host::-webkit-scrollbar-thumb { overflow: hidden; border-radius: var( --size ); background: var( --front ); }',
                    ':host::-webkit-scrollbar-corner { overflow: hidden; border-radius: var( --size ); background: var( --front ); }',
                ].join('');
            shadow.appendChild(style);
            shadow.appendChild(document.createElement('slot'));
        }
    }, script.dataset.tagname);
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
                    ':host( [ disable ] ) > div { pointer-events: none; }',
                    ':host > div { width: 100%; height: 100%; }',
                ].join('');
            const contents = document.createElement('div');
            contents.appendChild(document.createElement('slot'));
            shadow.appendChild(style);
            shadow.appendChild(contents);
            this.cancel();
            let touched = false;
            contents.addEventListener('touchstart', (event) => { touched = true; this.begin(event.touches[0].clientX, event.touches[0].clientY); });
            contents.addEventListener('touchmove', (event) => { this.move(event.touches[0].clientX, event.touches[0].clientY); });
            contents.addEventListener('touchend', (event) => { this.end(); });
            contents.addEventListener('touchcancel', (event) => { this.cancel(); });
            let onmouse = false;
            contents.addEventListener('mousedown', (event) => { onmouse = true; if (touched) {
                return;
            } this.begin(event.clientX, event.clientY); });
            contents.addEventListener('mousemove', (event) => { if (!onmouse || touched) {
                return;
            } this.move(event.clientX, event.clientY); });
            contents.addEventListener('mouseup', (event) => { if (!touched) {
                this.end();
            } touched = onmouse = false; });
            contents.addEventListener('mouseleave', (event) => { if (!onmouse) {
                return;
            } console.log(event); this.cancel(); });
            contents.addEventListener('contextmenu', (event) => { event.stopPropagation(); });
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
            if (this.sx === this.ex && this.sy === this.ey) {
                return;
            }
            if ((this.ex - this.sx) ** 2 + (this.ey - this.sy) ** 2 < this.distance ** 2) {
                return;
            }
            this.dispatchEvent(new CustomEvent('swipe', { detail: {
                    sx: this.sx,
                    sy: this.sy,
                    ex: this.ex,
                    ey: this.ey,
                    radian: Math.atan2(this.ey - this.sy, this.ex - this.sx),
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
        this.usecount = 0;
        this.nowmove = false;
        this.score =
            {
                '000': 0,
                '001': 0,
                '002': 0,
                '111': 0,
                '011': 0,
                '112': 0,
                '222': 0,
                '022': 0,
                '122': 0,
                neutralizer: 0,
                remove: 0,
            };
        this.add();
        this.add();
    }
    add() {
        const board = this.app.board();
        if (16 <= board.querySelectorAll('potion-botttle').length) {
            return false;
        }
        while (true) {
            const x = this.rand();
            const y = this.rand();
            if (board.querySelector(`potion-botttle[ x = "${x}" ][ y = "${y}" ]`)) {
                continue;
            }
            board.appendChild(this.app.createPotion(x, y, this.rand(3) + ''));
            break;
        }
        return true;
    }
    rand(max = 4) { return Math.floor(Math.random() * max); }
    canInput() {
        return this.usecount <= 0 && !this.nowmove;
    }
    swipe(key) {
        if (!this.canInput()) {
            return 0;
        }
        this.nowmove = true;
        const map = this.app.map().map((p) => { return p ? { potion: p, merged: [] } : null; });
        switch (key) {
            case Key.Up: return this.moveUp(map);
            case Key.Down: return this.moveDown(map);
            case Key.Left: return this.moveLeft(map);
            case Key.Right: return this.moveRight(map);
        }
        this.nowmove = false;
        return 0;
    }
    moveUp(map) {
        const count = this.move(map);
        this.moved(map);
        return count;
    }
    moveDown(map) {
        map = this.mapRotate(this.mapRotate(map));
        const count = this.move(map);
        map = this.mapRotate(this.mapRotate(map));
        this.moved(map);
        return count;
    }
    moveLeft(map) {
        map = this.mapRotate(map);
        const count = this.move(map);
        map = this.mapRotate(this.mapRotate(this.mapRotate(map)));
        this.moved(map);
        return count;
    }
    moveRight(map) {
        map = this.mapRotate(this.mapRotate(this.mapRotate(map)));
        const count = this.move(map);
        map = this.mapRotate(map);
        this.moved(map);
        return count;
    }
    move(map) {
        let count = 0;
        for (let x = 0; x < 4; ++x) {
            for (let y = 1; y < 4; ++y) {
                const b = map[y * 4 + x];
                if (!b) {
                    continue;
                }
                for (let _ = y - 1; 0 <= _; --_) {
                    const a = map[_ * 4 + x];
                    if (a) {
                        if (a.potion.canMerge(b.potion)) {
                            this.merge(a.potion, b.potion);
                            a.merged.push(b.potion);
                            ++count;
                            map[(_ + 1) * 4 + x] = null;
                        }
                        break;
                    }
                    else {
                        ++count;
                        map[_ * 4 + x] = b;
                        map[(_ + 1) * 4 + x] = null;
                    }
                }
            }
        }
        return count;
    }
    mapRotate(map) {
        [map[0], map[1], map[2], map[3], map[4], map[5], map[6], map[7], map[8], map[9], map[10], map[11], map[12], map[13], map[14], map[15]] =
            [map[12], map[8], map[4], map[0], map[13], map[9], map[5], map[1], map[14], map[10], map[6], map[2], map[15], map[11], map[7], map[3]];
        return map;
    }
    moved(map) {
        map.forEach((p, i) => {
            if (!p) {
                return;
            }
            const x = i % 4;
            const y = Math.floor(i / 4);
            p.potion.x = x;
            p.potion.y = y;
            p.merged.forEach((p) => { p.x = x; p.y = y; });
            if (3 <= p.potion.capacity && p.potion.isGood()) {
                ++this.usecount;
                p.potion.use().then(() => { --this.usecount; });
            }
        });
        this.nowmove = false;
        console.log(Object.keys(this.score).sort().map((k) => { return k + ':' + this.score[k]; }).join(' '));
    }
    merge(a, b) {
        a.merge(b);
        if (a.neutralizer) {
            ++this.score.neutralizer;
        }
        else if (a.hasAttribute('disable')) {
            ++this.score.remove;
        }
        else if (3 <= a.capacity) {
            ++this.score[a.color];
        }
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
        this.nowpause = false;
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
            if (!this.game || this.nowpause) {
                return;
            }
            this.swipe(this.radianToKey(event.detail.radian));
        });
        document.addEventListener('keydown', (event) => {
            if (event.shiftKey && event.keyCode === 82) {
                return UnregisterSW();
            }
            if (!this.game || this.nowpause) {
                return;
            }
            event.stopPropagation();
            const key = this.keys[event.keyCode];
            if (key === undefined) {
                return;
            }
            this.swipe(key);
        });
        document.body.addEventListener('touchmove', (event) => { event.preventDefault(); }, { passive: false });
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
        if (this.game.swipe(key) <= 0) {
            return;
        }
        if (!this.game.add()) {
            console.log('Gameover.');
        }
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
    pause() { this.nowpause = true; }
    resume() { this.nowpause = false; }
    createPotion(x, y, color = '') {
        const potion = new (customElements.get('potion-botttle'))();
        if (x !== undefined && y != undefined) {
            potion.x = x;
            potion.y = y;
            potion.color = color;
            potion.capacity = color.length;
            potion.create();
        }
        return potion;
    }
    map() {
        const map = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
        this.board().querySelectorAll('potion-botttle:not([disable])').forEach((potion) => {
            map[4 * potion.y + potion.x] = potion;
        });
        return map;
    }
}
((script) => {
    if (!script || !navigator.serviceWorker) {
        return;
    }
    const sw = script.dataset.sw;
    if (!sw) {
        return;
    }
    const version = (script.src || '').replace(/^[^\?]*(\?.*)$/, '$1');
    navigator.serviceWorker.register(sw + version, { scope: '.' }).then((registraion) => {
        registraion.update();
    });
})(document.currentScript);
async function UnregisterSW() {
    if (navigator.serviceWorker) {
        await navigator.serviceWorker.getRegistrations().then((registrations) => {
            return Promise.all(registrations.map((registration) => { registration.unregister(); }));
        });
    }
    if ('caches' in window) {
        await caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => { return caches.delete(key); }));
        });
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
