/* Цель: Разработать веб-приложение, которое каждый день будет отображать новое случайное изображение из коллекции Unsplash, 
	давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

Регистрация на Unsplash:

	• Перейдите на веб-сайт Unsplash (https://unsplash.com/).
	• Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

Создание приложения:

	• Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
	• Нажмите "New Application".
	• Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
	• Получите свой API-ключ после создания приложения.

Разработка веб-приложения:

	• Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
	• Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу.
	• Отобразите информацию о фотографе под изображением.

* Дополнительные задачи (по желанию):

	• Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу.
	• Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался.
	• Реализуйте возможность просмотра предыдущих "фото дня" с сохранением их в истории просмотров
*/

const photoContainer = document.getElementById('photo-container');
let page = 1;
let likes = 0;

async function fetchPhotos() {
	try {
		const response = await fetch(
			// `https://api.unsplash.com/photos?page=${page}&per_page=10&client_id=GrVGh3EE2oIzJstDFWOGs3wuqhHir428G0UjYD0BZq0`
			`https://api.unsplash.com/photos/random?page=${page}&per_page=10&client_id=GrVGh3EE2oIzJstDFWOGs3wuqhHir428G0UjYD0BZq0`
		);
		const photos = await response.json();
		return photos;
	} catch (error) {
		console.error('Ошибка при загрузке фотографий: ', error);
		return [];
	}
}

// создание контента
async function loadMorePhotos() {
	// Получаем данные с Unsplash
	const photos = await fetchPhotos();
	console.log('photos: ', photos);

	// Очищаем контейнер
	photoContainer.innerHTML = ``;

	// Если получен массив фотографий:
	if (photos.length) {
		// Перебираем полученный архив, выбирая и выводя на экран фото и имя автора
		photos.forEach((photo) => {
			renderToDOM(photo);
		});
		// Если получена единичная рандомная фотография
	} else {
		// Выводим её на экран
		renderToDOM(photos);
	}
}

function renderToDOM(photo) {
	// Выбираем адрес маленького изображения:
	const photoElem = photo.urls.small;

	// Выбираем имя автора
	const photoAuthor = photo.user.name;

	photoContainer.insertAdjacentHTML(
		'afterbegin',
		`
		<div class="photoUnit">
			<div class="photo"><img src="${photoElem}" alt=""></div>
			<p>${photoAuthor}</p>
			<div class="likes-div">
				<button class="likes-btn">I like</button>
				<span class="likes-counter">${likes}</span>
			</div>
		</div>

		`
	);
	const likesBtn = document.querySelector('.likes-btn');
	console.log('likesBtn: ', likesBtn);
	likesBtn.addEventListener('click', () => {
		incrementLikes();
	});
}

function incrementLikes() {
	likes++;
	const likesCounter = document.querySelector('.likes-counter');
	likesCounter.textContent = likes;
}

function likesToStorage() {
	const likesTotal = 'unsplashLikes';
	console.log('likesTotal: ', likesTotal);

	const profilesString = localStorage.getItem(likesTotal);
	console.log('profilesString: ', profilesString);
	if (profilesString) {
		// const profilesList = JSON.parse(profilesString);
		// profilesList.push({ login, password });
		// localStorage.setItem(profilesKey, JSON.stringify(profilesList));
		likes++;
		localStorage.setItem(
			likesTotal,
			JSON.stringify([{ photoID: 10, likesNumber: likes }])
		);
		console.log('likes: ', likes);
	} else {
		localStorage.setItem(likesTotal, JSON.stringify([{ likes }]));
	}

	function getProfiles(likesTotal) {
		return JSON.parse(localStorage.getItem(likesTotal));
	}
}

// Загрузка первой партии фотографий при загрузке страницы
loadMorePhotos();
