//months and weekdays array
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];


//setup each date compoment
const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

//the future date of our choice
//let futureDate = new Date(2021, 11, 4, 12, 0, 0);

//so our countdown doesnt run out we are checking for the current date and setting the contdown to always start 10 days from the current day
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
let tempHour = tempDate.getHours();
let tempMinute = tempDate.getMinutes();

let futureDate = new Date(tempYear, tempMonth, tempDay + 10, tempHour, tempMinute);

//select individual values
const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];
const day = futureDate.getDate();
const hour = futureDate.getHours();
const minute = futureDate.getMinutes();

//add an extra zero if item is a single digit
function format(item) {
    if (item < 10){
        return (item = `0${item}`);
    }
    return item;
}

//write on the appropriate DOM node.
giveaway.textContent = `Giveaway Ends on ${weekday}, ${day} ${month} ${year}, ${hour}:${format(minute)}`;

//get the future date we defined and turn it into miliseconds
const futureTime = futureDate.getTime();

//calculate the remaining time and display on the right DOM node.
function getRemainingTime(){
    const today = new Date().getTime();
    const timeRemaining = futureTime - today;

    //define day hour min and sec in miliseconds
    const oneDay = 1000*60*60*24;
    const oneHour = 1000*60*60;
    const oneMinute = 1000*60;
    const oneSecond = 1000;
    
    //calculate values
    let days = Math.floor(timeRemaining / oneDay);
    let hours = Math.floor((timeRemaining % oneDay) / oneHour);
    let minutes = Math.floor((timeRemaining % oneHour) / oneMinute);
    let seconds = Math.floor((timeRemaining % oneMinute) / oneSecond);

    //create an array with the values in the right order 
    const values = [days, hours, minutes, seconds];

    //loop through the items and assign the current index to each item
    items.forEach((item, index) => {
        item.innerHTML = format(values[index]); //call the format function when writing on the html
    });
    //for (let i = 0; i < items.length; i++){   example with a for loop
    //    items[i].innerHTML = values[i];
    //}

    //stops the countdown function from executing and displays a message when it gets to zero
    if (timeRemaining < 0){
        clearInterval(conwtdown);
        deadline.innerHTML = `<h2 style="color: orangered;">Sorry, this giveaway has expired :(</h2>`;
    }
}

let conwtdown = setInterval(getRemainingTime, 1000);

getRemainingTime();