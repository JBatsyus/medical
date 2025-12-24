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

// Когда открываете мобильное меню:
function openMenu() {
    lenis.stop(); // Останавливает плавный скролл Lenis
    document.body.classList.add('no-scroll');
}

// Когда закрываете:
function closeMenu() {
    lenis.start(); // Запускает обратно
    document.body.classList.remove('no-scroll');
}


const heroSwiper = new Swiper('.hero-slider__swiper', {
    loop: true,
    effect: "fade",
    fadeEffect: {
        crossFade: true
    },
    speed: 1000,
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

const defaultSelect = () => {
    const element = document.querySelector('.default');
    const choices = new Choices(element, {
        searchEnabled: false, //ввыключает поиск
        shouldSort: false, //выключает алфавитный порядок
    });


};

defaultSelect();

const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.menu-mob');
const body = document.body;

if (burger && menu) {
    burger.addEventListener('click', () => {
        const isActive = burger.classList.toggle('active');
        menu.classList.toggle('active');

        if (isActive) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
    });

    // Закрытие меню при клике на ссылки
    const menuLinks = menu.querySelectorAll('.menu-mob__menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            menu.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
}