let player;

function play() {
    player = setInterval(next, 1000);
}

function stop() {
    clearInterval(player);
}
play();


function prev() {
    let slider = document.getElementsByClassName('slider')[0];
    let offset = parseInt(slider.style.left);
    console.log(offset);
    if (offset >= 0) {
        slider.style.left = '-3000px';
    } else {
        slider.style.left = offset + 1000 + 'px';
    }
}

function next() {
    let slider = document.getElementsByClassName('slider')[0];
    let offset = parseInt(slider.style.left);
    console.log(offset);
    if (offset <= -3000) {
        slider.style.left = '0';
    } else {
        slider.style.left = offset - 1000 + 'px';
    }
}