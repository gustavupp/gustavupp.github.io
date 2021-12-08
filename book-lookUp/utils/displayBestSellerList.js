function displayBestSellerList(isbnList){
    console.log(isbnList)
    
    let formattedList = isbnList.map(item => {
        //console.log(item)
        return `<div class="card">
                    <img src="${(item.volumeInfo.imageLinks)? item.volumeInfo.imageLinks.thumbnail : "https://dummyimage.com/120x150/000/fff.png&text=No+Cover!"}" alt="image" class="book-cover" data-id="${item.id}" />
                    <div class="book-info">
                        <p class="title">${item.volumeInfo.title.length > 12? item.volumeInfo.title.slice(0, 12) + "..." : item.volumeInfo.title}</p>
                    </div>
                </div>`;
    }).join();
        
    //console.log(formattedList)
}

export default displayBestSellerList;