const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawLevel(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Player {
    constructor(x, y, width, height, speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.keys = {};

        //Jump Properties
        this.vy = 0; // vertical velocity
        this.gravity = 0.75; // how fast it falls
        this.jumpForce = -25  ; //Initial velocity when jumping
        this.isJumping = false; // tracks if player is in middle of jump
        this.groundY = y ; // Tracks original y position

        window.addEventListener("keydown", (e) => this.keys[e.key] = true);
        window.addEventListener("keyup", (e) => this.keys[e.key] = false);
    }

    move(canvas){
        if (this.keys["d"] && this.x + this.width < canvas.width){
            this.x += this.speed;
        }
        if (this.keys["a"] && this.x - this.width > 0){
            this.x -= this.speed;
        }
        if (this.keys[" "] && this.y - this.speed - this.width >= 0){
            this.jump();
            console.log("JUMP")
        }
    }

    update(){
        if (this.isJumping){
            this.vy += this.gravity; // Gravity increases downwards velocity
            this.y += this.vy; // Update players y position
            if (this.y >= this.groundY){
                this.y = this.groundY; // Reset to ground level
                this.vy = 0;
                this.isJumping = false;
            } 
        }
    }

    jump(){
        if (this.isJumping) return;
        this.vy= this.jumpForce;// Apply upwards force;
        this.isJumping = true;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height)
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        ctx.fill();
        ctx.closePath();
    }
}

let player = new Player(500, 1000, 50, 50,10);

const platformsArray = [];

class Platform {
    constructor (x, y , width, height, color){
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;
        this.color = color;
    }

    draw(ctx){
        ctx.fillSytle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function generatePlatforms(){
    const platformPositions = [
        {x: 500, y: 600, width: 200, height: 10},
        {x: 700, y: 700, width: 200, height: 10},
        {x: 500, y: 900, width: 200, height: 10},
        {x: 1000, y: 1000, width: 200, height: 10},
    ]

    platformPositions.forEach(position => { // Stores 
        platformsArray.push(new Platform(position.x, position.y, position.width, position.height, "black"));
    });
}

function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height) ;
    player.update();
    player.move(canvas);
    player.draw(ctx);
    platformsArray.forEach(platform => platform.draw(ctx))
    requestAnimationFrame(gameLoop);
};

function collisionDetection(){

}

generatePlatforms();
drawLevel();
gameLoop();

window.addEventListener("keydown",(e) =>{
    console.log(e.key)
});