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

//Takes string that contains the question, array of strings that represent possible answers, and index of the correct answer in that array.
class question {
    constructor(questiontext, answers, correctIndex) {
        this.questiontext = questiontext;
        this.answers = answers;
        this.correctIndex = correctIndex;
    }
}