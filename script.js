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
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
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
    let computation // it will be the result of our compute function
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

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

// creating some constant variables
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//make the variables to operate on calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => { //take the number and display it
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => { //alows to use the operations
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => { //makes the equal button to function
 calculator.compute()
 calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => { //makes AC to function
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => { //makes DEL button to function
  calculator.delete()
  calculator.updateDisplay()
})
