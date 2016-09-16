ArrayList<FloatList<float>> lines = new ArrayList<ArrayList<float>>();
float[][] intersects = new float[0][];
int lineCount = 100;
int radius = 12;

void setup() {
  size(720, 480);
  getPoints();
}

void getPoints(){
  lines = new float[0][];
  intersects = new float[0][];
  for (int i = 0; i < lineCount; i++){
    float x1 = random(0, width);
    float y1 = random(0, height);
    float x2 = random(0, width);
    float y2 = random(0, height);
    float[] a = new float[0];
    a[0] = x1, y1, x2, y2;
    lines.add([a]);
  }
}


void draw() {
  float[][] intersects = new float[0][];
  float[][] oldPoints = new float[0][]; //all the existing points in the lines array
  for (int i = 0; i < lines.length; i++) {
    stroke(255, 179, 153);
    line(lines[i][0], lines[i][1], lines[i][2], lines[i][3]);//draw new line
    if (i != 0 && i < lines.length) {
      getIntersections(lines[i], oldPoints); //get intersects with all old lines
    }
    if (i != lines.length - 1) {
      oldPoints.append(lines[i]);
    }
  }
  //draw intersects
  for (int j = 0; j < intersects.length; j++) {
    noStroke();
    fill(153, 153, 255,90);
    ellipse(intersects[j][0], intersects[j][1], radius, radius);
  }
}



void getIntersections(float[] p, float[][] oldP) {
  for (int i = 0; i < oldP.length; i++) {
    float x1 = p[0];
    float y1 = p[1];
    float x2 = p[2];
    float y2 = p[3];
    float x3 = oldP[i][0];
    float y3 = oldP[i][1];
    float x4 = oldP[i][2];
    float y4 = oldP[i][3];
    float denominator = ((y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1));
    float nominatora = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3));
    float nominatorb = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3));
    float ua = nominatora/denominator;
    float ub = nominatorb/denominator;
    float x = x1 + ua * (x2 - x1);
    float y = y1 + ua * (y2 - y1);
    if (denominator != 0 && 0 <= ua & ua <= 1 && 0 <= ub & ub <= 1) {
      intersects.add([x, y]);
    }
  }
}

void mousePressed() {
  intersects = new float[0][];
  size(width, height);
  getPoints();
  background(random(153,255), random(153,255), random(153,255), 60);
} 