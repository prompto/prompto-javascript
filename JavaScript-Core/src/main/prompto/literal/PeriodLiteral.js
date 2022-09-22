import Literal from './Literal.ts'
import { PeriodType } from '../type'
import { PeriodValue } from '../value'
import { Period } from '../intrinsic'

export default class PeriodLiteral extends Literal {

    constructor(text) {
        super(text, new PeriodValue(Period.parse(text.substring(1,text.length-1))));
    }

    check(context: Context): Type {
        return PeriodType.instance;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(Period);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("Period.parse(").append(this.text).append(")");
    }
}


