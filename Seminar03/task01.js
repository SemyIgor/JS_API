const goodsList = [
	{ id: idGenerator(), content: 'Калькулятор', category: 'Электроника' },
	{ id: idGenerator(), content: 'Монитор', category: 'Электроника' },
	{ id: idGenerator(), content: 'Смартфон', category: 'Электроника' },
	{ id: idGenerator(), content: 'Джинсы', category: 'Одежда' },
	{ id: idGenerator(), content: 'Футболка', category: 'Одежда' },
	{ id: idGenerator(), content: 'Плащ', category: 'Одежда' },
	{ id: idGenerator(), content: 'Кроссовки', category: 'Обувь' },
	{ id: idGenerator(), content: 'Сапоги', category: 'Обувь' },
	{ id: idGenerator(), content: 'Сандали', category: 'Обувь' },
	{ id: idGenerator(), content: 'Стул', category: 'Мебель' },
	{ id: idGenerator(), content: 'Стол', category: 'Мебель' },
	{ id: idGenerator(), content: 'Кровать', category: 'Мебель' },
	{ id: idGenerator(), content: 'Шкаф', category: 'Мебель' },
];

const selectedList = document.querySelector('.selected-list');

const categoryList = document.getElementById('category-list');

// Выбираем все имеющиеся в списке товаров категории
const categorySet = new Set();
goodsList.forEach((el) => categorySet.add(el.category));

// Считаем отфильтрованным весь список товаров
let goodsListFiltered = goodsList.slice(0);

{
	// "Рисуем" при начальной загрузке нашу страницу, выводя в DOM данные
	showGoodsList(goodsListFiltered); // При первой загрузке передаётся неотфильтрованный список
	showCategoryList();
}

// console.log(document.goodsListForm.firstElementChild.textContent);

// Изменение выводимого списка товаров при выборе категории товара
categoryList.onchange = function () {
	// Получаем value выбранной категории
	const selectedOption = categoryList.value;

	// Фильтруем по полученному value список товаров
	if (selectedOption != 'notSorted') {
		// Если не выбрали "Без сортировки", то фильтруем:
		goodsListFiltered = goodsList.filter(
			(good) => good.category === selectedOption
		);
	} else {
		// Если выбрали "Без сортировки", то выводим все товары
		goodsListFiltered = goodsList.slice(0);
	}
	// Выводим полученный список в DOM
	showGoodsList(goodsListFiltered);
};

// Выводим в DOM список категорий на основе categorySet
function showCategoryList() {
	categoryList.innerHTML = ``;
	let categoryItems = `<option value="notSorted">Без сортировки</option>`;
	categorySet.forEach((category) => {
		categoryItems += `<option value="${category}">${category}</option>`;
	});
	categoryList.insertAdjacentHTML('afterbegin', categoryItems);
}

// Выводим в DOM получаемый список товаров
function showGoodsList(goodsList) {
	selectedList.innerHTML = ``;
	let goodItems = ``;
	goodsList.forEach((goodItem) => {
		goodItems += `<li class="selected-list_Item">${goodItem.content}</li>`;
	});
	selectedList.insertAdjacentHTML('afterbegin', goodItems);
}

// Генератор ID
function idGenerator() {
	return Math.round(Math.random() * 1000000000);
}
