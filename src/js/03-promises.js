import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onSabmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSabmit(event) {
  event.preventDefault();
  let mainDelay = Number(document.querySelector('input[name=delay]').value);
  let delayStep = Number(document.querySelector('input[name=step]').value);
  let amountOfPromises = Number(
    document.querySelector('input[name=amount]').value
  );

  for (let i = 1; i <= amountOfPromises; i += 1) {
    createPromise(i, mainDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    mainDelay += delayStep;
  }
}
