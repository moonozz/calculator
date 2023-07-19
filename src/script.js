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

const currentDisplay = document.querySelector(".current-display"); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const currentHistory = document.querySelector(".current-history");
const operateHistoryDiv = document.querySelector(".history");

let firstNum, operatorBtn, previousKey, previousNum;

let clickHistory;
let oldDisplay = "0";
// let oldarr = oldDisplay.split(";");

buttons.addEventListener("click", function (e) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = e.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드는 수정하지 마세요.

  const historySpan = document.createElement("span");
  historySpan.classList.add("old-history");
  const historySpans = operateHistoryDiv.querySelectorAll("span");

  if (target.matches("button")) {
    if (action === "number") {
      if (currentDisplay.textContent === "0") {
        currentDisplay.textContent = buttonContent;
        //currentHistory 에 클릭한 number 버튼이 보이게 하고
        currentHistory.textContent = buttonContent;
        // clickHistory 에 현재 currentHistory 값 저장
        clickHistory = currentHistory.textContent;
      } else if (previousKey === "operator") {
        currentDisplay.textContent = buttonContent;
        // 만약 이전 키가 operator라면. currentHistory 에 클릭한 number 값을 추가하고
        currentHistory.textContent =
          currentHistory.textContent + " " + buttonContent;
        // clickHistory 에 현재 currentHistory 값 저장
        clickHistory = currentHistory.textContent;
      } else {
        currentDisplay.textContent = currentDisplay.textContent + buttonContent;
        currentHistory.textContent = currentHistory.textContent + buttonContent;
        clickHistory = currentHistory.textContent;
      }

      if (previousKey === "calculate") {
        currentDisplay.textContent = buttonContent;
        //currentHistory 에 클릭한 number 버튼이 보이게 하고
        currentHistory.textContent = buttonContent;
        // clickHistory 에 현재 currentHistory 값 저장
        clickHistory = currentHistory.textContent;
      }

      // if (firstNum === currentDisplay.textContent && previousKey === 'operator') {
      //     currentHistory.textContent = clickHistory + buttonContent;
      //     clickHistory = currentHistory.textContent;
      // }

      // previousKey 를 바꿔줘야 위 if 문에 걸리지 않아서 previousNum 숫자 계속 입력할 수 있어
      previousKey = "number";
      // console.log("숫자 " + buttonContent + " 버튼");
      // console.log(clickHistory);
    }

    if (action === "operator") {
      // 연산자가 눌렸다는 사실 기억
      operatorBtn = buttonContent;
      // 연산자 버튼이 눌리면 화면에 있는 숫자를 기억해야 돼
      firstNum = currentDisplay.textContent;

      if (clickHistory && previousKey === "operator") {
        // 공백을 기준으로 배열만들고, 마지막 operator 제외하고 다시 조합하기
        const operatorDel = currentHistory.textContent
          .split(" ")
          .slice(0, -1)
          .join(" ");
        currentHistory.textContent = operatorDel + " " + buttonContent;
        clickHistory = currentHistory.textContent;
      } else if (clickHistory || previousKey === "number") {
        // 만약 clickHistory 있거나 이전키가 number면 currentHistory 에 클릭한 operator 추가
        currentHistory.textContent = clickHistory + " " + buttonContent;
        // clickHistory 에 현재 currentHistory 값 저장
        clickHistory = currentHistory.textContent;
      }
      // else {
      //   // 이전에 입력된 값이 없는 경우
      //   currentHistory.textContent = "";
      //   clickHistory = currentHistory.textContent;
      // }
      previousKey = "operator";
    }

    if (action === "decimal") {
      if (currentDisplay.textContent.includes(".") === false) {
        currentDisplay.textContent = currentDisplay.textContent + ".";
        currentHistory.textContent = currentHistory.textContent + ".";
      }
    }

    if (action === "clear") {
      currentDisplay.textContent = "0";
      currentHistory.textContent = "";
      firstNum = undefined;
      previousNum = undefined;
      operatorBtn = undefined;
      previousKey = "clear";

      clickHistory = undefined;

      historySpans.forEach((el) => {
        operateHistoryDiv.removeChild(el);
      });

      console.log("ac");
    }

    if (action === "calculate") {
      // 연산자 버튼이 눌렸을때 작동하게
      if (operatorBtn) {
        // 현재 입력되어 있는 숫자를 previousNum에 넣고
        previousNum = currentDisplay.textContent;
        currentDisplay.textContent = calculate(
          firstNum,
          operatorBtn,
          previousNum
        );
        previousKey = "calculate";

        // currentHistory 에 clickHistory 와 클릭한 calculate 버튼 추가하고
        currentHistory.textContent = clickHistory + " " + buttonContent;
        // clickHistory 에 현재 currentHistory 값 저장
        clickHistory = currentHistory.textContent;
      }

      if (operatorBtn && previousKey === "calculate") {
        // operateHistoryDiv 에 clickHistory 와 currentDisplay 있는 계산 결과값 넣기
        historySpan.textContent =
          clickHistory + " " + currentDisplay.textContent;
        operateHistoryDiv.prepend(historySpan);
        oldDisplay = operateHistoryDiv.textContent;
        console.log(currentDisplay);
      }

      console.log(currentDisplay);
      console.log(currentDisplay.textContent);
      console.log(`clickHistory`, clickHistory);
    }
  }
});
