const timer = document.getElementById("timer");
const startButton = document.getElementById("start_button");
const pauseButton = document.getElementById("pause_button");
const stopButton = document.getElementById("stop_button");

startButton.addEventListener('click', () => {
    toggleClock();
});

pauseButton.addEventListener('click', () => {
    toggleClock();
});

stopButton.addEventListener('click', () => {
    toggleClock(true);
});

let clockRunning = false;
let sessionTime = 1500;
let timeLeft = 1500;
let breakTime = 300;

const toggleClock = reset => {
    if (reset) {
        stopClock();
    } else {
        if (clockRunning === true) {
            clearInterval(clockTimer);
            clockRunning = false;
        } else  {
            clockRunning = true;
        }
    }
}

clockTimer = setInterval(() => {
    timeLeft--;
    stepDown();
}, 1000);

displaySessionTimeLeft = () => {
    const secondsLeft = timeLeft;
    let result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60) % 60;
    let hours = parseInt(secondsLeft / 3600);

    function addLeadingZeroes(time) {
        return time < 10 ? `0${time}` : time
    }

    if (hours > 0) {
        result += `${time}:`;
    }

    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    timer.innerText = result.toString()
}

const stopClock = () => {
    displaySessionLog(clockType);
    clearInterval(clockTimer);
    clockRunning = false;
    timeLeft = sessionTime;
    displaySessionTimeLeft();
    timeSpentInCurrSession = 0;
    clockType = clockType === 'Work' ? "Break" : 'Work';
}

let clockType = 'Work';

const stepDown = () => {
    if (timeLeft > 0) {
        timeLeft--;
        timeSpentInCurrSession++;
    } else if (timeLeft === 0) {
        timeSpentInCurrSession = 0;
        if (clockType === 'Work') {
            timeLeft = breakTime;
            displaySessionLog('Work');
            clockType = 'Break';

            currentTask.value = 'Break';
            currentTask.disabled = true;
        } else {
            timeLeft = sessionTime;
            clockType = 'Work';

            if (currentTask.value === 'Break') {
                currentTask.value = workSessionLabel;
            }
            currentTask.disabled = true;
            displaySessionLog('Break')
        }
    }
    displaySessionTimeLeft();
}

let timeSpentInCurrSession = 0;

const displaySessionLog = type => {
    const sessionsList = document.getElementById("sessions");
    const newLi = document.createElement("li");
    if (clockType === 'Work') {
        sessionLabel = currentTask.value ? currentTask.value : 'Work'
        workSessionLabel = sessionLabel;
    } else {
        sessionLabel = 'Break';
    }
    let elapsedTime = parseInt(timeSpentInCurrSession / 60);
    elapsedTime = elapsedTime > 0 ? elapsedTime : '< 1';

    const text = document.createTextNode(`${sessionLabel} : ${elapsedTime} min`);
    newLi.appendChild(text);
    sessionsList.appendChild(newLi);
}

let currentTask = document.getElementById("clock-task")
let updatedWorkSessionDuration;
let updatedBreakSessionDuration;

let workDurationInput = document.getElementById("input-work-duration");
let breakDurationInput = document.getElementById("input-break-duration");

workDurationInput.value = '25';
breakDurationInput.value = '5';

workDurationInput.addEventListener('input', () => {
    updatedWorkSessionDuration = minuteToSeconds(workDurationInput.value);
});

breakDurationInput.addEventListener('input', () => {
    updatedBreakSessionDuration = minuteToSeconds(breakDurationInput.value);
});

const minuteToSeconds = mins => {
    return mins * 60;
}

