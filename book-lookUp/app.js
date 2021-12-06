//import modules
import get from "./utils/getElement.js";
import getData from "./utils/getData.js";
import displayBookSearch from "./utils/displayBookSearch.js";
import destructureData from "./utils/destructureData.js";
import showModal from "./utils/showModal.js";

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
        destructureData(response);
    })
    .catch(err => console.log(err));
});
    

//open modal when click one of the book thumbnails
cardContainer.addEventListener("click", (e)=> {
    if (e.target.classList.contains("book-cover")) {
        showModal(e.target.dataset.id, responseObject);
        console.log(showModal(e.target.dataset.id, responseObject));
        bookModal.innerHTML = showModal(e.target.dataset.id, responseObject);
        const modalBackBtn = get(".back-btn");
        bookModal.classList.add("show-modal");
        modalBackBtn.addEventListener("click", ()=> {
        bookModal.classList.remove("show-modal");
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