//activeTimers
const activeTimers = document.getElementById('activeTimers');
noActiveTimers();  // display "You have no Timers currently" text initially.

function noActiveTimers() {
    const noTimersText = document.createElement('p');
    noTimersText.classList.add('no-timers-text');
    noTimersText.textContent = 'You have no timers currently!';
    noTimersText.style.fontSize = "14px";
    activeTimers.appendChild(noTimersText);
}

const setTimerButton = document.getElementById('setTimer');
let isTimerActive = false;

setTimerButton.addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    // total time in seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds > 0) {
        createTimer(totalSeconds);
        isTimerActive = true;
        // Remove the "You have no timers currently!" text if it exists
        removeNoTimersText();
    } else {
        alert("Please enter a valid time.");
    }
});

//format time to hh:mm:ss
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')} hr : ${m.toString().padStart(2, '0')} min : ${s.toString().padStart(2, '0')} sec`;
}

function createTimer(totalSeconds) {
    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timer-container');

    const timeLeftElement = document.createElement('div');
    timeLeftElement.classList.add('time-left');
    timeLeftElement.textContent = 'Time Left:';

    // Create an element to display the timer value
    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');

    // Create a container for timer control buttons
    const timerControls = document.createElement('div');
    timerControls.classList.add('timer-controls');

    // Create the 'Stop Timer' button
    const stopButton = document.createElement('button');
    stopButton.classList.add('control-button', 'stop-button');
    stopButton.textContent = 'Stop Timer';

    // Create the 'Delete' button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('control-button', 'delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.display = 'none'; 

    let timerInterval;

    // update the timer
    function updateTimerDisplay() {
        totalSeconds--;
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerElement.classList.add('timer-ended');
            timerContainer.style.backgroundColor= '#f0f757';
            timerElement.textContent = "Time is up!";
            stopButton.style.display = 'none'; 
            deleteButton.style.display = 'inline'; 
            timeLeftElement.style.display = 'none';
            // Play an audio alert when Time is up!
            playAudioAlert();
        } else {
            timerElement.textContent = formatTime(totalSeconds);
        }
    }
    stopButton.addEventListener('click', () => {
        // Stop timer, remove timer container
        clearInterval(timerInterval);
        timerContainer.remove();
        isTimerActive = false; // Reset the active timer flag

        // Check if there are no timers, then display "You have no timers currently!" text
        if (activeTimers.children.length === 0) {
            displayNoTimersText();
        }
    });

    // Add a click event listener to the 'Delete' button
    deleteButton.addEventListener('click', () => {
        // Remove the timer container
        timerContainer.remove();
        // Check if there are no timers, then display "You have no timers currently!" text
        if (activeTimers.children.length === 0) {
            displayNoTimersText();
        }
    });


    timerInterval = setInterval(updateTimerDisplay, 1000);
    timerControls.appendChild(stopButton);
    timerControls.appendChild(deleteButton);
    timerContainer.appendChild(timeLeftElement);
    timerContainer.appendChild(timerElement);
    timerContainer.appendChild(timerControls);
    activeTimers.appendChild(timerContainer);
}

function removeNoTimersText() {
    const noTimersText = activeTimers.querySelector('.no-timers-text');
    if (noTimersText) {
        noTimersText.remove();
    }
}

//Play Alert Audio
function playAudioAlert() {
    const audio = new Audio('./Assets/alert.mp3');
    audio.play();
}



