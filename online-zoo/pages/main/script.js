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


//Carusel
let items = document.querySelectorAll('.item');
let animalsNext = null;
let animalsPrev = null;

let animalContainer = document.querySelector('.animal-container');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function () {
		this.classList.remove('active', direction);
	})
}

function showItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function () {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	})
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

document.querySelector('.button-nav_left').addEventListener('click', function () {
	if (isEnabled) {
		generateCardLeft(currentItem);
		previousItem(currentItem);
	}
});

document.querySelector('.button-nav_right').addEventListener('click', function () {
	if (isEnabled) {
		generateCardRight(currentItem)
		nextItem(currentItem);
	}
});

function shuffle(currentItem) {
	let array = Array.from(currentItem.querySelectorAll('.animal'));

	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

		// поменять элементы местами
		// let t = array[i];
		// array[i] = array[j];
		// array[j] = t
		[array[i], array[j]] = [array[j], array[i]];
		animalsNext = array;
	}

}

function generateCardRight(n) {
	let currentItem = (n + 1 + items.length) % items.length;
	shuffle(items[currentItem]);
	animalsNext.forEach(el => el.classList.remove('active'));

	for (let i = 0; i <= 5; i++) {
		let number = Math.floor(Math.random() * 12);
		if (animalsNext[number].classList.contains('active')) {
			i--;
			continue;
		}

		animalsNext[number].classList.add('active');

	}
}

function generateCardLeft(n) {
	let currentItem = (n - 1 + items.length) % items.length;
	shuffle(items[currentItem]);
	animalsNext.forEach(el => el.classList.remove('active'));

	for (let i = 0; i <= 5; i++) {
		let number = Math.floor(Math.random() * 12);
		if (animalsNext[number].classList.contains('active')) {
			i--;
			continue;
		}

		animalsNext[number].classList.add('active');

	}
}


//Mouse event
const swipedetect = (el) => {
	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;

	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 500;

	surface.addEventListener('mousedown', function (e) {
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	});

	surface.addEventListener('mouseup', function (e) {
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;

		if (elapsedTime <= allowedTime) {
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
				if (distX > 0) {
					if (isEnabled) {
						generateCardLeft(currentItem);
						previousItem(currentItem);
					}
				} else {
					if (isEnabled) {
						generateCardRight(currentItem);
						nextItem(currentItem);
					}
				}
			}
		}

		e.preventDefault();
	});



	//Touch event
	surface.addEventListener('touchstart', function (e) {
		if (e.target.classList.contains('button-nav') || e.target.classList.contains('animals-card')) {
			if (e.target.classList.contains('button-nav_left')) {
				if (isEnabled) {
					generateCardLeft(currentItem);
					previousItem(currentItem);
				}
			} else if (e.target.classList.contains('button-nav_right')) {
				if (isEnabled) {
					generateCardRight(currentItem);
					nextItem(currentItem);
				}
			}
		}

		let touchObj = e.changedTouches[0];
		startX = touchObj.pageX;
		startY = touchObj.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	});

	surface.addEventListener('touchmove', function (e) {
		e.preventDefault();
	});

	surface.addEventListener('touchend', function (e) {
		let touchObj = e.changedTouches[0];
		distX = touchObj.pageX - startX;
		distY = touchObj.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;

		if (elapsedTime <= allowedTime) {
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
				if (distX > 0) {
					if (isEnabled) {
						generateCardLeft(currentItem);
						previousItem(currentItem);
						changerange('left');
					}
				} else {
					if (isEnabled) {
						generateCardRight(currentItem);
						nextItem(currentItem);
						changerange('right');
					}
				}
			}
		}

		e.preventDefault();
	});

}

let el = document.querySelector(".animals-card");
swipedetect(el);


//Testimonials
function changerange(direction) {
	let step = rangeTest.value;
	if (direction === 'left' && step <= 7) {
		rangeTest.value--;
		rangeValue();
	}
	if (direction === 'right' && step >= 0) {
		rangeTest.value++;
		rangeValue();
	}

}

let rangeTest = document.getElementById('range');
let carousel = document.querySelector('.carousel');
let shift = 297;

function rangeValue(event) {
	let newNumber = 0;
	let step = rangeTest.value;

	newNumber = shift * step;
	carousel.style.transform = `translateX(${-newNumber}px)`;
}

function changeShift(e) {
	rangeTest.value = 0;
	carousel.style.transform = `translateX(0px)`;
	if (e.target.innerWidth <= 1440 && e.target.innerWidth >= 980) {
		shift = 322;
		rangeTest.max = 8;
		return;
	}
	rangeTest.max = 7;
	shift = 297;

}

window.addEventListener("resize", changeShift);
rangeTest.addEventListener("input", rangeValue);

let testi = document.querySelector(".testimonial-carousel")
swipedetect(testi);



//Testimaonial popup
let testimonials = document.querySelectorAll('.carousel .testimonial');

function createPopup(event) {
	let section = document.createElement('section');
	let divPopupBackground = document.createElement('div');
	let divPopup = document.createElement('div');
	let closePopup = document.createElement('div');
	let current = event.currentTarget.cloneNode(true).outerHTML;
	let article;

	document.body.style.overflow = 'hidden';

	section.classList.add('testimonial__popup');
	divPopupBackground.classList.add('testimonial__popup-background');
	divPopup.classList.add('testimonial__popup-wrapper');
	closePopup.classList.add('popup__close');

	divPopup.innerHTML = current;
	article = divPopup.querySelector('article');
	article.className = 'testimonial-article';
	article.querySelector('.testimonial__text').className = 'testimonial-article__text';


	section.append(divPopup);
	section.append(divPopupBackground);
	divPopup.append(closePopup);
	document.body.append(section);

	closePop(document.querySelector('.testimonial__popup'));
}

function closePop(popup) {
	popup.addEventListener('click', (event) => {
		if (event.target.closest('.testimonial-article')) return;
		popup.remove();
		document.body.style.overflowY = 'visible';
	})
}

if (document.body.clientWidth >= 980) {
	testimonials.forEach(el => {
		el.removeEventListener('click', createPopup);
	});
}

function popup() {
	testimonials.forEach(el => {
		el.addEventListener('click', createPopup);
		el.addEventListener('touchstart', createPopup);
	});

	if (document.body.clientWidth >= 980) {
		testimonials.forEach(el => {
			el.removeEventListener('click', createPopup);
			el.removeEventListener('touchstart', createPopup);
		});
	}
}

window.addEventListener("resize", popup);
