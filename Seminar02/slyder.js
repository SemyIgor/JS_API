const slider = document.querySelector('.slider');
const slides = slider.getElementsByTagName('img');
let currentSlide = 0;

function showSlide(slideIndex) {
	if (slideIndex < 0) {
		currentSlide = slides.length - 1;
	} else if (slideIndex >= slides.length) {
		currentSlide = 0;
	}

	for (let i = 0; i < slides.length; i++) {
		if (i === currentSlide) {
			slides[i].style.transform = 'translateX(0)';
		} else {
			slides[i].style.transform = 'translateX(-100%)';
		}
	}
}

function prevSlide() {
	showSlide(currentSlide - 1);
}

function nextSlide() {
	showSlide(currentSlide + 1);
}

showSlide(currentSlide);
