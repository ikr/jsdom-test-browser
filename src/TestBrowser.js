(function () {
    'use strict';

    var jsdom = require('jsdom'),
        names  = function () { return ['document', 'window', '$']; },
        TestBrowser = function () { this.stash = {}; };

    TestBrowser.prototype.setUp = function (callback) {
        this.saveGlobals();

        global.document = jsdom.jsdom('<html><body></body></html>', jsdom.level(1, 'core'));
        global.window = global.document.parentWindow;

        jsdom.jQueryify(
            global.window,
            'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',

            function () {
                global.$ = global.window.$;
                callback();
            }.bind(this)
        );
    };

    TestBrowser.prototype.tearDown = function () {
        global.window.close();
        this.restoreGlobals();
    };

    TestBrowser.prototype.saveGlobals = function () {
        names().forEach(function (n) {
            this.stash[n] = global[n];
        }.bind(this));
    };

    TestBrowser.prototype.restoreGlobals = function () {
        names().forEach(function (n) {
            global[n] = this.stash[n];
        }.bind(this));
    };

    module.exports = TestBrowser;
}());
