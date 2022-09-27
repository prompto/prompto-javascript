import BaseValue from '../value/BaseValue'
import {IValue} from "../value";
import {IType} from "../type";
import {IExpression} from "./index";
import {Context} from "../runtime";
import ISliceable from "../value/ISliceable";
import {CodeWriter} from "../utils";

export default class ValueExpression extends BaseValue<IValue> implements IExpression, ISliceable {

    constructor(type: IType, value: IValue) {
        super(type, value);
    }


    check(context: Context): IType {
        return this.type;
    }

    interpret(context: Context): IValue {
        return this.value;
    }

    toString() {
        return this.value.toString();
    }

    toDialect(writer: CodeWriter) {
        writer.append(this.value.toString());
    }
}
