import EnumSymbol from './EnumSymbol'
import { ConstructorExpression } from '../expression'
import {TextValue, IValue, ConcreteInstance} from '../value'
import { TextLiteral } from '../literal'
import { AttributeParameter } from '../param'
import { Argument, ArgumentList, Identifier } from '../grammar'
import { SyntaxError } from '../error'
import {CodeWriter} from "../utils";
import {CategoryType, EnumeratedCategoryType} from "../type";
import {Context, Transpiler} from "../runtime";

export default class CategorySymbol extends EnumSymbol<EnumeratedCategoryType> {

    args: ArgumentList;
    instance?: ConcreteInstance;

    constructor(id: Identifier, args: ArgumentList) {
        super(id);
        this.args = args;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.name);
        writer.append(" ");
        this.args.toDialect(writer);
    }

    getType(context: Context): CategoryType {
        return this.type;
    }

    toString(): string {
        if(this.args!=null) {
            return this.args.toString();
        } else {
            return this.type.name;
        }
    }

    check(context: Context): CategoryType {
        const decl = context.getRegisteredCategoryDeclaration(this.type.id);
        if(!decl) {
            throw new SyntaxError("Unknown category " + this.type.name);
        }
        if(this.args!=null) {
            context = context.newLocalContext();
            this.args.forEach(arg => {
                if(!decl.hasAttribute(context, arg.id!)) {
                    throw new SyntaxError("'" + arg.name! + "' is not an attribute of '" + this.type.name + "'");
                }
                arg.check(context);
            }, this);
        }
        return this.type;
    }

    interpret(context: Context): IValue {
        return this.makeInstance(context);
    }

    makeInstance(context: Context): ConcreteInstance {
        if(!this.instance) {
            const instance = (this.type as CategoryType).newInstance(context) as unknown as ConcreteInstance;
            instance.mutable = true;
            if(this.args!=null) {
                context = context.newLocalContext();
                this.args.forEach(argument => {
                    const value = argument.expression.interpret(context);
                    instance.SetMemberValue(context, argument.id!, value);
                });
            }
            instance.SetMemberValue(context, new Identifier("name"), new TextValue(this.name));
            instance.mutable = false;
            this.instance = instance;
        }
        return this.instance;
    }

    getMemberValue(context: Context, id: Identifier, autoCreate?: boolean): IValue {
        const instance = this.makeInstance(context);
        return instance.GetMemberValue(context, id);
    }

    declare(transpiler: Transpiler): void {
        this.type.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.name);
    }

    initialize(transpiler: Transpiler): void {
        transpiler.append("var ").append(this.name).append(" = ");
        const param = new AttributeParameter(new Identifier("name"), false);
        const argument = new Argument(param, new TextLiteral('"' + this.name + '"'));
        const args = new ArgumentList(this.args);
        args.add(argument);
        const exp = new ConstructorExpression(this.type, null, args);
        exp.transpile(transpiler);
        transpiler.append(";").newLine();
    }

    initializeError(transpiler: Transpiler): void {
        transpiler.append("var ").append(this.name).append(" = new ").append(this.type.name).append("({");
        transpiler.append("name: '").append(this.name).append("', ");
        if(this.args!=null) {
            this.args.forEach(argument => {
                transpiler.append(argument.parameter!.name).append(":");
                argument.expression.transpile(transpiler);
                transpiler.append(", ");
            }, this);
        }
        transpiler.trimLast(2);
        transpiler.append("});").newLine();
    }

}
