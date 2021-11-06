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
// DOM elements
let startBtnEl = document.querySelector("#start-btn");
let questionAreaEl = document.querySelector("#question-area");
let quizAreaEl = document.querySelector("#quiz-area");
let timerEl = document.querySelector("#timer");
let endQuizAreaEl = document.querySelector("#end-quiz-area");

// variables
let questionCounter = 0;
let timeLeft = 75;
let penaltyTime = 10;

// timer functions
let timer;
let runTimer = function() {
    // v1
    timerEl.textContent = timeLeft;

    // v0
    // if (timeLeft <= 0) {
    //     endQuiz();
    // }

    // timeLeft--;

    // v1
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        endQuiz();
    }

    // v2
    // if (timeLeft === maxTime) {
    //     // catches the first call and does nothing
    // } else if (timeLeft > 0) {
    //     timeLeft--;
    // } else {
    //     endQuiz();
    // }

    // timerEl.textContent = timeLeft;

    // if (timeLeft > 0) {
    //     timerEl.textContent = timeLeft;
    //     timeLeft--;
    // } else {
    //     clearInterval(timer);
    //     window.alert("game over!");
    //     endQuiz();
    // }
}

// capture start click
startBtnEl.addEventListener("click", function() {
    // debugger;
    quizAreaEl.classList.add('hide');
    questionAreaEl.classList.remove('hide');


    // start timer
    // call function first so as to avoid first interval delay!
    runTimer();
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
        currentAnswerEl.setAttribute('value', currentQuestion.answers[i]);
        currentAnswerEl.textContent = (i + 1) +". " + currentQuestion.answers[i];

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
        console.log('correct');
    }
    // if wrong
    else {
        // unhide 'Wrong!'
        console.log('wrong');

        // subtract time
        if (timeLeft >= penaltyTime) {
            timeLeft -= penaltyTime;
        } else {
            timeLeft = 0;
        }

        // technically this is duplicative because this is the first line of the interval,
        // but the second it takes for the interval to call itself again causes a lag
        // in updating the user of lost time.
        // i think in this formulation, the time it prints here will technically stay longer
        // than a second because it prints here early, before set interval actually runs again
        timerEl.textContent = timeLeft;

    }

    // increment counter
    questionCounter++;

    // recursive getQuestion call?
    if (questionCounter < questions.length) {
        getQuestion();
    } else {
        console.log('this is the end');
        endQuiz();
    }
}

let endQuiz = function() {
    // stop timer, stop decrementing timer
    clearInterval(timer);
    console.log(timeLeft);


    // this is brute force hiding whatever the sending screen was
    // but classList.add is smart enough to only add if class does not already exist!
    // aka, won't add another 'hide' if already there
    // i would like to know how to dynamically capture the incoming screen and hide dynamically. below is not extensible
    quizAreaEl.classList.add('hide');
    questionAreaEl.classList.add('hide');
    endQuizAreaEl.classList.remove('hide');

    // if (timeLeft > 0) {
    //     timerEl.textContent = timeLeft;
    // }
    // else {
    //     timerEl.textContent = 0;
    // }

    window.alert('game over!');
}