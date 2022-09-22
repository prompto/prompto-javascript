import NativeType from './NativeType'
import Type from "./Type";
import {Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {Expression} from "../expression";

export default abstract class IterableType extends NativeType {

    itemType: Type;

    constructor(id: Identifier, itemType: Type) {
        super(id);
        this.itemType = itemType;
    }

    checkExists(context: Context): void {
        this.itemType.checkExists(context);
    }

    isMoreSpecificThan(context: Context, other: Type): boolean {
        return (other instanceof IterableType &&
            this.itemType.isMoreSpecificThan(context, other.itemType));
    }

    transpileJsxCode(transpiler: Transpiler, expression: Expression): void {
        transpiler.append("ArrayOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    abstract withItemType(itemType: Type): Type;
}


