import ContainerType from '../../../main/prompto/type/ContainerType.ts'
import { BooleanType, IntegerType } from './index.ts'
import { Identifier } from '../grammar'
import { StrictSet } from '../intrinsic'

export default class RangeType extends ContainerType {

    constructor(itemType) {
        super(new Identifier(itemType.name+"[..]"), itemType);
    }

    withItemType(itemType) {
        return new RangeType(itemType);
    }

    checkItem(context, other, expression) {
        if (other == IntegerType.instance) {
            return this.itemType;
        } else {
            return super.checkItem(context, other, expression);
        }
    }

    declareItem(transpiler: Transpiler, itemType: IType): void {
        // nothing to do
    }

    transpileItem(transpiler: Transpiler, itemType: IType, item: IExpression): void {
        transpiler.append(".item(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    checkSlice(context: Context, section: Section): IType {
        return this;
    }

    declareSlice(transpiler: Transpiler, first: IExpression, last: IExpression): void {
        if(first) {
            first.declare(transpiler);
        }
        if(last) {
            last.declare(transpiler);
        }
    }

    transpileSlice(transpiler: Transpiler, first: IExpression, last: IExpression): void {
        transpiler.append(".slice1Based(");
        if(first) {
            first.transpile(transpiler);
        } else
            transpiler.append("null");
        if(last) {
            transpiler.append(",");
            last.transpile(transpiler);
        }
        transpiler.append(")");
    }

    checkIterator(context: Context, section: Section, source: IExpression): IType {
        return this.itemType;
    }

    checkHasAllOrAny(context: Context, section: Section, other: IType): Type {
        return BooleanType.instance;
    }

    declareContains(transpiler: Transpiler, other: IType, container: IExpression, item: IExpression): void {
        transpiler.require(StrictSet);
        container.declare(transpiler);
        item.declare(transpiler);
    }

    transpileContains(transpiler: Transpiler, other: IType, container: IExpression, item: IExpression): void {
        container.transpile(transpiler);
        transpiler.append(".has(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    declareHasAllOrAny(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void {
        transpiler.require(StrictSet);
        container.declare(transpiler);
        items.declare(transpiler);
    }

    transpileHasAllValue(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void {
        container.transpile(transpiler);
        transpiler.append(".hasAll(");
        items.transpile(transpiler);
        transpiler.append(")");
    }

    transpileHasAnyValue(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void {
        container.transpile(transpiler);
        transpiler.append(".hasAny(");
        items.transpile(transpiler);
        transpiler.append(")");
    }
}
