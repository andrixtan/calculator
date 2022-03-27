const add = (first, second) => {
	return first + second
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
// 	displayScreen = display.textContent;
// })

const digitBtns = document.querySelectorAll('.digit')
digitBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		display += e.target.textContent;
		displayScreen.textContent = display;
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
			if (!firstNumber) return
			operator = e.target.textContent;
			console.log(operator);
			console.log(firstNumber);
			display = '';
		} else {
			operator = e.target.textContent;
			console.log(operator);
		}
	})
})