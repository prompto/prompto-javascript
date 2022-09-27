import BaseExpression from './BaseExpression'
import {IType, TypeType} from '../type'
import { TypeValue } from '../value'

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

    interpret(context: Context): Value {
        return new TypeValue(this.value);
    }

    declare(transpiler: Transpiler): void {
        this.value.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.value.transpile(transpiler);
    }

    getMemberValue(context, name) {
        return this.value.getStaticMemberValue(context, name);
    }
}
