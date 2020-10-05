import Literal from './Literal.js'
import { TextType } from '../type/index.js'
import { TextValue } from '../value/index.js'

/*jshint evil:true*/
function unescape(text) {
	return eval(text);
}

export default class TextLiteral extends Literal {

    constructor(text) {
        super(text, new TextValue(unescape(text)));
    }

    check(context) {
        return TextType.instance;
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}

