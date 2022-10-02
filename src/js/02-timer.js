import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const inputDate = document.querySelector('#datetime-picker');
const daysContent = document.querySelector('span[data-days]');
const hoursContent = document.querySelector('span[data-hours]');
const minutesContent = document.querySelector('span[data-minutes]');
const secondsContent = document.querySelector('span[data-seconds]');
// let selectedDate = null;
btnStart.disabled = true;
btnStart.addEventListener('click', timeCounter);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future!');
      btnStart.disabled = true;
      btnStart.style.backgroundColor = '#FFB4E8';
    } else {
      inputDate.dataset.time = selectedDate.getTime();
      btnStart.disabled = false;
      btnStart.style.backgroundColor = '#B4FFCE';
    }
  },
};

flatpickr(inputDate, options);
btnStart.addEventListener('click', timeCounter);

function timeCounter() {
  btnStart.disabled = true;
  inputDate.disabled = true;
  const timeMsec = Number(inputDate.dataset.time);
  const intervalId = setInterval(() => {
    let currentTime = new Date().getTime();
    let deltaTime = timeMsec - currentTime;
    const convertedTime = convertMs(deltaTime);
    const { days, hours, minutes, seconds } = convertedTime;
    if (deltaTime < 1000) {
      clearInterval(intervalId);
      timer.style.color = '#FFB4E8';
    }
    apdateTime(days, hours, minutes, seconds);
  }, 1000);
}
function apdateTime(days, hours, minutes, seconds) {
  daysContent.textContent = addLeadingZero(days);
  hoursContent.textContent = addLeadingZero(hours);
  minutesContent.textContent = addLeadingZero(minutes);
  secondsContent.textContent = addLeadingZero(seconds);
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
function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
