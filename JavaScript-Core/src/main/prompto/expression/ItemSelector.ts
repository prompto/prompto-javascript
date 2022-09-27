import SelectorBase from './SelectorBase'
import { IValue, NullValue } from '../value'
import { NullReferenceError } from '../error'
import {IExpression} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IType} from "../type";

export default class ItemSelector extends SelectorBase {

    item: IExpression;

    constructor(parent: IExpression, item: IExpression) {
        super(parent);
        this.item = item;
    }

    toString() {
        return this.parent!.toString() + "[" + this.item.toString() + "]";
    }

    toDialect(writer: CodeWriter): void {
        this.parent!.toDialect(writer);
        writer.append("[");
        this.item.toDialect(writer);
        writer.append("]");
    }

    check(context: Context): IType {
        const parentType = this.parent!.check(context);
        const itemType = this.item.check(context);
        return parentType.checkItem(context, this, itemType);
    }

    interpret(context: Context): IValue {
        const o = this.parent!.interpret(context);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (o == null || o == NullValue.instance) {
            throw new NullReferenceError();
        }
        const item = this.item.interpret(context);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (item == null || item == NullValue.instance) {
            throw new NullReferenceError();
        }
        return o.GetItemValue(context, item);
    }

    declare(transpiler: Transpiler): void {
        const parentType = this.parent!.check(transpiler.context);
        const itemType = this.item.check(transpiler.context);
        return parentType.declareItem(transpiler, itemType, this.item);
    }

    transpile(transpiler: Transpiler): void {
        this.parent!.transpile(transpiler);
        const parentType = this.parent!.check(transpiler.context);
        const itemType = this.item.check(transpiler.context);
        return parentType.transpileItem(transpiler, itemType, this.item);
    }
}
