const defaultData = {
    "favorites": [
        {
            fid: "1234",
            text: "CIA",
            url: "https://cia.gov",
            comments: "The Agency."
        }        
    ]
}
let storeName = "jdl9046-hw3-data";

const readLocalStorage = () => {
    let allValues = null;
    try {
        allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
    } catch (err) {
        console.log(`Problem with JSON.parse() and ${storeName} !`);
        throw err;
    }
    return allValues;
};

const writeLocalStorage = (allValues) => {
    localStorage.setItem(storeName, JSON.stringify(allValues));
};

//  PUBLIC
const clearLocalStorage = () => writeLocalStorage(defaultData);

const getFavorites = () => readLocalStorage().favorites;

const setFavorites = (favoritesArray) => {
    const allValues = readLocalStorage();
    allValues.favorites = favoritesArray;
    console.log(allValues.favorites);
    writeLocalStorage(allValues);
};

const clearFavorites = () => {
    const allValues = readLocalStorage();
    allValues.favorites = [];
    writeLocalStorage(allValues);
};

export { clearFavorites, clearLocalStorage, setFavorites, getFavorites };