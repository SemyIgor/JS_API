// // Вариант I
// window.addEventListener('resize', showSize);

// function showSize() {
// 	windowWidth = window.innerWidth;
// 	console.log('windowWidth: ', windowWidth);
// 	windowHeight = window.innerHeight;
// 	console.log('windowHeight: ', windowHeight);
// }

// // Вариант II
// window.addEventListener('resize', () => {
// 	console.log('Ширина окна: ', window.innerWidth);
// 	console.log('Высота окна: ', window.innerHeight);
// });

// Вариант III
const winWidthSlot = document.querySelector('.win-width');
const winHeightSlot = document.querySelector('.win-height');

winWidthSlot.textContent = window.innerWidth;
winHeightSlot.textContent = window.innerHeight;

window.addEventListener('resize', () => {
	winWidthSlot.textContent = window.innerWidth;
	winHeightSlot.textContent = window.innerHeight;
});
