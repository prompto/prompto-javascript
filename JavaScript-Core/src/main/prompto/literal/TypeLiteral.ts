import Literal from './Literal'
import {IType, TypeType} from '../type'
import {IValue, TypeValue} from '../value'
import { Dialect } from '../parser'
import {Context, MethodDeclarationMap, Transpiler} from '../runtime'
import { Type } from '../intrinsic'
import {CodeWriter} from "../utils";

export default class TypeLiteral extends Literal<TypeValue> {
  
    constructor(type: IType) {
        super(type.toString(), new TypeValue(type));
    }

    check(context: Context): IType {
        return new TypeType(this.value.value);
    }

    interpretExpression(context: Context): IValue {
        return this.value;
    }

    toDialect(writer: CodeWriter): void {
        if(writer.dialect==Dialect.E) {
            const decl = writer.context.getRegistered(this.value.value.id);
            if(decl instanceof MethodDeclarationMap)
                writer.append("Method: ");
            else
                writer.append("Type: ");
        }
        this.value.value.toDialect(writer);
    }

    parentToDialect(writer: CodeWriter): void {
        this.value.value.toDialect(writer);
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(Type);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("new Type('").append(this.value.toString()).append("')");
    }

    declareParent(transpiler: Transpiler) {
        this.value.declare(transpiler);
    }

    transpileParent(transpiler: Transpiler) {
        transpiler.append(this.value.toString());
    }
}

