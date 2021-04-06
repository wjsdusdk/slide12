var slides = document.querySelector(".slides"),
    slide = document.querySelectorAll(".slides li"),
    currentIdx = 0,
    slideCount = slide.length,
    slideWidth = 200,
    slideMargin = 30,
    moveAmt = slideWidth + slideMargin,
    maxSlides = 3,
    responsiveMargin = 20,
    newSlide,
    newSlideWidth,
    prevBtn = document.querySelector(".prev"),
    nextBtn = document.querySelector(".next");

newSlideWidth = slideWidth;

// 1. 복사본 생성하기

for (var i = 0; i < maxSlides; i++) {
    // a.cloneNode() : a 요소 복사
    // a.cloneNode(true) : a의 자식 요소까지 복사
    var cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    // a.appendChild(b) : a 안에 기존의 내용 뒤에 b를 추가
    slides.appendChild(cloneSlide);
}

for (var i = slideCount - 1; i >= 0; i--) {
    var cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    // a.prepend(b) : a 안에 기존의 내용 앞에 b를 추가
    slides.prepend(cloneSlide);
}

// 2. 가로 배열하기

function slideLayout() {
    newSlide = document.querySelectorAll(".slides li");
    newSlide.forEach(function (item, index) {
        item.style.width = newSlideWidth + "px";
        item.style.left = moveAmt * index + "px";
    });
}
slideLayout();

/* function slideLayout(sw, sm) {
    newSlide = document.querySelectorAll(".slides li");
    moveAmt = sw + sm;
    newSlide.forEach(function (item, index) {
        item.style.width = sw + "px";
        item.style.left = moveAmt * index + "px";
    });
}
slideLayout(slideWidth, slideMargin); */

// 3. 중앙 배치하기

function setSlide() {
    var ulMoveAmt = -moveAmt * slideCount + "px";
    slides.style.transform = "translateX(" + ulMoveAmt + ")";
    // slides.classList.add('animated'); // 문제 : 처음에 로드될 때 transition이 보임
    setTimeout(function () {
        slides.classList.add("animated");
    }, 100); // 시간이 지나고 실행 // 해결
}
setSlide();

// 4. 좌우 버튼으로 이동하기

nextBtn.addEventListener("click", function () {
    moveSlide(currentIdx + 1);
});

prevBtn.addEventListener("click", function () {
    moveSlide(currentIdx - 1);
});

function moveSlide(num) {
    slides.style.left = -num * moveAmt + "px";
    currentIdx = num;
    // console.log(currentIdx, slideCount);

    if (currentIdx == slideCount || currentIdx == -slideCount) {
        // 문제 2. 문제 1 해결을 위해 클래스 제거했지만 마지막 페이지에서 처음 페이지로 갈 때 transition이 안보임
        // slides.classList.remove('animated');

        // 문제 1. 마지막 페이지에서 처음 페이지로 갈 때 transition이 보임
        // slides.style.left = '0px';
        // currentIdx = 0;

        setTimeout(function () {
            slides.classList.remove("animated");
            slides.style.left = "0px";
            currentIdx = 0;
        }, 500); // 문제 3. 문제 2 해결을 위해 setTimeout으로 처리했지만 transition이 사라짐

        setTimeout(function () {
            slides.classList.add("animated");
        }, 600); // 해결
    }
}

// 5. 자동 슬라이드

var timer = undefined;

function autoSlide() {
    if (timer == undefined) {
        timer = setInterval(function () {
            moveSlide(currentIdx + 1);
        }, 2000);
    }
}
autoSlide();

function stopSlide() {
    clearInterval(timer);

    // stopSlide 후 다시 autoSlide할 때 timer의 값이 undefined이 아니라 숫자로 바껴있음
    console.log(timer); // 2
    timer = undefined;
    console.log(timer); // undefined
}

slides.addEventListener("mouseenter", function () {
    stopSlide();
});

slides.addEventListener("mouseleave", function () {
    autoSlide();
});

// 6. 반응형 슬라이드

window.addEventListener("resize", function () {
    var currentWidth = document.querySelector("body").offsetWidth;
    console.log(currentWidth);

    if (currentWidth < 700) {
        var slidesWidth = slides.offsetWidth;
        newSlideWidth = (slidesWidth - responsiveMargin * (maxSlides - 1)) / maxSlides;
        moveAmt = newSlideWidth + responsiveMargin;
        console.log(slidesWidth);
    } else {
        newSlideWidth = slideWidth;
        moveAmt = newSlideWidth + slideMargin;
    }
    if (currentWidth <= 500) {
        newSlideWidth = slides.offsetWidth;
        moveAmt = newSlideWidth;
    }

    slideLayout();
    setSlide();
});

/* window.addEventListener("resize", function () {
    var currentWidth = document.querySelector("body").offsetWidth;
    console.log(currentWidth);

    if (currentWidth < 700) {
        var slidesWidth = slides.offsetWidth;
        newSlideWidth = (slidesWidth - responsiveMargin * (maxSlides - 1)) / maxSlides;
        responsiveMargin = 20;
        console.log(slidesWidth);
    } else {
        newSlideWidth = slideWidth;
        responsiveMargin = slideMargin;
    }
    if (currentWidth <= 500) {
        newSlideWidth = slides.offsetWidth;
        responsiveMargin = 0;
    }

    slideLayout(newSlideWidth, responsiveMargin);
    setSlide();
}); */
