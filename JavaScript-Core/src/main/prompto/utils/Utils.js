function equalObjects(o1, o2) {
    if(Object.is(o1, o2))
        return true;
    else
        return typeof(o1)==='object' && o1.equals && o1.equals(o2);

}

function equalArrays(o1, o2) {
	o1 = o1 || null;
	o2 = o2 || null;
	if(o1===o2) {
		return true;
	}
	if(o1===null || o2===null) {
		return false;
	}
	if(o1.length !== o2.length) {
		return false;
	}
	for(var i=0;i<o1.length;i++) {
		if(!equalObjects(o1[i], o2[i])) {
			return false;
		}
	}
	return true;
}

function arrayContains(a, o) {
	for(var i=0;i<a.length;i++) {
		if(equalObjects(a[i], o)) {
			return true;
		}
	}
	return false;
}

function removeAccents(s) {
    return s.replace(/[ÁÀÃÂÄ]/gi,"A")
        .replace(/[áàãâä]/gi,"a")
        .replace(/[ÉÈËÊ]/gi,"E")
        .replace(/[éèëê]/gi,"e")
        .replace(/[ÍÌÏÎ]/gi,"I")
        .replace(/[íìïî]/gi,"i")
        .replace(/[ÓÒÖÔÕ]/gi,"O")
        .replace(/[óòöôõ]/gi,"o")
        .replace(/[ÚÙÜÛ]/gi, "U")
        .replace(/[úùüû]/gi, "u")
        .replace(/[Ç]/gi, "C")
        .replace(/[ç]/gi, "c")
        .replace(/[Ñ]/gi, "N")
        .replace(/[ñ]/gi, "n");
}

function getUtf8StringLength(s) {
    return s.split('')
        .map(function (c) {
            return c.charCodeAt(0);
        })
        .map(getUtf8CharLength)
        .reduce(function(prev, cur) {
            return prev + cur;
        }, 0);
}

/* the below inspired by MDN StringView.js */

function getUtf8CharLength(c) {
    return c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : c < 0x200000 ? 4 : c < 0x4000000 ? 5 : 6;
}

function stringToUtf8Buffer(s) {
    var codes = s.split('')
        .map(function (c) {
            return c.charCodeAt(0);
        });
    var size = codes.map(getUtf8CharLength)
        .reduce(function(prev, cur) {
            return prev + cur;
        }, 0);
    var buffer = new ArrayBuffer(size);
    var view = new Uint8Array(buffer);
    var idx = 0;
    codes.forEach(function(c) {
        if (c < 0x80 /* 128 */) {
            /* one byte */
            view[idx++] = c;
        } else if (c < 0x800 /* 2048 */) {
            /* two bytes */
            view[idx++] = 0xc0 /* 192 */ + (c >>> 6);
            view[idx++] = 0x80 /* 128 */ + (c & 0x3f /* 63 */);
        } else if (c < 0x10000 /* 65536 */) {
            /* three bytes */
            view[idx++] = 0xe0 /* 224 */ + (c >>> 12);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 6) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + (c & 0x3f /* 63 */);
        } else if (c < 0x200000 /* 2097152 */) {
            /* four bytes */
            view[idx++] = 0xf0 /* 240 */ + (c >>> 18);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 12) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 6) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + (c & 0x3f /* 63 */);
        } else if (c < 0x4000000 /* 67108864 */) {
            /* five bytes */
            view[idx++] = 0xf8 /* 248 */ + (c >>> 24);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 18) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 12) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + ((c >>> 6) & 0x3f /* 63 */);
            view[idx++] = 0x80 /* 128 */ + (c & 0x3f /* 63 */);
        } else /* if (c <= 0x7fffffff) */ { /* 2147483647 */
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

function utf8BufferToString(buffer) {
    if(buffer instanceof ArrayBuffer)
        buffer = new Uint8Array(buffer);
    var chars = [];
    var idx = 0;
    while(idx<buffer.length) {
        var byte = buffer[idx];
        var code = 0;
        if (byte > 251 && byte < 254 && idx + 5 < buffer.length) {
            /* (byte - 252 << 30) may be not safe in ECMAScript! So...: */
            /* six bytes */
            code = (byte - 252) * 1073741824 + (buffer[idx + 1] - 128 << 24) + (buffer[idx + 2] - 128 << 18)
            + (buffer[idx + 3] - 128 << 12) + (buffer[idx + 4] - 128 << 6) + buffer[idx + 5] - 128;
            idx += 6;
        } else if (byte > 247 && byte < 252 && idx + 4 < buffer.length) {
            /* five bytes */
            code = (byte - 248 << 24) + (buffer[idx + 1] - 128 << 18) + (buffer[idx + 2] - 128 << 12)
            + (buffer[idx + 3] - 128 << 6) + buffer[idx + 4] - 128;
            idx += 5;
        } else if (byte > 239 && byte < 248 && idx + 3 < buffer.length) {
            /* four bytes */
            code = (byte - 240 << 18) + (buffer[idx + 1] - 128 << 12) + (buffer[idx + 2] - 128 << 6)
            + buffer[idx + 3] - 128;
            idx += 4;
        } else if (byte > 223 && byte < 240 && idx + 2 < buffer.length) {
            /* three bytes */
            code = (byte - 224 << 12) + (buffer[idx + 1] - 128 << 6) + buffer[idx + 2] - 128;
            idx += 3;
        } else if (byte > 191 && byte < 224 && idx + 1 < buffer.length) {
            /* two bytes */
            code = (byte - 192 << 6) + buffer[idx + 1] - 128;
            idx += 2;
        } else {
            /* one byte */
            code = byte;
            idx += 1;
        }
        chars.push(String.fromCharCode(code));
    }
    return chars.join("");
};

function mergeObjects() {
    var res = {};
    [].map.call(arguments, function(o) {
        Object.getOwnPropertyNames(o).map(function(n) {
            res[n] = o[n];
        });
    });
    return res;
}

function multiplyArray(items, count) {
    var result = [];
    while(--count>=0) {
        result = result.concat(items);
    }
    return result;
}

function decimalToString(d) {
    // mimic 0.0######
    var s = d.toString();
    var i = s.indexOf('.');
    if(i>=0) {
        // fix IEEE issue
        i = s.indexOf('000000', i);
        if( i < 0)
            return s;
        else
            return s.substr(0, i);
    } else
        return s + ".0";
}

function isAnInteger(o) {
    return typeof(o) === "number" && o === Math.floor(o);
}

function isADecimal(o) {
    return typeof(o) === "number" && o !== Math.floor(o);
}

function isAText(o) {
    return typeof(o) === 'string' || o instanceof String;
}

function isACharacter(o) {
    return isAText(o) && o.length===1;
}

exports.multiplyArray = multiplyArray;
exports.mergeObjects = mergeObjects;
exports.equalObjects = equalObjects;
exports.equalArrays = equalArrays;
exports.arrayContains = arrayContains;
exports.removeAccents = removeAccents;
exports.getUtf8StringLength = getUtf8StringLength;
exports.getUtf8CharLength = getUtf8CharLength;
exports.stringToUtf8Buffer = stringToUtf8Buffer;
exports.utf8BufferToString = utf8BufferToString;
exports.decimalToString = decimalToString;
exports.isAnInteger = isAnInteger;
exports.isADecimal = isADecimal;
exports.isAText = isAText;
exports.isACharacter = isACharacter;