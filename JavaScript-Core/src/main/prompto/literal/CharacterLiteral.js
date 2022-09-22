import Literal from './Literal.ts'
import { CharacterType } from '../type'
import { CharacterValue } from '../value'

/*jshint evil:true*/
function unescape(text) {
	return eval(text);
}

export default class CharacterLiteral extends Literal {

    constructor(text) {
        super(text, new CharacterValue(unescape(text)));
    }

    check(context: Context): Type {
        return CharacterType.instance;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.text);
    }
}


