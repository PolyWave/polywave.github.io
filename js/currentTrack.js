/*global Velocity,io:true*/
'use strict';

(function () {
    var API_ROOT = 'http://polywave-api.d.wuips.com';

    var
        bar = document.querySelector('.pw-controls-bar-position'),
        song_title = document.querySelector('.pw-controls-title'),
        song_cover = document.querySelector('.pw-controls-thumb');

    if (bar && song_title && song_cover) {

        var resetBar = function (width) {
            Velocity(bar, {width: width}, {duration: 0});
        };

        /**
         * @param  {Number} duration    in seconds
         */
        var animateBar = function (duration) {
            Velocity(bar, {width: '100%'}, {duration: duration});
        };

        var initBar = function (song) {
            //how far we are in this song
            var pastTime = Date.now() - (new Date(song.startTime)).getTime();

            var currentWidth = pastTime / song.playDuration * 100;
            if (currentWidth > 100) {
                currentWidth = 100;
            }

            resetBar(currentWidth);
            setTimeout(function () {
                animateBar(song.playDuration - pastTime);
            }, 300);
        };

        var handleNewSong = function (song) {
            console.log('Current song', song);

            if (!song) {
                return;
            }

            initBar(song);
            song_title.innerText = song.title + ' - ' + song.artists;
            song_cover.src = song.cover;
        };

        var socket = io(API_ROOT);
        socket.on('current', handleNewSong);
    }
}());
