import getLocalStorage from "./getLocalStorage.js";

function addToLocalStorage(object){
    let localStorageList = getLocalStorage();

    localStorageList.push(object);
    localStorage.setItem("bookList", JSON.stringify(localStorageList));

    console.log(object)
}

export default addToLocalStorage;