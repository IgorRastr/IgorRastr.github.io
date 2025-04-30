
// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

//Слайдер
// document.addEventListener('DOMContentLoaded', () => {
//     const slidersMap = new Map();
//     const SLIDE_WIDTH = 300; // Фиксированная ширина слайда
//     const CLONES_COUNT = 4; // Количество клонов в начале и конце

//     function initSlider(slider) {
//         if (slidersMap.has(slider)) return;

//         const sliderTrack = slider.querySelector('.slider');
//         const prevBtn = slider.querySelector('.slider-prev');
//         const nextBtn = slider.querySelector('.slider-next');
//         const slides = slider.querySelectorAll('.slider-slide:not(.clone)');
//         const slideCount = slides.length;
//         let currentIndex = 0;
//         let isFastTransition = false;
//         let isTransitioning = false;

//         // Создаём модальное окно для увеличения фото
//         const modal = document.createElement('div');
//         modal.classList.add('slider-modal');
//         const modalImg = document.createElement('img');
//         const modalClose = document.createElement('slider-modal-button');
//         modalClose.classList.add('slider-modal-close');
//         modalClose.innerHTML = '&times;'; // Символ крестика
//         modal.appendChild(modalImg);
//         modal.appendChild(modalClose);
//         document.body.appendChild(modal);

//         // Закрытие модального окна по клику на крестик
//         modalClose.addEventListener('click', () => {
//             modal.style.display = 'none';
//         });
//         // Закрытие по Escape
//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape') modal.style.display = 'none';
//         });

//         function setupClones() {
//             sliderTrack.querySelectorAll('.clone').forEach(clone => clone.remove());
//             if (slideCount === 0) return;

//             // Добавляем клоны в начало
//             for (let i = 0; i < CLONES_COUNT; i++) {
//                 const cloneIndex = (slideCount - 1 - i + slideCount) % slideCount;
//                 const clone = slides[cloneIndex].cloneNode(true);
//                 clone.classList.add('clone');
//                 sliderTrack.insertBefore(clone, sliderTrack.firstChild);
//             }

//             // Добавляем клоны в конец
//             for (let i = 0; i < CLONES_COUNT; i++) {
//                 const cloneIndex = i % slideCount;
//                 const clone = slides[cloneIndex].cloneNode(true);
//                 clone.classList.add('clone');
//                 sliderTrack.appendChild(clone);
//             }
//         }

//         function updateSlider() {
//             if (slideCount === 0) return;

//             // Корректируем currentIndex
//             if (currentIndex >= slideCount) {
//                 currentIndex = 0;
//                 isFastTransition = true;
//             } else if (currentIndex < 0) {
//                 currentIndex = slideCount - 1;
//                 isFastTransition = true;
//             }

//             const offset = -((currentIndex + CLONES_COUNT) * SLIDE_WIDTH);

//             if (isTransitioning) return;
//             isTransitioning = true;
//             slider.classList.add('slider-container--transitioning');

//             sliderTrack.style.transition = isFastTransition
//                 ? 'transform 0.05s linear'
//                 : 'transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)';
//             sliderTrack.style.transform = `translateX(${offset}px)`;
//             isFastTransition = false;
//         }

//         function nextSlide() {
//             if (isTransitioning) return;
//             if (slideCount === 0) return;

//             currentIndex++;
//             updateSlider();
//         }

//         function prevSlide() {
//             if (isTransitioning) return;
//             if (slideCount === 0) return;

//             currentIndex--;
//             updateSlider();
//         }

//         function bindSliderEvents() {
//             if (!prevBtn || !nextBtn) {
//                 console.error('Slider buttons not found:', { prevBtn, nextBtn });
//                 return;
//             }

//             prevBtn.removeEventListener('click', prevSlide);
//             nextBtn.removeEventListener('click', nextSlide);

//             nextBtn.addEventListener('click', nextSlide, { passive: true });
//             prevBtn.addEventListener('click', prevSlide, { passive: true });

//             sliderTrack.addEventListener('transitionend', () => {
//                 isTransitioning = false;
//                 slider.classList.remove('slider-container--transitioning');
//             }, { passive: true });

//             setTimeout(() => {
//                 if (isTransitioning) {
//                     isTransitioning = false;
//                     slider.classList.remove('slider-container--transitioning');
//                 }
//             }, 600);

//             // Увеличение фото по клику
//             sliderTrack.addEventListener('click', (e) => {
//                 if (e.target.tagName === 'IMG') {
//                     console.log('Image clicked:', e.target.src);
//                     modalImg.src = e.target.src;
//                     modal.style.display = 'flex';
//                 }
//             }, { passive: true });
//         }

//         setupClones();
//         currentIndex = 0;
//         updateSlider();
//         bindSliderEvents();

//         slidersMap.set(slider, { currentIndex, isFastTransition, isTransitioning });
//     }

//     // Переключение вкладок для слайдера
//     const tabs = document.querySelectorAll('.tab-btn');
//     const sliders = document.querySelectorAll('.slider-container');
//     let currentSlider = document.querySelector('.slider-container.active');

//     tabs.forEach(tab => {
//         tab.addEventListener('click', () => {
//             tabs.forEach(t => t.classList.remove('active'));
//             sliders.forEach(s => s.classList.remove('active'));
//             tab.classList.add('active');
//             const sliderId = tab.dataset.tab + '-slider';
//             currentSlider = document.getElementById(sliderId);
//             currentSlider.classList.add('active');
//             initSlider(currentSlider);
//         }, { passive: true });
//     });

//     initSlider(currentSlider);
// });

document.addEventListener('DOMContentLoaded', () => {
    const slidersMap = new Map();
    const SLIDE_WIDTH = 300; // Фиксированная ширина слайда
    const CLONES_COUNT = 4; // Количество клонов в начале и конце

    function initSlider(slider) {
        if (slidersMap.has(slider)) return;

        const sliderTrack = slider.querySelector('.slider');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        const slides = slider.querySelectorAll('.slider-slide:not(.clone)');
        const slideCount = slides.length;
        let currentIndex = 0;
        let isFastTransition = false;
        let isTransitioning = false;

        // Создаём модальное окно для увеличения фото
        const modal = document.createElement('div');
        modal.classList.add('slider-modal');
        const modalImg = document.createElement('img');
        const modalClose = document.createElement('div'); // Используем стандартный <div>
        modalClose.classList.add('slider-modal-close');
        modalClose.innerHTML = '&times;'; // Символ крестика
        modal.appendChild(modalImg);
        modal.appendChild(modalClose);
        document.body.appendChild(modal);

        // Закрытие модального окна по клику на крестик
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') modal.style.display = 'none';
        });

        function setupClones() {
            sliderTrack.querySelectorAll('.clone').forEach(clone => clone.remove());
            if (slideCount === 0) return;

            // Добавляем клоны в начало
            for (let i = 0; i < CLONES_COUNT; i++) {
                const cloneIndex = (slideCount - 1 - i + slideCount) % slideCount;
                const clone = slides[cloneIndex].cloneNode(true);
                clone.classList.add('clone');
                sliderTrack.insertBefore(clone, sliderTrack.firstChild);
            }

            // Добавляем клоны в конец
            for (let i = 0; i < CLONES_COUNT; i++) {
                const cloneIndex = i % slideCount;
                const clone = slides[cloneIndex].cloneNode(true);
                clone.classList.add('clone');
                sliderTrack.appendChild(clone);
            }
        }

        function updateSlider(instant = false) {
            if (slideCount === 0) return;

            // Корректируем currentIndex
            if (currentIndex >= slideCount) {
                currentIndex = 0;
                instant = true;
            } else if (currentIndex < 0) {
                currentIndex = slideCount - 1;
                instant = true;
            }

            const offset = -((currentIndex + CLONES_COUNT) * SLIDE_WIDTH);

            if (isTransitioning) return;
            isTransitioning = true;
            slider.classList.add('slider-container--transitioning');

            sliderTrack.style.transition = instant
                ? 'none'
                : 'transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)';
            sliderTrack.style.transform = `translateX(${offset}px)`;

            if (instant) {
                setTimeout(() => {
                    isTransitioning = false;
                    slider.classList.remove('slider-container--transitioning');
                }, 0);
            }
        }

        function nextSlide() {
            if (isTransitioning || slideCount === 0) return;
            currentIndex++;
            updateSlider();
        }

        function prevSlide() {
            if (isTransitioning || slideCount === 0) return;
            currentIndex--;
            updateSlider();
        }

        function bindSliderEvents() {
            if (!prevBtn || !nextBtn) {
                console.error('Slider buttons not found:', { prevBtn, nextBtn });
                return;
            }

            prevBtn.removeEventListener('click', prevSlide);
            nextBtn.removeEventListener('click', nextSlide);

            nextBtn.addEventListener('click', nextSlide, { passive: true });
            prevBtn.addEventListener('click', prevSlide, { passive: true });

            sliderTrack.addEventListener('transitionend', () => {
                isTransitioning = false;
                slider.classList.remove('slider-container--transitioning');
            }, { passive: true });

            // Увеличение фото по клику
            sliderTrack.addEventListener('click', (e) => {
                if (e.target.tagName === 'IMG') {
                    modalImg.src = e.target.src;
                    modal.style.display = 'flex';
                }
            }, { passive: true });
        }

        setupClones();
        currentIndex = 0;
        updateSlider(true);
        bindSliderEvents();

        slidersMap.set(slider, { currentIndex, isFastTransition, isTransitioning });
    }

    // Переключение вкладок для слайдера
    const tabs = document.querySelectorAll('.tab-btn');
    const sliders = document.querySelectorAll('.slider-container');
    let currentSlider = document.querySelector('.slider-container.active');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            sliders.forEach(s => s.classList.remove('active'));
            tab.classList.add('active');
            const sliderId = tab.dataset.tab + '-slider';
            currentSlider = document.getElementById(sliderId);
            currentSlider.classList.add('active');
            initSlider(currentSlider);
        }, { passive: true });
    });

    initSlider(currentSlider);
});
//Таймер
function startCountdown() {
    const timerUnits = document.querySelectorAll('.timer-unit-text');
    let days = 6, hours = 5, minutes = 54, seconds = 25;

    const countdown = setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        if (hours < 0) {
            hours = 23;
            days--;
        }
        if (days < 0) {
            clearInterval(countdown);
            days = 0; hours = 0; minutes = 0; seconds = 0;
        }

        timerUnits[0].textContent = days;
        timerUnits[1].textContent = hours;
        timerUnits[2].textContent = minutes;
        timerUnits[3].textContent = seconds;
    }, 1000);
}

// Кнопка для перезапуска

document.addEventListener('DOMContentLoaded', startCountdown);

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    const openButtons = document.querySelectorAll('[data-modal-open]');
    const closeButton = document.querySelector('[data-modal-close]');
    const modalForm = modal.querySelector('.modal__form');
    let cleave;

// Открытие модального окна
openButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.classList.add('modal--active');
        document.body.style.overflow = 'hidden';

        // Применяем маску Cleave.js после открытия модального окна
        setTimeout(() => {
            // Уничтожаем предыдущий экземпляр Cleave, если он существует
            if (cleave) {
                cleave.destroy();
            }

            // Создаём новый экземпляр Cleave для поля телефона
            cleave = new Cleave('#modalPhone', {
                prefix: '+7', // Префикс
                delimiters: [' (', ') ', '-'], // Разделители: +7 (999) 999-99-99
                blocks: [2, 3, 3, 2, 2], // Длина блоков: +7 (3 цифры) (3 цифры)-(2 цифры)-(2 цифры)
                numericOnly: true, // Только цифры
                onValueChanged: function (e) {
                    // Можно добавить обработку изменения значения
                    console.log('Значение телефона:', e.target.rawValue);
                }
            });
        }, 0);
    });
});

// Закрытие модального окна
const closeModal = () => {
    modal.classList.remove('modal--active');
    document.body.style.overflow = '';
    // Уничтожаем Cleave при закрытии, чтобы избежать утечек памяти
    if (cleave) {
        cleave.destroy();
        cleave = null;
    }
};

    closeButton.addEventListener('click', closeModal);

    // Закрытие по клику на фон
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Закрытие по Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
            closeModal();
        }
    });

    // Обработка отправки формы (пример)
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = modalForm.querySelector('#modalName').value;
        const phone = modalForm.querySelector('#modalPhone').value;
        console.log('Form submitted:', { name, phone });
        closeModal();
        
    });
});


//Маска для телефона
document.addEventListener('DOMContentLoaded', () => {
    Inputmask({ mask: '+7 (999) 999-99-99' }).mask('#modalPhone');
});


// Инициализация FAQ: только один аккордеон открыт (без изменений)
function initFAQ() {
    const faqList = document.querySelector('.faq__list');
    if (!faqList) return;

    // Делегирование событий на клик и клавиатуру для summary
    faqList.addEventListener('click', handleFAQInteraction);
    faqList.addEventListener('keydown', handleFAQInteraction);

    function handleFAQInteraction(e) {
        const summary = e.target.closest('.faq__question');
        if (!summary) return;

        const currentDetails = summary.parentElement;
        const allDetails = faqList.querySelectorAll('details');

        // Проверяем, является ли событие кликом или нажатием Enter/Space
        const isClick = e.type === 'click';
        const isEnterOrSpace = e.type === 'keydown' && (e.key === 'Enter' || e.key === ' ');
        if (!isClick && !isEnterOrSpace) return;

        // Предотвращаем стандартное поведение для точного контроля
        e.preventDefault();

        // Если текущий аккордеон уже открыт, закрываем его
        if (currentDetails.hasAttribute('open')) {
            currentDetails.removeAttribute('open');
            return;
        }

        // Закрываем все аккордеоны и открываем текущий
        allDetails.forEach(details => {
            details.removeAttribute('open');
        });
        currentDetails.setAttribute('open', '');
    }
}

initFAQ();