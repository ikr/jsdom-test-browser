(function () {
    'use strict';

    var jsdom = require('jsdom'),
        MultiError = require('verror').MultiError;

    exports.init = function (callback) {
        jsdom.env({
            html: '<html><body></body></html>',

            done: function (errors, window) {
                if (errors) {
                    callback(new MultiError(errors));
                    return;
                }

                global.window = window;
                global.document = window.document;
                global.navigator = window.navigator;
                callback();
            }
        });
    };

    exports.jQueryify = function (callback) {
        if (exports.$) {
            setTimeout(callback, 0);
            return;
        }

        jsdom.jQueryify(
            global.window,
            'http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',

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

    exports.reset = function (callback) {
        global.window.close();

        setTimeout(function () {
            exports.init(callback);
        }, 0);
    };
}());
