import BaseExpression from './BaseExpression'
import { EqualsExpression } from './index'
import { MethodDeclarationMap, InstanceContext, Variable, LinkedVariable } from '../runtime'
import { Dialect } from '../parser'
import { Parameter } from '../param'
import { AttributeDeclaration, CategoryDeclaration } from '../declaration'
import { MethodType, BooleanType, VoidType, NullType } from '../type'
import { ClosureValue } from '../value'
import {EqOp, Identifier} from '../grammar'
import { BooleanLiteral } from '../literal'
import { SyntaxError } from '../error'

export default class InstanceExpression extends BaseExpression {

    id: Identifier;

    constructor(id: Identifier) {
        super();
        this.copySectionFrom(id);
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    toString() {
        return this.name;
    }

    declare(transpiler: Transpiler): void {
        const named = transpiler.context.getRegistered(this.id);
        if(named instanceof MethodDeclarationMap) {
            const decl = named.getFirst();
            // don't declare member methods
            if(decl.memberOf!=null)
                return;
            // don't declare closures
            if(decl.declarationStatement)
                return;
            decl.declare(transpiler);
        }
    }

    transpile(transpiler: Transpiler): void {
        const context = transpiler.context.contextForValue(this.id);
        if(context instanceof InstanceContext) {
            context.instanceType.transpileInstance(transpiler);
            transpiler.append(".");
        }
        const named = transpiler.context.getRegistered(this.id);
        if(named instanceof MethodDeclarationMap) {
            transpiler.append(named.getFirst().getTranspiledName());
            // need to bind instance methods
            if(context instanceof InstanceContext) {
                transpiler.append(".bind(");
                context.instanceType.transpileInstance(transpiler);
                transpiler.append(")");
            }
        } else {
            if (transpiler.getterName === this.name)
                transpiler.append("$");
            transpiler.append(this.name);
        }
    }

    toDialect(writer, requireMethod) {
        if(requireMethod === undefined)
            requireMethod = true;
        if(requireMethod && this.requiresMethod(writer))
            writer.append("Method: ");
        writer.append(this.name);
    }

    requiresMethod(writer) {
        if(writer.dialect !== Dialect.E)
            return false;
        const o = writer.context.getRegistered(this.id);
        return o instanceof MethodDeclarationMap;
    }

    check(context: Context): Type {
        let named = context.getRegistered(this.id);
        if(named==null)
            named = context.getRegisteredDeclaration(this.id);
        if (named instanceof Variable) { // local variable
            return named.getType(context);
        } else if(named instanceof LinkedVariable) { // local variable
            return named.getType(context);
        } else if (named instanceof Parameter) { // named argument
            return named.getType(context);
        } else if(named instanceof CategoryDeclaration) { // any p with x
            return named.getType(context);
        } else if(named instanceof AttributeDeclaration) { // in category method
            return named.getType(context);
        } else if(named instanceof MethodDeclarationMap) { // global method or closure
            return new MethodType(named.getFirst());
        } else if (named) {
            context.problemListener.reportIllegalAssignment(this.id, this.name);
            return VoidType.instance;
        } else {
            context.problemListener.reportUnknownIdentifier(this.id, this.name);
            return NullType.instance;
        }
    }

    checkAttribute(context) {
        const decl = context.findAttribute(this.name);
        return decl ? decl : super.checkAttribute(context);
    }

    checkQuery(context) {
        return this.check(context);
    }

    interpret(context: Context): Value {
        if(context.hasValue(this.id)) {
            return context.getValue(this.id);
        } else {
            const named = context.getRegistered(this.id);
            if (named instanceof MethodDeclarationMap) {
                const decl = named.getFirst();
                return new ClosureValue(context, new MethodType(decl))
            } else {
                throw new SyntaxError("No method with name:" + this.name);
            }
        }
    }

    toPredicate(context) {
        const decl = context.findAttribute(this.name);
        if(!decl)
            context.problemListener.reportUnknownIdentifier(this.id, this.name);
        else if(decl.getType() !== BooleanType.instance)
            context.problemListener.reportError(this.id, "Expected a Boolean, got: " + decl.getType());
        else
            return new EqualsExpression(this, EqOp.EQUALS, new BooleanLiteral("true"));
    }

    interpretQuery(context, builder) {
        const predicate = this.toPredicate(context);
        predicate && predicate.interpretQuery(context, builder);
    }

    declareQuery(transpiler) {
        const predicate = this.toPredicate(transpiler.context);
        predicate && predicate.declareQuery(transpiler);
    }

    transpileQuery(transpiler, builderName) {
        const predicate = this.toPredicate(transpiler.context);
        predicate && predicate.transpileQuery(transpiler, builderName);
    }
}

