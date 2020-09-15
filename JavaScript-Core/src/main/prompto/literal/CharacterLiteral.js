import Literal from './Literal.js'
import { CharacterType } from '../type/index.js'
import { CharacterValue } from '../value/index.js'

/*jshint evil:true*/
function unescape(text) {
	return eval(text);
}

export default class CharacterLiteral extends Literal {

    constructor(text) {
        super(text, new CharacterValue(unescape(text)));
    }

    check(context) {
        return CharacterType.instance;
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}


