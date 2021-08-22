const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const inputs = document.querySelectorAll("#weight, #height");
const resultBoxe = document.querySelector(".BMIResult");
const statusBoxe = document.querySelector(".BMIStatus");
const normalBoxe = document.querySelector(".BMINormal");
const resultBtn = document.getElementById("btn");
const resultContainer = document.getElementById("result");

let weight = 0;
let height = 0;
let normalHeightHight, normalHeightLow;
let result, weightValid, heightValid, heightSquared;
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
  heightValid = null;
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
  heightSquared = heightValid ** 2;
  firstResult = weight / heightSquared;
  result = Math.round(firstResult * 10) / 10;
  return result;
};

const normalHeight = () => {
  heightSquared = heightValid ** 2;
  normalHeightHightFirst = 24.9 * heightSquared;
  normalHeightHight = Math.round(normalHeightHightFirst);
  normalHeightLowFirst = 18.5 * heightSquared;
  normalHeightLow = Math.round(normalHeightLowFirst);
};

const displayBmi = () => {
  resultBoxe.innerHTML = `
    <h2>${result}</h2>
    `;
  statusBoxe.innerHTML = `
  <p>your weight is in the "${status}" category for your height.</p>
  `;
  normalBoxe.innerHTML = `
  For your height, a normal weight range would be from ${normalHeightLow} kg to ${normalHeightHight} kg.</p>
  `;
  resultContainer.classList.remove("visible");
};

const hideResult = () => resultContainer.classList.add("visible");

const weightInputTake = (value) => {
  weight = value;
  return weight;
};

const heightInputTake = (value) => {
  height = value;
  return height;
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

const heightInputCheck = (value) => {
  if (value < 100 || value > 230) {
    errorDisplay("height", "The height must be between 100 and 230 cm.");
  } else if (!value.match(/^[0-9]+$/i)) {
    errorDisplay("height", "height should only contain numbers");
  } else {
    errorDisplay("height", "", true);
    let valueDiv;
    valueDiv = value / 100;
    heightValid = valueDiv;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "weight":
        weightInputTake(e.target.value);
        break;
      case "height":
        heightInputTake(e.target.value);
        break;
      default:
        null;
    }
  });
});

resultBtn.addEventListener("click", (e) => {
  e.preventDefault();
  weightInputCheck(weight);
  heightInputCheck(height);
  if (heightValid && weightValid) {
    bmiCalc();
    bmiCategory();
    normalHeight();
    displayBmi();
    emptyValid();
  } else {
    if (weightInput.value === "" && heightInput.value === "") {
      emptyValid();
      resetResult();
      hideResult();
      errorDisplay("height", "height cannot be empty");
      errorDisplay("weight", "Weight cannot be empty");
    } else if (weightInput.value === "") {
      emptyValid();
      resetResult();
      hideResult();
      errorDisplay("weight", "Weight cannot be empty");
    } else if (heightInput.value === "") {
      emptyValid();
      resetResult();
      hideResult();
      errorDisplay("height", "height cannot be empty");
    } else {
      emptyValid();
      resetResult();
      hideResult();
    }
  }
});
