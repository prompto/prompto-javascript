import Literal from './Literal'
import {IType, PeriodType} from '../type'
import { PeriodValue } from '../value'
import { Period } from '../intrinsic'
import {Context, Transpiler} from "../runtime";

export default class PeriodLiteral extends Literal<PeriodValue> {

    constructor(text: string) {
        super(text, new PeriodValue(Period.parse(text.substring(1,text.length-1))));
    }

    check(context: Context): IType {
        return PeriodType.instance;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(Period);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("Period.parse(").append(this.text).append(")");
    }
}


