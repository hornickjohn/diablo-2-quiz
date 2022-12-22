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
    //Clear any previously added elements
    var addedChildren = document.querySelectorAll("main>*>*");
    addedChildren.forEach(function(element) {
        element.remove();
    });

    //Set intro text content
    document.querySelector("#content-top").textContent = "Coding Quiz Challenge";
    document.querySelector("#content-mid").textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";

    //Create then append button to start quiz
    var startButton = document.createElement("input");
    startButton.setAttribute("type", "button");
    startButton.setAttribute("id", "quizinput_0_0");
    startButton.setAttribute("value", "Start Quiz");
    startButton.onclick = ProgressQuiz;
    document.querySelector("#content-bottom").append(startButton);
}

function ProgressQuiz(e) {
    var btn = e.target.id;
    if(btn.includes("quizinput")) {
        var values = btn.split('_');
        // values[1] = question
        // values[2] = answer
    } 
}

LoadMainPage();