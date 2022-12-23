const RawDataForAllQuestions = "What is the exceptional version of the Kite Shield?~Dragon Shield`Monarch`Aegis`Scutum@What is the elite version of the Cap?~Shako`War Hat`Dusk Shroud`Demonhead@What is the elite version of the Light Belt?~Vampirefang Belt`Sharkskin Belt`Mesh Belt`Battle Belt@What is the elite version of the Crystal Sword?~Phase Blade`Dimensional Blade`Legend Sword`Champion Sword@The Fanged Knife is the elite version of what?~Kris`Blade`Dirk`Dagger@The Cleaver is the exceptional version of what?~Axe`Double Axe`War Axe`Large Axe@Which rune combo makes the Leaf rune word?~Tir + Ral`Ral + Tir`Ort + Sol`Sol + Ort@Which rune combo makes the Steel rune word?~Tir + El`El + Tir`Tal + Eth`Eth + Tal";
const totalTime = 120; //starting time for each run through.
const totalQuestions = 20; //(maximum) number of questions, will be fewer if the file does not contain enough.
const maxStoredScores = 50; //most initial/score combos that will be stored in local storage

var timeLeft;
var timerInterval;

var allQuestions;
var currentQuestions;

var topOutputEl = document.querySelector("#content-head");
var middleOutputEl = document.querySelector("#content-main");
var bottomOutputEl = document.querySelector("#correctness-display");

//Takes string that contains the question, array of strings that represent possible answers, and index of the correct answer in that array.
class question {
    constructor(questiontext, answers, correctIndex) {
        this.questiontext = questiontext;
        this.answers = answers;
        this.correctIndex = correctIndex;
    }
}

function LoadMainPage() {
    //Clear any previously added elements/text
    ClearPage();
    middleOutputEl.setAttribute("class", "prompt");

    //Populate questions array with random questions
    ChooseRandomQuestions();

    //Reset timer
    timeLeft = totalTime;
    UpdateTimer();

    //Set intro text content
    topOutputEl.textContent = "Coding Quiz Challenge";
    middleOutputEl.innerHTML = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!<br>";

    //Create then append button to start quiz
    var startButton = document.createElement("button");
    startButton.setAttribute("id", "quizinput_-1_-1");
    startButton.textContent = "Start Quiz";
    startButton.addEventListener("click", ProgressQuiz);
    startButton.setAttribute("style", "display:inline;");
    middleOutputEl.append(startButton);
}

function ProgressQuiz(e) {
    var btn = e.target.id;
    if(btn.includes("quizinput")) {
        ClearPage();

        // values[1] will be: current question index
        // values[2] will be: this button's answer index
        var values = btn.split('_');
        var qnum = Number(values[1]);
        var ansnum =  Number(values[2]);

        //if this isn't the start of the quiz, check if answer was correct
        if(qnum >= 0) {
            var correct = currentQuestions[qnum].correctIndex === ansnum;
            //display whether correct in bottom section
            DisplayCorrectness(correct);
            
            //if incorrect, subtract time
            if(!correct) {
                timeLeft -= 10;
                UpdateTimer();
            }
        } 
        //if this IS the start of the quiz, start the timer loop
        else {
            timerInterval = setInterval(function() {
                --timeLeft;
                UpdateTimer();
                //if no time left, end quiz
                if(timeLeft <= 0) {
                    ViewHighScores();
                    clearInterval(interval);
                }
            }, 1000);
            //Set class on div for button styling
            middleOutputEl.setAttribute("class", "answers");
        }

        ++qnum;
        //if we've finished the last question, wrap up quiz
        if(qnum >= currentQuestions.length) {
            LoadHighScoreInput();
            clearInterval(timerInterval);
        }
        //if we're not done yet, fill page with next question
        else {
            topOutputEl.textContent = currentQuestions[qnum].questiontext;
            for(var i = 0; i < currentQuestions[qnum].answers.length; i++)
            {
                var ansbutton = document.createElement("button");
                ansbutton.setAttribute("id", "quizinput_" + qnum + "_" + i);
                ansbutton.textContent = (i+1) + ". " + currentQuestions[qnum].answers[i];
                ansbutton.addEventListener("click", ProgressQuiz);
                middleOutputEl.append(ansbutton);
            }
        }
    } 
}

function LoadHighScoreInput() {
    //Make sure we have a fresh page, with no flex buttons
    ClearPage();
    middleOutputEl.setAttribute("class", "prompt");

    topOutputEl.textContent = "Congratulations!";

    //Create score output paragraph
    var scoreOutput = document.createElement("p");
    scoreOutput.textContent = "Your final score is " + timeLeft + ".";

    //Create form and its elements
    var initialsForm = document.createElement("form");
    var initialsLabel = document.createElement("label");
    initialsLabel.setAttribute("for", "initials");
    initialsLabel.textContent = "Enter Initials: ";
    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("id", "initials");
    initialsInput.setAttribute("name", "initials");
    initialsInput.setAttribute("maxlength", "3");
    initialsInput.setAttribute("style", "width:100px; height:50px; padding:5px; font-size:24px; text-transform:uppercase;");
    var initialsSubmit = document.createElement("button");
    initialsSubmit.setAttribute("style", "display:inline;");
    initialsSubmit.textContent = "Submit";
    initialsSubmit.addEventListener("click", AddHighScore);

    //Add all new elements to page
    middleOutputEl.append(scoreOutput);
    middleOutputEl.append(initialsForm);
    initialsForm.append(initialsLabel);
    initialsForm.append(initialsInput);
    initialsForm.append(initialsSubmit);
}

function AddHighScore(event) {
    event.preventDefault();

    for(var i = 0; i < maxStoredScores; i++)
    {
        //if we've reached the end and there's still space, store score
        if(localStorage.getItem("score" + i) === null) {
            localStorage.setItem("score" + i, timeLeft);
            break;
        } 
        //if we reach a point where the next score up is worse than this one, insert this one and push the rest back
        else if (Number(localStorage.getItem("score" + i) > timeLeft)) {

        }
    }

    ViewHighScores();
}

function ViewHighScores() {
    console.log(localStorage.getItem("hi"));

    ClearPage();
    middleOutputEl.setAttribute("class", "prompt");
    clearInterval(timerInterval);

    topOutputEl.textContent = "Highscores";
    
    //TODO for each high score in storage, create a block element with alternating background (via .css) with the info on it

    var backButton = document.createElement("button");
    backButton.setAttribute("style", "display:inline;");
    backButton.textContent = "Go Back";
    backButton.addEventListener("click", LoadMainPage);
    var resetButton = document.createElement("button");
    resetButton.setAttribute("style", "display:inline;");
    resetButton.textContent = "Clear Scores";
    //TODO set reset event handler, to a function that clears local storage

    middleOutputEl.append(backButton);
    middleOutputEl.append(resetButton);
}

function DisplayCorrectness(correct) {
    //display message for _ seconds:
    var messageTime = 2;

    //create message for correct or incorrect
    if(correct) {
        bottomOutputEl.innerHTML = "<hr>Correct!";
    } else {
        bottomOutputEl.innerHTML = "<hr>Sorry, wrong.";
    }
    //In either case, display brief message
    var displayInterval = setInterval(function() {
        //after one interval of delay, clear the display content and abort the interval
        bottomOutputEl.textContent = "";
        clearInterval(displayInterval);
    }, 1000*messageTime);
}

//Take random questions from allQuestions and put them into currentQuestions, up to 'totalQuestions" amount
function ChooseRandomQuestions() {
    currentQuestions = [];

    //randomize order of questions
    ShuffleArray(allQuestions);

    //grab the first however many needed from random order
    for(var i = 0; i < Math.min(allQuestions.length, totalQuestions); i++) {
        currentQuestions.push(allQuestions[i]);
    }
}

//takes the big raw data string at the top and formats it into the questions array
function ConvertQuestionDataToObjects() {
    allQuestions = [];
    var segments = RawDataForAllQuestions.split('@');
    for(var i = 0; i < segments.length; i++)
    {
        var parts = segments[i].split('~');
        var answers = parts[1].split('`');
        var correctIndex = ShuffleArray(answers);

        allQuestions.push(new question(parts[0], answers, correctIndex));
    }
}

//returns new index of what was originally the first element
function ShuffleArray(array) {
    var copyarray = [].concat(array);
    array.splice(0,array.length);
    var newIndex = -1;
    while(copyarray.length > 0) {
        var index = Math.floor(Math.random() * copyarray.length);
        if(newIndex < 0) {
            if(index === 0) {
                newIndex *= -1;
            }
            --newIndex;
        }
        array.push(copyarray[index]);
        copyarray.splice(index, 1);
    }
    return newIndex;
}

//clears any children added to content sections
function ClearPage() {
    var addedChildren = document.querySelectorAll("main>*>*");
    addedChildren.forEach(function(element) {
        element.remove();
    });
    topOutputEl.textContent = "";
    middleOutputEl.textContent = "";
    bottomOutputEl.textContent = "";
}

function UpdateTimer() {
    if(timeLeft < 0) {
        timeLeft = 0;
    }
    document.querySelector("#countdown").textContent = timeLeft;
}

//On page load, turn question data into objects and fire up starting page
ConvertQuestionDataToObjects();
LoadMainPage();