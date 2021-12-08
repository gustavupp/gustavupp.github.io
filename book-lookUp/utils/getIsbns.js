import { googleApiKey } from "../app.js"
import displayBestSellerList from "./displayBestSellerList.js";

function getIsbns(data){
    let newData = data.results.books;
    let isbnListReady = [];

    //iterate through the array and add only the isbn number into a new array
    let isbnList = newData.forEach(item => {
        let itemIsbnNumber = item.isbns[0].isbn10;
        let isbnUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${itemIsbnNumber}`;
    
        fetch(isbnUrl) //fetch each isbn number from google books api
        .then(fetchedData => fetchedData.json())
        .then((parsedData)=> {
            //console.log(parsedData.items)
                isbnListReady.push(parsedData.items[0]);
        })
        .catch((err) => console.log(err));
    });
    
    return isbnListReady;

    //isbnList.map(element => { });
    

    /*let bsBookList = data.results.books;
    console.log(bsBookList)
    let formattedList = bsBookList.map((book)=>{
        return `<div class="card">
                    <img src="${(book.book_image)? book.book_image : "https://dummyimage.com/120x150/000/fff.png&text=No+Cover!"}" alt="image" class="book-cover" data-id="" />
                    <div class="book-info">
                        <p class="title">${book.title.length > 12? book.title.slice(0, 12) + "..." : book.title}</p>
                    </div>
                </div>`;
    }).join("");
    console.log(formattedList)
    return formattedList;*/
}

export default getIsbns;