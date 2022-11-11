import ContainerType from './ContainerType'
import {ListType, IntegerType, BooleanType, IterableType} from './index'
import { Identifier } from '../grammar'
import { JoinSetMethodDeclaration } from '../builtins/ContainerTypeBuiltins'
import { List, StrictSet, equalObjects } from "../intrinsic";
import ToListMethodDeclaration from "../builtins/ToListMethodDeclaration";
import IType from "./IType";
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";
import {IExpression, PredicateExpression} from "../expression";
import {IMethodDeclaration} from "../declaration";
import {IValue, ListValue} from "../value";

export default class SetType extends ContainerType {
 
    constructor(itemType: IType) {
        super(new Identifier(itemType.name+"<>"), TypeFamily.SET, itemType);
    }

    withItemType(itemType: IType) {
        return new SetType(itemType);
    }

    declare(transpiler: Transpiler): void {
        transpiler.register(List);
        transpiler.register(StrictSet);
        this.itemType.declare(transpiler);
    }

    getTranspiledName(context: Context) {
        return this.itemType.getTranspiledName(context) + "_set";
    }

    equals(other: any) {
        return other == this || (other instanceof SetType && equalObjects(this.itemType, other.itemType));
    }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if((other instanceof SetType || other instanceof ListType) && this.itemType.isAssignableFrom(context, other.itemType)) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if((other instanceof SetType || other instanceof ListType) && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if((other instanceof SetType || other instanceof ListType) && this.itemType.isAssignableFrom(transpiler.context, other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".addAll(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkSubtract(context: Context, section: Section, other: IType): IType {
        if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType)) {
            return this;
        } else {
            return super.checkSubtract(context, section, other);
        }
    }

    declareSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareSubtract(transpiler, other, left, right);
        }
    }

    transpileSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".remove(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileSubtract(transpiler, other, left, right);
        }
    }

    checkItem(context: Context, section: Section, other: IType) {
        if(other === IntegerType.instance) {
            return this.itemType;
        } else {
            return super.checkItem(context, section, other);
        }
    }

    declareItem(transpiler: Transpiler, itemType: IType): void {
        // nothing to do
    }

    transpileItem(transpiler: Transpiler, itemType: IType, item: IExpression): void {
        transpiler.append(".item(");
        item.transpile(transpiler);
        transpiler.append("-1)");
    }

    declareContains(transpiler: Transpiler, other: IType, container: IExpression, item: IExpression): void {
        container.declare(transpiler);
        item.declare(transpiler);
    }

    transpileContains(transpiler: Transpiler, other: IType, container: IExpression, item: IExpression): void {
        container.transpile(transpiler);
        transpiler.append(".has(");
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
        transpiler.append("(");
        container.transpile(transpiler);
        transpiler.append(").toArray().every(");
        const arrow = (predicate as unknown as PredicateExpression).toArrowExpression();
        const type = container.check(transpiler.context);
        const itemType = (type as IterableType).itemType;
        arrow.transpileFilter(transpiler, itemType);
        transpiler.append(")");
    }

    transpileHasAnyPredicate(transpiler: Transpiler, other: IType, container: IExpression, predicate: IExpression) {
        transpiler.append("(");
        container.transpile(transpiler);
        transpiler.append(").toArray().some(");
        const arrow = (predicate as unknown as PredicateExpression).toArrowExpression();
        const type = container.check(transpiler.context);
        const itemType = (type as IterableType).itemType;
        arrow.transpileFilter(transpiler, itemType);
        transpiler.append(")");
    }


    checkIterator(context: Context, section: Section, source: IExpression): IType {
        return this.itemType;
    }

    getMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration> {
        switch (id.name) {
            case "toList":
                return new Set<IMethodDeclaration>([new ToListMethodDeclaration(this.itemType, (value: IValue) => this.containerToList(value))]);
            case "join":
                return new Set<IMethodDeclaration>([new JoinSetMethodDeclaration()]);
            default:
                return super.getMemberMethods(context, id);
        }
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return super.isAssignableFrom(context, other)
            || ((other instanceof SetType) && this.itemType.isAssignableFrom(context, other.itemType));
    }

    containerToList(value: IValue): ListValue {
        throw new Error("TBD!");
    }

}


