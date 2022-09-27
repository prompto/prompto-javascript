import Literal from './Literal.ts'
import { DateType } from '../type'
import { DateValue } from '../value'
import { LocalDate } from '../intrinsic'

export default class DateLiteral extends Literal {

    constructor(text) {
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

