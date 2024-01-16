const nextButtot = document.querySelector('.next-buttot');
const prevButtot = document.querySelector('.prev-buttot');

nextButtot.addEventListener('click', nextWin);
prevButtot.addEventListener('click', prevWin);

function nextWin() {
	window.history.forward();
}

function prevWin() {
	window.history.back();
}
