import Expression from './Expression.js'
import { TypeType } from '../type/index.js'
import { TypeValue } from '../value/index.js'

export default class TypeExpression extends Expression {

    constructor(value) {
        super();
        this.value = value;
    }

    toDialect(writer) {
        writer.append(this.value.toString());
    }

    toString() {
        return this.value.toString();
    }

    check(context) {
        this.value.checkExists(context);
        return new TypeType(this.value);
    }

    interpret(context) {
        return new TypeValue(this.value);
    }

    declare(transpiler) {
        this.value.declare(transpiler);
    }

    transpile(transpiler) {
        this.value.transpile(transpiler);
    }

    getMemberValue(context, name) {
        return this.value.getStaticMemberValue(context, name);
    }
}