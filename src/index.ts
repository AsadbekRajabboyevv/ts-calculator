const display = document.querySelector(".display") as HTMLDivElement;
const buttons = document.querySelectorAll(".btn");

let currentInput: string = "";
let operator: string = "";
let previousInput: string = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = (button as HTMLElement).textContent?.trim() || "";

        if (!display) return;

        if (!isNaN(Number(value)) || value === ".") {
            if (value === "." && currentInput.includes(".")) return;
            currentInput += value;
            updateDisplay();
        } else if (["+", "−", "×", "÷", "%"].includes(value)) {
            if (currentInput === "" && previousInput === "") return;
            if (currentInput !== "" && previousInput !== "") {
                calculate();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = "";
            updateDisplay();
        } else if (value === "=") {
            // Hisoblash
            calculate();
            updateDisplay();
        } else if (value === "C") {
            // Tozalash
            clearAll();
        } else if (value === "+/-") {
            // Manfiy son
            if (currentInput !== "") {
                currentInput = currentInput.startsWith("-") ? currentInput.slice(1) : "-" + currentInput;
                updateDisplay();
            }
        }
    });
});

function updateDisplay() {
    display.textContent = currentInput || previousInput || "0";
}

function calculate() {
    if (previousInput === "" || currentInput === "" || operator === "") return;

    let num1 = parseFloat(previousInput);
    let num2 = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "−":
            result = num1 - num2;
            break;
        case "×":
            result = num1 * num2;
            break;
        case "÷":
            result = num2 !== 0 ? num1 / num2 : NaN;
            break;
        case "%":
            result = num1 % num2;
            break;
    }

    currentInput = result.toString();
    previousInput = "";
    operator = "";
}

function clearAll() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay();
}

updateDisplay();
