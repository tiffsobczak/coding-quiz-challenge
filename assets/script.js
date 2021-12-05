var currentQuestionNum;
var isFinished = false;
var timeLeft = 75;

function startQuiz() {
  countdown();
  showByElementId('question-1');
  hideByElementId('start');
  currentQuestionNum = 1;
  isFinished = false;
}

function submitAnswer(questionNum, selectedAnswer) {
  const answers = ['alerts', 'parenthesis', 'quotes', 'all of the above', 'console.log']
  const correctAnswer = answers[questionNum - 1]

  if (selectedAnswer === correctAnswer) {
    showByElementId('correct');
    hideByElementId('wrong');
  } else {
    timeLeft = timeLeft - 10;
    showByElementId('wrong');
    hideByElementId('correct');
  }

  if (questionNum > 4) {
    finish();
  } else {
    showNextQuestion();
  }
}

function showNextQuestion() {
  hideByElementId('question-' + currentQuestionNum);

  const nextQuestionNum = currentQuestionNum + 1;
  currentQuestionNum = nextQuestionNum;

  showByElementId('question-' + nextQuestionNum);
}

function showByElementId(id) {
  const element = document.getElementById(id);
  element.classList.remove('hide');
}

function hideByElementId(id) {
  const element = document.getElementById(id);
  element.classList.add('hide');
}

// Timer that counts down from 75
function countdown() {
  timeLeft = 75;
  showByElementId('timer');
  const secondsLeftElement = document.getElementById('seconds-left');

  const interval = setInterval(function tick() {
    if (timeLeft < 1 || isFinished === true) {
      clearInterval(interval);
    } else {
      // Decrement `timeLeft` by 1
      timeLeft--;
        
      // Set the `innerText` of `timerEl` to show the remaining seconds
      secondsLeftElement.innerText = timeLeft;

      // If timeLeft is less than 1
      if (timeLeft < 1) {
        finish();
      }
    }
  }, 1000);
}

function finish() {
  showByElementId('results');
  hideByElementId('question-' + currentQuestionNum);
  isFinished = true;

  const scoreElement = document.getElementById('score');
  scoreElement.innerText = timeLeft;
}

function saveScore() {
  hideByElementId('timer');
  const initalsElement = document.getElementById('initals');
  const initals = initalsElement.value;
  const newScore = initals + ' ' + timeLeft;

  let scoresString = localStorage.getItem('scores');
  let scores = [];

  if (scoresString) {
    scores = JSON.parse(scoresString);
  }

  scores.push(newScore);

  const newScoresString = JSON.stringify(scores);

  localStorage.setItem('scores', newScoresString);

  showHighscores();
}

function showHighscores() {
  if (currentQuestionNum) {
    hideByElementId('question-' + currentQuestionNum);
  }
  hideByElementId('results');
  hideByElementId('start');
  hideByElementId('correct');
  hideByElementId('wrong');
  showByElementId('highscores');

  let scoresString = localStorage.getItem('scores');
  let scores = [];

  if (scoresString) {
    scores = JSON.parse(scoresString);
  }

  const listElement = document.getElementById('highscores-list');
  listElement.innerHTML = '';

  for (const score of scores) {
    listElement.innerHTML = listElement.innerHTML + '<div>' + score + '</div>';
  }
}

function clearHighscores() {
  localStorage.removeItem('scores');
  showHighscores();
}

function resumeQuiz() {
  if (currentQuestionNum && !isFinished) {
    showByElementId('question-' + currentQuestionNum);
  } else {
    showByElementId('start');
  }
  hideByElementId('highscores');
}
