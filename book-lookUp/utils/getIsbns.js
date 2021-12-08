import { googleApiKey } from "../app.js"
import displayBestSellerList from "./displayBestSellerList.js";

function getIsbns(data){
    let newData = data.results.books;
    
    //iterate through the array and add only the isbn number into a new array
    let isbnList = newData.forEach(item => {
        let itemIsbnNumber = item.isbns[0].isbn10;
        let isbnUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${itemIsbnNumber}`;
    
        fetch(isbnUrl) //fetch each isbn number from google books api
        .then(fetchedData => fetchedData.json())
        .then((parsedData)=> {
            displayBestSellerList(parsedData.items[0]);
        })
        .catch((err) => console.log(err));
    });
}

export default getIsbns;