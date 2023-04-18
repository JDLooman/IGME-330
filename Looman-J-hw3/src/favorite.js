export class Favorite{
    // called when the component is first created, but before it is added to the DOM
    constructor(fid, text, url, comments) {
        this.fid = fid;
        this.text = text;
        this.url = url;
        this.comments = comments;
    }
}
