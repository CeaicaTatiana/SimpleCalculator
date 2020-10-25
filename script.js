//store the information for the typed numbers and operations
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear() //clear all inputs and set them to the default values
  }
  //define the functions for operations the calculator class can perform
  clear() { //this will clear out different variables
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() { //remove a single number

  }

  appendNumber(number) { //add a number by clicking on it
    if (number === '.' && this.currentOperand.includes('.')) return //alow to add only one '.'
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) { //click one of the operations
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''

  }

  compute() { //take the values inside of the calculator and compute a single value displayed on the output screen
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch(this.operation) {
      case '+':
        computation = prev + current
        break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand
    this.previousOperandTextElement.innerText = this.previousOperand
  }
}

// creating some constant variables
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//make the variables to operate on calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
