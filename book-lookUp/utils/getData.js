function getData(url){
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState !== 4) return;
            if (xhr.status === 200){
                resolve(xhr.responseText);
            } else {
                reject({ 
                    status: xhr.status,
                    text: xhr.statusText, 
                });
            }
        }
    });
}

export default getData;