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
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true,
    // },
});