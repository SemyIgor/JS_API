/* Вам предоставляется задача создать простой онлайн опросник, который позволяет пользователям 
   отвечать на вопросы с вариантами ответов. Ваша задача - разработать интерфейс и функциональность 
   для этого опросника, используя HTML, CSS и JavaScript.
   1. Создайте интерфейс с несколькими вопросами и вариантами ответов. Каждый вопрос должен 
      иметь несколько вариантов ответов.
   2. Реализуйте обработку событий, чтобы пользователи могли выбирать варианты ответов.
   3. Добавьте кнопку "Завершить опрос", которая будет показывать результаты опроса.
   4. При нажатии на кнопку "Завершить опрос", вы должны проверить, что пользователь ответил на все 
      вопросы, и отобразить выбранные им варианты ответов.
   5. Если пользователь не ответил на все вопросы, покажите ему сообщение о необходимости ответить 
      на все вопросы перед завершением опроса.
   6. По желанию можно добавить стилизацию опросника с использованием CSS для лучшего 
      пользовательского опыта.
 */

// correctCount состоит из номера вопроса и номера правильного ответа. Отсчёт от "0".
// Таким же образом присваиваются id каждому (не только правильному) ответу.
const quizData = [
	{
		question: 'Какая самая большая страна?',
		answers: ['США', 'РФ', 'Канада'],
		correctCount: '01',
	},
	{
		question: 'Какая самая длинная река?',
		answers: ['Волга', 'Евфрат', 'Нил', 'Миссури'],
		correctCount: '12',
	},
	{
		question: 'Сколько цветов у классической радуги?',
		answers: [6, 7, 12],
		correctCount: '21',
	},
];

// Получаем элемент, в который будем выводить викторину
const quiz = document.querySelector('.quiz');

// Перебираем вопросы из массива вопросов с ответами (i - номер вопроса)
// и выводим в DOM вопросы викторины
quizData.forEach((quest, i) => {
	let questModule = ``;
	// Перебираем варианты ответов, формируя шаблон вариантов ответа (j - номер ответа)
	quest.answers.forEach((variant, j) => {
		questModule += `
		   <input type="radio" name="${i}" id="${i}${j}">
		   <label for="${i}${j}">${variant}</label>
		`;
	});

	// Размещаем в DOM вопрос с вариантами его ответа
	quiz.insertAdjacentHTML(
		'beforeend',
		`
	      <div class="question">
	         <h3>${quizData[i].question}</h3>
            ${questModule}
	      </div>`
	);
});

// Получаем элемент кнопки "Завершить опрос"
const submitBtn = document.querySelector('.submit-btn');

// Блок вывода результатов quiz-а
const quizResultElem = document.querySelector('.quiz-result');
console.log('quizResult: ', quizResultElem);

// "Навешиваем" событие на кнопку отправки
submitBtn.addEventListener('click', () => {
	isAllChecked();
});

// Функция проверки полноты количества ответов
function isAllChecked() {
	const questions = quiz.querySelectorAll('.question');
	let allChecked = true; // Изначально считаем, что отвечено на все вопросы.
	questions.forEach((question) => {
		allChecked =
			allChecked && // Перебираем инпуты одного вопроса. Есть ли хоть один из них checked
			// Если нет, то allChecked принимает значение false
			Array.from(question.querySelectorAll('input')).some((inp) => {
				if (inp.checked === true) {
					return true;
				} else return false;
			});
	});
	if (!allChecked) {
		notAllAnswers();
	} else {
		quizResults();
	}
}

function quizResults() {
	console.log('Спасибо за ответы');
}

function notAllAnswers() {
	quizResultElem.textContent =
		'Не на все вопросы получен ответ. Повторите, пожалуйста, ввод';
	console.log('Не на все вопросы получен ответ. Повторите, пожалуйста, ввод');
}
