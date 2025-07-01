
// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Слайдер
// Слайдер
document.addEventListener('DOMContentLoaded', () => {
    const SLIDE_WIDTH = 300; // Фиксированная ширина слайда
    const CLONES_COUNT = 4; // Количество клонов в начале и конце

    function initSlider(slider) {
        if (slider.dataset.initialized === 'true') return; // Проверка на повторную инициализацию

        const sliderTrack = slider.querySelector('.slider'); // Один трек на слайдер
        const prevBtn = slider.querySelector('.slider-prev'); // Одна кнопка "назад"
        const nextBtn = slider.querySelector('.slider-next'); // Одна кнопка "вперёд"
        const slides = slider.querySelectorAll('.slider-slide:not(.clone)');
        const slideCount = slides.length;
        let currentIndex = 0;
        let isTransitioning = false;

        // Создаём уникальное модальное окно для каждого слайдера
        const modal = document.createElement('div');
        modal.classList.add('slider-modal');
        const modalImg = document.createElement('img');
        const modalClose = document.createElement('div');
        modalClose.classList.add('slider-modal-close');
        modalClose.innerHTML = '×';
        modal.appendChild(modalImg);
        modal.appendChild(modalClose);
        slider.appendChild(modal); // Привязываем модалку к конкретному слайдеру

        // Закрытие модального окна
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });

        function setupClones() {
            sliderTrack.querySelectorAll('.clone').forEach(clone => clone.remove());
            if (slideCount === 0) return;

            for (let i = 0; i < CLONES_COUNT; i++) {
                const cloneIndex = (slideCount - 1 - i + slideCount) % slideCount;
                const clone = slides[cloneIndex].cloneNode(true);
                clone.classList.add('clone');
                sliderTrack.insertBefore(clone, sliderTrack.firstChild);
            }

            for (let i = 0; i < CLONES_COUNT; i++) {
                const cloneIndex = i % slideCount;
                const clone = slides[cloneIndex].cloneNode(true);
                clone.classList.add('clone');
                sliderTrack.appendChild(clone);
            }
        }

        function updateSlider(instant = false) {
            if (slideCount === 0) return;

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
                console.error('Slider buttons not found for slider:', slider, { prevBtn, nextBtn });
                return;
            }

            prevBtn.addEventListener('click', prevSlide, { passive: true });
            nextBtn.addEventListener('click', nextSlide, { passive: true });

            sliderTrack.addEventListener('transitionend', () => {
                isTransitioning = false;
                slider.classList.remove('slider-container--transitioning');
            }, { passive: true });

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
        slider.dataset.initialized = 'true'; // Отмечаем слайдер как инициализированный
    }

    // Инициализация всех слайдеров при загрузке
     const sliders = document.querySelectorAll('.gallery .slider-container, .gallery1 .slider-container');
    sliders.forEach(slider => {
        if (slider.classList.contains('active')) {
            initSlider(slider);
        }
    });

    // Обработка переключения вкладок
    const gallery = document.querySelector('#gallery');
    if (gallery) {
        const tabs = gallery.querySelectorAll('.gallery-tabs .tab-btn');
        const gallerySliders = gallery.querySelectorAll('.slider-container');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Удаляем класс active у всех табов и слайдеров в секции #gallery
                tabs.forEach(t => t.classList.remove('active'));
                gallerySliders.forEach(s => s.classList.remove('active'));

                // Добавляем класс active для текущего таба
                tab.classList.add('active');

                // Находим соответствующий слайдер
                const sliderId = tab.dataset.tab + '-slider';
                const currentSlider = gallery.querySelector(`#${sliderId}`);

                if (currentSlider) {
                    currentSlider.classList.add('active');
                    initSlider(currentSlider);
                }
            }, { passive: true });
        });
    }
});

// ////Табы характеристики
document.addEventListener('DOMContentLoaded', () => {
    const specsSection = document.querySelector('#specs');
    if (specsSection) {
        const specTabs = specsSection.querySelectorAll('.spec-tab-btn');
        const specGalleries = specsSection.querySelectorAll('.specs-gallery');

        if (specTabs.length > 0 && specGalleries.length > 0) {
            specTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Удаляем active у всех табов и галерей
                    specTabs.forEach(t => t.classList.remove('active'));
                    specGalleries.forEach(g => g.classList.remove('active'));

                    // Добавляем active только к выбранному табу
                    tab.classList.add('active');

                    // Находим соответствующую галерею по data-tab
                    const tabName = tab.dataset.tab;
                    specGalleries.forEach(gallery => {
                        if (gallery.dataset.tab === tabName) {
                            gallery.classList.add('active');
                        }
                    });
                }, { passive: true });
            });
        }
    }
});




// Таймер
function startCountdown() {
    const timerUnits = document.querySelectorAll('.timer-unit-text');
    let targetDate = getNextMonday();

    function getNextMonday() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = воскресенье, 1 = понедельник, ..., 6 = суббота
        const daysUntilNextMonday = (8 - dayOfWeek) % 7; // Считаем дни до следующего понедельника
        const nextMonday = new Date(now);
        nextMonday.setDate(now.getDate() + daysUntilNextMonday);
        nextMonday.setHours(0, 0, 0, 0); // Устанавливаем начало дня
        return nextMonday;
    }

    function updateCountdown() {
        const now = new Date();
        let diff = Math.floor((targetDate - now) / 1000); // Разница в секундах

        if (diff <= 0) {
            // Если время истекло, переключаемся на следующий понедельник
            targetDate = getNextMonday();
            diff = Math.floor((targetDate - now) / 1000);
        }

        const days = Math.floor(diff / (24 * 3600));
        diff %= (24 * 3600);
        const hours = Math.floor(diff / 3600);
        diff %= 3600;
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;

        timerUnits[0].textContent = days;
        timerUnits[1].textContent = hours;
        timerUnits[2].textContent = minutes;
        timerUnits[3].textContent = seconds;
    }

    // Обновляем таймер каждую секунду
    const countdown = setInterval(updateCountdown, 1000);
    // Вызываем сразу при загрузке для мгновенного отображения
    updateCountdown();
}

document.addEventListener('DOMContentLoaded', startCountdown);

// Модальные окна и отправка формы
document.addEventListener('DOMContentLoaded', () => {
    console.log('Скрипт инициализируется...');

    const contactModal = document.getElementById('contactModal');
    const successModal = document.getElementById('successModal');
    const modalForm = document.getElementById('modalForm');
    const countdownForm = document.getElementById('countdownForm');
    const openButtons = document.querySelectorAll('[data-modal-open]');
    const closeButtons = document.querySelectorAll('[data-modal-close]');
    let modalCleave;
    let countdownCleave;

    // Проверка, что элементы найдены
    if (!contactModal || !successModal || !modalForm || !countdownForm) {
        console.error('Не найдены элементы:', {
            contactModal,
            successModal,
            modalForm,
            countdownForm
        });
        return;
    }

    console.log('countdownForm найден:', countdownForm);

    // Функция закрытия модального окна
    const closeModal = (modal) => {
        modal.classList.remove('modal--active');
        document.body.style.overflow = '';
        if (modalCleave) {
            modalCleave.destroy();
            modalCleave = null;
        }
    };

    // Открытие модального окна
    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            contactModal.classList.add('modal--active');
            document.body.style.overflow = 'hidden';

            // Применяем маску Cleave.js после открытия модального окна
            setTimeout(() => {
                if (modalCleave) modalCleave.destroy();
                modalCleave = new Cleave('#modalPhone', {
                    prefix: '+7',
                    delimiters: [' (', ') ', '-'],
                    blocks: [2, 3, 3, 2, 2],
                    numericOnly: true
                });
            }, 0);
        });
    });

    // Закрытие модальных окон
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(contactModal);
            closeModal(successModal);
        });
    });

    // Закрытие по клику на фон
    [contactModal, successModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // Закрытие по Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(contactModal);
            closeModal(successModal);
        }
    });

    // Применяем маску Cleave.js к полю телефона в countdownForm
    countdownCleave = new Cleave('#countdownPhone', {
        prefix: '+7',
        delimiters: [' (', ') ', '-'],
        blocks: [2, 3, 3, 2, 2],
        numericOnly: true
    });

    // Функция отправки формы через AJAX
    const handleFormSubmit = (form, onSuccess) => {
        console.log('Добавляем обработчик submit для формы:', form.id);
        if (!form) {
            console.error('Форма не найдена:', form);
            return;
        }
        form.addEventListener('submit', (e) => {
            console.log('Событие submit сработало для формы:', form.id);
            e.preventDefault();

            const formData = new FormData(form);
            console.log('Form data:', Object.fromEntries(formData));

            fetch('mailer/smart.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text(); // Сначала получаем текст ответа
            })
            .then(text => {
                console.log('Raw response text:', text);
                // Пробуем распарсить как JSON
                try {
                    const data = JSON.parse(text);
                    console.log('Parsed response data:', data);
                    if (data.success) {
                        if (onSuccess) onSuccess();
                        successModal.classList.add('modal--active');
                        form.reset();
                        if (countdownCleave) countdownCleave.setRawValue('');
                    } else {
                        console.error('Ошибка отправки:', data.message);
                    }
                } catch (jsonError) {
                    console.error('Ошибка парсинга JSON:', jsonError, 'Raw text:', text);
                    throw new Error('Response is not valid JSON');
                }
            })
            .catch(error => {
                console.error('Ошибка при отправке формы:', error);
            });
        });
    };

    // Обработка отправки формы из модального окна
    handleFormSubmit(modalForm, () => closeModal(contactModal));

    // Обработка отправки формы countdownForm
    handleFormSubmit(countdownForm);
});

// Инициализация FAQ
function initFAQ() {
    const faqList = document.querySelector('.faq__list');
    if (!faqList) return;

    faqList.addEventListener('click', handleFAQInteraction);
    faqList.addEventListener('keydown', handleFAQInteraction);

    function handleFAQInteraction(e) {
        const summary = e.target.closest('.faq__question');
        if (!summary) return;

        const currentDetails = summary.parentElement;
        const allDetails = faqList.querySelectorAll('details');

        const isClick = e.type === 'click';
        const isEnterOrSpace = e.type === 'keydown' && (e.key === 'Enter' || e.key === ' ');
        if (!isClick && !isEnterOrSpace) return;

        e.preventDefault();

        if (currentDetails.hasAttribute('open')) {
            currentDetails.removeAttribute('open');
            return;
        }

        allDetails.forEach(details => details.removeAttribute('open'));
        currentDetails.setAttribute('open', '');
    }
}

initFAQ();