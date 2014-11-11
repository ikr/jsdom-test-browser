(function () {
    'use strict';

    var jsdom = require('jsdom'),

        names = ['document', 'window'],
        stash = {},

        saveGlobals = function () {
            names.forEach(function (n) {
                stash[n] = global[n];
            });
        },

        restoreGlobals = function () {
            names.forEach(function (n) {
                global[n] = stash[n];
            });
        };

    exports.setUp = function () {
        saveGlobals();

        global.document = jsdom.jsdom('<html><body></body></html>', jsdom.level(1, 'core'));
        global.window = global.document.parentWindow;

        return exports;
    };

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

    exports.tearDown = function () {
        delete exports.$;
        global.window.close();
        restoreGlobals();
    };
}());
