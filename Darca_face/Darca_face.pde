//
// a template for receiving face tracking osc messages from
// Kyle McDonald's FaceOSC https://github.com/kylemcdonald/ofxFaceTracker
//
// 2012 Dan Wilcox danomatika.com
// for the IACD Spring 2012 class at the CMU School of Art
//
// adapted from from Greg Borenstein's 2011 example
// http://www.gregborenstein.com/
// https://gist.github.com/1603230
//
import oscP5.*;
OscP5 oscP5;
import processing.video.*;
Capture cam;

// num faces found
int found;
float[] rawArray;
float[] tempArray;
FloatList rawBorderArray;
FloatList waveBorderArray;
IntList indexArray;
FloatList otherHalfArray;
float mid;
int tempPixel;


int highlighted; //which point is selected

// pose
float poseScale;
PVector posePosition = new PVector();
PVector poseOrientation = new PVector();

// gesture
float mouthHeight;
float mouthWidth;
float eyeLeft;
float eyeRight;
float eyebrowLeft;
float eyebrowRight;
float jaw;
float nostrils;

void setup() {
  size(640, 480);
  frameRate(30);

  oscP5 = new OscP5(this, 8338);
  oscP5.plug(this, "found", "/found");
  oscP5.plug(this, "rawData", "/raw");
  oscP5.plug(this, "poseScale", "/pose/scale");
  oscP5.plug(this, "posePosition", "/pose/position");
  oscP5.plug(this, "poseOrientation", "/pose/orientation");
  oscP5.plug(this, "mouthWidthReceived", "/gesture/mouth/width");
  oscP5.plug(this, "mouthHeightReceived", "/gesture/mouth/height");
  oscP5.plug(this, "eyeLeftReceived", "/gesture/eye/left");
  oscP5.plug(this, "eyeRightReceived", "/gesture/eye/right");
  oscP5.plug(this, "eyebrowLeftReceived", "/gesture/eyebrow/left");
  oscP5.plug(this, "eyebrowRightReceived", "/gesture/eyebrow/right");
  oscP5.plug(this, "jawReceived", "/gesture/jaw");
  oscP5.plug(this, "nostrilsReceived", "/gesture/nostrils");
  
  String[] cameras = Capture.list();
  
  if (cameras.length == 0) {
    println("There are no cameras available for capture.");
    exit();
  } else {
    cam = new Capture(this, 640, 480, cameras[0]);
    cam.start();     
  }     
}



void draw() {  
  background(255);
  stroke(0);
  if (cam.available() == true) {cam.read();}
  set(0, 0, cam);
  
  if(found != 0) 
  {//totally 132 elements in rawArray, 66 points
    getRawBorderData();
    
    //getMirrorBorder();
    randomness();
    drawMask();
    otherHalf();
    //drawMask2();
    for (int val = 0; val < rawArray.length -1; val+=2) {
      if (val == highlighted) { 
        //fill(0, 255, 0);
      } else {
        noFill();
      }
      noStroke();
    }
  }
  
}



public void found(int i) {
  println("found: " + i);
  found = i;
}

public void rawData(float[] raw) {
  rawArray = raw; // stash data in array
}

float chinWidth;
float foreheadWidth;
float noseWidth;
void getRawBorderData() {
  tempArray = rawArray;
  rawBorderArray = new FloatList();
  indexArray = new IntList(); //16,
  
  chinWidth = abs(rawArray[8]-rawArray[24]);
  foreheadWidth = abs(rawArray[0]-rawArray[32]);
  noseWidth = abs(rawArray[62]-rawArray[70]);
  rawBorderArray.append(rawArray[16]);
  rawBorderArray.append(rawArray[17]);
  rawBorderArray.append(rawArray[16]+3);
  rawBorderArray.append(rawArray[17]-(rawArray[17]-rawArray[115])/3);
  rawBorderArray.append(rawArray[16]-3);
  rawBorderArray.append(rawArray[17]-(rawArray[17]-rawArray[115])*2/3); //[10][11]
  rawBorderArray.append(rawArray[114]);
  rawBorderArray.append(rawArray[115]);//12 13
  rawBorderArray.append(rawArray[128]-3);
  rawBorderArray.append(rawArray[129]);//14 15
  rawBorderArray.append((rawArray[128]+rawArray[122])/2-8);
  rawBorderArray.append((rawArray[129]+rawArray[123])/2);
  rawBorderArray.append(rawArray[122]-5);
  rawBorderArray.append(rawArray[123]);//16 17
  rawBorderArray.append(rawArray[102]);
  rawBorderArray.append(rawArray[103]);//18 19 mouth
  rawBorderArray.append(rawArray[64]);
  rawBorderArray.append(rawArray[65]);
  rawBorderArray.append(rawArray[66]);
  rawBorderArray.append(rawArray[67]-5);
  rawBorderArray.append(rawArray[60]+noseWidth/3);
  rawBorderArray.append(rawArray[71]-10);//nose tip
  rawBorderArray.append(rawArray[60]+noseWidth/2);
  rawBorderArray.append(rawArray[61]);
  rawBorderArray.append(rawArray[58]+noseWidth/2-5);
  rawBorderArray.append(rawArray[59]);
  rawBorderArray.append(rawArray[54]+noseWidth/2-18);
  rawBorderArray.append(rawArray[55]-5); //nose bridge 20~32
  rawBorderArray.append((rawArray[42]+rawArray[44])/2);
  rawBorderArray.append((rawArray[43]+rawArray[45])/2+10);//33 34 eyebrow
  rawBorderArray.append((rawArray[42]+rawArray[44])/2+5);
  rawBorderArray.append((rawArray[43]+rawArray[45])/2-5);//33 34 eyebrow bone
  rawBorderArray.append((rawArray[42]+rawArray[44])/2);
  rawBorderArray.append((rawArray[43]+rawArray[45])/2-40);//
  rawBorderArray.append((rawArray[42]+rawArray[44])/2);
  rawBorderArray.append((rawArray[43]+rawArray[45])/2-70);//
  rawBorderArray.append((rawArray[42]+rawArray[44])/2);
  rawBorderArray.append((rawArray[43]+rawArray[45])/2-300);//hairline
  rawBorderArray.append((rawArray[42]+rawArray[44])/2+1000);
  rawBorderArray.append((rawArray[43]+rawArray[45])/2-300);//hairline
  rawBorderArray.append(1000);
  rawBorderArray.append(0);
  rawBorderArray.append(1000);
  rawBorderArray.append(1000);
  
  rawBorderArray.append((rawArray[42]+rawArray[44])/2+50);
  rawBorderArray.append(500);
  //rawBorderArray.append(rawArray[16]+100);
  //rawBorderArray.append(rawArray[17]+100);
  rawBorderArray.append(rawArray[16]);
  rawBorderArray.append(rawArray[17]);
  rawBorderArray.append(rawArray[16]);
  rawBorderArray.append(rawArray[17]+10);
  println("rawBorderArray has:"+ rawBorderArray.size()+"points");
}

float perc;
void randomness() {
  for (int a= 0; a < rawBorderArray.size(); a+=2) {
    perc = random(-2, 2);
    rawBorderArray.set(a, rawBorderArray.get(a)+(mouthHeight*perc));
  }
  
}


void drawWaves() {
  for (int a= 0; a < rawBorderArray.size(); a+=2) {
    perc = random(-2, 2);
    waveBorderArray.append(rawBorderArray.get(a)+(mouthHeight*perc));
  }
}


int r;
int s;
void drawMask() {
  //color c = 0;
  color c = get(400, 10);
  beginShape();
  noFill();
    fill(c);
    stroke(c);
    strokeWeight(3);
    r = 0;
    while (r <= rawBorderArray.size()-1) {
      curveVertex(rawBorderArray.get(r), rawBorderArray.get(r + 1));
      r += 2;
    }
  endShape();
}

void drawMask2() {
  color c = get(400, 10);
  beginShape();
  noFill();
    fill(c);
    stroke(c);
    strokeWeight(3);
    s = 0;
    while (s <= rawBorderArray.size()-1) {
      curveVertex(otherHalfArray.get(s), otherHalfArray.get(s + 1));
      s += 2;
    }
  endShape();
}



void getMirrorBorder() {
  for (int i = 0; i < rawBorderArray.size(); i++) {
    if (i%2 == 0){//x 
      otherHalfArray.append(rawBorderArray.get(i)*(-1)+200);
    }
    else {
      otherHalfArray.append(rawBorderArray.get(i+1));
    }
  }
}


void otherHalf() {
  mid = (rawArray[42]+rawArray[44])/2;
  int Image = cam.width * cam.height; //int(cam.width-mid)
  loadPixels();
  for (int i = 0; i < Image; i++) {
    if (i%cam.width > int(mid)-80 && i%cam.width < int(mid)+100) { //if on he right side of face 
      pixels[max(0,(i-200))] = pixels[cam.width-i%cam.width+ (i/cam.width)*cam.width];
    }
  }
  updatePixels();
}


//
public void poseScale(float s) {
  println("scale: " + s);
  poseScale = s;
}

public void posePosition(float x, float y) {
  println("pose position\tX: " + x + " Y: " + y );
  posePosition.set(x, y, 0);
}

public void poseOrientation(float x, float y, float z) {
  println("pose orientation\tX: " + x + " Y: " + y + " Z: " + z);
  poseOrientation.set(x, y, z);
}

public void mouthWidthReceived(float w) {
  println("mouth Width: " + w);
  mouthWidth = w;
}

public void mouthHeightReceived(float h) {
  println("mouth height: " + h);
  mouthHeight = h;
}

public void eyeLeftReceived(float f) {
  println("eye left: " + f);
  eyeLeft = f;
}

public void eyeRightReceived(float f) {
  println("eye right: " + f);
  eyeRight = f;
}

public void eyebrowLeftReceived(float f) {
  println("eyebrow left: " + f);
  eyebrowLeft = f;
}

public void eyebrowRightReceived(float f) {
  println("eyebrow right: " + f);
  eyebrowRight = f;
}

public void jawReceived(float f) {
  println("jaw: " + f);
  jaw = f;
}

public void nostrilsReceived(float f) {
  println("nostrils: " + f);
  nostrils = f;
}

// all other OSC messages end up here
void oscEvent(OscMessage m) {
  if(m.isPlugged() == false) {
    println("UNPLUGGED: " + m);
  }
}





void keyPressed() {
  if (keyCode == RIGHT) {
    highlighted = (highlighted + 2) % rawArray.length;
  }
  if (keyCode == LEFT) {
    highlighted = (highlighted - 2) % rawArray.length;
    if (highlighted < 0) {
      highlighted = rawArray.length-1;
    }
  }
}