function getLocalStorage(){
   
    //check if there are item in the local storage; if there are, fetch them; if there aren't, return an empty array.
    return localStorage.getItem('bookList')? JSON.parse(localStorage.getItem('bookList')) : [];
}

export default getLocalStorage;