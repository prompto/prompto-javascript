import Literal from './Literal'
import {IntegerType, IType} from '../type'
import { IntegerValue } from '../value'
import {Context, Transpiler} from "../runtime";

function parse(value: string) {
	return parseInt(value);
}

export default class IntegerLiteral extends Literal<IntegerValue> {

    constructor(text: string, value?: number) {
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
