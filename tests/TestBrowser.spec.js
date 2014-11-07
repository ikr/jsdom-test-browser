describe('TestBrowser', function () {
    'use strict';

    var assert = require('assert'),
        TestBrowser = require('../src/TestBrowser'),
        names = ['window', 'document', '$'],
        bro = new TestBrowser();

    this.timeout(4000);

    beforeEach(function () {
        global.window = 'Original window';
        global.document = 'Original document';
        global.$ = 'Original $';
    });

    describe('.prototype.setUp', function () {
        beforeEach(function (done) {
            bro.setUp(done);
        });

        names.forEach(function (name) {
            it('replaces the global ' + name, function () {
                assert(global[name]);
                assert(global[name] !== 'Original ' + name);
            });
        });

        describe('with consequent tearDown', function () {
            beforeEach(function () {
                bro.tearDown();
            });

            names.forEach(function (name) {
                it('restores the global ' + name, function () {
                    assert(global[name]);
                    assert(global[name] === 'Original ' + name);
                });
            });
        });
    });
});
