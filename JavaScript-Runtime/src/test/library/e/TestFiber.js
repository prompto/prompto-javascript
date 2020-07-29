var Fiber = require('fibers');

function sleep(ms) {
    var fiber = Fiber.current;
    setTimeout(function() {
        console.log('timer... ' + new Date);
    }, 2000);
    setTimeout(function() {
        fiber.run();
    }, ms);
    return Fiber.yield();
}

Fiber(function() {
    console.log('wait... ' + new Date);
    sleep(4000);
    console.log('ok... ' + new Date);
}).run();

console.log('back in main');