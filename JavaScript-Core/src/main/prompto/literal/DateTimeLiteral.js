import Literal from './Literal.ts'
import { DateTimeType } from '../type'
import { DateTimeValue } from '../value'
import { DateTime } from '../intrinsic'

export default class DateTimeLiteral extends Literal {

    constructor(text) {
        const dt = DateTime.parse(text.substring(1,text.length-1));
        super(text, new DateTimeValue(dt));
    }

    check(context: Context): Type {
        return DateTimeType.instance;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(DateTime);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("DateTime.parse(").append(this.text).append(")");
    }
}
