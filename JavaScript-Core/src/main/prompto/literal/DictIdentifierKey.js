import Section from "../parser/Section.js";
import { TextValue } from '../value/index.js'
import { InstanceExpression } from '../expression/index.js'
import { TextType } from "../type/index.js";

export default class DictIdentifierKey extends Section {

    constructor(id) {
        super();
        this.id = id;
    }

    toString() {
        return this.id.toString();
    }

    check(context) {
        const named = context.getRegisteredValue(this.id.toString());
        if (named === null) {
            context.problemListener.reportUnknownIdentifier(this.id, this.id.name);
        } else if (named.getType(context) !== TextType.instance) {
            context.problemListener.reportIllegalValue(this, "Expected a Text, got " + named.getType(context).typeName);
        }
    }

    interpret(context) {
        const value = new InstanceExpression(this.id).interpret(context);
        if(value instanceof TextValue)
            return value;
        else {
            context.problemListener.reportIllegalValue(this, "Expected a Text, got " + value.type.typeName);
            return null;
        }
    }

    transpile(transpiler) {
        transpiler.append("[").append(this.id.name).append("]");
    }

}
