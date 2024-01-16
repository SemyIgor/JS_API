/* Вы должны создать веб-страницу, которая позволяет пользователю динамически 
управлять элементами на странице. Ниже приведены основные требования и 
функциональность:
1. На странице должны быть кнопки "Добавить элемент", "Удалить элемент" и 
"Клонировать элемент".
2. При нажатии на кнопку "Добавить элемент" на страницу добавляется новый 
квадратный элемент (<div>) с размерами 100x100 пикселей. Этот элемент 
должен иметь класс .box и содержать текст, указывающий порядковый номер 
элемента (1, 2, 3 и так далее).
3. При нажатии на кнопку "Удалить элемент" удаляется последний добавленный 
элемент, если таковой имеется.
4. При нажатии на кнопку "Клонировать элемент" создается копия последнего 
добавленного элемента и добавляется на страницу.
5. Все элементы имеют класс .box и стилизованы с помощью CSS (см. пример).
6. Элементы могут быть добавлены, удалены и клонированы в любом порядке и в 
любом количестве. */

const addBoxBtn = document.querySelector('.add-box');
const removeBoxBtn = document.querySelector('.delete-box');
const cloneBoxBtn = document.querySelector('.clone-box');

const boxes = document.querySelector('.boxes');

const INITIAL_BOX_NUMBER = 3;
let boxesNumber = INITIAL_BOX_NUMBER; // Номер последнего добавленного (не клонированного !) бокса
showBoxes(boxesNumber); // Выводим в DOM изначальную последовательность

function showBoxes(boxesNumber) {
	for (let index = 1; index <= boxesNumber; index++) {
		const boxElement = `<div class="box">${index}</div>`;
		boxes.insertAdjacentHTML('beforeend', boxElement);
	}
}

addBoxBtn.addEventListener('click', addBox);

removeBoxBtn.addEventListener('click', removeBox);

cloneBoxBtn.addEventListener('click', cloneBox);

// Просто выводим в консоль надпись с нажатой кнопки
cloneBoxBtn.addEventListener('click', (event) => {
	console.log('EventTarget: ', event.target.textContent);
});

function addBox() {
	boxesNumber++; // Увеличиваем номер бокса
	const boxElement = `<div class="box">${boxesNumber}</div>`; // Сохраняем бокс с этим номером в переменную
	boxes.insertAdjacentHTML('beforeend', boxElement); // Добавляем бокс в DOM
}

// Минимальное число боксов должно быть равно INITIAL_BOX_NUMBER (3)
function removeBox() {
	// Если количество боксов больше, чем допустимый минимум
	if (boxes.children.length > INITIAL_BOX_NUMBER) {
		// то удаляем последний элемент
		boxes.lastElementChild.remove();
		// Если удалённый элемент не был клоном (содержимое оставшегося последнего элемента меньше, чем содержимое удалённого)
		if (boxes.lastElementChild.textContent < boxesNumber) {
			// то номер последнего добавленного (не клонированного!) бокса уменьшаем на 1
			boxesNumber--;
		}
	}
}

function cloneBox() {
	// Создаём клон с тем же номером, с которым добавлялся последний элемент
	const boxElement = `<div class="box">${boxesNumber}</div>`;
	// Размещаем его в конце последовательности боксов
	boxes.insertAdjacentHTML('beforeend', boxElement);
}
