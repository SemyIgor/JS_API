/* У вас есть кнопка "Купить". Создайте скрипт, который при клике на эту кнопку меняет её текст на "Товар 
   добавлен в корзину" в течение 2 секунд, а затем возвращает исходный текст "Купить". В обработчике 
   события клика также проверьте, является ли событие доверенным. Если событие является доверенным, 
   выполните изменение текста кнопки и убедитесь, что после 2 секунд текст возвращается в исходное 
   состояние.
 */

const toBuyBtn = document.querySelector('.to-buy-btn');

toBuyBtn.addEventListener('click', function (event) {
	if (event.isTrusted) {
		console.log(`Событие ${event.type} является доверенным`);
		// Сохраняем изначальную надпись на кнопке
		const initialTextContent = event.target.textContent;
		btnChangeTxt('Товар добавлен в корзину', event);
		setTimeout(() => btnChangeTxt(initialTextContent, event), 2000);
	} else {
		console.log(`Событие ${event.type} не является доверенным`);
	}
});

function btnChangeTxt(text, event) {
	event.target.textContent = text;
}

function simulateClick() {
	const clickEvent = new Event('click', { bubbles: true });
	toBuyBtn.dispatchEvent(clickEvent);
}

setTimeout(simulateClick, 2000);
