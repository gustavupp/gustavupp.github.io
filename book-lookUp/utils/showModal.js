
function showModal(elementId, object){

    //find the book that was clicked on by searching the array of objects for the book ID
   const bookMatch = object.find((bookId)=> {
        if (bookId.id === elementId){
            return bookId;
        }
    });
    
    //deconstruct responseObject
    const { 
        id,
        volumeInfo: {categories},
        volumeInfo: {title},
        volumeInfo: {subtitle = ""} = {},
        volumeInfo: {authors},
        volumeInfo: {imageLinks: {thumbnail = "https://dummyimage.com/70x100/00f/fff.png&text=No+Cover!"} = {}},
        volumeInfo: {description},
        volumeInfo: {language},
        volumeInfo: {pageCount},
        volumeInfo: {publishedDate}, 
    } = bookMatch;
    
    const isbn10Number = bookMatch.volumeInfo.industryIdentifiers[1].identifier;
    

    //format the data that will return from the function, ready to be displayed
    const formattedData = ()=>{
        return `<div class="top-section">
                    <img src="${thumbnail}" alt="book cover" />
                    <div class="book-info">
                        <h4>${title.length > 50? title.slice(0, 50) + "...": title}</h4>
                        <p>${authors > 20? authors.slice(0, 20) + "...": authors}</p>
                        <p>${pageCount} Pages</p>
                    </div>
                </div>
                <!-----middle section----->
                <div class="middle-section">
                    <h4>TITLE</h4>
                    <p>${title}</p><br>
                    <h4>SUBTITLE</h4>
                    <p>${subtitle? subtitle: "This book has no subtitle"}</p><br>
                    <h4>AUTHORS</h4>
                    <p>${authors}</p><br>
                    <h4 class="description-title">DESCRIPTION</h4>
                    <p class="description-content">${description}</p><br>
                    <h4>CATEGORIES</h4>
                    <p>${categories}</p><br>
                    <h4>LANGUAGE</h4>
                    <p>${language}</p><br>
                    <h4>PUBLISHED DATE</h4>
                    <p>${publishedDate}</p><br>
                    <h4>ISBN</h4>
                    <p>${isbn10Number}</p>
                </div>

                <!-----bottom section----->
                <div class="bottom-section">
                    <buttom class="back-btn">
                        <i class="fas fa-arrow-left"></i>
                    </buttom>
                    <buttom class="favorite-btn">  
                        <span class="not-bookmarked show-btn">
                            <i class="far fa-bookmark"></i>
                        </span>
                        <span class="bookmarked">
                            <i class="fas fa-bookmark"></i>
                        </span>
                    </buttom>
                </div>`;
    }
    let newData = formattedData();
    return {newData, id, title, subtitle, authors, thumbnail, description, categories, language, pageCount, publishedDate, isbn10Number};
}

export default showModal;