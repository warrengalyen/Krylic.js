// INIT KRYLIC
const k = new Krylic();
k.createCanvas(650, 350);

let x = 0;

animate();
function animate() {
    k.clear();

    k.blendMode(SCREEN);

    k.smooth('high');
    k.fill(55, 255, 155, 0.5);
    k.circle(100 * Math.sin(x * 0.1) + 200, 150, 50);
    k.stroke('deepskyblue').strokeWeight(5);

    k.circle(mouseX, mouseY, 50);

    k.ctx.lineCap = 'round';
    k.ctx.lineJoin = 'miter';
    k.stroke('blue').strokeWeight(5);
    k.line(0, 0, 150, 150);

    k.noStroke();

    let mapped = map(mouseX, 0, 650, 0, 100);

    // x, y, r1, r2
    let radgrad = k.radialGradient(150 + 50, 75, 75, 0,
        ['crimson-0.9', 'purple', 'deepskyblue']
    );
    k.fill(radgrad);
    k.rect(150, 20, 100, 100);

    let grad = k.linearGradient(mapped, mapped, 350, 0,
        ['crimson', 'purple', 'deepskyblue']
    );
    k.fill(grad)
    k.stroke(grad)
    k.strokeWeight(2);

    k.textFont('Arial');
    k.textSize(50);
    k.text('Hello World', 150, 200);

    k.textFont('Impact');
    k.textSize(50);
    k.text('Canvas', 150, 250);

    k.push();
    k.noStroke();
    k.fill('tomato')
    k.transRot(200, 200, x / 50);
    k.rect(-50, -50, 100, 100, 10);
    k.pop();

    k.fill('yellowgreen');
    k.noStroke();
    k.triangle(300, 100, 100, 60);

    k.noStroke();
    k.fill('red')
    k.circle(CANVAS_WIDTH/2, CANVAS_HEIGHT/2,5)

    k.fill('rgba(0,0,0,0.5)')
    k.textFont('Impact');
    k.ctx.textAlign = 'center'
    k.ctx.textBaseline = 'middle'
    k.textSize(50);
    k.text('Canvas', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    x++;


    k.loop(animate)
}
