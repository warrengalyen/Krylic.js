let n = 1;
let t = 8;
let rotationAngle = 135;

const k = new Krylic();
k.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
k.clear(25);


k.blendMode(ADD);
k.shadow(0, 0, 20, rgba(255,255,255,0.8));
k.noStroke();
k.fill(255);
k.textFont('Century Gothic');
k.textSize(100);
k.textAlign(CENTER);
k.textBaseline(MIDDLE);
k.text('Krylic.js', CANVAS_WIDTH/2, -20+CANVAS_HEIGHT/2);
k.textSize(25);
k.text('Canvas Rendering Engine', CANVAS_WIDTH/2, 50+CANVAS_HEIGHT/2);

function animate() {

    k.noShadow();
    let a = n * rotationAngle;
    let r = t * Math.sqrt(n);

    let x = r * Math.cos(a) + CANVAS_WIDTH / 2;
    let y = r * Math.sin(a) + CANVAS_HEIGHT / 2;

    k.fill( hsla( a - r, 80, 50, 0.3) );
    k.noStroke();
    k.circle(x, y, 5);

    n++
    k.loop(animate);
}

for (let i = 0; i < 15; i++) {
    animate();
}
