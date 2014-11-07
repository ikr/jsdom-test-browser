# About

Boilerplate I use to set up [React.js](http://facebook.github.io/react/) components testing harness
under Node.js, based on the amazing [jsdom.](https://github.com/tmpvar/jsdom)

# Usage

Here's how my typical [Mocha](http://mochajs.org/) test suite for a React component looks.

```javascript    
describe('MyComponentClass', function () {
    'use strict';

    var assert = require('assert'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils,
        TestBrowser = require('jsdom-test-browser'),
        MyComponentClass = React.createFactory(require('../src/MyComponentClass')),

        bro = new TestBrowser();

    this.timeout(4000); // Sometimes the network is slow when fetching jQuery from Google CDN

    beforeEach(function (done) { bro.setUp(done); });
    afterEach(function () { bro.tearDown(); });

    describe('element HTML', function () {
        var element;

        beforeEach(function () {
            element = TestUtils.renderIntoDocument(MyComponentClass({value: 42})).getDOMNode();
        });

        it('has the top class name assigned', function () {
            assert(bro.$(element).hasClass('my'));
        });

        it('displays the value somewhere in the markup', function () {
            assert.strictEqual(bro.$('.some-container .value-holder', element).val(), '42');
        });
    });
});
```

The `TestBrowser` methods `setUp` and `tearDown` **have side effects!** They modify the global
`window` and `document` to make the React's `TestUtils.renderIntoDocument` work. The `setUp` sets
those globals to the jsdom-provided values, and then `tearDown` restores them to their original
state.

As you see from the example above, the [jQuery](http://jquery.com/) API is available at `bro.$`
member.
