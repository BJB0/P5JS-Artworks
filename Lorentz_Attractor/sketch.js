let sigma = 10;
let rho = 28;
let beta = 8 / 3;
let dt = 0.01;

let maxPoints = 200;
let stepsPerFrame = 4;
let attractors = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 255);
  noFill();
  smooth();
  blendMode(ADD); // Enable real glow

  for (let i = 0; i < 3; i++) {
    let init = (i + 1) * 0.05;
    let hue = (i * 85 + 30) % 255;
    let c = color(hue, 200, 255);
    attractors.push(new Attractor(init, init, init, c));
  }
}

function draw() {
  background(0);
  orbitControl();
  rotateX(PI); // Flip to Z-up

  for (let a of attractors) {
    for (let i = 0; i < stepsPerFrame; i++) {
      a.update();
    }
    a.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
