import IterableType from './IterableType'
import { IntegerType } from './index'
import { Identifier } from '../grammar'
import {Context, Transpiler, Variable} from '../runtime'
import ToListMethodDeclaration from '../builtins/ToListMethodDeclaration'
import IType from "./IType";
import {TypeFamily} from "../store";
import {equalObjects} from "../utils";
import {Section} from "../parser";
import {IExpression} from "../expression";
import {IMethodDeclaration} from "../declaration";
import {IValue, ListValue} from "../value";

export default class CursorType extends IterableType {

    constructor(itemType: IType) {
        super(new Identifier("Cursor<" + itemType.name + ">"), TypeFamily.CURSOR, itemType);
    }

    withItemType(itemType: IType) {
        return new CursorType(itemType);
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return  super.isAssignableFrom(context, other)
            || ((other instanceof CursorType) && this.itemType.isAssignableFrom(context, other.itemType));
    }

    equals(other: any) {
        return other == this || (other instanceof CursorType && equalObjects(this.itemType, other.itemType));
    }

    checkIterator(context: Context, section: Section, source: IExpression): IType {
        return this.itemType;
    }

    declareIterator(transpiler: Transpiler, name: Identifier, expression: IExpression) {
        transpiler = transpiler.newChildTranspiler();
        transpiler.context.registerInstance(new Variable(name, this.itemType), true);
        expression.declare(transpiler);
    }

    transpileIterator(transpiler: Transpiler, name: Identifier, expression: IExpression) {
        transpiler.append(".iterate(function(").append(name.name).append(") { return ");
        transpiler = transpiler.newChildTranspiler();
        transpiler.context.registerInstance(new Variable(name, this.itemType), true);
        expression.transpile(transpiler);
        transpiler.append("; }, this)");
        transpiler.flush();
    }

    checkMember(context: Context, section: Section, id: Identifier): IType {
        if ("count" === id.name)
            return IntegerType.instance;
        else if ("totalCount" === id.name)
            return IntegerType.instance;
        else
            return  super.checkMember(context, section, id);
    }

    declareMember(transpiler: Transpiler, member: Identifier): void {
        if("count"!==member.name && "totalCount"!==member.name)
            super.declareMember(transpiler, member);
    }

    transpileMember(transpiler: Transpiler, member: Identifier): void {
        if("count"===member.name || "totalCount"===member.name) {
            transpiler.append(member.name);
        } else
            super.transpileMember(transpiler, member);
    }

    getMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration> {
        switch (id.name) {
            case "toList":
                return new Set<IMethodDeclaration>([new ToListMethodDeclaration(this.itemType, (value: IValue) => this.containerToList(value))]);
            default:
                return super.getMemberMethods(context, id);
        }
    }

    containerToList(value: IValue): ListValue {
        throw new Error("TBD!");
    }

}

