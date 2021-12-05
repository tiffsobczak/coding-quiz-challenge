var timerEl=document.getElementbyID('countdown');

function startQuiz() {
  // countdown();
  const startSection = document.getElementById('start');
  startSection.classList.add('hide');

  const firstQuestionSection = document.getElementById('question-1');
  firstQuestionSection.classList.remove('hide');
}

function submitAnswer(questionNum, selectedAnswer) {
  const answers = ['abc', 'def', '...', '...']
  const correctAnswer = answers[questionNum - 1]

  if (selectedAnswer === correctAnswer) {
    // ...
    console.log('correct');
  } else {
    // ...
    console.log('wrong');
  }

  showNextQuestion(questionNum);
}

function showNextQuestion(currentQuestionNum) {
  const nextQuestionNum = currentQuestionNum + 1;

  const currentQuestionSection = document.getElementById('question-' + currentQuestionNum);
  const nextQuestionSection = document.getElementById('question-' + nextQuestionNum);

  currentQuestionSection.classList.add('hide');
  nextQuestionSection.classList.remove('hide');
}

// Timer that counts down from 75
function countdown() {
  var timeLeft = 75;

  // As long as the `timeLeft` is greater than 1
  if (timeLeft > 1) {
    // Set the `textContent` of `timerEl` to show the remaining seconds
    timerEl.textContent = 'time: ' + timeLeft;
    // Decrement `timeLeft` by 1
    timeLeft--;
  } else {
    // Once `timeLeft` gets to 0, set `timerEl` to an empty string
    timerEl.textContent = '';
    // Call the `displayMessage()` function
    displayMessage();
  }
}

