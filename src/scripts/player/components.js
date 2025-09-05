import videojs from 'video.js';


const Component = videojs.getComponent('Component');



class ComponentManager {
    constructor(player) {
        this.player = player
    }
}



class TopSubLine extends Component {
    constructor(player, options = {}) {
        super(player, options);
        this._text = options.text || '';
    }

    createEl() {
        const el = super.createEl('div', {
            className: 'top-sub-line',
        });
        el.style.position = 'absolute';
        el.style.width = '100%'
        el.style["text-align"] = 'center'
        el.style.top = '2em';
        el.style.left = '1em';
        el.style.color = 'white';
        el.style.fontSize = '2em';
        el.style.zIndex = '10';
        el.textContent = this.options_.text || '';
        return el;
    }

    updateText(text) {
        this._text = text;
        this.el().textContent = text;
    }
}

class BottomSubLine extends TopSubLine {
    createEl() {
        const el = super.createEl('div', {
            className: 'bottom-sub-line',
        });
        el.style.top = ''
        el.style.bottom = '2em';
        return el;
    }
}



class OverlayButton extends Component {
    constructor(player, options = {}) {
        super(player, options);
        this._text = options.text || '';
    }

    createEl() {
        const el = super.createEl('button', {
            className: 'overlay-button',
        });
        el.style.position = 'absolute';
        el.style.border = '1px solid rgba(73, 107, 235, 0.9)'
        el.style.background = 'rgba(73, 107, 235, 0.2)'
        el.style.padding = "0.4em"
        el.style["border-radius"] = "0.3em"
        el.style["text-align"] = 'center'
        el.style.color = 'white';
        el.style.fontSize = '2em';
        el.style.zIndex = '10';
        el.textContent = this.options_.text || 'OVERLAY BUTTON';
        el.style['font-family'] = 'monospace'


        for (let key in this.options_.style) {
            el.style[key] = this.options_.style[key]
        }

        el.addEventListener("mouseenter", () => {
            el.style.background = this.options_.style.background_hover || "rgba(73, 107, 235, 0.4)";
        });

        el.addEventListener("mouseleave", () => {
            el.style.background = this.options_.style.background || 'rgba(73, 107, 235, 0.2)'
        });

        return el;
    }

}




videojs.registerComponent('TopSubLine', TopSubLine);
videojs.registerComponent('BottomSubLine', BottomSubLine);
videojs.registerComponent('OverlayButton', OverlayButton);
export { TopSubLine }