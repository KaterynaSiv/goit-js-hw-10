// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// імпорт svg icons
import iconOk from '../img/snackbar.svg/bi_ok.svg';
import iconError from '../img/snackbar.svg/bi_error.svg';
import iconCaution from '../img/snackbar.svg/bi_attantion.svg';
import iconBell from '../img/snackbar.svg/bi_bell.svg';
// import img from '../img/img_desk-6@2x.jpg';

const form = document.querySelector('.form');

iziToast.info({
  title: 'Hello',
  message: 'Welcome!',
  iconUrl: iconBell,
  titleColor: '#fff',
  messageColor: '#fff',
  backgroundColor: '#09f',
  progressBarColor: '#0071bd',
  position: 'topRight',
  timeout: 3000,
});

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const inputDelay = document.querySelector('input[name="delay"]');
  const inputStatus = document.querySelector('input[name="state"]:checked');

  const promiseDelay = Number(inputDelay.value);

  // console.log('Delay:', inputDelay.value ? inputDelay.value : 'None');
  // console.log('State:', inputStatus ? inputStatus.value : 'None');

  if (!inputDelay.value || !inputStatus) {
    iziToast.warning({
      title: 'Caution',
      message: 'You forgot important data, please fill it 🧐',
      iconUrl: iconCaution,
      titleColor: '#fff',
      messageColor: '#fff',
      backgroundColor: '#ffa000',
      progressBarColor: '#bb7b10',
      position: 'topRight',
      timeout: 3000,
    });
    event.currentTarget.reset();
    return;
  }

  if (isNaN(promiseDelay) || promiseDelay <= 0) {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter a valid delay data!🔢',
      iconUrl: iconCaution,
      titleColor: '#fff',
      messageColor: '#fff',
      backgroundColor: '#ffa000',
      progressBarColor: '#bb7b10',
      position: 'topRight',
      timeout: 3000,
    });
    event.currentTarget.reset();
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputStatus.value === 'fulfilled') {
        resolve(promiseDelay);
      } else if (inputStatus.value === 'rejected') {
        reject(promiseDelay);
      }
    }, promiseDelay);
  });

  promise
    .then(resolvedDelay => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${resolvedDelay}ms`,
        iconUrl: iconOk,
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        progressBarColor: '#326101',
        position: 'topRight',
        timeout: 3000,
        // onClosed: function () {
        //   iziToast.question({
        //     title: 'Hello!',
        //     message: 'Do you like it?',
        //     image: img,
        //     iconUrl: iconOk,
        //     titleColor: '#fff',
        //     messageColor: '#fff',
        //     backgroundColor: '#565c72',
        //     progressBarColor: '#00ffb6',
        //     position: 'center',
        //   });
        // },
      });
    })
    .catch(rejectedDelay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${rejectedDelay}ms`,
        iconUrl: iconError,
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        timeout: 3000,
        // onClosed: function () {
        //   iziToast.question({
        //     title: 'Hello!',
        //     message: 'Do you like to retry?',
        //     image: img,
        //     iconUrl: iconOk,
        //     iconColor: '#00ffb6',
        //     titleColor: '#fff',
        //     messageColor: '#fff',
        //     backgroundColor: '#565c72',
        //     progressBarColor: '#00ffb6',
        //     position: 'center',
        //     close: false,
        //   });
        // },
      });
    });
  form.reset();
}
