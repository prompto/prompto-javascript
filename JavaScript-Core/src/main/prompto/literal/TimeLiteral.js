import Literal from "./Literal"
import { TimeType } from "../type/index"
import { TimeValue } from "../value/index"
import { LocalTime } from "../intrinsic/index"

export default class TimeLiteral extends Literal {

    constructor(text) {
        const lt = LocalTime.parse(text.substring(1,text.length-1));
        super(text, new TimeValue(lt));
    }

    check(context) {
        return TimeType.instance;
    }

    declare(transpiler) {
        transpiler.require(LocalTime);
    }

    transpile(transpiler) {
        transpiler.append("LocalTime.parse(").append(this.text).append(")");
    }
}


