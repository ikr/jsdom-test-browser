describe('public API', function () {
    'use strict';

    var assert = require('assert'),
        api = require('../index'),
        TestBrowser = require('../src/TestBrowser');

    it('is simply the TestBrowser class', function () {
        assert.strictEqual(api, TestBrowser);
    });
});
