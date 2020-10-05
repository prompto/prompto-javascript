import Value from './Value.js'

export default class ClosureValue extends Value {
 
    constructor(context, type) {
        super(type);
        this.context = context;
    }

    interpret(context) {
        const parentMost = this.context.getParentMostContext();
        const savedParent = parentMost.getParentContext();
        if(!context.isChildOf(parentMost))
            parentMost.setParentContext(context);
        try {
            const local = this.context.newChildContext();
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


