var app = require('../lesson8');
var supertest = require('supertest');
var should = require('should');

var request = supertest(app);

describe('test/lesson8.test.js', function () {
    var testFib = function (n, statusCode, expect, done) {
        request.get('/fib')
            .query({ n: n })
            .expect(statusCode)
            .end(function (err, res) {
                res.text.should.eql(expect);
                done(err);
            });
    }
    it('should equal 0 when n === 0', function (done) {
        testFib(0, 200, '0', done);
    });
    it('should equal 1 when n === 1', function (done) {
        testFib(1, 200, '1', done);
    });
    it('should equal 55 when n === 100', function (done) {
        testFib(10, 200, '55', done);
    });
    it('should throw when n > 10', function (done) {
        testFib(11, 500, 'n should <= 10', done);
    });
    it('should throw when n < 0', function (done) {
        testFib(-1, 500, 'n should >= 0', done);
    });
    it('should throw when n isnt Number', function (done) {
        testFib('good', 500, 'n should be a Number', done);;
    });

    it('should status 500 when error', function (done) {
        request.get('/fib')
            .query({ n: 100 })
            .expect(500)
            .end(function (err, res) {
                done(err);
            });
    });
});