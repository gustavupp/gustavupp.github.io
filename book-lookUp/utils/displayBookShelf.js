import getLocalStorage from "./getLocalStorage.js";
import get from "./getElement.js";

function displayBookShelf(){

    let localStorageList = getLocalStorage();
    localStorageList = localStorageList.map((item)=>{
        return `<div class="card">
                    <img src="${item.thumbnail}" alt="image" class="book-cover" data-id="${item.id}"; />
                    <div class="book-info">
                        <p class="title">${item.title.length > 12 ? item.title.slice(0, 12) + "..." : item.title}</p>
                    </div>
                </div>`;
    }).join("");

    //grab parent element and apend bookList
    const myShelf = get(".my-shelf");
    myShelf.innerHTML = localStorageList;

    return localStorageList;
}

export default displayBookShelf;