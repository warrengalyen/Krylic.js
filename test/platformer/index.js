const k = new Krylic();
k.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
k.resize();

let playerImg = k.loadImage('./images/Idle_1.png');
let playerRunImg = k.loadImage('./images/run.png');
let playerJumpImg = k.loadImage('./images/glide.png');


let player = null;

function preload() {
    player = new Player(playerImg, playerRunImg, playerJumpImg);
    animate();
}

function onKeyPressed() {
//   if ( k.keyIsPressed(KEY_D) ) {
//     player.vel.add(new Vector(1, 0))
//     player.direction = 1;
//     player.running = true;
//   }
//   if ( k.keyIsPressed(KEY_A) ) {
//     player.vel.add(new Vector(-1, 0))
//     player.direction = -1;
//     player.running = true;
//   }

//   if ( k.keyIsPressed(KEY_SPACE) && player.canJump ) {
//     player.canJump = false;
//     player.vel.add(new Vector(0, -40))
//   };
}

function animate() {
    k.clear();

    player.update();
    player.render();

    k.loop(animate)
}
