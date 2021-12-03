
const URL = 'https://api.chucknorris.io/jokes/random?category=dev';
const btn = document.querySelector(".btn");
const content = document.querySelector(".content");
const image = document.querySelector(".img");

btn.addEventListener("click", () => {
    getData(URL)
    .then(response => displayData(response))
    .catch(err => console.log(err));
});

function getData(url){
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState !== 4) return;
            if(xhr.status === 200){
                resolve(xhr.responseText);
            } else {
                reject({status: xhr.status, text: xhr.statusText});
            }
        };
    });
}

function displayData(data){
    image.classList.add("shake-img");
    const { value: joke } = JSON.parse(data);
    content.textContent = joke;
    setTimeout(()=>{
        image.classList.remove("shake-img");
    }, 500);
};
