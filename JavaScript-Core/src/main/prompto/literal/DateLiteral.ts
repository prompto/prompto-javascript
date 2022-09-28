import Literal from './Literal'
import {DateType, IType} from '../type'
import { DateValue } from '../value'
import { LocalDate } from '../intrinsic'
import {Context, Transpiler} from "../runtime";

export default class DateLiteral extends Literal<DateValue> {

    constructor(text: string) {
        super(text, new DateValue(LocalDate.parse(text.substring(1,text.length-1))));
    }

    check(context: Context): IType {
        return DateType.instance;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(LocalDate);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("LocalDate.parse(").append(this.text).append(")");
    }
}

