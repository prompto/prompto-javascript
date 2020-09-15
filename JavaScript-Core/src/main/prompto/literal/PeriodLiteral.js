import Literal from './Literal.js'
import { PeriodType } from '../type/index.js'
import { PeriodValue } from '../value/index.js'
import { Period } from '../intrinsic/index.js'

export default class PeriodLiteral extends Literal {

    constructor(text) {
        super(text, new PeriodValue(Period.parse(text.substring(1,text.length-1))));
    }

    check(context) {
        return PeriodType.instance;
    }

    declare(transpiler) {
        transpiler.require(Period);
    }

    transpile(transpiler) {
        transpiler.append("Period.parse(").append(this.text).append(")");
    }
}


