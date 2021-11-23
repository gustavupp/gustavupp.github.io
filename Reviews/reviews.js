//reviews data
const reviews = [
{
    id: 0,
    name: 'Gustavo Pereira',
    job: 'Front End Dev',
    img: './images/photo0.png',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere blanditiis inventore cum reiciendis, dolore animi consectetur magni necessitatibus'
},
{
    id: 1,
    name: 'Aristotle',
    job: 'Philosopher',
    img: './images/photo1.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptatibus porro ullam doloremque. Sapiente asperiores voluptate a? Quod.'
},
{
    id: 2,
    name: 'Anthea',
    job: 'Goddess',
    img: './images/photo2.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, necessitatibus non eos odit magnam ipsa similique nostrum ipsam.'
},
{
    id: 3,
    name: 'Khafre',
    job: 'Sphinx',
    img: './images/photo3.png',
    text: 'Facere blanditiis inventore cum reiciendis, dolore animi consectetur magni necessitatibus reprehenderit obcaecati numquam nesciunt tempora itaque nobis.'
},
{
    id: 4,
    name: 'Seneca',
    job: 'Stoic Philosopher',
    img: './images/photo4.png',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere blanditiis inventore cum reiciendis, dolore animi consectetur magni necessitatibus'
}
];

// select items
const author = document.getElementById('author');
const image = document.getElementById('image');
const job = document.getElementById('job');
const info = document.getElementById('info');
const prevBtn = document.querySelector('.prev-button');
const nextBtn = document.querySelector('.next-button');
const randomBtn = document.querySelector('.random-button');

//set first default review when page loads
let currentItem = 0;
window.addEventListener('DOMContentLoaded', showReview(0));

//function to show review
function showReview(person) {
    const item = reviews[person];
    image.src = item.img;
    job.textContent = item.job;
    author.textContent = item.name;
    info.textContent = item.text;
}

//next button
nextBtn.addEventListener('click', function() {
    currentItem++;
    if (currentItem > reviews.length - 1) {
        currentItem = 0;
    }
    showReview(currentItem);
});

//previous button
prevBtn.addEventListener('click', function() {
    currentItem--;
    if (currentItem < 0) {
        currentItem = reviews.length - 1;
    }
    showReview(currentItem);
});

//random button
randomBtn.addEventListener('click', function() {
    currentItem = Math.floor(Math.random() * reviews.length);
    showReview(currentItem);
    console.log(currentItem);
});