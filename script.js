const add = (first, second) => {
	return parseInt(first) + parseInt(second);
}
const subtract = (first, second) => {
	return first - second
}
const multiply = (first, second) => {
	return first * second
}
const divide = (first, second) => {
	return first / second
}
const operate = (first, second, operator) => {
	return operator(first, second)
}

let display = ''
let displayScreen = document.querySelector('.display');
// displayScreen.addEventListener('change', (e) => {
// 	console.log(e)
	// if (displayScreen.textContent.length > 14) {
	// 	let temp = parseFloat(displayScreen.textContent).toFixed(2);
	// 	console.log(temp);
	// 	displayScreen.textContent = temp; 
// 	}
// })

const digitBtns = document.querySelectorAll('.digit')
digitBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		display += e.target.textContent;
		displayScreen.textContent = display;
		// console.log(display);
	})
})

let firstNumber = '';
let secondNumber = '';
let operator = '';

const operatorBtns = document.querySelectorAll('.operator')
operatorBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		if (!operator) {
			firstNumber = display;
			display = '';
			operator = e.target.textContent;
		} else if (firstNumber && operator && !display) {
			operator = e.target.textContent;
			// console.log(operator);
		} else if (firstNumber && operator && display) {
			secondNumber = display;
			// console.log(operator)
			// console.log(secondNumber)
			display = '';
			displayScreen.textContent = evaluate(firstNumber, secondNumber, operator);
			operator = e.target.textContent;
			firstNumber = displayScreen.textContent;
			secondNumber = '';
		}
	})
})

const equalBtn = document.querySelector('.equals')
equalBtn.addEventListener('click', (e) => {
	secondNumber = display;
	displayScreen.textContent = evaluate(firstNumber, secondNumber, operator)
	display = '';
	operator = '';
	firstNumber = '';
	secondNumber = '';
})

const evaluate = (firstNumber, secondNumber, operator) => {
	if (operator === '+') {
		operator = add;
	} else if (operator === '-') {
		operator = subtract;
	} else if (operator === '÷') {
		operator = divide;
	} else if (operator === '×') {
		operator = multiply;
	}
	return operate(firstNumber, secondNumber, operator);
}

const clearBtn = document.querySelector('.clear')
clearBtn.addEventListener('click', (e) => {
	display = '';
	displayScreen.textContent = '';
	firstNumber = '';
	secondNumber = '';
	operator = '';
})