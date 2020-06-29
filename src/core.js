/**
 * Krylic.js
 * @version v1.6.0
 * @description Easy to use canvas renderer similar to p5.Renderer
 * @constructor Krylic()
 * @author Warren Galyen
 * @param {string?} canvas
 * @param {Number?} width
 * @param {Number?} height
 */
function Krylic(canvas, width, height) {
    // optional constructor
    if (!(this instanceof Krylic)) {
        return new Krylic(canvas);
    };

    if (canvas !== undefined) {
        if (typeof canvas === 'string') {
            this.canvas = document.querySelector(canvas);
        } else {
            this.canvas = canvas;
        }
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.canvas.width = CANVAS_WIDTH = this.width;
        this.canvas.height = CANVAS_HEIGHT = this.height;
    }

    // Variables
    this.idIndex = 0;
    this.screenBuffers = {};
    this.fireCallback = false;
    this.resCount = 0;
    // Rendering States
    this.doFill = true;
    this.doStroke = true;
    this.rectmode = 'CORNER';
    this.font = ['24px', 'Arial'];
    this.animateLoop = true;

    this.preload = function(){return null};


    this.trypreload();

    this._initCanvas();

}

/**
 * @method Krylic.trypreload();
 * preloads all the resources
 */
Krylic.prototype.trypreload = function() {
    if (window.preload || this.preload) {
        var timer = window.setInterval(function () {
            if (this.resCount <= 0) {
                var time = (performance.now() / 1000).toFixed(2);
                console.log('%cAll Resources Loaded in ' + time + 's', 'color : green');
                ((window.preload === undefined) ? this.preload : window.preload)();
                window.clearInterval(timer);
                return;
            }
        }.bind(this), 10);
    }
}

/**
 * @method Krylic.resize()
 * @param {Boolean} cull
 */
Krylic.prototype.resize = function (cull) {
    window.addEventListener('resize', function () {
        this.resizeCanvas(this.canvas, cull);
    }.bind(this));
    this.resizeCanvas(this.canvas, cull);
}

/**
 * @method Krylic.fullScreen()
 */
Krylic.prototype.fullScreen = function () {
    this.canvas.width = WINDOW_WIDTH - 2;
    this.canvas.height = WINDOW_HEIGHT - 2;
}

/**
 * @method Krylic.createCanvas()
 * @param {Number} w
 * @param {Number} h
 * creates a new Canvas Element with defined Width and Height
 */
Krylic.prototype.createCanvas = function (w, h) {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'KrylicCanvas-' + this.idIndex;
    this.canvas.width = w || 200;
    this.canvas.height = h || 200;
    CANVAS_WIDTH = this.canvas.width;
    CANVAS_HEIGHT = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    this.index++;
    return this;
}

/**
 * @method Krylic.createScreenBuffer()
 * @param {String} name
 * @param {Number} width
 * @param {Number} height
 * creates a new screenBuffer Element with defined Width and Height
 */
Krylic.prototype.createScreenBuffer = function (name, width, height) {
    let canvas = document.createElement('canvas');
    canvas.id = 'KrylicCanvasOffscreen-' + this.idIndex;
    canvas.width = width || this.canvas.width;
    canvas.height = height || this.canvas.height;
    // this.resizeCanvas(canvas);
    this.screenBuffers[name] = new Krylic(canvas, canvas.width, canvas.height);
    return this.screenBuffers[name];
}

/**
 * @method Krylic.putScreenBuffer()
 * @param {imageData} data
 * puts the screenBuffer data into main canvas
 */
Krylic.prototype.putScreenBuffer = function (data) {
    this.ctx.drawImage(data.canvas, 0, 0);
}

/**
 * @method Krylic._initCanvas();
 * fires window.animate callback when startup
 */
Krylic.prototype._initCanvas = function () {
    window.addEventListener('DOMContentLoaded', function () {
        if (window.animate && this.fireCallback) {
            animate();
        }
    }.bind(this));
}

/**
 * @method Krylic.noLoop();
 * stops animation loop
 */
Krylic.prototype.noLoop = function () {
    this.animateLoop = false;
}

/**
 * @method Krylic.loop()
 * @param {Function} func
 * starts animation loop
 */
Krylic.prototype.loop = function (func) {
    if (this.animateLoop) {
        if (window.animate) {
            return requestAnimationFrame(animate);
        } else {
            return requestAnimationFrame(func)
        }
    } else {
        this.animateLoop = true;
    }
    // return requestAnimationFrame(func);
}

/**
 * @method Krylic.resizeCanvas()
 * @param {Element} canvas
 * @param {Boolean} cull
 * resizes the canvas with 16:9 aspect ratio
 */
Krylic.prototype.resizeCanvas = function (canvas, cull) {
    let targetHeight = window.innerWidth * 9 / 16;

    if (window.innerHeight > targetHeight) {
        if (cull) {
            canvas.width = window.innerWidth;
            canvas.height = targetHeight;
        } else {
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = targetHeight + 'px';
        }
        canvas.style.left = '0px';
        canvas.style.top = (window.innerHeight - targetHeight) / 2 + 'px';
    } else {
        if (cull) {
            canvas.width = window.innerHeight * 16 / 9;
            canvas.height = window.innerHeight;
        } else {
            canvas.style.width = window.innerHeight * 16 / 9 + 'px';
            canvas.style.height = window.innerHeight + 'px';
        }
        canvas.style.left = (window.innerWidth - (canvas.width)) / 2 + 'px';
        canvas.style.top = '0px';
    }
}

module.exports = Krylic;
