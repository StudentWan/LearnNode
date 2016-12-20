var lesson6 = require('../lesson6');
require('should');

describe('test/lesson6.test.js', function() {
    it('should equal 0 when n === 0', function() {
        lesson6.fibonacci(0).should.eql(0);
    });

    it('should equal 1 when n === 1', function() {
        lesson6.fibonacci(1).should.eql(1);
    })

    it('should equal 55 when n === 10', function() {
        lesson6.fibonacci(10).should.eql(55);
    });

    it('should throw when n > 10', function() {
        (function() { //throw 是 throw 到上层的function，因此要加一个闭包 不然就 throw 到的it的回调函数上去了
            lesson6.fibonacci(11);
        }).should.throw('n should <= 10');
    });

    it('should throw when n < 0', function() {
        (function() {
            lesson6.fibonacci(-1);
        }).should.throw('n should >= 0');
    });

    it('should throw when n isnt Number', function() {
        (function(){
            lesson6.fibonacci('测试');
        }).should.throw('n should be a Number');
    });
});