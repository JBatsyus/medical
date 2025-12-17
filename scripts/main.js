const heroSwiper = new Swiper('.hero-slider__swiper', {
    loop: true,
    effect: "fade",
    fadeEffect: {
        crossFade: true
    },
    speed: 1000,
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: true
    // },
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
            spaceBetween: 24,
        },
        992: {
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