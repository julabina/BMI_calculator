const weightInput = document.getElementById("weight");
const sizeInput = document.getElementById("size");
const inputs = document.querySelectorAll("#weight, #size");
const resultBoxe = document.querySelector(".BMIResult");
const statusBoxe = document.querySelector(".BMIStatus");
const normalBoxe = document.querySelector(".BMINormal");
const resultBtn = document.getElementById("btn");
const resultContainer = document.getElementById("result");

let weight = 0;
let size = 0;
let normalHeightHight, normalHeightLow;
let result, weightValid, sizeValid, sizeSquared;
let status = "";

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

const emptyValid = () => {
  weightValid = null;
  sizeValid = null;
};

const resetResult = () => {
  if (result > 0) {
    result = "";
    displayBmi();
    return result;
  }
};

const bmiCalc = () => {
  let firstResult;
  sizeSquared = sizeValid ** 2;
  firstResult = weight / sizeSquared;
  result = Math.round(firstResult * 10) / 10;
  return result;
};

const normalHeight = () => {
  sizeSquared = sizeValid ** 2;
  normalHeightHightFirst = 24.9 * sizeSquared;
  normalHeightHight = Math.round(normalHeightHightFirst);
  normalHeightLowFirst = 18.5 * sizeSquared;
  normalHeightLow = Math.round(normalHeightLowFirst);
};

const displayBmi = () => {
  resultBoxe.innerHTML = `
    <h2>${result}</h2>
    `;
  statusBoxe.innerHTML = `
  <p>${status}</p>
  `;
  normalBoxe.innerHTML = `
  <p>${normalHeightLow}</p>
  <p>${normalHeightHight}</p>
  `;
  resultContainer.classList.remove("visible");
};

const hideResult = () => resultContainer.classList.add("visible");

const weightInputTake = (value) => {
  weight = value;
  return weight;
};

const sizeInputTake = (value) => {
  size = value;
  return size;
};

const weightInputCheck = (value) => {
  if (value < 20 || value > 230) {
    errorDisplay("weight", "The weight must be between 20 and 230 kg.");
  } else if (!value.match(/^[0-9]+$/i)) {
    errorDisplay("weight", "Weight should only contain numbers.");
  } else {
    errorDisplay("weight", "", true);
    weightValid = value;
  }
};

const bmiCategory = () => {
  if (result > 39.9) {
    status = "Dangerously obese";
  } else if (result < 40 && result > 34.9) {
    status = "Severely obese";
  } else if (result < 35 && result > 29.9) {
    status = "Moderately obese";
  } else if (result < 30 && result > 24.9) {
    status = "Overweight";
  } else if (result < 25 && result > 18.4) {
    status = "Normal";
  } else {
    status = "Underweight";
  }
};

const sizeInputCheck = (value) => {
  if (value < 100 || value > 230) {
    errorDisplay("size", "The size must be between 100 and 230 cm.");
  } else if (!value.match(/^[0-9]+$/i)) {
    errorDisplay("size", "Size should only contain numbers");
  } else {
    errorDisplay("size", "", true);
    let valueDiv;
    valueDiv = value / 100;
    sizeValid = valueDiv;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "weight":
        weightInputTake(e.target.value);
        break;
      case "size":
        sizeInputTake(e.target.value);
        break;
      default:
        null;
    }
  });
});

resultBtn.addEventListener("click", (e) => {
  e.preventDefault();
  weightInputCheck(weight);
  sizeInputCheck(size);
  if (sizeValid && weightValid) {
    bmiCalc();
    bmiCategory();
    normalHeight();
    displayBmi();
    emptyValid();
  } else {
    if (weightInput.value === "" && sizeInput.value === "") {
      emptyValid();
      resetResult();
      hideResult();
      errorDisplay("size", "Size cannot be empty");
      errorDisplay("weight", "Weight cannot be empty");
    } else if (weightInput.value === "") {
      emptyValid();
      resetResult();
      hideResult();
      errorDisplay("weight", "Weight cannot be empty");
    } else if (sizeInput.value === "") {
      emptyValid();
      resetResult();
      hideResult();
      errorDisplay("size", "Size cannot be empty");
    } else {
      emptyValid();
      resetResult();
      hideResult();
    }
  }
});
