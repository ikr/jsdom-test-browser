describe('browser', function () {
    'use strict';

    var assert = require('assert'),
        bro = require('../src/browser'),
        names = ['window', 'document', 'navigator'];

    before(function () {
        names.forEach(function (name) {
            global[name] = 'Original ' + name;
        });
    });

    describe('init', function () {
        before(function (done) {
            bro.init(done);
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

    describe('loadJs', function () {
        before(function (done) {
            bro.loadJs(
                'http://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.10.4/typeahead.bundle.min.js',
                done
            );
        });

        it('can, for instance, include Twitter\'s Typeahead jQuery plug-in', function () {
            assert(global.window.Bloodhound);
        });
    });

    describe('reset', function () {
        it('is a function', function () {
            assert.strictEqual(typeof bro.reset, 'function');
        });

        it('resets the DOM', function (done) {
            global.document.body.className = 'marker';

            bro.reset(function (error) {
                assert.ifError(error);
                assert.strictEqual(global.document.body.className, '');
                done();
            });
        });
    });
});
