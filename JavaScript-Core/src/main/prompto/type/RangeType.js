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

    declareItem(transpiler, itemType, item) {
        // nothing to do
    }

    transpileItem(transpiler, itemType, item) {
        transpiler.append(".item(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    checkSlice(context) {
        return this;
    }

    declareSlice(transpiler, first, last) {
        if(first) {
            first.declare(transpiler);
        }
        if(last) {
            last.declare(transpiler);
        }
    }

    transpileSlice(transpiler, first, last) {
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

    checkIterator(context, source) {
        return this.itemType;
    }

    checkHasAllOrAny(context: Context, section: Section, other: IType): Type {
        return BooleanType.instance;
    }

    declareContains(transpiler, other, container, item) {
        transpiler.require(StrictSet);
        container.declare(transpiler);
        item.declare(transpiler);
    }

    transpileContains(transpiler, other, container, item) {
        container.transpile(transpiler);
        transpiler.append(".has(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    declareHasAllOrAny(transpiler, other, container, items) {
        transpiler.require(StrictSet);
        container.declare(transpiler);
        items.declare(transpiler);
    }

    transpileHasAllValue(transpiler, other, container, items) {
        container.transpile(transpiler);
        transpiler.append(".hasAll(");
        items.transpile(transpiler);
        transpiler.append(")");
    }

    transpileHasAnyValue(transpiler, other, container, items) {
        container.transpile(transpiler);
        transpiler.append(".hasAny(");
        items.transpile(transpiler);
        transpiler.append(")");
    }
}
