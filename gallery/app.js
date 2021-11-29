//function to grab DOM elements
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
};

Gallery.prototype.setMainImage = function(selectedImg){
    this.modalMainImg.src = selectedImg.src;
    this.imgName.textContent = selectedImg.textContent;
    this.imgName.textContent = selectedImg.title;
};

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));

