function setup() {
  createCanvas(300, 300);
  millisRolloverTime = 0;
}

function drawCatBody(a, b) {
  noFill();
  bezier(a,b,90,10,10,300,200,200);
}

function drawCatTail(a, b) {
  noFill();
  bezier(a,b,90,10,10,300,200,200);
}

function drawCatFrontPaws(a, b) {
  noFill();
  bezier(a,b,90,10,10,300,200,200);
}

function drawCatBackPaws(a, b) {
  noFill();
  bezier(a,b,90,10,10,300,200,200);
}



function draw() {
  drawCatBody(a, b);
  drawCatTail(a, b);
  drawCatFrontPaw(a, b);
  drawCatBackPaw(a, b);
}



