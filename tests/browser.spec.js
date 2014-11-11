describe('browser', function () {
    'use strict';

    var assert = require('assert'),
        bro = require('../src/browser'),
        names = ['window', 'document'];

    beforeEach(function () {
        global.window = 'Original window';
        global.document = 'Original document';
    });

    it('does not expose jQuery initially', function () {
        assert(!bro.$);
    });

    describe('setUp', function () {
        var result;

        beforeEach(function () {
            result = bro.setUp();
        });

        it('returns the module reference', function () {
            assert.strictEqual(result, bro);
        });

        names.forEach(function (name) {
            it('replaces the global ' + name, function () {
                assert(global[name]);
                assert(global[name] !== 'Original ' + name);
            });
        });

        describe('with subsequent jQueryify', function () {
            beforeEach(function (done) {
                bro.jQueryify(done);
            });

            it('saves the jQuery as a member', function () {
                assert(bro.$);
            });
        });

        describe('with subsequent tearDown', function () {
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
