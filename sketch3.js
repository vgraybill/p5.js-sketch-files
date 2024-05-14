/* export SVG
DDF 2019
need to have p5.svg.js in project and in index.html
see -https://github.com/zenozeng/p5.js-svg
this will save an SVG file in your download folder
*/
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let rand = getRandomInt(10, 50)

let w = 700; // Width of the canvas
let h = 900; // Height of the canvas
let noiseStrength = 500; // Strength of the noise effect
let numCurves = 50; // Number of bezier curves
let scl = 20; // Scale for noise values

function setup() {
  createCanvas(w, h, SVG);
  strokeWeight(2);
  stroke(0);
  noFill();
  rectMode(CENTER);
}

function draw() {


  for (let i = 0; i < numCurves; i++) {
    let t = i / (numCurves - 1);
    let yOffset = noise(t * 0.1) * noiseStrength;

    let x1 = 0;
    let y1 = i * h / (numCurves - 1);
    let x2 = w / 3;
    let y2 = y1 + yOffset;
    let x3 = 2 * w / 3;
    let y3 = y1 - yOffset /rand;
    let x4 = w /rand;
    let y4 = y1;

    bezier(x1, y1, x2, y2, x3, y3, x4, y4);
    bezier(x1+x4, y1, x2, y2*rand, x3, y3, x4*rand, y4);
  }

  save("meltyBezier.svg"); // give file name
  print("saved svg");
  noLoop(); // we just want to export once
}