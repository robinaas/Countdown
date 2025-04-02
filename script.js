let time;
let interval;

// Countdown timer v 1.0
// By Robin Åsheim/Copilot

function startTimer() {
    console.log("Timer started");
    const timerElement = document.getElementById('timer');
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    interval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        time--;

        const offset = circumference - (time / (parseInt(document.getElementById('minuteInput').value) * 60 + parseInt(document.getElementById('secondInput').value))) * circumference;
        circle.style.strokeDashoffset = offset;

        if (time < 0) {
            clearInterval(interval);
            timerElement.textContent = "Tid er ute!";
            circle.style.strokeDashoffset = 0;
        }
    }, 1000);
}

document.getElementById('startButton').addEventListener('click', () => {
    console.log("Start button clicked");
    if (interval) {
        clearInterval(interval);
    }
    const inputMinutes = document.getElementById('minuteInput').value;
    const inputSeconds = document.getElementById('secondInput').value;
    time = (parseInt(inputMinutes) * 60) + parseInt(inputSeconds); // Sett tiden basert på input
    startTimer();
});
