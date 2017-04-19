(function () {
    'use strict';

    var StreamInfoRadionomy = window.StreamInfoRadionomy;

    var pingMe = function(obj) {
        console.log(obj);
    };

    StreamInfoRadionomy({
        player:        'wimpy-player',
        listenURL:     'https://listen.radionomy.com/PolywaveRadio',
        guid:          'cdeb22f5-79fc-4c28-aaa9-8a30ca7b9d3c',
        apikey:        '433b9bd5-d340-4e72-b0ae-9dd75054698a',
        startOnLoad:   false,
        listenTitle:   'Radionomy',
        adTitle:       'Publicité',
        onChangeTrack: pingMe
    });
}());
