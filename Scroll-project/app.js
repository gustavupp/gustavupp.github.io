// dynamically display date
const date = document.getElementById("date").innerHTML = new Date().getFullYear();

//open  and close menu
const toggleBtn = document.querySelector(".nav-toggle");
const navDiv = document.querySelector(".links-container");
const navLinksList = document.querySelector(".links-list");

toggleBtn.addEventListener("click", function() {
    //navDiv.classList.toggle("show-nav"); one way of doing it..not too dynamic if container height changes

   const navDivHeight = navDiv.getBoundingClientRect().height;
   const navLinksListHeight = navLinksList.getBoundingClientRect().height;

   if (navDivHeight === 0) navDiv.style.height = `${navLinksListHeight}px`;
   else navDiv.style.height = 0;
});

//navbar becomes fixed when scrolled past x pixels
const navCenter = document.querySelector(".nav-center");
const navCenterHeight = navCenter.getBoundingClientRect().height;

window.addEventListener("scroll", () => {
    if (window.pageYOffset > navCenterHeight) navCenter.classList.add("fixed-navbar");
    else navCenter.classList.remove("fixed-navbar");
});

//scroll to top button appears after scrolled x pixels
const scrollTopBtn = document.querySelector(".scroll-link-btn");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 400) scrollTopBtn.classList.add("show-scroll-btn");
    else scrollTopBtn.classList.remove("show-scroll-btn");
});

//scrolls to the right height when nav buttons are clicked
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (link) {
    link.addEventListener("click", function(e) {
        //prevent Default
        e.preventDefault();

        //navigates to a specific spot on the page
        const id = e.currentTarget.getAttribute("href").slice(1);
        const element = document.getElementById(id);

        //calculate the heights
        const navHeaderHeight = document.querySelector(".nav-header").getBoundingClientRect().height;
        let position = element.offsetTop - navHeaderHeight;
        window.scrollTo({left: 0, top: position});
        navDiv.style.height = 0;
    });
});