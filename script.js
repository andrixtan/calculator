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

const btns = document.querySelectorAll('.button')
btns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		// console.log(e);
		display += e.target.textContent;
		// console.log(display);
		displayScreen.textContent = display;
	})
})