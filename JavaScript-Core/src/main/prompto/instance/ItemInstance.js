import { NotMutableError } from '../error'
import { AnyType } from '../type'
import { SyntaxError } from '../error'

export default class ItemInstance {

    constructor(item) {
        this.parent = null;
        this.item = item;
    }

    toString() {
        return this.parent.toString() + "[" + this.item.toString() + "]";
    }

    toDialect(writer: CodeWriter): void {
        this.parent.toDialect(writer);
        writer.append('[');
        this.item.toDialect(writer);
        writer.append(']');
    }

    check(context: Context): IType {
        const parentType = this.parent.check(context);
        const itemType = this.item.check(context);
        return parentType.checkItem(context, itemType);
    }

    checkAssignValue(context, valueType, section) {
        const itemType = this.item.check(context);
        return this.parent.checkAssignItem(context, itemType, valueType, section);
    }

    checkAssignMember(context, name, valueType, section) {
        return AnyType.instance
    }

    checkAssignItem(context, itemType, valueType, section) {
        return AnyType.instance
    }

    assign(context, expression) {
        const root = this.parent.interpret(context);
        if(!root.mutable)
            throw new NotMutableError();
        const item = this.item.interpret(context);
        const value = expression.interpret(context);
        if (root.setItemInContext) {
            root.setItemInContext(context, item, value);
        } else {
            throw new SyntaxError("Unknown item/key: " + typeof(item));
        }
    }

    interpret(context: Context): IValue {
        const root = this.parent.interpret(context);
        const item = this.item.interpret(context);
        if (root.getItemInContext) {
            return root.getItemInContext(context, item);
        } else {
            throw new SyntaxError("Unknown item/key: " + typeof(item));
        }
    }

    declare(transpiler: Transpiler): void {
        this.parent.declare(transpiler);
        this.item.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.parent.transpile(transpiler);
        transpiler.append(".item(");
        this.item.transpile(transpiler);
        transpiler.append(")");
    }

    declareAssign(transpiler, expression) {
        this.parent.declare(transpiler);
        this.item.declare(transpiler);
        expression.declare(transpiler);
    }

    transpileAssign(transpiler, expression) {
        const parentType = this.parent.check(transpiler.context);
        this.parent.transpileAssignParent(transpiler);
        parentType.transpileAssignItemValue(transpiler, this.item, expression);
    }

    transpileAssignParent(transpiler) {
        this.parent.transpileAssignParent(transpiler);
        transpiler.append(".getItem(");
        this.item.transpile(transpiler);
        transpiler.append(", true)");
    }
}
