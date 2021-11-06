const questions = [
    {
        question:"Commonly used data types DO NOT include:",
        answers: ['strings', 'booleans', 'alerts', 'numbers'],
        correctAnswer: 'alerts'
    },
    {
        question:"The condition in an if/else statement is enclosed with _______.",
        answers: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        correctAnswer: 'parenthesis'
    },
    {
        question:"Arrays in JavaScript can be used to store _______.",
        answers: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        correctAnswer: 'all of the above'
    },
    {
        question:"String values must be enclosed within _______ when being assigned to variables.",
        answers: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        correctAnswer: 'quotes'
    },
    {
        question:"A very useful tool used during the development and debugging for printing content to the debugger is:",
        answers: ['Javascript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswer: 'console.log'
    }
]

let startBtnEl = document.querySelector(".start-btn");
let questionAreaEl = document.querySelector("#question-area");
let quizAreaEl = document.querySelector("#quiz-area");
let questionCounter = 0;
let timeLeft = 75;

// timer functions
let timer;
let runTimer = function() {
    if (timeLeft >= 0) {
        document.querySelector('#timer').textContent = timeLeft;
        timeLeft--;
    } else {
        clearInterval(timer);
        window.alert("game over!");
        endQuiz();
    }
}

// capture start click
startBtnEl.addEventListener("click", function() {
    quizAreaEl.classList.add('hide');
    questionAreaEl.classList.remove('hide');

    timer = setInterval(runTimer, 1000);
    
    getQuestion();

})

// loop through questions array calling builder
// create button for each question
// on click event, append to div
// on click event, check answer
let getQuestion = function() {
    let currentQuestion = questions[questionCounter];
    let questionTitle = currentQuestion.question;

    document.querySelector('#question-prompt').textContent = questionTitle;
    let responsesEl = document.querySelector('#responses');

    // without this, buttons will append cumulatively, adding more and more because appropriate ones weren't cleared out
    responsesEl.innerHTML = "";

    // loop through response options and generate response buttons
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        let currentAnswerEl = document.createElement('button');
        currentAnswerEl.setAttribute('class', 'btn');
        currentAnswerEl.setAttribute('value', (i + 1) +". " + currentQuestion.answers[i]);
        currentAnswerEl.textContent = currentQuestion.answers[i];

        currentAnswerEl.addEventListener('click', checkAnswer);
        responsesEl.appendChild(currentAnswerEl);
    }
}

let checkAnswer = function () {
    // why is 'this' the button that was clicked???
    // console.log(this);

    // if right
    if (this.value === questions[questionCounter].correctAnswer) {
        // unhide 'Correct!'

    }
    // if wrong
    else {
        // unhide 'Wrong!'

        // subtract time
        timeLeft -= 10;
    }

    // increment counter
    questionCounter++;

    // recursive getQuestion call?
    getQuestion();
}