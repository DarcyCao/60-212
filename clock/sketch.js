var prevSec;
var millisRolloverTime;
var x = 50
var y = 50
var angle = 0;

function setup() {
  createCanvas(600, 600);
  millisRolloverTime = 0;
}

function shape(a, b) {
  noFill();
  bezier(a,b,90,10,10,300,200,200);
}



function draw() {
  background(255,200,200); // My favorite pink
  
  
  //draw the steady pat before rotate command
  shape(x, y);
  
  
  translate(width/2, height/2);
  rotate(angle);
  shape(x, y);
  // Fetch the current time
  var H = hour();
  var M = minute();
  var S = second();

  // Reckon the current millisecond, 
  // particularly if the second has rolled over.
  // Note that this is more correct than using millis()%1000;
  if (prevSec != S) {
    millisRolloverTime = millis();
  }
  prevSec = S;
  var mils = floor(millis() - millisRolloverTime);

  fill(128,100,100);
  text("Hour: "   + H, 10, 22);
  text("Minute: " + M, 10, 42);
  text("Second: " + S, 10, 62);
  text("Millis: " + mils, 10, 82);

  var hourBarWidth   = map(H, 0, 23, 0, width);
  var minuteBarWidth = map(M, 0, 59, 0, width);
  var secondBarWidth = map(S, 0, 59, 0, width);

  // Make a bar which *smoothly* interpolates across 1 minute.
  // We calculate a version that goes from 0...60, 
  // but with a fractional remainder:
  var secondsWithFraction   = S + (mils / 1000.0);
  x += S/60
  y += S /60
  angle += 0.002;
  
  var secondsWithNoFraction = S;
  var secondBarWidthChunky  = map(secondsWithNoFraction, 0, 60, 0, width);
  var secondBarWidthSmooth  = map(secondsWithFraction,   0, 60, 0, width);

}