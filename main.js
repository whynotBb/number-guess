// 유저는 숫자를 입력할 수 있다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 작으면 Up! 이라고 알려준다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 크면 Down! 이라고 알려준다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자와 일치하다면 That’s right이라고 뜨고 게임이 종료된다.
// 유저는 총 5번의 기회가 있다
// 게임이 종료되면 버튼은 비활성화된다
// 리셋버튼을 누르면 게임이 초기화된다
// 유저가 1~100범위 밖에 숫자를 입력할시에 경고메세지가 뜬다
// 유저가 이미 입력한 값을 또 입력할 시에 경고메세지가 뜬다
// 반응형 UI

let comNum = 0;
let chances = 5;
let userNum = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let playBtn = document.getElementById("play-button");
let resetBtn = document.getElementById("reset-button");
let history = [];
let gameOver = false;

randomNum();
playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userNum.addEventListener("focus", function () {
  userNum.value = "";
  // userNum.placeholder = "";
});

function randomNum() {
  comNum = Math.floor(Math.random() * 100) + 1;
  console.log(`정답은 ${comNum}`);
}
function play() {
  let userValue = userNum.value;
  if (userValue < 0 || userValue > 100) {
    resultArea.textContent = "1~100 사이의 숫자를 입력 해 주세요!";
    return;
  }
  if (userValue === "") {
    resultArea.textContent = "숫자를 입력 해 주세요";
    return;
  }
  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자 입니다.";
    return;
  }

  chances--;
  if (chances < 1) {
    chanceArea.textContent = "남은 기회가 없습니다.";
    playBtn.disabled = true;
    return;
  } else {
    chanceArea.textContent = `남은 찬스 : ${chances} 번`;
  }

  if (userValue > comNum) {
    resultArea.textContent = "DOWN !";
  } else if (userValue < comNum) {
    resultArea.textContent = "UP !";
  } else {
    resultArea.textContent = "That's right!";
    playBtn.disabled = true;
  }
  history.push(userValue);
}
function reset() {
  randomNum();
  chances = 5;
  playBtn.disabled = false;
  resultArea.textContent = "result";
  chanceArea.textContent = `남은 찬스 : ${chances} 번`;
  history = [];
}
