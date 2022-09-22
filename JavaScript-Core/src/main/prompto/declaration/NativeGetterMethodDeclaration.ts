import GetterMethodDeclaration from './GetterMethodDeclaration'
import {Identifier} from "../grammar";
import {StatementList} from "../statement";
import {Context} from "../runtime";
import {Value} from "../value";

export default class NativeGetterMethodDeclaration extends GetterMethodDeclaration {

    constructor(id: Identifier, statements: StatementList) {
        super(id, statements);
    }

    interpret(context: Context): Value | null {
        context.enterMethod(this);
        try {
            return this.statements.interpretNative(context, this.returnType);
            // return this.castToReturnType(context, result);
        } finally {
            context.leaveMethod(this);
        }
    }

    /*
    castToReturnType(context: Context, value: Value | null): Value {
        // can only cast to specified type, and if required
        if(this.returnType!=null && !(this.returnType.isAssignableFrom(context, value.type))) {
            // only cast if implemented, on a per type basis
            if(this.returnType.nativeCast)
                value = this.returnType.nativeCast(context, value);
        }
        return value;
    }
    */

}

