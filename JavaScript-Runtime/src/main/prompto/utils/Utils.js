/* global Int32Array */
function doSleep(millis) {
    try {
        while (millis > 0) {
            Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10);
            millis -= 10;
        }
    } catch(e) {
        console.log(e.stack);
    }
}

function sleep(millis) {
    doSleep(millis);
}

exports.sleep = sleep;
