(() => {

    'use strict';

    let express = require('express'),
        app     = express();

    let PORT = process.env.PORT || 5000;

    app.use(express.static('./'));

    app.listen(PORT, () => {
        console.log('PolyWave server listening on port %d', PORT);
    });

})();
