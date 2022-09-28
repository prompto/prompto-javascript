import Literal from './Literal'
import {DecimalType, IType} from '../type'
import { DecimalValue } from '../value'
import {Context, Transpiler} from "../runtime";

export default class DecimalLiteral extends Literal<DecimalValue> {

    constructor(text: string) {
        super(text, DecimalValue.Parse(text));
    }

    check(context: Context): IType {
        return DecimalType.instance;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do;
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.text);
    }
}
