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
	// './img/image00.jpg',
	// './img/image01.jpg',
	// './img/image02.jpg',
	// './img/image03.jpg',
	// './img/image04.jpg',
	'https://masterpiecer-images.s3.yandex.net/f616c1126d3311eea1474659bdca6a39:upscaled',
	'https://masterpiecer-images.s3.yandex.net/e57dcdfa6acc11ee8e2992669a1675b3:upscaled',
	'https://masterpiecer-images.s3.yandex.net/b0dff703878211ee9c683abd0be4d755:upscaled',
	'https://masterpiecer-images.s3.yandex.net/8e120d2a9d9111ee8d617a83974e0feb:upscaled',
	'https://avatars.mds.yandex.net/get-shedevrum/9283310/b133a531b24311eeb2ebd6f07e64960d/orig',
];

const arrowRight = document.querySelector('.arrow-right path');
const arrowLeft = document.querySelector('.arrow-left path');

const imagesQueue = document.querySelector('.images-queue');
const frameSet = document.querySelector('.frame');

const paginationEl = document.querySelector('.pagination');

// Объявляем индексы массива, определяющие номера трёх картинок
let imageIndex = 1;
let imageIndexBefore;
let imageIndexAfter;
// По индексу средней из трёх картинок, вычисляем индексы соседних с ней
neighborIndexes(imageIndex);

// Навешиваем события на кнопки слайдера
arrowRight.addEventListener('click', () => moveRight());
arrowLeft.addEventListener('click', () => moveLeft());

// Выводим в DOM тройку картинок и пагинацию
putInDOMImagesSet();
putInDOMPagination();

// Получаем NodeList элементов пагинации
const paginationSet = document.querySelectorAll('.pagin-item');

// Подвешиваем событие 'click' на каждый элемент пагинации
paginationSet.forEach((elem) => {
	elem.addEventListener('click', (event) => paginEventActivate(event));
});

// Функция обнуления признака "текущий" для всех эелементов пагинации
function clearCurrentPagination() {
	paginationSet.forEach((el) => {
		if (el.classList.contains('pagin-item_current'))
			el.classList.remove('pagin-item_current');
	});
}

// ??????
function paginEventActivate(event) {
	const pagIndex = parseInt(event.target.dataset.pag);
	// Если кликнули не по номеру картинки, которая уже на экране
	if (pagIndex != imageIndex) {
		clearCurrentPagination();

		// Делаем "текущим" элемент пагинации, на который кликнули
		event.target.classList.add('pagin-item_current');

		// Определяем индексы новой тройки картинок
		imageIndex = pagIndex;
		neighborIndexes(imageIndex);

		// Заменяем в DOM-е первую картинку в тройке на выбранную по номеру пагинации
		imagesQueue.firstElementChild.attributes.src.value = catsImgs[imageIndex];

		// Плавный скроллинг всей тройки картинок вправо, выбранная картинка "выплывает" на экран
		imagesQueueMoveRight();
		paginationSet[imageIndex].classList.add('pagin-item_current');

		// Выводим картинку во фрейм и "поднимаем" фрейм над "плёнкой"
		refreshFrame();

		// Под прикрытием фрейма (там наша картинка) двигаем влево нашу плёнку (сокращённый вариант)
		setTimeout(returnLeft, 500);

		// Вычисляем индексы новой тройки картинок, которые далее загрузим в "плёнку"
		neighborIndexes(imageIndex);
		// и загружаем новые картинки на "плёнку"
		putInDOMImagesSet();
	}
}

// Функция изначальной загрузки в DOM блока пагинации
function putInDOMPagination() {
	paginationEl.innerHTML = '';
	let paginItems = ``;
	catsImgs.forEach((value, index) => {
		if (index === imageIndex) {
			paginItems += `<div class="pagin-item pagin-item_current" data-pag="${index}"></div>`;
		} else {
			paginItems += `<div class="pagin-item" data-pag="${index}"></div>`;
		}
	});

	paginationEl.insertAdjacentHTML('afterbegin', paginItems);
}

// Функция определения индексов элементов, соседних к данному
function neighborIndexes(imageIndex) {
	imageIndexBefore = imageIndex - 1 < 0 ? catsImgs.length - 1 : imageIndex - 1;
	imageIndexAfter = imageIndex + 1 >= catsImgs.length ? 0 : imageIndex + 1;
}

// Функция вывода трёх картинок (текущей и двух соседних к ней) в блок "паровозик"
function putInDOMImagesSet() {
	imagesQueue.innerHTML = '';
	imagesQueue.insertAdjacentHTML(
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
}

// Функция вывода во фрейм текущей картинки (поверх такой же в "паровозике")
// и поднятия фрейма над "паровозиком", скрывая его видимую (текущую) картинку
function refreshFrame() {
	frameSet.innerHTML = `<img class="frame-img" src="${catsImgs[imageIndex]}" alt="cats">`;
	frameSet.setAttribute('style', 'z-index: 10');
}

// Функция скроллинга вправо (основная)
function moveRight() {
	imagesQueueMoveRight();
	// // Делаем "текущим" элемент пагинации, который соответствует новой картинке
	paginationSet[imageIndexBefore].classList.add('pagin-item_current');
	// Определяем новые три картинки, которые заместят собой предыдущие

	imageIndex = imageIndex - 1 < 0 ? catsImgs.length - 1 : imageIndex - 1;
	neighborIndexes(imageIndex);

	setTimeout(imagesQueueReturnLeft, 500);
	// Загружаем в DOM новую тройку картинок
	setTimeout(putInDOMImagesSet, 500);
}

// Функция сдвига трёх картинок, загруженных в DOM, вправо
function imagesQueueMoveRight() {
	// Убираем "прикрывающую" картинку (фрейм) за слайдер
	frameSet.setAttribute('style', 'z-index: -10');
	// Плавно перемещаем три картинки, находящиеся в DOM-е, вправо
	imagesQueue.classList.add('images-rightmove');
	imagesQueue.classList.remove('images-queueinitial');

	clearCurrentPagination();
}

// Функция возврата трёх картинок, загруженных в DOM, влево
function imagesQueueReturnLeft() {
	// Загружаем во фрейм копию той картинки, которая пришла на экран слайдера и
	// поднимаем фрейм для маскировки возвращения новой тройки картинок на исходную
	refreshFrame();

	// Возвращаем тройку картинок на исходную под прикрытием фрейма
	returnLeft();
}

// Функция возврата тройки картинок на исходную
function returnLeft() {
	// Возвращаем тройку картинок на исходную под прикрытием фрейма
	imagesQueue.classList.remove('images-rightmove');
	imagesQueue.classList.add('images-queueinitial');
}

// Функция скроллинга влево (основная)
function moveLeft() {
	imagesQueueMoveLeft();
	setTimeout(imagesQueueReturnRight, 500);
	setTimeout(putInDOMImagesSet, 500);
}

// Функция сдвига трёх картинок, загруженных в DOM, влево
function imagesQueueMoveLeft() {
	// Убираем "прикрывающую" картинку (фрейм) за слайдер
	frameSet.setAttribute('style', 'z-index: -10');
	// Плавно перемещаем три картинки, находящиеся в DOM-е, вправо
	imagesQueue.classList.add('images-leftmove');
	imagesQueue.classList.remove('images-queueinitial');

	// Определяем новые три картинки, которые заместят собой предыдущие
	imageIndex = imageIndex + 1 >= catsImgs.length ? 0 : imageIndex + 1;
	neighborIndexes(imageIndex);

	clearCurrentPagination();
	// Делаем "текущим" элемент пагинации, который соответствует новой картинке
	paginationSet[imageIndex].classList.add('pagin-item_current');
}

// Функция возврата трёх картинок, загруженных в DOM, вправо
function imagesQueueReturnRight() {
	refreshFrame();
	imagesQueue.classList.remove('images-leftmove');
	imagesQueue.classList.add('images-queueinitial');
}
