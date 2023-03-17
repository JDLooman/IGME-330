import * as main from "./main.js";
let images = [];

window.onload = ()=>{
	console.log("window.onload called");
	// 1 - do preload here - load fonts, images, additional sounds, etc...
	const fozzieURL = "./media/fozzie bear.png";
	const kermitURL = "./media/kermit.png";
	const beakerURL = "./media/beaker.png";
	const piggyURL = "./media/piggy.png";
	const gonzoURL = "./media/gonzo.png"
	const imageURL = "./media/stage.png";
	
	
	// // II. HELPER FUNCTION
	const preloadImage = (url) => {
		let img = new Image();
		
		img.onload = () => {
		  // when the image shows up, add to array and call `init()`
		  images.push(img);
		};
	
		img.onerror = () => {
		  console.log(`Image at url "${url}" wouldn't load! Check your URL!`);
		};
	
		// start downloading the image (it is located on an RIT server)
	  	img.src = url;
	};
	
	preloadImage(imageURL); 
	preloadImage(fozzieURL);
	preloadImage(kermitURL);
	preloadImage(beakerURL);
	preloadImage(piggyURL);
	preloadImage(gonzoURL);
	
	// 2 - start up app
	main.init();
}

export{images};