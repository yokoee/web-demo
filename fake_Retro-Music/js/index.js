window.onload = function() {
    player.init();
}
let player = {
    songList: [],
    process: '',
    loop: false,
    init: function() {
        this.songList = this.getSongList();
        this.setCurrentPlaySong();
        // 跳转播放进度
        document.querySelector('.process-bar').onclick = this.setPlayPosition;
        document.querySelector('.btn-play-pause').onclick = function() {
            if (this.children[0].textContent == 'pause_circle_filled') {
                player.pause();
            } else if (this.children[0].textContent == 'play_circle_filled') {
                player.play();
            }
        }
        document.querySelector('.btn-play-previous').onclick = this.playPrevious;
        document.querySelector('.btn-play-next').onclick = this.playNext;
        document.querySelector('.btn-repeat').onclick = function() {
            if (Array.from(this.classList).indexOf('repeat-off') != -1) {
                // to list loop
                this.classList.remove('repeat-off');
                player.loop = true;
                document.querySelector('audio').loop = false;
            } else if (this.children[0].textContent == "repeat") {
                // to repeat one
                this.children[0].textContent = 'repeat_one';
                document.querySelector('audio').loop = true;
            } else if (this.children[0].textContent == "repeat_one") {
                // to no loop
                this.children[0].textContent = 'repeat';
                this.classList.add('repeat-off');
                document.querySelector('audio').loop = false;
                player.loop = false;

            }
        }

        // 列表循环
        document.querySelector('audio').onended = function() {
            if (player.loop == true) player.playNext();
        }

        // 随机播放
        document.querySelector('.btn-shuffle').onclick = function() {
            if (Array.from(this.classList).indexOf('shuffle-off') != -1) {
                this.classList.remove('shuffle-off');
                player.shuffle();
            } else {
                this.classList.add('shuffle-off');
            }
        }
    },
    play: function() {
        let audio = document.querySelector('audio');
        audio.play();
        this.startProcess();
        document.querySelector('.btn-play-pause>i').textContent = 'pause_circle_filled';
    },
    pause: function() {
        let audio = document.querySelector('audio');
        audio.pause();
        this.stopProcess();
        document.querySelector('.btn-play-pause>i').textContent = 'play_circle_filled';
    },
    playNext: function() {
        let audio = document.querySelector('audio');
        let currentSongid = audio.dataset.songid;
        let nextSongid = parseInt(currentSongid) + 1;

        let gotcha = false;
        player.songList.forEach((i) => {
            if (i.id == nextSongid) {
                gotcha = true;
            }
        })
        gotcha ? player.setCurrentPlaySong(nextSongid) : player.setCurrentPlaySong(player.songList[0].id);
        player.play();
    },
    playPrevious: function() {
        let audio = document.querySelector('audio');
        let currentSongid = audio.dataset.songid;
        let previousSongid = parseInt(currentSongid) - 1;

        let gotcha = false;
        player.songList.forEach((i) => {
            if (i.id == previousSongid) {
                gotcha = true;
            }
        })
        gotcha ? player.setCurrentPlaySong(previousSongid) : player.setCurrentPlaySong(player.songList[player.songList.length - 1].id);
        player.play();
    },
    setMainColor: function() {
        let album = document.querySelector('.album');
        RGBaster.colors(window.getComputedStyle(album).backgroundImage.match(/(?<=").*(?=")/).toString(), {
            success: function(payload) {
                // console.log('Dominant color:', payload.dominant);
                // console.log('Secondary color:', payload.secondary);
                // console.log('Palette:', payload.palette);
                let main = document.querySelector('#main');
                let playing = document.querySelector('.playing');
                let playTime = document.querySelector('.play-time');
                let songArtist = document.querySelector('.song-artist>p');
                let contorls = document.querySelector('.btn-play-pause');

                main.style.background = 'linear-gradient(to bottom,' + payload.secondary + ',white)';
                playing.style.backgroundColor = payload.secondary;
                playTime.style.color = payload.secondary;
                songArtist.style.color = payload.secondary;
                contorls.style.color = payload.secondary;
            }
        })
    },
    setAlbum: function(img) {
        let album = document.querySelector('.album');
        album.style.background = 'url(' + img + ')';
    },

    setPlayPosition: function(event) {
        let offset = event.offsetX;
        let processBarWidth = parseInt(window.getComputedStyle(document.querySelector('.process-bar')).width);
        let audio = document.querySelector('audio');
        let songDuration = audio.duration;
        document.querySelector('.play-dot').style.left = offset + 'px';
        document.querySelector('.playing').style.width = offset + 'px';
        let currentTime = (offset / processBarWidth) * songDuration;
        audio.currentTime = currentTime;
        let sec = Math.floor(currentTime % 60);
        let min = Math.floor(currentTime / 60);
        if (sec < 10) sec = '0' + sec;
        if (min < 10) min = '0' + min;
        document.querySelector('.play-position>p').textContent = min + ':' + sec;
    },
    setCurrentPlaySong: function(id) {
        let songid = id || this.songList[0].id;
        let song = '';
        this.songList.forEach((i) => {
            if (i.id == songid) {
                song = i;
            }
        })
        let audio = document.querySelector('audio');
        audio.src = song.filepath;
        audio.dataset.songid = songid;
        audio.load();
        document.querySelector('.song-title>p').textContent = song.title;
        document.querySelector('.song-artist>p').textContent = song.artist;
        document.querySelector('.album').style.background = 'url(' + encodeURI(song.album) + ') 0% 0% / cover';
        document.querySelector('.play-position>p').textContent = '00:00';


        audio.oncanplay = this.setDurationTime;
        this.setMainColor();
    },
    getSongList: function() {
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'js/song.json', false);
        xhr.send();
        let songs = JSON.parse(xhr.responseText);
        return songs;
    },
    startProcess: function() {
        this.process = setInterval(this.updateProcess, 100);
    },
    stopProcess: function() {
        clearInterval(this.process);
    },
    updateProcess: function() {
        let audio = document.querySelector('audio');
        let currentTime = audio.currentTime;
        let processBarWidth = parseInt(window.getComputedStyle(document.querySelector('.process-bar')).width);
        let duration = audio.duration;

        let offset = (currentTime / duration) * processBarWidth;
        document.querySelector('.playing').style.width = offset + 'px';
        document.querySelector('.play-dot').style.left = offset + 'px';
        let sec = Math.floor(currentTime % 60);
        let min = Math.floor(currentTime / 60);
        if (sec < 10) sec = '0' + sec;
        if (min < 10) min = '0' + min;
        document.querySelector('.play-position>p').textContent = min + ':' + sec;
    },
    setDurationTime: function() {
        let audio = document.querySelector('audio');
        let sec = Math.floor(audio.duration % 60);
        let min = Math.floor(audio.duration / 60);
        if (sec < 10) sec = '0' + sec;
        if (min < 10) min = '0' + min;
        document.querySelector('.play-duration>p').textContent = min + ':' + sec;
    },
    shuffle: function() {
        this.songList.sort(function() {
            // 随机生成 -1 0 1 三个数
            return Math.floor(Math.random() * 3) - 1;
        });
    },
}