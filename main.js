const tipoffTime = new Date('2026-12-28T01:30:00Z').getTime();

const slides = [
    { file: 'images/curry.jpg', caption: 'Stephen Curry · Golden State Warriors' },
    { file: 'images/edwards.jpg', caption: 'Anthony Edwards · Minnesota Timberwolves' },
    { file: 'images/draymond.jpg', caption: 'Draymond Green · Golden State Warriors' },
    { file: 'images/bridge.jpg', caption: 'Golden Gate Bridge · San Francisco' },
    { file: 'images/lamelo.jpg', caption: 'LaMelo Ball' },
    { file: 'images/gobert.jpg', caption: 'Rudy Gobert · Minnesota Timberwolves' },
    { file: 'images/butler.jpg', caption: 'Jimmy Butler · Golden State Warriors' }
];

const slideDuration = 6000;
const slideshowElement = document.getElementById('slideshow');
const captionElement = document.getElementById('captionText');
const dotsElement = document.getElementById('dots');
let currentSlideIndex = 0;
let slideTimer = null;

const slideElements = slides.map((slide, slideIndex) => {
    const slideElement = document.createElement('div');
    slideElement.className = 'slide';
    const blurLayer = document.createElement('div');
    blurLayer.className = 'slide-blur';
    const fitLayer = document.createElement('div');
    fitLayer.className = 'slide-fit';
    slideElement.appendChild(blurLayer);
    slideElement.appendChild(fitLayer);
    slideshowElement.appendChild(slideElement);

    const dotButton = document.createElement('button');
    dotButton.setAttribute('aria-label', `Show photo of ${slide.caption}`);
    dotButton.addEventListener('click', () => {
        showSlide(slideIndex);
        restartSlideTimer();
    });
    dotsElement.appendChild(dotButton);

    return slideElement;
});

function loadSlideImage(slideIndex) {
    const slideElement = slideElements[slideIndex];
    const imageUrl = `url("${slides[slideIndex].file}")`;
    slideElement.querySelectorAll('div').forEach((layerElement) => {
        if (!layerElement.style.backgroundImage) {
            layerElement.style.backgroundImage = imageUrl;
        }
    });
}

function showSlide(slideIndex) {
    currentSlideIndex = slideIndex;
    loadSlideImage(slideIndex);
    loadSlideImage((slideIndex + 1) % slides.length);

    slideElements.forEach((slideElement, elementIndex) => {
        slideElement.classList.toggle('active', elementIndex === slideIndex);
    });
    dotsElement.querySelectorAll('button').forEach((dotButton, dotIndex) => {
        dotButton.classList.toggle('on', dotIndex === slideIndex);
    });
    captionElement.textContent = slides[slideIndex].caption;
}

function restartSlideTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
        showSlide((currentSlideIndex + 1) % slides.length);
    }, slideDuration);
}

showSlide(0);
restartSlideTimer();

const dayValue = document.getElementById('dayValue').firstElementChild;
const hourValue = document.getElementById('hourValue').firstElementChild;
const minuteValue = document.getElementById('minuteValue').firstElementChild;
const secondValue = document.getElementById('secondValue').firstElementChild;
const clockElement = document.getElementById('clock');
const taglineElement = document.getElementById('tagline');

function setValue(valueElement, newText) {
    if (valueElement.textContent !== newText) {
        valueElement.textContent = newText;
        valueElement.classList.remove('tick');
        void valueElement.offsetWidth;
        valueElement.classList.add('tick');
    }
}

function updateCountdown() {
    const timeLeft = tipoffTime - Date.now();

    if (timeLeft <= 0) {
        setValue(dayValue, '000');
        setValue(hourValue, '00');
        setValue(minuteValue, '00');
        setValue(secondValue, '00');
        clockElement.classList.add('final');
        taglineElement.textContent = 'Tipoff! Warriors and Timberwolves are live from Chase Center';
        return;
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    setValue(dayValue, String(Math.floor(timeLeft / day)).padStart(3, '0'));
    setValue(hourValue, String(Math.floor((timeLeft % day) / hour)).padStart(2, '0'));
    setValue(minuteValue, String(Math.floor((timeLeft % hour) / minute)).padStart(2, '0'));
    setValue(secondValue, String(Math.floor((timeLeft % minute) / second)).padStart(2, '0'));
}

updateCountdown();
setInterval(updateCountdown, 1000);

const creditsToggle = document.getElementById('creditsToggle');
const creditsPanel = document.getElementById('creditsPanel');
const creditsClose = document.getElementById('creditsClose');

creditsToggle.addEventListener('click', (event) => {
    event.preventDefault();
    creditsPanel.classList.toggle('open');
});

creditsClose.addEventListener('click', () => {
    creditsPanel.classList.remove('open');
});
