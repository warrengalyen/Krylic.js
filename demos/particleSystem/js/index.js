let k = new Krylic();
k.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

let img = k.loadImage('./texture/emitter1.png')

function preload() {
    animate();
}

let ps = new ParticleSystem(CANVAS_WIDTH / 2, 400, img);


function animate() {
    k.clear('#151515');

    ps.setOrigin(mouseX, mouseY)

    for (let i = 0; i < 5; i++) {
        ps.addParticle();
    }
    ps.update();

    k.loop(animate);
} 
