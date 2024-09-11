// Get all the necessary elements
const resultDisplay = document.querySelector('.result span');
const buttons = Array.from(document.querySelectorAll('.buttons button'));

// Variables to store values and operators
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

// Function to update the display
function updateDisplay(value) {
    resultDisplay.textContent = value;
}

// Function to handle number input
function handleNumber(value) {
    if (currentInput === '0' && value === '0') {
        return; // Prevent multiple leading zeros
    } else if (shouldResetDisplay) {
        currentInput = value;
        shouldResetDisplay = false;
    } else {
        currentInput = currentInput === '0' ? value : currentInput + value; // Allow 0 to be typed
    }
    updateDisplay(currentInput);
}

// Function to handle operator input
function handleOperator(op) {
    if (operation !== null) {
        calculate();
    }
    previousInput = currentInput;
    operation = op;
    shouldResetDisplay = true;
}

// Function to perform the calculation
function calculate() {
    if (operation === null || shouldResetDisplay) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case 'x':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operation = null;
    updateDisplay(currentInput);
}

// Function to clear the calculator
function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay(currentInput);
}

// Function to toggle negative/positive
function toggleNegative() {
    if (currentInput !== '0') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }
}

// Function to handle the decimal point
function addDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
}

// Add event listeners to the buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent || '';

        if (button.classList.contains('numbers')) {
            handleNumber(buttonValue);
        } else if (button.classList.contains('sign')) {
            handleOperator(buttonValue);
        } else if (button.classList.contains('equal')) {
            calculate();
        } else if (button.classList.contains('clear')) {
            clearCalculator();
        } else if (button.classList.contains('negative')) {
            toggleNegative();
        } else if (button.classList.contains('percent')) {
            handleOperator('%');
        } else if (button.classList.contains('comma')) {
            addDecimal();
        }
    });
});
