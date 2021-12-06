function showModal(elementId, object){
    
   const bookMatch = object.find((bookId)=> {
        if (bookId.id === elementId){
            return bookId;
        }
    });

    const { 
        categories,
        volumeInfo: {title},
        volumeInfo: {subtitle = ""} = {},
        volumeInfo: {authors},
        volumeInfo: {imageLinks: {thumbnail = "https://dummyimage.com/70x100/00f/fff.png&text=No+Cover!"} = {}},
        volumeInfo: {description},
        volumeInfo: {language},
        volumeInfo: {pageCount},
        volumeInfo: {publishedDate}
    } = bookMatch;
    console.log(title)
    const formattedData = ()=>{
        return `<div class="top-section">
        <img src="${thumbnail}" alt="book cover" />
        <div class="book-info">
            <h4>${title.length > 60? title.slice(0, 60) + "...": title}</h4>
            <p>${authors}</p>
            <p>${pageCount} Pages</p>
        </div>
    </div>
    <!-----middle section----->
    <div class="middle-section">
        <h4>TITLE</h4>
        <p>${title}</p><br>
        <h4>SUBTITLE</h4>
        <p>${subtitle? subtitle: "This book has no subtitle"}</p><br>
        <h4 class="description-title">DESCRIPTION</h4>
        <p class="description-content">${description}</p><br>
        <h4>CATEGORIES</h4>
        <p>${categories}</p><br>
        <h4>LANGUAGE</h4>
        <p>${language}</p><br>
        <h4>PUBLISHED DATE</h4>
        <p>${publishedDate}</p><br>
    </div>

    <!-----bottom section----->
    <div class="bottom-section">
        <buttom class="back-btn">
            <i class="fas fa-arrow-left"></i>
        </buttom>
        <buttom class="favorite-btn">
            <i class="far fa-bookmark"></i>
        </buttom>
    </div>`;
    }
    
    return formattedData();
}

export default showModal;