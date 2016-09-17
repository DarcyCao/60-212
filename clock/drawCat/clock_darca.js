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
  t = loadTable("2DPointsOfCat.csv", "csv", "header");
  t1 = loadTable("tail.csv", "csv", "header");
  t2 = loadTable("backhead.csv", "csv", "header");
  t3 = loadTable("face.csv", "csv", "header");
  t4 = loadTable("frontpaw.csv", "csv", "header");
  t5 = loadTable("belly.csv", "csv", "header");
  t6 = loadTable("backpaw.csv", "csv", "header");
  t7 = loadTable("butt.csv", "csv", "header");

}

var flip = 1;
function getPointArrays(table, pointArr) {
  //mirror = 1
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
  // append(edge1, 46.06010891);
  // append(edge1, 36.86415294); //face end
  // edge1.concat(t4);
  //line(46.06010891,36.86415294, 32.55483062,39.73298485);
  
  
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
  //rotate(1.28); //initalize, here the body angle is 0
  //rotate(bodyAngle);
}

function drawFrontPaws() {
  push();
  rotate(radians(-90));
  
  translate(0, -50);
  ellipse(0,0,7,7);
  pop();
  // push();
  // ellipse(0,0,7,7);
  // //rotate(radians(90))
  // pop();
  if (mirror == 1) {
    //translate(0, 6);
    
    //rotate(radians(60))
      //###########fixed relative position!!!###########
  
    //rotate(radians(-mirror * diff / 2/90*60))
  }
  if (mirror == -1) {
     translate(0, 6);
    // ellipse(0, 0, 10, 10);
     //rotate(radians(-90/90*60));
    //rotate(radians(60))
      //###########fixed relative position!!!###########
  
    //rotate(radians((-1)*diff / 2)/90*60)
  }
    //rotate(radians((-1)*mirror*diff/2));
  fill(0,0,0);
  ellipse(0, 0, 3, 3);
  beginShape();
  fill(255, 226, 158);
  stroke(201, 166, 86);
  r = 0;
  while (r <= pa4.length) {
    curveVertex(pa4[r], pa4[r + 1]);
    r += 2;
  }
  endShape();
}

function drawBackPaws() {
  fill(255, 226, 158);
  if (mirror == 1) {
    //translate(-20, -10);
    //rotate(radians(-90));
    //ellipse(0, 0, 10, 10);
    //###########fixed relative position!!!###########
    //rotate(radians(diff/90*60));
  }
  else if (mirror == -1){
    //translate(-15, 10);
    //ellipse(0, 0, 10, 10);
    //rotate(radians(-60));
    //rotate(radians(90/90*60));
   // rotate(radians(diff/90*60));
  }
  beginShape();
  fill(255, 226, 158);
  stroke(201, 166, 86);
  r = 0;
  while (r <= pa6.length) {
    curveVertex(pa6[r], pa6[r + 1]);
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
  //noFill();
  r = 0;
  while (r <= pa5.length) {
    curveVertex(pa5[r], pa5[r + 1]);
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
  //drawSpine();

}

function drawSpine() {
  stroke(0, 0, 0);
  line(0, 0, -30, 100);
  line(-300, -90, 0, 0);
  // rotate(.5);
  // line(-300, -90,0,0);
  // rotate(-1.3);
  // line(-300, -90,0,0);
  // line(-100, -100,0,0);
  // line(-100, 20,0,0);
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
    //rotate(radians(180));
    bodyAngle = (180 + bodyAngle);
    diff = abs(360 - diff)/2
  }
  updatePointArrays();
}

var prevSec;
var millisRolloverTime;

function drawMouse() {
  stroke(150,150,150);
  noFill();
  bezier(0, -180, -7, -185, -14, -175, -21, -180);
  fill(100,100,100);
  ellipse(0,-180,10,10);
  
  // line(-10, -180, -3, -177);
  // line(-10, -180, -3, -183);
  // line(-3, -177, -3, -183);
  // fill(150,150,150);
  bezier(0, -185,11, -182, 11, -177, 0, -175);
  
}

var savedBodyAngle;
function draw() {
  noStroke();
  background(255, 200, 200);
  H = minute()%12 + second()/60// + MIL/1000;//hour();
  M = second()//+ MIL/1000;//minute();
  S = second();
  if (prevSec != S) {
    millisRolloverTime = millis();
  }
  prevSec = S;
  MIL = floor(millis() - millisRolloverTime);
  noStroke();
  fill(255, 255, 255);
  ellipse(width / 2, height / 2, radius, radius);
  
  stroke(0, 255, 0);
  ellipse(width / 2, height / 2, 4, 4);
  translate(width / 2, height / 2);
  stroke(0, 0, 0);
  GetAngles();
  Flip();
  rotate(1.28); //initalize, here the body angle is 0
  rotate(radians(bodyAngle));
  savedBodyAngle = bodyAngle;
  //print(bodyAngle);
  //push();
  drawStillBody();
  //pop();
  //push();
  drawTail();
  //pop();
  push();
  drawFrontPaws();
  pop();
  push();
  drawBackPaws();
  pop();
  

}