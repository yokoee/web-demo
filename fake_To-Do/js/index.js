//“我的一天”清单页日期
let tmpDate = new Date();
let day;
switch (tmpDate.getDay()) {
    case 0:
        day = '日';
    case 1:
        day = '一';
    case 2:
        day = '二';
    case 3:
        day = '三';
    case 4:
        day = '四';
    case 5:
        day = '五';
    case 6:
        day = '六';

}
document.getElementById('date').textContent = (tmpDate.getMonth() + 1) + '月' + tmpDate.getDate() + '日星期' + day;

//theme-color
function changeThemeColor() {
    let themeColor = document.getElementsByName('theme-color')[0];
    let topBar = document.getElementById('topBar');
    themeColor.content = window.getComputedStyle(topBar, null).backgroundColor;
}
changeThemeColor();

//侧栏按钮打开
let sideContent = document.getElementById('sideContent');
let sideShadow = document.getElementById('sideShadow');
let sidePage = document.getElementById('sidePage');

sideShadow.onclick = function() {
    sideContent.style.animation = 'slide-in 0.3s ease-in';
    sideContent.style.animationFillMode = 'forwards';
    sideShadow.style.animation = 'slide-in-shadow 0.3s ease-in';
    sideShadow.style.animationFillMode = 'forwards';
    setTimeout(() => {
        sidePage.style.display = 'none';
    }, 300)
}

document.getElementById('openSideButton').onclick = function() {
        sidePage.style.display = 'block';
        sideContent.style.animation = 'slide-out 0.3s ease-out';
        sideContent.style.animationFillMode = 'forwards';
        sideShadow.style.animation = 'slide-out-shadow 0.3s ease-in';
        sideShadow.style.animationFillMode = 'forwards';
    }
    /*
    //侧栏滑动打开
    let mainPage = document.getElementById('mainPage');
    let startX, moveX, endX;
    let effectiveX = 25;
    console.log('effectiveX:' + effectiveX);
    let mainPageWidth = window.getComputedStyle(mainPage, null).width;

    mainPage.addEventListener('touchstart', function(e) {
        startX = e.changedTouches[0].pageX;
        console.log('startX:' + startX);
        if (startX <= effectiveX) {
            sidePage.style.display = 'block';
            sideContent.style.right = (mainPageWidth - startX) + 'px';
        }
    })
    mainPage.addEventListener('touchmove', function(e) {
        e.preventDefault();
        moveX = e.changedTouches[0].pageX;
        console.log('moveX:' + moveX);
        if ((startX <= effectiveX)) {
            sideContent.style.right = (mainPageWidth - moveX) + 'px';
        }
    })
    mainPage.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].pageX;
        console.log('endX:' + endX);
        //滑动距离不超过70px则侧栏不会打开
        if ((startX <= effectiveX) && (endX - startX >= 70)) {
            sidePage.style.display = 'block';
            sideContent.style.right = '20%';
            console.log('open')
        } else {
            sideContent.style.right = '100%';
            sidePage.style.display = 'none';
            console.log('close')
        }
    })
    */

//top bar
/* let startY, moveY, lastMoveY, endY;

let topBar = document.getElementById('topBar');
let topBarFill = document.getElementById('topBarFill');
let title = document.getElementById('title');
let mainPageHeight = pxToNum(window.getComputedStyle(mainPage, null).height);

topBar.style.height = mainPageHeight * 0.3 + "px";
topBar.style.maxHeight = mainPageHeight * 0.3 + "px";
topBar.style.minHeight = mainPageHeight * 0.08 + "px";

topBarFill.style.height = mainPageHeight * 0.3 + "px";
topBarFill.style.maxHeight = mainPageHeight * 0.3 + "px";
topBarFill.style.minHeight = mainPageHeight * 0.08 + "px";

let topBarHeight = mainPageHeight * 0.3;
title.style.top = topBarHeight - pxToNum(window.getComputedStyle(title, null).height) + 'px';


mainPage.addEventListener('touchstart', function(e) {
    startY = e.changedTouches[0].pageY;
    console.log('startY:' + startY);
    lastMoveY = startY;
})
mainPage.addEventListener('touchmove', function(e) {
    e.preventDefault();
    moveY = e.changedTouches[0].pageY;
    topBarHeight = topBarHeight + moveY - lastMoveY;
    topBar.style.height = topBarHeight + "px";

    topBarFill.style.height = topBarHeight + "px";

    title.style.top = topBarHeight - pxToNum(window.getComputedStyle(title, null).height) + 'px';

    console.log('moveY:' + moveY);
    lastMoveY = moveY;
    console.log(topBar.style.height);
})
mainPage.addEventListener('touchend', function(e) {
    endY = e.changedTouches[0].pageY;
    console.log('endY:' + endY);
    if (topBarHeight >= mainPageHeight * 0.19) {
        topBar.style.height = mainPageHeight * 0.3 + "px";

        topBarFill.style.height = mainPageHeight * 0.3 + "px";

        title.style.top = pxToNum(topBar.style.height) - pxToNum(window.getComputedStyle(title, null).height) + 'px';
    } else {
        topBar.style.height = mainPageHeight * 0.08 + "px";

        topBarFill.style.height = mainPageHeight * 0.08 + "px";

        title.style.top = pxToNum(topBar.style.height) - pxToNum(window.getComputedStyle(title, null).height) + 'px';
    }
})




 */

/* let topBar = document.getElementById('topBar');
let topBarFill = document.getElementById('topBarFill');
let lastY, y;
lastY = window.pageYOffset;

window.onscroll = function() {
    console.log('scroll!-----------------------------');

    console.log('y:' + y);
    console.log('lastY:' + y);

    topBar.style.height = pxToNum(window.getComputedStyle(topBar, null).height) + (window.pageYOffsety - lastY);
    topBarFill.style.height = pxToNum(window.getComputedStyle(topBarFill, null).height) + (window.pageYOffsety - lastY);
    lastY = window.pageYOffset;
}

function chgTopBarHeight(height) {
    topBar.style.height = pxToNum(window.getComputedStyle(topBar, null).height) + height;
    topBarFill.style.height = pxToNum(window.getComputedStyle(topBarFill, null).height) + height;
}

function pxToNum(px) {
    return Number(px.slice(0, -2));
} */