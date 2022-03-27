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
const displayScreen = document.querySelector('.display');

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
			firstNumber = displayScreen.textContent;
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
			if (firstNumber === 'Error!') {
				firstNumber = '';
				operator = '';
			}
			secondNumber = '';
		}
	})
})

const equalBtn = document.querySelector('.equals')
equalBtn.addEventListener('click', (e) => {
	if (!firstNumber || !display) {
		console.log('No mathematical expression')
		return
	}
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
	if (operator === divide && secondNumber == 0) {
		return 'Error!';
	}
	let temp = operate(firstNumber, secondNumber, operator);
	if (temp.toString().length > 14 && temp % 1 !== 0) {
		temp = (parseFloat(temp)).toFixed(3);
		window.alert('Number too huge, rounded to 3 decimal places')
		return temp
	}
	return temp
}

const clearBtn = document.querySelector('.clear')
clearBtn.addEventListener('click', (e) => {
	display = '';
	displayScreen.textContent = '';
	firstNumber = '';
	secondNumber = '';
	operator = '';
})