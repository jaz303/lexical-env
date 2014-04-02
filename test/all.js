var test    = require('tape'),
    env     = require('..');

test('create', function(a) {

    var e = env.create();

    a.ok(typeof e === 'object');
    a.ok(Object.keys(e).length === 0);
    
    a.end();

});

test('create child', function(a) {

    var e1 = env.create(),
        e2 = env.create(e1);

    a.ok(Object.getPrototypeOf(e2) === e1);

    a.end();

});

test('find', function(a) {

    var e1 = env.create();
    env.def(e1, 'foo', 'bar');
    a.ok(env.find(e1, 'foo') === e1);

    var e2 = env.create();
    var e3 = env.create(e2);
    env.def(e2, 'foo', 'bar');
    a.ok(env.find(e3, 'foo') === e2);

    var e4 = env.create();
    var e5 = env.create(e2);
    env.def(e5, 'foo', 'bar');
    a.ok(env.find(e5, 'foo') === e5);

    var e6 = env.create();
    var e7 = env.create(e6);
    try {
        env.find(e7, 'foo');
        a.ok(false);
    } catch (e) {
        a.ok(true);
    }

    a.end();

});

test('def', function(a) {

    var e1 = env.create();
    env.def(e1, 'a', 'b');
    a.ok(Object.prototype.hasOwnProperty.call(e1, 'a'));
    a.ok(e1.a === 'b');

    try {
        env.def(e1, 'a', 'c');
        a.ok(false);
    } catch (e) {
        a.ok(true);
    }

    a.end();

});

test('get', function(a) {

    var e1 = env.create();
    env.def(e1, 'foo', 'bar');
    a.ok(env.get(e1, 'foo') === 'bar');

    var e2 = env.create();
    var e3 = env.create(e2);
    env.def(e2, 'foo', 'bar');
    a.ok(env.get(e3, 'foo') === 'bar');

    var e4 = env.create();
    var e5 = env.create(e2);
    env.def(e5, 'foo', 'bar');
    a.ok(env.get(e5, 'foo') === 'bar');

    var e6 = env.create();
    var e7 = env.create(e6);
    try {
        env.get(e7, 'foo');
        a.ok(false);
    } catch (e) {
        a.ok(true);
    }

    a.end();

});

test('set', function(a) {

    var e1 = env.create();
    var e2 = env.create(e1);

    env.def(e1, 'foo', 'bar');
    env.set(e2, 'foo', 'bleem');

    // new value can be looked up from child environments
    a.ok(env.get(e2, 'foo') === 'bleem');
    a.ok(env.get(e1, 'foo') === 'bleem');

    // ensure key is only set on e1
    a.ok(Object.prototype.hasOwnProperty.call(e1, 'foo'));
    a.ok(!Object.prototype.hasOwnProperty.call(e2, 'foo'));

    // can't use set if binding does not already exist
    try {
        env.set(e2, 'not-real', 'zoom');
        a.ok(false);
    } catch (e) {
        a.ok(true);
    }

    a.end();

});