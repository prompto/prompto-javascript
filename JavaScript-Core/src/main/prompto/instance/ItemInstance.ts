import { NotMutableError } from '../error'
import {AnyType, IType} from '../type'
import {IExpression} from "../expression";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {Section} from "../parser";
import {Identifier} from "../grammar";

export default class ItemInstance extends Section {

    parent: IExpression | null;
    item: IExpression;

    constructor(item: IExpression) {
        super();
        this.parent = null;
        this.item = item;
    }

    toString() {
        return this.parent!.toString() + "[" + this.item.toString() + "]";
    }

    toDialect(writer: CodeWriter): void {
        this.parent!.toDialect(writer);
        writer.append('[');
        this.item.toDialect(writer);
        writer.append(']');
    }

    check(context: Context): IType {
        const parentType = this.parent!.check(context);
        const itemType = this.item.check(context);
        return parentType.checkItem(context, this, itemType);
    }

    checkAssignValue(context: Context, section: Section, valueType: IType) {
        const itemType = this.item.check(context);
        return this.parent!.checkAssignItem(context, section, itemType, valueType);
    }

    checkAssignMember(context: Context, section: Section, member: Identifier, valueType: IType) {
        return AnyType.instance
    }

    checkAssignItem(context: Context, section: Section, itemType: IType, valueType: IType) {
        return AnyType.instance
    }

    assign(context: Context, expression: IExpression) {
        const root = this.parent!.interpret(context);
        if(!root.mutable)
            throw new NotMutableError();
        const item = this.item.interpret(context);
        const value = expression.interpret(context);
        root.SetItemValue(context, item, value);
    }

    interpret(context: Context): IValue {
        const root = this.parent!.interpret(context);
        const item = this.item.interpret(context);
        return root.GetItemValue(context, item);
    }

    declare(transpiler: Transpiler): void {
        this.parent!.declare(transpiler);
        this.item.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.parent!.transpile(transpiler);
        transpiler.append(".item(");
        this.item.transpile(transpiler);
        transpiler.append(")");
    }

    declareAssign(transpiler: Transpiler, expression: IExpression) {
        this.parent!.declare(transpiler);
        this.item.declare(transpiler);
        expression.declare(transpiler);
    }

    transpileAssign(transpiler: Transpiler, expression: IExpression) {
        const parentType = this.parent!.check(transpiler.context);
        this.parent!.transpileAssignParent(transpiler);
        parentType.transpileAssignItemValue(transpiler, this.item, expression);
    }

    transpileAssignParent(transpiler: Transpiler) {
        this.parent!.transpileAssignParent(transpiler);
        transpiler.append(".getItem(");
        this.item.transpile(transpiler);
        transpiler.append(", true)");
    }
}
