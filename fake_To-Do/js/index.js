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

//#title定位
let title = document.getElementById('title');
title.style.top = "calc(30% - " + window.getComputedStyle(title, null).height + ")";

//侧滑页
document.getElementById('sideShadow').onclick = function() {
    document.getElementById('sideContent').style.animation = 'slide-in 0.5s ease-in';
    document.getElementById('sideContent').style.animationFillMode = 'forwards';
    document.getElementById('sideShadow').style.animation = 'slide-in-shadow 0.5s ease-in';
    document.getElementById('sideShadow').style.animationFillMode = 'forwards';
    setTimeout(() => {
        document.getElementById('sidePage').style.display = 'none';
    }, 500)
}
document.getElementById('openSideButton').onclick = function() {
    document.getElementById('sidePage').style.display = 'block';
    document.getElementById('sideContent').style.animation = 'slide-out 0.5s ease-out';
    document.getElementById('sideContent').style.animationFillMode = 'forwards';
    document.getElementById('sideShadow').style.animation = 'slide-out-shadow 0.5s ease-out';
    document.getElementById('sideShadow').style.animationFillMode = 'forwards';

}