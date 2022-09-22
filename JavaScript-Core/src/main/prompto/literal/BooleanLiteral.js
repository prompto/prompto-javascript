import Literal from './Literal.ts'
import { BooleanValue } from '../value'
import { BooleanType } from '../type'

export default class BooleanLiteral extends Literal {

    constructor(text) {
        super(text, BooleanValue.Parse(text));
    }

    check(context: Context): Type {
        return BooleanType.instance;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.text);
    }
}
