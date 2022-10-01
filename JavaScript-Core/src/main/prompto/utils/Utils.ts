import {$Root, Category} from "../intrinsic/$Root";
import {JsonNode} from "../json";

export function equalObjects(o1: any, o2: any): boolean {
    if(o1 == o2)
        return true;
    else if(o1 == null)
        return false;
    else if(Object.is(o1, o2))
        return true;
    else if(typeof o1 == 'object' && typeof o2 == 'object') {
        const obj1 = o1 as object;
        const equals = obj1["equals" as keyof typeof obj1];
        return equals ? (obj1[equals] as (obj: object | null) => boolean)(o2 as object) : false;
    } else
        return false;
}

export function equalArrays(o1: object | null, o2: object | null): boolean {
    if(o1 == o2)
        return true;
    else if(!Array.isArray(o1) || !Array.isArray(o2))
        return false;
	if(o1.length != o2.length) {
		return false;
	}
	for(let i=0;i<o1.length;i++) {
		if(!equalObjects(o1[i] as object, o2[i] as object)) {
			return false;
		}
	}
	return true;
}

export function equalMaps<K,V>(o1: Map<K,V> | null, o2: Map<K,V> | null): boolean {
    if(o1 == o2)
        return true;
    else if(o1 == null)
        return false;
    const o1Names = Array.from(o1.keys());
    const o2Names = Array.from(o2!.keys());
    if(equalArrays(o1Names, o2Names))
        return o1Names.every(name => equalObjects(o1.get(name), o2!.get(name)));
    else
        return false;
}

export function arrayContains(a: any[], o: any): boolean {
	for(let i=0;i<a.length;i++) {
		if(equalObjects(a[i], o)) {
			return true;
		}
	}
	return false;
}

export function removeAccents(s: string): string {
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

export function getUtf8StringLength(s: string): number {
    return s.split('')
        .map(c => c.charCodeAt(0))
        .map(getUtf8CharLength)
        .reduce((prev, cur) => prev + cur, 0);
}

/* the below inspired by MDN StringView.js */
export type CharCode = number;
export function getUtf8CharLength(c: CharCode): number {
    return c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : c < 0x200000 ? 4 : c < 0x4000000 ? 5 : 6;
}

export function stringToUtf8Buffer(s: string): ArrayBuffer {
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

export function utf8BufferToString(_buffer: ArrayBuffer | Uint8Array): string {
    const buffer = _buffer instanceof Uint8Array ? _buffer : new Uint8Array(_buffer);
    const chars = [];
    let idx = 0;
    while(idx<buffer.length) {
        const byte = buffer[idx];
        let code = 0;
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
}


export function multiplyArray(items: any[], count: number): any[] {
    let result: any[] = [];
    while(--count>=0) {
        result = result.concat(items);
    }
    return result;
}

export function decimalToString(d: number): string {
    // mimic 0.0######
    const s = d.toString();
    let i = s.indexOf('.');
    if(i>=0) {
        // fix IEEE issue
        i = s.indexOf('000000', i);
        if( i < 0)
            return s;
        else
            return s.substring(0, i);
    } else
        return s + ".0";
}

export function isABoolean(o: any): boolean {
    return typeof(o) == "boolean";
}

export function isAnInteger(o: any): boolean {
    return typeof(o) == "number" && Number.isInteger(o);
}

export function isADecimal(o: any): boolean {
    return typeof(o) == "number" && !Number.isInteger(o);
}

export function isANumber(o: any): boolean {
    return typeof(o) == "number";
}

export function isAText(o: any): boolean {
    return typeof(o) == 'string' || o instanceof String;
}

export function isACharacter(o: any): boolean {
    return isAText(o) && (o as string).length==1;
}

export function isASet(o: any): boolean {
    const proto = Object.getPrototypeOf(o) as object;
    // eslint-disable-next-line @typescript-eslint/ban-types
    const ctor = proto["constructor" as keyof typeof proto] as Function;
    return ctor && ctor.name == "Set";
}

export function isAMethod(o: any, params: any[], result: any): boolean {
    if(typeof o != 'function')
        return false;
    // eslint-disable-next-line @typescript-eslint/ban-types
    function countParams(o: Function) {
        let str = o.toString();
        str = str.replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/(.)*/g, '')
            .replace(/{[\s\S]*}/, '')
            .replace(/=>/g, '')
            .trim();
        const lpar = str.indexOf("(");
        const rpar = str.indexOf(")", lpar + 1);
        str = str.substring( lpar + 1, rpar);
        let args = str.split(",");
        args = args.filter(s => s.trim().length > 0);
        return args.length;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    return params.length == countParams(o as Function);
}

export function isAnEnum(o: any): boolean {
    if(typeof o != 'object')
        return false;
    const proto = Object.getPrototypeOf(o) as object;
    if(!proto)
        return false;
    const constructor = proto["constructor" as keyof typeof proto] as object;
    if(!constructor)
        return false;
    const symbolOf = constructor["symbolOf" as keyof typeof constructor] as object;
    const symbols = constructor["symbols" as keyof typeof constructor] as object;
    return !!(symbolOf && symbols);
}

export function isInstanceOf(obj: any, type: any): boolean {
    // eslint-disable-next-line no-undef
    if(obj instanceof type)
        return true;
    if(obj instanceof $Root) {
        if (type instanceof Category) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            return obj.$categories.indexOf(type) >= 0;
        }
    }
    return false;
}

export function isCharacterUpperCase(char: string): boolean {
    return !!/[A-Z]/.exec(char[0]);
}

export function compareValues(value1: object | null, value2: object | null): number {
    if(value1==null && value2==null)
        return 0;
    if(value1==null)
        return -1;
    if(value2==null)
        return 1;
    let compareTo = value1["compareTo" as keyof typeof value1];
    if(compareTo)
        return (value1[compareTo] as (obj: object | null) => number)(value2);
    compareTo = value2["compareTo" as keyof typeof value2];
    if(compareTo)
        return -(value2[compareTo] as (obj: object | null) => number)(value1);
    const s1 = value1.toString();
    const s2 = value2.toString();
    return s1 > s2 ? 1 : s1 == s2 ? 0 : -1;
}

// borrowed from http://www.2ality.com/2011/11/improving-typeof.html
export function getTypeName(value: any): string | null {
    if (value == null)
        return "null";
    const t = typeof(value);
    // noinspection FallThroughInSwitchStatementJS
    switch(t) {
        case "function":
            // eslint-disable-next-line @typescript-eslint/ban-types
            if((value as Function).name)
                // eslint-disable-next-line @typescript-eslint/ban-types
                return (value as Function).name;
        // no-break
        case "object": {
            const constructor = (value as object).constructor as object;
            if (constructor) {
                const name = constructor["name" as keyof typeof constructor] as string;
                if (name) {
                    return name;
                } else {
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
            const s = (value as object).toString();
            const matches = s.match(/^\[object (.+)]$/);
            return matches ? matches[1] : null;
            }
        default:
            return t;
    }
}

export function convertToJsonNode(o: any): JsonNode {
    const type = typeof(o);
    switch(type) {
        case 'undefined':
            return null;
        case 'boolean':
        case 'number':
        case 'string':
            return o as JsonNode;
        default:
            if(o == null)
                return null;
            else {
                const obj = o as object;
                const toJsonNode = obj["toJsonNode" as keyof typeof obj];
                if(toJsonNode)
                    return (toJsonNode as () => JsonNode)();
                else
                    return JSON.stringify(o);
            }
    }
}


export function convertToJsonString(o: any): string {
    const node = convertToJsonNode(o);
    return JSON.stringify(node);
}

export function integerRange(start: number, end: number): number[] {
    start = Math.floor(start);
    end = Math.floor(end);

    const diff = end - start;
    if (diff == 0) {
        return [start];
    }

    const keys = Array(Math.abs(diff) + 1).keys();
    return Array.from(keys).map(x => {
        const increment = end > start ? x : -x;
        return start + increment;
    });
}
