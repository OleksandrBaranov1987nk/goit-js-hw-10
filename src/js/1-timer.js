import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const inputfield = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

let userSelectedDate = 0;


startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    inputfield.disabled = true;
    const timerID = setInterval(() => {
        const countDown = userSelectedDate - Date.now();
        if (countDown < 0) {
            clearInterval(timerID);
            inputfield.disabled = false;
            
        } else {
            timer(convertMs(countDown));
        }
    }, 1000);

});

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date();
        if (selectedDates[0] - currentDate > 0) {
          startBtn.disabled = false;
        } else {
          startBtn.disabled = true;
    
          iziToast.error({
            message: 'Please choose a date in the future!',
            position: 'topCenter', 
            backgroundColor: '#ef4040',  
            titleColor: '#FFFFFF',
            messageColor: '#FFFFFF',
            theme: 'dark',
          });
        }
        userSelectedDate = selectedDates[0];
      },
  };

  

  flatpickr('#datetime-picker', options);

  function timer({days, hours, minutes, seconds}) {
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, 0);
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
