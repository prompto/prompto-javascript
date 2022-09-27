import Literal from './Literal.ts'
import { IntegerType } from '../type'
import { IntegerValue } from '../value'

function parse(value) {
	return parseInt(value);
}

export default class IntegerLiteral extends Literal {

    constructor(text, value) {
        super(text, new IntegerValue(value || parse(text)));
    }

    check(context: Context): IType {
        return IntegerType.instance;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do;
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.text);
    }
}
