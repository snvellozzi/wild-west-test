// gets elements & store in variables
const start = document.getElementById("start");
const question = document.getElementById("question");
const quiz = document.getElementById("quiz");
const image = document.getElementById("image");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeTracker = document.getElementById("timeTracker");
const scoreHolder = document.getElementById("scoreHolder");
const progress = document.getElementById("progress");
const gameOver = document.getElementById("gameOver");
const restart = document.getElementById("restart");
const exit = document.getElementById("exit");
const mainImg = document.getElementById("mainImg");

// creates the questions in array
let questions = [
    {
        question : "What is this a picture of?",
        imgSrc : "img/badge.jpeg",
        choiceA : "belt",
        choiceB : "cowboy",
        choiceC : "badge",
        correct : "C"
    },{
        question : "What do you see?",
        imgSrc : "img/boot.jpeg",
        choiceA : "cowboy boot",
        choiceB : "cowboy",
        choiceC : "horse",
        correct : "A"
    },{
        question : "What is this?",
        imgSrc : "img/bullhorns.jpeg",
        choiceA : "bear",
        choiceB : "dog",
        choiceC : "bullhorn",
        correct : "C"
    },{
        question : "What is this a picture of?",
        imgSrc : "img/cactus.jpeg",
        choiceA : "grass",
        choiceB : "cactus",
        choiceC : "flower",
        correct : "B"
    },{
        question : "What is this a picture of?",
        imgSrc : "img/cowboy.jpeg",
        choiceA : "hat",
        choiceB : "cowboy",
        choiceC : "tumbleweed",
        correct : "B"
    },{
        question : "What do you see?",
        imgSrc : "img/hat.jpeg",
        choiceA : "hat",
        choiceB : "cowboy",
        choiceC : "ground",
        correct : "A"
    },{
        question : "What is this?",
        imgSrc : "img/horse.jpeg",
        choiceA : "cat",
        choiceB : "dog",
        choiceC : "horse",
        correct : "C"
    },{
        question : "What is this a picture of?",
        imgSrc : "img/horseshoe.jpeg",
        choiceA : "horseshoe",
        choiceB : "cowboy",
        choiceC : "metal",
        correct : "A"
    },{
        question : "What is this?",
        imgSrc : "img/rope.jpeg",
        choiceA : "star",
        choiceB : "rope",
        choiceC : "badge",
        correct : "B"
    },{
        question : "What is this a picture of?",
        imgSrc : "img/wagon.jpeg",
        choiceA : "wagon",
        choiceB : "car",
        choiceC : "cowboy",
        correct : "A"
    }
];

// creates variables
const lastQ = questions.length - 1;
let runningQ = 0;
let count = 0;
const questionTime = 5; // 5 seconds
const width = 150; // 150px
const Unit = width / questionTime;
let TIMER;
let score = 0;

// makes a question
function makeQuestion(){
    let Q = questions[runningQ];

    question.innerHTML = "<p>"+ Q.question + "</p>";
    image.innerHTML = "<img src=" + Q.imgSrc + ">";
    choiceA.innerHTML = Q.choiceA;
    choiceB.innerHTML = Q.choiceB;
    choiceC.innerHTML = Q.choiceC;

}

start.addEventListener("click", startTest);
exit.addEventListener("click", clickFunction);

// starts the test
function startTest(){
    start.style.display = "none";
    mainImg.style.display = "none";
    makeQuestion();
    quiz.style.display = "block";
    makeProgress();
    makeCounter();
    exitGame();
    TIMER = setInterval(makeCounter, 1000);
}

// makes progress
function makeProgress(){
    for(let qIndex = 0; qIndex <= lastQ; qIndex++){
        progress.innerHTML += "<div class = 'prog' id=" + qIndex + "></div>";
    }
}

// makes counter
function makeCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeTracker.style.width = count * Unit + "px";
        count++
    }else{
        count = 0;
        // changes progress color
        answerIsWrong();
        if(runningQ < lastQ){
            runningQ++;
            makeQuestion();
        }else{
            clearInterval(TIMER);
            message();
            makeScore();
            restartGame();
        }
    }
}

// checks if answer is correct
function checkAnswer(answer){
    if(answer == questions[runningQ].correct){
        score++;    // correct answer selected
        answerIsCorrect();
    }else{
        answerIsWrong();
    }

    count = 0;
    if(runningQ < lastQ){
        runningQ++;
        makeQuestion();
    }else{
        clearInterval(TIMER);
        message();
        makeScore();
        restartGame();
        restart.addEventListener("click", clickFunction);
    }
}

// correct answer function
function answerIsCorrect(){
    document.getElementById(runningQ).style.backgroundColor = "#90EE90";
}

// wrong answer function
function answerIsWrong(){
    document.getElementById(runningQ).style.backgroundColor = "#ffcccb";
}

// gets score
function makeScore(){
    scoreHolder.style.display = "block";

    // gets percent score
    const percent = Math.round(score/questions.length * 100);
    scoreHolder.innerHTML = "<p>" + percent + "%</p>";
}

// displays message at end
function message(){
    gameOver.style.display = "inline";
    gameOver.innerHTML = "Game Over";
}

function restartGame(){
    restart.style.display = "inline";
    restart.innerHTML = "Restart";
}

function exitGame(){
    exit.style.display = "inline";
    exit.innerHTML = "Exit";
}

function clickFunction(){
    document.location.reload();
}