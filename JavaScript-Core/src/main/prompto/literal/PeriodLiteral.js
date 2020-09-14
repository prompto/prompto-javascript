import Literal from "./Literal"
import { PeriodType } from "../type/index"
import { PeriodValue } from "../value/index"
import { Period } from "../intrinsic/index"

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


