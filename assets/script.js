const RawDataForAllQuestions = "What is the exceptional version of the Kite Shield?~Dragon Shield`Monarch`Aegis`Scutum@What is the elite version of the Cap?~Shako`War Hat`Dusk Shroud`Demonhead@What is the elite version of the Light Belt?~Vampirefang Belt`Sharkskin Belt`Mesh Belt`Battle Belt@What is the elite version of the Crystal Sword?~Phase Blade`Dimensional Blade`Legend Sword`Champion Sword@The Fanged Knife is the elite version of what?~Kris`Blade`Dirk`Dagger@The Cleaver is the exceptional version of what?~Axe`Double Axe`War Axe`Large Axe@Which rune combo makes the Leaf rune word?~Tir + Ral`Ral + Tir`Ort + Sol`Sol + Ort@Which rune combo makes the Steel rune word?~Tir + El`El + Tir`Tal + Eth`Eth + Tal@A perfect topaz adds __% magic find to armor/helms.~24`20`22`18@A perfect diamond adds __% to all resistances in a shield.~19`17`18`20@Kaelan (NPC) can be found in town in Act:~2`3`4`5@Strength can be added to armor/helms by inserting a(n):~Amethyst`Ruby`Diamond`Skull@Lifesteal can be added to a weapon by inserting a(n):~Amn rune`Shael rune`Sol rune`Ith rune@Item requirements can be reduced by inserting a:~Hel rune`Lum rune`Skull`Stone of Jordan@The highest rune that can be created in the cube without gems is:~Thul`Ort`Amn`Sol@The suffix \"of the Apprentice\" means an item has:~Faster Cast Rate`Increased Mana`Mana Steal`Lower Requirements@\"The Spirit Shroud\" is the unique version of:~Ghost Armor`Serpentskin Armor`Quilted Armor`Leather Armor@\"Shaftstop\" is the unique version of:~Mesh Armor`Russet Armor`Splint Mail`Chain Mail@\"Twitchthroe\" is the unique version of:~Studded Leather`Hard Leather`Demonhide`Trellised Armor@\"Bloodletter\" is the unique version of:~Gladius`Short Sword`Cutlass`Scimitar@\"Headstriker\" is the unique version of:~Battle Sword`Rune Sword`Broad Sword`Long Sword@\"Harlequin Crest\" is a unique:~Shako`Cap`War Hat`Circlet@The Hole is a dungeon located in:~Black Marsh`Tamoe Highland`Dark Wood`Stony Field@The Pit is a dungeon located in:~Tamoe Highland`Black Marsh`Dark Wood`Stony Field@The Staff of Kings is found in the Maggot Lair, beneath:~Far Oasis`Dry Hills`Lost City`Rocky Waste@Your personal stash has __ rows of space:~8`6`9`10@Socketing body armor in the cube requires:~Tal, Thul, Topaz`Ral, Amn, Amethyst`Ral, Thul, Sapphire`Tal, Amn, Ruby@Socketing a weapon in the cube requires:~Ral, Amn, Amethyst`Tal, Thul, Topaz`Ral, Thul, Sapphire`Tal, Amn, Ruby@Socketing a helm in the cube requires:~Ral, Thul, Sapphire`Tal, Thul, Topaz`Ral, Amn, Amethyst`Tal, Amn, Ruby@Socketing a shield in the cube requires:~Tal, Amn, Ruby`Ral, Thul, Sapphire`Ral, Amn, Amethyst`Tal, Thul, Topaz@Upgrading a unique weapon from normal to exceptional requires:~Ral, Sol, Emerald`Ral, Sol, Diamond`Tal, Shael, Diamond`Tal, Shael, Emerald@Upgrading unique armor from normal to exceptional requires:~Tal, Shael, Diamond`Tal, Shael, Emerald`Ral, Sol, Emerald`Ral, Sol, Diamond@Upgrading a unique weapon from exceptionial to elite requires:~Lum, Pul, Emerald`Lum, Pul, Diamond`Ko, Lem, Emerald`Ko, Lem, Diamond@Upgrading unique armor from exceptional to elite requires:~Ko, Lem, Diamond`Ko, Lem, Emerald`Lum, Pul, Emerald`Lum, Pul, Diamond@The Io rune grants 10 to what stat (in any piece):~Vitality`Energy`Dexterity`Strength@Bishibosh is a super-unique monster located in:~Cold Plains`Stony Field`Dark Wood`Black Marsh@Witch Doctor Endugu is a super unique monster located in:~Flayer Dungeon`Swampy Pit`Arachnid Lair`Kurast Sewers@Eldritch the Rectifier is a super-unique monster located in:~Frigid Highlands`Bloody Foothills`Arreat Plateau`Crystalline Passage@Frozenstein is a super-unique monster located in:~Frozen River`Crystalline Passage`Glacial Trail`Drifter Cavern@Which rune combo makes the Ancient's Pledge rune word?~Ral + Ort + Tal`Tal + Ral + Ort`Tal + Ort + Ral`Ort + Tal + Ral@Which rune combo makes the Malice rune word?~Ith + El + Eth`Eth + El + Ith`El + Ith + Eth`Eth + Ith + El@Which rune combo makes the Rhyme rune word?~Shael + Eth`Shael + Ith`Ith + Shael`Eth + Shael@Which rune combo makes the Stealth rune word?~Tal + Eth`Eth + Tal`Ral + Eth`Eth + Ral@Blood Raven is a quest boss in Act:~1`2`3`4@You first encounter the Archangel Tyrael in Act:~2`1`3`4@A Tome of Town Portal can hold a maximum of __ scrolls:~20`10`16`unlimited@How many classes are there?~7`1`6`5@\"Leap\" is an ability belonging to the ____ class.~Barbarian`Amazon`Paladin`Assassin@There are __ levels of health or mana potion.~5`3`4`6@If your mercenary kills a foe, loot rarity is affected by bonus Magic Find (MF) as such:~Both Combined`Merc's MF`Your MF`No Bonus";
const totalTime = 120; //starting time for each run through.
const totalQuestions = 8; //(maximum) number of questions, will be fewer if the file does not contain enough.
const maxStoredScores = 20; //most initial/score combos that will be stored in local storage

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
    topOutputEl.textContent = "Diablo II Trivia";
    middleOutputEl.innerHTML = "Try to answer the following Diablo II questions within the time limit. Questions are based on the original game + expansion, no other versions or mods. Incorrect answers remove 10 seconds from the clock.<br>";

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
            clearInterval(timerInterval);
            if(timeLeft <= 0) {
                ViewHighScores();
            } else {
                LoadHighScoreInput();
            }
        }
        //if we're not done yet, fill page with next question
        else {
            topOutputEl.textContent = currentQuestions[qnum].questiontext;
            for(var i = 0; i < currentQuestions[qnum].answers.length; i++)
            {
                var ansbutton = document.createElement("button");
                ansbutton.setAttribute("id", "quizinput_" + qnum + "_" + i);
                ansbutton.textContent = /*(i+1) + ") " + */currentQuestions[qnum].answers[i];
                ansbutton.addEventListener("click", ProgressQuiz);
                middleOutputEl.append(ansbutton);
            }
        }
    } 
}

function LoadHighScoreInput() {
    //Make sure we have a fresh page, with no flex buttons
    ClearPage(false, false, true);
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
    var initials = document.querySelector("#initials").value;
    if(initials.length === 0) {
        alert("Please enter initials.");
        return;
    }
    var data = JSON.parse(localStorage.getItem("scoreData"));
    var thissave = initials + "_" + timeLeft;
    //If no saved data yet, initiate it.
    if(data === null) {
        data = [thissave];  
    }
    //If saved data is maxed and this score is worse than last, don't store it
    else if(data.length >= maxStoredScores && Number(data[data.length - 1].split('_')[1]) >= timeLeft) {
        bottomOutputEl.textContent = "Score not in top " + maxStoredScores + ", sorry.";
    }
    //Otherwise go through all scores until we find our place 
    else {
        for(var i = 0; i < maxStoredScores; i++)
        {
            //if we've reached the end and there's still space, store score
            if(i >= data.length) {
                data.push(thissave);
                break;
            } 
            //if we reach a point where stored score is worse than this one, insert this one and push the rest back
            else if (Number(data[i].split('_')[1]) < timeLeft) {
                data.splice(i,0,thissave);
                break;
            }
        }
    }

    localStorage.setItem("scoreData", JSON.stringify(data));

    ViewHighScores();
}

function ViewHighScores() {
    //Fresh page for displaying scores, stop timer
    ClearPage();
    middleOutputEl.setAttribute("class", "prompt");
    clearInterval(timerInterval);

    topOutputEl.textContent = "Highscores";
    
    //Read data array from local storage
    var data = JSON.parse(localStorage.getItem("scoreData"));

    //If no data, give a message.
    if(data === null) {
        var noscorep = document.createElement("p");
        noscorep.textContent = "No scores yet - try playing!";
        middleOutputEl.append(noscorep);
    } else {
        var list = document.createElement("ol");
        for(var i = 0; i < data.length; i++)
        {
            //split initials and score, format initials to be consistent length
            var split = data[i].split('_');
            var output = split[0].toUpperCase();
            for(var j = output.length; j < 3; j++) {
                output += " ";
            }

            //create output list item with score that will be stylized in css
            var displayblock = document.createElement("li");
            displayblock.setAttribute("class","score-display");
            var displayformat = document.createElement("pre");
            //set pre element to add whitespace and to make text white while list numbers remain black
            displayformat.setAttribute("style", "font-family:'Courier New', Courier, monospace; color:white;");
            displayformat.textContent = output + " - " + split[1];
            displayblock.append(displayformat);
            list.append(displayblock);
        }
        middleOutputEl.append(list);
    }
    //Create button to return to starting page
    var backButton = document.createElement("button");
    backButton.setAttribute("style", "display:inline;");
    backButton.textContent = "Go Back";
    backButton.addEventListener("click", LoadMainPage);
    middleOutputEl.append(backButton);

    //Create button to clear scores, unless there are none
    if(data !== null) {
        var resetButton = document.createElement("button");
        resetButton.setAttribute("style", "display:inline;");
        resetButton.textContent = "Clear Scores";
        resetButton.addEventListener("click", ResetHighScores);
        middleOutputEl.append(resetButton);
    }
}

function ResetHighScores() {
    localStorage.removeItem("scoreData");
    ViewHighScores();
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

//clears any children added to content sections and any text content in them
function ClearPage() {
    ClearPage(false, false, false);
}
//Clears elements from main page content, but optionally retains textcontent in any section
function ClearPage(retainTopText, retainMiddleText, retainBottomText) {
    var addedChildren = document.querySelectorAll("main>*>*");
    addedChildren.forEach(function(element) {
        element.remove();
    });
    if(!retainTopText) { 
        topOutputEl.textContent = "";
    }
    if(!retainMiddleText) {
        middleOutputEl.textContent = "";    
    }
    if(!retainBottomText) {
        bottomOutputEl.textContent = "";    
    }
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