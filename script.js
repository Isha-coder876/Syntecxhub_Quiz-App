const questions = [
    {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correct: 1
    },
    {
        question: "Which HTML tag is used for the largest heading?",
        options: ["<head>", "<h6>", "<h1>", "<heading>"],
        correct: 2
    },
    {
        question: "What does the 'box-sizing: border-box' property do?",
        options: ["Removes borders", "Includes padding and border in width", "Creates a box shadow", "Changes box color"],
        correct: 1
    },
    {
        question: "Which JavaScript method is used to select an element by ID?",
        options: ["querySelector()", "getElementById()", "selectElement()", "findById()"],
        correct: 1
    },
    {
        question: "What is the default display property of a <div> element?",
        options: ["inline", "block", "flex", "grid"],
        correct: 1
    },
    {
        question: "Which CSS property is used to change text color?",
        options: ["font-color", "text-color", "color", "foreground-color"],
        correct: 2
    },
    {
        question: "What is the purpose of the 'alt' attribute in an <img> tag?",
        options: ["Alternate image source", "Image description for accessibility", "Image alignment", "Image animation"],
        correct: 1
    },
    {
        question: "Which is NOT a valid CSS position value?",
        options: ["static", "relative", "absolute", "center"],
        correct: 3
    },
    {
        question: "What does DOM stand for?",
        options: ["Document Object Model", "Data Object Management", "Digital Optical Media", "Document Orientation Method"],
        correct: 0
    },
    {
        question: "Which property is used to create rounded corners in CSS?",
        options: ["corner-radius", "border-radius", "round-corner", "edge-radius"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

function startQuiz() {
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    selectedOption = null;
    const question = questions[currentQuestion];

    document.getElementById('questionNumber').textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById('currentScore').textContent = `Score: ${score}`;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('nextBtn').classList.add('hidden');

    const progress = ((currentQuestion) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionDiv);
    });
}

function selectOption(index) {
    if (selectedOption !== null) return;

    selectedOption = index;
    const options = document.querySelectorAll('.option');
    const question = questions[currentQuestion];

    options.forEach((option, i) => {
        option.classList.add('disabled');
        if (i === question.correct) {
            option.classList.add('correct');
        }
        if (i === selectedOption && i !== question.correct) {
            option.classList.add('wrong');
        }
    });

    if (selectedOption === question.correct) {
        score++;
        document.getElementById('currentScore').textContent = `Score: ${score}`;
    }

    setTimeout(() => {
        document.getElementById('nextBtn').classList.remove('hidden');
    }, 600);
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.remove('hidden');

    const percentage = (score / questions.length) * 100;
    document.getElementById('finalScore').textContent = `${score}/${questions.length}`;

    let message = '';
    let icon = '';

    if (percentage === 100) {
        message = "Perfect score! You're a genius! 🌟";
        icon = "🏆";
    } else if (percentage >= 80) {
        message = "Excellent work! Almost perfect! 🎯";
        icon = "🎉";
    } else if (percentage >= 60) {
        message = "Good job! Keep it up! 👏";
        icon = "😊";
    } else if (percentage >= 40) {
        message = "Not bad! Room for improvement! 💪";
        icon = "📚";
    } else {
        message = "Keep practicing! You'll get better! 🌱";
        icon = "💡";
    }

    document.getElementById('resultMessage').textContent = message;
    document.getElementById('resultIcon').textContent = icon;
}

function restartQuiz() {
    document.getElementById('resultScreen').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
}