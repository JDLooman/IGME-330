import * as main from "./main.js";
let images = [];
let songName;
let songURL;
let title;

window.onload = ()=>{
	console.log("window.onload called");
	// 1 - do preload here - load fonts, images, additional sounds, etc...

	let fozzieURL;
	let kermitURL;
	let beakerURL;
	let piggyURL;
	let gonzoURL;
	let imageURL;
	let data;

	// 1 - do preload here - load fonts, images, additional sounds, etc...
    let xhr = new XMLHttpRequest();

    xhr.onload = () => {
        data = JSON.parse(xhr.responseText);
		imageURL = data.images.stage;
		fozzieURL = data.images.fozzie;
		kermitURL = data.images.kermit;
		beakerURL = data.images.beaker;
		gonzoURL = data.images.gonzo;
		piggyURL = data.images.piggy;	
		songName = data.track.name;
		songURL = data.track.path;
		title = data.title;


		preloadImage(imageURL); 
		preloadImage(fozzieURL);
		preloadImage(kermitURL);
		preloadImage(beakerURL);
		preloadImage(piggyURL);
		preloadImage(gonzoURL);
		
		// 2 - start up app
		main.init();
    }

    xhr.open("GET", "./data/av-data.json");
    xhr.send();	
	
	// // II. HELPER FUNCTION
	const preloadImage = (url) => {
		let img = new Image();
		img.src = url;
		
		images.push(img);
	};
}

export{images, songName, songURL, title};