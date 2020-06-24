const k = new Krylic();
k.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

let n = 1;
let t = 8;

k.clear(25);
let rotationAngle = random(10,140);

function animate() {

    let a = n * rotationAngle;
    let r = t * Math.sqrt(n);

    let x = r * Math.cos(a) + CANVAS_WIDTH / 2;
    let y = r * Math.sin(a) + CANVAS_HEIGHT / 2;

    k.blendMode(ADD);
    k.fill( hsla( a - r, 80, 50, 1) );
    k.noStroke();
    k.circle(x, y, 5);

    n++
    k.loop(animate);
}

for (let i = 0; i < 50; i++) {
    animate();
} 
