/* Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. 
   Каждое занятие имеет название, время проведения, максимальное количество участников и 
   текущее количество записанных участников.

1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

2. Загрузите информацию о занятиях из предоставленных JSON-данных. 
   Каждое занятие должно отображаться на странице с указанием его названия, времени проведения,
   максимального количества участников и текущего количества записанных участников.

3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. 
   Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

4. После успешной записи пользователя на занятие, обновите количество записанных участников 
   и состояние кнопки "Записаться".
 */

const sportsListInitial = [
	{
		sportsName: 'СЕКЦИЯ',
		sportsTime: 'ВРЕМЯ ЗАНЯТИЙ',
		maxGroup: 'РАЗМЕР ГРУППЫ',
		onList: 'ЗАПИСАЛИСЬ',
	},
	{ sportsName: 'Бокс', sportsTime: '18:00-20:00', maxGroup: 8, onList: 5 },
	{ sportsName: 'Плавание', sportsTime: '16:30-17:30', maxGroup: 6, onList: 5 },
	{ sportsName: 'Шахматы', sportsTime: '20:30-22:00', maxGroup: 10, onList: 8 },
];

// Делаем копию исходного массива и сохраним её в localStorage
let sportsList = sportsListInitial.slice(0);
if (!localStorage.getItem('sportsList')) {
	saveToStorage('sportsList', sportsList);
} else {
	sportsList = JSON.parse(localStorage.getItem('sportsList'));
}

// Создаём массив для хранения свойства "disabled" кнопок "Записаться"
let disabledBtns = Array(sportsList.length).fill('');
if (!localStorage.getItem('disabledBtns')) {
	saveToStorage('disabledBtns', disabledBtns);
} else {
	disabledBtns = JSON.parse(localStorage.getItem('disabledBtns'));
}

// Находим элемент, через который будем добавлять в DOM наше расписание
const tableLines = document.querySelector('.table-lines');

// Добавляем расписание в DOM
showSchedule();

// Функция сохранения в localStorage расписания
function saveToStorage(name, data) {
	localStorage.setItem(name, JSON.stringify(data));
}

// Функция вывода в DOM расписания
function showSchedule() {
	sportsList.forEach((line, i) => {
		tableLines.insertAdjacentHTML(
			'beforeend',
			`<div class="table-line">
            <div class="table-items">
               <span class="sports-name">${line.sportsName}</span>
               <span class="sports-time">${line.sportsTime}</span>
               <span class="max-group">${line.maxGroup}</span>
               <span class="on-list">${line.onList}</span>
            </div>
            <button class="sign-up" ${disabledBtns[i]}>Записаться</button>
         </div>
      `
		);
	});

	// Находим в расписании все кнопки "Записаться" и каждой добавляем слушатель
	const signUpBtns = tableLines.querySelectorAll('.sign-up');
	signUpBtns.forEach((signUpBtn, index) => {
		signUpBtn.addEventListener('click', () => signUp(index));
	});
}

// Функция добавления участника в выбранную спортивную секцию
function signUp(index) {
	if (sportsList[index].onList < sportsList[index].maxGroup) {
		sportsList[index].onList++;
		if (sportsList[index].onList === sportsList[index].maxGroup) {
			disabledBtns[index] = 'disabled';
		}
	}
	tableLines.innerHTML = '';
	saveToStorage('sportsList', sportsList);
	saveToStorage('disabledBtns', disabledBtns);
	showSchedule();
}
