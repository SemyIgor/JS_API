/* 1. Вы создаете веб-страницу для отображения списка статей. Каждая статья состоит из заголовка и 
   текста. Вам необходимо использовать Bootstrap для стилизации элементов.
2. Используйте Bootstrap, чтобы стилизовать элементы:
   a. Заголовок статьи (<h2>)
   b. Текст статьи (<p>)
   c. Кнопки "Добавить статью", "Удалить" и "Редактировать".
3. Создайте начальный список статей, который будет загружаться при загрузке страницы. Используйте 
   JSON-данные для определения заголовков и текстов статей.
4. Позвольте пользователю добавлять новые статьи. При нажатии на кнопку "Добавить статью" должна 
   появиться новая статья с заголовком "Новая статья" и текстом "Введите содержание статьи...".
5. Реализуйте функциональность удаления статей. При нажатии на кнопку "Удалить" соответствующая 
   статья должна быть удалена из списка.
6. Реализуйте функциональность редактирования статей. При нажатии на кнопку "Редактировать" 
   пользователь должен иметь возможность изменить заголовок и текст статьи. Используйте 
   всплывающее окно или prompt для ввода новых данных.
7. Все изменения (добавление, удаление, редактирование) должны быть сохранены в локальное 
   хранилище браузера, чтобы они сохранялись после перезагрузки страницы.
 */

// Редактирование через prompt

const articlesData = [
	{
		title: 'Заголовок статьи 1',
		content: 'Содержимое статьи 1',
	},
	{
		title: 'Заголовок статьи 2',
		content: 'Содержимое статьи 2',
	},
];

// Исходные элементы страницы
const container = document.querySelector('.container');
const articles = container.querySelector('.articles');
// Кнопка добавления новой статьи
const addBtn = container.querySelector('.add-article');

// Загрузка начального списка статей
showData();

// Навешиваем события на кнопки загруженных элементов страницы:
// Добавить статью (событие)
addBtn.addEventListener('click', addArticle);

// Вывод статей из базы в DOM
function showData() {
	for (let i = 0; i < articlesData.length; i++) {
		const article = `
      <div class="article">
         <h2>${articlesData[i].title}</h2>
         <p>${articlesData[i].content}</p>
         <div class="buttons">
            <button class="edit">Редактировать</button>
            <button class="remove">Удалить</button>
         </div>
      </div>
      `;
		// Добавляем статью в DOM
		articles.insertAdjacentHTML('beforeend', article);

		// Навешиваем события на кнопки этой статьи
		setEvents();
	}
}

// Функции обработки событий при нажатии на кнопки:

// Добавить статью
function addArticle() {
	const article = `
   <div class="article">
      <h2>Новая статья</h2>
      <p>Введите содержимое статьи...</p>
      <div class="buttons">
         <button class="edit">Редактировать</button>
         <button class="remove">Удалить</button>
      </div>
   </div>
   `;
	articles.insertAdjacentHTML('beforeend', article);

	// Навешиваем события на кнопки этой статьи
	setEvents();
}

// Удалить статью
function removeArticle(event) {
	const elemToRemove = event.target.closest('.article');
	elemToRemove.remove();
}

// Редактировать статью
function editArticle(event) {
	const localArticle = event.target.closest('.article');

	const header = prompt('Введите заголовок', '');
	// Если не пустая строка
	if (!header.trim() === '') {
		localArticle.querySelector('h2').textContent = header;
	}

	const content = prompt('Введите текст статьи', '');
	// Если не пустая строка
	if (!content.trim() === '') {
		localArticle.querySelector('p').textContent = content;
	}
}

// Функция "навешивания" событий на кнопки "Удалить" и "Редактировать"
function setEvents() {
	const removeBtn = articles.lastElementChild.querySelector('.remove');
	removeBtn.addEventListener('click', (event) => removeArticle(event));
	const editBtn = articles.lastElementChild.querySelector('.edit');
	editBtn.addEventListener('click', (event) => editArticle(event));
}
