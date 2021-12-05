//import modules
import displayBookSearch from "./utils/displayBookSearch.js";

//grab DOM elements
const cardContainer = document.querySelector(".card-container");
const bookImg = document.querySelector(".img"); 
const bookTitle = document.querySelector(".title"); 
const author = document.querySelector(".author"); 
const bookDescription = document.querySelector(".description"); 
const searchInput = document.querySelector("input");
const btn = document.querySelector(".search-btn");
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
    
function getData(url){
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState !== 4) return;
            if (xhr.status === 200){
                resolve(xhr.responseText);
            } else {
                reject({ 
                    status: xhr.status,
                    text: xhr.statusText, 
                });
            }
        }
    });
}



    /*
    function handleResponse(response) {
      for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i];
        content.innerHTML += `<br><img src="${(item.volumeInfo.imageLinks) ? img.src= item.volumeInfo.imageLinks.thumbnail : img.alt = "NO IMG :("}" alt="${item.volumeInfo.title}" class="img" style="max-width: 150px;">
        <h3>${item.volumeInfo.title}</h3>` ;
      }
    }
    */