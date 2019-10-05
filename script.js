// p;ull in page objects
let highscoreDiv = document.querySelector("#highscore");
let gameTimerEl = document.querySelector("#gameTimer");
let quesTimerEl = document.querySelector("#quesTimer");
let mainEl = document.querySelector("#details");


// let questionEl = document.querySelector("#question")
// let answersListEl = document.querySelector("#answer-list")

// set global variables - how do we move these into localized
var test = 1;
var score = 0;
var quiz = {};

var gameDuration = 0;
var gameSecElapsed = 0;
var gameInterval;

var questionDuration = 15;
var questionSecElapsed = 0;
var questionInterval;

// draw instruction
init();

var startButton = document.querySelector("#startQuiz");

// function to display instructions
function init() {
  clearDetails();
  // creates Heading element for main page
  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "This game gives you the opportunity to take a time quiz!";

  // creates elements with the instructions for the game
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " You will have 15 seconds to answer each question. If you answer correctly you will score points. The quicker you answer the more points you will score. If you score incorrectly you will not lose points, but you will be penalized time."; 

  // creates button to start the game
  let startQuiz = document.createElement("button");
  startQuiz.setAttribute("id", "startQuiz");
  startQuiz.textContent= "Start Quiz";

  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(startQuiz);
}

// function to clear details element of all children
function clearDetails() {
  mainEl.innerHTML = "";
}

//start game
function playQuiz() {
  if (test) { console.log("--- playQuiz ---"); }
  // select quiz randomize questions
  quiz = setUpQuestions(questions);
  gameDuration = quiz.length * 15;
  
  // Start Game timer here
  startGameTimer();
  renderTime();

  // interact through randized questions
  // for ( i=0; i<quiz.length; i++ ) {
    //displays question 
    presentQuestion(quiz);
    // return;
  // }

  // if (test) { console.log("quiz length: " + quiz.length); }
  // if (test) { console.log("quiz[2].title: " + quiz[2].title); }
  
}

// function to get random question out of array
function setUpQuestions(arr) {
  // if (test) {console.log("--- setUpQuestions ---");}
  //TODO get different topic
  // TODO randomize questions
  let ranQuest = [];

  for (let i=0; i<arr.length; i++) {
    ranQuest.push(arr[i]);
  }
  return ranQuest;
}

// function to redraw screen with  question 
function presentQuestion(reducedQuiz) {
  if (test) {console.log("--- presentQuestion ---");}
  // if (test) {console.log("cur.choices[i] " + cur.choices);}

  // checks for no more questions and exits
  if ( reducedQuiz.length === 0 ) {
    endOfGame();
    return;
  }
  //sets current object (question) by pulling off of reducedQuiz
  cur = reducedQuiz.pop();
  // console.log("reducedquiz",reducedQuiz);

  //clears html to draw questions
  clearDetails();
   
  //build out display for new item
  let question = document.createElement("h1");
  // adds data value
  question.setAttribute("question", cur.title);
  question.textContent = cur.title;
  mainEl.appendChild(question)

  // create list as container to listen for answers
  let choiceBox = document.createElement("ul");
  choiceBox.setAttribute("id","choiceBox");
  mainEl.appendChild(choiceBox);

  //adds answers to screen
  for( let i=0; i<cur.choices.length; i++ ) {
    // creates variable for each choice item
    let listChoice = document.createElement("li");
    // adds data value
    listChoice.setAttribute("choice-value", cur.choices[i]);
    listChoice.textContent = cur.choices[i];
    //add choice to page
    choiceBox.appendChild(listChoice)
  }

  if (test) { console.log("cur",cur);}
  // set question counter counting down
  startQuestionTimer();
  // get answer from user
  // using the anymous function delays the invocation of the scoreAnswer
  choiceBox.addEventListener("click", function (){
    scoreAnswer(cur,reducedQuiz);
  });
  // calls for the next questions
}

function scoreAnswer(cur,reducedQuiz) {
  if (test) { console.log("--- scoreAnswer ---");}
 // ensure that the event on the li
  var e = event.target;
  if ( e.matches("li")) {
    let selectedItem = e.textContent;
    // if (selectedItemm === quiz.)
    // if (test) { console.log("check quiz " + quiz.length); }
    // if (test) { console.log("selectedItem quiz " + selectedItem); }
    if (test) { console.log("selectedItem cur " , cur.answer); }
    if ( selectedItem === cur.answer ) {
      if (test) { console.log("correct answer");}
      score += questionDuration - questionSecElapsed;
      //TODO display correct
      //TODO music 
    } else {
      if (test) { console.log("wrong answer");}
    }
    presentQuestion(reducedQuiz);
  }
    // grabs data index value of property of parent if clicked on botton
    // let index = element.parentElement.getAttribute("data-index");
    //splice deletes element out of array
    // todos.splice(index,1);
    // console.log("new todos: " + todos);
    // renderTodos();
 // conpare the answer with the corrent answer
 //add point if correct
 // subtract time if not  

 // present next question 
}


// function to set time for game timer
function setGameTime() {
  if (test) { console.log("--- setGameTime ---"); }
  if (test) { console.log("gameDuration " + gameDuration); }

  clearInterval(gameInterval);
  gameSeconds = gameDuration;
}

// function to set time question timer
function setQuestionTime() {
  clearInterval(questionInterval);
  questionDuration = 15;
}

function renderTime() {
  // if (test) { console.log(" --- renderTime --- "); }
  // if (test) { console.log("gameSecElapsed " + gameSeconds); }
  // if (test) { console.log("gameDuration " + gameDuration); }
  // if (test) { console.log("questionSecElapsed " + questionSecElapsed); }
  // if (test) { console.log("questionDuration " + questionDuration); }

  gameTimerEl.textContent = gameDuration - gameSecElapsed;
  quesTimerEl.textContent = questionDuration - questionSecElapsed;
  if ( (questionDuration - questionSecElapsed) === 0 ) {
     endOfGame();
  }
  if ( (gameDuration - gameSecElapsed) === 0 ) {
     endOfGame();
  }
}

function startGameTimer () {
  if (test) { console.log("--- startGameTimer ---"); }
  setGameTime();

  gameInterval = setInterval(function() {
    gameSecElapsed++; 
    renderTime();
  }, 1000);
}

function startQuestionTimer () {
  setQuestionTime();

  questionInterval = setInterval(function() {
    questionSecElapsed++; 
    renderTime();
  }, 1000);
}

function stopTime() {
  if (test) { console.log("--- stopTime --- ");}
  gameSeconds = 0;
  questionSeconds = 0;
  setGameTime();
  setQuestionTime();
}

// function of end of game
function endOfGame() {
  if (test) { console.log("--- endOfGame ---"); }
  stopTime();
  clearDetails();
}

// save high score to browser memery
function saveScore() {

}

// eventListener for start of play
startButton.addEventListener("click", playQuiz);

// event listener to question answering