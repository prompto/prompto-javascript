var Fiber = require("fibers"); // nodejs only, see Core/webpack.config.js

function doSleepFiber(millis) {
    var fiber = Fiber.current;
    setTimeout(function() {
        fiber.run();
    }, millis);
    return Fiber.yield();
}

/* global Int32Array */
function doSleepAtomic(millis) {
    while (millis > 0) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10);
        millis -= 10;
    }
}

function doSleep(millis) {
    try {
        if (Fiber && Fiber.current)
            doSleepFiber(millis);
        else
            doSleepAtomic(millis);
    } catch(e) {
        console.log(e.stack);
    }
}

function sleep(millis) {
    // var before = new Date();
    doSleep(millis);
    // var after = new Date();
    // var elapsed = after.valueOf() - before.valueOf();
    // console.log("elapsed: " + elapsed);
}

exports.sleep = sleep;