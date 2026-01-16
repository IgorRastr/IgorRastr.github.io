window.addEventListener('DOMContentLoaded', () => {

     let modalCleave;
    let countdownCleave;
      // Применяем маску Cleave.js к полю телефона в countdownForm
 document.querySelectorAll('#countdownPhone, #creditPhone, #calcPhone, #testPhone,#carPrice').forEach(input => {
  new Cleave(input, {
    prefix: '+7',
    delimiters: [' (', ') ', '-'],
    blocks: [2, 3, 3, 2, 2],
    numericOnly: true
  });
});
    // Modal
    function bindModal(openBtnSelector, modalSelector, closeBtnSelector, closeClickOverlay = true) {
        const openBtns = document.querySelectorAll(openBtnSelector);
        const modal = document.querySelector(modalSelector);
        const closeBtn = document.querySelectorAll(closeBtnSelector);

        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                modal.classList.add('modal--active');
                document.body.style.overflow = 'hidden';
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

        closeBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('modal--active');
            document.body.style.overflow = '';
            if (modalCleave) {
            modalCleave.destroy();
            modalCleave = null;
            }
        });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                modal.classList.remove('modal--active');
                document.body.style.overflow = '';
            }
        });
    }

    bindModal('[data-modal-open]', '.modal', '.modal__close');
    bindModal('.complects__btn--red', '.modal', '.modal__close');
    bindModal('.btn--white', '.modal', '.modal__close');
    bindModal('.complects__btn--white', '.modal', '.modal__close');
    bindModal('.cars_content_profit_text', '.modal', '.modal__close');
    bindModal('.cars_content_profit_text2', '.modal', '.modal__close');
    bindModal(null, '#successModal', '.modal__close');


        /////Slider
const swiper = new Swiper('.complects-swiper', {
  
  slidesPerView: 4,              // ← КЛЮЧ: 4 карточки на десктопе
  spaceBetween: 15,
  centerMode: false,             // ← КЛЮЧ: НЕ показывать куски соседних слайдов
  centeredSlides: false,         // ← тоже выключить, если включено
  loop: false,                   // ← если включён loop — тоже может показывать куски
  watchOverflow: true,
               
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
breakpoints: {
    // Сначала маленькие экраны
    320: {
      slidesPerView: 1,
    },    
    530: {
      slidesPerView: 1,
      
      spaceBetween: 20
    },
    768: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 3
    },
    1200: {
      slidesPerView: 4
    }
  }
});
    
  
//  TABS
// Complectations tabs

  const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
        const header = document.querySelector(headerSelector),
                tab = document.querySelectorAll(tabSelector),
            content = document.querySelectorAll(contentSelector);

            function hideTabContent() {
              content.forEach(item => item.classList.remove(activeClass));
              tab.forEach(item => item.classList.remove(activeClass));
            }

            function showTabContent(i = 0) {
               
              content[i].classList.add(activeClass);
              tab[i].classList.add(activeClass);
            }

            hideTabContent();
            showTabContent();

            header.addEventListener('click', (e) => {
                const target = e.target;
                if (target.classList.contains(tabSelector.replace(/\./, "")) || 
                target.parentNode.classList.contains(tabSelector.replace(/\./, ""))) {
                    tab.forEach((item, i) => {
                        if (target == item || target.parentNode == item)  {
                            hideTabContent();
                            showTabContent(i);
                        } 
                    });
                }
            });
    }
  tabs('.complects_tab', '.complects_tab_item', '.complects_models', 'active');




// Models tabs

  const colorTabs = () => {
    // Находим все блоки с выбором цвета (если их несколько — T4, T7, T8)
    const colorBlocks = document.querySelectorAll('.cars_content_img');

    colorBlocks.forEach(block => {
      const dots = block.querySelectorAll('.cars_content_color_dot');
      const images = block.querySelectorAll('.cars_content_img_color');

      function showColor(color) {
        // Скрываем все изображения и снимаем active с точек
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Показываем нужное
        images.forEach(img => {
          if (img.dataset.color === color) {
            img.classList.add('active');
          }
        });
        dots.forEach(dot => {
          if (dot.dataset.color === color) {
            dot.classList.add('active');
          }
        });
      }

      // Показываем первый цвет при загрузке
      const firstDot = dots[0];
      if (firstDot) {
        showColor(firstDot.dataset.color);
      }

      // Клик по точке
      block.addEventListener('click', (e) => {
        const dot = e.target.closest('.cars_content_color_dot');
        if (!dot) return;

        const color = dot.dataset.color;
        if (color) {
          showColor(color);
        }
      });
    });
  };

  colorTabs();

 



//  Fancybox gallery


  Fancybox.bind("[data-fancybox]", {
    // Настройки (опционально)
    Thumbs: {
      autoStart: true,     // включены
      type: "classic",     // обычные миниатюры
      showOnStart: true,
      // Не обрезаем миниатюры    // миниатюры снизу — выключены
    },
    Toolbar: {
      display: {
        left: ["infobar"],
        // middle: [
        //   "zoomIn",
        //   "zoomOut",
        //   "toggle1to1",
        //   "rotateCCW",
        //   "rotateCW",
        //   "flipX",
        //   "flipY",
        // ],
        right: ["slideshow", "thumbs", "close"],
      },
    },
    Images: {
      zoom: true,
      Panzoom: {
        maxScale: 3,
      },
    },
    // Анимация
    animated: true,
    // Автостарт слайдшоу — выключен
    slideshow: { autoStart: false },
  });

// Timer
function startCountdown() {
    const timerUnits = document.querySelectorAll('.timer-unit-text');
    let targetDate = getNextMonday();

    function getNextMonday() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = воскресенье, 1 = понедельник, ..., 6 = суббота
        let daysUntilNextMonday = (8 - dayOfWeek) % 7; // Дни до следующего понедельника

        // Если сегодня понедельник и время уже прошло 00:00, переходим к следующему
        if (dayOfWeek === 1 && now.getHours() >= 0) {
            daysUntilNextMonday = 7; // Следующий понедельник
        }

        const nextMonday = new Date(now);
        nextMonday.setDate(now.getDate() + daysUntilNextMonday);
        nextMonday.setHours(0, 0, 0, 0); // Устанавливаем начало дня

        // Если nextMonday уже прошёл (из-за часового пояса), добавляем ещё неделю
        if (nextMonday <= now) {
            nextMonday.setDate(nextMonday.getDate() + 7);
        }

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

        // Убеждаемся, что значения не отрицательные
        timerUnits[0].textContent = String(Math.max(0, days)).padStart(2, '0');
        timerUnits[1].textContent = String(Math.max(0, hours)).padStart(2, '0');
        timerUnits[2].textContent = String(Math.max(0, minutes)).padStart(2, '0');
        timerUnits[3].textContent = String(Math.max(0, seconds)).padStart(2, '0');
    }

    // Обновляем таймер каждую секунду
    const countdown = setInterval(updateCountdown, 1000);
    // Вызываем сразу при загрузке для мгновенного отображения
    updateCountdown();
}startCountdown();

// Отправка форм
  // Универсальная отправка формы
  const sendForm = (formSelector, onSuccess = null) => {
    const form = document.querySelector(formSelector);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Получаем "чистый" номер телефона
      let phone = '';
      const phoneInput = form.querySelector('input[name="phone"]');
      if (phoneInput) {
        // Если есть Cleave — берём сырое значение, иначе — чистим вручную
        const cleave = phoneInput._cleave || null;
        phone = cleave ? cleave.getRawValue() : phoneInput.value.replace(/\D/g, '');
      }

      // Валидация: российский номер — 11 цифр (7XXXXXXXXXX)
      if (phone.length !== 11) {
        alert('Пожалуйста, введите корректный номер телефона (11 цифр).');
        return;
      }

      const formData = new FormData(form);

      try {
        const response = await fetch('mailer/smart.php', {
          method: 'POST',
          body: formData
        });

        const text = await response.text();

        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error('Некорректный ответ от сервера');
        }

        if (data.success) {
          // Яндекс.Метрика
          if (typeof ym !== 'undefined') {
            ym(103340760, 'reachGoal', 'sendform');
          }

          // Успех
          form.reset();
          if (onSuccess) onSuccess();

          // Показываем модалку успеха (если есть)
          const successModal = document.getElementById('successModal');
          if (successModal) {
            successModal.classList.add('modal--active');
          }
        } else {
          alert(data.message || 'Ошибка отправки формы');
        }
      } catch (error) {
        console.error('Ошибка отправки:', error);
        alert('Произошла ошибка при отправке. Попробуйте позже.');
      }
    });
  };

  // Применяем ко всем формам
  sendForm('#modalForm', () => {
    const modal = document.getElementById('contactModal');
    if (modal) modal.classList.remove('modal--active');
  });

  sendForm('#countdownForm'); // если есть такая форма
  sendForm('#creditForm'); 
  sendForm('#TRADEINForm'); 
  sendForm('#testdriveForm'); 
   sendForm('#calcForm'); 


  // Инициализация полузнков


 
  const downpaymentRange = document.getElementById('downpayment');
  const downpaymentValue = document.getElementById('downpayment-value');

  
  const termRange = document.getElementById('term');
  const termValue = document.getElementById('term-value');

  
  downpaymentRange.addEventListener('input', () => {
    downpaymentValue.textContent = downpaymentRange.value + '%';
  });

  termRange.addEventListener('input', () => {
    termValue.textContent = termRange.value + ' мес.';
  });

 
  downpaymentValue.textContent = downpaymentRange.value + '%';
  termValue.textContent = termRange.value + ' мес.';


  // Cookie Notice



  const notice = document.getElementById('cookie-notice');
  const acceptBtn = document.getElementById('cookie-accept');

  // Ключ в localStorage (срок жизни — 365 дней)
  const COOKIE_KEY = 'cookie_accepted';
  const ONE_YEAR = 365 * 24 * 60 * 60 * 1000; 

  
  const accepted = localStorage.getItem(COOKIE_KEY);
  const now = Date.now();


  if (!accepted || now - parseInt(accepted) > ONE_YEAR) {
    setTimeout(() => {
      notice.classList.add('show');
    }, 2000); 
  }

 
  acceptBtn.addEventListener('click', () => {
    // Сохраняем согласие с текущей датой
    localStorage.setItem(COOKIE_KEY, Date.now().toString());

   
    notice.style.opacity = '0';
    notice.style.transform = 'translateY(100%)';
    setTimeout(() => notice.remove(), 500); 
  });
});














