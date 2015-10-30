[![Build Status](https://travis-ci.org/ikr/jsdom-test-browser.svg?branch=master)](https://travis-ci.org/ikr/jsdom-test-browser)

# About

Boilerplate I use to set up [React.js](http://facebook.github.io/react/) components' testing harness
under [Node.js](http://nodejs.org/), based on the amazing [jsdom.](https://github.com/tmpvar/jsdom)

# Compatibility

The latest version depends on jsdom v6, which requires Node v4+. For a version compatible with Node
v0.10 and v0.12 please install `^3.0.0`. 

# Usage

`$ npm install --save-dev jsdom-test-browser`

Here's a sample [Mocha](http://mochajs.org/) test suite for a React component.

```javascript
describe('MyComponentClass', function () {
    'use strict';

    var bro = require('jsdom-test-browser'),
        assert = require('assert'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils,
        MyComponentClass = require('../src/MyComponentClass');

    // Prepare a new global browser instance. It (re)sets the
    // global.window, global.document, global.navigator (closing the old window, if needed),
    // so that TestUtils.renderIntoDocument() can work with an actual DOM.
    //
    before(function (done) { bro.newBrowser(done); });

    // If the network is slow when fetching jQuery from Google CDN.
    // You may not need it that at all.
    //
    this.timeout(4000);

    // Load jQuery into jsdom. Is idempotent; can be called in multiple suites relying
    // on the same jsdom browser instance.
    // If your tests don't depend on jQuery (bro.$), omit that step.
    //
    before(function (done) { bro.jQueryify(done); });

    describe('element HTML', function () {
        var element;

        beforeEach(function () {
            element = TestUtils.renderIntoDocument(
                React.createElement(MyComponentClass, {value: 42})
            ).getDOMNode();
        });

        it('is a TABLE', function () {
            assert.strictEqual(element.tagName, 'TABLE');
        }));

        it('has the top class name assigned', function () {
            assert(bro.$(element).hasClass('my'));
        });

        it('displays the value somewhere in the markup', function () {
            assert.strictEqual(
                bro.$('.some-container .value-holder', element).val(),
                '42'
            );
        });
    });
});
```

## On jQueryify

As jsdom supports the modern browser DOM API, I'd advise against using jQueryify until it's
absolutely necessary: say, when you rely on a jQuery plugin inside of a React component. Otherwise,
[querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector),
[textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent), and
[friends](https://developer.mozilla.org/en-US/docs/Web/API/Element) work just fine.

## Central bootstrap

With [Gulp](http://gulpjs.com/) it would look something like that:

```javascript

gulp.task('jsdom', function (callback) {
    bro.newBrowser(callback);
});

gulp.task('test', ['build', 'jsdom'], function () {
    ...
});
```

## Order of Node module imports

Please note that `bro.newBrowser(callback)` should be called before React is
imported/required. That's because React probes its execution environment right away when is's
imported.

# API

## newBrowser(callback)

## jQueryify(callback)

## $

## loadJs(uri, callback)
