document.addEventListener;

/* VARIABLE DECLARATION */
var main = document.getElementsByTagName ("main") [0]
var timeDisplay = document.getElementById("timeDisplay")
var startQuizBtn = document.getElementById("startQuizBtn")
var questionNumbers = document.getElementById("questionNumbers")
var questionDisplay = document.getElementById("questionDisplay")
var answersList = document.getElementById("answersList")
var answerFeedback = document.getElementById("answerFeedback")
var userScore = document.getElementById("userScore")
var initialInput = document.getElementById("initialInput")
var submitInitials = document.getElementById("submitInitials")
var highScores = document.getElementById("highScores")
var Reset = document.getElementById("Reset")

/* QUESTIONS */
const questions = [
    {
        title: "What role does javascript play in web pages?",
        choices: ["structures pages", "gives pages their aesthetic layout", "enables interactive functions", "none of the above"],
        answer: "enables interactive functions"
    },
    {
        title: "Which of these case types isn't commonly used in javascript?",
        choices: ["camelCase", "snake_case", "PascalCase", "nocase"],
        answer: "snake_case"
    },
    {
        title: "If you declare a variable (e. var name = Andrea) and later assign another value (e. name = Jason) which value will appear in the console log?",
        choices: ["Andrea", "Jason", "Neither", "Both"],
        answer: "Jason"
    },
    {
        title: "Booleans, numbers and strings are all types of _.",
        choices: ["Primitive Values", "Secondary Values", "JS Elements", "Variable IDs"],
        answer: "Primitive Values"
    },
    {
        title: "Inside which element to you link your javascript to your HTML file?",
        choices: ["<script>", "<js>", "<javascript>", "<a>"],
        answer: "<script>"
    },
    {
        title: "How would you write something in an alert box?",
        choices: ["alertBox()", "msg()", "alert()", "msgBox()"],
        answer: "alert()"
    },
    {
        title: "Which of the following is the correct format for functions?",
        choices: ["function = myFunction", "function()", "function:myFunction()", "function myFunction()"],
        answer: "function myFunction()"
    },
    {
        title: "How do you add comments on javascript?",
        choices: ["/* Comment */", "<!-- Comment -->", "'Comment'", "//Comment//"],
        answer: "//Comment//"
    },
    {
        title: "How do you declare a variable in javascript?",
        choices: ["variable: Name;", "var=Name;", "var:Name;", "var Name;"],
        answer: "var Name;"
    },
    {
        title: "Which sign is used to assign value to a variable?",
        choices: ["*", "-", "=", ":"],
        answer: "="
    },
];

/* SCORES */
const startingTime = questions.length * 10
const timePenalty = 10
var remainingTime
var Timer
var currentScore

/* QUIZ DEPLOYMENT */

function init() {
    startQuizBtn.addEventListener("click", function(event){
        event.preventDefault();
        displayQuestionPage ();
    })
    answersList.addEventListener("click", function (event) {
        event.preventDefault();
        if (event.target.matches("buton")) {
            var button = event.target
            if (button.classList.contains('correct')) {
                answerFeedback.textContent = "Correct!"
                questionNumbersBox.children[nextQuestionIndex - 1].classList.add('correct')
                score++
            } else {
                answerFeedback.textContent = "Incorrect!"
                questionNumbersBox.children[nextQuestionIndex - 1].classList.add('wrong')
                remainingTime -= timePenalty
            }
            if (remainingTime > 0) displayNextQuestion()
            else displayGetNamePage()
        }
    })
    submitInitialsButton.addEventListener("click", event => {
        event.preventDefault()
        let initials = initialsInput.value.toUpperCase()
        if (initials) {
            let highscores = JSON.parse(localStorage.getItem("highScores")) || []
            
            timestamp = Date.now()
            highScores.push({
                "timestamp": timestamp,
                "score": score,
                "initials": initials,
                "timeRemaining": remainingTime
            })
        }
    })
}