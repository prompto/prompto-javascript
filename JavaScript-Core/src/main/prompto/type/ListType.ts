import ContainerType from './ContainerType'
import {IntegerType, BooleanType, VoidType, IterableType} from '../type'
import { Identifier } from '../grammar'
import { List, StrictSet } from '../intrinsic'
import {IValue, ListValue, NullValue, SetValue} from '../value'
import { JoinListMethodDeclaration } from '../builtins/ContainerTypeBuiltins';
import { IndexOfMethodDeclaration, RemoveItemMethodDeclaration, RemoveValueMethodDeclaration, AddValueMethodDeclaration, InsertValueMethodDeclaration } from '../builtins/ListTypeBuiltins';
import {equalObjects, multiplyArray} from '../utils'
import ToSetMethodDeclaration from '../builtins/ToSetMethodDeclaration'
import IType from "./IType";
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";
import {IExpression, PredicateExpression} from "../expression";
import {IMethodDeclaration} from "../declaration";

export default class ListType extends ContainerType {

    _mutable : boolean;

    constructor(itemType: IType, mutable?: boolean) {
        super(new Identifier(itemType.name+"[]"), TypeFamily.LIST, itemType);
        this._mutable = mutable || false;
    }

    withItemType(itemType: IType): IType {
        return new ListType(itemType, this.mutable);
    }

    asMutable(context: Context, mutable: boolean): IType {
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

    getTranspiledName(context: Context) {
        return this.itemType.getTranspiledName(context) + "_list";
    }

    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType | null): IValue {
        if(Array.isArray(value)) {
            const values = value.map(item => this.itemType.convertJavaScriptValueToPromptoValue(context, item, null), this);
            return new ListValue(this.itemType, false, values);
        } else
            return NullValue.instance;
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return super.isAssignableFrom(context, other)
            || ((other instanceof ListType) && this.itemType.isAssignableFrom(context, other.itemType));
    }

    equals(other: any) {
        return other == this || (other instanceof ListType && equalObjects(this.itemType, other.itemType));
        }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if (other instanceof ContainerType && this.itemType.isAssignableFrom(context, other.itemType)) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if(other instanceof ContainerType && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if(other instanceof ContainerType && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkSubtract(context: Context, section: Section, other: IType): IType {
        if(other instanceof ContainerType && this.itemType.isAssignableFrom(context, other.itemType)) {
            return this;
        } else {
            return super.checkSubtract(context, section, other);
        }
    }

    declareSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if(other instanceof ContainerType && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareSubtract(transpiler, other, left, right);
        }
    }

    transpileSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if(other instanceof ContainerType && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".remove(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileSubtract(transpiler, other, left, right);
        }
    }

    checkItem(context: Context, section: Section, itemType: IType): IType {
        if(itemType == IntegerType.instance) {
            return this.itemType;
        } else {
            context.problemListener.reportIllegalItemType(section, itemType, [IntegerType.instance]);
            return VoidType.instance;
        }
    }

    declareItem(transpiler: Transpiler, itemType: IType, item: IExpression): void {
        if(itemType == IntegerType.instance) {
            this.itemType.declare(transpiler);
            item.declare(transpiler);
        } else {
            return super.declareItem(transpiler, itemType, item);
        }
    }

    transpileItem(transpiler: Transpiler, itemType: IType, item: IExpression): void {
        if(itemType===IntegerType.instance) {
            transpiler.append(".getItem(");
            item.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileItem(transpiler, itemType, item);
        }
    }

    transpileAssignItemValue(transpiler: Transpiler, item: IExpression, expression: IExpression) {
        transpiler.append(".setItem(");
        item.transpile(transpiler);
        transpiler.append(", ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    checkMultiply(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if(other === IntegerType.instance) {
            return this;
        } else {
            return super.checkMultiply(context, section, other, tryReverse);
        }
    }

    declareMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if(other === IntegerType.instance) {
            transpiler.require(multiplyArray);
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
        }
    }

    transpileMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
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

    checkSlice(context: Context, section: Section): IType {
        return this;
    }

    declareSlice(transpiler: Transpiler, first: IExpression, last: IExpression): void {
        // nothing to do
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

    declareContains(transpiler: Transpiler, other: IType, container: IExpression, item: IExpression): void {
        container.declare(transpiler);
        item.declare(transpiler);
    }

    transpileContains(transpiler: Transpiler, other: IType, container: IExpression, item: IExpression): void {
        container.transpile(transpiler);
        transpiler.append(".includes(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    checkHasAllOrAny(context: Context, section: Section, other: IType): IType {
        return BooleanType.instance;
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

    transpileHasAllPredicate(transpiler: Transpiler, other: IType, container: IExpression, predicate: IExpression) {
        container.transpile(transpiler);
        transpiler.append(".every(");
        const arrow = (predicate as unknown as PredicateExpression).toArrowExpression();
        const type = container.check(transpiler.context);
        const itemType = (type as unknown as IterableType).itemType;
        arrow.transpileFilter(transpiler, itemType);
        transpiler.append(")");
    }

    transpileHasAnyPredicate(transpiler: Transpiler, other: IType, container: IExpression, predicate: IExpression) {
        container.transpile(transpiler);
        transpiler.append(".some(");
        const arrow = (predicate as unknown as PredicateExpression).toArrowExpression();
        const type = container.check(transpiler.context);
        const itemType = (type as unknown as IterableType).itemType;
        arrow.transpileFilter(transpiler, itemType);
        transpiler.append(")");
    }

    checkIterator(context: Context, section: Section, source: IExpression): IType {
        return this.itemType;
    }

    getMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration> {
        let decls: IMethodDeclaration[] | null = null;
        switch (id.name) {
            case "toSet":
                decls = [new ToSetMethodDeclaration(this.itemType, (value: IValue) => this.containerToSet(value) )];
                break;
            case "join":
                decls = [new JoinListMethodDeclaration()];
                break;
            case "indexOf":
                decls = [new IndexOfMethodDeclaration()];
                break;
            case "removeItem":
                decls = [new RemoveItemMethodDeclaration()];
                break;
            case "removeValue" :
                decls = [new RemoveValueMethodDeclaration()];
                break;
            case "addValue" :
                decls = [new AddValueMethodDeclaration()];
                break;
            case "insertValue" :
                decls = [new InsertValueMethodDeclaration()];
        }
        if(decls)
            return new Set<IMethodDeclaration>(decls);
        else
            return super.getMemberMethods(context, id);
    }

    containerToSet(value: IValue): SetValue {
        throw new Error("TBD!");
    }

}


