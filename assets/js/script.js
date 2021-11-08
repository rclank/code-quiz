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
let questionCardEl = document.querySelector("#question-card");
let quizCardEl = document.querySelector("#quiz-card");
let timerEl = document.querySelector("#timer");
let endQuizCardEl = document.querySelector("#end-quiz-card");
let scoresCardEl = document.querySelector("#high-scores-card");
let accuracyEl = document.getElementById('accuracy');

// variables
let questionCounter = 0;
let timeLeft;
const penaltyTime = 10;
let scores;
let userData;
let scoresUpdated = false;

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

// unhide scoreCard
let unhideScoreCard = function() {
    // hide other elements
    quizCardEl.classList.add('hide');
    questionCardEl.classList.add('hide');
    endQuizCardEl.classList.add('hide');
    document.querySelector("header").classList.add('hide');

    scoresCardEl.classList.remove("hide");
}

// unhide start quiz card
let unhideStartQuizCard = function () {
        // hide other elements
        scoresCardEl.classList.add('hide');
        questionCardEl.classList.add('hide');
        endQuizCardEl.classList.add('hide');
        document.querySelector("header").classList.add('hide');
        accuracyEl.classList.add('hide');
    
        document.querySelector('header').classList.remove('hide');
        questionCounter = 0;
        timerEl.textContent = 0;
        document.getElementById('scoreboard').innerHTML = "";
        quizCardEl.classList.remove("hide");
}

// view high scores link
document.querySelector("#high-scores-link").addEventListener("click", function() {
    clearInterval(timer);
    buildScoreboard();
    unhideScoreCard();
});

// capture start click
startBtnEl.addEventListener("click", function() {
    // debugger;
    quizCardEl.classList.add('hide');
    questionCardEl.classList.remove('hide');


    timeLeft = 75;
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
        accuracyEl.textContent = 'Correct!';
        accuracyEl.classList.remove('hide');
    }
    // if wrong
    else {
        // unhide 'Wrong!'
        console.log('wrong');
        accuracyEl.textContent = 'Wrong!';
        accuracyEl.classList.remove('hide');

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
    console.log(timerEl.textContent);
    console.log(timeLeft);


    // this is brute force hiding whatever the sending screen was
    // but classList.add is smart enough to only add if class does not already exist!
    // aka, won't add another 'hide' if already there
    // i would like to know how to dynamically capture the incoming screen and hide dynamically. below is not extensible
    quizCardEl.classList.add('hide');
    questionCardEl.classList.add('hide');
    endQuizCardEl.classList.remove('hide');

    // if (timeLeft > 0) {
    //     timerEl.textContent = timeLeft;
    // }
    // else {
    //     timerEl.textContent = 0;
    // }

    // window.alert('game over!');
}

// go back button
document.querySelector('#go-back-btn').addEventListener("click", function() {
    // scoresCardEl.classList.add('hide');
    // document.querySelector('header').classList.remove('hide');
    // quizCardEl.classList.remove('hide');
    unhideStartQuizCard();
    userData = undefined;
})

// clear high scores button
document.getElementById('clear-scores-btn').onclick = function() {
    localStorage.removeItem('scores');
    document.getElementById('scoreboard').innerHTML = "";
}

// load scores
let loadScores = function() {

}
// update scores
// sort scores

// build scoreboard
let buildScoreboard = function() {
    scores = localStorage.getItem('scores');
    if (scores === null || scores === '[]') {
        if (userData !== undefined) {
            scores = [userData];
        } else {
            window.alert("No high scores!");
            return false;
        }
    } else {
        scores = JSON.parse(scores);
        if (userData !== undefined) {
            scores.unshift(userData);
            scoresUpdated = true;
        }
        scores.sort((a, b) => {
            return b.score - a.score;
        });
    }

    // loop through up to 10 scores
    // build score items to append to div
    for (let i = 0; i < Math.min(scores.length, 10); i++) {
        let scoreRecordEl = document.createElement('div');
        scoreRecordEl.classList.add('score-record');
        scoreRecordEl.textContent = `${i + 1}. ${scores[i].initials} - ${scores[i].score}`;
        document.getElementById('scoreboard').appendChild(scoreRecordEl);
    }
}

// // submit button
// document.getElementById('submit-score-btn').onclick = function(e) {
//     e.preventDefault();
//     userData = {
//         initials: document.getElementById('initials').value,
//         score: timeLeft
//     }

//     scores = localStorage.getItem('scores');
//     if (scores === null || scores === '[]') {
//         scores = [userData];
//     } else {
//         scores = JSON.parse(scores);
//         scores.unshift(userData);
//         scores.sort((a, b) => {
//             return b.score - a.score;
//         });
//     }

//     localStorage.setItem('scores', JSON.stringify(scores));


//     // loop through up to 10 scores
//     // build score items to append to div
//     for (let i = 0; i < Math.min(scores.length, 10); i++) {
//         let scoreRecordEl = document.createElement('div');
//         scoreRecordEl.classList.add('score-record');
//         scoreRecordEl.textContent = `${i + 1}. ${scores[i].initials} - ${scores[i].score}`;
//         document.getElementById('scoreboard').appendChild(scoreRecordEl);
//     }

//     unhideScoreCard();
// }

// submit button2
document.getElementById('submit-score-btn').onclick = function(e) {
    e.preventDefault();
    userData = {
        initials: document.getElementById('initials').value,
        score: timeLeft
    }

    buildScoreboard();

    localStorage.setItem('scores', JSON.stringify(scores));

    unhideScoreCard();
    document.getElementById('initials').value = "";
}
