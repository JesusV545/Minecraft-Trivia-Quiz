const quizQuestions = [
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

let startButton = document.querySelector(".start-btn");
let quizPage = document.querySelector(".quiz");
let startingPage = document.querySelector(".start-page");
let quizTimer = document.querySelector("#timer");
let currentQuestionIndex = 0;; 
let quizIndex = quizQuestions.length;
let score = 0;



function startQuiz(){
    //console.log("click");
    startingPage.style.display = "none";
    quizPage.style.display = "block";
    quizPage.style.textAlign = "center";

    //need to set up timer and display the time going down
    timerFunction();

    //need to get questions to replace the placeholder
    //need to get the questions to show up next to answer choices
    generateQQ();

}

function timerFunction(){
    let timeRemaining = 50;
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

    let currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement = document.querySelector("#quiz-questions");
    btnA = document.querySelector("#a");
    btnB = document.querySelector("#b");
    btnC = document.querySelector("#c");
    btnD = document.querySelector("#d");

    questionElement.textContent = currentQuestion.question;
    btnA.textContent = currentQuestion.choiceA;
    btnB.textContent = currentQuestion.choiceB;
    btnC.textContent = currentQuestion.choiceC;
    btnD.textContent = currentQuestion.choiceD;

    btnA.addEventListener("click", checkAnswer);
    btnB.addEventListener("click", checkAnswer);
    btnC.addEventListener("click", checkAnswer);
    btnD.addEventListener("click", checkAnswer);



}

//need a function to check if the chosen answer was correct
function checkAnswer(a) {

    let correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    if (a === correctAnswer && currentQuestionIndex !== quizIndex) {
        console.log("correct");
        score + 1;
        currentQuestionIndex + 1;
        generateQQ();
    } else if (a !== correctAnswer && currentQuestionIndex !== quizIndex) {
        currentQuestionIndex + 1;
        generateQQ();
    } else {
        showScore();
    }
}

//need a function to show the final score
function finalScore() {

}

startButton.addEventListener("click", startQuiz);