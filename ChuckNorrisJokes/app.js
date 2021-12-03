
const URL = 'https://api.chucknorris.io/jokes/random?category=dev';
const btn = document.querySelector(".btn");
const content = document.querySelector(".content");
const image = document.querySelector(".img");

btn.addEventListener("click", () => {
    getData(URL);
});

function getData(url){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState !== 4) return;
        if(xhr.status === 200){
            image.classList.add("shake-img");
            const {value:joke} = JSON.parse(xhr.responseText);
            content.textContent = joke;
            setTimeout(()=>{
                image.classList.remove("shake-img");
            }, 500);
        } else {
            console.log({status: xhr.status, text: xhr.statusText});
        }
    };
}

console.log(getData())