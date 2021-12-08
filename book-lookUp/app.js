//import modules
import get from "./utils/getElement.js";
import getIsbns from "./utils/getIsbns.js";
import displayBookSearch from "./utils/displayBookSearch.js";
import showModal from "./utils/showModal.js";
import addToLocalStorage from "./utils/addToLocalStorage.js";
import displayBookShelf from "./utils/displayBookShelf.js";
import showBookDetails from "./utils/showBookDetails.js";
import deleteFromLocalStorage from "./utils/deleteFromLocalStorage.js";
import displayBestSellerList from "./utils/displayBestSellerList.js";
import showNyModal from "./utils/showNyModal.js";

//grab DOM elements
export const cardContainer = get(".card-container");
const searchInput = get("input");
const btn = get(".search-btn");
const bookModal = get(".book-modal");
const myShelfBtn = get(".my-shelf-btn");
const searchBooksBtn = get(".search-section-btn");
const searchContainer = get(".search-container");
const myShelf = get(".my-shelf");
export const nyCardContainer = get(".nyList-container");

//global variable to store the json data from the api, so I can access it from any part of the code
let responseObject = [];
export const googleApiKey = "AIzaSyACW9GJ7NQttkNzbCSFj-F5C2ORvM-8wxw";
const nyTimesApiKey = "Xz8st6xWj2CFpfXmKxDgLaWe9pKSYPRA";

//when the DOM loads, display booklist on local storage
window.addEventListener("DOMContentLoaded", displayBookShelf);

//when DOM loads also fetch NY BestSeller list from api
window.addEventListener("DOMContentLoaded", ()=> {
    const bestSellerUrl = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${nyTimesApiKey}`;
    
    let nyListLocalStorage = "";

    if(localStorage.getItem("nyList")){
        nyListLocalStorage = JSON.parse(localStorage.getItem("nyList"));
    } else {
        fetch(bestSellerUrl)
        .then((fetchedData)=> fetchedData.json())
        .then((parsedData) => {

            localStorage.setItem("nyList", JSON.stringify(parsedData));
            nyListLocalStorage = parsedData;
            })
        .catch((error)=> console.log(error));
    }
    getIsbns(nyListLocalStorage);
});

//add event listeners to both bottom buttoms
myShelfBtn.addEventListener("click", ()=>{
    searchContainer.style.visibility ="hidden";
    myShelf.style.display = "grid";
    cardContainer.style.display = "none";
    nyCardContainer.style.display = "none";
});

searchBooksBtn.addEventListener("click", ()=> {
    searchContainer.style.visibility ="visible";
    myShelf.style.display = "none";
    cardContainer.style.display = "grid";
    nyCardContainer.style.display = "grid"; //come back to fix the logic here
});


//add event listener for the search button
btn.addEventListener("click",(e)=> {
    e.preventDefault();
    const inputValue = searchInput.value.replace(" ", "+");
    const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&maxResults=40`;
    
    fetch(searchUrl)
    .then((fetchedData)=> fetchedData.json())
    .then((parsedData) => {
        cardContainer.innerHTML = displayBookSearch(parsedData.items);
        responseObject = parsedData.items;
    })
    .catch(err => console.log(err));

});
  
//container for the ny times best seller list
nyCardContainer.addEventListener("click", (e)=> {
    if(e.target.classList.contains("book-cover")){
        let nyBookData = showNyModal(e.target.dataset.id);
        bookModal.innerHTML = nyBookData.newData;
        
        //grab modal buttons after they have been added to the DOM
        const modalBackBtn = get(".back-btn");
        const favoriteBtn = get(".favorite-btn");
        const bookmarked = get(".bookmarked")
        const notBookmarked = get(".not-bookmarked");

        //open modal
        bookModal.classList.add("show-modal");

        //start listening for clicks on both buttons
        modalBackBtn.addEventListener("click", ()=> {
        bookModal.classList.remove("show-modal");
        });

        favoriteBtn.addEventListener("click", ()=>{
            addToLocalStorage(nyBookData.findMatch);

            //addToLocalStorage(nyBookData.localStorageList);
            bookmarked.classList.add("show-btn");
            notBookmarked.classList.remove("show-btn");
            displayBookShelf(); //display item right after it has been added
    
        });
    }
});

//open modal when one of the book thumbnails are clicked
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
        const bookmarked = get(".bookmarked")
        const notBookmarked = get(".not-bookmarked");

        //open modal
        bookModal.classList.add("show-modal");

        //start listening for clicks on both buttons
        modalBackBtn.addEventListener("click", ()=> {
        bookModal.classList.remove("show-modal");
        });
        favoriteBtn.addEventListener("click", ()=>{

            addToLocalStorage(currentBookData);
            bookmarked.classList.add("show-btn");
            notBookmarked.classList.remove("show-btn");
            displayBookShelf(); //display item right after it has been added
    
        });
    }
    
});

//open modal when one of the thumbnail on the bookshelf are clicked
myShelf.addEventListener("click", (e)=> {
    if (e.target.classList.contains("book-cover")) {
      let targetElementID = e.target.dataset.id;
      bookModal.innerHTML = showBookDetails(targetElementID);
      bookModal.classList.add("show-modal");
      
      //grab modal buttons after they have been added to the DOM
      const modalBackBtn = get(".back-btn");
      const favoriteBtn = get(".favorite-btn");
      const bookmarked = get(".bookmarked")
      const notBookmarked = get(".not-bookmarked");

      //start listening for clicks on both buttons
        modalBackBtn.addEventListener("click", ()=> {
            bookModal.classList.remove("show-modal");
        });

        favoriteBtn.addEventListener("click", ()=>{
            deleteFromLocalStorage(targetElementID);
            bookmarked.classList.remove("show-btn");
            notBookmarked.classList.add("show-btn");
            displayBookShelf(); //display item right after it has been deleted
        });
    }
});
