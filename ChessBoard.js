const button = document.querySelector('#submit');

button.addEventListener('click', chess);

function chess() {
  
    let givenWidth = document.querySelector('#getWidth').value;
    let givenHeight = document.querySelector('#getHeight').value;
   
    var tblBody = document.createElement('tbody');
    var parentTable = document.getElementById('chessboard');

    // first look creates <tr> then after inner look grabs <tr> and appends it to <tbody>
        for(let i = 0; i < givenHeight; i++) {
        var row = document.createElement('tr');
       
    // second loop creates cells '<td>' then grabs and appends <td> to <tr>    
         for (j = 0; j < givenWidth; j++) {
            if ((j % 2 === 0 && i % 2 === 0) || (j % 2 !== 0 && i % 2 !== 0)) {
                var cell = document.createElement('td');
                row.appendChild(cell);
                cell.style.backgroundColor = 'black';
            } else {
                var cell = document.createElement('td');
                row.appendChild(cell);
                cell.style.backgroundColor = 'beige';
            }
        }
        var parentRow = document.querySelector('tr');
        tblBody.appendChild(row);
    }
    // the whole table gets appended to <tblbody>
    parentTable.appendChild(tblBody);  
};

// post that helped me get the orignal function to handle the DOM - https://stackoverflow.com/questions/14643617/create-table-using-javascript

/*  ----------Original Function to print a Chess Pattern--------------
function chess(w, h) {
    let grid = [];
    for(let i = 0; i < h; i++) {
        for (j = 0; j < w; j++) {
            if ((j % 2 === 0 && i % 2 === 0) || (j % 2 !== 0 && i % 2 !== 0)) {
                grid += "#";
            } else {
                grid += " ";
            }
        }
        grid += "\n";
    }
    console.log(grid);
    }
    chess(20,10); */