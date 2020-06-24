/**
 * @method Krylic.noFill()
 */
Krylic.prototype.noFill = function () {
    this.doFill = false;
    return this;
}


/**
 * @method Krylic.noStroke()
 */
Krylic.prototype.noStroke = function () {
    this.doStroke = false;
    return this;
}

/**
 * @method Krylic.fill()
 * @param {String|Number} r
 * @param {String|Number} g
 * @param {String|Number} b
 * @param {String|Number} a
 */
Krylic.prototype.fill = function (r, g, b, a) {
    let color = this._parseColor(r, g, b, a)

    // Gradient
    if (typeof r === 'object' && !(r instanceof CanvasGradient)) {
        let grad = k.ctx.createLinearGradient(100, 0, 0, 100);
        for (let i = 0; i < r.length; i++) {
            grad.addColorStop(i / r.length, r[i]);
        }
        this.ctx.fillStyle = grad;
        this.doFill = true;
        return true;
    }

    this.ctx.fillStyle = color;
    this.doFill = true;
    if (r === undefined) {
        this.ctx.fill();
        return this;
    }
    return this;
}

/**
 * @method Krylic.fill()
 * @param {String|Number} r
 * @param {String|Number} g
 * @param {String|Number} b
 * @param {String|Number} a
 */
Krylic.prototype.stroke = function (r, g, b, a) {
    let color = this._parseColor(r, g, b, a);

    // Gradient
    if (typeof r === 'object' && !(r instanceof CanvasGradient)) {
        let grad = k.ctx.createLinearGradient(100, 0, 0, 100);
        for (let i = 0; i < r.length; i++) {
            grad.addColorStop(i / r.length, r[i]);
        }
        this.ctx.strokeStyle = grad;
        this.doStroke = true;
        return true
    }
    this.ctx.strokeStyle = color;
    this.doStroke = true;
    if (r === undefined) {
        this.ctx.stroke();
        return this;
    }
    return this;
}


/**
 * @method Krylic.linearGradient()
 * @param {String} x
 * @param {String} y
 * @param {String} a
 * @param {String} s
 * @param {Array} colors
 */
Krylic.prototype.linearGradient = function (x, y, a, s, colors) {
    let grad = this.ctx.createLinearGradient(x, y, a, s);
    for (let i = 0; i < colors.length; i++) {
        let ratio = i / colors.length
        let percent = colors[i].split('-');
        if (percent[1] !== undefined) {
            ratio = percent[1];
        }
        grad.addColorStop(ratio, percent[0]);
    }
    return grad;
}

/**
 * @method Krylic.radialGradient()
 * @param {String} x
 * @param {String} y
 * @param {String} innerRadius
 * @param {String} outerRadius
 * @param {Array} colors
 */
Krylic.prototype.radialGradient = function (x, y, innerRadius, outerRadius, colors) {
    let grad = this.ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
    for (let i = 0; i < colors.length; i++) {
        let ratio = i / colors.length
        let percent = colors[i].split('-');
        if (percent[1] !== undefined) {
            ratio = percent[1];
        }
        grad.addColorStop(ratio, percent[0]);
    }
    return grad;
}

Krylic.prototype.shadow = function(x, y, blur, color) {
    this.ctx.shadowColor = color || "rgba(100,100,100,.4)";
    this.ctx.shadowOffsetX = x || 0;
    this.ctx.shadowOffsetY = y || 0;
    this.ctx.shadowBlur = blur || 0;
}

Krylic.prototype.noShadow = function() {
    this.ctx.shadowColor = "rgba(0, 0, 0, 0)";
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 0;
}


/**
 * @method Krylic.strokeWeight()
 * @param {Number} width
 */
Krylic.prototype.strokeWeight = function (width) {
    this.ctx.lineWidth = width;
    return this;
}

/**
 * @method Krylic.clear()
 * @param {String|Number} r
 * @param {String|Number} g
 * @param {String|Number} b
 * @param {String|Number} a
 */
Krylic.prototype.clear = function (r, g, b, a) {
    let c = this._parseColor(r, g, b, a);
    if (c) {
        this.ctx.fillStyle = c;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }
}

Krylic.prototype.rectMode = function (mode) {
    this.rectmode = mode;
}

/**
 * @method Krylic.rect()
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @param {Number} tl
 * @param {Number} tr
 * @param {Number} br
 * @param {Number} bl
 */
Krylic.prototype.rect = function (x, y, w, h, tl, tr, br, bl) {
    if (h === undefined) { h = w };
    if (tr === undefined) { tr = tl };
    if (br === undefined) { br = tr };
    if (bl === undefined) { bl = br };
    let hw = w/2;
    let hh = h/2;
    if (tl) {
        this.ctx.beginPath();
        if (this.rectmode === 'center') {
            this.ctx.moveTo(x-hw + tl, y-hh);
            this.ctx.arcTo(x-hw + w, y-hh, x-hw + w, y-hh + h, tr);
            this.ctx.arcTo(x-hw + w, y-hh + h, x-hw, y-hh + h, br);
            this.ctx.arcTo(x-hw, y-hh + h, x-hw, y-hh, bl);
            this.ctx.arcTo(x-hw, y-hh, x-hw + w, y-hh, tl);
        } else {
            this.ctx.moveTo(x + tl, y);
            this.ctx.arcTo(x + w, y, x + w, y + h, tr);
            this.ctx.arcTo(x + w, y + h, x, y + h, br);
            this.ctx.arcTo(x, y + h, x, y, bl);
            this.ctx.arcTo(x, y, x + w, y, tl);
        }

        this.doFill && this.ctx.fill();
        this.doStroke && this.ctx.stroke();
        this.ctx.closePath();
        return this;
    } else {
        this.ctx.beginPath();
        if (this.rectmode === 'center') {
            this.ctx.rect(x - w / 2, y - h / 2, w, h);
        } else {
            this.ctx.rect(x, y, w, h);
        }

        this.doFill && this.ctx.fill();
        this.doStroke && this.ctx.stroke();

        this.ctx.closePath();
        return this;
    }
}

/**
 * @method Krylic.triangle()
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 */
Krylic.prototype.triangle = function (x, y, w, h) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + (w / 2), y - h);
    this.ctx.lineTo(x + w, y);
    this.ctx.closePath();

    this.doFill && this.ctx.fill();
    this.doStroke && this.ctx.stroke();
}

/**
 * @method Krylic.circle()
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 */
Krylic.prototype.circle = function (x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.doFill && this.ctx.fill();
    this.doStroke && this.ctx.stroke();
    this.ctx.closePath();
    return this;
}

/**
 * @method Krylic.line()
 * @param {Number} x1
 * @param {Number} y2
 * @param {Number} x2
 * @param {Number} y2
 */
Krylic.prototype.line = function (x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.doFill && this.ctx.fill();
    this.doStroke && this.ctx.stroke();
    this.ctx.closePath();
    return this;
}

/**
 * @method Krylic.begin()
 */
Krylic.prototype.begin = function () {
    this.ctx.beginPath();
}

/**
 * @method Krylic.close()
 */
Krylic.prototype.close = function () {
    this.ctx.closePath();
}

/**
 * @method Krylic.from()
 * @param {Number} x
 * @param {Number} y
 */
Krylic.prototype.from = function (x, y) {
    console.log(typeof x)
    if (typeof x === 'object') {
        this.ctx.moveTo(x.x, x.y)
    }
    this.ctx.moveTo(x, y);
    return this;
}


/**
 * @method Krylic.to()
 * @param {Number} x
 * @param {Number} y
 */
Krylic.prototype.to = function (x, y) {
    if (typeof x === 'object') {
        this.ctx.lineTo(x.x, x.y)
    }
    this.ctx.lineTo(x, y)
    return this;
}

/**
 * @method Krylic.image()
 * @param {Image} img
 * @param {Number} sx
 * @param {Number} sy
 * @param {Number} sw
 * @param {Number} sh
 * @param {Number} dx
 * @param {Number} dy
 * @param {Number} dw
 * @param {Number} dh
 */
Krylic.prototype.image = function (img, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (!img.complete) {
        window.setTimeout(() => {
            if (arguments.length === 5) {
                this.image(img, sx, sy, sw, sh);
            } else {
                this.image(img, sx, sy, sw, sh, dx, dy, dw, dh);
            }
        }, 50);
        return;
    }
    if (arguments.length === 5) {
        this.ctx.drawImage(img, sx, sy, sw, sh);
    } else {
        this.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}

/**
 * @method Krylic.textAlign()
 * @param {String} value
 */
Krylic.prototype.textAlign = function (value) {
    this.ctx.textAlign = value;
}

/**
 * @method Krylic.textBaseline()
 * @param {String} value
 */
Krylic.prototype.textBaseline = function (value) {
    this.ctx.textBaseline = value;
}

/**
 * @method Krylic.textFont()
 * @param {String} value
 */
Krylic.prototype.textFont = function (font) {
    this.font[1] = font;
    return this;
}

/**
 * @method Krylic.textSize()
 * @param {Number} value
 */
Krylic.prototype.textSize = function (size) {
    this.font[0] = size + 'px';
    return this;
}

/**
 * @method Krylic.text()
 * @param {String} str
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 */
Krylic.prototype.text = function (str, x, y, w, h) {
    // this.ctx.textAlign = 'end';
    // this.ctx.textBaseline = 'bottom';
    this.ctx.font = this.font.join(' ');
    this.doFill && this.ctx.fillText(str, x, y, w, h)
    this.doStroke && this.ctx.strokeText(str, x, y, w, h)
    return this;
}

/**
 * @method Krylic.blendMode()
 * @param {Number} mode
 */
Krylic.prototype.blendMode = function (mode) {
    this.ctx.globalCompositeOperation = mode;
}

/**
 * @method Krylic.alpha()
 * @param {Float} value
 */
Krylic.prototype.alpha = function (value) {
    this.ctx.globalAlpha = value;
}

/**
 * @method Krylic.translate()
 * @param {Number} x
 * @param {Number} y
 */
Krylic.prototype.translate = function (x, y) {
    if (y === undefined) { y = x }
    this.ctx.translate(x, y);
    return this;
}

/**
 * @method Krylic.rotate()
 * @param {Number} deg
 */
Krylic.prototype.rotate = function (deg) {
    this.ctx.rotate(deg);
    return this;
}

/**
 * @method Krylic.transRot()
 * @param {Number} x
 * @param {Number} y
 * @param {Number} deg
 */
Krylic.prototype.transRot = function (x, y, deg) {
    this.ctx.translate(x, y);
    this.ctx.rotate(deg);
    return this;
}

/**
 * @method Krylic.push()
 */
Krylic.prototype.push = function () {
    this.ctx.save();
}

/**
 * @method Krylic.pop()
 */
Krylic.prototype.pop = function () {
    this.ctx.restore();
}

/**
 * @method Krylic.smooth()
 * @param {String} qulty
 */
Krylic.prototype.smooth = function (qulty) {
    if ('imageSmoothingEnabled' in this.ctx) {
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = qulty;
    }
}

/**
 * @method Krylic.noSmooth()
 */
Krylic.prototype.noSmooth = function () {
    if ('imageSmoothingEnabled' in this.ctx) {
        this.ctx.imageSmoothingEnabled = false;
    }
}