//variables
let quizBody = document.querySelector('.quiz');
let results = document.querySelector('#results');
let finalScores = document.querySelector('#final-score');
let gameOver = document.querySelector('.game-over');
let gameQuestions = document.querySelector('#questions');
let timer = document.querySelector('#timer');
let startQuizBtn = document.querySelector('#big-btn'); 
let startQuizSection = document.querySelector('.main-body');
let scoreSectionDiv = document.querySelector('.highscore-container');
let scoreSection = document.querySelector('#highscore-page');
let inputName = document.querySelector('#score-submission');
let displayName = document.querySelector('#user-names');
let endGameBtn =document.querySelector('.end-game-btns');
let submitBtn = document.querySelector('#score-submission');
let scoreDisplay = document.querySelector('#highscore-score');
let btnA =document.querySelector('#A');
let btnB = document.querySelector('#B');
let btnC = document.querySelector('#C');
let btnD =document.querySelector('#D');
let finalQuestionIndex = quizQuestions.length;
let currentQuestionIndex = 0;
let timeLeft = 100;
let timerInterval;
let score = 0;
let correct;
let quizQuestions = [
    {
        question: "What's is the most durable ore in the game?",
        choiceA: "Diamond",
        choiceB: "Gold",
        choiceC: "Iron",
        choiceD: "Netherite",
        correctAnswer: "Netherite"},
    {
        question: "Which mob does the most damage to the player?",
        choiceA: "Warden",
        choiceB: "Piglin Brute",
        choiceC: "Charged Creeper",
        choiceD: "Vindicator",
        correctAnswer: "Charged Creeper"},
    {
        question: "What ore do you need to craft a bucket?",
        choiceA: "Copper",
        choiceB: "Iron",
        choiceC: "Gold",
        choiceD: "Diamond",
        correctAnswer: "Iron"},
    {
        question: "What mob(s) do villagers create when they feel in danger?",
        choiceA: "Iron Golem",
        choiceB: "Ghast",
        choiceC: "Wither",
        choiceD: "Dog",
        correctAnswer: "Iron Golem"},
    {
        question: "What food do you use to tame a cat?",
        choiceA: "Steak",
        choiceB: "Potatos",
        choiceC: "Carrots",
        choiceD: "Fish",
        correctAnswer: "Fish"},
    {
        question: "What mob has the most health?",
        choiceA: "Ender Dragon",
        choiceB: "Iron Golem",
        choiceC: "Warden",
        choiceD: "Wither",
        correctAnswer: "Warden"},
    {
        question: "How many bookshelves do you need to get a full level 30 enchantment?",
        choiceA: "18",
        choiceB: "10",
        choiceC: "15",
        choiceD: "12",
        correctAnswer: "15"},
    {
        question: "In what biome can you find a village?",
        choiceA: "Grassland",
        choiceB: "Savannah",
        choiceC: "Taiga",
        choiceD: "All of the above",
        correctAnswer: "All of the above"},
];

//GENERATE THE QUESTIONS AND ANSWERS
function generateQQ(){
    gameOver.style.display ="none";
    if (currentQuestionIndex == finalQuestionIndex){
        return showScore;
    }
    let currentQ = quizQuestions[currentQuestionIndex];
    gameQuestions.innerHTML = "<p>" + currentQ.question + "<p>";
    btnA.innerHTML = currentQ.choiceA;
    btnB.innerHTML = currentQ.choiceB;
    btnC.innerHTML = currentQ.choiceC;
    btnD.innerHTML = currentQ.choiceD;

}

//need to show score 
function showScore(){
    quizBody.style.display = "none";
    gameOver.style.display = "flex";
    clearInterval(timerInterval);
    inputName.ariaValueMax = "";
    finalScores.innerHTML = "You scored " + score + " out of " + quizQuestions.length + " correct!";
}

//START QUIZ FUNCTION
function startQuiz(){
    gameover.style.display = "none";
    startQuizSection.style.display = "none";
    generateQQ();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

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
        
    }
}

submitBtn.addEventListener("click",  highscore());




startQuizBtn.addEventListener("click", startQuiz());