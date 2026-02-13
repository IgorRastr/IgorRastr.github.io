window.addEventListener('DOMContentLoaded', () => {

    // Автоматическая установка даты на следующий понедельник
    function getNextMonday() {
        const today = new Date();
        const dayOfWeek = today.getDay(); 
        
        
        let daysUntilMonday;
        if (dayOfWeek === 1) {
            
            daysUntilMonday = 7;
        } else if (dayOfWeek === 0) {
            
            daysUntilMonday = 1;
        } else {
            
            daysUntilMonday = 8 - dayOfWeek;
        }
        
        const nextMonday = new Date(today);
        nextMonday.setDate(today.getDate() + daysUntilMonday);
        
        const day = String(nextMonday.getDate()).padStart(2, '0');
        const month = String(nextMonday.getMonth() + 1).padStart(2, '0');
        return `${day}.${month}`;
    }

    // Устанавливаем дату дедлайна
    const deadlineElement = document.getElementById('deadline-date');
    if (deadlineElement) {
        deadlineElement.textContent = getNextMonday();
    }





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
  
  slidesPerView: 4,             
  spaceBetween: 15,
  centerMode: false,             
  centeredSlides: false,         
  loop: false,                   
  watchOverflow: true,
               
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
breakpoints: {
   
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
    
    const colorBlocks = document.querySelectorAll('.cars_content_img');

    colorBlocks.forEach(block => {
      const dots = block.querySelectorAll('.cars_content_color_dot');
      const images = block.querySelectorAll('.cars_content_img_color');

      function showColor(color) {
        
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        
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

      
      const firstDot = dots[0];
      if (firstDot) {
        showColor(firstDot.dataset.color);
      }

     
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
   
    Thumbs: {
      autoStart: true,     
      type: "classic",     
      showOnStart: true,
      
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
   
    animated: true,
    
    slideshow: { autoStart: false },
  });

// Timer
function startCountdown() {
    const timerUnits = document.querySelectorAll('.timer-unit-text');
    let targetDate = getNextMonday();

    function getNextMonday() {
        const now = new Date();
        const dayOfWeek = now.getDay(); 
        let daysUntilNextMonday = (8 - dayOfWeek) % 7; 

       
        if (dayOfWeek === 1 && now.getHours() >= 0) {
            daysUntilNextMonday = 7; 
        }

        const nextMonday = new Date(now);
        nextMonday.setDate(now.getDate() + daysUntilNextMonday);
        nextMonday.setHours(0, 0, 0, 0); 

        
        if (nextMonday <= now) {
            nextMonday.setDate(nextMonday.getDate() + 7);
        }

        return nextMonday;
    }

    function updateCountdown() {
        const now = new Date();
        let diff = Math.floor((targetDate - now) / 1000); 

        if (diff <= 0) {
            
            targetDate = getNextMonday();
            diff = Math.floor((targetDate - now) / 1000);
        }

        const days = Math.floor(diff / (24 * 3600));
        diff %= (24 * 3600);
        const hours = Math.floor(diff / 3600);
        diff %= 3600;
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;

        
        timerUnits[0].textContent = String(Math.max(0, days)).padStart(2, '0');
        timerUnits[1].textContent = String(Math.max(0, hours)).padStart(2, '0');
        timerUnits[2].textContent = String(Math.max(0, minutes)).padStart(2, '0');
        timerUnits[3].textContent = String(Math.max(0, seconds)).padStart(2, '0');
    }

    
    const countdown = setInterval(updateCountdown, 1000);
    
    updateCountdown();
}startCountdown();

// Отправка форм
  // Универсальная отправка формы
  const sendForm = (formSelector, onSuccess = null) => {
    const form = document.querySelector(formSelector);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      
      let phone = '';
      const phoneInput = form.querySelector('input[name="phone"]');
      if (phoneInput) {
        
        const cleave = phoneInput._cleave || null;
        phone = cleave ? cleave.getRawValue() : phoneInput.value.replace(/\D/g, '');
      }

      
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

         
          form.reset();
          if (onSuccess) onSuccess();

          
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

  
  sendForm('#modalForm', () => {
    const modal = document.getElementById('contactModal');
    if (modal) modal.classList.remove('modal--active');
  });

  sendForm('#countdownForm'); 
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
    
    localStorage.setItem(COOKIE_KEY, Date.now().toString());

   
    notice.style.opacity = '0';
    notice.style.transform = 'translateY(100%)';
    setTimeout(() => notice.remove(), 500); 
  });
});














