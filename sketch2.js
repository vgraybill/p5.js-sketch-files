let img;

// Play aound with these parameters!  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

let lightnessThreshold = 200; // Adjust this threshold to control which values get circles and which don't
let circleDiameter = 3; // changes the diameter of the circles
let minStepSize = 5; // changes the minimum size of the circles and the step, don't set this too small, or it takes forever for the image to load and it might crash all together
let imgURL = "mcB.jpg" ; //Set img url or local image file, recommend nothing over 8 x 8 inches or it'll crash. Don't get rid of the quotation marks
let canvasX = 1000; //exported image width in pixels
let canvasY = 1400; //exported image length in pixels

// Play around with everything below at your own risk! EXCEPT the save("") function. Get rid of the '//' at the beginning to auto save the SVG file!

function preload() {
  img = loadImage(imgURL);
}

function setup() {
  createCanvas(canvasX, canvasY, SVG); // Create SVG Canvas
}

function draw() {
  background(255);
  let stepSize = floor(map(10, 100, width, minStepSize, 10));

  img.loadPixels();
  for (let x = 0; x < img.width; x += stepSize) {
    for (let y = 0; y < img.height; y += stepSize) {
      let i = (y * img.width + x) * 4;

      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];
      let a = img.pixels[i + 3];

      // Calculate lightness level
      let lightness = (r + g + b) / 3;

      // Check if the lightness level is above the threshold
      if (lightness > lightnessThreshold) {
        continue; // Skip drawing if above threshold
      }

      let d = circleDiameter; 

      let diameter = map(lightness, 0, 255, 0, stepSize);
      noFill(0);
      stroke(3);
      ellipse(
        map(x, 0, img.width, 0, width + 10),
        map(y, 0, img.height, 0, height + 10),
        diameter * d,
        diameter * d
      );
    }
  }
  //save("mcB.svg"); // give file name, uncomment to autosave SVG to downloads folder!
  noLoop(); // we just want to export once
}