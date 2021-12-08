function displayBookSearch(data){
    const result = data.map((item)=>{
        return `<div class="card">
                    <img src="${(item.volumeInfo.imageLinks)? item.volumeInfo.imageLinks.thumbnail : "https://dummyimage.com/120x150/000/fff.png&text=No+Cover!"}" alt="image" class="book-cover" data-id="${item.id}" />
                    <div class="book-info">
                        <p class="title">${item.volumeInfo.title.length > 12? item.volumeInfo.title.slice(0, 12) + "..." : item.volumeInfo.title}</p>
                    </div>
                </div>`;
    }).join("");
    return result;
}

export default displayBookSearch;