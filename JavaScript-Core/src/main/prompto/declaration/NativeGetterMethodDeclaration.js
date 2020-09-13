import GetterMethodDeclaration from "./GetterMethodDeclaration"

export default class NativeGetterMethodDeclaration extends GetterMethodDeclaration {

    constructor(id, statements) {
        super(id, statements);
    }

    interpret(context) {
        context.enterMethod(this);
        try {
            const result = this.statements.interpretNative(context, this.returnType);
            return this.castToReturnType(context, result);
        } finally {
            context.leaveMethod(this);
        }
    }

    castToReturnType(context, value) {
        // can only cast to specified type, and if required
        if(this.returnType!=null && !(this.returnType.isAssignableFrom(context, value.type))) {
            // only cast if implemented, on a per type basis
            if(this.returnType.nativeCast)
                value = this.returnType.nativeCast(context, value);
        }
        return value;
    }
}

