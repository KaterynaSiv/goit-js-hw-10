// Описаний в документації
import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

import iconError from '../img/timer.svg/bi_error.svg';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');

button.disabled = true;
input.disabled = false;

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  //Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr.
  //Саме в ньому варто обробляти дату, обрану користувачем.
  // Параметр selectedDates — це масив обраних дат, тому ми беремо перший елемент selectedDates[0]
  onClose(selectedDates) {
    const currentDate = new Date();
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        iconUrl: iconError,
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        timeout: 3000,
      });
      return (button.disabled = true);
    } else {
      button.disabled = false;
    }
  },
};

flatpickr(input, options);

button.addEventListener('click', onClick);

function onClick() {
  button.disabled = true;
  input.disabled = true;

  const timerId = setInterval(() => {
    const differentOfTimes = userSelectedDate - Date.now();
    //   console.log(convertMs(differentOfTimes));
    if (differentOfTimes <= 0) {
      clearInterval(timerId);
      input.disabled = false;
      //   timer.textContent = 'Time is up 😎';
      timerReset();
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(differentOfTimes);
    // console.log(days);
    // console.log(hours);
    // console.log(minutes);
    // console.log(seconds);
    timerUpdated(days, hours, minutes, seconds);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatTime(time) {
  return String(time).padStart(2, '0');
}

function timerReset(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = '00';
  document.querySelector('[data-hours]').textContent = '00';
  document.querySelector('[data-minutes]').textContent = '00';
  document.querySelector('[data-seconds]').textContent = '00';
}
function timerUpdated(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = formatTime(days);
  document.querySelector('[data-hours]').textContent = formatTime(hours);
  document.querySelector('[data-minutes]').textContent = formatTime(minutes);
  document.querySelector('[data-seconds]').textContent = formatTime(seconds);
}
