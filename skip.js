var Player = {
    dx: 0,
    dy: 0,
    
    position: 0,
    curLevel: 0,
    score: 0,
    shootDelay: 55,
    curDelay: 0,

    idleImg: new Image(16, 16),
    leftImg: new Image(16, 16),
    rightImg: new Image(16, 16),
    upImg: new Image(16, 16),
    carImg: new Image(32, 14),
    curImg: new Image(16, 16),
    
    tick: function(){
        if(Player.curDelay > 0){
            Player.curDelay++;
            if(Player.curDelay > 20) Player.curDelay = 0;
        }
    },
    
    draw: function(canvas){
        dx = canvas.canvas.width/2-32;
        dy = canvas.canvas.height-104;
        canvas.drawImage(Player.curImg, dx, dy, 64, 64);
        canvas.drawImage(Player.carImg, canvas.canvas.width/2-64, canvas.canvas.height-56, 128, 56);
    },
    
    shootLeft: function(){
        if(Player.curDelay == 0){
            psX.push(dx);
            psY.push(dy);
            psMX.push(-2);
            psMY.push(0);
        }
    },
    
    shootRight: function(){
        if(Player.curDelay == 0){
            psX.push(dx);
            psY.push(dy);
            psMX.push(2);
            psMY.push(0);
        }
    },
    
    shootUp: function(){
        if(Player.curDelay == 0){
            psX.push(dx);
            psY.push(dy);
            psMX.push(0);
            psMY.push(-2);
        }
    }
};

// each shot contains an x, y, mx, and my (mx and my are the amount moved per tick in x and y axes)
var psX = [ ]
var psY = [ ]
var psMX = [ ]
var psMY = [ ]

function updateShots(canvas){
    for(var i = 0; i < psX.length; i++){
        psX[i]+=psMX[i];
        psY[i]+=psMY[i];
        
        if(psX[i]+6 < 0 || psX[i] > canvas.canvas.width || psY[i]+6 < 0){
            psX.splice(i, 1);
            psY.splice(i, 1);
            psMX.splice(i, 1);
            psMY.splice(i, 1);
        }
        
        canvas.fillRect(psX[i]+29, psY[i]+39, 6, 6);
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
    
    document.addEventListener('keydown', function(event){
                              if(event.keyCode == 65){
                                Player.shootLeft();
                                Player.curImg = Player.leftImg;
                              }else if(event.keyCode == 68){
                                Player.shootRight();
                                Player.curImg = Player.rightImg;
                              }else if(event.keyCode == 87){
                                Player.shootUp();
                                Player.curImg = Player.upImg;
                              }
                            });
    
    document.addEventListener('keyup', function(event){
                                if(event.keyCode == 65 || event.keyCode == 68 || event.keyCode == 87) Player.curImg = Player.idleImg;
                              });
}

// where r1 and r2 are objects with left, right, top, and bottom variables
function intersectRect(r1, r2) {
    return !(r2.left > r1.right ||
             r2.right < r1.left ||
             r2.top > r1.bottom ||
             r2.bottom < r1.top);
}

// everything is called here in a loop
function loop(){
    draw();
    tick();
}

// updates, etc are called from here
function tick(){
    Player.tick();
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
    
    updateShots(canvas);
    Player.draw(canvas);
}
