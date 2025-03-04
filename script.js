const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawLevel(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Player {
    constructor(x, y, radius, speed){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.keys = {};

        //Jump Properties
        this.vy = 0; // vertical velocity
        this.gravity = 0.75; // how fast it falls
        this.jumpForce = -17 ; //Initial velocity when jumping
        this.isJumping = false; // tracks if player is in middle of jump
        this.groundY = y ; // Tracks original y position

        window.addEventListener("keydown", (e) => this.keys[e.key] = true);
        window.addEventListener("keyup", (e) => this.keys[e.key] = false);
    }

    move(canvas){
        if (this.keys["d"] && this.x + this.radius < canvas.width){
            this.x += this.speed;
        }
        if (this.keys["a"] && this.x - this.radius > 0){
            this.x -= this.speed;
        }
        if (this.keys[" "] && this.y - this.speed - this.radius >= 0){
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
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        ctx.fill();
        ctx.closePath();
    }
}

let player = new Player(500, 1100, 40, 10);

function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.move(canvas);
    player.draw(ctx);
    requestAnimationFrame(gameLoop);
};

drawLevel();
gameLoop();


window.addEventListener("keydown",(e) =>{
    console.log(e.key)
});