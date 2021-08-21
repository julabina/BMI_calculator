const weightInput = document.getElementById("weight");
const sizeInput = document.getElementById("size");
const resultBoxe = document.querySelector(".BMIResult");
let weight, size, result;

const errorDisplay = (tag, message, valid) => {
  const input = document.getElementById(tag);
  const span = document.getElementById(tag + "Span");

  if (!valid) {
    input.classList.add("error");
    span.textContent = message;
  } else {
    input.classList.remove("error");
    span.textContent = message;
  }
};

const bmiCalc = () => {
  sizeSquared = size ** 2;
  result = weight / sizeSquared;
  return result;
};

const displayBmi = () => {
  resultBoxe.innerHTML = `
    <h2>${result}</h2>
    `;
};
