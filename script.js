const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
let canW = canvas.width = window.innerWidth;
let canH = canvas.height = window.innerHeight;

// ------------------------------------------- CHARACTER

class Player {
    constructor() {
        this.x = 100;
        this.y = canH - this.height;
        this.width = 75;
        this.height = 125;
        this.weight = 2
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.speed = 0.6;
        this.jumping = false;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
    update() {
        if (this.y <= canH - this.height) {
            this.y += this.weight;
        } else {
            this.y = canH - this.height;
            this.jumping = false;
        }
        this.yVelocity += 1;
        this.x += this.xVelocity
        this.y += this.yVelocity
        this.xVelocity *= 0.9;
        this.yVelocity *= 0.9;
        if (spacePressed && this.jumping === false) {
            this.jump();
        }
        if (leftPressed) {
            this.goLeft();
        }
        if (rightPressed) {
            this.goRight();
        }
    }
    jump() {
        this.yVelocity -= 15;
        this.jumping = true;
    }
    goLeft() {
        this.xVelocity -= this.speed;
    }
    goRight() {
        this.xVelocity += this.speed;
    }
}

const player = new Player;

function handlePlayer() {
    player.draw();
    player.update();
}
// ---------------------------------------------------CONTROLS

let spacePressed = false;
let leftPressed = false;
let rightPressed = false;

window.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        spacePressed = true;
    }
    if (e.code === 'ArrowLeft') {
        leftPressed = true;
    }
    if (e.code === 'ArrowRight') {
        rightPressed = true;
    }
});
window.addEventListener('keyup', function (e) {
    if (e.code === 'Space') {
        spacePressed = false;
    }
    if (e.code === 'ArrowLeft') {
        leftPressed = false;
    }
    if (e.code === 'ArrowRight') {
        rightPressed = false;
    }
});

// ANIMATION LOOP

let fps, fpsInteral, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInteral = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInteral) {
        then = now - (elapsed % fpsInteral);

        ctx.clearRect(0, 0, canW, canH)
        handlePlayer();
    }
}
startAnimating(60)

window.addEventListener('resize', function () {
    canW = window.innerWidth;
    canH = window.innerHeight;
});