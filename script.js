// Stocker les questions et réponses
let quizData = JSON.parse(localStorage.getItem("quiz")) || [];

// Afficher le menu principal
function showMenu() {
    document.getElementById("menu").classList.remove("hidden");
    document.getElementById("createQuiz").classList.add("hidden");
    document.getElementById("playQuiz").classList.add("hidden");
}

// Afficher le menu de création de quiz
function showCreateQuiz() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("createQuiz").classList.remove("hidden");
}

// Ajouter une question au quiz
function addQuestion() {
    let question = document.getElementById("question").value;
    let answer = document.getElementById("answer").value;
    
    if (question && answer) {
        quizData.push({ question, answer });
        localStorage.setItem("quiz", JSON.stringify(quizData));
        alert("Question ajoutée !");
        document.getElementById("question").value = "";
        document.getElementById("answer").value = "";
    } else {
        alert("Veuillez entrer une question et une réponse.");
    }
}

// Jouer au quiz
let currentQuestionIndex = 0;
function showPlayQuiz() {
    if (quizData.length === 0) {
        alert("Aucune question disponible. Veuillez en ajouter !");
        return;
    }
    
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("playQuiz").classList.remove("hidden");
    
    currentQuestionIndex = 0;
    displayQuestion();
}

// Afficher la question actuelle
function displayQuestion() {
    if (currentQuestionIndex < quizData.length) {
        document.getElementById("questionDisplay").innerText = quizData[currentQuestionIndex].question;
        document.getElementById("userAnswer").value = "";
        document.getElementById("feedback").innerText = "";
    } else {
        alert("Quiz terminé !");
        showMenu();
    }
}

// Vérifier la réponse de l'utilisateur
function checkAnswer() {
    let userAnswer = document.getElementById("userAnswer").value.trim().toLowerCase();
    let correctAnswer = quizData[currentQuestionIndex].answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        document.getElementById("feedback").innerText = "Bonne réponse ! 🎉";
        currentQuestionIndex++;
        setTimeout(displayQuestion, 1000);
    } else {
        document.getElementById("feedback").innerText = "Mauvaise réponse, réessayez ! ❌";
    }
}

// Réinitialiser le quiz
function resetQuiz() {
    if (confirm("Voulez-vous vraiment effacer toutes les questions ?")) {
        localStorage.removeItem("quiz");
        quizData = [];
        alert("Quiz réinitialisé !");
    }
}
