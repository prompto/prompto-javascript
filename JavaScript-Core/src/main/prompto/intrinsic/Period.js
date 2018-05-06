function Period(data) {
    var names = ["years", "months", "weeks", "days", "hours", "minutes", "seconds", "millis"];
    for(var i=0;i<names.length; i++) {
        this[names[i]] = data[i];
    }
    return this;
}

Period.parse = function (text) {
    var data = [];
    var steps = "YMWDHM.S";
    var value = null;
    var lastStep = -1;
    var isNeg = false;
    var inPeriod = false;
    var inTime = false;
    var inMillis = false;

    for(var i=0;i<text.length;i++) {
        var c = text[i];
        // leading 'P' is mandatory
        if (!inPeriod) {
            if (c == 'P') {
                inPeriod = true;
                continue;
            } else {
                throw new Exception();
            }
        }
        // check for time section
        if (c == 'T') {
            if (!inTime) {
                inTime = true;
                continue;
            } else {
                throw new Exception();
            }
        }
        // check for value type
        var step = inTime ? steps.indexOf(c, 4) : steps.indexOf(c);
        if (step >= 0) {
            if (step <= lastStep) {
                throw new Exception();
            } else if (step > 3 && !inTime) {
                throw new Exception();
            } else if (value == null) {
                throw new Exception();
            } else if (step == 6) { // millis '.'
                inMillis = true;
            } else if (step == 7 && !inMillis) {
                step = 6;
            }
            data[step] = value;
            lastStep = step;
            value = null;
            continue;
        }
        if (c == '-') {
            if (value!=null) {
                throw new Exception();
            }
            if (isNeg || inMillis) {
                throw new Exception();
            }
            isNeg = true;
        }
        if (c < '0' || c > '9') {
            throw new Exception();
        }
        if (value!=null) {
            value *= 10;
            value += c - '0';
        } else {
            value = c - '0';
            if (isNeg) {
                value = -value;
                isNeg = false;
            }
        }
    }
    // must terminate by a value type
    if (value != null) {
        throw new Error("Failed parsing period literal: " + text);
    }
    return new Period(data);
};

exports.Period = Period;