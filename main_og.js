//랜덤번호 지정
//유저가 번호 입력 -> go 버튼 클릭
//만약 유저가 랜덤번호를 맞추면 -> 정답!
//랜덤번호 < 유저번호 -> Down!
//랜덤번호 > 유저번호 -> Up!
//Reset 버튼 클릭 시 게임 리셋
//5번의 기회 소진 시 게임 종료 -> 버튼 비활성화
//유저가 1~100범위 밖의 숫자를 입력하면 알려준다. 기회 소진 되지 않음
//유저가 이미 입력한 숫자 입력 시 알려줌, 기회 소진 X

let computerNum = 0;
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let chances = 5;
let gameOver = false;
let history = [];

playButton.addEventListener("click", play);
//클릭 했을때 실행 되려면,()는 넣어주지 않는다,-> 변수처럼 넘긴다.
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}
function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100 사이 숫자를 입력해주세요";
    return;
  }
  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자";
    return;
  }

  chances--;
  chanceArea.textContent = `남은기회 : ${chances} 번`;
  if (userValue < computerNum) {
    resultArea.textContent = "up";
  } else if (userValue > computerNum) {
    resultArea.textContent = "down";
  } else {
    resultArea.textContent = "right";
    gameOver = true;
  }

  history.push(userValue);
  console.log(history);

  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver === true) {
    playButton.disabled = true;
  }
}

function reset() {
  //user input clear
  userInput.value = "";
  //새로운번호 생성
  pickRandomNum();
  resultArea.textContent = "";
  gameOver = false;
  chances = 5;
  history = [];
}

pickRandomNum();
