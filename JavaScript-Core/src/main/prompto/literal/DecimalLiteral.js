import Literal from '../../../main/prompto/literal/Literal.ts'
import { DecimalType } from '../type'
import { DecimalValue } from '../value'

export default class DecimalLiteral extends Literal {

    constructor(text) {
        super(text, DecimalValue.Parse(text));
    }

    check(context: Context): Type {
        return DecimalType.instance;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do;
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.text);
    }
}
