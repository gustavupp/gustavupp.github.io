//import modules
import get from "./utils/getElement.js";
import getData from "./utils/getData.js";
import displayBookSearch from "./utils/displayBookSearch.js";
import showModal from "./utils/showModal.js";
import addToLocalStorage from "./utils/addToLocalStorage.js";
import getLocalStorage from "./utils/getLocalStorage.js";

//grab DOM elements
const cardContainer = get(".card-container");
const searchInput = get("input");
const btn = get(".search-btn");
const url = "https://www.googleapis.com/books/v1/volumes?q=";
const bookModal = get(".book-modal");

//global variables
let responseObject = [];

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
        let arrayResult = showModal(e.target.dataset.id, responseObject); //assign the values of the return to a variable than as the variable becomes an object you can use dot notation to get specific values.
        bookModal.innerHTML = arrayResult.newData;

        //grab modal buttons after they have been added to the DOM
        const modalBackBtn = get(".back-btn");
        const favoriteBtn = get(".favorite-btn");

        //add event listener to them
        bookModal.classList.add("show-modal");
        modalBackBtn.addEventListener("click", ()=> {
        bookModal.classList.remove("show-modal");
        });
        favoriteBtn.addEventListener("click", ()=>{
            addToLocalStorage(arrayResult);
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