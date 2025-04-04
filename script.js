
// Countdown timer v 1.3
// By Robin Åsheim/Copilot
let time;
let interval;



function startTimer() {
    console.log("Timer started");
    const timerElement = document.getElementById('timer');
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
	circle.style.strokeDashoffset = 0;
	
	
    interval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        time--;

        const offset = circumference - (time / (parseInt(document.getElementById('minuteInput').value) * 60 + parseInt(document.getElementById('secondInput').value))) * circumference;
        circle.style.strokeDashoffset = offset;

        if (time < 0) {
            console.log("Time's up!");
			clearInterval(interval);
            timerElement.textContent = "Tid er ute!";
            circle.style.strokeDashoffset = 0;
            document.getElementById('startButton').textContent = 'Start nedtelling';
            document.getElementById('controls').style.display = 'block';
            document.querySelector('.switch').style.display = 'flex';
            document.querySelector('.settings-table').style.display = 'table';
			document.getElementById('controls').style.visibility = 'visible';
            document.querySelector('.switch').style.visibility = 'visible';
            document.querySelector('.settings-table').style.visibility = 'visible';
            playAudio();
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const themeSwitch = document.getElementById('themeSwitch');
    const minuteInput = document.getElementById('minuteInput');
    const secondInput = document.getElementById('secondInput');
	const timerElement = document.getElementById('timer');
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;

    function updateTimer() {
		
        const inputMinutes = parseInt(minuteInput.value) || 0;
        const inputSeconds = parseInt(secondInput.value) || 0;
        time = (inputMinutes * 60) + inputSeconds;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        const offset = circumference - (time / (inputMinutes * 60 + inputSeconds)) * circumference;
        circle.style.strokeDashoffset = offset;
		console.log("New time " + timerElement.textContent);
    }

    startButton.addEventListener('click', () => {
        if (startButton.textContent === 'Start nedtelling') {
            console.log("Start button clicked");
            if (interval) {
                clearInterval(interval);
            }
            updateTimer();
			startTimer();
            startButton.textContent = 'Stopp nedtelling';
            document.getElementById('controls').style.visibility = 'hidden';
            document.querySelector('.switch').style.visibility = 'hidden';
            document.querySelector('.settings-table').style.visibility = 'hidden';
            startButton.style.visibility = 'visible';
        } else {
            console.log("Stop button clicked");
            clearInterval(interval);
            startButton.textContent = 'Start nedtelling';
            document.getElementById('controls').style.visibility = 'visible';
            document.querySelector('.switch').style.visibility = 'visible';
            document.querySelector('.settings-table').style.visibility = 'visible';
        }
    });

    themeSwitch.addEventListener('change', () => {
        console.log("Theme switch");
		const body = document.body;
        body.classList.toggle('light-mode');
    });

    minuteInput.addEventListener('input', () => {
																   
        if (minuteInput.value > 99) {
            minuteInput.value = 99;
        }
		updateTimer();
    });

    secondInput.addEventListener('input', () => {
																   
        if (secondInput.value > 59) {
            secondInput.value = 59;
        }
		updateTimer();		
    });
});

function playAudio() {
    const audioSelect = document.getElementById('audioSelect');
    const audioFilePath = audioSelect.value;
    const audio = new Audio(audioFilePath);
	console.log("Playing sound file " + audioSelect.value);
    audio.play();
}
