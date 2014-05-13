var assert = require('assert');
var vm = require('../index');

it('vmRunInNewContext', function () {
    assert.equal(vm.runInNewContext('a + 5', { a : 100 }), 105);
    
    (function () {
        var vars = { x : 10 };
        assert.equal(vm.runInNewContext('x++', vars), 10);
        assert.equal(vars.x, 11);
    })();
    
    (function () {
        var vars = { x : 10 };
        assert.equal(vm.runInNewContext('var y = 3; y + x++', vars), 13);
        assert.equal(vars.x, 11);
        assert.equal(vars.y, 3);
    })();
});

it('vmRunInContext', function () {
    var context = vm.createContext({ foo: 1 });

    vm.runInContext('var x = 1', context);
    assert.deepEqual(context, { foo: 1, x: 1 });

    vm.runInContext('var y = 1', context);
    assert.deepEqual(context, { foo: 1, x: 1, y: 1 });
});
