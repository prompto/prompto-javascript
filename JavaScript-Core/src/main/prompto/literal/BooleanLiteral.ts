import Literal from './Literal'
import { BooleanValue } from '../value'
import {BooleanType, IType} from '../type'
import {Context, Transpiler} from "../runtime";

export default class BooleanLiteral extends Literal<BooleanValue> {

    constructor(text: string) {
        super(text, BooleanValue.Parse(text));
    }

    check(context: Context): IType {
        return BooleanType.instance;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.text);
    }
}
