var Value = require("./Value").Value;

class ClosureValue extends Value {
 
    constructor(context, type) {
        super(type);
        this.context = context;
    }

    interpret(context) {
        var parentMost = this.context.getParentMostContext();
        var savedParent = parentMost.getParentContext();
        if(!context.isChildOf(parentMost))
            parentMost.setParentContext(context);
        try {
            var local = this.context.newChildContext();
            return this.doInterpret(local);
        } finally {
            parentMost.setParentContext(savedParent);
        }
    }

    doInterpret(local) {
        return this.type.method.interpret(local);
    }

    convertToJavaScript() {
        return this;
    }
}


exports.ClosureValue = ClosureValue;
