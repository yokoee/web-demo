// index.js

function prevPic() {
    let slideList = document.getElementById('slide-list');
    let offset = parseInt(slideList.style.left);
    let width = parseInt(window.getComputedStyle(slideList.children[0]).width)
    let slideNum = slideList.children.length;

    if (offset >= 0) {
        slideList.style.left = 0 - width * (slideNum - 1) + 'px';
    } else {
        slideList.style.left = offset + width + 'px';
    }
}

function nextPic() {
    let slideList = document.getElementById('slide-list');
    let offset = parseInt(slideList.style.left);
    let width = parseInt(window.getComputedStyle(slideList.children[0]).width)
    let slideNum = slideList.children.length;

    if (offset <= 0 - width * (slideNum - 1)) {
        slideList.style.left = '0';
    } else {
        slideList.style.left = offset - width + 'px';
    }
}

function startAutoScroll() {
    autoScroll = setInterval(nextPic, 8000);
}

function stopAutoScroll() {
    clearInterval(autoScroll);
}

let autoScroll;

window.onload = function() {

    // 初始化轮播图
    let slideList = document.getElementById('slide-list');

    let slide = RESOURCES.slideShow;
    /* console.log(slide); */
    slide.forEach(item => {
        let slideItem = document.createElement('li');
        let slideImg = document.createElement('img');
        slideImg.src = item;
        slideItem.appendChild(slideImg);
        slideList.appendChild(slideItem);
    });


    let btnPrev = document.getElementById('btn-prev');
    let btnNext = document.getElementById('btn-next');
    btnPrev.onclick = prevPic;
    btnNext.onclick = nextPic;

    btnPrev.onmouseout = startAutoScroll;
    btnPrev.onmouseover = stopAutoScroll;
    btnNext.onmouseout = startAutoScroll;
    btnNext.onmouseover = stopAutoScroll;

    slideList.onmouseout = startAutoScroll;
    slideList.onmouseover = stopAutoScroll;
    startAutoScroll();
}