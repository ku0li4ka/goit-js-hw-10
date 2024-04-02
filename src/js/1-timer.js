import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast/dist/js/iziToast.min.js';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.getElementById('data-start');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(time) {
  daysEl.textContent = addLeadingZero(time.days);
  hoursEl.textContent = addLeadingZero(time.hours);
  minutesEl.textContent = addLeadingZero(time.minutes);
  secondsEl.textContent = addLeadingZero(time.seconds);
}

function isFutureDate(selectedDate) {
  return selectedDate.getTime() > Date.now();
}

const fp = flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose: function(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate && isFutureDate(selectedDate)) {
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    }
  }
});

startButton.addEventListener('click', () => {
  const selectedDate = fp.selectedDates[0];
  startButton.disabled = true;
  fp.destroy();
  const targetTime = selectedDate.getTime();
  const timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const remainingTime = targetTime - currentTime;
        if (remainingTime <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.success({
        title: 'Countdown Finished',
        message: 'The countdown has ended!',
      });
    } else {
      const time = convertMs(remainingTime);
      updateTimerDisplay(time);
    }
  }, 1000);
});
