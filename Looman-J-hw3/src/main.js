import * as bookmark from "./myBookmark.js";
import * as favorite from "./favorite.js";
import * as storage from "./storage.js";

export let favorites = [];
let err;

const submitClicked = (e) => {
    let textField = document.querySelector("#favorite-text");
    let urlField = document.querySelector("#favorite-url");
    let commentField = document.querySelector("#favorite-comments");

    if (textField.value.trim() === "" || urlField.value.trim() === "" || commentField.value.trim() === "") {
        err.style.visibility = "visible";
        console.log(err);
    }
    else {
        //make our new favorites instance
        let newFav = new favorite.Favorite(
            crypto.randomUUID(),
            textField.value,
            urlField.value,
            commentField.value
        );

        favorites.push(newFav);
        createBookmarkComponent(newFav.fid, newFav.text, newFav.url, newFav.comments);
        storage.setFavorites(favorites); 
        clearFormField(e);       
    }

    e.preventDefault();
    return false;
}

const clearFormField = (e) => {
    document.querySelector("#favorite-text").value = "";
    document.querySelector("#favorite-url").value = "";
    document.querySelector("#favorite-comments").value = "";
    err.style.visibility = "hidden";

    e.preventDefault();
    return false;
}

const loadFavoritesFromStorage = () => {
    for (let i = 0; i < favorites.length; i++) {
        createBookmarkComponent(favorites[i].fid, favorites[i].text, favorites[i].url, favorites[i].comments);
    }
}

const createBookmarkComponent = (fid, text, url, comments) => {
    let _text = document.createElement("my-bookmark");

    _text.dataset.text = text;
    _text.dataset.url = url;
    _text.dataset.comments = comments;
    _text.dataset.fid = fid;
    console.log(_text);

    let newLI = document.createElement("li");
    newLI.appendChild(_text);
    document.querySelector("#bookmarks").appendChild(newLI);
    document.querySelector(".num-fav").innerHTML = `Number of favorites: ${favorites.length}`;
}

window.onload = () => {
    document.querySelector("#favorite-submit-botton").onclick = (e) =>{
        submitClicked(e);
    };
    document.querySelector("#favorite-cancel-button").onclick = clearFormField;
    err = document.querySelector("#err");
    let newFav = storage.getFavorites();
    console.log(newFav);

    for(let i = 0; i< newFav.length; i++){
        let fav = new favorite.Favorite(
            newFav[i].fid,
            newFav[i].text,
            newFav[i].url,
            newFav[i].comments
        );

        favorites.push(fav);
    };
    
    loadFavoritesFromStorage();
}