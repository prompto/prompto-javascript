import {IValue, NullValue, TextValue} from '../value'
import { InstanceExpression } from '../expression'
import {IType, TextType, VoidType} from "../type";
import DictKey from "./DictKey";
import {Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";

export default class DictIdentifierKey extends DictKey {

    id: Identifier;

    constructor(id: Identifier) {
        super();
        this.id = id;
    }

    toString() {
        return this.id.toString();
    }

    check(context: Context): IType {
        const named = context.getRegisteredInstance(this.id);
        if (named) {
            if (named.getType(context) != TextType.instance)
                context.problemListener.reportIllegalValue(this, "Expected a Text, got " + named.getType(context).name);
            return named.getType(context)
        } else  {
            context.problemListener.reportUnknownIdentifier(this, this.id.name);
            return VoidType.instance;
        }
    }

    interpret(context: Context): IValue {
        const value = new InstanceExpression(this.id).interpret(context);
        if(value instanceof TextValue)
            return value;
        else {
            context.problemListener.reportIllegalValue(this, "Expected a Text, got " + value.type.name);
            return NullValue.instance;
        }
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("[").append(this.id.name).append("]");
    }


}
