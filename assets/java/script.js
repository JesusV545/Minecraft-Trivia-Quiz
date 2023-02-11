const quizQuestions = [
    {
        question: "What's is the most durable ore in the game?",
        choices: {
            A: "Diamond",
            B: "Gold",
            C: "Iron",
            D: "Netherite"
        },
        correctAnswer: "D"},

    {
        question: "Which mob does the most damage to the player?",
        choices: {
            A: "Warden",
            B: "Piglin Brute",
            C: "Charged Creeper",
            D: "Vindicator"
        },
        correctAnswer: "C"},

    {
        question: "What ore do you need to craft a bucket?",
        choices: {
            A: "Copper",
            B: "Iron",
            C: "Gold",
            D: "Diamond"
        },
        correctAnswer: "B"},

    {
        question: "What mob(s) do villagers create when they feel in danger?",
        choices: {
            A: "Iron Golem",
            B: "Ghast",
            C: "Wither",
            D: "Dog"        
        },
        correctAnswer: "A"},

    {
        question: "What food do you use to tame a cat?",
        choices: {
            A: "Steak",
            B: "Potatos",
            C: "Carrots",
            D: "Fish"
        }, 
        correctAnswer: "D"},

    {
        question: "What mob has the most health?",
        choices: {
            A: "Ender Dragon",
            B: "Iron Golem",
            C: "Warden",
            D: "Wither"
        },
        correctAnswer: "C"},

    {
        question: "How many bookshelves do you need to get a full level 30 enchantment?",
        choices: {
            A: "18",
            B: "10",
            C: "15",
            D: "12" 
        },
        correctAnswer: "C"},

    {
        question: "In what biome can you find a village?",
        choices: {
            A: "Grassland",
            B: "Savannah",
            C: "Taiga",
            D: "All of the above"
        },
        correctAnswer: "D"},

];

let startButton = document.querySelector(".start-btn");
let quizPage = document.querySelector(".quiz");
let startingPage = document.querySelector(".start-page");
let quizTimer = document.querySelector("#timer");
let currentQuestionIndex = 0;
let quizIndex = quizQuestions.length;
let score = 0;
let timeRemaining = 60;
let questionElement = document.querySelector("#quiz-questions");
let btnA = document.getElementById("A");
let btnB = document.getElementById("B");
let btnC = document.getElementById("C");
let btnD = document.getElementById("D");

function startQuiz(){
    //console.log("click");
    startingPage.style.display = "none";
    quizPage.style.display = "block";
    quizPage.style.textAlign = "center";

    //need to get questions to replace the placeholder
    //need to get the questions to show up next to answer choices
    generateQQ();

    //need to set up timer and display the time going down
    timerFunction();

    btnA.addEventListener("click", function() {checkAnswer('A'); });
    btnB.addEventListener("click", function() {checkAnswer('B'); });
    btnC.addEventListener("click", function() {checkAnswer('C'); });
    btnD.addEventListener("click", function() {checkAnswer('D'); });



function timerFunction(){
    let timer = setInterval(function(){
        timeRemaining -= 1;
        quizTimer.textContent = "Time Remaining: " + timeRemaining;        
        if (timeRemaining <= 0){
            clearInterval(timer);
            finalScore();
        }

    }, 1000)
}

function generateQQ(){
    
    // console.log(quizQuestions[0]);
    //question will display in order by index value
    let currentQuestion = quizQuestions[currentQuestionIndex];

    //replaces the text in the divs with question and answer choices
    questionElement.textContent = currentQuestion.question;
    btnA.textContent = currentQuestion.choices.A;
    btnB.textContent = currentQuestion.choices.B;
    btnC.textContent = currentQuestion.choices.C;
    btnD.textContent = currentQuestion.choices.D;

};

//need a function to check if the chosen answer was correct
function checkAnswer(a) {

    let correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    if (a === correctAnswer) {
        console.log("correct");
        score++;
    }
    currentQuestionIndex++;

    if (currentQuestionIndex === quizIndex){
        finalScore();
        return;
    }

    generateQQ();
};

//need a function to show the final score
let gameOverPage = document.querySelector("#gameover-page");
let finalScoreText = document.querySelector("#final-score");
let endGameBtns = document.querySelector("#end-game-btns");

function finalScore() {
    quizPage.style.display = "none";
    gameOverPage.style.display = "flex";
    finalScoreText.textContent = "Your final score is: " + score + "/" + quizIndex;
    endGameBtns.style.display = "flex";
};

//need to add the option to submit score and store in local storage
let userName = document.querySelector("#input-name");
let submitScoreBtn = document.querySelector("#score-submission");
submitScoreBtn.addEventListener("click", saveScores);

function saveScores() {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    let newUser = userName.value;
    let newScore = {name: newUser, score: score}

    scores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(scores));

    showScoresPage();

}

//need to add the option to clear the scores
let clearScores = document.querySelector("#clear-scores");
clearScores.addEventListener("click", clearStorage);

function clearStorage() {
    window.localStorage.clear();
    //scoreDisplay.style.display = '';
    displayName.style.display = '';
    displayScore.style.display = '';
}

//need to add the option to view scores at beginning of game
let showHighScores = document.querySelector(".high-score-btn");
let scoreContainer = document.querySelector(".high-score-container");
//let scoreDisplay = document.querySelector(".user-scores");
showHighScores.addEventListener("click", showScoresPage);

//function to show the highscores page
function showScoresPage() {
    startingPage.style.display = "none";
    scoreContainer.style.display = "block";
    endGameBtns.style.display = "flex";

    //need to get the preciously saved scores
    let scoreArray = JSON.parse(localStorage.getItem("scores")) || [];

    let displayName = document.querySelector("#user-name")
    let displayScore = document.querySelector("#user-score");

    for (let i = 0; i < scoreArray.length; i++) {
        let name = document.createElement("p");
        let score = document.createElement("p");
        name.textContent = scoreArray[i].name;
        score.textContent = scoreArray[i].score;
        displayName.appendChild(name);
        displayScore.appendChild(score);
    }
}

//need to add replay option
let playAgain = document.querySelector("#play-again");
playAgain.addEventListener("click", playQuizAgain)

//function to play the quiz again
function playQuizAgain() {
    score = 0;
    timeRemaining = 60;
    currentQuestionIndex = 0
    startingPage.style.display = 'flex';
    gameOverPage.style.display = 'none';
    endGameBtns.style.display = 'none';
    scoreContainer.style.display = 'none';
}


};

startButton.addEventListener("click", startQuiz);
  

