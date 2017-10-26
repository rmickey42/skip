function Player() {
  this.position = 0;
  this.curLevel = 0;
  this.score = 0;

  this.idleImg = document.getElementById("idle");
  this.leftImg = document.getElementById("left");
  this.rightImg = document.getElementById("right");
  this.upImg = document.getElementById("up");
  this.carImg = document.getElementById("car");
  this.curTex = idleImg;
}

Player.prototype.draw = function (canvas) {
  canvas.drawImage(curTex, 1000, 200, 64, 64);
};






init();

// starts game loop, initializes canvas height
function init(){
  var loopTimer = setInterval(loop, 16.67);
  canvas.canvas.width = window.innerWidth;
  canvas.canvas.height = window.innerHeight;
  canvas.imageSmoothingEnabled = false;
}

var player = new Player();

// everything is called here in a loop
function loop(){
  tick();
  draw();
}

// updates, etc are called from here
function tick(){

}

// stuff is drawn onto the canvas from here
function draw(){
  var canvas = document.getElementById("canvas").getContext("2d");
  player.draw(canvas);
}
