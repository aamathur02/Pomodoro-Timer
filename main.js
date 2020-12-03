import ProgressBar from './progressbar.js';
const timer = document.getElementById("timer");
const startButton = document.getElementById("start_button");
const stopButton = document.getElementById("stop_button");
let clockType = 'Work';
let timeSpentInCurrSession = 0;
let currentTask = document.getElementById("clock-task")
let updatedWorkSessionDuration;
let updatedBreakSessionDuration;

let workDurationInput = document.getElementById("input-work-duration");
let breakDurationInput = document.getElementById("input-break-duration");

workDurationInput.value = '25';
breakDurationInput.value = '5';

let isClockStopped = true;



const progressBar = new ProgressBar.Circle('#timer', {
    strokeWidth: 2,
    text: {
        value: '25:00',
    },
    trailColor: '#f4f4f4',
});
startButton.addEventListener('click', () => {
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
    togglePlayPauseIcon(reset);
    if (reset) {
        stopClock();
    } else {
        console.log(isClockStopped);
        if (isClockStoppedd) {
            setUpdatedTimers();
            isClockStopped = false;
        }

        if (clockRunning === true) {
            clearInterval(clockTimer);
            clockRunning = false;
        } else  {
            clockTimer = setInterval(() => {
                stepDown()
                displaySessionTimeLeft()
            }, 1000);
            clockRunning = true;
        }
        showStopIcon();
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
    progressBar.innerText = result.toString()
}

const stopClock = () => {
    setUpdatedTimers();
    displaySessionLog(clockType);
    clearInterval(clockTimer);
    isClockStopped = true;
    clockRunning = false;
    timeLeft = sessionTime;
    displaySessionTimeLeft();
    clockType = 'Work';
    timeSpentInCurrSession = 0;
}

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

workDurationInput.addEventListener('input', () => {
    updatedWorkSessionDuration = minuteToSeconds(workDurationInput.value);
});

breakDurationInput.addEventListener('input', () => {
    updatedBreakSessionDuration = minuteToSeconds(breakDurationInput.value);
});

const minuteToSeconds = mins => {
    return mins * 60;
}

const setUpdatedTimers = () => {
    if (clockType === 'Work') {
        timeLeft = updatedWorkSessionDuration ? updatedWorkSessionDuration : sessionTime;
        sessionTime = timeLeft;
    } else {
        timeLeft = updatedBreakSessionDuration ? updatedBreakSessionDuration : breakTime;
        breakTime = timeLeft;
    }
}


const togglePlayPauseIcon = reset => {
    const playIcon = document.getElementById("play-icon");
    const pauseIcon = document.getElementById("pause-icon");
    if (reset) {
    // when resetting -> always revert to play icon
    if (playIcon.classList.contains('hidden')) {
      playIcon.classList.remove('hidden');
    }
    if (!pauseIcon.classList.contains('hidden')) {
      pauseIcon.classList.add('hidden');
    }
    } else {
    playIcon.classList.toggle('hidden');
    pauseIcon.classList.toggle('hidden');
  }
}

const showStopIcon = () => {
    const stopButton = document.getElementById("stop_button");
    stopButton.classList.remove('hidden');
}

