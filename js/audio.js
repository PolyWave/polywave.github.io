'use strict';

(function () {

    //TODO change this with read stream
    var STREAM_URL = 'http://listen.radionomy.com/polytest';

    /**
     * handleClick
     *
     * Returns function fired on click
     *
     * @return {Function}
     */
    var handleClick = function (button, audio) {
        return function () {
            if (button.classList.contains('pw-controls-play')) {
                button.classList.remove('pw-controls-play');
                button.classList.add('pw-controls-stop');
                audio.load();
                audio.play();
            } else {
                button.classList.add('pw-controls-play');
                button.classList.remove('pw-controls-stop');
                audio.pause();
            }
        };
    };

    if (document.querySelector('.js-audio-bar')) {
        var audio = new Audio(STREAM_URL);

        var controlButton = document.querySelector('.js-audio-control');
        controlButton.addEventListener(
            'click',
            handleClick(controlButton, audio)
        );
    }

}());
