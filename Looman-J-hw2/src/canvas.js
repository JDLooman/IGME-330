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
let reverse;
let sprites = [];

class Sprite{
	constructor(maxSize,percent,transX,transY,image,oriX,oriY){
		this.maxSize = maxSize;
		this.percent = percent;
		this.transX = transX;
		this.transY = transY;
		this.image = image;
		this.oriX = oriX;
		this.oriY = oriY;
	}

	draw = (ctx) =>{
		ctx.translate(this.transX, this.transY);
		ctx.globalAlpha = 1;

		let circleRadius = this.percent * this.maxSize;		
		let x = -circleRadius/2;
		let y = -circleRadius/2;
		this.drawSprite(ctx,x,y,this.image, 
			circleRadius, this.maxSize, this.oriX, this.oriY);	
	}

	drawSprite = (ctx,x,y,image,circleRadius,maxSize, oriX, oriY) =>{
		//we aren't playing audio so show character
		if(circleRadius < 100){
			ctx.drawImage(image, oriX, oriY, maxSize/2, maxSize/2);
		}
		else{			
			ctx.drawImage(image, x, y, circleRadius, circleRadius);
		}
	}
}

class MoveSprite{
	constructor(maxSize,percent,transX,transY,image,oriX,oriY){
		this.maxSize = maxSize;
		this.percent = percent;
		this.transX = transX;
		this.transY = transY;
		this.image = image;
		this.oriX = oriX;
		this.oriY = oriY;
	}

	draw = (ctx) =>{
		ctx.translate(this.transX, this.transY);		
		ctx.rotate(rotation);
		if(!reverse){ctx.scale(-1,1);}
		ctx.globalAlpha = 1;

		let circleRadius = this.percent * this.maxSize;		
		this.drawSprite(ctx,this.image, 
			circleRadius, this.maxSize, this.oriX, this.oriY);	
	}

	drawSprite = (ctx,image,circleRadius,maxSize, oriX, oriY) =>{
		//we aren't playing audio so show character
		if(circleRadius < 100){
			ctx.drawImage(image, oriX, oriY, maxSize/2, maxSize/2);
		}
		else{			
			ctx.drawImage(image, oriX, oriY, circleRadius, circleRadius);
		}
	}
}

const setupCanvas = (canvasElement,analyserNodeRef) =>{
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

	sprites.push(new Sprite(400,0,0,0,images.images[1],-100,-100));//fozzie
	sprites.push(new Sprite(400,0,0,0,images.images[2],-100,-100));//kermit
	sprites.push(new Sprite(400,0,0,0,images.images[3],-100,-100));//beaker
	sprites.push(new Sprite(400,0,0,0,images.images[4],-100,-100));//piggy
	sprites.push(new MoveSprite(400,0,0,0,images.images[5],-100, 500));//gonzo
}

const draw = (params={}) =>{
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
        sprites[0].transX = canvasWidth/10*2;
		sprites[0].transY = canvasHeight-100;
		
		sprites[0].percent = audioData[10] / 255;
		sprites[0].image = images.images[1];
		
		sprites[0].draw(ctx);		
		ctx.restore();
    }
	// draw Kermit
	if(params.showKermit){
		ctx.save();
		sprites[1].transX = canvasWidth/10*4;
		sprites[1].transY = canvasHeight-100;

		sprites[1].maxSize = 400;
		sprites[1].percent = audioData[10] / 255;
		sprites[1].image = images.images[2];
		
		sprites[1].draw(ctx);
		ctx.restore();
	}
	// draw Beaker
	if(params.showBeaker){
		ctx.save();
		sprites[2].transX = canvasWidth/10*6;
		sprites[2].transY = canvasHeight-100;

		sprites[2].maxSize = 400;
		sprites[2].percent = audioData[10] / 255;
		sprites[2].image = images.images[3];
		
		sprites[2].draw(ctx);
		ctx.restore();
	}

	// draw Piggy
	if(params.showPiggy){
		ctx.save();
		sprites[3].transX = canvasWidth/10*8;
		sprites[3].transY = canvasHeight-100;

		sprites[3].maxSize = 400;
		sprites[3].percent = audioData[10] / 255;
		sprites[3].image = images.images[4];
		
		sprites[3].draw(ctx);
		ctx.restore();
	}	

	// draw gonzo
	if(params.showGonzo){
		ctx.save();
		sprites[4].transX = 800;
		sprites[4].transY = -250;

		sprites[4].maxSize = 400;
		sprites[4].percent = audioData[10] / 255;
		sprites[4].image = images.images[5];
		
		sprites[4].draw(ctx);
		ctx.restore();
	}	
}

export {setupCanvas,draw};