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





