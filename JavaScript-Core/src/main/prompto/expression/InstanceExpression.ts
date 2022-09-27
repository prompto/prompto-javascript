import BaseExpression from './BaseExpression'
import {EqualsExpression, IPredicate} from './index'
import {MethodDeclarationMap, InstanceContext, Variable, LinkedVariable, Transpiler, Context} from '../runtime'
import { Dialect } from '../parser'
import { IParameter } from '../param'
import {AttributeDeclaration, CategoryDeclaration, ConcreteMethodDeclaration, IDeclaration} from '../declaration'
import {MethodType, BooleanType, VoidType, NullType, IType} from '../type'
import {ClosureValue, IValue} from '../value'
import {EqOp, Identifier} from '../grammar'
import { BooleanLiteral } from '../literal'
import { SyntaxError } from '../error'
import {CodeWriter} from "../utils";
import BaseParameter from "../param/BaseParameter";
import {IQueryBuilder} from "../store";

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
            if(!decl)
                return;
            // don't declare member methods
            if(decl.memberOf!=null)
                return;
            // don't declare closures
            if(decl instanceof ConcreteMethodDeclaration) {
                if (decl.declarationOf)
                    return;
            }
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
            transpiler.append(named.getFirst()!.getTranspiledName(transpiler.context));
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


    toDialect(writer: CodeWriter, requireMethod?: boolean): void {
        if(requireMethod === undefined)
            requireMethod = true;
        if(requireMethod && this.requiresMethod(writer))
            writer.append("Method: ");
        writer.append(this.name);
    }

    requiresMethod(writer: CodeWriter): boolean {
        if(writer.dialect !== Dialect.E)
            return false;
        const o = writer.context.getRegistered(this.id);
        return o instanceof MethodDeclarationMap;
    }

    check(context: Context): IType {
        let named = context.getRegistered(this.id);
        if(!named) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            named = context.getRegisteredDeclaration<IDeclaration>(IDeclaration, this.id);
        }
        if(!named) {
            context.problemListener.reportUnknownIdentifier(this.id, this.name);
            return NullType.instance;
        }
        if (named instanceof Variable) { // local variable
            return named.getType(context);
        } else if(named instanceof LinkedVariable) { // local variable
            return named.getType(context);
        } else if (named instanceof BaseParameter) { // named argument
            return named.getType(context);
        } else if(named instanceof CategoryDeclaration) { // any p with x
            return named.getType(context);
        } else if(named instanceof AttributeDeclaration) { // in category method
            return named.getType(context);
        } else if(named instanceof MethodDeclarationMap) { // global method or closure
            return new MethodType(named.getFirst()!);
        } else if (named) {
            context.problemListener.reportIllegalAssignment(this.id, this.id, this.name);
            return VoidType.instance;
        } else
            return NullType.instance;
    }

    checkAttribute(context: Context): AttributeDeclaration | null {
        const decl = context.findAttribute(this.name);
        return decl ? decl : super.checkAttribute(context);
    }

    checkQuery(context: Context): IType {
        return this.check(context);
    }

    interpret(context: Context): IValue {
        if(context.hasValue(this.id)) {
            return context.readValue(this.id)!;
        } else {
            const named = context.getRegistered(this.id);
            if (named instanceof MethodDeclarationMap) {
                const decl = named.getFirst();
                return new ClosureValue(context, new MethodType(decl!))
            } else {
                throw new SyntaxError("No method with name:" + this.name);
            }
        }
    }

    toPredicate(context: Context): IPredicate | null {
        const decl = context.findAttribute(this.name);
        if(!decl) {
            context.problemListener.reportUnknownIdentifier(this.id, this.name);
            return null;
        } else if(decl.getType() != BooleanType.instance) {
            context.problemListener.reportError(this.id, "Expected a Boolean, got: " + decl.getType().name);
            return null;
        } else
            return new EqualsExpression(this, EqOp.EQUALS, new BooleanLiteral("true"));
    }

    interpretQuery(context: Context, builder: IQueryBuilder): void {
        const predicate = this.toPredicate(context);
        if(predicate)
            predicate.interpretQuery(context, builder);
    }

    declareQuery(transpiler: Transpiler): void {
        const predicate = this.toPredicate(transpiler.context);
        if(predicate)
            predicate.declareQuery(transpiler);
    }

    transpileQuery(transpiler: Transpiler, builderName: string): void {
        const predicate = this.toPredicate(transpiler.context);
        if(predicate)
            predicate.transpileQuery(transpiler, builderName);
    }
}

