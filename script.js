const add = (first, second) => {
	if (first % 1 !== 0 || second % 1 !== 0) {
		return parseFloat(first) + parseFloat(second);
	} else {
		return parseInt(first) + parseInt(second);
	}
};
const subtract = (first, second) => {
	return first - second;
};
const multiply = (first, second) => {
	return first * second;
};
const divide = (first, second) => {
	return first / second;
};
const operate = (first, second, operator) => {
	return operator(first, second);
};

let display = "";
const displayScreen = document.querySelector(".display");

const digitBtns = document.querySelectorAll(".digit");
digitBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		display += e.target.textContent;
		displayScreen.textContent = display;
	});
});

const dotBtn = document.querySelector(".dot");
dotBtn.addEventListener("click", (e) => {
	const dotChar = ".";
	if (displayScreen.textContent.includes(dotChar)) {
		return;
	} else if (!displayScreen.textContent) {
		display = "0.";
		displayScreen.textContent = display;
	} else {
		display += e.target.textContent;
		displayScreen.textContent = display;
	}
});

const backspaceBtn = document.querySelector(".backspace");
backspaceBtn.addEventListener("click", (e) => {
	if (
		(!firstNumber && !operator) ||
		(firstNumber && operator && !secondNumber) ||
		(firstNumber && !operator && !secondNumber)
	) {
		display = display.slice(0, display.length - 1);
		displayScreen.textContent = display;
	}
});

let firstNumber = "";
let secondNumber = "";
let operator = "";

const operatorBtns = document.querySelectorAll(".operator");
operatorBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		if (!firstNumber && !operator && !display) {
			return;
		} else if (!operator) {
			firstNumber = displayScreen.textContent;
			display = "";
			operator = e.target.textContent;
		} else if (firstNumber && operator && !display) {
			operator = e.target.textContent;
		} else if (firstNumber && operator && display) {
			secondNumber = display;
			display = "";
			displayScreen.textContent = evaluate(firstNumber, secondNumber, operator);
			operator = e.target.textContent;
			firstNumber = displayScreen.textContent;
			if (firstNumber === "Error!") {
				firstNumber = "";
				operator = "";
			}
			secondNumber = "";
		}
	});
});

const equalBtn = document.querySelector(".equals");
equalBtn.addEventListener("click", (e) => {
	if (!firstNumber || !display) {
		console.log("No mathematical expression");
		return;
	}
	secondNumber = display;
	displayScreen.textContent = evaluate(firstNumber, secondNumber, operator);
	display = "";
	operator = "";
	firstNumber = displayScreen.textContent;
	secondNumber = "";
});

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", (e) => {
	display = "";
	displayScreen.textContent = "";
	firstNumber = "";
	secondNumber = "";
	operator = "";
});

const digitsString = "1234567890";
const operatorsString = "+-*/";

document.addEventListener("keyup", (e) => {
	if (digitsString.includes(e.key) || operatorsString.includes(e.key) || e.key === 'Backspace' || e.key === 'Enter' ||
	e.key === 'Escape' || e.key === '.') {
		let inactiveKey = document.querySelector(`div[data-key="${e.key}"]`);
		if (inactiveKey.classList.contains("active")) {
			inactiveKey.classList.remove("active");
	}
}
});

document.addEventListener("keydown", (e) => {
	if (digitsString.includes(e.key) || operatorsString.includes(e.key) || e.key === 'Backspace' || e.key === 'Enter' ||
	e.key === 'Escape' || e.key === '.') {
		let activeKey = document.querySelector(`div[data-key="${e.key}"]`);
		activeKey.className += " active";
	}
	if (digitsString.includes(e.key)) {
		display += e.key;
		displayScreen.textContent = display;
	} else if (operatorsString.includes(e.key)) {
		if (!firstNumber && !operator && !display) {
			return;
		} else if (!operator) {
			firstNumber = displayScreen.textContent;
			display = "";
			operator = e.key;
		} else if (firstNumber && operator && !display) {
			operator = e.key;
		} else if (firstNumber && operator && display) {
			secondNumber = display;
			display = "";
			displayScreen.textContent = evaluate(firstNumber, secondNumber, operator);
			operator = e.key;
			firstNumber = displayScreen.textContent;
			if (firstNumber === "Error!") {
				firstNumber = "";
				operator = "";
			}
			secondNumber = "";
		}
	} else if (e.key === "Enter") {
		if (!firstNumber || !display) {
			console.log("No mathematical expression");
			return;
		}
		secondNumber = display;
		displayScreen.textContent = evaluate(firstNumber, secondNumber, operator);
		display = "";
		operator = "";
		firstNumber = displayScreen.textContent;
		secondNumber = "";
	} else if (e.key === "Backspace") {
		if (
			(!firstNumber && !operator) ||
			(firstNumber && operator && !secondNumber) ||
			(firstNumber && !operator && !secondNumber)
		) {
			display = display.slice(0, display.length - 1);
			displayScreen.textContent = display;
		}
	} else if (e.key === ".") {
		if (displayScreen.textContent.includes('.')) {
			return;
		} else if (!displayScreen.textContent) {
			display = "0.";
			displayScreen.textContent = display;
		} else {
			display += e.key;
			displayScreen.textContent = display;
		}
	} else if (e.key === "Escape") {
		display = "";
		displayScreen.textContent = "";
		firstNumber = "";
		secondNumber = "";
		operator = "";
	}
});

const evaluate = (firstNumber, secondNumber, operator) => {
	if (operator === "+") {
		operator = add;
	} else if (operator === "-") {
		operator = subtract;
	} else if (operator === "÷" || operator === "/") {
		operator = divide;
	} else if (operator === "×" || operator === "*") {
		operator = multiply;
	}
	if (operator === divide && secondNumber == 0) {
		return "Error!";
	}
	let temp = operate(firstNumber, secondNumber, operator);
	if (temp.toString().length > 14 && temp % 1 !== 0) {
		temp = parseFloat(temp).toFixed(3);
		window.alert("Number too huge, rounded to 3 decimal places");
		return temp;
	}
	return temp;
};
