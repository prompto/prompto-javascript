import Literal from '../../../main/prompto/literal/Literal.ts'
import { IntegerType } from '../type'
import { IntegerValue } from '../value'

/* jshint bitwise:false*/
function parseHexa(text) {
	let value = 0;
	for(let i=2;i<text.length; i++) {
		value <<= 4;
		const c = text[i];
		if(c>='0' && c<='9') {
			value += (c.charCodeAt(0) - '0'.charCodeAt(0));
		} else if(c>='a' && c<='f') {
			value += (c.charCodeAt(0) - 'a'.charCodeAt(0));
		} else if(c>='A' && c<='F') {
			value += 10 + (c.charCodeAt(0) - 'A'.charCodeAt(0));
		} else {
			throw (text + " is not a valid hexadecimal number");
		}
	}
	return new IntegerValue(value);
}

export default class HexaLiteral extends Literal {

    constructor(text) {
        super(text, parseHexa(text));
    }

    check(context: Context): IType {
        return IntegerType.instance;
    }
}

HexaLiteral.parseHexa = parseHexa;
