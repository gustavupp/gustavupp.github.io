import { cardContainer } from "../app.js"

function displayBestSellerList(isbnList){

    let cardNode = document.createElement("div");
    cardNode.classList.add("card");

    
        cardNode.innerHTML = `<div class="card">
                                <img src="${(isbnList.volumeInfo.imageLinks)? isbnList.volumeInfo.imageLinks.thumbnail : "https://dummyimage.com/120x150/000/fff.png&text=No+Cover!"}" alt="image" class="book-cover" data-id="${isbnList.id}" />
                                <div class="book-info">
                                    <p class="title">${isbnList.volumeInfo.title.length > 12? isbnList.volumeInfo.title.slice(0, 12) + "..." : isbnList.volumeInfo.title}</p>
                                </div>
                            </div>`;
    
    cardContainer.appendChild(cardNode);
}

export default displayBestSellerList;