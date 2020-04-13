document.getElementById('start').onclick = startCountdown;
document.getElementById('restart').onclick = restartGame;

var currentLetter = null;
var countdownSeconds = 3;
var seconds = 60;
var points = 0;

function startCountdown() {
  hideCursor();
  hideStartButton();
  showScreenCountdown();
  startGameAfterCountdown(countdownSeconds);
}

function startGameAfterCountdown(c) {
  updateCountdown(c);
  var timer = setInterval(function() {
    c--;
    updateCountdown(c);
    if (c == '0') {
      clearInterval(timer);
      hideScreenCountdown();
      startGame();
    }
  }, 1000);
}

function startGame() {
  runTimer(seconds);
  showScreenGame();
  displayNewLetter();
  document.addEventListener('keydown', checkInput);
}

function endGame() {
  document.removeEventListener('keydown', checkInput);
  hideScreenGame();
  showCursor();
  showScreenTimeOver();
}

function restartGame() {
  hideScreenTimeOver();
  resetPoints();
  startCountdown();
}

function checkInput(e) {
  if (e.key == currentLetter) {
    addPoint();
    outputColor('correct');
  } else {
    outputColor('wrong');
  }
  displayNewLetter();
}

function displayNewLetter() {
  currentLetter = newRandomLetter();
  document.getElementById("letter").innerHTML = currentLetter;
}

function addPoint() {
  points++;
}

function outputColor(output) {
  document.getElementById('letter').classList.remove('correct', 'wrong');

  // the next line triggers a reflow
  // this is necessary to reset the animation
  void document.getElementById('letter').offsetWidth;

  document.getElementById('letter').classList.add(output);
}

function newRandomLetter() {
  return String.fromCharCode(getRandomCharacter(97, 123));
}

function getRandomCharacter(min, max) {
  return Math.random() * (max - min) + min;
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

function showScreenTimeOver() {
  document.getElementById('screen-time-over').style.display = 'block';
  document.getElementById('score').innerHTML = `Your score: ${points}`;
}

function hideScreenGame() {
  document.getElementById('screen-game').style.display = 'none';
  document.getElementById('letter').classList.remove('correct', 'wrong');
}

function showScreenGame() {
  document.getElementById('screen-game').style.display = 'block';
}

function hideScreenCountdown() {
  document.getElementById('countdown').style.display = 'none';
}

function showScreenCountdown() {
  document.getElementById('countdown').style.display = 'block';
}

function hideCursor() {
  document.getElementById('main-div').classList.add('hide-cursor');
}

function showCursor() {
  document.getElementById('main-div').classList.remove('hide-cursor');
}

function resetPoints() {
  points = 0;
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

function updateCountdown(c) {
  document.getElementById('countdown').innerHTML = c;
}
