let img;

function preload() {
  img = loadImage("mikuY.jpg");
}

function setup() {
  createCanvas(img.width, img.height);

  makeDithered(img, 1);
  // Display the dithered image starting from (0, 0)
  image(img, 0, 0);
  // Apply gray filter to the whole canvas
  //filter(GRAY);
}

//Find the 1 dimensional index from a 2D array
function pixelIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

//Gets color from a certain pixel ---- RGB separation needed because JS array functions a certain way
function getIndexColor(img, x, y) {
  let idx = pixelIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

//Sets a certain color to pixel
function setIndexColor(img, x, y, clr) {
  let idx = pixelIndex(img, x, y);

  let pix = img.pixels;
  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(steps, value) {
  return round((steps * value) / 255) * floor(255 / steps);
}

//THE CORE FUNCTION TO CALL ALL OF THEM
function makeDithered(img, steps) {
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getIndexColor(img, x, y);
      let oldR = red(clr);
      let oldG = green(clr);
      let oldB = blue(clr);
      let newR = closestStep(steps, oldR);
      let newG = closestStep(steps, oldG);
      let newB = closestStep(steps, oldB);

      let newClr = color(newR, newG, newB);
      setIndexColor(img, x, y, newClr);

      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;

      distributeError(img, x, y, errR, errG, errB);
    }
  }
  img.updatePixels();
}

//Automate adding error on Floyd Steinberg Distribution
function distributeError(img, x, y, errR, errG, errB) {
  addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
  addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
  addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
  addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

//Function to add RGB error fraction(factor) on selected pixel
function addError(img, factor, x, y, errR, errG, errB) {
  let clr = getIndexColor(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);

  setIndexColor(img, x, y, clr);
}