function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function disabledBtnStart() {
  btnStart.disabled = true;
}
const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let intervalId = null;

btnStart.addEventListener('click', () => {
  intervalId = setInterval(() => {
    disabledBtnStart();
    let newColor = getRandomHexColor();
    body.style.backgroundColor = newColor;
    console.log('new color set, button "start" disabled');
  }, 1000);
});

btnStop.addEventListener('click', () => {
  clearInterval(intervalId);
  btnStart.disabled = false;
  console.log('change color stop, button "sart" is active again');
});
