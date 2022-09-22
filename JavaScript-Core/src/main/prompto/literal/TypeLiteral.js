import Literal from './Literal.ts'
import { TypeType } from '../type'
import { TypeValue } from '../value'
import { Dialect } from '../parser'
import { MethodDeclarationMap } from '../runtime'
import { Type } from '../intrinsic'

export default class TypeLiteral extends Literal {
  
    constructor(type) {
        super(type.toString(), type);
    }

    check(context: Context): Type {
        return new TypeType(this.value);
    }

    interpret(context: Context): Value {
        return new TypeValue(this.value);
    }

    toDialect(writer: CodeWriter): void {
        if(writer.dialect===Dialect.E) {
            const decl = writer.context.getRegisteredDeclaration(this.value.id);
            if(decl instanceof MethodDeclarationMap)
                writer.append("Method: ");
            else
                writer.append("Type: ");
        }
        this.value.toDialect(writer);
    }

    parenttoDialect(writer: CodeWriter): void {
        this.value.toDialect(writer);
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(Type);
    }

    transpile(transpiler: Transpiler): void {
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

