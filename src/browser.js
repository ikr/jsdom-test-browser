(function () {
    'use strict';

    var jsdom = require('jsdom');

    global.document = jsdom.jsdom('<html><body></body></html>', jsdom.level(1, 'core'));
    global.window = global.document.parentWindow;
    global.navigator = global.window.navigator;

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

    exports.loadJs = function (uri, callback) {
        var script = global.document.createElement('script');

        script.src = uri;
        script.onload = function () { setTimeout(callback, 0); };

        global.document.body.appendChild(script);
    };
}());
