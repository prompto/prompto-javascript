import IterableType from './IterableType'
import { IntegerType } from './index'
import { Identifier } from '../grammar'
import ToListMethodDeclaration from '../builtins/ToListMethodDeclaration'
import ToSetMethodDeclaration from '../builtins/ToSetMethodDeclaration'
import IType from "./IType";
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import {equalObjects} from "../utils";
import {Section} from "../parser";
import {IExpression} from "../expression";
import {IMethodDeclaration} from "../declaration";
import {Container, IIterable, IValue, ListValue, SetValue} from "../value";

export default class IteratorType extends IterableType {

    constructor(itemType: IType) {
        super(new Identifier("Iterator<" + itemType.name + ">"), TypeFamily.ITERATOR, itemType);
    }

    withItemType(itemType: IType) {
        return new IteratorType(itemType);
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return  super.isAssignableFrom(context, other)
            || ((other instanceof IteratorType) && this.itemType.isAssignableFrom(context, other.itemType));
    }

    equals(other: any) {
        return other == this || (other instanceof IteratorType && equalObjects(this.itemType, other.itemType));
    }

    checkIterator(context: Context, section: Section, source: IExpression): IType {
        return this.itemType;
    }

    checkMember(context: Context, section: Section, member: Identifier): IType {
        if ("count" === member.name)
            return IntegerType.instance;
        else
            return  super.checkMember(context, section, member);
    }

    declare(transpiler: Transpiler): void {
        this.itemType.declare(transpiler);
    }

    getMemberMethods(context: Context, member: Identifier): Set<IMethodDeclaration> {
        switch (member.name) {
            case "toList":
                return new Set<IMethodDeclaration>([new ToListMethodDeclaration(this.itemType, (value: IValue) => this.containerToList(value) )]);
            case "toSet":
                return new Set<IMethodDeclaration>([new ToSetMethodDeclaration(this.itemType, (value: IValue) => this.containerToSet(value) )]);
            default:
                return  super.getMemberMethods(context, member);
        }
    }

    containerToList(value: IValue): ListValue {
        throw new Error("TBD!");
    }

    containerToSet(value: IValue): SetValue {
        throw new Error("TBD!");
    }
}

