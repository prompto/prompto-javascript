import SimpleStatement from '../../../main/prompto/statement/SimpleStatement.ts'
import { VoidType, AnyType, TupleType } from '../type'
import { Variable } from '../runtime'
import { IntegerValue, TupleValue } from '../value'
import { SyntaxError } from '../error'

export default class AssignTupleStatement extends SimpleStatement {

    constructor(names, expression) {
        super();
        this.names = names;
        this.expression = expression;
    }

    check(context: Context): IType {
        const type = this.expression.check(context);
        if(type!=TupleType.instance) {
            throw new SyntaxError("Expecting a tuple expression, got " + type.getName());
        }
        this.names.forEach(name => {
            const actual = context.getRegistered(name);
            if(actual==null) {
                context.registerValue(new Variable(name, AnyType.instance));
            } else {
                // need to check type compatibility
                const actualType = actual.getType(context);
                actualType.checkAssignableFrom(context, this, AnyType.instance);
            }
        }, this);
        return VoidType.instance;
    }

    declare(transpiler: Transpiler): void {
        this.expression.declare(transpiler);
        this.names.forEach(name => {
            const actual = transpiler.context.getRegistered(name);
            if(actual==null)
                transpiler.context.registerValue(new Variable(name, AnyType.instance));
         }, this);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("var [");
        this.names.forEach(name => {
            transpiler.append(name).append(", ");
            const actual = transpiler.context.getRegistered(name);
            if(actual==null)
                transpiler.context.registerValue(new Variable(name, AnyType.instance));
        });
        transpiler.trimLast(2);
        transpiler.append("] = ");
        this.expression.transpile(transpiler);
    }

    interpret(context: Context): IValue {
        const object = this.expression.interpret(context);
        if(!(object instanceof TupleValue)) {
            throw new SyntaxError("Expecting a tuple expression, got " + typeof(object));
        }
        for(let i=0;i<this.names.length;i++) {
            const name = this.names[i];
            const value = object.getItemInContext(context, new IntegerValue(i+1)); // since getItemInContext is 1 based
            if(context.getRegisteredValue(name)==null) {
                context.registerValue(new Variable(name, AnyType.instance));
            }
            context.setValue(name, value);
        }
        return null;
    }

    toDialect(writer: CodeWriter): void {
        this.names.toDialect(writer, false);
        writer.append(" = ");
        this.expression.toDialect(writer);
    }
}
