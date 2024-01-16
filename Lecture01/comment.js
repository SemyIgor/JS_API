// У вас есть дерево комментариев, представленное в виде вложенных элементов <div>. Каждый комментарий имеет кнопку "Ответить", при нажатии на которую открывается форма для написания ответа. Ваша задача - реализовать функциональность, чтобы при нажатии на кнопку "Ответить", только форма этого конкретного комментария открывалась, остальные формы оставались скрытыми.
const replyButtons = document.querySelectorAll('.reply-button');

replyButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const comment = button.closest('.comment');
		const replyForm = comment.querySelector('.reply-form');

		// Скрываем все формы ответов
		const allReplyForms = document.querySelectorAll('.reply-form');
		allReplyForms.forEach((form) => {
			if (form !== replyForm) {
				form.style.display = 'none';
			}
		});

		// Отображаем форму ответа только для текущего комментария
		replyForm.style.display = 'block';
	});
});
