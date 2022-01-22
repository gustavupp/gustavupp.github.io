import getLocalStorage from './getLocalStorage.js'

function addToLocalStorage(object) {
  let localStorageList = getLocalStorage() //assign localstoragelist whatever is currently on local storage
  localStorageList.push(object) //add new item to array

  //filter the new array of objects so it doesn't contain duplicates
  let newLocalStorageList = [
    ...new Map(localStorageList.map((item) => [item.id, item])).values(),
  ]

  localStorage.setItem('bookList', JSON.stringify(newLocalStorageList)) //set the whole thing back to local storage
}

export default addToLocalStorage

/*********************ALTERNATIVE FOR GETTING AN ARRAY OF UNIQUE OBJECTS***********************/

//a more readable implementation of the above code
//let newLocalStorageList = localStorageList.map((item) => item[id], item)
//let uniqueValuesLocalStorageList = [...new Map(newLocalStorageList).values()]

/*----------------------------------------------------------------------------------------------*/

// a more uld fashioned aproach would've filter the array as well
//   let uniqueBooks = []
//   for (let keys in localStorageList) {
//     if (!uniqueBooks.includes(localStorageList[keys])) uniqueBooks.push(localStorageList[keys])
//   }

/************************************************************************************************/
