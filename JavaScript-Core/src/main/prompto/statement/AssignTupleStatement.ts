import SimpleStatement from './SimpleStatement'
import {VoidType, AnyType, TupleType, IType} from '../type'
import {Context, Transpiler, Variable} from '../runtime'
import {IntegerValue, IValue, TupleValue} from '../value'
import { SyntaxError } from '../error'
import {IdentifierList} from "../grammar";
import {IExpression} from "../expression";
import {CodeWriter} from "../utils";

export default class AssignTupleStatement extends SimpleStatement {

    ids: IdentifierList;
    expression: IExpression;

    constructor(ids: IdentifierList, expression: IExpression) {
        super();
        this.ids = ids;
        this.expression = expression;
    }

    check(context: Context): IType {
        const type = this.expression.check(context);
        if(type!=TupleType.instance) {
            throw new SyntaxError("Expecting a tuple expression, got " + type.name);
        }
        this.ids.forEach(id => {
            const actual = context.getRegistered(id);
            if(actual==null) {
                context.registerInstance(new Variable(id, AnyType.instance), true);
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
        this.ids.forEach(id => {
            const actual = transpiler.context.getRegistered(id);
            if(actual==null)
                transpiler.context.registerInstance(new Variable(id, AnyType.instance), true);
         }, this);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("var [");
        this.ids.forEach(id => {
            transpiler.append(id.name).append(", ");
            const actual = transpiler.context.getRegistered(id);
            if(actual==null)
                transpiler.context.registerInstance(new Variable(id, AnyType.instance), true);
        });
        transpiler.trimLast(2);
        transpiler.append("] = ");
        this.expression.transpile(transpiler);
    }

    interpret(context: Context): IValue | null {
        const object = this.expression.interpret(context);
        if(!(object instanceof TupleValue)) {
            throw new SyntaxError("Expecting a tuple expression, got " + typeof(object));
        }
        for(let i=0;i<this.ids.length;i++) {
            const id = this.ids[i];
            const value = object.GetItemValue(context, new IntegerValue(i+1)); // since getItemInContext is 1 based
            if(context.getRegisteredInstance(id)==null) {
                context.registerInstance(new Variable(id, AnyType.instance), true);
            }
            context.setValue(id, value);
        }
        return null;
    }

    toDialect(writer: CodeWriter): void {
        this.ids.toDialect(writer, false);
        writer.append(" = ");
        this.expression.toDialect(writer);
    }
}
