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



// ТАБЫ

document.addEventListener('DOMContentLoaded', function () {
    // Инициализируем слайдер сразу при загрузке страницы
    const servicesSwiper = new Swiper('.services__swiper', {
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
        },
    });

    const tabTitles = document.querySelectorAll('._js-tabs-title');
    const allTabInfos = document.querySelectorAll('._js-tabs-info');

    // Функция для активации таба
    function activateTab(tabElement) {
        const tabAttr = tabElement.getAttribute('data-tab');
        const tabInfo = document.querySelector('._js-tabs-info[data-tab="' + tabAttr + '"]');

        // Удаляем класс active у всех заголовков
        tabTitles.forEach(tab => {
            tab.classList.remove('active');
        });

        // Добавляем класс active текущему заголовку
        tabElement.classList.add('active');

        // Удаляем класс active у всех информационных блоков
        allTabInfos.forEach(info => {
            info.classList.remove('active');
        });

        // Добавляем класс active соответствующему информационному блоку
        if (tabInfo) {
            tabInfo.classList.add('active');
        }
    }

    // Находим активный таб при загрузке или активируем первый
    let activeTab = document.querySelector('._js-tabs-title.active');

    // Если нет активного таба, активируем первый
    if (!activeTab && tabTitles.length > 0) {
        activeTab = tabTitles[0];
        activateTab(activeTab);
    } else if (activeTab) {
        // Если есть активный таб, убедимся что соответствующий контент тоже активен
        const tabAttr = activeTab.getAttribute('data-tab');
        const tabInfo = document.querySelector('._js-tabs-info[data-tab="' + tabAttr + '"]');
        if (tabInfo && !tabInfo.classList.contains('active')) {
            tabInfo.classList.add('active');
        }
    }

    // Добавляем обработчики кликов на все табы
    tabTitles.forEach(title => {
        title.addEventListener('click', function () {
            activateTab(this);
        });
    });
});