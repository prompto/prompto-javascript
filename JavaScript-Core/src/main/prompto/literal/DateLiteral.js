import Literal from './Literal.js'
import { DateType } from '../type/index.js'
import { DateValue } from '../value/index.js'
import { LocalDate } from '../intrinsic/index.js'

export default class DateLiteral extends Literal {

    constructor(text) {
        super(text, new DateValue(LocalDate.parse(text.substring(1,text.length-1))));
    }

    check(context) {
        return DateType.instance;
    }

    declare(transpiler) {
        transpiler.require(LocalDate);
    }

    transpile(transpiler) {
        transpiler.append("LocalDate.parse(").append(this.text).append(")");
    }
}

