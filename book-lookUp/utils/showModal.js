function showModal(elementId, object){
    
   const bookMatch = object.find((bookId)=> {
        if (bookId.id === elementId){
            return bookId;
        }
    });

    const { 
        volumeInfo: {title},
        volumeInfo: {subtitle},
        volumeInfo: {authors},
        volumeInfo: {imageLinks: {thumbnail = "https://dummyimage.com/70x100/00f/fff.png&text=No+Cover!"} = {}},
        volumeInfo: {description},
        volumeInfo: {language},
        volumeInfo: {pageCount},
        volumeInfo: {publishedDate}
    } = bookMatch;

    const formattedData = ()=>{
        return `<div class="top-section">
        <img src="${thumbnail}" alt="book cover" />
        <div class="book-info">
            <h4>${title}</h4>
            <h4>${subtitle}</h4>
            <p>${authors}</p>
            <p>${pageCount} pages</p>
        </div>
    </div>
    <!-----middle section----->
    <div class="middle-section">
        <h4 class="description-title">DESCRIPTION</h4>
        <p class="description-content">${description}</p>
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