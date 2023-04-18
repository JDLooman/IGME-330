import * as bookmark from "./myBookmark.js";
import * as favorite from "./favorite.js";



// const bookmarks = [
//     {
//         text: "Bing",
//         url: "https://www.bing.com",
//         comments: "Bing is a web search engine owned and operated by Microsoft."
//     },
//     {
//         text: "Google",
//         url: "https://www.google.com",
//         comments: "Google Search is a search engine provided and operated by Google."
//     },
//     {
//         text: "DuckDuckGo",
//         url: "https://duckduckgo.com/",
//         comments: "DuckDuckGo (DDG) is an internet search engine that emphasizes protecting searchers' privacy."
//     }
// ];

// window.onload = () => {
//     // // Create a MyBookmark and add it to the list
//     // const bing = document.createElement("my-bookmark");

//     // // ANOTHER way to set custom attributes, the .dataset property
//     // // note that these 2 lines of code will also trigger attributeChangedCallback()
//     // bing.dataset.text = "Bing";
//     // bing.dataset.url = "https://www.bing.com/";

//     // const newLI = document.createElement("li");
//     // newLI.appendChild(bing);
//     // document.querySelector("#bookmarks").appendChild(newLI);

//     for (let i = 0; i < bookmarks.length; i++) {
//         let text = document.createElement("my-bookmark");

//         text.dataset.text = bookmarks[i].text;
//         text.dataset.url = bookmarks[i].url;
//         text.dataset.comments = bookmarks[i].comments;

//         let newLI = document.createElement("li");
//         newLI.appendChild(text);
//         document.querySelector("#bookmarks").appendChild(newLI);
//     }
// };
let favorites = [];
favorites.push(new favorite.Favorite(
    crypto.randomUUID(),
    "RIT",
    "https://www.rit.edu",
    "A private university located near Rochester, NY."
));

const submitClicked = (e) => {
    console.log("submitClicked");  
    
    let textField = document.querySelector("#favorite-text");
    let urlField = document.querySelector("#favorite-url");
    let commentField = document.querySelector("#favorite-comments");

    if(textField.value.trim() === "" || urlField.value.trim() === "" || commentField.value.trim() === ""){
        console.log("there is an empty field");
    }
    else{
        //make our new favorites instance
        let newFav = new favorite.Favorite(
            crypto.randomUUID(),
            textField.value,
            urlField.vlaue,
            commentField.vlaue
        );

        favorites.push(newFav);

        createBookmarkComponent(newFav.fid, newFav.text, newFav.url, newFav.comments);
    }

    e.preventDefault();
    return false;
}

const clearFormField = (e) => {
    document.querySelector("#favorite-text").value="";
    document.querySelector("#favorite-url").value="";
    document.querySelector("#favorite-comments").value="";

    e.preventDefault();
    return false;
}

const loadFavoritesFromStorage = () => {
    for(let i=0; i<favorites.length; i++){
        createBookmarkComponent(favorites[i].fid, favorites[i].text, favorites[i].url, favorites[i].comments);
    }
}

const createBookmarkComponent = (fid, text, url, comments) => {
    let _text = document.createElement("my-bookmark");

    _text.dataset.text = text;
    _text.dataset.url = url;
    _text.dataset.comments = comments;

    let newLI = document.createElement("li");
    newLI.appendChild(_text);
    document.querySelector("#bookmarks").appendChild(newLI);
}

loadFavoritesFromStorage();
document.querySelector("#favorite-submit-botton").onclick = submitClicked;
document.querySelector("#favorite-cancel-button").onclick = clearFormField;