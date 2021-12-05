var currentQuestionNum;

function startQuiz() {
  countdown();
  showByElementId('question-1');
  hideByElementId('start');
  currentQuestionNum = 1;
}

function submitAnswer(questionNum, selectedAnswer) {
  const answers = ['alerts', 'parenthesis', 'quotes', 'all of the above', 'console.log']
  const correctAnswer = answers[questionNum - 1]

  if (selectedAnswer === correctAnswer) {
    // ...
    console.log('correct');
  } else {
    // ...
    console.log('wrong');
  }

  if (questionNum > 4) {
    showByElementId('results');
    hideByElementId('question-' + questionNum);
  } else {
    showNextQuestion(questionNum);
  }
}

function showNextQuestion(currentQuestionNum) {
  const nextQuestionNum = currentQuestionNum + 1;
  currentQuestionNum = nextQuestionNum;

  showByElementId('question-' + nextQuestionNum);
  hideByElementId('question-' + currentQuestionNum);
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

  var timeLeft = 5;

  setInterval(function tick() {
    // Decrement `timeLeft` by 1
    timeLeft--;

    // Set the `textContent` of `timerEl` to show the remaining seconds
    secondsLeftElement.innerText = timeLeft;

    // If timeLeft is less than 1
    if (timeLeft < 1) {
      hideByElementId('question-' + currentQuestionNum);
      showByElementId('results');
    }
  }, 1000);
}

