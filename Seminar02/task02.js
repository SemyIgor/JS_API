/* Создайте простое модальное окно, которое появляется при клике на кнопку "Открыть 
   модальное окно" и закрывается при клике на кнопку "Закрыть". Модальное окно 
   должно содержать заголовок "Модальное окно" и кнопку для закрытия. 
   * Модальное окно должно плавно появляться и исчезать при открытии и закрытии.
 */

const openModalBtn = document.querySelector('.open-modal-btn');
const closeModalBtn = document.querySelector('.close-modal-btn');
const modalWindow = document.querySelector('.modal-window');

openModalBtn.addEventListener('click', function () {
	modalWindow.classList.toggle('hidden');
	openModalBtn.classList.toggle('hidden');
});

closeModalBtn.addEventListener('click', function () {
	modalWindow.classList.toggle('hidden');
	openModalBtn.classList.toggle('hidden');
});
