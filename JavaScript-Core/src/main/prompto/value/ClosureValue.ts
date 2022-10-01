import BaseValue from "./BaseValue";
import {Context} from "../runtime";
import {MethodType} from "../type";
import {IValue, NullValue} from "./index";

export default class ClosureValue extends BaseValue<MethodType> {

    context: Context;

    constructor(context: Context, type: MethodType) {
        super(type, type);
        this.context = context;
    }

    interpret(context: Context): IValue {
        const parentMost = this.context.getParentMostContext();
        const savedParent = parentMost.getParentContext();
        if(!context.isChildOf(parentMost))
            parentMost.setParentContext(context);
        try {
            const local = this.context.newChildContext();
            return this.doInterpret(local);
        } finally {
            if(savedParent)
                parentMost.setParentContext(savedParent);
        }
    }

    doInterpret(context: Context): IValue {
        return this.value.method.interpret(context) || NullValue.instance;
    }

    convertToJavaScript() {
        return this;
    }
}


