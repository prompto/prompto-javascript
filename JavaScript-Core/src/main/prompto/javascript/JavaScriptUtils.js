// borrowed from http://www.2ality.com/2011/11/improving-typeof.html
exports.getTypeName = value => {
    if (value === null) {
        return "null";
    }
    const t = typeof(value);
    switch(t) {
        case "function":
            if(value.name)
                return value.name;
            // no-break
        case "object":
            if (value.constructor) {
                if (value.constructor.name) {
                    return value.constructor.name;
                } else {
                    // Internet Explorer
                    // Anonymous functions are stringified as follows: 'function () {}'
                    // => the regex below does not match
                    const match = value.constructor.toString().match(/^function (.+)\(.*$/);
                    if (match) {
                        return match[1];
                    }
                }
            }
            // fallback, for nameless constructors etc.
            return Object.prototype.toString.call(value).match(/^\[object (.+)\]$/)[1];
        default:
            return t;
    }
}


