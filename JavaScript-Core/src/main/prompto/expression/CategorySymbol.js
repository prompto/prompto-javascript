import Symbol from './Symbol.js'
import { ConstructorExpression } from './index.js'
import { TextValue } from '../value/index.js'
import { TextLiteral } from '../literal/index.js'
import { AttributeParameter } from '../param/index.js'
import { Argument, ArgumentList, Identifier } from '../grammar/index.js'
import { SyntaxError } from '../error/index.js'

export default class CategorySymbol extends Symbol {

    constructor(id, args) {
        super(id);
        this.args = args;
        this.instance = null;
        this.type = null;
    }

    toDialect(writer) {
        writer.append(this.name);
        writer.append(" ");
        this.args.toDialect(writer);
    }

    getType(context) {
        return this.type;
    }

    toString() {
        if(this.args!=null) {
            return this.args.toString();
        } else {
            return this.type.name;
        }
    }

    check(context) {
        const cd = context.getRegisteredDeclaration(this.type.name);
        if(cd==null) {
            throw new SyntaxError("Unknown category " + this.type.name);
        }
        if(this.args!=null) {
            context = context.newLocalContext();
            this.args.forEach(function(argument) {
                if(!cd.hasAttribute(context, argument.name)) {
                    throw new SyntaxError("\"" + argument.name + "\" is not an attribute of " + this.type.name);
                }
                argument.check(context);
            });
        }
        return this.type;
    }

    interpret(context) {
        return this.makeInstance(context);
    }

    makeInstance(context) {
        if(this.instance===null) {
            const instance = this.type.newInstance(context);
            instance.mutable = true;
            if(this.args!=null) {
                context = context.newLocalContext();
                this.args.forEach(argument => {
                    const value = argument.expression.interpret(context);
                    instance.setMember(context, argument.name, value);
                });
            }
            instance.setMember(context, "name", new TextValue(this.name));
            instance.mutable = false;
            this.instance = instance;
        }
        return this.instance;
    }

    getMemberValue(context, name, autoCreate) {
        const instance = this.makeInstance(context);
        return instance.getMemberValue(context, name, autoCreate);
    }

    declare(transpiler) {
        this.type.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append(this.name);
    }

    initialize(transpiler) {
        transpiler.append("var ").append(this.name).append(" = ");
        const param = new AttributeParameter(new Identifier("name"));
        const argument = new Argument(param, new TextLiteral('"' + this.name + '"'));
        const args = new ArgumentList(this.args);
        args.add(argument);
        const exp = new ConstructorExpression(this.type, null, args);
        exp.transpile(transpiler);
        transpiler.append(";").newLine();
    }

    initializeError(transpiler) {
        transpiler.append("var ").append(this.name).append(" = new ").append(this.type.name).append("({");
        transpiler.append("name: '").append(this.name).append("', ");
        if(this.args!=null) {
            this.args.forEach(argument => {
                transpiler.append(argument.parameter.name).append(":");
                argument.expression.transpile(transpiler);
                transpiler.append(", ");
            }, this);
        }
        transpiler.trimLast(2);
        transpiler.append("});").newLine();
    }
}
