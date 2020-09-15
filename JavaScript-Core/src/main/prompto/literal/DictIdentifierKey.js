import { TextValue } from '../value/index.js'
import { InstanceExpression } from '../expression/index.js'

export default class DictIdentifierKey {
 
    constructor(id) {
        this.id = id;
    }

    toString() {
        return this.id.toString();
    }

    transpile(transpiler) {
        transpiler.append("[").append(this.id.name).append("]");
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
}
