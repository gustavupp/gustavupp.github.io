//import modules
import get from "./utils/getElement.js";
import getData from "./utils/getData.js";
import displayBookSearch from "./utils/displayBookSearch.js";

//grab DOM elements
const cardContainer = get(".card-container");
//const bookImg = get(".book-cover"); 
//const bookTitle = get(".title"); 
//const author = get(".author"); 
//const bookDescription = get(".description"); 
const searchInput = get("input");
const btn = get(".search-btn");
const url = "https://www.googleapis.com/books/v1/volumes?q=";

btn.addEventListener("click",(e)=> {
    e.preventDefault();
    const inputValue = searchInput.value.replace(" ", "+");
    const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&maxResults=40`;
    getData(searchUrl)
    .then(response => {
        cardContainer.innerHTML = displayBookSearch(response);
    })
    .catch(err => console.log(err));
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