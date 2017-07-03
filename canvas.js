let bird, score, background, obstacles = [], scoreCounter = 0, end = false, gameAfterRestart;

// Creating main Canvas
let gameArea = {
	canvas: document.querySelector("canvas"),
	begin: function() {
	    obstacles = [];
	    scoreCounter = 0;
		this.context = this.canvas.getContext("2d");
		this.interval = setInterval(updateArea, 20);
		this.obstacleNumber = 0;
	},
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
    stop: function () {
        clearInterval(this.interval);
    }
};

function delayBetweenObstacles(n) {
    return (gameArea.obstacleNumber / n) % 1 == 0;
}

function updateArea() {

	// Crash with obstacles?
    for (let x = 0; x < obstacles.length; x++) {
        if (bird.crashWith(obstacles[x])) {
            gameArea.stop();
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            crashMusic.play();
            updateStorageScore(scoreCounter);
            setTimeout(afterGame, 1000);

            return;
        }
    }

    // Crash with canvas borders?
    if (bird.x < 0 || bird.y < 0 || bird.x+bird.width > gameArea.canvas.width || bird.y+bird.height > gameArea.canvas.height) {
    	gameArea.stop();
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        crashMusic.play();
        updateStorageScore(scoreCounter);
        setTimeout(afterGame, 1000);

        return;
	}

    gameArea.clear();
    gameArea.obstacleNumber += 1;
    bird.stopMoving();

    // Control the bird by space bar
    if (gameArea.keys && gameArea.keys[32]) { // keydown
        bird.move(-1.2); // move UP^
    } /*else if (gameArea.keys && !gameArea.keys[32]) { // keyup
        bird.move(0.2); // move DOWNˇ
    }*/

    // Adding new obstacle to canvas
    if (gameArea.obstacleNumber == 1 || delayBetweenObstacles(100)) {
    	let minGap = bird.height+20;
    	let maxGap = gameArea.canvas.height-100;
    	let gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);

    	let minHeight = 10;
        let maxHeight = gameArea.canvas.height-50;
    	let height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);

    	obstacles.push(new Component(5, height, localStorage.getItem("obstacle"), gameArea.canvas.width, 0));
        obstacles.push(new Component(5, gameArea.canvas.width - height - gap, localStorage.getItem("obstacle"), gameArea.canvas.width, height + gap));
	}

    // Firstly, background has to be updated
    background.update();

	for (let y = 0; y < obstacles.length; y++) {
    	obstacles[y].x += -1;
        obstacles[y].update();
	}


    bird.newPosition();
    bird.update();

    // Score update
	if (obstacles[scoreCounter*2] && obstacles[scoreCounter*2].x < bird.x) {
        score.update("Score: " + scoreCounter);
        scoreCounter++;
    }
	score.update("Score: " + scoreCounter);
}

function afterGame() {
    let textAfterGame = "Press space to start again";
    gameArea.clear();
    gameAgain = new ComponentText(0, 0, "black", 22, 80, textAfterGame, "22px", "Arial");
    gameAgain.update(textAfterGame);
    end = true;
}

function gameBegin() {

    end = false;
    gameArea.begin();
    bird = new ComponentImage(15, 15, localStorage.bird, 10, 70);
    score = new ComponentText(0, 0, "grey", gameArea.canvas.width-90, 20, "Score: 0", "20px", "Arial");
    background = new ComponentImage(gameArea.canvas.width, gameArea.canvas.height, JSON.parse(localStorage.background), 0, 0);

    if (backgroundMusic.canPlayType("audio/wav") != "") {
        backgroundMusic.loop = true;
        backgroundMusic.play();
    }
}