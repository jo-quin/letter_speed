document.getElementById('start').onclick = startGame;
document.getElementById('restart').onclick = restartGame;

var currentLetter = null;
var seconds = 5;
var points = 0;

function startGame() {
  document.onkeydown = checkInput;
  hideStartButton();
  runTimer(seconds);
  changeLetter();
}

function restartGame() {
  hideScreenTimeOver();
  document.getElementById('screen-game').style.display = 'block';
  points = 0;
  startGame();
}

function endGame() {
  document.getElementById('screen-game').style.display = 'none';
  document.getElementById('letter').classList.remove('correct', 'wrong');
  document.getElementById('screen-time-over').style.display = 'block';
  document.getElementById('score').innerHTML = `Your score: ${points}`;
}

function checkInput(e) {
  if (e.key == currentLetter) {
    addPoint();
    outputColor('correct');
  } else {
    subtractPoint();
    outputColor('wrong');
  }
  changeLetter();
}

function addPoint() {
  points++;
}

function subtractPoint() {
  if (points !== 0) {
    points--;
  }
}

function changeLetter() {
  currentLetter = newRandomLetter();
  document.getElementById("letter").innerHTML = currentLetter;
}

function newRandomLetter() {
  return String.fromCharCode(getRandomArbitrary(97, 123));
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function outputColor(output) {
  document.getElementById('letter').classList.remove('correct', 'wrong');

  // the next line triggers a reflow
  // this is necessary to reset the animation
  void document.getElementById('letter').offsetWidth;

  document.getElementById('letter').classList.add(output);
}

function hideStartButton() {
  document.getElementById('start').disabled = true;
  document.getElementById('start').style.display = 'none';
}

function showStartButton() {
  document.getElementById('start').disabled = false;
  document.getElementById('start').style.display = 'block';
}

function hideScreenTimeOver() {
  document.getElementById('screen-time-over').style.display = 'none';
}

function runTimer(s) {
  updateTimer(s);

  var timer = setInterval(function() {
    s--;
    updateTimer(s);
    if (s == '0') {
      stopTimer(timer);
    }
  }, 1000);
}

function updateTimer(s) {
  document.getElementById("timer").innerHTML = s;
}

function stopTimer(t) {
  clearInterval(t);
  endGame();
}
