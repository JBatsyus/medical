const lenis = new Lenis({
    // Длительность анимации прокрутки (в секундах).
    // Чем больше значение — тем медленнее и плавнее скролл.
    duration: 1.2,

    // Коэффициент интерполяции (lerp = linear interpolation).
    // Значение от 0 до 1:
    // - 0.1 = очень плавно, но с "инерцией"
    // - 0.5 = баланс между плавностью и отзывчивостью
    // - 1 = мгновенная прокрутка (без сглаживания)
    lerp: 0.5,

    // Направление прокрутки: 
    // 'vertical' — вертикальная (по умолчанию),
    // 'horizontal' — горизонтальная,
    // 'both' — оба направления (требует особой разметки)
    direction: 'vertical',

    // Направление жестов (для touch-устройств и трекпада):
    // 'vertical' — только вертикальные свайпы
    // 'horizontal' — только горизонтальные
    // 'both' — любые жесты
    // Полезно, чтобы избежать конфликтов с каруселями и слайдерами
    gestureDirection: 'vertical',

    // Включает плавную прокрутку при использовании колеса мыши
    smoothWheel: true,

    // Множитель скорости прокрутки колёсиком мыши.
    // Значение 1 = стандартная скорость.
    // Увеличение (>1) делает скролл быстрее, уменьшение (<1) — медленнее.
    wheelMultiplier: 1,

    // Множитель чувствительности для сенсорных экранов (свайпы).
    // Значение 2 = прокрутка в 2 раза дальше за тот же свайп.
    // Полезно для компенсации "тяжёлости" сенсорного скролла.
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);



// МОБИЛЬНОЕ МЕНЮ
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.menu-mob');
const body = document.body;

// 1. Логика открытия/закрытия бургера
if (burger && menu) {
    burger.addEventListener('click', () => {
        const isActive = burger.classList.toggle('active');
        menu.classList.toggle('active');
        body.classList.toggle('no-scroll', isActive);
    });

    // 2. Логика клика по ссылкам (включая скролл)
    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            lenis.start();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault(); // Убираем хеш из URL и отменяем прыжок

                // Закрываем мобильное меню, если клик был в нем
                burger.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('no-scroll');

                // Плавный скролл с учетом высоты шапки
                const headerHeight = document.querySelector('.header').offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

        });
    });
}



$(document).ready(function () {

    var beforeAfterSwiper = new Swiper('.before-after__swiper', {
        loop: true,
        speed: 600,
        slidesPerView: 1.1,
        spaceBetween: 16,
        // Важно: отключаем стандартную блокировку касаний, 
        // чтобы TwentyTwenty мог перехватить событие
        touchStartPreventDefault: false,

        breakpoints: {
            576: {
                slidesPerView: 1.1,
                spaceBetween: 16
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            },
        },

        navigation: {
            prevEl: '.before-after__nav--prev',
            nextEl: '.before-after__nav--next',
        },

        pagination: {
            el: '.before-after__pagination',
            clickable: true,
        },

        on: {
            init: function () {
                // 2. Инициализируем TwentyTwenty внутри слайдов
                $(".twentytwenty-container").twentytwenty({
                    default_offset_pct: 0.5,
                    orientation: 'horizontal',
                    before_label: 'Было',
                    after_label: 'Стало',
                    no_overlay: false, // показывать надписи "before/after"
                    move_with_handle_only: true, // движение только за ручку
                    click_to_move: false
                });
            },
        }
    });

    // 3. Блокируем перелистывание слайдов Swiper, когда тянем ползунок
    // Используем делегирование событий, так как ползунки создаются динамически
    $(document).on("mousedown touchstart", ".twentytwenty-handle", function () {
        beforeAfterSwiper.allowTouchMove = false;
    });

    $(document).on("mouseup touchend", function () {
        beforeAfterSwiper.allowTouchMove = true;
    });
});
const heroSwiper = new Swiper('.hero-slider__swiper', {
    loop: true,
    effect: "fade",
    fadeEffect: {
        crossFade: true
    },
    // speed: 1000,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    navigation: {
        prevEl: '.slider__nav--prev',
        nextEl: '.slider__nav--next',
    },
    pagination: {
        el: '.hero-slider__pagination',
        clickable: true,
    },
});

const specialOffersSwiper = new Swiper('.special-offers__swiper', {
    loop: true,
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 20,

    // Адаптивность
    breakpoints: {
        576: {
            slidesPerView: 1.5,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },

    navigation: {
        prevEl: '.special-offers__nav--prev',
        nextEl: '.special-offers__nav--next',
    },
    pagination: {
        el: '.special-offers__pagination',
        clickable: true,
        type: 'bullets',
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
    },

});

const doctorsSwiper = new Swiper('.doctors__swiper', {
    loop: true,
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 20,

    breakpoints: {
        576: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },

    navigation: {
        prevEl: '.doctors__nav--prev',
        nextEl: '.doctors__nav--next',
    },

    pagination: {
        el: '.doctors__pagination',
        clickable: true,
    },
});



document.addEventListener('DOMContentLoaded', function () {
    // выпадающий список социальных сетей

   
    const socialDropdowns = document.querySelectorAll('.social-dropdown');

    socialDropdowns.forEach(dropdown => {
       const toggle = dropdown.querySelector('.social-dropdown__toggle');

        toggle.addEventListener('click', (event) => {
            event.stopPropagation();

            socialDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('open');
                    otherDropdown.querySelector('.social-dropdown__toggle').setAttribute('aria-expanded', 'false');
                }
            });

            const isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
        });
    });

   
    document.addEventListener('click', () => {
        socialDropdowns.forEach(dropdown => {
            dropdown.classList.remove('open');
            const toggle = dropdown.querySelector('.social-dropdown__toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    });


    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceItems = document.querySelectorAll('.service-item');
    let currentSwiper = null;


    function initSwiper() {
        if (currentSwiper) {
            currentSwiper.destroy(true, true);
        }

        currentSwiper = new Swiper('.services__swiper', {
            loop: true,
            speed: 600,
            slidesPerView: 1,
            spaceBetween: 20,
            // pagination: {
            //     el: '.services__pagination',
            //     clickable: true,
            // },
            navigation: {
                prevEl: '.services__nav--prev',
                nextEl: '.services__nav--next',
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 16
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 16
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },

            }
        });
    }

    // Фильтрация карточек
    function filterServices(category) {
        serviceItems.forEach(item => {
            const categories = item.getAttribute('data-category').split(' ');
            if (category === 'all' || categories.includes(category)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Обновляем Swiper
        requestAnimationFrame(() => {
            if (currentSwiper) {
                currentSwiper.update();
            }
        });
    }

    // Обработчики фильтров
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-filter');

            // Обновляем активную кнопку
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            // Фильтруем карточки
            filterServices(category);
        });
    });

    // Инициализация при загрузке
    initSwiper();
    filterServices('all');



});

// Свайпер в секции О нашей клинике
var swiperBullet = new Swiper(".about-clinic__swiper-bullet", {
    spaceBetween: 16,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        576: {
            slidesPerView: 4,
            spaceBetween: 16
        },
        768: {
            slidesPerView: 6,
            spaceBetween: 16
        },
    }

});
var swiperBase = new Swiper(".about-clinic__swiper-base", {
    spaceBetween: 10,

    thumbs: {
        swiper: swiperBullet,
    },
});

// Свайпер в модальном окне

var swiperBulletModal = new Swiper(".modal__swiper-bullet", {
    spaceBetween: 5,
    slidesPerView: 7,
    direction: "horizontal",
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        768: {
            direction: 'vertical',
            slidesPerView: 4,
            spaceBetween: 8
        },
        1024: {
            direction: 'horizontal',
            slidesPerView: 4, // или сколько вам нужно на десктопе
            spaceBetween: 8
        }
    }

});
var swiperBasModal = new Swiper(".modal__swiper-base", {
    spaceBetween: 10,
    thumbs: {
        swiper: swiperBulletModal,
    },
    // pagination: {
    //     el: '.modal__pagination',
    //     clickable: true,
    //     // dynamicBullets: true,
    //     // dynamicMainBullets: 4,
    // },
});

// Выпадающий список
const initChoices = () => {
    // Находим ВСЕ элементы с классом .default
    const elements = document.querySelectorAll('.default');

    elements.forEach(el => {
        // Проверка, чтобы не инициализировать дважды
        if (!el.classList.contains('is-initialized')) {
            new Choices(el, {
                searchEnabled: false,
                shouldSort: false,
                itemSelectText: '', // Убирает лишний текст "Press to select"
            });
            // Помечаем, что селект уже настроен
            el.classList.add('is-initialized');
        }
    });
};

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', initChoices);