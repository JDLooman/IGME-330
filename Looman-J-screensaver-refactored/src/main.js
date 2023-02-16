let ctx;
let canvas;
let paused = false;
let createRectangles = true;
let createArcs = true;
let createLines = true;

import {getRandomColor, getRandomInt} from "./utils.js";
import {drawArc, drawLine, drawRectangle} from "./canvas-utils.js";

const init = () => {
    console.log("page loaded!");
    // #2 Now that the page has loaded, start drawing!
    
    // A - `canvas` variable points at <canvas> tag
    canvas = document.querySelector("canvas");
    
    // B - the `ctx` variable points at a "2D drawing context"
    ctx = canvas.getContext("2d");
    
    // C - all fill operations are now in red
    ctx.fillStyle = "red"; 
    //ctx.fillStyle = '#FF0000'; 
    //ctx.fillStyle = '#F00'; 
    //ctx.fillStyle = 'rgba(255,0,0,1)'; 

    
    // D - fill a rectangle with the current fill color
    drawRectangle(ctx,20,20,600,440,'red')

    // ctx.fillStyle = "yellow";
    // ctx.fillRect(120,120,400,300);

    //rect()
    drawRectangle(ctx,120,120,400,300,'yellow',10,'magenta');

    //lines
    drawLine(ctx,20,20,620,460,5);
    drawLine(ctx,620,20,20,460,5);
    drawLine(ctx,20,10,620,10,20,'blue');

    //circle
    drawArc(ctx,320,240,50,'green',5,'purple');
    drawArc(ctx,320,240,20,'gray',5,'yellow',0,Math.PI);
    drawArc(ctx,300,220,10,'gray',5,'yellow');
    drawArc(ctx,340,220,10,'gray',5,'yellow');

    setupUI();
    update();
}

const update = () => {
    if(paused) return;
    requestAnimationFrame(update);            
    if(createRectangles){ drawRandomRect(ctx); }        
    if(createArcs){ drawRadnomArc(ctx); }    
    if(createLines){ drawRandomLine(ctx); }
}

const drawRadnomArc = (ctx) => {
    drawArc(ctx,getRandomInt(0,640),getRandomInt(0,480),getRandomInt(10,90),getRandomColor(),getRandomInt(2,12),getRandomColor(),getRandomInt(0,90),getRandomInt(180,Math.PI * 2));
}

const drawRandomRect = (ctx) => {
    //drawRectangle(ctx,x,y,width,height,fillStyle="black",lineWidth=0,strokeStyle="black")
    drawRectangle(ctx,getRandomInt(0,640),getRandomInt(0,480),getRandomInt(10,90),getRandomInt(10,90),getRandomColor(),getRandomInt(2,12),getRandomColor());
}

const drawRandomLine = (ctx) => {
    drawLine(ctx,getRandomInt(0,640),getRandomInt(0,480),getRandomInt(0,640),getRandomInt(0,480),getRandomInt(2,12),getRandomColor());
}

//event handlers
const canvasClicked = (e) => {
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    console.log(mouseX,mouseY);

    for(let i = 0; i < 10; i++){
        let x = getRandomInt(-100,100) + mouseX;
        let y = getRandomInt(-100,100) + mouseY;
        let radius = getRandomInt(10,25);
        let color = getRandomColor();
        drawArc(ctx,x,y,radius,color);
    }
}

const setupUI = () => {
    document.querySelector("#btn-pause").onclick = function (){
        paused = true;
    };
    document.querySelector("#btn-play").onclick = function (){
        if(paused){
            paused = false;
            update();
        }                
    };
    document.querySelector("#btn-clear").onclick = function (){
        drawRectangle(ctx,0,0,640,480,"white");
    };

    canvas.onclick = canvasClicked;

    document.querySelector("#cb-rectangles").onclick = function(e){
        createRectangles = e.target.checked;
    };
    document.querySelector("#cb-arcs").onclick = function(e){
        createArcs = e.target.checked;
    };
    document.querySelector("#cb-lines").onclick = function(e){
        createLines = e.target.checked;
    };
}

init();