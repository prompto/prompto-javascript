import ContainerType from './ContainerType'
import {IntegerType, ListType, SetType, AnyType, BooleanType} from '../type'
import { Identifier } from '../grammar'
import { StrictSet } from '../intrinsic'
import { JoinTupleMethodDeclaration } from '../builtins/ContainerTypeBuiltins'
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import IType from "./IType";
import {Section} from "../parser";
import {IExpression} from "../expression";
import {IMethodDeclaration} from "../declaration";

export default class TupleType extends ContainerType {

    static instance = new TupleType();
    
    constructor() {
        super(new Identifier("Tuple"), TypeFamily.TUPLE, AnyType.instance);
    }

    withItemType(itemType: IType): IType {
        return this;
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return super.isAssignableFrom(context, other)
            || (other instanceof ListType) || (other instanceof SetType);
    }

    checkItem(context: Context, section: Section, other: IType) {
        if(other==IntegerType.instance) {
            return AnyType.instance;
        } else {
            return super.checkItem(context, section, other);
        }
    }

    declareItem(transpiler: Transpiler, itemType: IType, item: IExpression): void {
        if(itemType===IntegerType.instance) {
            item.declare(transpiler);
        } else {
            return super.declareItem(transpiler, itemType, item);
        }
    }

    transpileItem(transpiler: Transpiler, itemType: IType, item: IExpression): void {
        if(itemType===IntegerType.instance) {
            transpiler.append("[");
            item.transpile(transpiler);
            transpiler.append("-1]");
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

    checkMember(context: Context, section: Section, id: Identifier): IType {
        if ("count" === id.name) {
            return IntegerType.instance;
        } else {
            return super.checkMember(context, section, id);
        }
    }

    declareMember(transpiler: Transpiler, member: Identifier): void {
        if ("count" !== member.name) {
            return super.declareMember(transpiler, member);
        }
    }

    transpileMember(transpiler: Transpiler, member: Identifier): void {
        if ("count" === member.name) {
            transpiler.append("length");
        } else {
            return super.transpileMember(transpiler, member);
        }
    }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if(other === TupleType.instance || other instanceof ListType || other instanceof SetType) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if(other === TupleType.instance || other instanceof ListType || other instanceof SetType) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if(other === TupleType.instance || other instanceof ListType || other instanceof SetType) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkContains(context: Context, section: Section, other: IType) {
        return BooleanType.instance;
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

    checkHasAllOrAny(context: Context, section: Section, other: IType): IType {
        return BooleanType.instance;
    }

    getMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration> {
        switch (id.name) {
            case "join":
                return new Set<IMethodDeclaration>([new JoinTupleMethodDeclaration()]);
            default:
                return super.getMemberMethods(context, id);
        }
    }
}



