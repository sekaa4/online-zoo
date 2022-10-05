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
