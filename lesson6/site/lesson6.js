var fibonacci = function(n) {
    if(typeof n !== 'number') throw new Error('n should be a Number');
    if(n < 0) throw new Error('n should >= 0');
    if(n > 10) throw new Error('n should <= 10');

    if(n === 0) return 0;
    if(n === 1) return 1;
    return fibonacci(n-1) + fibonacci(n-2);
};
exports.fibonacci = fibonacci;

if(require.main === module) { //直接执行lesson6.js才进入，否则不进入
    var n = Number(process.argv[2]); //argv[2]是命令行参数
    console.log('fibonacci(' + n + ') is', fibonacci(n));
}