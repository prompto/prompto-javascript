import Literal from './Literal.ts'
import { TimeType } from '../type'
import { TimeValue } from '../value'
import { LocalTime } from '../intrinsic'

export default class TimeLiteral extends Literal {

    constructor(text) {
        const lt = LocalTime.parse(text.substring(1,text.length-1));
        super(text, new TimeValue(lt));
    }

    check(context: Context): Type {
        return TimeType.instance;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(LocalTime);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("LocalTime.parse(").append(this.text).append(")");
    }
}


