/*

3 elements:

All "numbers" to be dealt with as strings until operator applied

1. storedNum -  a number previously calculated using an operator,
2. newString - the number input as a string, currently being added to the display
3. operator -   operator to apply on press to the storedNum and newString
2. displayString - a separate variable to handle precisely what should be displayed
                as per the nuances of an olde worle calculator

Note, as long as storedNum and newString are carefully controlled on operators,
pressing numbers will always simply add to newString

Scenario:
Press 1 - append to newString = 1; displayString = newString
Press 2 - append to newString = 12; displayString = newString
Press 3 - append to newString = 123; displayString = newString

Press "+"" - storedNum undefined: storedNum = newString; newString = ""; displayString = storedNum (simplicity)

Press 4 - append to newString = "4"; displayString = newString
Press 5 - append to newString = "45"; displayString = newString
Press 6 - append to newString = "456"; displayString = newString

Press "*" - storedNum defined: storedNum = storedNum*newString; newString=""; displayString = storedNum

Concnlude on number press:
  - append number to newString and update displayString to newString

  Conclude on operator press:
  - if storedNum undefined: storedNum = newString; newString = ""; displayString = storedNum
  - if storedNum defined: storedNum = storedNum op newString; newString = ""; displayString = storedNum

*/

// create a 5(width) x 4(height) grid of dumb buttons, to be assigned later

/*
let buttonContainer = document.querySelector(".buttonsContainer")

for (let i=0; i<4; i++) {

  let buttonRow = document.createElement("div")
  buttonRow.setAttribute("class","buttonRow")
  buttonContainer.appendChild(buttonRow)

  for (let j=0; j<5; j++) {
    let dumbButton = document.createElement("div")
    dumbButton.setAttribute("class","dumbButton")
    buttonRow.appendChild(dumbButton)
  }
}
*/








let calculatorData = {
  storedNum: null,
  operator: null,
  newString: "",
  displayString: ""
}



testScenario()

function testScenario() {

  let testArray = [
    {type: "number", keyPress: "1"},
    {type: "number", keyPress: "2"},
    {type: "operator", keyPress: "+"},
    {type: "number", keyPress: "3"},
    {type: "number", keyPress: "4"},
    {type: "operator", keyPress: "*"},
    {type: "number", keyPress: "1"},
    {type: "number", keyPress: "5"},
    {type: "operator", keyPress: "-"},
  ]

  testArray.forEach( (element) => {
    if (element.type === "number") {
      calculatorData = onNumberPress(element.keyPress,calculatorData)
    } else if (element.type === "operator") {
      calculatorData = onOperatorPress(element.keyPress,calculatorData)
    }
    console.table(calculatorData)
  })

}



function onNumberPress(keyPress,calculatorData) {

  // Append number to newString and update displayString to newString
  calculatorData.newString += keyPress
  calculatorData.displayString = calculatorData.newString
  return calculatorData

}

function onOperatorPress(keyPress,calculatorData) {

  /* 
    If storedNum undefined: storedNum = newString; newString = ""; displayString = storedNum
    If storedNum defined: storedNum = storedNum op newString; newString = ""; displayString = storedNum
  */

  let newNumber = parseFloat(calculatorData.newString)

  if (calculatorData.storedNum === null) {
    calculatorData.storedNum = newNumber;
    
  } else {
    calculatorData.storedNum = operate(calculatorData.storedNum,keyPress,newNumber)
  }
  calculatorData.newString = ""
  calculatorData.displayString = calculatorData.storedNum.toString()
  return calculatorData

}


function operate(num1,operator,num2) {

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
