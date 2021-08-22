const inputs = document.querySelectorAll("#weight, #size");
const resultBoxe = document.querySelector(".BMIResult");
const resultBtn = document.getElementById("btn");
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
  let firstResult;
  sizeSquared = size ** 2;
  firstResult = weight / sizeSquared;
  result = Math.round(firstResult * 10) / 10;
  return result;
};

const displayBmi = () => {
  const para = document.getElementById("paraResult");
  resultBoxe.innerHTML = `
    <h2>${result}</h2>
    `;
  para.classList.remove("paraVisible");
};

const weightInputCheck = (value) => {
  if (value < 10) {
    console.log("test1");
  } else if (!value.match(/^[1-9]\d*$/i)) {
    console.log("test2");
  } else {
    console.log("test3");
    weight = value;
  }
};

const sizeInputCheck = (value) => {
  if (value < 10) {
    console.log("test1");
  } else if (!value.match(/^[1-9]\d*$/i)) {
    console.log("test2");
  } else {
    let valueDiv;
    valueDiv = value / 100;
    size = valueDiv;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "weight":
        weightInputCheck(e.target.value);
        break;
      case "size":
        sizeInputCheck(e.target.value);
        break;
      default:
        null;
    }
  });
});

resultBtn.addEventListener("click", (e) => {
  e.preventDefault();
  bmiCalc();
  displayBmi();
});
