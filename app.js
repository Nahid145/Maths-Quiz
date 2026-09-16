const TOTAL_QUESTIONS = 10;

const quizScreen = document.querySelector('#quiz-screen');
const endScreen = document.querySelector('#end-screen');
const question = document.querySelector('#question');
const questionLabel = document.querySelector('#question-label');
const scoreLabel = document.querySelector('#score-label');
const progressBar = document.querySelector('#progress-bar');
const answerForm = document.querySelector('#answer-form');
const answerInput = document.querySelector('#answer');
const feedback = document.querySelector('#feedback');
const finalScore = document.querySelector('#final-score');
const resultMessage = document.querySelector('#result-message');
const restartButton = document.querySelector('#restart-button');

let currentQuestion = 1;
let score = 0;
let currentAnswer = 7;

function randomDigit() {
  return Math.floor(Math.random() * 10);
}

function makeQuestion() {
  const isAddition = Math.random() < 0.5;
  let first = randomDigit();
  let second = randomDigit();

  if (!isAddition && second > first) [first, second] = [second, first];
  currentAnswer = isAddition ? first + second : first - second;
  question.textContent = `${first} ${isAddition ? '+' : '−'} ${second} =`;
}

function updateProgress() {
  questionLabel.textContent = `Question ${currentQuestion} of ${TOTAL_QUESTIONS}`;
  scoreLabel.textContent = `${score} correct`;
  progressBar.style.width = `${(currentQuestion / TOTAL_QUESTIONS) * 100}%`;
}

function startQuiz() {
  currentQuestion = 1;
  score = 0;
  quizScreen.classList.remove('hidden');
  endScreen.classList.add('hidden');
  feedback.textContent = '';
  feedback.className = 'feedback';
  updateProgress();
  makeQuestion();
  answerInput.value = '';
  answerInput.focus();
}

function finishQuiz() {
  quizScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');
  finalScore.textContent = score;
  resultMessage.textContent = score === TOTAL_QUESTIONS
    ? 'A perfect sprint. Brilliant work!'
    : score >= 7
      ? 'Great work — your number sense is growing.'
      : 'Keep practising — every round makes you sharper.';
  restartButton.focus();
}

answerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const guess = Number(answerInput.value);
  if (guess === currentAnswer) {
    score += 1;
    feedback.textContent = 'Correct! Nice one.';
    feedback.className = 'feedback';
  } else {
    feedback.textContent = `Not quite — the answer was ${currentAnswer}.`;
    feedback.className = 'feedback incorrect';
  }

  if (currentQuestion === TOTAL_QUESTIONS) {
    setTimeout(finishQuiz, 650);
    return;
  }

  currentQuestion += 1;
  updateProgress();
  setTimeout(() => {
    makeQuestion();
    answerInput.value = '';
    answerInput.focus();
  }, 650);
});

restartButton.addEventListener('click', startQuiz);
startQuiz();
