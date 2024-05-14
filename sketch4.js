let w = 700;
let h = 900;

function setup() {
    createCanvas(w, h, SVG);
    strokeWeight(2);
    stroke(0);
    noFill();
    rectMode(CENTER);
}

function draw() {
    background(255);

    // Define parameters for the spiral
    let speed = 0.05; // Speed of rotation
    let maxRotation = TWO_PI * 100; // Total amount of rotation
  
    push();
    noStroke();
    pop();
  
    translate(width / 2, height / 2);
  
    let scalar = 20;
    for (let angle = 0; angle < maxRotation; angle += speed) {
        const x = cos(angle) * scalar;
        const y = sin(angle) * scalar;
        
        const x2 = cos(angle + speed) * (scalar + speed);
        const y2 = sin(angle + speed) * (scalar + speed);
        line(x, y, x2, y2);
        scalar += speed;
    }
    
    // Stop draw loop after one frame
    //save("spiral500x700.svg"); // give file name
    print("saved svg");
    noLoop();
}