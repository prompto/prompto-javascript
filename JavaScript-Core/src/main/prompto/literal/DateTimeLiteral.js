import Literal from './Literal.js'
import { DateTimeType } from '../type/index.js'
import { DateTimeValue } from '../value/index.js'
import { DateTime } from '../intrinsic/index.js'

export default class DateTimeLiteral extends Literal {

    constructor(text) {
        const dt = DateTime.parse(text.substring(1,text.length-1));
        super(text, new DateTimeValue(dt));
    }

    check(context) {
        return DateTimeType.instance;
    }

    declare(transpiler) {
        transpiler.require(DateTime);
    }

    transpile(transpiler) {
        transpiler.append("DateTime.parse(").append(this.text).append(")");
    }
}
