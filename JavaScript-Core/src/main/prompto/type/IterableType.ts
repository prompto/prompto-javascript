import NativeType from './NativeType'
import IType from "./IType";
import {Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {IExpression} from "../expression";

export default abstract class IterableType extends NativeType {

    itemType: IType;

    constructor(id: Identifier, itemType: IType) {
        super(id);
        this.itemType = itemType;
    }

    checkExists(context: Context): void {
        this.itemType.checkExists(context);
    }

    isMoreSpecificThan(context: Context, other: IType): boolean {
        return (other instanceof IterableType &&
            this.itemType.isMoreSpecificThan(context, other.itemType));
    }

    transpileJsxCode(transpiler: Transpiler, expression: IExpression): void {
        transpiler.append("ArrayOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    abstract withItemType(itemType: IType): IType;
}


