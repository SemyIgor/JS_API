console.log(navigator.userAgent);
console.log(navigator.cookieEnabled);
console.log(navigator.doNotTrack);
console.log(navigator.geolocation);

// userAgent - информация о браузере
// cookieEnabled - включены ли куки (true - включены)
// doNotTrack - включена ли функция запрета на отслеживание (1 - да, null -не включена)
// geolocation - геолокация, в данном случае не активирована

// Напишите функцию findClosestCity(userLocation, cites), которая принимает текущее местоположение пользователя в формате [latitude, longitude]. Функция должна вернуть название ближайшего города к пользователю.

function calculateDistance(location1, location2) {
	const [lat1, lon1] = location1; // Разбивает координаты первого местоположения на широту и долготу
	const [lat2, lon2] = location2; // Разбивает координаты второго местоположения на широту и долготу

	const toRad = (value) => (value * Math.PI) / 180; // Преобразует градусы в радианы
	const R = 6371; // Радиус Земли в километрах

	const dLat = toRad(lat2 - lat1); // Вычисляет разницу широты в радианах
	const dLon = toRad(lon2 - lon1); // Вычисляет разницу долготы в радианах
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) + // Вычисляет квадрат синуса половины разницы широты
		Math.cos(toRad(lat1)) *
			Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2); // Вычисляет квадрат синуса половины разницы долготы и учитывает косинусы широт
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Вычисляет центральный угол между двумя местоположениями
	const distance = R * c; // Вычисляет расстояние между двумя местоположениями на сфере Земли
	return distance; // Возвращает расстояние между местоположениями
}

function findFastestCity(cities) {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			// проверяет поддержку геолокации в браузере
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const userLocation = [
						position.coords.latitude,
						position.coords.longitude,
					]; // Получает текущие координаты пользователя
					let closestCity = null; // Переменная для хранения ближайшего города
					let shortestDistance = Infinity; // Переменная для хранения кратчайшего расстояния

					cities.forEach((city) => {
						// Перебирает все города из массива cities
						const distance = calculateDistance(userLocation, city.location); // Вычисляет расстояние между местоположением пользователя и текущим городом
						if (distance < shortestDistance) {
							// Если расстояние меньше кратчайшего расстояния
							closestCity = city.name; // Записывает имя текущего города в closestCity
							shortestDistance = distance; // Записывает текущее расстояние в shortestDistance
						}
					});

					resolve(closestCity); // Возвращает ближайший город
				},
				(error) => {
					if (error.code === error.PERMISSION_DENIED) {
						// Если пользователь отказал в доступе к геолокации
						reject(new Error('Пользователь отказал в доступе к геолокации.')); // Возвращает ошибку
					} else {
						reject(new Error('Ошибка при получении местоположения.')); // Возвращает ошибку
					}
				}
			);
		} else {
			reject(new Error('Геолокация не поддерживается вашим браузером.')); // Возвращает ошибку
		}
	});
}

// Пример использования
const cities = [
	{ name: 'Нью-Йорк', location: [40.7128, -74.006] },
	{ name: 'Лондон', location: [51.5074, -0.1278] },
	{ name: 'Токио', location: [35.6895, 139.6917] },
	{ name: 'Москва', location: [55.751244, 37.618423] },
	// Другие города
];

findFastestCity(cities)
	.then((closestCity) => {
		console.log(closestCity); // Ожидаемый результат: название ближайшего города
	})
	.catch((error) => {
		console.log(error.message);
	});
