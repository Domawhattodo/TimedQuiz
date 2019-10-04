// pull in page objects
let highscoreDiv = document.querySelector("#highscore");
let timerDiv = document.querySelector("#timer");
let mainHeadEl = document.querySelector("#main-heading");
let mainBodyEl = document.querySelector("#main-body");
let startButton = document.querySelector("#startQuiz");


// set global variables
let test = 1;
let score = 0;

//start game
function startQuiz() {

  let quiz = setUpQuestions(questions);
  console.log(quiz);

  if (test) { console.log("quiz length: " + quiz.length); }
  if (test) { console.log("quiz[2].title: " + quiz[2].title); }
  
}

// function to get random question out of array
function setUpQuestions(arr) {
  //TODO get different topic
  // TODO randomize questions
  let ranQuest = [];

  for (let i=0; i<arr.length; i++) {
    ranQuest.push(arr[i]);
  }
  return ranQuest;
}

// function to redraw screen with  question 
function presentQuestion() {

}

// function for scoreing and testing correctness
function setScore() {

}

// function to set time for game timer
function setGameTimer() {

}

// function to set time question timer
function setQuestionTimer() {

}

// function of end of game
function endOfGame() {

}

// save high score to browser memery
function saveScore() {

}

// eventListener for start of play
startButton.addEventListener("click", startQuiz)

// event listener to question answering


