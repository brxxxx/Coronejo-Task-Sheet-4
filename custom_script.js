// Modal Helper
function showFact(title, text) {
  const titleEl = document.getElementById('factTitle');
  const contentEl = document.getElementById('factContent');
  
  if (titleEl) titleEl.innerText = title;
  if (contentEl) contentEl.innerText = text;
  
  const modal = new bootstrap.Modal(document.getElementById('factModal'));
  modal.show();
}

// QUIZ LOGIC - 10 QUESTIONS
const questions = [
  {
    q: "Which milestone introduced the 'right to be let alone' in 1890?",
    a: ["Convention 108", "UDHR", "Warren and Brandeis", "EU GDPR"],
    correct: 2
  },
  {
    q: "Which 1948 document recognizes privacy as a fundamental human right?",
    a: ["Convention 108", "Constitution", "UDHR", "US Privacy Act"],
    correct: 2
  },
  {
    q: "What event led to the U.S. Privacy Act of 1974?",
    a: ["World War II", "Watergate Scandal", "Internet invention", "First data breach"],
    correct: 1
  },
  {
    q: "What was the first legally binding international treaty on data protection?",
    a: ["Convention 108", "OECD Guidelines", "GDPR", "Directive 95/46/EC"],
    correct: 0
  },
  {
    q: "Directive 95/46/EC was the direct predecessor to which law?",
    a: ["DPA 2012", "US Privacy Act", "GDPR", "Convention 108"],
    correct: 2
  },
  {
    q: "What is the Republic Act number for the PH Data Privacy Act (2012)?",
    a: ["RA 9184", "RA 10173", "RA 8293", "RA 7394"],
    correct: 1
  },
  {
    q: "Which agency enforces the Data Privacy Act in the Philippines?",
    a: ["NTC", "NPC", "DICT", "CHR"],
    correct: 1
  },
  {
    q: "Which law is considered the current global 'gold standard' for privacy?",
    a: ["Convention 108", "US Privacy Act", "GDPR", "PH DPA"],
    correct: 2
  },
  {
    q: "What did the 2021 NPC guidelines in the Philippines primarily strengthen?",
    a: ["Breach reporting", "Social media rules", "Travel permits", "Tax rules"],
    correct: 0
  },
  {
    q: "PrivacyFlow covers milestones spanning which years?",
    a: ["1990-2020", "1890-2021", "1948-2024", "2012-2026"],
    correct: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;
let userAnswers = [];

function renderQuestion() {
  const qData = questions[currentQuestionIndex];
  const qText = document.getElementById('question-text');
  const qProgress = document.getElementById('quiz-progress');
  const optionsContainer = document.getElementById('options-container');
  const submitBtn = document.getElementById('submit-btn');

  // Add fade-out animation
  qText.classList.add('animate__fadeOut');
  
  setTimeout(() => {
    qText.innerText = qData.q;
    qProgress.innerText = `Milestone ${currentQuestionIndex + 1} of 10`;
    
    optionsContainer.innerHTML = '';
    qData.a.forEach((option, index) => {
      const div = document.createElement('div');
      div.className = 'quiz-option animate__animated animate__fadeInUp';
      div.style.animationDelay = `${index * 0.1}s`;
      div.innerText = option;
      div.onclick = () => selectQuizOption(div, index);
      optionsContainer.appendChild(div);
    });

    submitBtn.disabled = true;
    selectedOptionIndex = null;
    
    // Switch to fade-in
    qText.classList.remove('animate__fadeOut');
    qText.classList.add('animate__fadeIn');
  }, 400);
}

function selectQuizOption(el, index) {
  document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('active'));
  el.classList.add('active');
  selectedOptionIndex = index;
  document.getElementById('submit-btn').disabled = false;
}

function handleQuizSubmit() {
  const isCorrect = (selectedOptionIndex === questions[currentQuestionIndex].correct);
  if (isCorrect) score++;
  
  userAnswers.push({
    question: questions[currentQuestionIndex].q,
    userAnswer: questions[currentQuestionIndex].a[selectedOptionIndex],
    correctAnswer: questions[currentQuestionIndex].a[questions[currentQuestionIndex].correct],
    isCorrect: isCorrect
  });
  
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  document.getElementById('quiz-qa').classList.add('d-none');
  const resultsDiv = document.getElementById('quiz-results');
  resultsDiv.classList.remove('d-none');
  resultsDiv.classList.add('animate__animated', 'animate__fadeIn');
  
  document.getElementById('final-score').innerText = score;
  
  const feedback = document.getElementById('score-feedback');
  if (score === 10) feedback.innerText = "Master of Privacy! You've successfully navigated the entire history.";
  else if (score >= 7) feedback.innerText = "Excellent Work! You have a deep understanding of digital rights.";
  else if (score >= 5) feedback.innerText = "Good Effort! You're on your way to becoming a privacy advocate.";
  else feedback.innerText = "The journey continues. Re-examine the timeline to strengthen your knowledge.";

  const summaryContainer = document.getElementById('summary-results-container');
  summaryContainer.innerHTML = '';
  
  userAnswers.forEach((ans, index) => {
    const item = document.createElement('div');
    item.className = 'quiz-summary-item p-3 border-bottom border-secondary border-opacity-25';
    const icon = ans.isCorrect ? '<span class="text-success me-2">✅</span>' : '<span class="text-danger me-2">❌</span>';
    
    item.innerHTML = `
      <div class="d-flex flex-column">
        <p class="font-outfit mb-2 text-white">${icon} Q${index + 1}: ${ans.question}</p>
        <div class="small ps-4">
            <p class="mb-1 ${ans.isCorrect ? 'text-success' : 'text-danger'}">You chose: ${ans.userAnswer}</p>
            ${!ans.isCorrect ? `<p class="mb-0 text-primary">Correct: ${ans.correctAnswer}</p>` : ''}
        </div>
      </div>
    `;
    summaryContainer.appendChild(item);
  });
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedOptionIndex = null;
  userAnswers = [];
  document.getElementById('quiz-qa').classList.remove('d-none');
  document.getElementById('quiz-results').classList.add('d-none');
  const container = document.getElementById('summary-results-container');
  if (container) container.classList.add('d-none'); // Reset toggle state
  renderQuestion();
}

// Initial render
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('question-text')) {
        renderQuestion();
    }
});
