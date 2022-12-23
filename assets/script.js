var timeLeft = 120;
var timerInterval;
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

var questions = [
    new question("Commonly used data types DO NOT include:",
        ["strings", "booleans", "alerts", "numbers"],
        2),
    new question("The condition in an if/else statement is enclosed within ____.",
        ["quotes","curly brackets","parentheses","square brackets"],
        2),
    new question("Arrays in JavaScript can be used to store ____.",
        ["numbers and strings","other arrays","booleans","all of the above"],
        3),
    new question("String values must be enclosed within ____ when being assigned to variables.",
        ["commas","curly brackets","quotes","parentheses"],
        2),
    new question("A very useful tool used during development and debugging for printing content to the debugger is:",
        ["JavaScript","terminal/bash","for loops","console.log"],
        3)
];

function LoadMainPage() {
    //Clear any previously added elements/text
    ClearPage();

    //Reset timer
    timeLeft = 120;
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
            var correct = questions[qnum].correctIndex === ansnum;
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
                    //TODO end quiz and head to highscores as a failure
                    clearInterval(interval);
                }
            }, 1000);
        }

        ++qnum;
        //if we've finished the last question, wrap up quiz
        if(qnum >= questions.length) {
            //TODO end quiz and offer a chance to add highscore in top/mid sections
            clearInterval(timerInterval);
        }
        //if we're not done yet, fill page with next question
        else {
            topOutputEl.textContent = questions[qnum].questiontext;
            for(var i = 0; i < questions[qnum].answers.length; i++)
            {
                var ansbutton = document.createElement("button");
                ansbutton.setAttribute("id", "quizinput_" + qnum + "_" + i);
                ansbutton.textContent = (i+1) + ". " + questions[qnum].answers[i];
                ansbutton.addEventListener("click", ProgressQuiz);
                middleOutputEl.append(ansbutton);
            }
        }
    } 
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
    document.querySelector("#countdown").textContent = timeLeft;
}

LoadMainPage();