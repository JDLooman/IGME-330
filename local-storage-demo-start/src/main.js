import * as storage from "./storage.js"
let items = ["???!!!"];


// I. declare and implement showItems()
// - this will show the contents of the items array in the <ul>
const showItem = () => {
    let newHTML = items.map(x => `<li>${x}</li>`).join("");
    document.querySelector("ol").innerHTML = newHTML;
}

// II. declare and implement addItem(str)
// - this will add str to the items array (so long as str is length 0 or greater)
const addItem = (str) => {
    if(str.value.length > 0){
        items.push(str);
        storage.setFavorites(str);
        console.log("we made it here");
    }
    showItem();
}

// III. declare and implement loadItemsFromLocalStorage()
// - this will load in the favorites array from storage.js
const loadItemsFromLocalStorage = () => {
    const fav = storage.getFavorites();
    items = fav;
    showItem();
}

// Also:
// - be sure to update the <ul> as appropriate
// - be sure to update .localStorage by saving items to .localStorage when appropriate (look in storage.js to see where/how to do this)
loadItemsFromLocalStorage();
document.querySelector("#btn-add").onclick = addItem(document.querySelector("#thing-text").value);