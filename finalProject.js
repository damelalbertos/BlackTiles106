/*
    finalProject.js
*/

window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
    canvasApp();
}

function canvasSupport() {
    return Modernizr.canvas;
}

//CANVAS APP
function canvasApp() {

    if (!canvasSupport()) {
        return; 
    }
    
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    } 

    var theCanvas = document.getElementById("myCanvas");
    var context = theCanvas.getContext("2d");

    //CANVAS DIMENSIONS
    var canvasHeight = theCanvas.height;
    var canvasWidth = theCanvas.width;

    //CANVAS COLOR
    var canvasColor = "#f0f0f0";

 
    //TILES
    
    var tileList = [];
    
    //INTERVALS
    var frameCounter = 0;
    var addInterval = 200;
    
    //GAME COUNTERS
    var gamePoints = 0;
    var gameMisses = 0;
    
    //GAMEOVER OR ON?
    var gameOn = false;
    var gameOver = false;

    //DIMENSIONS OF TILE
    var tileWidth = 100;
    var tileHeight = 125;

    //CHOOSING WHICH COLUMN TILE WILL APPEAR IN
    var chosenCol = getRandom(1,5);
    var tileStartX = 0;
    var tileStartY = 0;
    if (chosenCol == 1){
        tileStartX = 0;
    }
    else if (chosenCol == 2){
        tileStartX += tileWidth;
    }
    else if (chosenCol == 3){
        tileStartX += tileWidth*2;
    }
    else if (chosenCol == 4){
        tileStartX += tileWidth*3;
    }
    
    //SCROLLSPEED
    var speed = 3;
    
    //TILE OBJECT
    var tile = {
        x:tileStartX,
        y:tileStartY,
        width:tileWidth,
        height:tileHeight,
        scrollSpeed:speed,
        column:chosenCol
    };

    
    function addTile() {
            //DIMENSIONS OF TILE
    var tileWidth = 100;
    var tileHeight = 125;

    //CHOOSING WHICH COLUMN TILE WILL APPEAR IN
    var chosenCol = getRandom(1,5);
    var tileStartX = 0;
    var tileStartY = 0;
    if (chosenCol == 1){
        tileStartX = 0;
    }
    else if (chosenCol == 2){
        tileStartX += tileWidth;
    }
    else if (chosenCol == 3){
        tileStartX += tileWidth*2;
    }
    else if (chosenCol == 4){
        tileStartX += tileWidth*3;
    }
    
    //SCROLLSPEED
    var speed = 3;
        var tile = {
            x:tileStartX,
            y:tileStartY,
            width:tileWidth,
            height:tileHeight,
            scrollSpeed:speed,
            column:chosenCol
        };

        //add the new circle to the array
        tileList.push(tile);


    }
    
     function removeTile() {
             //DIMENSIONS OF TILE
    var tileWidth = 100;
    var tileHeight = 125;

    //CHOOSING WHICH COLUMN TILE WILL APPEAR IN
    var chosenCol = getRandom(1,5);
    var tileStartX = 0;
    var tileStartY = 0;
    if (chosenCol == 1){
        tileStartX = 0;
    }
    else if (chosenCol == 2){
        tileStartX += tileWidth;
    }
    else if (chosenCol == 3){
        tileStartX += tileWidth*2;
    }
    else if (chosenCol == 4){
        tileStartX += tileWidth*3;
    }
    
    //SCROLLSPEED
    var speed = 3;
         
        var tile = {
            x:tileStartX,
            y:tileStartY,
            width:tileWidth,
            height:tileHeight,
            scrollSpeed:speed,
            column:chosenCol
        };

        //add the new circle to the array
        tileList.pop(tile);


    }//REMOVETILE
    
    function addInIntervals(){
        if ((frameCounter % addInterval) == 0) {
            addTile();
        }
    }
    
    function writeCounter(){
        var message = "Points: " + gamePoints;
        message += "    Misses: " + gameMisses;
        context.fillStyle = "black";
        context.font = "18px Gugi";
        context.fillText(message, 5, 25);
    }

    function drawTile() {
        for (var i = 0; i < tileList.length;i++){
            context.beginPath();
            context.fillStyle = "black";
            context.fillRect(tileList[i].x, tileList[i].y, tileList[i].width, tileList[i].height);
            context.closePath();
        }
        console.log("Amount of tiles:" + tileList.length);
    }
    
    function drawLines(){
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 3;
        context.moveTo(tileWidth, 0);
        context.lineTo(tileWidth, canvasHeight);
        context.stroke();
        
        context.beginPath();
        context.strokeStyle = "black";
        context.moveTo(tileWidth*2, 0);
        context.lineTo(tileWidth*2, canvasHeight);
        context.stroke();
        
        context.beginPath();
        context.strokeStyle = "black";
        context.moveTo(tileWidth*3, 0);
        context.lineTo(tileWidth*3, canvasHeight);
        context.stroke();
        
        context.beginPath();
        context.strokeStyle = "black";
        context.moveTo(0, canvasHeight - 175);
        context.lineTo(canvasWidth, canvasHeight - 175);
        context.stroke();

    }
    
    
    function moveTile() {
        for (var i = 0; i < tileList.length;i++){
            tileList[i].y += tileList[i].scrollSpeed;     
            if (tileList[i].y > canvasHeight - tileList[i].height) {
                gameMisses+=1;
                tileList.splice(i,1);
                addTile();
            }
        }
    }
    function clearCanvas(color) {
        context.fillStyle = color;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
    }
    
    function writeStartGame(){
        var startMessage = "Press Space Bar to Start";
        context.fillStyle = "white";
        context.font = "18px Gugi";
        context.fillText(startMessage, 95, 225);   
    }
    
    function writeGameOver(){
        var endMessage = "GAME OVER";
        endMessage+="   Score: " + gamePoints;
        context.fillStyle = "grey";
        context.font = "25px Gugi";
        context.fillText(endMessage, 90, 225);
    }
    
    function checkGameOver(){
        if (gameMisses >= 10){
            gameOn = false;
            gameOver = true;
        }
        return gameOver;
    }
    
    function spacePress(e){
        if (e.keyCode == 32){
            startGame();
        }
    }
    
    function startGame(){
        gameOn = true;
        gameOver = false;
        gamePoints = 0;
        gameMisses = 0;
        frameCounter = 0;
        tileList.splice(0,tileList.length);
        addTile();
    }
    
    
    function drawCanvas() {
        clearCanvas(canvasColor);
        drawLines();
        writeCounter();
        moveTile();
        drawTile();
    }
    
    
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        frameCounter++;
        if (gameOn){
            addInIntervals();
            checkGameOver();
            if (!gameOver){
                drawCanvas();
            }
            else{writeGameOver();}
        }
    }
    
    function keyPress(e){
        for (var t = 0; t < tileList.length;t++){
            if (tileList[t].column == 1){
                if (e.key == "a"){
                    if(tileList[t].y >= canvasHeight - 175){
                        gamePoints+=1;
                        tileList.splice(t,1);
                        addTile();
                    }
                }
            }
            else if(tileList[t].column == 2){
                if (e.key == "s"){
                    if (tileList[t].y >= canvasHeight - 175){
                        gamePoints++;
                        tileList.splice(t,1);
                        addTile();
                    }
                }
            }
            else if (tileList[t].column == 3){
                if (e.key == "d"){
                    if (tileList[t].y >= canvasHeight - 175){
                        gamePoints++;
                        tileList.splice(t,1);
                        addTile();
                    }
                }
            }
            else if (tileList[t].column == 4){
                if (e.key == "f"){
                    if (tileList[t].y >= canvasHeight - 175){
                        gamePoints++;
                        tileList.splice(t,1);
                        addTile();
                    }
                }
            }
        }
    }

    //GAME
    writeStartGame();
    gameLoop();

    
    //EVENT HANDLERS
    window.addEventListener("keydown", keyPress);
    window.addEventListener("keydown", spacePress);
    



} //canvasApp()

