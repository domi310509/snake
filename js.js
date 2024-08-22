canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const snakeSize = 30;
tickPerSecond = 150;
canvasSize = 600;
score = 0;
dx = snakeSize;
dy = 0;

let snake = [{x: 4*snakeSize, y: 3*snakeSize}, {x: 3*snakeSize, y: 3*snakeSize}, {x: 2*snakeSize, y: 3*snakeSize}, {x: snakeSize, y: 3*snakeSize}];

function drawSnake(array){
	ctx.fillStyle = "green";
	for(let i = 0; i<array.length; i++){
		ctx.fillRect(snake[i].x, snake[i].y, snakeSize, snakeSize);
		ctx.strokeRect(snake[i].x, snake[i].y, snakeSize, snakeSize);
	}
}

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function advanceSnake(){
	const head = {x: snake[0].x + dx, y: snake[0].y + dy};
	snake.unshift(head);
	if (snake[0].x === foodX && snake[0].y === foodY){
		createFood();
		advanceScore();
	} else {
		snake.pop();
	}
}
function snakeEnd(){
	for(let i = 2; i<snake.length; i++){
		if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
			return true;
		}else if(snake[0].x > canvasSize || snake[0].x < 0 || snake[0].y > canvasSize || snake[0].y < 0){
			return true;
		}
	}
	return false;
}
function tick(){
	timer = setTimeout(function onTick() {  clearCanvas();  advanceSnake();  drawSnake(snake); tick(); drawFood(); if(snakeEnd()){end();}}, tickPerSecond);
}
function end(){
	clearTimeout(timer)
	alert("Przegrales.");
}
function advanceScore(){
	score++;
	document.getElementById('score').innerHTML = score;
	tickPerSecond += 1;
}
function changeDirection(event) {
	const LEFT_KEY = 37;
	const RIGHT_KEY = 39;
	const UP_KEY = 38;
	const DOWN_KEY = 40;
	const keyPressed = event.keyCode;
	switch (keyPressed){
		case LEFT_KEY:
			if(!(snake[0].x-snakeSize == snake[1].x && snake[0].y == snake[1].y)){
				dx = -snakeSize; dy = 0;
			}
			break;
		case RIGHT_KEY:
			if(!(snake[0].x+snakeSize == snake[1].x && snake[0].y == snake[1].y)){
				dx = snakeSize; dy = 0;
			}
			break;
		case UP_KEY:
			if(!(snake[0].x == snake[1].x && snake[0].y-snakeSize == snake[1].y)){
				dx = 0; dy = -snakeSize;
			}
			break;
		case DOWN_KEY:
			if(!(snake[0].x == snake[1].x && snake[0].y+snakeSize == snake[1].y)){
				dx = 0; dy = snakeSize;
			}
			break;
	}
}

function randomPos(min, max){
	return Math.round((Math.random() * (max-min) + min) / snakeSize) * snakeSize;
}

function drawFood(){
	ctx.fillStyle = 'red';
	ctx.strokestyle = 'darkred';
	ctx.fillRect(foodX, foodY, snakeSize, snakeSize);
	ctx.strokeRect(foodX, foodY, snakeSize, snakeSize);
}
function createFood(){
	foodX = randomPos(0, gameCanvas.width - snakeSize);
	foodY = randomPos(0, gameCanvas.height - snakeSize);
	drawFood();
}
function drawWall(){
	ctx.fillStyle = 'gray';
	ctx.strokestyle = 'black';
	ctx.fillRect(foodX, foodY, snakeSize, snakeSize);
	ctx.strokeRect(foodX, foodY, snakeSize, snakeSize);
}
function createWall(){
	wallX = randomPos(0, gameCanvas.width - snakeSize);
	wallY = randomPos(0, gameCanvas.height - snakeSize);
	while(snakewallX)
	drawWall();
}
document.addEventListener("keydown", changeDirection);
createFood();
setTimeout(tick(), 100)


