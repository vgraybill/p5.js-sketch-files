/* export SVG
DDF 2019
need to have p5.svg.js in project and in index.html
see -https://github.com/zenozeng/p5.js-svg
this will save an SVG file in your download folder
*/

function setup() {
  createCanvas(1000, 1000, SVG); // Create SVG Canvas
  strokeWeight(1); // do 0.1 for laser
  stroke(0); // red is good for laser
  noFill(); // better not to have a fill for laser
  strokeWeight(1);
  rectMode(CENTER);
  let space = 50;
  for (let x = 0; x < width + 50; x += space) {
    for (let y = 0; y < height + 50; y += space) {
      line(x, y, x + space, y);
      line(x, y, x, y + space);
      //rect(x, y, 10, 10); // use rect instead of square
      //rect(x + space / 2, y + space / 2, 10, 10); // use rect instead of square
    }
  }
    //save("testprint2.svg"); // give file name
  print("saved svg");
  noLoop(); // we just want to export once
}

