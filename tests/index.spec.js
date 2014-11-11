describe('public API', function () {
    'use strict';

    var assert = require('assert'),
        api = require('../index'),
        bro = require('../src/browser');

    it('is simply the browser module', function () {
        assert.strictEqual(api, bro);
    });
});
