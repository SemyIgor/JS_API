const taskList = document.getElementById('taskList');
const clearEl = document.querySelector('.clear');

taskList.addEventListener('click', (event) => {
	if (event.target.classList.contains('delete-button')) {
		const taskItem = event.target.closest('li');
		taskItem.remove(); // Удаление задачи

		// Сохранение списка задач в локальное хранилище
		localStorage.setItem('taskList', taskList.innerHTML);
	}

	if (event.target.classList.contains('clone-button')) {
		const taskItem = event.target.closest('li');
		const clonedTaskItem = taskItem.cloneNode(true); // Клонирование задачи
		taskItem.after(clonedTaskItem); // Вставка клонированной задачи после текущей задачи

		// Сохранение списка задач в локальное хранилище
		localStorage.setItem('taskList', taskList.innerHTML);
	}
});

// Восстановление списка задач из локального хранилища при загрузке страницы
if (localStorage.getItem('taskList')) {
	taskList.innerHTML = localStorage.getItem('taskList');
}

clearEl.addEventListener('click', function (e) {
	localStorage.clear();
});
