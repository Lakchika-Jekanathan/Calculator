class Calculator {
    constructor(firstOutputText, secondOutputText) {
        this.firstOutputText = firstOutputText;
        this.secondOutputText = secondOutputText;
        this.clear();
    }

    clear() {
        this.secondOutput = '';
        this.firstOutput = '';
        this.operation = undefined;
    }

    delete() {
        this.secondOutput = this.secondOutput.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.secondOutput.includes('.')) return;
        this.secondOutput += number.toString();
    }

    chooseOperation(operation) {
        if (this.secondOutput === '') return;
        if (this.firstOutput !== '') {
            this.compute();
        }
        this.operation = operation;
        this.firstOutput = this.secondOutput;
        this.secondOutput = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.firstOutput);
        const current = parseFloat(this.secondOutput);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':  // Update this line to match the HTML symbol
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    this.secondOutput = 'Error';
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.secondOutput = computation.toString();
        this.operation = undefined;
        this.firstOutput = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.secondOutputText.innerText = this.getDisplayNumber(this.secondOutput);
        if (this.operation != null) {
            this.firstOutputText.innerText = `${this.getDisplayNumber(this.firstOutput)} ${this.operation}`;
        } else {
            this.firstOutputText.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const firstOutputText = document.querySelector('[data-first-output]');
const secondOutputText = document.querySelector('[data-second-output]');

const calculator = new Calculator(firstOutputText, secondOutputText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});
