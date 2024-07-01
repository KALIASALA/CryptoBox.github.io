var isButtonDisabled = false;

function getCoin() {
    if (!isButtonDisabled) {
        // Generate a random number between 1 and 10
        var randomNumber = Math.floor(Math.random() * 10) + 1;

        // Update the span element with the generated random number
        var coinCountSpan = document.getElementById('coin-count');
        var currentCoinCount = parseInt(coinCountSpan.textContent);
        coinCountSpan.textContent = currentCoinCount + randomNumber;

        // Disable the button for 1 hour (3600000 milliseconds)
        disableButtonForOneHour();
    }
}

function disableButtonForOneHour() {
    isButtonDisabled = true;
    var button = document.getElementById('get-coin-btn');
    button.disabled = true;

    var countDownDate = new Date().getTime() + 3600000; // 1 hour from now

    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        button.innerHTML = hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(x);
            isButtonDisabled = false;
            button.disabled = false;
            button.innerHTML = "GET SpinCoin";
        }
    }, 1000);
}




// Пример работы с Telegram Login Widget
telegramLogin(authCallback);

function authCallback(user) {
    var telegramUserId = user.id; // Telegram user ID
    // Проверяем, есть ли уже запись в базе данных для этого пользователя
    // Если нет, создаем новую запись с начальным балансом
    // Если есть, загружаем данные и отображаем на странице
    loadUserData(telegramUserId);
}

function loadUserData(telegramUserId) {
    // Здесь делаем запрос к серверу для загрузки данных пользователя по его Telegram user ID
    // Например, через AJAX запрос к вашему API
    fetch('/api/userdata?telegramUserId=' + telegramUserId)
        .then(response => response.json())
        .then(data => {
            // Обновляем данные на странице
            var coinCountSpan = document.getElementById('coin-count');
            coinCountSpan.textContent = data.coinBalance; // Предполагается, что сервер вернет объект с балансом
        })
        .catch(error => console.error('Ошибка при загрузке данных пользователя', error));
}

function getCoin() {
    // При нажатии на кнопку "GET SpinCoin"
    // Отправляем запрос на сервер для увеличения баланса пользователя
    var telegramUserId = getUserTelegramId(); // Функция, которая получает Telegram user ID пользователя
    fetch('/api/getcoin?telegramUserId=' + telegramUserId)
        .then(response => response.json())
        .then(data => {
            // Обновляем отображение баланса на странице
            var coinCountSpan = document.getElementById('coin-count');
            coinCountSpan.textContent = data.coinBalance;
        })
        .catch(error => console.error('Ошибка при получении SpinCoin', error));
}
