[![Build Status](https://travis-ci.org/ikr/jsdom-test-browser.svg?branch=master)](https://travis-ci.org/ikr/jsdom-test-browser)

# About

Boilerplate I use to set up [React.js](http://facebook.github.io/react/) components' testing harness
under [Node.js](http://nodejs.org/), based on the amazing [jsdom.](https://github.com/tmpvar/jsdom)

# Usage

Here's how my typical [Mocha](http://mochajs.org/) test suite for a React component looks.

```javascript
describe('MyComponentClass', function () {
    'use strict';

    var assert = require('assert'),

        // Must ALWAYS come BEFORE requiring React
        bro = require('jsdom-test-browser'),

        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils,
        MyComponentClass = require('../src/MyComponentClass');

    // If the network is slow when fetching jQuery from Google CDN
    // You may not need it that at all
    this.timeout(4000);

    // Load jQuery into jsdom. Is idempotent; can be called in every suite
    before(function (done) { bro.jQueryify(done); });

    describe('element HTML', function () {
        var element;

        beforeEach(function () {
            element = TestUtils.renderIntoDocument(
                React.createElement(MyComponentClass, {value: 42})
            ).getDOMNode();
        });

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

The `require('jsdom-test-browser')` call **has side effects!** It assigns the global `window`,
`document`, and `navigator` to make the React's initialization and `TestUtils.renderIntoDocument`
work.

As you see from the example above, the [jQuery](http://jquery.com/) API is available as the `bro.$`
member. However, the test browser must be _jQueryify-ed_ first. You may not need that in _all_ the
tests.
