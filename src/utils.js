const Krylic = require('./core');

/**
 * @method Krylic._parseColor()
 * @param {String|Number} r
 * @param {String|Number} g
 * @param {String|Number} b
 * @param {String|Number} a``
 */
Krylic.prototype._parseColor = function (r, g, b, a) {
    let color = r;
    if (typeof r === 'number') {
        color = rgba(r, g, b);
    }
    if (typeof r === 'number' && (g) && (!b) && (!a)) {
        a = g;
        color = rgba(r, r, r, g)
    }
    if (typeof r === 'number' && typeof g === 'number' && typeof b === 'number') {
        color = rgba(r, g, b, a)
    }
    return color;
}

/**
 * @method Krylic.keyIsPressed()
 * @param {Number} key
 */
Krylic.prototype.keyIsPressed = function (key) {
    // console.log(key, CURRENT_KEYS[key])
    if (CURRENT_KEYS[key] === true) {
        return true;
    }
    return false;
}

module.exports = Krylic;
