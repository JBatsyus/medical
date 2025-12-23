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