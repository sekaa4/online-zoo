//hamburger
let close = document.getElementsByClassName('hamburger__close');
let hamburger = document.getElementsByClassName('hamburger');
let hamburgerMenu = document.querySelector('.hamburger__menu');
let hamburgerNavigation = document.querySelector('.hamburger__navigation');
let hamburgerMenuOverlay = document.querySelector('.hamburger__menu-overlay');

function toggleMenu() {
	hamburgerMenu.classList.toggle('_active');

	if (hamburgerMenu.classList.contains('_active')) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflowY = 'visible';
	}


}

close[0].addEventListener('click', toggleMenu);
hamburger[0].addEventListener('click', toggleMenu);
hamburgerNavigation.addEventListener('click', toggleMenu);
hamburgerMenuOverlay.addEventListener('click', toggleMenu);


// RangeLine
let buttonAreas = document.querySelectorAll('.feed__button-area');
let amount = document.querySelector('.donate__input');
let lineNumbers = document.querySelectorAll('.number__text');

function clearAll() {
	buttonAreas.forEach(el => {
		el.querySelector('.radio__button').classList.remove('active-dot');
	});

	lineNumbers.forEach(el => {
		el.classList.remove('number__color');
	});
}

function colorNumber(el) {
	el.classList.add('number__color');
}

function chooseArea(event) {
	let button = event.currentTarget.querySelector('.radio__button');
	let number;

	clearAll();

	button.classList.add('active-dot');
	number = button.value;
	amount.value = number;

	lineNumbers.forEach(textElem => {
		if (textElem.innerHTML === ('$' + number)) {
			colorNumber(textElem);
		}
	});
}

function enterNumber(event) {
	clearAll();

	let number = event.target.value;

	if (number.length >= 5) {
		amount.value = number.slice(0, 4);
	}

	buttonAreas.forEach(el => {
		if (el.querySelector('.radio__button').value === amount.value) {
			el.querySelector('.radio__button').classList.add('active-dot')
		}

		lineNumbers.forEach(textElem => {
			if (textElem.innerHTML === ('$' + amount.value)) {
				colorNumber(textElem);
			}
		})
	});
}

buttonAreas.forEach(el => {
	el.addEventListener('click', chooseArea);
});

amount.addEventListener('input', enterNumber);
