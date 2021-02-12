/* Ожидаем загрузку всего документа, аналог ванильной записи в js 
 document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){ */
$(function () {
    //?----------- Nav toggle on mobile ------------//
    const navToggle = $("#navToggle");
    const nav = $("#nav");

    navToggle.on("click", function (event) {
        event.preventDefault();

        $(this).toggleClass("active");
        nav.toggleClass("show");
        $("body").toggleClass("show-nav");
    });

    /* Скрывать навигацию на моб. при rotate телефона */
    $(window).on("resize", function () {
        $("body").removeClass("show-nav");
        navToggle.removeClass("active");
        nav.removeClass("show");
    });

    const intro = $("#intro");
    const header = $("#header");
    /* получаем высоту блока intro с padding */
    let introH = intro.innerHeight();
    /* получаем высоту блока header учитывая так же padding */
    let headerH = header.innerHeight();
    /* получаем позицию скролла при обновлении страницы */
    let scrollTop = $(window).scrollTop();

    //?----------- Header class on scroll ------------//
    headerScroll(); /* Вызываем функцию для изначальной проверки высоты блоков */

    /* Вешаем обработчик событий на окно бразуера и вызывает метод scroll + resize, а так же функцию проверки высоты блоков, это нужно для того чтобы при перезагрузке страницы, переменные высоты обновлялись */
    $(window).on("scroll resize", function () {
        headerScroll();
    });

    /* Создаем объект функцию, которая проверяет, если позиция скролла больше или равна высоте (блоку intro - высота шапки), то добавляем шапке блок-модификатор header--dark(затемняем bgc шапки)  */
    function headerScroll() {
        introH = intro.innerHeight();
        headerH = header.innerHeight();

        /* Обработчик события скролла, от вверха до позиции на странице */
        let scrollTop = $(this).scrollTop();
        /* Тернарное выражение (condition) ?if :else */
        scrollTop >= introH - headerH
            ? header.addClass("header--dark")
            : header.removeClass("header--dark");
    }

    //?----------- Smooth scroll to section (Плавный скролл к секции) ------------//
    /* Делаем выборку элементов с дата-атрибутом, следим за событием клика по этому элементу и вызываем функцию,
    которая отменяет стандартное поведение при клике на ссылку(убирает добавление "#" в адресс ссылки)  */
    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();

        /* Записываем в переменную значение атрибута "data" с названием "scroll" при клике на ссылку с дата атрибутом data-scroll элемент */
        let scrollElement = $(this).data("scroll");
        /* Записываем в переменную позицию(метод offset) блока с дата-атрибутом относительно от вверха(.top) документа */
        let scrollElementPos = $(scrollElement).offset().top;

        /* Закрываем бургер меню на моб. при клике на ссылку */
        $("body").removeClass("show-nav");
        navToggle.removeClass("active");
        nav.removeClass("show");

        /* Создаем анимацию для всего документа (выбор html, body записывается для работы во всех браузерах) вызывается метод scrollTop, куда приходит значение элемента с дата-атрибутом минус высота шапки, скорость анимации 500мс */
        $("html, body").animate(
            {
                scrollTop: scrollElementPos - headerH,
            },
            500,
        );
    });

    //?----------- ScrollSpy (подсветка элементов в навигации, когда позиция скролла находится в данном элементе) ------------//
    /* Сохраняем в переменную высоту окна */
    let windowH = $(window).height();
    /* Вызываем функцию с значением позиции скрола */
    scrollSpy(scrollTop);

    /*Отслеживаем скролл страницы и сохраняем значение в переменную scrollTop  */
    $(window).on("scroll", function () {
        /* Обновляем переменную с текущей позицей скролла */
        scrollTop = $(this).scrollTop();
        scrollSpy(scrollTop);
    });

    function scrollSpy(scrollTop) {
        /* При каждом скролле проходимся циклом .each по всем элементам с дата-атрибутом data-scrollspy  */
        $("[data-scrollspy]").each(function () {
            let $this = $(this);
            let sectionId = $(this).data("scrollspy");
            let sectionOffset = $this.offset().top;
            /* Позиция начало секции мы получаем от трети нашего окна */
            sectionOffset = sectionOffset - windowH * 0.33333;

            /* Сравниваем расстояние от вверха этой секции с позицией скролла и если позиция скролла больше чем рассстояние этой секции от вверха либо равняется ему,
            то добавляем ему класс active и сначала убираем класс active у всех элементов навигации */
            if (scrollTop >= sectionOffset) {
                $("#nav [data-scroll]").removeClass("active");

                $('#nav [data-scroll="' + sectionId + '"]').addClass("active");
            }
            /* Если мы находимся в самом вверху страницы, убираем у всех класс active */
            if (scrollTop == 0) {
                $("#nav [data-scroll]").removeClass("active");
            }
        });
    }

    //?----------- Modal ------------//
    // !ДОПИСАТЬ КОММЕНТАРИИ!!!!!!!!!!!!!!!!

    $("[data-modal]").on("click", function (event) {
        event.preventDefault();
        let modal = $(this).data("modal");

        $("body").addClass("no-scroll");
        $(modal).addClass("show");

        setTimeout(function () {
            $(modal).find(".modal__content").css({
                transform: "translateY(0)",
                opacity: "1",
            });
        }, 100);
    });

    $("[data-modal-close]").on("click", function (event) {
        event.preventDefault();
        let modal = $(this).parents(".modal");
        modalClose(modal);
    });

    $(".modal").on("click", function () {
        let modal = $(this);

        modalClose(modal);
    });

    $(".modal__content").on("click", function (event) {
        event.stopPropagation();
    });

    function modalClose(modal) {
        modal.find(".modal__content").css({
            transform: "translateY(-100px)",
            opacity: "0",
        });

        setTimeout(function () {
            $("body").removeClass("no-scroll");
            modal.removeClass("show");
        }, 100);
    }

    //?----------- Slick slider https://kenwheeler.github.io/slick/ ------------//
    //?----------- Intro Slider------------//
    let introSlider = $("#introSlider");

    $(introSlider).slick({
        infinite: true,
        slidesToShow: 1,
        SlidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
    });

    $("#introSliderPrev").on("click", function () {
        introSlider.slick("slickPrev");
    });

    $("#introSliderNext").on("click", function () {
        introSlider.slick("slickNext");
    });

    //?----------- Reviews Slider------------//
    let reviewsSlider = $("#reviewsSlider");

    $(reviewsSlider).slick({
        infinite: true,
        slidesToShow: 1,
        SlidesToScroll: 1,
        arrows: false,
        dots: true,
        speed: 500,
    });

    //?----------- AOS for animate https://michalsnik.github.io/aos/ ------------//

    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
        initClassName: "aos-init", // class applied after initialization
        animatedClassName: "aos-animate", // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 500, // values from 0 to 3000, with step 50ms
        easing: "ease", // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    });
}); /* end 'DOMContentLoaded', function() */
