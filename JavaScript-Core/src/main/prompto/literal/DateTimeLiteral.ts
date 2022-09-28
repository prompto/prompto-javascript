import Literal from './Literal'
import {DateTimeType, IType} from '../type'
import { DateTimeValue } from '../value'
import { DateTime } from '../intrinsic'
import {Context, Transpiler} from "../runtime";

export default class DateTimeLiteral extends Literal<DateTimeValue> {

    constructor(text: string) {
        const dt = DateTime.parse(text.substring(1,text.length-1));
        super(text, new DateTimeValue(dt));
    }

    check(context: Context): IType {
        return DateTimeType.instance;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(DateTime);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("DateTime.parse(").append(this.text).append(")");
    }
}
