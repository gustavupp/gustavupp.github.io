//import modules
import get from "./utils/getElement.js";
import getData from "./utils/getData.js";
import displayBookSearch from "./utils/displayBookSearch.js";
import showModal from "./utils/showModal.js";
import addToLocalStorage from "./utils/addToLocalStorage.js";
import getLocalStorage from "./utils/getLocalStorage.js";
import displayBookShelf from "./utils/displayBookShelf.js";

//grab DOM elements
const cardContainer = get(".card-container");
const searchInput = get("input");
const btn = get(".search-btn");
const url = "https://www.googleapis.com/books/v1/volumes?q=";
const bookModal = get(".book-modal");
const myShelfBtn = get(".my-shelf-btn");
const searchBooksBtn = get(".search-section-btn");
const searchContainer = get(".search-container");
const myShelf = get(".my-shelf");

//global variables
let responseObject = [];

//when the DOM loads, display booklist on local storage
window.addEventListener("DOMContentLoaded", displayBookShelf);


//add event listeners to both bottom buttoms
myShelfBtn.addEventListener("click", ()=>{
    searchContainer.style.visibility ="hidden";
    myShelf.style.display = "grid";
    cardContainer.style.display = "none";
});

searchBooksBtn.addEventListener("click", ()=> {
    searchContainer.style.visibility ="visible";
    myShelf.style.display = "none";
});

//add event listener to the search button
btn.addEventListener("click",(e)=> {
    e.preventDefault();
    const inputValue = searchInput.value.replace(" ", "+");
    const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&maxResults=40`;
    getData(searchUrl)
    .then(response => {
        cardContainer.innerHTML = displayBookSearch(response);
        responseObject = JSON.parse(response);
        responseObject = responseObject.items;
    })
    .catch(err => console.log(err));
});
    

//open modal when click one of the book thumbnails
cardContainer.addEventListener("click", (e)=> {
    if (e.target.classList.contains("book-cover")) {
        //call showModal and pass the id of the target and the parsed object from the api
        showModal(e.target.dataset.id, responseObject);
        
        //I found a way to return multiple values from the function, as I wanted the destructured object
        let currentBookData = showModal(e.target.dataset.id, responseObject); //assign the values of the return to a variable than as the variable becomes an object you can use dot notation to get specific values.
        bookModal.innerHTML = currentBookData.newData;

        //grab modal buttons after they have been added to the DOM
        const modalBackBtn = get(".back-btn");
        const favoriteBtn = get(".favorite-btn");

        //add event listener to them
        bookModal.classList.add("show-modal");

        //start listening for clicks on both buttons
        modalBackBtn.addEventListener("click", ()=> {
        bookModal.classList.remove("show-modal");
        });
        favoriteBtn.addEventListener("click", ()=>{
            addToLocalStorage(currentBookData);
        });
    }
    
});



    /*
    function handleResponse(response) {
      for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i];
        content.innerHTML += `<br><img src="${(item.volumeInfo.imageLinks) ? img.src= item.volumeInfo.imageLinks.thumbnail : img.alt = "NO IMG :("}" alt="${item.volumeInfo.title}" class="img" style="max-width: 150px;">
        <h3>${item.volumeInfo.title}</h3>` ;
      }
    }
    */