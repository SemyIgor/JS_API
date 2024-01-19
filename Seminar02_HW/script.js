/* Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице. Слайдер должен 
   позволять переключаться между изображениями и отображать их в центре экрана.

1. Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
   a. Контейнер для отображения текущего изображения.
   b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
   c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

2. Используйте HTML для создания элементов интерфейса.

3. Используйте JavaScript для обработки событий:
   a. При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
   b. При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
   c. При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.
 */

const catsImgs = [
	// './img/image01.jpg',
	// './img/image02.jpg',
	// './img/image03.jpg',
	// './img/image04.jpg',
	// './img/image05.jpg',
	'https://masterpiecer-images.s3.yandex.net/f616c1126d3311eea1474659bdca6a39:upscaled',
	'https://masterpiecer-images.s3.yandex.net/e57dcdfa6acc11ee8e2992669a1675b3:upscaled',
	'https://masterpiecer-images.s3.yandex.net/b0dff703878211ee9c683abd0be4d755:upscaled',
	'https://masterpiecer-images.s3.yandex.net/8e120d2a9d9111ee8d617a83974e0feb:upscaled',
	'https://avatars.mds.yandex.net/get-shedevrum/9283310/b133a531b24311eeb2ebd6f07e64960d/orig',
];

const arrowRight = document.querySelector('.arrow-right path');
const arrowLeft = document.querySelector('.arrow-left path');

const imageOne = document.querySelector('.image-one');
const imageTwo = document.querySelector('.image-two');
const imageThree = document.querySelector('.image-three');

const imagesLine = document.querySelector('.images-line');
const frameSet = document.querySelector('.frame');

const paginationEl = document.querySelector('.pagination');

let imageIndex = 1;
let imageIndexBefore;
let imageIndexAfter;
neighborIndexes(imageIndex);

arrowRight.addEventListener('click', () => moveRight());

arrowLeft.addEventListener('click', () => moveLeft());

putInDOMImagesSet();
putInDOMPagination();

const paginationSet = document.querySelectorAll('.pagin-item');

paginationSet.forEach((elem) => {
	elem.addEventListener('click', (event) => {
		const pagIndex = parseInt(event.target.dataset.pag);
		console.log('pagIndex: ', pagIndex);
		if (pagIndex != imageIndex) {
			imageIndex = pagIndex;
			neighborIndexes(imageIndex);

			console.log('imageIndex: ', imageIndex);
			console.log('imageIndexBefore: ', imageIndexBefore);
			console.log('imageIndexAfter: ', imageIndexAfter);

			// Убираем "прикрывающую" картинку (фрейм) за слайдер
			frameSet.setAttribute('style', 'z-index: -10');

			// Загружаем тройку картинок в DOM
			putInDOMImagesSet();
		}
	});
});

function neighborIndexes(imageIndex) {
	imageIndexBefore = imageIndex - 1 < 0 ? catsImgs.length - 1 : imageIndex - 1;
	imageIndexAfter = imageIndex + 1 >= catsImgs.length ? 0 : imageIndex + 1;
}

function putInDOMImagesSet() {
	console.log('Функция вызвана');
	imagesLine.innerHTML = '';
	console.log('imagesLine: ', imagesLine.innerHTML);
	imagesLine.insertAdjacentHTML(
		'afterbegin',
		`
      <img class="image-one"
         src="${catsImgs[imageIndexBefore]}" alt="cats">
      <img class="image-two"
         src="${catsImgs[imageIndex]}" alt="cats">
      <img class="image-three"
         src="${catsImgs[imageIndexAfter]}">
   `
	);
	console.log('imagesLine: ', imagesLine);
	console.log('imageIndex: ', imageIndex);
	console.log('imageIndexBefore: ', imageIndexBefore);
	console.log('imageIndexAfter: ', imageIndexAfter);
}

function refreshFrame() {
	frameSet.innerHTML = `<img class="frame-img" src="${catsImgs[imageIndex]}" alt="cats">`;
	frameSet.setAttribute('style', 'z-index: 10');
}

function moveRight() {
	imagesLineMoveRight();
	setTimeout(imagesLineReturnLeft, 500);
	// Загружаем в DOM новую тройку картинок
	setTimeout(putInDOMImagesSet, 500);
}

// Сдвигаем три картинки, загруженные в DOM, вправо
function imagesLineMoveRight() {
	// Убираем "прикрывающую" картинку (фрейм) за слайдер
	frameSet.setAttribute('style', 'z-index: -10');
	// Плавно перемещаем три картинки, находящиеся в DOM-е, вправо
	imagesLine.classList.add('images-rightmove');
	imagesLine.classList.remove('images-lineinitial');
}

function imagesLineReturnLeft() {
	// Определяем новые три картинки, которые заместят собой предыдущие
	imageIndex = imageIndex - 1 < 0 ? catsImgs.length - 1 : imageIndex - 1;
	imageIndexBefore = imageIndex - 1 < 0 ? catsImgs.length - 1 : imageIndex - 1;
	imageIndexAfter = imageIndex + 1 >= catsImgs.length ? 0 : imageIndex + 1;
	// Загружаем во фрейм копию той картинки, которая пришла на экран слайдера и
	// поднимаем фрейм для маскировки возвращения новой тройки картинок на исходную
	refreshFrame();
	// Возвращаем тройку картинок на исходную под прикрытием фрейма
	imagesLine.classList.remove('images-rightmove');
	imagesLine.classList.add('images-lineinitial');
}

function moveLeft() {
	imagesLineMoveLeft();
	setTimeout(imagesLineReturnRight, 500);
	setTimeout(putInDOMImagesSet, 500);
}

function imagesLineMoveLeft() {
	frameSet.setAttribute('style', 'z-index: -10');
	imagesLine.classList.add('images-leftmove');
	imagesLine.classList.remove('images-lineinitial');
}

function imagesLineReturnRight() {
	imageIndex = imageIndex + 1 >= catsImgs.length ? 0 : imageIndex + 1;
	imageIndexBefore = imageIndex - 1 < 0 ? catsImgs.length - 1 : imageIndex - 1;
	imageIndexAfter = imageIndex + 1 >= catsImgs.length ? 0 : imageIndex + 1;
	refreshFrame();
	imagesLine.classList.remove('images-leftmove');
	imagesLine.classList.add('images-lineinitial');
}

function putInDOMPagination() {
	paginationEl.innerHTML = '';
	let paginItems = ``;
	catsImgs.forEach(
		(value, index) =>
			(paginItems += `<div class="pagin-item" data-pag="${index}"></div>`)
	);

	paginationEl.insertAdjacentHTML('afterbegin', paginItems);
}
