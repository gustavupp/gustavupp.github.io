function displayBookSearch(data){
    const searchData = JSON.parse(data);
    const searchData1 = searchData.items
        
    const result = searchData1.map((item)=>{
        return `<div class="card">
        <a href="#"><img src="${(item.volumeInfo.imageLinks)? item.volumeInfo.imageLinks.thumbnail : "https://dummyimage.com/120x150/000/fff.png&text=No+Cover!"}" alt="image" class="book-cover" data-id="${item.id}" style="max-width: 150px;" /></a>
        <div class="book-info">
            <p class="title">${item.volumeInfo.title.length > 12? item.volumeInfo.title.slice(0, 12) + "..." : item.volumeInfo.title.length}</p>
        </div>
        </div>`;
    }).join("");
    return result;
}

export default displayBookSearch;