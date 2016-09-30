import processing.pdf.*;
import processing.dxf.*;

boolean bRecordingPDF;
boolean bRecordingDXF;
int dxfOutputCount = 0; 
int step;
float centerX1;
float centerY1;
float centerX2;
float centerY2;
float centerLen;
float scaler = 0.4;

void setup() {
  bRecordingPDF = true;
  bRecordingDXF = true;
  size(2000, 2500);
  step = 5;
  centerLen = 50;
}

void keyPressed() {
  // When you press a key, it will initiate a PDF export
  bRecordingPDF = true;
  bRecordingDXF = true;
}


//void drawGrid() {
//  for (int r = 0; r < height; r +=step ) {
//    for (int c = 0; c < width; c+=step) {
//      point(c, r);
//    }
//  }
//}



boolean clashWithCenter(float x, float y) {
  return ((x>centerX1 & x<centerX2) & 
    (y > centerY1 & y < centerY2));
}


FloatList startPoints;
float startCount;
float startRow;
float startCol;
int bundleCount;
float ran1;
float ran2;
float startSeed;
void getStartPoints() {
  startPoints = new FloatList();
  startSeed = 20;
  startCount = 6;//(int)(random(2,8))*2; //number of solder points that lines cannot touch 
  while (startPoints.size() < startCount) { //add more points
    ran1 = random(centerX1-startSeed, centerX2+startSeed)/step*step;
    ran2 = random(centerY1-startSeed, centerY2+startSeed)/step*step;
    if (true) {//(!clashWithCenter(ran1, ran2)) {
      startPoints.append(ran1);
      startPoints.append(ran2);
    }
  }
}


float circleSize = 70;
void drawCircle(float startX, float startY) {
  fill(#FFFFFF);
  triangle(startX, startY, startX - 4, startY+7, startX+4, startY+7);
}


float len;
int kx;
int ky;
int fold;
float b;
int foldCap;
//the lines are all based on grid, so the unit is the step in grid
//startX and startY is the grid count
void drawTrace(float startX, float startY) {
  drawCircle(startX, startY);
  noFill();
  strokeJoin(ROUND);
  beginShape();
  fold = 0;
  while (fold < foldCap && 
    (0 < startX && startX < width && 0 < startY && startY < height)) {
    vertex(startX, startY);
    if (fold == 1) {
    }
    if (startX > centerX1+ centerLen/2) {
      kx = 1;
    } else {
      kx = -1;
    }
    if (startY > centerY1+ centerLen/2) {
      ky = 1;
    } else {
      ky = -1;
    }
    len = random(50, 100)/step * step * scaler;
    b = random(1, 100);

    if (int(b)%4 == 0) {
      println(b);
      startX = startX + (-1)* kx * len;
      startY = startY + (-1)* ky * len;
    } else if (int(b)%4 == 1) {
      startX = startX + (-1)* kx * len;
      startY = startY - (-1)* ky * len;
    } else if (int(b)%4 == 2) {
      println(b);
      startX = startX + (-1)* kx * len;
    } else if (int(b)%4 == 3) {
      startY = startY + (-1)* ky * len;
    }
    fold++;
  }
  endShape();
  drawCircle(startX, startY);
}





void drawSet() {
    getStartPoints();
    for (int i = 0; i < startPoints.size(); i+=2) {
      drawTrace(startPoints.get(i), startPoints.get(i+1));
    }
}


void draw() {
  if (bRecordingDXF) {
    background(#FFFFFF);
    beginRecord(DXF, "Darcy" + dxfOutputCount + ".dxf");
    ////////////////111111111////////////////
    
    //centerY1 = 150;//height/2 - centerLen/2;
    //centerX2 = centerX1+centerLen;
    //centerY2 = centerY1+centerLen;
    //foldCap = 20;
    //for (int a = 0; a < 5; a++) {
    //    centerX1 = 100;
    //    centerY1 += 100;
    //    foldCap -= 3;
    //    for (int j = 0; j < 20; j++) {
    //      drawSet();
    //      centerX1 += 60;
    //    }
    //}
    ////////////////////////////////
    
    
    ////////////////222222222////////////////
    
    centerY1 = 180;//height/2 - centerLen/2;
    centerX2 = centerX1+centerLen;
    centerY2 = centerY1+centerLen;
    foldCap = 4;
    strokeWeight(1);
    for (int a = 0; a < 4; a++) {
        centerX1 = 330;
        centerY1 += 200;
        foldCap += 1;
        for (int j = 0; j < 10; j++) {
          drawSet();
          centerX1 += 150;
        }
    }
    
    foldCap = 8;
    for (int a = 0; a < 4; a++) {
        centerX1 = 330;
        centerY1 += 200;
        foldCap -= 1;
        for (int j = 0; j < 10; j++) {
          drawSet();
          centerX1 += 150;
        }
    }
    ////////////////////////////////
    endRecord();
    bRecordingPDF = false;
    bRecordingDXF = false;
    dxfOutputCount++;
  }
}











////don't worry about solder points for now, focus on get the bundles done!!
//IntList solderPoints;
//float solderCount;
//float solderRow;
//float solderCol;
//int bundle;
//void solderPoints() {
//  solderPoints = new IntList();
//  solderCount = (int)(random(30, 60)); //number of solder points that lines cannot touch 
//  while (startPoints.size() < solderCount) { //add more points
//  }
//}