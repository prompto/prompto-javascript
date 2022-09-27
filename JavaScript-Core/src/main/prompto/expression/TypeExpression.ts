import BaseExpression from './BaseExpression'
import {IType, TypeType} from '../type'
import {IValue, TypeValue} from '../value'
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {Identifier} from "../grammar";

export default class TypeExpression extends BaseExpression {

    value: IType;

    constructor(value: IType) {
        super();
        this.value = value;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.value.toString());
    }

    toString() {
        return this.value.toString();
    }

    check(context: Context): IType {
        this.value.checkExists(context);
        return new TypeType(this.value);
    }

    interpret(context: Context): IValue {
        return new TypeValue(this.value);
    }

    declare(transpiler: Transpiler): void {
        this.value.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.value.transpile(transpiler);
    }

    getMemberValue(context: Context, member: Identifier) {
        return this.value.getStaticMemberValue(context, member);
    }
}
