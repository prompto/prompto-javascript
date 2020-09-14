import Literal from "./Literal"
import { DateType } from "../type/index"
import { DateValue } from "../value/index"
import { LocalDate } from "../intrinsic/index"

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

