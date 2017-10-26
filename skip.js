var Player = {
    dx: 0,
    dy: 0,
    
    position: 0,
    curLevel: 0,
    score: 0,
    shootDelay: 20,
    curDelay: 0,

    idleImg: new Image(16, 16),
    leftImg: new Image(16, 16),
    rightImg: new Image(16, 16),
    upImg: new Image(16, 16),
    carImg: new Image(32, 14),
    curImg: new Image(16, 16),
    
    tick: function(){
        if(curDelay > 0){
            curDelay++;
            if(curDelay > 20) curDelay = 0;
        }
    },
    
    draw: function(canvas){
        dx = canvas.canvas.width/2-32;
        dy = canvas.canvas.height-104;
        canvas.drawImage(Player.curImg, dx, dy, 64, 64);
        canvas.drawImage(Player.carImg, canvas.canvas.width/2-64, canvas.canvas.height-56, 128, 56);
    },
    
    shootLeft: function(){
        if(curDelay == 0){
            playerShots.push({x: dx, y: dy, mx: -1, my: 0});
        }
    }
    
    shootRight: function(){
        if(curDelay == 0){
            playerShots.push({x: dx, y: dy, mx: 1, my: 0});
        }
    }
    
    shootUp: function(){
        if(curDelay == 0){
            playerShots.push({x: dx, y: dy, mx: 0, my: -1});
        }
    }
};

// each shot contains an x, y, mx, and my (mx and my are the amount moved per tick in x and y axes)
var playerShots = [ ]

function updateShots(canvas){
    for(var i = 0; i < playerShots.length; i++){
        playerShots[i].x+=playerShots[i].dx;
        playerShots[i].y+=playerShots[i].dy;
    }
}






init();

// starts game loop, initializes canvas height, makes player images, etc
function init(){
    var canvas = document.getElementById("canvas").getContext("2d");
    var loopTimer = setInterval(loop, 16.67);
    
    
    Player.idleImg.src = "images/me.png";
    Player.leftImg.src = "images/me_left.png";
    Player.rightImg.src = "images/me_right.png";
    Player.upImg.src = "images/me_up.png";
    Player.carImg.src = "images/boomcar.png";
    Player.curImg.src = "images/me.png";
}

// everything is called here in a loop
function loop(){
    draw();
    tick();
}

// updates, etc are called from here
function tick(){

}

// stuff is drawn onto the canvas from here
function draw(){
    var canvas = document.getElementById("canvas").getContext("2d");
    canvas.canvas.width = window.innerWidth;
    canvas.canvas.height = window.innerHeight;
    canvas.imageSmoothingEnabled = false;
    canvas.mozImageSmoothingEnabled = false;
    canvas.oImageSmoothingEnabled = false;
    canvas.webkitImageSmoothingEnabled = false;
    canvas.msImageSmoothingEnabled = false;
    canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    Player.draw(canvas);
}
