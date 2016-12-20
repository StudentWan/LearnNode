var express = require('express');

var fibonacci = function(n) {
    if(typeof n !== 'number' || isNaN(n)) throw new Error('n should be a Number'); //如果n是NaN类型，那是=== 'number'的，所以要判断n是不是NaN类型
    if(n < 0) throw new Error('n should >= 0');
    if(n > 10) throw new Error('n should <= 10');

    if(n === 0) return 0;
    if(n === 1) return 1;
    return fibonacci(n-1) + fibonacci(n - 2);
}

var app = express();

app.get('/fib', function(req, res) {
    var n = Number(req.query.n);
    try {
        res.send(String(fibonacci(n)));//直接发送数字会被当成http状态码，因此转换成string
    } catch(e) {
        res
          .status(500)
          .send(e.message);
    }
});

module.exports = app;

app.listen(3000, function() {
    console.log('app is listening at port 3000');
})