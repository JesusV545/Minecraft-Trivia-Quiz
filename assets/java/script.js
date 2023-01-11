//variables
let quizBody = document.querySelector('.quiz');
let results = document.querySelector('#results');
let finalScores = document.querySelector('#final-score');
let gameOver = document.querySelector('.game-over');
let gameQuestions = document.querySelector('#questions');
let timer = document.querySelector('#timer');
let startQuizBtn = document.querySelector('.big-btn'); 
let startQuizSection = document.querySelector('.start-page');
let scoreSectionDiv = document.querySelector('.highscore-container');
let scoreSection = document.querySelector('#highscore-page');
let inputName = document.querySelector('#input-name');
let displayName = document.querySelector('#user-names');
let endGameBtn =document.querySelector('.end-game-btns');
let submitBtn = document.querySelector('#score-submission');
let scoreDisplay = document.querySelector('#highscore-score');

let clearBtn = document.querySelector("#clear-scores");
let playAgainBtn = document.querySelector("#play-again-btn");

let btnA =document.querySelector('#A');
let btnB = document.querySelector('#B');
let btnC = document.querySelector('#C');
let btnD =document.querySelector('#D');
let quizQuestions = [
    {
        question: "What's is the most durable ore in the game?",
        choiceA: "Diamond",
        choiceB: "Gold",
        choiceC: "Iron",
        choiceD: "Netherite",
        correctAnswer: "D"},
    {
        question: "Which mob does the most damage to the player?",
        choiceA: "Warden",
        choiceB: "Piglin Brute",
        choiceC: "Charged Creeper",
        choiceD: "Vindicator",
        correctAnswer: "C"},
    {
        question: "What ore do you need to craft a bucket?",
        choiceA: "Copper",
        choiceB: "Iron",
        choiceC: "Gold",
        choiceD: "Diamond",
        correctAnswer: "B"},
    {
        question: "What mob(s) do villagers create when they feel in danger?",
        choiceA: "Iron Golem",
        choiceB: "Ghast",
        choiceC: "Wither",
        choiceD: "Dog",
        correctAnswer: "A"},
    {
        question: "What food do you use to tame a cat?",
        choiceA: "Steak",
        choiceB: "Potatos",
        choiceC: "Carrots",
        choiceD: "Fish",
        correctAnswer: "D"},
    {
        question: "What mob has the most health?",
        choiceA: "Ender Dragon",
        choiceB: "Iron Golem",
        choiceC: "Warden",
        choiceD: "Wither",
        correctAnswer: "C"},
    {
        question: "How many bookshelves do you need to get a full level 30 enchantment?",
        choiceA: "18",
        choiceB: "10",
        choiceC: "15",
        choiceD: "12",
        correctAnswer: "C"},
    {
        question: "In what biome can you find a village?",
        choiceA: "Grassland",
        choiceB: "Savannah",
        choiceC: "Taiga",
        choiceD: "All of the above",
        correctAnswer: "D"},
];
let finalQuestionIndex = quizQuestions.length;
let currentQuestionIndex = 0;
let timeLeft = 50;
let timerInterval;
let score = 0;
let correct;

//GENERATE THE QUESTIONS AND ANSWERS
function generateQQ(){
    gameOver.style.display ="none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    }
    let currentQ = quizQuestions[currentQuestionIndex];
    gameQuestions.innerHTML = "<p>" + currentQ.question + "<p>";
    btnA.innerHTML = currentQ.choiceA;
    btnB.innerHTML = currentQ.choiceB;
    btnC.innerHTML = currentQ.choiceC;
    btnD.innerHTML = currentQ.choiceD;

};

//START QUIZ FUNCTION
function startQuiz(){
    gameOver.style.display = "none";
    startQuizSection.style.display = "none";
    generateQQ();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = "Time Remaining: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

//need to show score 
function showScore(){
    quizBody.style.display = "none";
    gameOver.style.display = "flex";
    clearInterval(timerInterval);
    inputName.value = "";
    finalScores.innerHTML = "You scored " + score + " out of " + quizQuestions.length + " correct!";
}

submitBtn.addEventListener("click",  highscore);

function highscore(){
    if (inputName.value === "") {
        alert("Cannot be blank!");
        return false;
    } else {
        let savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
        let user = inputName.value.trim();
        let currentHighScore = {
            name: user,
            score: score
        };

        gameOver.style.display = "none";
        scoreSection.style.display ="flex";
        scoreSectionDiv.style.display = "block";
        endGameBtn.style.display = "flex";

        savedScores.push(currentHighScore);
        localStorage.setItem('savedScores', JSON.stringify(savedScores));
        generateHighScores();
    }
}

function showTheHighScore(){
    startQuizSection.style.display = "none"
    gameOver.style.display = "none";
    scoreSectionDiv.style.display = "flex";
    scoreSection.style.display = "block";
    endGameBtn.style.display = "flex";

    generateHighscores();
}

function generateHighscores(){
    displayName.innerHTML = "";
    scoreDisplay.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedScores")) || [];
    for (i = 0; i < highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        displayName.appendChild(newNameSpan);
        scoreDisplay.appendChild(newScoreSpan);
    }
}





function clearTheScores(){
    window.localStorage.clear();
    displayName.textContent = "";
    scoreDisplay.textContent = "";
    
}

function replayTheQuiz(){
    scoreSectionDiv.style.display ='none';
    gameOver.style.display = 'none';
    startQuizSection.style.display = 'flex';
    timeLeft = 50;
    score = 0;
    currentQuestionIndex = 0;
    
}

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct! :D");
        currentQuestionIndex++;
        generateQQ();
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("Incorrect! D:");
        currentQuestionIndex++;
        generateQQ();
    } else {
        showScore();
    }
}


startQuizBtn.addEventListener("click", startQuiz);