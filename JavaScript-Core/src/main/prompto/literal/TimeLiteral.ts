import Literal from './Literal'
import {IType, TimeType} from '../type'
import { TimeValue } from '../value'
import { LocalTime } from '../intrinsic'
import {Context, Transpiler} from "../runtime";

export default class TimeLiteral extends Literal<TimeValue> {

    constructor(text: string) {
        const lt = LocalTime.parse(text.substring(1,text.length-1));
        super(text, new TimeValue(lt));
    }

    check(context: Context): IType {
        return TimeType.instance;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(LocalTime);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("LocalTime.parse(").append(this.text).append(")");
    }
}


