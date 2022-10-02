import { UnresolvedIdentifier, ParenthesisExpression } from '../expression'
import { Dialect } from '../parser'
import { UnresolvedCall } from '../statement'
import {MethodType, VoidType, NullType, IType} from '../type'
import {Instance, NullValue, ClosureValue, IValue} from '../value'
import { NullReferenceError } from '../error'
import IExpression from "./IExpression";
import {Identifier} from "../grammar";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import SelectorBase from "./SelectorBase";

export default class MemberSelector extends SelectorBase {

    id: Identifier;

    constructor(parent: IExpression | null, id: Identifier) {
        super(parent);
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    toDialect(writer: CodeWriter): void {
        if (writer.dialect == Dialect.E)
            this.toEDialect(writer);
        else
            this.toOMDialect(writer);
    }

    toEDialect(writer: CodeWriter): void {
        try {
            const type = this.check(writer.context);
            if (type instanceof MethodType) {
                writer.append("Method: ");
            }
        } catch (e) {
            // gracefully skip exceptions
        }
       this.parentAndMembertoDialect(writer);
    }

    toOMDialect(writer: CodeWriter) {
        this.parentAndMembertoDialect(writer);
    }

    parentAndMembertoDialect(writer: CodeWriter): void {
        // ensure singletons are not treated as constructors
        try {
            this.resolveParent(writer.context);
        } catch(e) {
            // ignore
        }
        if (writer.dialect == Dialect.E)
            this.parentToEDialect(writer);
        else
            this.parentToOMDialect(writer);
        writer.append(".");
        writer.append(this.name);
    }

    parentToEDialect(writer: CodeWriter): void {
        if(this.parent instanceof UnresolvedCall) {
            writer.append('(');
            this.parent?.toDialect(writer);
            writer.append(')');
        } else
            this.parent!.parentToDialect(writer);
    }

    parentToOMDialect(writer: CodeWriter): void {
        if(this.parent instanceof ParenthesisExpression && this.parent.expression instanceof UnresolvedCall)
            this.parent.expression.toDialect(writer);
        else
            this.parent!.parentToDialect(writer);
    }

    declare(transpiler: Transpiler): void {
        const parent = this.resolveParent(transpiler.context);
        parent?.declareParent(transpiler);
        const parentType = this.checkParent(transpiler.context);
        return parentType.declareMember(transpiler, this.id);
    }

    transpile(transpiler: Transpiler): void {
        const parent = this.resolveParent(transpiler.context);
        parent.transpileParent(transpiler);
        transpiler.append(".");
        const parentType = this.checkParent(transpiler.context);
        parentType.transpileMember(transpiler, this.id);
    }

    transpileReference(transpiler: Transpiler, method: MethodType): void {
        const parent = this.resolveParent(transpiler.context);
        parent.transpileParent(transpiler);
        transpiler.append(".");
        transpiler.append(method.method.getTranspiledName(transpiler.context));
    }

    toString() {
        return this.parent!.toString() + "." + this.name;
    }

    check(context: Context): IType {
        const parentType = this.checkParent(context);
        if(parentType && parentType != NullType.instance)
            return parentType.checkMember(context, this.id, this.id);
        else
            return VoidType.instance;
    }

    interpretExpression(context: Context): IValue {
        // resolve parent to keep clarity
        const parent = this.resolveParent(context);
        const instance = parent.interpretExpression(context);
        if (instance == null || instance == NullValue.instance)
            throw new NullReferenceError();
        else
            return instance.GetMemberValue(context, this.id, false);
    }

    resolveParent(context: Context): IExpression {
        if(this.parent instanceof UnresolvedIdentifier) {
            this.parent.checkMember(context);
            return this.parent.resolved!;
        } else
            return this.parent!;
    }

    interpretReference(context: Context): IValue {
        // resolve parent to keep clarity
        const parent = this.resolveParent(context);
        const instance = parent.interpretExpression(context);
        if (!instance || instance == NullValue.instance)
            throw new NullReferenceError();
        else if (instance instanceof Instance<never>) {
            const category = instance.declaration;
            const methods = category.getMemberMethodsMap(context, this.id);
            const method = methods.getFirst();
            // TODO check prototype
            return new ClosureValue(context.newInstanceContext(instance, null, true), new MethodType(method!));
        } else
            throw new SyntaxError("Should never get here!");
    }

}
