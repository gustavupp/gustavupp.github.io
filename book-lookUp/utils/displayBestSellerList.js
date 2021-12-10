import { nyCardContainer } from "../app.js"

function displayBestSellerList(isbnList){
    let cardNode = document.createElement("div"); //create new "card" node for every call
    cardNode.classList.add("card"); //add the "card" class

    //render this html content to the node
    cardNode.innerHTML = `
                            <img src="${(isbnList.thumbnail)? isbnList.thumbnail : "https://dummyimage.com/120x150/000/fff.png&text=No+Cover!"}" alt="image" class="book-cover" data-id="${isbnList.id}" />
                            <div class="book-info">
                                <p class="title">${isbnList.title.length > 11? isbnList.title.slice(0, 11) + "..." : isbnList.title}</p>
                            </div>
                        `;

    //let nyCardContainer = document.querySelector(".nyList-container");
    nyCardContainer.appendChild(cardNode); //finally apend node to the "cardContainer" node
}

export default displayBestSellerList;