const calculator = document.querySelector(".calculator"); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector(".btn"); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector(".calculator__operend--left"); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector(".calculator__operator"); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector(".calculator__operend--right"); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector(".calculator__result"); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

function calculate(n1, operator, n2) {
  let result = 0;

  if (operator === "+") {
    result = Number(n1) + Number(n2);
  } else if (operator === "−") {
    result = Number(n1) - Number(n2);
  } else if (operator === "×") {
    result = Number(n1) * Number(n2);
  } else if (operator === "÷") {
    result = Number(n1) / Number(n2);
  }

  return String(result);
}

const display = document.querySelector(".current-display"); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const current_display = document.querySelector(".current-history");
const old_display = document.querySelector(".history");
let firstNum, operatorForAdvanced, previousKey, previousNum;
let currentHistory = "0";

let historyArea = document.getElementsByClassName("history");
let new_spanTag = document.createElement("span");
new_spanTag.setAttribute("class", "old-history");

let oldDisplay = "0";
let oldarr = oldDisplay.split(";");

buttons.addEventListener("click", function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드는 수정하지 마세요.

  if (target.matches("button")) {
    if (action === "number") {
      if (display.textContent === "0") {
        display.textContent = buttonContent;
        //current_display 에 클릭한 number 버튼이 보이게 하고
        current_display.textContent = buttonContent;
        // currentHistory 에 현재 current_display 값 저장
        currentHistory = current_display.textContent;
      } else if (previousKey === "operator") {
        display.textContent = buttonContent;
        // 만약 이전 키가 operator라면. current_display 에 클릭한 number 값을 추가하고
        current_display.textContent =
          current_display.textContent + " " + buttonContent;
        // currentHistory 에 현재 current_display 값 저장
        currentHistory = current_display.textContent;
      } else {
        display.textContent = display.textContent + buttonContent;
        current_display.textContent =
          current_display.textContent + buttonContent;
        currentHistory = current_display.textContent;
      }

      if (previousKey === "calculate") {
        display.textContent = buttonContent;
        //current_display 에 클릭한 number 버튼이 보이게 하고
        current_display.textContent = buttonContent;
        // currentHistory 에 현재 current_display 값 저장
        currentHistory = current_display.textContent;
      }

      // if (firstNum === display.textContent && previousKey === 'operator') {
      //     current_display.textContent = currentHistory + buttonContent;
      //     currentHistory = current_display.textContent;
      // }

      // previousKey 를 바꿔줘야 위 if 문에 걸리지 않아서 previousNum 숫자 계속 입력할 수 있어
      previousKey = "number";
      console.log("숫자 " + buttonContent + " 버튼");
      console.log(currentHistory);
    }

    if (action === "operator") {
      operatorForAdvanced = buttonContent;
      // 연산자 버튼이 눌리면 화면에 있는 숫자를 기억해야 돼
      firstNum = display.textContent;
      // 연산자가 눌렸다는 사실도 기억해야 돼
      previousKey = "operator";

      // 만약 currentHistory가 있고 이전키가 number 라면 current_display 에 클릭한 operator 추가
      if (currentHistory || previousKey === "number") {
        current_display.textContent = currentHistory + " " + buttonContent;
        // currentHistory 에 현재 current_display 값 저장
        currentHistory = current_display.textContent;
      }

      console.log("op");
    }

    if (action === "decimal") {
      if (display.textContent.includes(".") === false) {
        display.textContent = display.textContent + ".";
      }
    }

    if (action === "clear") {
      display.textContent = "0";
      current_display.textContent = "0";
      firstNum = undefined;
      previousNum = undefined;
      operatorForAdvanced = undefined;
      previousKey = "clear";
      console.log("ac");
    }

    if (action === "calculate") {
      // 연산자 버튼이 눌렸을때 작동하게
      if (operatorForAdvanced) {
        // 현재 입력되어 있는 숫자를 previousNum에 넣고
        previousNum = display.textContent;
        display.textContent = calculate(
          firstNum,
          operatorForAdvanced,
          previousNum
        );
        previousKey = "calculate";

        // current_display 에 currentHistory 와 클릭한 calculate 버튼 추가하고
        current_display.textContent = currentHistory + " " + buttonContent;
        // currentHistory 에 현재 current_display 값 저장
        currentHistory = current_display.textContent;

        // old_display 에 currentHistory 와 display에 있는 계산 결과값 넣기
        // old_display.textContent = currentHistory + ' ' + display.textContent + ';';
        // oldDisplay = old_display.textContent;
      }

      if (operatorForAdvanced && previousKey === "calculate") {
        // old_display 에 currentHistory 와 display에 있는 계산 결과값 넣기
        new_spanTag.innerHTML =
          currentHistory + " " + display.textContent + ";";
        old_display.textContent = new_spanTag.innerHTML;
        oldDisplay = old_display.textContent;
        console.log(oldDisplay);
      } else if (oldDisplay) {
        old_display.textContent = old_display.textContent + oldDisplay;
      }
      // else if (firstNum === true && previousKey === 'operator' && previousNum === false) {
      //     display.textContent = calculate(display.textContent, operatorForAdvanced, firstNum);
      //     previousKey = 'calculate'
      // }
    }
  }
});
