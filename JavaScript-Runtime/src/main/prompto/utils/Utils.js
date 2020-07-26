
function sleep(millis) {
    if(typeof(Atomics) != typeof(undefined)) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, millis);
    } else {
        var start = new Date().getTime();
        while(new Date().getTime() - start < millis);
    }
}

exports.sleep = sleep;