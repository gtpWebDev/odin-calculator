




let firstNumber = 3
let operator = "+"
let secondNumber = 5

printOperationInConsole(3,"+",5)
printOperationInConsole(3,"-",4)


function printOperationInConsole(firstNumber,operator,secondNumber) {
  let quickCalc = operate(firstNumber,operator,secondNumber)
  console.log(`${firstNumber} ${operator} ${secondNumber} = ${quickCalc}`)
  
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



// calculator functions

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
