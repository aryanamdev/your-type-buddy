let speed = document.getElementById("speed");
let timer = document.getElementById("timer");
let quote = document.getElementById("quote");
let startTyping = document.getElementById("start-typing");
let startBtn = document.getElementById("start-btn");
let userInput = document.getElementById("input");
const url = "https://api.quotable.io/random?minLength=170&maxLength=200";
let mistakes = 0;

const getQuote = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let generatedQuote = data.content;
      //   console.log(generatedQuote);

      let arr = generatedQuote.split("").forEach((element) => {
        let span = document.createElement("span");
        span.innerHTML = element;
        span.classList.add("quoteChar");
        quote.appendChild(span);
      });
    });
  userInput.disabled = true;
  userInput.placeholder = "Click Start Button to start!";
};
const start = () => {
  userInput.disabled = false;

  quote.style.color = "rgb(162, 162, 162)";
  startBtn.style.display = "none";
  startTyping.style.display = "block";
};
const result = () => {
  const spans = document.querySelectorAll(".quoteChar");
  let quoteCharsArr = Array.from(spans);
  let inputCharsArr = userInput.value.split("");

  quoteCharsArr.forEach((charSpan, index) => {
    const inputChar = inputCharsArr[index];

    if (inputChar == null) {
      charSpan.classList.remove("right");
      charSpan.classList.remove("wrong");
    } else if (inputChar == charSpan.innerText) {
      charSpan.classList.add("right");
      charSpan.classList.remove("wrong");
    } else {
      charSpan.classList.add("wrong");
      charSpan.classList.remove("right");
    }
  });
  if (inputCharsArr.length == quoteCharsArr.length) {
    userInput.maxLength = quoteCharsArr.length;

    setTimeout(() => {
      userInput.style.display = "none";
      quote.style.display = "none";
      startTyping.style.fontSize = "4rem";
      startTyping.innerText = "Well Done!";
    }, 2000);
  }
};

window.addEventListener("load", getQuote);
startBtn.addEventListener("click", start);
userInput.addEventListener("input", result);
