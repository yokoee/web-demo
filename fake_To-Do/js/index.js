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