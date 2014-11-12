describe('browser', function () {
    'use strict';

    var assert = require('assert'),
        bro,
        names = ['window', 'document'];

    before(function () {
        global.window = 'Original window';
        global.document = 'Original document';
    });

    describe('requiring', function () {
        before(function () {
            bro = require('../src/browser');
        });

        names.forEach(function (name) {
            it('replaces the global ' + name, function () {
                assert(global[name]);
                assert(global[name] !== 'Original ' + name);
            });
        });

        it('does not expose jQuery initially', function () {
            assert(!bro.$);
        });

        describe('with subsequent jQueryify', function () {
            before(function (done) {
                bro.jQueryify(done);
            });

            it('saves the jQuery as a member', function () {
                assert(bro.$);
            });

            it('is idempotent', function (done) {
                var $ = bro.$;

                bro.jQueryify(function () {
                    assert.strictEqual(bro.$, $);
                    done();
                });
            });
        });
    });
});
