const k = new Krylic();
k.createCanvas(650, 350);
let ctx = k.ctx;


let bg_image = k.loadImage('../src/bg_trees.png');
let bg_image_long = k.loadImage('../src/bg_trees_long.png');

let width = 0;
let height = 0;
let x = width/2;
function preload() {
    width = bg_image_long.naturalWidth;
    height = bg_image_long.naturalHeight;
    x = width/2;
    animate();
}

// let x = 650;

function animate() {
    k.clear();

    x += 5;
    console.log(x, width)
    if(x > width) {
        x = width/2
    }
    k.image(bg_image_long, x - width, -150, width, height)

    // x += 5;
    // if(x > width*2) {
    //   x = width
    // }
    // k.image(bg_image, x - 0, 50, width, height)
    // k.image(bg_image, x - width, 50, width, height)
    // k.image(bg_image, x - width*2, 50, width, height)

    k.loop(animate)
}
