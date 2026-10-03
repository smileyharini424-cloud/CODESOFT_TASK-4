const questions = [
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: 2
    },
    {
        question: "Which language is used to structure a web page?",
        options: ["CSS", "HTML", "Java", "Python"],
        answer: 2
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "define"],
        answer: 1
    },
    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        options: ["<!-- -->", "//", "/* */", "#"],
        answer: 2
    },
    {
        question: "Which method is used to display a message in the browser console?",
        options: ["console.log()", "print()", "display()", "show()"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let timeLeft = 10;
let timer;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumberElement = document.getElementById("question-number");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("next-btn");

function loadQuestion() {
    clearInterval(timer);

    selectedAnswer = null;
    timeLeft = 10;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionNumberElement.textContent =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    optionsElement.innerHTML = "";

    current.options.forEach(function(option, index) {
        const optionElement = document.createElement("div");

        optionElement.classList.add("option");
        optionElement.textContent = option;

        optionElement.addEventListener("click", function() {
            document.querySelectorAll(".option").forEach(function(item) {
                item.classList.remove("selected");
            });

            optionElement.classList.add("selected");
            selectedAnswer = index + 1;
        });

        optionsElement.appendChild(optionElement);
    });

    startTimer();
}

function startTimer() {
    timerElement.textContent = "Time: " + timeLeft + "s";

    timer = setInterval(function() {
        timeLeft--;

        timerElement.textContent = "Time: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timer);
            moveToNextQuestion();
        }
    }, 1000);
}

function moveToNextQuestion() {
    clearInterval(timer);

    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");

    document.getElementById("score").textContent =
        "Your Score: " + score + " / " + questions.length;
}

nextButton.addEventListener("click", moveToNextQuestion);

document.getElementById("restart-btn").addEventListener("click", function() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("quiz-box").classList.remove("hidden");
    document.getElementById("result-box").classList.add("hidden");

    loadQuestion();
});

loadQuestion();