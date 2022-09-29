import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const inputDate = document.querySelector('#datetime-picker');
const daysContent = document.querySelector('span[data-days]');
const hoursContent = document.querySelector('span[data-hours]');
const minutesContent = document.querySelector('span[data-minutes]');
const secondsContent = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectDayHourMinSec = selectedDates[0].getTime();

    if (selectDayHourMinSec < Date.now()) {
      window.alert('Please choose a date in the future');
      btnStart.disabled = true;
      btnStart.style.backgroundColor = '#FFB4E8';
      return;
    }
    btnStart.disabled = false;
    btnStart.style.backgroundColor = '#B4FFCE';
    function timeCounter() {
      const intervalId = setInterval(() => {
        const currenTime = Date.now();
        const deadlineTime = selectedDates[0];
        const deltaTime = deadlineTime - currenTime;

        if (deltaTime <= 0) {
          clearInterval(intervalId);
          timer.style.color = '#FFB4E8';
          return;
        }
        convertMs(deltaTime);
      }, 1000);
    }
    btnStart.addEventListener('click', timeCounter);
  },
};

flatpickr(inputDate, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  daysContent.textContent = days;
  hoursContent.textContent = hours;
  minutesContent.textContent = minutes;
  secondsContent.textContent = seconds;
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
