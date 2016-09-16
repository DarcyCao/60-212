function setup(){
  createCanvas(400,400);
}
function draw(){
  translate(width/2, height/2);
  line(300,0,-300,0);
  rotate(radians(90));
  line(300,0,-300,0);
}