(function () {
    'use strict';

    var jsdom = require('jsdom');

    global.document = jsdom.jsdom('<html><body></body></html>', jsdom.level(1, 'core'));
    global.window = global.document.parentWindow;

    exports.jQueryify = function (callback) {
        if (exports.$) {
            setTimeout(callback, 0);
            return;
        }

        jsdom.jQueryify(
            global.window,
            'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',

            function () {
                exports.$ = global.window.$;
                callback();
            }
        );
    };
}());
