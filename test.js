const tabs = document.getElementById("tabs");
const tabs2 = document.getElementById("tabs2");
const btn = document.querySelectorAll(".tab-btn");
const content = document.querySelectorAll(".content");
const content2 = document.querySelectorAll(".content2");

const changeClass = (element) => {
    for (let i = 0; i < tabs.children.length; i++) {
        tabs.children[i].classList.remove("active");
    }
    element.classList.add("active");
};

const changeClass2 = (element) => {
    for (let i = 0; i < tabs2.children.length; i++) {
        tabs2.children[i].classList.remove("active");
    }
    element.classList.add("active");
};

tabs.addEventListener("click", (event) => {
    const currentTab = event.target.dataset.btn;
    changeClass(event.target);
    changeClass2(event.target);

    for (let i = 0; i < content.length; i++) {
        content[i].classList.remove("active");
        if (content[i].dataset.content === currentTab) {
            content[i].classList.add("active");
        }
    }
});

tabs2.addEventListener("click", (event) => {
    const currentTab2 = event.target.dataset.btn2;
    changeClass2(event.target);

    for (let i = 0; i < content2.length; i++) {
        content2[i].classList.remove("active");
        if (content2[i].dataset.content2 === currentTab2) {
            content2[i].classList.add("active");
        }
    }
});

const prev = document.getElementById("btn-prev"),
    next = document.getElementById("btn-next"),
    slides = document.querySelectorAll(".slide"),
    dots = document.querySelectorAll(".dot");

let index = 0;

const activeSlide = (n) => {
    for (slide of slides) {
        slide.classList.remove("active");
    }
    slides[n].classList.add("active");
};

const activeDot = (n) => {
    for (dot of dots) {
        dot.classList.remove("active");
    }
    dots[n].classList.add("active");
};

const prepareCurrentSlide = (ind) => {
    activeSlide(index);
    activeDot(index);
};

const nextSlide = () => {
    if (index == slides.length - 1) {
        index = 0;
        prepareCurrentSlide(index);
    } else {
        index++;
        prepareCurrentSlide(index);
    }
};

const prevSlide = () => {
    if (index == 0) {
        index = slides.length - 1;
        prepareCurrentSlide(index);
    } else {
        index--;
        prepareCurrentSlide(index);
    }
};

dots.forEach((item, indexDot) => {
    item.addEventListener("click", () => {
        index = indexDot;
        prepareCurrentSlide(index);
    });
});

setInterval(nextSlide, 2000);

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);
