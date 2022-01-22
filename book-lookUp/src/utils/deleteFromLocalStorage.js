import getLocalStorage from "./getLocalStorage.js";

function deleteFromLocalStorage(targetElementID){
    let localStorageList = getLocalStorage(); //get all data from local storage
    
    //filter out the target item from the array
    localStorageList = localStorageList.filter((item)=> {
        if (item.id !== targetElementID){
            return item;
        }
    });
    
    //set filtered array back to local storage
    localStorage.setItem("bookList", JSON.stringify(localStorageList));
}

export default deleteFromLocalStorage;