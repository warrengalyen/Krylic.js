let k = new Krylic();
k.createCanvas(1280, 720);
k.resize();

let runSheet = k.loadImage('./images/run_spritesheet.png');

let sprite = null;
function preload() {
    sprite = new Sprite({
        img: runSheet,
        x: 0, y: 0,
        cols: 10, rows: 1,
        ticksPerFrame: 3,
        resizeBy: 1
    });

    animate();
}

let frameIndex = 0;
function animate() {
    k.clear();

    sprite.animate();
    sprite.draw();

    frameIndex = k.loop(animate);
} 
