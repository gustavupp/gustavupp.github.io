import getLocalStorage from "./getLocalStorage.js";

function showNyModal(targetElementID){
    //console.log(targetElementID)

    let localStorageList = JSON.parse(localStorage.getItem("nyTimesList"));
    
    let findMatch = localStorageList.find((book)=>{
        if(book.id === targetElementID){
            return book;
        }
    });

    let formattedData = ()=> {
        return `<div class="top-section">
                    <img src="${findMatch.thumbnail}" data-id="${findMatch.id}" alt="book cover" />
                    <div class="book-info">
                        <h4>${findMatch.title.length > 50? findMatch.title.slice(0, 50) + "...": findMatch.title}</h4>
                        <p>${findMatch.authors > 20? findMatch.authors.slice(0, 20) + "...": findMatch.authors}</p>
                        <p>${findMatch.pageCount} Pages</p>
                    </div>
                </div>
                <!-----middle section----->
                <div class="middle-section">
                    <h4>TITLE</h4>
                    <p>${findMatch.title}</p><br>
                    <h4>SUBTITLE</h4>
                    <p>${findMatch.subtitle}</p><br>
                    <h4>AUTHORS</h4>
                    <p>${findMatch.authors}</p><br>
                    <h4 class="description-title">DESCRIPTION</h4>
                    <p class="description-content">${findMatch.description}</p><br>
                    <h4>CATEGORIES</h4>
                    <p>${findMatch.categories}</p><br>
                    <h4>LANGUAGE</h4>
                    <p>${findMatch.language}</p><br>
                    <h4>PUBLISHED DATE</h4>
                    <p>${findMatch.publishedDate}</p><br>
                    <h4>ISBN</h4>
                    <p>${findMatch.isbn10Number}</p>
                </div>

                <!-----bottom section----->
                <div class="bottom-section">
                    <buttom class="back-btn">
                        <i class="fas fa-arrow-left"></i>
                    </buttom>
                    <buttom class="favorite-btn">
                        <span class="not-bookmarked  show-btn">
                            <i class="far fa-bookmark"></i>
                        </span>
                        <span class="bookmarked">
                            <i class="fas fa-bookmark"></i>
                        </span>
                    </buttom>
                </div>`;
    }
    let newData = formattedData();
    return {newData, findMatch};
}

export default showNyModal;