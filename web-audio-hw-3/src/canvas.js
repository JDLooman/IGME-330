/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';
import * as images from './loader.js';

let ctx,canvasWidth,canvasHeight,gradient,analyserNode,audioData,rotation;
let maxSize;
let percent;
let circleRadius;
let reverse;

function setupCanvas(canvasElement,analyserNodeRef){
	// create drawing context
	ctx = canvasElement.getContext("2d");

	//lets make our canvas a bit bigger
	canvasElement.width *= 2;
	canvasElement.height *= 2;

	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
	// create a gradient that runs top to bottom
	gradient = utils.getLinearGradient(ctx,0,0,0,canvasHeight,[{percent:0,color:"black"},{percent:.25,color:"black"},{percent:.5,color:"grey"},{percent:.75,color:"white"},{percent:1,color:"white"}]);
	// keep a reference to the analyser node
	analyserNode = analyserNodeRef;
	// this is the array where the analyser data will be stored
	audioData = new Uint8Array(analyserNode.fftSize / 2);
	rotation = 0;
	reverse = true;
}

function draw(params={}){
    // 1 - populate the audioData array with the frequency data from the analyserNode
	// notice these arrays are passed "by reference" 
	analyserNode.getByteFrequencyData(audioData);
	// OR
	//analyserNode.getByteTimeDomainData(audioData); // waveform data
	ctx.drawImage(images.images[0],0,0,canvasWidth,canvasHeight); // the 0,0 represent the top left of the image	
	
	
	if(rotation > Math.PI/4) reverse = true; //if we go beyond reverse rotation
	if(rotation < -Math.PI/4) reverse = false; // if we go beyond reverse rotation

	if(reverse){rotation -= .025;}
	else{rotation += .025;}
	
	// 2 - draw background
	ctx.save();
    ctx.fillStyle = "white";
    ctx.globalAlpha = .1;
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.restore();
		
	// draw Fozzie
	if(params.showFozzie){
        ctx.save();
		ctx.translate(canvasWidth/10 * 2, canvasHeight-100);
		ctx.globalAlpha = 1;

		maxSize = 400;
		percent = audioData[10] / 255;
		circleRadius = percent * maxSize;
		
		ctx.drawImage(images.images[1], -circleRadius/2, -circleRadius/2, circleRadius, circleRadius);
		//we aren't playing audio so show character
		if(audioData[1]/255 < .02){
			ctx.drawImage(images.images[1], -100, -100, maxSize/2, maxSize/2);
		}
		ctx.restore();
    }
	// draw Kermit
	if(params.showKermit){
		ctx.save();
		ctx.translate(canvasWidth/10 * 4, canvasHeight-100);
		ctx.globalAlpha = 1;

		maxSize = 400;
		percent = audioData[10] / 255;
		circleRadius = percent * maxSize;
		
		ctx.drawImage(images.images[2], -circleRadius/2, -circleRadius/2, circleRadius, circleRadius);
		//we aren't playing audio so show character
		if(audioData[1]/255 < .02){
			ctx.drawImage(images.images[2], -100, -100, maxSize/2, maxSize/2);
		}
		ctx.restore();
	}
	// draw Beaker
	if(params.showBeaker){
		ctx.save();
		ctx.translate(canvasWidth/10 * 6, canvasHeight-100);
		ctx.globalAlpha = 1;

		maxSize = 400;
		percent = audioData[10] / 255;
		circleRadius = percent * maxSize;
		
		ctx.drawImage(images.images[3], -circleRadius/2, -circleRadius/2, circleRadius, circleRadius);
		//we aren't playing audio so show character
		if(audioData[1]/255 < .02){
			ctx.drawImage(images.images[3], -100, -100, maxSize/2, maxSize/2);
		}
		ctx.restore();
	}

	// draw Piggy
	if(params.showPiggy){
		ctx.save();
		ctx.translate(canvasWidth/10 * 8, canvasHeight-100);
		ctx.globalAlpha = 1;

		maxSize = 400;
		percent = audioData[10] / 255;
		circleRadius = percent * maxSize;
		
		ctx.drawImage(images.images[4], -circleRadius/2, -circleRadius/2, circleRadius, circleRadius);
		//we aren't playing audio so show character
		if(audioData[1]/255 < .02){
			ctx.drawImage(images.images[4], -100, -100, maxSize/2, maxSize/2);
		}
		ctx.restore();
	}	

	// draw gonzo
	if(params.showGonzo){
		ctx.save();	
		ctx.translate(800, -250);
		ctx.rotate(rotation);
		if(!reverse){ctx.scale(-1,1);}
		ctx.globalAlpha = 1;

		maxSize = 400;
		percent = audioData[10] / 255;
		circleRadius = percent * maxSize;
		
		ctx.drawImage(images.images[5], -100, 500, circleRadius, circleRadius);
		//we aren't playing audio so show character
		if(audioData[1]/255 < .02){
			ctx.drawImage(images.images[5], -100, 500, maxSize/2, maxSize/2);
		}
		ctx.restore();
	}	
}

export {setupCanvas,draw};