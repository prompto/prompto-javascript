import Literal from "./Literal"
import { TypeType } from "../type/index"
import { TypeValue } from "../value/index"
import { Dialect } from "../parser/index"
import { MethodDeclarationMap } from "../runtime/index"
import { Type } from "../intrinsic/index"

export default class TypeLiteral extends Literal {
  
    constructor(type) {
        super(type.toString(), type);
    }

    check(context) {
        return new TypeType(this.value);
    }

    interpret(context) {
        return new TypeValue(this.value);
    }

    toDialect(writer) {
        if(writer.dialect==Dialect.E) {
            const decl = writer.context.getRegisteredDeclaration(this.value.id);
            if(decl instanceof MethodDeclarationMap)
                writer.append("Method: ");
            else
                writer.append("Type: ");
        }
        this.value.toDialect(writer);
    }

    parentToDialect(writer) {
        this.value.toDialect(writer);
    }

    declare(transpiler) {
        transpiler.require(Type);
    }

    transpile(transpiler) {
        transpiler.append("new Type('").append(this.value.toString()).append("')");
        return false;
    }

    declareParent(transpiler) {
        this.value.declare(transpiler);
    }

    transpileParent(transpiler) {
        transpiler.append(this.value.toString());
        return false;
    }
}

