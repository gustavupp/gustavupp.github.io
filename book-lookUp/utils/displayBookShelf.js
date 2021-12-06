import getLocalStorage from "./getLocalStorage.js";
import get from "./getElement.js";

function displayBookShelf(){

    let localStorageList = getLocalStorage();
    localStorageList = localStorageList.map((item)=>{
        return `<div class="card">
        <a href="#"><img src="${item.thumbnail}" alt="image" class="book-cover" data-id="id" style="max-width: 150px;" /></a>
        <div class="book-info">
            <p class="title">${item.title}</p>
        </div>
        </div>`;
    }).join("");
    console.log(localStorageList)

    const myShelf = get(".my-shelf");
    myShelf.innerHTML = localStorageList;
    
    return localStorageList;
}

export default displayBookShelf;