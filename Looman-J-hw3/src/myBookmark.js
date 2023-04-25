import * as main from "./main.js";
import * as storage from "./storage.js";

const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">
    <style>
        :host{
            display: inline-block;
            height:3rem;
            line-height:3rem;
        }
        #link{
            display: inline-block;
            width: 8rem;
        }
        #buttons{
            display: inline-block;
            vertical-align: middle;
            line-height: normal;
        }
        a{
            display: inline-block;
            vertical-align: middle;
            line-height: normal;
        }
    </style>
    <div class="has-background-link pl-1 pr-1">
        <span id="link" class="is-family-sans-serif">
            <a href="" class="has-text-light" target="_blank">???</a>
        </span>
        <span id="buttons">
            <button class="but-fav button is-success is-small" disabled>
                <span class="icon is-small">
                    <i class="fas fa-check"></i>
                </span>
                <span>Favorite</span>
            </button>
            <button class="but-del button is-warning is-small">
                <span>Delete</span>
                <span class="icon is-small">
                    <i class"fas fa-times"></i>
                </span>
            </button>
        </span>
    </div>
    `;


class MyBookmark extends HTMLElement {
    // called when the component is first created, but before it is added to the DOM
    constructor() {
        super();
        this._text = "RIT";
        this._url = "https://www.rit.edu/";
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._comments = "No comments found";
        this._fid = crypto.randomUUID();

        let butDelete = this.shadowRoot.querySelector(".but-del");

        butDelete.onclick = () => {
            deleteFavorite(this._fid);
            this.parentElement.remove();
        }
    }

    // tell the component what attributes to "watch"
    static get observedAttributes() {
        return ["data-text", "data-url", "data-comments","data-fid"];
    }

    // ** lifecycle events **

    // called when the component is inserted into the DOM
    connectedCallback() {
        this.render();
    }

    // this method is invoked each time one of the component's "watched" attributes changes
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (attributeName == "data-text") {
            this._text = newValue;
        }
        if (attributeName == "data-url") {
            this._url = newValue;
        }
        if(attributeName == "data-comments"){
            this._comments = newValue;
        }
        if(attributeName == "data-fid"){
            this._fid = newValue;
        }
        this.render();
    }

    // helper method
    render() {
        let a = this.shadowRoot.querySelector("a");
        if (a) {
            a.href = this._url;
            a.textContent = this._text;
            a.title = this._comments;
        }
    }
}

const deleteFavorite = (fid) => {
    //https://sentry.io/answers/remove-specific-item-from-array/#:~:text=If%20you%20want%20to%20remove,to%20remove%20the%20first%20element.
    console.log(fid);
    for(let i = 0; i < main.favorites.length; i++){
        console.log(main.favorites[i].fid);
        if(fid == main.favorites[i].fid){
            console.log("we are here");
            main.favorites.splice(i, 1);
        }
    }  
    console.log(main.favorites);
    //we can clear and set the favorites here
    storage.setFavorites(main.favorites);
    
    document.querySelector(".num-fav").innerHTML = `Number of favorites: ${main.favorites.length}`;
}

customElements.define('my-bookmark', MyBookmark);

export { MyBookmark };