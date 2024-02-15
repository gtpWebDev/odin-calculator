

// Initialisation

const maxDigitsInDisplay = 9
const decimalAccuracy = 8

let calculatorData
initialiseCalculatorData()
updateDisplay()

// Add button functionality in the DOM

for (let i=0; i<=9; i++) {
  let strI = i.toString()
  buttonId = `#number${strI}Button`
  let numberButton = document.querySelector(buttonId)
  numberButton.addEventListener("click", () => {
    onNumberPress(strI);
    updateDisplay()
  })
}

let clearButton = document.querySelector("#clearButton")
clearButton.addEventListener("click", onClearPress )

let subtractButton = document.querySelector("#subtractButton")
subtractButton.addEventListener("click", () => {
  onOperatorPress("-")
  updateDisplay()
})

let addButton = document.querySelector("#addButton")
addButton.addEventListener("click", () => {
  onOperatorPress("+")
  updateDisplay()
})

let divideButton = document.querySelector("#divideButton")
divideButton.addEventListener("click", () => {
  onOperatorPress("/")
  updateDisplay()
})

let multiplyButton = document.querySelector("#multiplyButton")
multiplyButton.addEventListener("click", () => {
  onOperatorPress("*")
  updateDisplay()
})


let equalButton = document.querySelector("#equalButton")
equalButton.addEventListener("click", () => {
  onEqualsPress()
  updateDisplay()
})

let decimalButton = document.querySelector("#decimalButton")
decimalButton.addEventListener("click", () => {
  onDecimalPress()
  updateDisplay()
})



function initialiseCalculatorData() {
  calculatorData = {
    storedNum: "0",
    activeOperator: "",
    newString: "",
    displayString: "0"
  }
}

function updateDisplay() { // note actual calculations retain decimals, display limited to 9 digits
  let screenDisplay = document.querySelector("#screen")
  screenDisplay.textContent = calculatorData.displayString.slice(0,maxDigitsInDisplay)
  let activeOperatorDisplay = document.querySelector("#activeOperator")
  activeOperatorDisplay.textContent = calculatorData.activeOperator

}



function onNumberPress(keyPress) {

  console.log("Register num press")

  if ((keyPress ==="0" && calculatorData.displayString === "0") ||
      calculatorData.newString.length >= maxDigitsInDisplay
  ) {
    // leading zero and attempted 10th digit ignored
  } else {
    calculatorData.newString += keyPress
    calculatorData.displayString = calculatorData.newString
  }

}

function onDecimalPress() {

  if (calculatorData.newString.indexOf(".") >= 0 || calculatorData.displayString.length >= maxDigitsInDisplay) {
    // decimal already used or attempted after 9th digit - ignored
  } else {
      calculatorData.newString === "" ? calculatorData.newString += "0." : calculatorData.newString += "."
      calculatorData.displayString = calculatorData.newString
  }

}


function onOperatorPress(keyPress) {

  let newNumber = parseFloat(calculatorData.newString)

  if (calculatorData.newString === "") { // no new number yet, user changes mind
    calculatorData.activeOperator = keyPress

  } else {

    if (calculatorData.activeOperator === "") { // first operation
      calculatorData.storedNum = newNumber;

    } else { // second operation
      calculatorData.storedNum = operate(calculatorData.storedNum,calculatorData.activeOperator,newNumber)
    }

    calculatorData.activeOperator = keyPress
    calculatorData.newString = ""
    calculatorData.displayString = calculatorData.storedNum.toString()

  }

}


function onEqualsPress() {

  let newNumber = parseFloat(calculatorData.newString)

  if (calculatorData.newString === "") { // no new number yet, user changes mind
    
    // do nothing

  } else {

    if (calculatorData.activeOperator === "") { // first operation
      calculatorData.storedNum = newNumber;

    } else { // second operation
      calculatorData.storedNum = operate(calculatorData.storedNum,calculatorData.activeOperator,newNumber)
      
    }
        
    calculatorData.newString = ""
    calculatorData.displayString = calculatorData.storedNum.toString()

  }

  calculatorData.activeOperator = ""

}



function onClearPress() {
  initialiseCalculatorData()
  updateDisplay()
}


// Main operate function to be called from each type of operator

function operate(num1,operator,num2) {

  let calcOutput
  switch (operator) {
    case "+":
      return add(num1,num2);
    case "-":
      return subtract(num1,num2);
    case "*":
      return multiply(num1,num2);
    case "/":
      return divide(num1,num2);
    default:
      return "Error"
  }

}

// individual calculator functions

function add(num1,num2) {
  return num1 + num2
}

function subtract(num1,num2) {
  return num1 - num2
}

function multiply(num1,num2) {
  return num1 * num2
}

function divide(num1,num2) {
  if (num2 !== 0) {
    return num1 / num2
  } else {
    return "Error"
  }
}
