//import modules
import get from './utils/getElement.js'
import getIsbns from './utils/getIsbns.js'
import displayBookSearch from './utils/displayBookSearch.js'
import showModal from './utils/showModal.js'
import addToLocalStorage from './utils/addToLocalStorage.js'
import displayBookShelf from './utils/displayBookShelf.js'
import showBookDetails from './utils/showBookDetails.js'
import deleteFromLocalStorage from './utils/deleteFromLocalStorage.js'
import showNyModal from './utils/showNyModal.js'
import getLocalStorage from './utils/getLocalStorage.js'
import './style.css'

//grab DOM elements
export const cardContainer = get('.card-container')
const searchInput = get('input')
const searchBtn = get('.search-btn')
const bookModal = get('.book-modal')
const myShelfBtn = get('.my-shelf-btn')
const searchBooksBtn = get('.search-section-btn')
const searchContainer = get('.search-container')
const myShelf = get('.my-shelf')
export const nyCardContainer = get('.nyList-container')
const bestSellerTitle = get('.best-seller-title')
export const nyWrapperContainer = get('.nyList-wrapper-container')
const myShelfWrapperContainer = get('.my-shelf-wrapper-container')
const cardContainerWrapper = get('.card-container-wrapper')
const resutlsTitle = get('.results-title')
export const myBookShelfCount = get('.myShelf-book-count')
const bookShelfForm = get('.bookShelf-form')
const myShelfInput = get('.myShelf-search')

//global variable to store the json data from the api, so I can access it from any part of the code
let responseObject = []

//get .env variables
const googleApiKey = process.env.GOOGLE_API_KEY
const nyTimesApiKey = process.env.NYTIMES_API_KEY

//when the DOM loads, display booklist on local storage, also fetch NY BestSeller list from api
window.addEventListener('DOMContentLoaded', () => {
  const bestSellerUrl = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${nyTimesApiKey}`

  if (localStorage.getItem('nyList')) {
    let lastFetchedDate = localStorage.getItem('Date')
    let date = new Date()
    date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    if (lastFetchedDate === date) {
      getIsbns(JSON.parse(localStorage.getItem('nyList')))
    } else {
      fetch(bestSellerUrl)
        .then((fetchedData) => fetchedData.json())
        .then((parsedData) => {
          //get new date
          let date = new Date()
          date = `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`

          //add list and date to local storage
          localStorage.setItem('nyList', JSON.stringify(parsedData))
          localStorage.setItem('Date', date)
          getIsbns(parsedData)
        })
        .catch((error) => console.log(error))
    }
  } else {
    fetch(bestSellerUrl)
      .then((fetchedData) => fetchedData.json())
      .then((parsedData) => {
        //get new date
        let date = new Date()
        date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

        //add list and date to local storage
        localStorage.setItem('nyList', JSON.stringify(parsedData))
        localStorage.setItem('Date', date)
        getIsbns(parsedData)
      })
      .catch((error) => console.log(error))
  }
  displayBookShelf(getLocalStorage()) //get my book shelf from local storage
})

//add event listeners to both bottom buttoms
myShelfBtn.addEventListener('click', () => {
  searchContainer.style.visibility = 'hidden'
  myShelfWrapperContainer.style.display = 'block'
  cardContainerWrapper.style.display = 'none'
  nyWrapperContainer.style.display = 'none'
  bestSellerTitle.style.display = 'none'
  myShelfBtn.style.color = 'white'
  searchBooksBtn.style.color = 'rgb(139, 139, 139)'
})

searchBooksBtn.addEventListener('click', () => {
  searchContainer.style.visibility = 'visible'
  myShelfWrapperContainer.style.display = 'none'
  cardContainerWrapper.style.display = 'block'
  nyWrapperContainer.style.display = 'block'
  bestSellerTitle.style.display = 'block'
  myShelfBtn.style.color = 'rgb(139, 139, 139)'
  searchBooksBtn.style.color = 'white'
})

//add event listener for the search button
searchBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const inputValue = searchInput.value.replace(' ', '+')
  const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&maxResults=40`

  fetch(searchUrl)
    .then((fetchedData) => fetchedData.json())
    .then((parsedData) => {
      cardContainer.innerHTML = displayBookSearch(parsedData.items)
      resutlsTitle.style.display = 'block'
      responseObject = parsedData.items
    })
    .catch((err) => console.log(err))
})

//container for the ny times best seller list
nyCardContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('book-cover')) {
    let nyBookData = showNyModal(e.target.dataset.id)
    bookModal.innerHTML = nyBookData.newData

    //grab modal buttons after they have been added to the DOM
    const modalBackBtn = get('.back-btn')
    const favoriteBtn = get('.favorite-btn')
    const bookmarked = get('.bookmarked')
    const notBookmarked = get('.not-bookmarked')

    //open modal
    bookModal.classList.add('show-modal')

    //start listening for clicks on both buttons
    modalBackBtn.addEventListener('click', () => {
      bookModal.classList.remove('show-modal')
    })

    favoriteBtn.addEventListener('click', () => {
      addToLocalStorage(nyBookData.findMatch)

      //addToLocalStorage(nyBookData.localStorageList);
      bookmarked.classList.add('show-btn')
      notBookmarked.classList.remove('show-btn')
      displayBookShelf(getLocalStorage()) //display item right after it has been added
    })
  }
})

//open modal when one of the book thumbnails are clicked
cardContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('book-cover')) {
    //call showModal and pass the id of the target and the parsed object from the api
    showModal(e.target.dataset.id, responseObject)

    //I found a way to return multiple values from the function, as I wanted the destructured object
    let currentBookData = showModal(e.target.dataset.id, responseObject) //assign the values of the return to a variable than as the variable becomes an object you can use dot notation to get specific values.
    bookModal.innerHTML = currentBookData.newData

    //grab modal buttons after they have been added to the DOM
    const modalBackBtn = get('.back-btn')
    const favoriteBtn = get('.favorite-btn')
    const bookmarked = get('.bookmarked')
    const notBookmarked = get('.not-bookmarked')

    //open modal
    bookModal.classList.add('show-modal')

    //start listening for clicks on both buttons
    modalBackBtn.addEventListener('click', () => {
      bookModal.classList.remove('show-modal')
    })
    favoriteBtn.addEventListener('click', () => {
      addToLocalStorage(currentBookData)
      bookmarked.classList.add('show-btn')
      notBookmarked.classList.remove('show-btn')
      displayBookShelf(getLocalStorage()) //display item right after it has been added
    })
  }
})

//open modal when one of the thumbnail on the bookshelf are clicked
myShelf.addEventListener('click', (e) => {
  if (e.target.classList.contains('book-cover')) {
    let targetElementID = e.target.dataset.id
    bookModal.innerHTML = showBookDetails(targetElementID)
    bookModal.classList.add('show-modal')

    //grab modal buttons after they have been added to the DOM
    const modalBackBtn = get('.back-btn')
    const favoriteBtn = get('.favorite-btn')
    const bookmarked = get('.bookmarked')
    const notBookmarked = get('.not-bookmarked')

    //start listening for clicks on both buttons
    modalBackBtn.addEventListener('click', () => {
      bookModal.classList.remove('show-modal')
    })

    favoriteBtn.addEventListener('click', () => {
      deleteFromLocalStorage(targetElementID)
      bookmarked.classList.remove('show-btn')
      notBookmarked.classList.add('show-btn')

      displayBookShelf(getLocalStorage()) //display item right after it has been deleted
    })
  }
})

//search filter on myshelf
bookShelfForm.addEventListener('keyup', function () {
  let inputValue = myShelfInput.value
  inputValue = inputValue.toLowerCase()
  let currentLocalstorage = getLocalStorage()
  if (inputValue) {
    currentLocalstorage = currentLocalstorage.filter((item) => {
      let title = item.title
      title = title.toLowerCase()

      if (title.includes(inputValue)) {
        //had set it up intially with .startsWith() instead of .includes()
        return item
      }
    })
    //console.log(currentLocalstorage)
    displayBookShelf(currentLocalstorage)
    if (currentLocalstorage < 1) {
      myShelf.innerHTML = `<div class="no-matches">No Books Matched Your Search :(</div>`
    }
  } else {
    displayBookShelf(getLocalStorage())
  }
})
