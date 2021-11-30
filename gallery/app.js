//function to grab items from the DOM
function getDomElement(selection){
    const ELEMENT = document.querySelector(selection);
    if (ELEMENT){
        return ELEMENT;
    } else {
        throw new Error(`Check "${selection}". No such element exists`);
    }
}


/***********************CREATE CONSTRUCTOR FUNCTION******************************/
//Constructor function
function Gallery(element){
    //grab elements from section
    this.section = element;
    this.images = [...element.querySelectorAll(".img")];
    
    //attach event listener to the section
    this.section.addEventListener("click", function(e){
        if (e.target.classList.contains("img")) {
            this.openModal(e.target);
        } 
    }.bind(this));

    //grab elements from modal
    this.modal = getDomElement(".modal");
    this.modalMainImg = getDomElement(".main-img");
    this.modalImagesContainer = getDomElement(".modal-images");
    this.imageTitle = getDomElement(".image-name");
    this.closeModalbtn = getDomElement(".close-btn");
    this.prevImgBtn = getDomElement(".prev-btn");
    this.nextImgBtn = getDomElement(".next-btn");

    //bind functions to the object constructor
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.chooseThumbnail = this.chooseThumbnail.bind(this);
    this.goToPrevImage = this.goToPrevImage.bind(this);
    this.goToNextImage = this.goToNextImage.bind(this);
}

/******************************FUNCTIONS******************************/
//create functions and add to the constructor's protoype
Gallery.prototype.openModal =  function(targetElement){
    this.setModalMainImage(targetElement);
    this.modalImagesContainer.innerHTML = this.images.map(function(item){
        return `<img
                src="${item.src}" 
                title="${item.title}" 
                data-id="${item.dataset.id}"
                class="${item.dataset.id === targetElement.dataset.id? "modal-img selected": "modal-img"}" 
                alt="${item.alt}" 
                />`; 
    }).join("");
    this.modal.classList.add("open");

    //once modal is open, add event listeners to all buttons and thumbnails
    this.modalImagesContainer.addEventListener("click", this.chooseThumbnail);
    this.closeModalbtn.addEventListener("click", this.closeModal);
    this.prevImgBtn.addEventListener("click", this.goToPrevImage);
    this.nextImgBtn.addEventListener("click", this.goToNextImage);
};

//close modal function
Gallery.prototype.closeModal = function(){
    this.modal.classList.remove("open");
    this.modalImagesContainer.removeEventListener("click", this.chooseThumbnail);
    this.closeModalbtn.removeEventListener("click", this.closeModal);
    this.prevImgBtn.removeEventListener("click", this.goToPrevImage);
    this.nextImgBtn.removeEventListener("click", this.goToNextImage);
};

//set modal main image function
Gallery.prototype.setModalMainImage = function(targetElement){
    this.modalMainImg.src = targetElement.src;
    this.imageTitle.textContent = targetElement.title;
};

//choose modal thumbnail
Gallery.prototype.chooseThumbnail = function(e){
    if (e.target.classList.contains("modal-img")) {
        this.setModalMainImage(e.target);
        const selected = this.modalImagesContainer.querySelector(".selected");
        selected.classList.remove("selected");
        e.target.classList.add("selected");
    }                          
};

//go to previous image function
Gallery.prototype.goToPrevImage = function(){
    const selectedImage = this.modalImagesContainer.querySelector(".selected");
    const previousImage = selectedImage.previousElementSibling || this.modalImagesContainer.lastElementChild;
    this.setModalMainImage(previousImage);
    selectedImage.classList.remove("selected");
    previousImage.classList.add("selected");
};

//go to next image function
Gallery.prototype.goToNextImage = function(){
    const selectedImage = this.modalImagesContainer.querySelector(".selected");
    const nextImage = selectedImage.nextElementSibling || this.modalImagesContainer.firstElementChild;
    this.setModalMainImage(nextImage);
    selectedImage.classList.remove("selected");
    nextImage.classList.add("selected");
}

/****************************CREATE INSTANCES******************************/
//create object instances
const natureGallery = new Gallery(getDomElement(".nature"));
const cityGallery = new Gallery(getDomElement(".city"));

















/*//function to grab DOM elements
function getElement(selection){
    const element = document.querySelector(selection);
    if (element){
        return element;
    } else {
        throw new Error(`Please check "${selection}" selector, no such element exists`);
    }
}

//create a constructor function Gallery
function Gallery(element){
    this.container = element;
    this.imageList = [...element.querySelectorAll(".img")]; //use the spread operator to turn a nodeList into an Array

    //target elements
    this.modal = getElement(".modal");
    this.modalMainImg = getElement(".main-img");
    this.imgName = getElement(".image-name");
    this.modalImages = getElement(".modal-images");
    this.closeBtn = getElement(".close-btn");
    this.prevBtn = getElement(".prev-btn");
    this.nextBtn = getElement(".next-btn");
    
    //we could set up a self reference, then refer back to self inside the openModal function
    //let self = this;

    //bind function to Gallery
    //this.openModal = this.openModal.bind(this); no longer nedded, leaving just for reference
    this.container.addEventListener("click", function(e){
        //self.openModal();
        if (e.target.classList.contains("img")){
            this.openModal(e.target, this.imageList);
        }
    }.bind(this));

    this.closeModal = this.closeModal.bind(this);
    this.prevImg = this.prevImg.bind(this);
    this.nextImg = this.nextImg.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
}

Gallery.prototype.openModal = function(selectedImg, imageList){
    this.setMainImage(selectedImg); //as openModel is already pointing to  the gallery (.bind(this), I can call setMainImage inside its scope to refer back to the constructor, without having to bind setMainImage. 
    this.modalImages.innerHTML = this.imageList.map(function(image){
        return `<img
                src="${image.src}" 
                title="${image.title}" 
                data-id="${image.dataset.id}" 
                alt="${image.alt}" 
                class="${image.dataset.id === selectedImg.dataset.id? "modal-img selected": "modal-img"}";
                />`;
    }).join("");
    this.modal.classList.add("open");
    this.closeBtn.addEventListener("click", this.closeModal);
    this.prevBtn.addEventListener("click", this.prevImg);
    this.nextBtn.addEventListener("click", this.nextImg);
    this.modalImages.addEventListener("click", this.chooseImage);
};

Gallery.prototype.setMainImage = function(selectedImg){
    this.modalMainImg.src = selectedImg.src;
    this.imgName.textContent = selectedImg.textContent;
    this.imgName.textContent = selectedImg.title;
};

Gallery.prototype.closeModal = function(){
    this.modal.classList.remove("open");
    this.closeBtn.removeEventListener("click", this.closeModal);
    this.prevBtn.removeEventListener("click", this.prevImg);
    this.nextBtn.removeEventListener("click", this.nextImg);
};

Gallery.prototype.chooseImage = function(e){
    if(e.target.classList.contains("modal-img")){
        this.setMainImage(e.target);
    const selected = this.modalImages.querySelector(".selected");
    selected.classList.remove("selected")
    const currentImage = e.target;
    currentImage.classList.add("selected");
    }
};
Gallery.prototype.prevImg = function(){
    const currentImage = this.modalImages.querySelector(".selected");
    const nextImage = currentImage.previousElementSibling || this.modalImages.lastElementChild;
    currentImage.classList.remove("selected");
    nextImage.classList.add("selected");
    this.setMainImage(nextImage);
};
Gallery.prototype.nextImg = function(){
    const currentImage = this.modalImages.querySelector(".selected");
    const nextImage = currentImage.nextElementSibling || this.modalImages.firstElementChild;
    currentImage.classList.remove("selected");
    nextImage.classList.add("selected");
    this.setMainImage(nextImage);
};

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));*/

