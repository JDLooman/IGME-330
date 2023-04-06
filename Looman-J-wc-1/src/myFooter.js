class MyFooter extends HTMLElement{
    constructor(){
        super();
        this.name = "Not Correct";
        this.year = "2002";
    }

    static get observedAttributes(){
        return ["data-name", "data-year"];
    }
    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(attribute, oldValue, newValue){
        console.log(attribute, oldValue, newValue);
        if(oldValue === newValue) return;
        if(attribute == "data-name"){
            this.name = newValue;
        }
        if(attribute == "data-year"){
            this.year = newValue;
        }
        this.render();
    }

    render(){
        this.innerHTML = `<p>&copy;</p> `;
        this.textContent += `${this.year} ${this.name}!`;
    }
}

customElements.define('my-footer', MyFooter);