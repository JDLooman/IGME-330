import {randomElement} from "./utils.js";

let json;
let words1;
let words2;
let words3;

function loadJsonXHR(){
    const url = "data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        const string = e.target.responseText;
       
        try{
            json = JSON.parse(string);
        }catch(err){
            console.log(`ERROR: ${err}`);
            document.querySelector("#output").innerHTML = "JSON ERROR";
            return;
        }

        words1 = json.words1;
        words2 = json.words2;
        words3 = json.words3;
        init();
    };
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("Get", url);
    xhr.send();
}

const init = () =>{
    generateTechno(0);
    document.querySelector("#my-button").addEventListener("click", () => generateTechno(0));
    document.querySelector("#five-technobabble").addEventListener("click", () => generateTechno(4));

}

const generateTechno = (num) =>{
    let words = `${randomElement(words1)} ${randomElement(words2)} ${randomElement(words3)}!<br>`;
    for(let i = 0; i < num; i++){
        words += `${randomElement(words1)} ${randomElement(words2)} ${randomElement(words3)}!<br>`;
    }
    document.querySelector("#output").innerHTML = words;
    console.log(words);
}

loadJsonXHR();