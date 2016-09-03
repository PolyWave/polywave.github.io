/*global io:true*/
'use strict';

(function () {

    var bar = document.querySelector('.pw-controls-bar-position');

    if (bar) {

        var resetBar = function (width) {
            bar.style.transition = 'none';
            bar.style['-webkit-transition'] = 'none';
            bar.style.width = width + '%';
        };

        /**
         * @param  {Number} duration    in seconds
         */
        var animate = function (duration) {
            bar.style.transition = 'width ' + duration + 's linear';
            bar.style['-webkit-transition'] = 'width ' + duration + 's linear';
            bar.style.width = '100%';
        };

        var initBar = function (song) {

            //how far we are in this song
            var pastTime = Date.now() - (new Date(song.startTime)).getTime();
            var currentWidth = pastTime / song.playDuration * 100;

            console.log('pastTime', pastTime / 1000);
            console.log('currentWidth', currentWidth);
            console.log('duration', song.playDuration - pastTime);

            resetBar(currentWidth);
            setTimeout(function () {
                animate((song.playDuration - pastTime) / 1000);
            }, 300);
        };

        var handleNewSong = function (song) {
            console.log('Current song', song);

            initBar(song);
        };

        var socket = io('http://localhost:3002');
        socket.on('current', handleNewSong);

    }

}());
