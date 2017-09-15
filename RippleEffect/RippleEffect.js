for (var ele of document.getElementsByClassName('ripple')) {
    ele.addEventListener('mousedown', () => {
        let x = event.clientX;
        let y = event.clientY;
        let wave = document.createElement('div');
        wave.style = "";
        ele.appendChild(wave);
    });
}