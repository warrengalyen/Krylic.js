# Krylic.js
## Javascript Rendering Engine

JavaScript Canvas Rendering Engine Krylic.js 

> Inspired by p5.js

## Getting Started
```javascript
  const k = new Krylic();
  // k.createcanvas(width, height, appendTo:domElement) 
  k.createCanvas(800, 600);
  
  k.resize(true);
  
  function animate() {
    k.clear();
    k.rect(100, 100, 100, 100, 10);
    
    k.circle(100, 100, 20);
    k.loop(animate);
  }
  animate();
```


## Loading Assets
```javascript
  const k = new Krylic();
  k.createCanvas(800, 600);
  let img = k.loadImage('path_to_img.png')
  function preload() {
    animate();
  }
  
  function animate() {
    k.clear();
    k.image(myImg, 0, 0, 200, 200);
    k.loop(animate);
  }
  animate();
```


### Utility Functions

> rgba(r, g, b, a)
> hsla(h, s, l, a)
> randomRGB()
> randomHSLA(a)

> norm(value, min, max)
> lerp(norm, min, max)
> map(value, sMin, sMax, dMin, dMax)
> dist(px, py, qx, qy)

> intersects(r1, r2)
> random(min, max)
> randomInt(min, max)
> clamp(value, min, max)

> tween(pos, target, speed)
