// Sample question bank (expand with more questions)
const questions = [
    {
        question: "If the velocity of a particle is given by v = 3t² + 2t + 1, what is its acceleration at t = 2s?",
        options: ["10 m/s²", "12 m/s²", "14 m/s²", "16 m/s²"],
        correct: "14 m/s²"
    },
    {
        question: "The hybridization of the central atom in NH₃ is:",
        options: ["sp", "sp²", "sp³", "dsp²"],
        correct: "sp³"
    },
    {
        question: "If ∫(0 to π/2) sin x dx = 1, then ∫(0 to π/2) sin³ x dx is:",
        options: ["1/3", "2/3", "3/4", "4/5"],
        correct: "2/3"
    }
];

let currentQuestionIndex = 0;
let timerInterval;
let secondsElapsed = 0;
let isOptionSelected = false;

// DOM elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const timerDisplay = document.getElementById("timer");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Load question
function loadQuestion(index) {
    const q = questions[index];
    questionText.textContent = `Q${index + 1}. ${q.question}`;
    optionsContainer.innerHTML = "";
    feedback.textContent = "";
    isOptionSelected = false;

    // Create option buttons
    q.options.forEach(option => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = option;
        div.addEventListener("click", () => selectOption(option, q.correct));
        optionsContainer.appendChild(div);
    });

    // Reset and start timer
    resetTimer();
    startTimer();

    // Update navigation buttons
    updateNavigation();
}

// Start timer
function startTimer() {
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
}

// Reset timer
function resetTimer() {
    clearInterval(timerInterval);
    secondsElapsed = 0;
    timerDisplay.textContent = "00:00";
}

// Stop timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Select option
function selectOption(selected, correct) {
    if (isOptionSelected) return; // Prevent multiple selections
    isOptionSelected = true;
    stopTimer();

    // Highlight selected option
    const options = document.querySelectorAll(".option");
    options.forEach(opt => {
        opt.classList.remove("selected", "correct", "incorrect");
        if (opt.textContent === selected) {
            opt.classList.add("selected");
        }
    });

    // Provide feedback
    if (selected === correct) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        options.forEach(opt => {
            if (opt.textContent === correct) opt.classList.add("correct");
        });
    } else {
        feedback.textContent = `Incorrect! Correct answer: ${correct}`;
        feedback.style.color = "red";
        options.forEach(opt => {
            if (opt.textContent === selected) opt.classList.add("incorrect");
            if (opt.textContent === correct) opt.classList.add("correct");
        });
    }
}

// Update navigation buttons
function updateNavigation() {
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === questions.length - 1;
}

// Event listeners for navigation
prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

// Initialize
loadQuestion(currentQuestionIndex);