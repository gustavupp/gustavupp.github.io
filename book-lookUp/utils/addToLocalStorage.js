import getLocalStorage from "./getLocalStorage.js";

function addToLocalStorage(object){
    let localStorageList = getLocalStorage(); //assign localstoragelist whatever is currently on local storage
    localStorageList.push(object); //add new item to array
    localStorage.setItem("bookList", JSON.stringify(localStorageList)); //set the whole thing back to local storage
}

export default addToLocalStorage;