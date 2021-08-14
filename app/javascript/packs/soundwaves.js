require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")



let size = 1500;
let yF = 25;
let xF = 40
let yMag = size / yF * 1.6;
let p = 0;
let pF = 230;
let lines;
let moved = false;

function generateLines() {
  let lines = [];
  const yStep = size / yF;
  const xStep = size / (xF - 1);


  for (let r = 0; r < yF; r++) {
    let y = (r + 0.5) * yStep;
    let line = []
    let p = random(0,pF)
    for (let c = 0; c < xF; c++) {
      let h = (c === 0 || c == xF - 1) ? 0 : random(-yMag / 2, yMag / 2);
      let x = c * xStep

      line.push({
        x: x,
        y: y,
        h: h,
      })
    }
    lines.push({line, p})
  }
  return lines
}

function setup() {
  randomSeed(199);
  createCanvas(size, size);
  lines = generateLines();
}
function mouseMoved() {
  moved = true;
}

function draw() {
  background(256);

  let center = size / 2;
  let rMin = center * 0.1;
  let rMax = center * 0.9;
  let rMinSq = rMin * rMin;
  let rMaxSq = rMax * rMax;
  let d, dx, dy;

  for (let r = 0; r < lines.length; r++) {
    let poly = lines[r].line
  
    lines[r].p = (lines[r].p + random(0, 1));
    if (lines[r].p >= pF) {
      lines = generateLines()
      lines[r].p = 0;
    }
    let pN = tan(sin(lines[r].p / pF * PI));

    beginShape();
    noFill();
    //fill(0)
    for (let c = 0; c < poly.length; c++) {
      l = poly[c]
      dx = l.x - (moved ? mouseX : center);
      dy = l.y - (moved ? mouseY : center);
      d = dx * dx + dy * dy;
      d = map(d, rMinSq, rMaxSq, 1, 0, true)

      //curveVertex(l.x - 5, l.y + pN * l.h * d * 0.7);
      vertex(l.x, l.y + pN * l.h * d);
      
      if (l.h > 15 || l.h < -15) {
        circle(l.x, l.y + pN * l.h * d * 0.4, 1);
        circle(l.x, l.y, 1);
        line(l.x, l.y, l.x, l.y + pN * l.h * d * 1.2);
      }
      curveVertex(l.x, l.y + pN * l.h * d);

      let h = (c === 0 || c == lines[r].length - 1) ? 0 : random(-yMag / 2, yMag / 2);
      l.h = l.h * 0.7 + h * 0.3
    }
    endShape();
  }
}
