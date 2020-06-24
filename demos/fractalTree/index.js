const k = new Krylic();
k.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT-90);


let angle1 = document.getElementById('angle1');
let angle2 = document.getElementById('angle2');
let slider1 = document.getElementById('leftTrunk');
let slider2 = document.getElementById('rightTrunk');
let size = document.getElementById('size');


function animate() {
    k.clear('rgba(25,25,25,1)');

    k.push();
    k.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT);
    k.blendMode(ADD);
    branch(size.value);
    k.pop();

    k.loop(animate);
}
animate();

function branch(len) {
    k.stroke(['crimson', 'brown', 'black']);
    k.strokeWeight(len / 4);
    k.line(0, 0, 0, -len);
    k.translate(0, -len);

    if (len > 4) {
        k.push();
        k.rotate(angle1.value);
        branch(len * slider1.value);
        k.pop();
        k.push();
        k.rotate(-angle2.value);
        branch(len * slider2.value);
        k.pop();
    }
}
