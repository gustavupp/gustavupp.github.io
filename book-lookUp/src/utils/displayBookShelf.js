import getLocalStorage from "./getLocalStorage.js";
import get from "./getElement.js";
import { myBookShelfCount } from "../app.js";


function displayBookShelf(localStorageContent){
    
    let localStorageList = localStorageContent;

    //quick setup to count the amount of books in the bookShelf
    let bookShelfCounter = 0;
    for (let book in localStorageList){
        bookShelfCounter++
    }
    myBookShelfCount.textContent = `(${bookShelfCounter} Books)`; //book count displayed at myshelf

    //iterate through the array and render html
    localStorageList = localStorageList.map((item)=>{
        return `<div class="card">
                    <img src="${item.thumbnail}" alt="image" class="book-cover" data-id="${item.id}"; />
                    <div class="book-info">
                        <p class="title">${item.title.length > 11 ? item.title.slice(0, 11) + "..." : item.title}</p>
                    </div>
                </div>`;
    }).join("");

    //grab parent element and apend bookList
    const myShelf = get(".my-shelf");
    myShelf.innerHTML = localStorageList;
    return localStorageList;
}

export default displayBookShelf;