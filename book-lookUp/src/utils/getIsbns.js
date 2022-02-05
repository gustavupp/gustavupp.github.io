import { googleApiKey } from '../app.js'
import displayBestSellerList from './displayBestSellerList.js'

function getIsbns(nyList) {
  if (localStorage.getItem('nyTimesList')) {
    let currentList = JSON.parse(localStorage.getItem('nyTimesList'))
    currentList.forEach((book) => {
      displayBestSellerList(book)
    })
  } else {
    let newData = nyList.results.books

    //iterate through the array and add only the isbn number into a new array
    newData.forEach((item) => {
      let itemIsbnNumber = item.isbns[0].isbn10
      let isbnUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${itemIsbnNumber}`

      fetch(isbnUrl) //fetch each isbn number from google books api
        .then((fetchedData) => fetchedData.json())
        .then((parsedData) => {
          //destructure object
          let newParsedData = parsedData.items[0]

          let {
            id,
            volumeInfo: { categories },
            volumeInfo: { title },
            volumeInfo: { subtitle = '' } = {},
            volumeInfo: { authors },
            volumeInfo: {
              imageLinks: {
                thumbnail = 'https://dummyimage.com/70x100/00f/fff.png&text=No+Cover!',
              } = {},
            },
            volumeInfo: { description },
            volumeInfo: { language },
            volumeInfo: { pageCount },
            volumeInfo: { publishedDate },
            saleInfo: { buyLink },
          } = newParsedData

          const isbn10Number =
            newParsedData.volumeInfo.industryIdentifiers[1].identifier

          let nyLocalStorageList

          if (localStorage.getItem('nyTimesList')) {
            nyLocalStorageList = JSON.parse(localStorage.getItem('nyTimesList'))
            nyLocalStorageList.push({
              id,
              title,
              subtitle,
              authors,
              thumbnail,
              description,
              categories,
              language,
              pageCount,
              publishedDate,
              isbn10Number,
              buyLink,
            })
          } else {
            nyLocalStorageList = [
              {
                id,
                title,
                subtitle,
                authors,
                thumbnail,
                description,
                categories,
                language,
                pageCount,
                publishedDate,
                isbn10Number,
                buyLink,
              },
            ]
          }

          localStorage.setItem(
            'nyTimesList',
            JSON.stringify(nyLocalStorageList)
          )

          displayBestSellerList({
            id,
            title,
            subtitle,
            authors,
            thumbnail,
            description,
            categories,
            language,
            pageCount,
            publishedDate,
            isbn10Number,
            buyLink,
          })
        })
        .catch((err) => console.log(err))
    })
  }
}

export default getIsbns
