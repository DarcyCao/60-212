var a = 50;
var b = 50;
var millisRolloverTime;
var cX; //x value of center
var cY; //y value of center
var radius = 380; //radius of white circle
// -----------------Array Related------------------
var t;
var t1;
var t2;
var t3;
var t4;
var t5;
var t6;
var row;
var x;
var y;
var pa = new Array();
var pa1 = new Array();
var pa2 = new Array();
var pa3 = new Array();
var pa4 = new Array();
var pa5 = new Array();
var pa6 = new Array();
var pa7 = new Array();
// -----------------Array Related------------------
var mirror; //1 or 0
var bodyAngle;
var diff;
var H;
var M;
var S;
var MIL;
var ha;
var ma;


function preload() {
  //pre load csv file generated from IGS file from solidworks
  t  = loadTable("https://raw.githubusercontent.com/DarcyCao/60-212/master/clock/drawCat/2DPointsOfCat.csv", "csv", "header");
  t1 = loadTable("https://raw.githubusercontent.com/DarcyCao/60-212/master/clock/drawCat/tail.csv", "csv", "header");
  t2 = loadTable("https://raw.githubusercontent.com/DarcyCao/60-212/master/clock/drawCat/backhead.csv", "csv", "header");
  t3 = loadTable("https://raw.githubusercontent.com/DarcyCao/60-212/master/clock/drawCat/face.csv", "csv", "header");
  t4 = loadTable("https://raw.githubusercontent.com/DarcyCao/60-212/master/clock/drawCat/frontpaw.csv", "csv", "header");
  t5 = loadTable("https://raw.githubusercontent.com/DarcyCao/60-212/master/clock/drawCat/belly.csv", "csv", "header");
  t6 = loadTable("https://raw.githubusercontent.com/DarcyCao/60-212/master/clock/drawCat/backpaw.csv", "csv", "header");
  t7 = loadTable("https://raw.githubusercontent.com/DarcyCao/60-212/master/clock/drawCat/butt.csv", "csv", "header");

}

var flip = 1;
function getPointArrays(table, pointArr) {
  for (var r = 0; r < table.getRowCount(); r++) {
    x = (-1) *  flip* (float(table.getString(r, 0)));
    y = (float(table.getString(r, 1)));
    append(pointArr, x);
    append(pointArr, y);
  }
}

var edge1 = [];
function updatePointArrays() {
  pa = [];
  pa1 = [];
  pa2 = [];
  pa3 = [];
  pa4 = [];
  pa5 = [];
  pa6 = [];
  pa7 = [];
  getPointArrays(t, pa);
  getPointArrays(t1, pa1); //tail
  getPointArrays(t2, pa2); //backhead
  getPointArrays(t3, pa3); //face
  getPointArrays(t4, pa4); //frontpaw
  getPointArrays(t5, pa5); //belly
  getPointArrays(t6, pa6); //backpaw
  getPointArrays(t7, pa7); //butt
  
}

function setup() {
  H = hour();
  M = minute();
  S = second();
  MIL = millis();
  mirror = 1;
  createCanvas(500, 500);
  millisRolloverTime = 0;
  updatePointArrays();
  GetAngles();
  Flip();
}

function drawFrontPaws() {
  push();
  rotate(radians(-90));
  translate(0, -50);
  pop();
  if (mirror == 1) {
    fill(30,30,30);
    translate(0, 6);
    rotate(radians(60))
      //###########fixed relative position!!!###########
    rotate(radians(-mirror * diff / 2/90*90))
  }
  if (mirror == -1) {
      fill(255, 226, 158);
     translate(0, 6);
     rotate(radians(-90/90*60));
    rotate(radians(60))
      //###########fixed relative position!!!###########
    rotate(radians((-1)*diff / 2)/90*90)
  }
  beginShape();
  stroke(201, 166, 86);
  r = 0;
  while (r <= pa4.length) {
    curveVertex(pa4[r], pa4[r + 1]);
    r += 2;
  }
  endShape();
  drawBelly();
}

function drawBackPaws() {
  if (mirror == 1) {
    fill(255, 226, 158);
    translate(-20, -10);
    rotate(radians(-90));
    rotate(radians(diff/90*90));
  }
  else if (mirror == -1){
    fill(30,30,30);
    translate(-15, 10);
    rotate(radians(-60));
    rotate(radians(90/90*60));
    rotate(radians(diff/90*90));
  }
  beginShape();
  stroke(201, 166, 86);
  r = 0;
  while (r <= pa6.length) {
    curveVertex(pa6[r], pa6[r + 1]);
    r += 2;
  }
  endShape();
  drawBelly2();
}

function drawBelly(){
  beginShape();
  noFill();
  r = 0;
  while (r <= pa5.length) {
    curveVertex(pa5[r], pa5[r + 1]);
    r += 2;
  }
  endShape();
}

function drawBelly2(){
  beginShape();
  noFill();
  r =pa5.length/2;
  while (r <= pa5.length) {
    curveVertex(pa5[r], pa5[r + 1]);
    r += 2;
  }
  endShape();
}


function drawTail() {
  beginShape();
  fill(255, 226, 158);
  stroke(201, 166, 86);
  r = 0
  while (r <= pa1.length) {
    //println(table.getString(r, c));
    curveVertex(pa1[r], pa1[r + 1]);
    r += 2;
  }
  endShape();
}

var oldBodyAngle;

function drawStillBody() {
  rotate(bodyAngle - oldBodyAngle);
  stroke(201, 166, 86);
  noFill();
  var r = 0;
  beginShape();
  while (r <= pa2.length) {
    curveVertex(pa2[r], pa2[r + 1]);
    r += 2;
  }
  r = 0;
  while (r <= pa3.length) {
    curveVertex(pa3[r], pa3[r + 1]);
    r += 2;
  }
  endShape();

  beginShape();
  r = 0;
  while (r <= pa7.length) {
    curveVertex(pa7[r], pa7[r + 1]);
    r += 2;
  }
  endShape();

}

function GetAngles() {
  ha = (H % 12 / 12) * 360;
  ma = (M / 60) * 360;
  bodyAngle = (ha + ma) / 2;
  diff = abs(ha - ma);

}

function Flip() {
  if (ha > ma) {
    mirror = 1;
  } else if (ha <= ma) {
    mirror = -1;
  }
  if (diff >= 180) {
    mirror = -1
    bodyAngle = (180 + bodyAngle);
    diff = abs(360 - diff)/2
  }
  updatePointArrays();
}

var prevSec;
var millisRolloverTime;
var mouseAngle;
function drawMouse() {
  push();
  mouseAngle = map(S+MIL/1000, 0, 60,0,360);
  rotate(radians(mouseAngle));
  print(mouseAngle);
  stroke(150,150,150);
  noFill();
  bezier(0, -180,-9, -180, -10, -184, -21, -180);
  fill(150,150,150);
  ellipse(0,-180,10,10);
  bezier(0, -185,11, -182, 11, -177, 0, -175);
  pop();
  
}


var r;
var g;
var b;
var savedBodyAngle;

function draw() {
  r = map(H+M/60+S/60+MIL/1000,0,60,100,255);
  g = map(H+M/60+S/60+MIL/1000,0,60,100,180);
  b = map(H+M/60+S/60+MIL/1000,0,60,140,180);
  noStroke();
  background(r, g, b);
  var a = map(MIL/1000, 0,1000,0, 180)
  H = hour()
  M = minute();
  S = second();
  if (prevSec != S) {
    millisRolloverTime = millis();
  }
  prevSec = S;
  MIL = floor(millis() - millisRolloverTime);
  noStroke();
  fill(255, 255, 255);
  ellipse(width / 2, height / 2, radius, radius);
  translate(width / 2, height / 2);
  drawMouse();
  stroke(0, 0, 0);
  GetAngles();
  Flip();
  rotate(1.28); //initalize, here the body angle is 0
  rotate(radians(bodyAngle));
  savedBodyAngle = bodyAngle;
  drawStillBody();
  drawTail();
  drawFrontPaws();
  drawBackPaws();
  pop();
  

}