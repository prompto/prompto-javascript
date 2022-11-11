// noinspection JSUnusedGlobalSymbols

import { $Root, Category } from "./$Root.js";

export function equalObjects(o1, o2) {
    if (o1 === o2)
        return true;
    else if (o1 == null)
        return false;
    else if (Object.is(o1, o2))
        return true;
    else if (typeof o1 == 'object' && typeof o2 == 'object') {
        const obj1 = o1;
        const equals = obj1["equals"];
        return equals ? obj1[equals](o2) : false;
    }
    else
        return false;
}
export function equalArrays(o1, o2) {
    if (o1 === o2)
        return true;
    else if (!Array.isArray(o1) || !Array.isArray(o2))
        return false;
    if (o1.length !== o2.length) {
        return false;
    }
    for (let i = 0; i < o1.length; i++) {
        if (!equalObjects(o1[i], o2[i])) {
            return false;
        }
    }
    return true;
}
export function equalMaps(o1, o2) {
    if (o1 === o2)
        return true;
    else if (o1 == null)
        return false;
    const o1Names = Array.from(o1.keys());
    const o2Names = Array.from(o2.keys());
    if (equalArrays(o1Names, o2Names))
        return o1Names.every(name => equalObjects(o1.get(name), o2.get(name)));
    else
        return false;
}
export function arrayContains(a, o) {
    for (let i = 0; i < a.length; i++) {
        if (equalObjects(a[i], o)) {
            return true;
        }
    }
    return false;
}
export function removeAccents(s) {
    return s.replace(/[ÁÀÃÂÄ]/gi, "A")
        .replace(/[áàãâä]/gi, "a")
        .replace(/[ÉÈËÊ]/gi, "E")
        .replace(/[éèëê]/gi, "e")
        .replace(/[ÍÌÏÎ]/gi, "I")
        .replace(/[íìïî]/gi, "i")
        .replace(/[ÓÒÖÔÕ]/gi, "O")
        .replace(/[óòöôõ]/gi, "o")
        .replace(/[ÚÙÜÛ]/gi, "U")
        .replace(/[úùüû]/gi, "u")
        .replace(/[Ç]/gi, "C")
        .replace(/[ç]/gi, "c")
        .replace(/[Ñ]/gi, "N")
        .replace(/[ñ]/gi, "n");
}
export function getUtf8StringLength(s) {
    return s.split('')
        .map(c => c.charCodeAt(0))
        .map(getUtf8CharLength)
        .reduce((prev, cur) => prev + cur, 0);
}
export function getUtf8CharLength(c) {
    return c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : c < 0x200000 ? 4 : c < 0x4000000 ? 5 : 6;
}
export function stringToUtf8Buffer(s) {
    const codes = s.split('')
        .map(c => c.charCodeAt(0));
    const size = codes.map(getUtf8CharLength)
        .reduce((prev, cur) => prev + cur, 0);
    const buffer = new ArrayBuffer(size);
    const view = new Uint8Array(buffer);
    let idx = 0;
    codes.forEach(c => {
        if (c < 0x80 /* 128 */) {
            /* one byte */
            view[idx++] = c;
        }
        else if (c < 0x800 /* 2048 */) {
            /* two bytes */
            view[idx++] = 0xc0 /* 192 */ + (c >>> 6);
            view[idx++] = 0x80 /* 128 */ + (c & 0x3f /* 63 */);
        }
        else if (c < 0x10000 /* 65536 */) {
            /* three bytes */
            view[idx++] = 0xe0 /* 224 */ + (c >>> 12);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 6) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + (c & 0x3f /* 63 */);
        }
        else if (c < 0x200000 /* 2097152 */) {
            /* four bytes */
            view[idx++] = 0xf0 /* 240 */ + (c >>> 18);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 12) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 6) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + (c & 0x3f /* 63 */);
        }
        else if (c < 0x4000000 /* 67108864 */) {
            /* five bytes */
            view[idx++] = 0xf8 /* 248 */ + (c >>> 24);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 18) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 12) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 6) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + (c & 0x3f /* 63 */);
        }
        else /* if (c <= 0x7fffffff) */ { /* 2147483647 */
            /* six bytes */
            view[idx++] = 0xfc /* 252 */ + /* (c >>> 30) may be not safe in ECMAScript! So...: */ (c / 1073741824);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 24) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 18) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 12) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 6) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + (c & 0x3f /* 63 */);
        }
    });
    return buffer;
}
export function utf8BufferToString(_buffer) {
    const buffer = _buffer instanceof Uint8Array ? _buffer : new Uint8Array(_buffer);
    const chars = [];
    let idx = 0;
    while (idx < buffer.length) {
        const byte = buffer[idx];
        let code = 0;
        if (byte > 251 && byte < 254 && idx + 5 < buffer.length) {
            /* (byte - 252 << 30) may be not safe in ECMAScript! So...: */
            /* six bytes */
            code = (byte - 252) * 1073741824 + (buffer[idx + 1] - 128 << 24) + (buffer[idx + 2] - 128 << 18)
                + (buffer[idx + 3] - 128 << 12) + (buffer[idx + 4] - 128 << 6) + buffer[idx + 5] - 128;
            idx += 6;
        }
        else if (byte > 247 && byte < 252 && idx + 4 < buffer.length) {
            /* five bytes */
            code = (byte - 248 << 24) + (buffer[idx + 1] - 128 << 18) + (buffer[idx + 2] - 128 << 12)
                + (buffer[idx + 3] - 128 << 6) + buffer[idx + 4] - 128;
            idx += 5;
        }
        else if (byte > 239 && byte < 248 && idx + 3 < buffer.length) {
            /* four bytes */
            code = (byte - 240 << 18) + (buffer[idx + 1] - 128 << 12) + (buffer[idx + 2] - 128 << 6)
                + buffer[idx + 3] - 128;
            idx += 4;
        }
        else if (byte > 223 && byte < 240 && idx + 2 < buffer.length) {
            /* three bytes */
            code = (byte - 224 << 12) + (buffer[idx + 1] - 128 << 6) + buffer[idx + 2] - 128;
            idx += 3;
        }
        else if (byte > 191 && byte < 224 && idx + 1 < buffer.length) {
            /* two bytes */
            code = (byte - 192 << 6) + buffer[idx + 1] - 128;
            idx += 2;
        }
        else {
            /* one byte */
            code = byte;
            idx += 1;
        }
        chars.push(String.fromCharCode(code));
    }
    return chars.join("");
}
export function multiplyArray(items, count) {
    let result = [];
    while (--count >= 0) {
        result = result.concat(items);
    }
    return result;
}
export function decimalToString(d) {
    // mimic 0.0######
    const s = d.toString();
    let i = s.indexOf('.');
    if (i >= 0) {
        // fix IEEE issue
        i = s.indexOf('000000', i);
        if (i < 0)
            return s;
        else
            return s.substring(0, i);
    }
    else
        return s + ".0";
}
export function isABoolean(o) {
    return typeof (o) == "boolean";
}
export function isAnInteger(o) {
    return typeof (o) == "number" && Number.isInteger(o);
}
export function isADecimal(o) {
    return typeof (o) == "number" && !Number.isInteger(o);
}
export function isANumber(o) {
    return typeof (o) == "number";
}
export function isAText(o) {
    return typeof (o) == 'string' || o instanceof String;
}
export function isACharacter(o) {
    return isAText(o) && o.length === 1;
}
export function isASet(o) {
    const proto = Object.getPrototypeOf(o);
    // eslint-disable-next-line @typescript-eslint/ban-types
    const ctor = proto["constructor"];
    return ctor && ctor.name === "Set";
}
export function isAMethod(o, params, result) {
    if (typeof o != 'function')
        return false;
    // eslint-disable-next-line @typescript-eslint/ban-types
    function countParams(o) {
        let str = o.toString();
        str = str.replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/(.)*/g, '')
            .replace(/{[\s\S]*}/, '')
            .replace(/=>/g, '')
            .trim();
        const lpar = str.indexOf("(");
        const rpar = str.indexOf(")", lpar + 1);
        str = str.substring(lpar + 1, rpar);
        let args = str.split(",");
        args = args.filter(s => s.trim().length > 0);
        return args.length;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    return params.length === countParams(o);
}
export function isAnEnum(o) {
    if (typeof o != 'object')
        return false;
    const proto = Object.getPrototypeOf(o);
    if (!proto)
        return false;
    const constructor = proto["constructor"];
    if (!constructor)
        return false;
    const symbolOf = constructor["symbolOf"];
    const symbols = constructor["symbols"];
    return !!(symbolOf && symbols);
}
export function isInstanceOf(obj, type) {
    // eslint-disable-next-line no-undef
    if (obj instanceof type)
        return true;
    if (obj instanceof $Root) {
        if (type instanceof Category) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            return obj.$categories.indexOf(type) >= 0;
        }
    }
    return false;
}
export function isCharacterUpperCase(char) {
    return !!/[A-Z]/.exec(char[0]);
}
export function compareValues(value1, value2) {
    if (value1 == null && value2 == null)
        return 0;
    if (value1 == null)
        return -1;
    if (value2 == null)
        return 1;
    let compareTo = value1["compareTo"];
    if (compareTo)
        return value1[compareTo](value2);
    compareTo = value2["compareTo"];
    if (compareTo)
        return -value2[compareTo](value1);
    const s1 = value1.toString();
    const s2 = value2.toString();
    return s1 > s2 ? 1 : s1 === s2 ? 0 : -1;
}
// borrowed from http://www.2ality.com/2011/11/improving-typeof.html
export function getTypeName(value) {
    if (value == null)
        return "null";
    const t = typeof (value);
    // noinspection FallThroughInSwitchStatementJS
    switch (t) {
        case "function":
            // eslint-disable-next-line @typescript-eslint/ban-types
            if (value.name)
                // eslint-disable-next-line @typescript-eslint/ban-types
                return value.name;
        // no-break
        case "object": {
            const constructor = value.constructor;
            if (constructor) {
                const name = constructor["name"];
                if (name) {
                    return name;
                }
                else {
                    // Internet Explorer
                    // Anonymous functions are stringified as follows: 'function () {}'
                    // => the regex below does not match
                    const match = constructor.toString().match(/^function (.+)\(.*$/);
                    if (match) {
                        return match[1];
                    }
                }
            }
            // fallback, for nameless constructors etc.
            const s = value.toString();
            const matches = s.match(/^\[object (.+)]$/);
            return matches ? matches[1] : null;
        }
        default:
            return t;
    }
}
export function convertToJsonNode(o) {
    const type = typeof (o);
    switch (type) {
        case 'undefined':
            return null;
        case 'boolean':
        case 'number':
        case 'string':
            return o;
        default:
            if (o == null)
                return null;
            else {
               if (obj.toJsonNode)
                    return obj.toJsonNode();
                else
                    return JSON.stringify(o);
            }
    }
}
export function convertToJsonString(o) {
    const node = convertToJsonNode(o);
    return JSON.stringify(node);
}
export function integerRange(start, end) {
    start = Math.floor(start);
    end = Math.floor(end);
    const diff = end - start;
    if (diff === 0) {
        return [start];
    }
    const keys = Array(Math.abs(diff) + 1).keys();
    return Array.from(keys).map(x => {
        const increment = end > start ? x : -x;
        return start + increment;
    });
}
//# sourceMappingURL=Utils.js.map
