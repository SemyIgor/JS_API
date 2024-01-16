const backButton = document.querySelector('.backButton');
console.log('backButton: ', backButton);
const forwardButton = document.querySelector('.forwardButton');
console.log('forwardButton: ', forwardButton);

backButton.addEventListener('click', () => {
	window.history.back();
});

forwardButton.addEventListener('click', () => {
	window.history.forward();
});
