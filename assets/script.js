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
