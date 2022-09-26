import ContainerType from '../../../main/prompto/type/ContainerType.ts'
import {IntegerType, SetType, BooleanType, VoidType} from '../type'
import { Identifier } from '../grammar'
import { List, StrictSet } from '../intrinsic'
import { ListValue } from '../value'
import { JoinListMethodDeclaration } from '../builtins/ContainerTypeBuiltins.ts';
import { IndexOfMethodDeclaration, RemoveItemMethodDeclaration, RemoveValueMethodDeclaration, AddValueMethodDeclaration, InsertValueMethodDeclaration } from '../../../main/prompto/builtins/ListTypeBuiltins.ts';
import { multiplyArray } from '../utils'
import ToSetMethodDeclaration from '../builtins/ToSetMethodDeclaration.ts'

export default class ListType extends ContainerType {
  
    constructor(itemType, mutable) {
        super(new Identifier(itemType.name+"[]"), itemType);
        this.mutable = mutable || false;
    }

    withItemType(itemType) {
        return new ListType(itemType, this.mutable);
    }

    asMutable(context, mutable) {
        if(mutable === this.mutable)
            return this;
        else
            return new ListType(this.itemType, mutable);
    }

    declare(transpiler: Transpiler): void {
        transpiler.register(List);
        this.itemType.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('List')
    }

    getTranspiledName(context) {
        return this.itemType.getTranspiledName(context) + "_list";
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        const values = value.map(function(item) {
            return this.itemType.convertJavaScriptValueToPromptoValue(context, item, null);
        }, this);
        return new ListValue(this.itemType, values);
    }

    isAssignableFrom(context: Context, other: Type): boolean {
        return super.isAssignableFrom(context, other)
            || ((other instanceof ListType) && this.itemType.isAssignableFrom(context, other.itemType));
    }

    equals(obj) {
        if(obj===this) {
            return true;
        }
        if(obj===null) {
            return false;
        }
        if(!(obj instanceof ListType)) {
            return false;
        }
        return this.itemType.equals(obj.itemType);
    }

    checkAdd(context: Context, section: Section, other: Type, tryReverse: boolean): Type {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.isAssignableFrom(context, other.itemType)) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkSubtract(context: Context, other: Type): Type {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
            return this;
        } else {
            return super.checkSubtract(context, other);
        }
    }

    declareSubtract(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareSubtract(transpiler, other, left, right);
        }
    }

    transpileSubtract(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".remove(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileSubtract(transpiler, other, left, right);
        }
    }

    checkItem(context, itemType, section) {
        if(itemType===IntegerType.instance) {
            return this.itemType;
        } else {
            context.problemListener.reportIllegalItemType(section, itemType, [IntegerType.instance]);
            return VoidType.instance;
        }
    }

    declareItem(transpiler, itemType, item) {
        if(itemType===IntegerType.instance) {
            this.itemType.declare(transpiler);
            item.declare(transpiler);
        } else {
            return super.declareItem(transpiler, itemType, item);
        }
    }

    transpileItem(transpiler, itemType, item) {
        if(itemType===IntegerType.instance) {
            transpiler.append(".getItem(");
            item.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileItem(transpiler, itemType, item);
        }
    }

    transpileAssignItemValue(transpiler, item, expression) {
        transpiler.append(".setItem(");
        item.transpile(transpiler);
        transpiler.append(", ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    checkMultiply(context, other, tryReverse) {
        if(other === IntegerType.instance) {
            return this;
        } else {
            return super.checkMultiply(context, other, tryReverse);
        }
    }

    declareMultiply(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if(other === IntegerType.instance) {
            transpiler.require(multiplyArray);
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
        }
    }

    transpileMultiply(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if(other === IntegerType.instance) {
            transpiler.append("multiplyArray(");
            left.transpile(transpiler);
            transpiler.append(",");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
        }
    }

    checkSlice(context) {
        return this;
    }

    declareSlice(transpiler, first, last) {
        // nothing to do
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

    declareContains(transpiler, other, container, item) {
        container.declare(transpiler);
        item.declare(transpiler);
    }

    transpileContains(transpiler, other, container, item) {
        container.transpile(transpiler);
        transpiler.append(".includes(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    checkHasAllOrAny(context: Context, section: Section, other: Type): Type {
        return BooleanType.instance;
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

    transpileHasAllPredicate(transpiler, container, predicate) {
        container.transpile(transpiler);
        transpiler.append(".every(");
        const arrow = predicate.toArrowExpression();
        const type = container.check(transpiler.context);
        const itemType = type.itemType;
        arrow.transpileFilter(transpiler, itemType);
        transpiler.append(")");
    }

    transpileHasAnyPredicate(transpiler, container, predicate) {
        container.transpile(transpiler);
        transpiler.append(".some(");
        const arrow = predicate.toArrowExpression();
        const type = container.check(transpiler.context);
        const itemType = type.itemType;
        arrow.transpileFilter(transpiler, itemType);
        transpiler.append(")");
    }

    checkIterator(context, source) {
        return this.itemType;
    }

    getMemberMethods(context, id) {
        switch (id.name) {
            case "toSet":
                return [new ToSetMethodDeclaration(this.itemType)];
            case "join":
                return [new JoinListMethodDeclaration()];
            case "indexOf":
                return [new IndexOfMethodDeclaration()];
            case "removeItem":
                return [new RemoveItemMethodDeclaration()];
            case "removeValue" :
                return [new RemoveValueMethodDeclaration()];
            case "addValue" :
                return [new AddValueMethodDeclaration()];
            case "insertValue" :
                return [new InsertValueMethodDeclaration()];
            default:
                return super.getMemberMethods.call(context, id);
        }
    }
}


