// script.js
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        choices: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices-container");
const submitButton = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const pieChartCanvas = document.getElementById("pie-chart").getContext("2d");

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        questionText.textContent = question.question;

        choicesContainer.innerHTML = question.choices.map((choice, index) => {
            return `<li><input type="radio" name="choice" value="${index}" id="choice${index}"> <label for="choice${index}">${choice}</label></li>`;
        }).join('');
    } else {
        showResult();
    }
}

function showResult() {
    resultContainer.style.display = "block";
    resultText.textContent = `You scored ${score} out of ${questions.length}.`;

    // Create a pie chart to display the score
    const correctAnswers = score;
    const incorrectAnswers = questions.length - score;

    const chartData = {
        labels: ['Correct Answers', 'Incorrect Answers'],
        datasets: [{
            data: [correctAnswers, incorrectAnswers],
            backgroundColor: ['#4CAF50', '#FF5252'],
            borderColor: ['#4CAF50', '#FF5252'],
            borderWidth: 1
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ": " + tooltipItem.raw;
                    }
                }
            }
        }
    };

    new Chart(pieChartCanvas, {
        type: 'pie',
        data: chartData,
        options: chartOptions
    });

    submitButton.style.display = "none";
}

function checkAnswer() {
    const selectedChoice = document.querySelector('input[name="choice"]:checked');
    if (selectedChoice) {
        const answerIndex = parseInt(selectedChoice.value);
        if (answerIndex === questions[currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        loadQuestion();
    } else {
        alert("Please select an answer before submitting.");
    }
}

submitButton.addEventListener("click", checkAnswer);

// Start the quiz
loadQuestion();
