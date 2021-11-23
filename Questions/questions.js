//grab DOM elements
const openButtons = document.querySelectorAll('.question-btn');
const questions = document.querySelectorAll('.individual-questions');

questions.forEach(function(question) {  //loop through 'questions' 
    const btn = question.querySelector('.question-btn'); //at each iteration selects the button of that block
    btn.addEventListener('click', function() { //listens for a clink on that button

        //added feature that closes all other div's that are not the one being clicked
        questions.forEach(function(item) {  //loop through 'questions'
            if (item !== question) {  //if div of current iteration is not the one being clicked at
                item.classList.remove('show-text'); //remove the class 'show-text' form the class
            }
        });
        question.classList.toggle('show-text'); //then, toggle 'show-text'
    });
});


//one of the possible solutions but you'd have to add that too every button. not feasible if more than a handfull of items.
/*openButtons.forEach(function(btn) { //iterates through every item where class == question-btn's
    btn.addEventListener('click', function(e) { //listens for the click event
       const question = e.currentTarget.parentElement.parentElement.parentElement; //selects the great-granparent of the button pressed
       question.classList.toggle('show-text'); //toggles the class 'show-text' for every click
    });
});*/