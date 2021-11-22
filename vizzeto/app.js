// dynamically display date at footer
const date = document.getElementById("date").innerHTML = new Date().getFullYear();

//grab DOM elements and assign to variables
const toggleBtn = document.querySelector(".nav-toggle");
const navDiv = document.querySelector(".links-container");
const navLinksList = document.querySelector(".links-list");

toggleBtn.addEventListener("click", function() {
    //navDiv.classList.toggle("show-nav"); one way of doing it..not dynamic. if elements are excluded or added to the list the ul size will change hence changing the height of the container.

   const navDivHeight = navDiv.getBoundingClientRect().height; //the getBoundingClientRect method returns a right/left/top.bottom position of the html element relative to the View Port
   const navLinksListHeight = navLinksList.getBoundingClientRect().height;

   if (navDivHeight === 0) navDiv.style.height = `${navLinksListHeight}px`; //this changes the div that wraps the "ul".. we are determining the height of this div container by the size of the "ul"...if it changes then the container height will follow
   else navDiv.style.height = 0;
});

//navbar becomes fixed when scrolled past x pixels
const navCenter = document.querySelector(".nav-center");
const navCenterHeight = navCenter.getBoundingClientRect().height; 

window.addEventListener("scroll", () => {
    if (window.pageYOffset > navCenterHeight) navCenter.classList.add("fixed-navbar"); //we add this class to the navBar to change its features when past certain height
    else navCenter.classList.remove("fixed-navbar");
});

//scroll to top button appears after scrolled x pixels
const scrollTopBtn = document.querySelector(".scroll-link-btn");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 400) scrollTopBtn.classList.add("show-scroll-btn");
    else scrollTopBtn.classList.remove("show-scroll-btn");
});

//scrolls to the exact height/position when nav buttons are clicked
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (link) { //select all links and loop through to listen for a click event.
    link.addEventListener("click", function(e) {

        //prevent the Default behaviour which is to go to #theID
        e.preventDefault();

        //navigates to a specific height on the page
        const id = e.currentTarget.getAttribute("href").slice(1); //as the attribute href would come #id, I had to use .slice() to remove the "#" to be able to pass in the add as an argument to the .getElementById()
        
        const element = document.getElementById(id); 

        //calculate the height to go to by subtracting the nav-bar height
        const navHeaderHeight = document.querySelector(".nav-header").getBoundingClientRect().height;
        let position = element.offsetTop - navHeaderHeight; //offsetTop gives us a fixed position of an element on the document..(relative to its parent element with a postition other than static or the body)
        
        window.scrollTo({left: 0, top: position}); //actually scroll to desired location
        navDiv.style.height = 0; //close the menu container
    });
});

const menu = [
    {
        id: 1,
        title: "FRANGO CATUPIRY",
        category: "Brazuca Range",
        price: 31,
        img: "./images/img1.png",
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione magnam accusantium omnis minima distinctio vel et laudantium reiciendis aliquid?`
    },
    {
        id: 2,
        title: "PORTUGA",
        category: "Brazuca Range",
        price: 30,
        img: "./images/img2.png",
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione magnam accusantium omnis minima distinctio vel et laudantium reiciendis aliquid?`
    },
    {
        id: 3,
        title: "5 CHEESE",
        category: "Brazuca Range",
        price: 30,
        img: "./images/img3.png",
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione magnam accusantium omnis minima distinctio vel et laudantium reiciendis aliquid?`
    },
    {
        id: 4,
        title: "CARNE SECA",
        category: "Brazuca Range",
        price: 31,
        img: "./images/img4.png",
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione magnam accusantium omnis minima distinctio vel et laudantium reiciendis aliquid?`
    },
    {
        id: 5,
        title: "DON VITO",
        category: "Chef's Range",
        price: 34,
        img: "./images/img5.png",
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione magnam accusantium omnis minima distinctio vel et laudantium reiciendis aliquid?`
    },
    {
        id: 6,
        title: "DON ZZETO",
        category: "Chef's Range",
        price: 34,
        img: "./images/img6.png",
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione magnam accusantium omnis minima distinctio vel et laudantium reiciendis aliquid?`
    },
    {
        id: 7,
        title: "ULURU",
        category: "Classic Range",
        price: 31,
        img: "./images/img7.png",
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione magnam accusantium omnis minima distinctio vel et laudantium reiciendis aliquid?`
    },
    {
        id: 8,
        title: "MEAT MATE",
        category: "Classic Range",
        price: 30,
        img: "./images/img8.png",
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione magnam accusantium omnis minima distinctio vel et laudantium reiciendis aliquid?`
    },
    {
        id: 9,
        title: "NUTELA & MORANGO",
        category: "Sweet",
        price: 23,
        img: "./images/img9.png",
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione magnam accusantium omnis minima distinctio vel et laudantium reiciendis aliquid?`
    },
    {
        id: 10,
        title: "DOCE DE LEITE",
        category: "Sweet",
        price: 23,
        img: "./images/img10.png",
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione magnam accusantium omnis minima distinctio vel et laudantium reiciendis aliquid?`
    },
    ];
    
    const gridContainer = document.querySelector('.grid-container');
    const buttonContainer = document.querySelector('.button-container');
    
    //load full menu and CategoryButtons
    window.addEventListener('DOMContentLoaded', function() {
        displayMenuItems(menu);
        displayCategoryItems();
    });
    
    //display the HTML dynamically according to the Values in the Array
    function displayMenuItems(menuItems) {
        let displayMenu = menuItems.map(function(item) {
            return `<div class="menu-item-container">
                        <img class="thumbnails" src=${item.img} />
                        <div class="item-info">
                            <div class="menu-item-header">
                                <h4>${item.title}</h4>
                                <h4 class="price">$${item.price}</h4>
                            </div>
                            <hr>
                            <p class="item-text">
                                ${item.desc}
                            </p>
                        </div>
                    </div>`;
        });
        displayMenu = displayMenu.join("");
        gridContainer.innerHTML = displayMenu;
    }
    
    function displayCategoryItems() {
        //load buttons according to obj's categories
        const categories = menu.reduce(function(acumulator, current) {
            if (!acumulator.includes(current.category)) {
                acumulator.push(current.category);
            }
            return acumulator;
        },['Full Menu']);
    
        const categoryButtons = categories.map(function(ctg) {
            return `<button class="filter-button" type="button" data-category="${ctg}">${ctg}</button>`;
        }).join("");
       
        buttonContainer.innerHTML = categoryButtons;
        const filterButtons = document.querySelectorAll('.filter-button');
    
        //filter menu items
        filterButtons.forEach(function (btn) {
            btn.addEventListener('click', function(e) {
                const category = e.currentTarget.dataset.category;
                const menuCategory = menu.filter(function(menuItem) {
                    if (menuItem.category === category) {
                        return menuItem;
                    }
                });
    
                if (category === 'Full Menu') {
                    displayMenuItems(menu);
                } else {
                    displayMenuItems(menuCategory)
                }
            });
        });
    }

    //about us section
    const articleContainer = document.querySelector(".articles-and-buttons-container");
    const aboutButtons = document.querySelectorAll(".tab-btn");
    const articles = document.querySelectorAll(".article");
    
    articleContainer.addEventListener("click", (e) => {
        const articleId = e.target.dataset.id;
        if (articleId) {
            aboutButtons.forEach((button) => {
                button.classList.remove("active");
                e.target.classList.add("active");
            });
            
            articles.forEach((article) => {
                article.classList.remove("active");
                document.getElementById(articleId).classList.add("active");
            });
            
        }
    });
