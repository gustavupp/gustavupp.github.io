//grab DOM elements
const openButton = document.querySelector('.open-btn');
const closeButton = document.querySelector('.close-btn');
const modal = document.querySelector('.modal-container');
const clickHereToClose = document.querySelector('.clickHere');

//changes the CSS visibility property onClick
openButton.addEventListener('click', () => modal.style.visibility = 'visible');
closeButton.addEventListener('click', () => modal.style.visibility = 'hidden');
clickHereToClose.addEventListener('click', () => modal.style.visibility = 'hidden');