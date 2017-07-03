// General class into Canvas
class Component {

    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
    };

    update() {
        const ctx = gameArea.context;
        ctx.lineWidth = 20;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    newPosition() {
        this.x += this.speedX;
        this.y += this.speedY;
    };

    stopMoving() {
        this.speedX = 0;
        this.speedY = 0;
    };

    crashWith(obstacle) {
        // Bird possition
        let birdLeft = this.x;
        let birdRight = this.x + this.width;
        let birdTop = this.y;
        let birdBottom = this.y + this.height;

        // Obstacle possition
        let obstacleLeft = obstacle.x;
        let obstacleRight = obstacle.x + obstacle.width;
        let obstacleTop = obstacle.y;
        let obstacleBottom = obstacle.y + obstacle.height;

        if ((birdBottom > obstacleTop) && (birdTop < obstacleBottom) && (birdRight > obstacleLeft) && (birdLeft < obstacleRight)) {
            // CRASH!
            return true;
        }

        // MISS!
        return false;
    }
}

// Class for Text into Canvas
class ComponentText extends Component {
    constructor(width, height, color, x, y, text, fontWeight, fontStyle) {
        super(width, height, color, x, y);
        this.text = text;
        this.fontWeight = fontWeight;
        this.fontStyle = fontStyle;
    }

    update(scoreText) {
        const ctx = gameArea.context;
        ctx.lineWidth = 1.5;
        ctx.font = this.fontWeight + " " + this.fontStyle;
        ctx.fillStyle = this.color;
        ctx.fillText(scoreText, this.x, this.y);
    }
}

// Class for Image into Canvas
class ComponentImage extends Component {
    constructor(width, height, color, x, y) {
        super(width, height, color, x, y);
        this.image = new Image();
        this.image.src = color;
        this.gravity = 0.2;
        this.gravitySpeed = 0;
    }

    update() {
        const ctx = gameArea.context;
        ctx.lineWidth = 20;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    newPosition() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.gravity = 0.2;
    }

    // Control the bird by space bar
    move(x) {
        this.gravity = x;
        this.gravitySpeed = this.gravity;
    };

    /* Control the bird by arrows
     moveUp() {
        this.speedY -= 1.5;
     };

     moveDown() {
        this.speedY += 1.5;
     };

     moveLeft() {
        this.speedX -= 1.5;
     };

     moveRight() {
        this.speedX += 1.5;
     };*/
}