const questionField = document.querySelector('.question');
const answersRow = document.querySelector('.ans-row');
const answerButtons = document.querySelectorAll('.answer');
const startBtn = document.getElementById('startBtn');
const startScreen = document.querySelector('.start-screen');
const gameScreen = document.querySelector('.game');
let questions = [];
let questionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
const TOTAL_QUESTIONS = 10;
function generateQuestions() {
  questions = [];
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const correct = a + b;
    let answers = [correct];
    while (answers.length < 5) {
      const wrong = correct + Math.floor(Math.random() * 10) - 5;
      if (!answers.includes(wrong) && wrong > 0) {
        answers.push(wrong);
      }
    }
    answers = shuffle(answers);
    questions.push({
      question: `${a} + ${b}`,
      answers: answers,
      correct: correct,
    });
  }
}

/* ---------- перемешивание ---------- */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

/* ---------- показ вопроса ---------- */
function showQuestion() {
  if (questionIndex >= questions.length) {
    const percent = Math.round((correctAnswers / TOTAL_QUESTIONS) * 100);

    questionField.innerHTML = `
      <h2>Игра окончена</h2>
      <p>✅ Правильных: ${correctAnswers}</p>
      <p>❌ Неправильных: ${wrongAnswers}</p>
      <p>🏆 Точность: ${percent}%</p>
      <button id="restartBtn">Играть снова</button>
    `;

    answersRow.style.display = 'none';

    document
      .getElementById('restartBtn')
      .addEventListener('click', restartGame);

    return;
  }

  const q = questions[questionIndex];

  questionField.textContent = `Вопрос ${questionIndex + 1} / ${TOTAL_QUESTIONS}: ${q.question}`;

  answerButtons.forEach((btn, i) => {
    btn.textContent = q.answers[i];
    btn.classList.remove('correct', 'wrong');
  });
}

/* ---------- клик по ответу ---------- */
answersRow.addEventListener('click', (e) => {
  if (!e.target.classList.contains('answer')) return;

  const value = Number(e.target.textContent);
  const correct = questions[questionIndex].correct;

  if (value === correct) {
    e.target.classList.add('correct');
    correctAnswers++;
  } else {
    e.target.classList.add('wrong');
    wrongAnswers++;
  }

  setTimeout(() => {
    questionIndex++;
    showQuestion();
  }, 700);
});

/* ---------- старт игры ---------- */

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'flex';

  startGame();
});

function startGame() {
  questionIndex = 0;
  correctAnswers = 0;
  wrongAnswers = 0;

  generateQuestions();

  answersRow.style.display = 'flex';

  showQuestion();
}

/* ---------- перезапуск ---------- */

function restartGame() {
  startGame();
}
