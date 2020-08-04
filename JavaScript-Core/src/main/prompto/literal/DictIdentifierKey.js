var TextValue = require("../value/TextValue").TextValue;
var InstanceExpression = require("../expression/InstanceExpression").InstanceExpression;

class DictIdentifierKey {
 
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
        var value = new InstanceExpression(this.id).interpret(context);
        if(value instanceof TextValue)
            return value;
        else {
            context.problemListener.reportIllegalValue(this, "Expected a Text, got " + value.type.typeName);
            return null;
        }
    }
}


exports.DictIdentifierKey = DictIdentifierKey;