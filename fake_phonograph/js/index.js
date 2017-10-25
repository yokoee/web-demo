$(document).ready(() => {
    // control自适应高度
    $('#control').css('top', function() {
        return $('#album').css('height');
    });

    // 初始化
    setCurrentMusic(currentMusic);
    $('#audio').prop('volume', 1);
    createNextItem();


    $('.btn-palyOrPause').on('click', function() {
        if ($(this).children('i').prop('class') == 'playing') {
            $('#audio')[0].pause();
        } else if ($(this).children('i').prop('class') == 'pausing') {
            $('#audio')[0].play();
        }
    })
    $('#audio').on('playing', () => {
        play();
    })
    $('#audio').on('pause', () => {
        pause();
    })
    $('#audio').on('ended', () => {
        playNext();
    })
    $('.panel').on('click', (event) => {
        let currentPosition = event.offsetX;
        let panelWidth = parseInt($('.panel').css('width'));
        let duration = $('#audio').prop('duration');
        let currentTime = currentPosition / panelWidth * duration
        $('#audio').prop('currentTime', currentTime);
        updateProgress();
    })

    $('.ic-arrow').on('click', function() {
        $(this).toggleClass('ic-reverse-arrow');
        $('#play-list').toggleClass('up');
    })

    $('.btn-prev').on('click', () => {
        playPrev();
    })

    $('.btn-next').on('click', () => {
        playNext();
    })

    $('.next-item').on('click', function() {
        let index = $(this).prop('class').match(/\d+(?=index)/);
        if (index != currentMusic) {
            setCurrentMusic(index);
            play();
        }

    })
})

let playList = songs;
let currentMusic = 0;

/* function initPlayList() {
    let tmpList = {};
    tmpList.currentMusic = 0;
    songs.forEach(function(song) {
        tmpList[songs.indexOf(song)] = song;
    }, this);
    return tmpList;
}
 */
function setCurrentMusic(index) {
    currentMusic = index;
    $('#audio').prop('src', playList[index].path)
    $('#album img').prop('src', playList[index].album);
    $('#list-playing .title').text(playList[index].title);
    $('#list-playing .artist').text(playList[index].artist);
    updateCurrentPlayItem();
}

function playNext() {
    if (playList[currentMusic + 1]) {
        setCurrentMusic(currentMusic + 1);
        play();
    } else {
        setCurrentMusic(0);
        play();
    }
}

function playPrev() {
    if (currentMusic != 0) {
        setCurrentMusic(currentMusic - 1);
        play();
    }
}

function play() {
    $('.btn-palyOrPause i').removeClass().addClass('playing');
    $('#audio')[0].play();
    startUpdateProgress();
    updateCurrentPlayItem();

}

function pause() {
    $('.btn-palyOrPause i').removeClass().addClass('pausing');
    $('#audio')[0].pause();
    stopUpdateProgress();
}

function startUpdateProgress() {
    intervalUpdateProgress = setInterval(updateProgress, 1000);
}

function stopUpdateProgress() {
    clearInterval(intervalUpdateProgress);
}

function updateProgress() {
    let currentTime = $('#audio').prop('currentTime');
    let duration = $('#audio').prop('duration');
    let panelWidth = parseInt($('.panel').css('width'));
    let currentPosition = currentTime / duration * panelWidth + 'px';
    $('.current-position').css('left', currentPosition);

    let positionSec = Math.round(currentTime % 60);
    let positionMin = Math.floor(currentTime / 60);
    if (positionSec < 10) positionSec = '0' + positionSec;
    let durationSec = Math.round(duration % 60);
    let durationMin = Math.floor(duration / 60);
    if (durationSec < 10) durationSec = '0' + durationSec;

    $('.player-position').text(positionMin + ':' + positionSec);
    $('.player-duration').text(durationMin + ':' + durationSec);
}

function createNextItem() {
    $('#list-next').empty();
    playList.forEach((song, index) => {
        let nextItem = $('<div></div>').addClass('next-item ' + index + 'index');
        let icDot = $('<i></i>').addClass('ic-dot');
        let musicInfo = $('<div></div>').addClass('music-info');
        let title = $('<div></div>').addClass('title').text(song.title);
        let artist = $('<div></div>').addClass('artist').text(song.artist);
        let br = $('<br>');

        musicInfo.append(title, br, artist);
        nextItem.append(icDot, musicInfo);
        $('#list-next').append(nextItem);
    }, this);
    updateCurrentPlayItem();
}

function updateCurrentPlayItem() {
    $('.current-play').removeClass('current-play');
    $('.' + currentMusic + 'index').addClass('current-play');
}