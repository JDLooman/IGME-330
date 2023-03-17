/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

const drawParams = {
  showFozzie : false,
  showKermit : true,
  showBeaker : false,
  showPiggy : false,
  showGonzo : false
};

let highshelf = false;
let lowShelf = false;

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/Muppets.mp3"
});

function init(){  
  audio.setupWebaudio(DEFAULTS.sound1);
	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
	setupUI(canvasElement);
  canvas.setupCanvas(canvasElement,audio.analyserNode);
  document.querySelector("#cb-kermit").checked = true;
  loop();
}

function setupUI(canvasElement){
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fsButton");
	
  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("init called");
    utils.goFullscreen(canvasElement);
  };

  playButton.onclick = e => {
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

    if(audio.audioCtx.state == "suspended"){
      audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    if(e.target.dataset.playing == "no"){
      audio.playCurrentSound();
      e.target.dataset.playing = "yes";
    }
    else{
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no";
    }
  };
	
  let volumeSlider = document.querySelector("#volumeSlider");
  let volumeLabel = document.querySelector("#volumeLabel");

  volumeSlider.oninput = e => {
    audio.setVolume(e.target.value);
    volumeLabel.innerHTML = Math.round((e.target.value/2 * 100));
  };

  volumeSlider.dispatchEvent(new Event("input"));

  let trackSelect = document.querySelector("#trackSelect");
  trackSelect.onchange = e => {
    audio.loadSoundFile(e.target.value);

    if(playButton.dataset.playing == "yes"){
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  }

  document.querySelector("#cb-fozzie").onclick = function(e){
    //call the function that draws the gradient
    drawParams.showFozzie = e.target.checked;
  };
  document.querySelector("#cb-kermit").onclick = function(e){
    //call the function that draws the gradient
    drawParams.showKermit = e.target.checked;
  };
  document.querySelector("#cb-beaker").onclick = function(e){
    //call the function that draws the gradient
    drawParams.showBeaker = e.target.checked;
  };
  document.querySelector("#cb-piggy").onclick = function(e){
    //call the function that draws the gradient
    drawParams.showPiggy = e.target.checked;
  };
  document.querySelector("#cb-gonzo").onclick = function(e){
    //call the function that draws the gradient
    drawParams.showGonzo = e.target.checked;
  };

  // I. set the initial state of the high shelf checkbox
  document.querySelector('#cb-highshelf').checked = highshelf; // `highshelf` is a boolean we will declare in a second
  document.querySelector('#cb-lowshelf').checked = lowShelf; // `highshelf` is a boolean we will declare in a second


  // II. change the value of `highshelf` every time the high shelf checkbox changes state
  document.querySelector('#cb-highshelf').onchange = e => {
    highshelf = e.target.checked;
    toggleHighshelf(); // turn on or turn off the filter, depending on the value of `highshelf`!
  };
  document.querySelector('#cb-lowshelf').onchange = e => {
    lowShelf = e.target.checked;
    toggleLowshelf(); // turn on or turn off the filter, depending on the value of `highshelf`!
  };
  
  // III. 
  toggleHighshelf(); // when the app starts up, turn on or turn off the filter, depending on the value of `highshelf`!
  toggleLowshelf();
} // end setupUI

function loop(){
  /* NOTE: This is temporary testing code that we will delete in Part II */
  requestAnimationFrame(loop);
    
  canvas.draw(drawParams);
}

function toggleHighshelf(){
  if(highshelf){
    audio.biquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime); // we created the `biquadFilter` (i.e. "treble") node last time
    audio.biquadFilter.gain.setValueAtTime(25, audio.audioCtx.currentTime);
  }else{
    audio.biquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
  }
}

function toggleLowshelf(){
  if(lowShelf){
    audio.lowShelfBiquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime);
    audio.lowShelfBiquadFilter.gain.setValueAtTime(15, audio.audioCtx.currentTime);
  }else{
    audio.lowShelfBiquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
  }
}

export {init};