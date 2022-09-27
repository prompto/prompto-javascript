import { NotMutableError } from '../error'
import {Section} from "../parser";
import {IExpression} from "../expression";
import {Identifier} from "../grammar";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {IType} from "../type";

export default class MemberInstance extends Section {

    parent: IExpression | null;
    id: Identifier;

    constructor(id: Identifier) {
        super();
        this.parent = null;
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    toString() {
        return this.parent!.toString() + "." + this.name;
    }

    toDialect(writer: CodeWriter): void {
        this.parent!.toDialect(writer);
        writer.append(".");
        writer.append(this.name);
    }

    interpret(context: Context): IValue {
        const root = this.parent!.interpret(context);
        return root.GetMemberValue(context, this.id, true);
    }

    checkAssignValue(context: Context, section: Section, valueType: IType) {
        return this.parent!.checkAssignMember(context, section, this.id, valueType);
    }

    checkAssignMember(context: Context, section: Section, id: Identifier, valueType: IType) {
        this.parent!.checkAssignMember(context, section, this.id, valueType);
        return valueType; // TODO
    }

    checkAssignItem(context: Context, section: Section, itemType: IType, valueType: IType) {
        return valueType; // TODO
    }

    assign(context: Context, expression: IExpression) {
        const root = this.parent!.interpret(context);
        if(!root.mutable)
            throw new NotMutableError();
        const value = expression.interpret(context);
        root.SetMemberValue(context, this.id, value);
    }

    check(context: Context): IType {
        const parentType = this.parent!.check(context);
        return parentType.checkMember(context, this, this.id);
    }

    declare(transpiler: Transpiler): void {
        this.parent!.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.parent!.transpile(transpiler);
        transpiler.append(".").append(this.name);
    }

    declareAssign(transpiler: Transpiler, expression: IExpression) {
        this.parent!.declare(transpiler);
        expression.declare(transpiler);
    }

    transpileAssign(transpiler: Transpiler, expression: IExpression) {
        const parentType = this.parent!.check(transpiler.context);
        this.parent!.transpileAssignParent(transpiler);
        parentType.transpileAssignMemberValue(transpiler, this.id, expression);
    }

    transpileAssignParent(transpiler: Transpiler) {
        const parentType = this.parent!.check(transpiler.context);
        this.parent!.transpileAssignParent(transpiler);
        parentType.transpileAssignMember(transpiler, this.id);
    }
}
