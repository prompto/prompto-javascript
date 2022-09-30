import NativeType from './NativeType'
import { Identifier } from '../grammar'
import { DocumentType } from '../type'
import { Any } from '../intrinsic'
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import IType from "./IType";
import {Section} from "../parser";
import {IExpression} from "../expression";

export default class AnyType extends NativeType {

    static instance = new AnyType();

    constructor() {
        super(new Identifier("any"), TypeFamily.ANY);
     }

    isAssignableFrom(context: Context, other: IType): boolean {
        return true;
    }

    checkItem(context: Context, section: Section, item: IType) {
        return DocumentType.instance.checkItem(context, section, item);
    }

    checkMember(context: Context, section: Section, member: Identifier): IType {
        return DocumentType.instance.checkMember(context, section, member);
    }

    declare(transpiler: Transpiler): void {
        transpiler.register(Any);
        DocumentType.instance.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('Any');
    }

    declareItem(transpiler: Transpiler, type: IType, item: IExpression) {
        DocumentType.instance.declareItem(transpiler, type, item);
    }

    transpileItem(transpiler: Transpiler, type: IType, item: IExpression) {
        DocumentType.instance.transpileItem(transpiler, type, item);
    }

    declareMember(transpiler: Transpiler, member: Identifier) {
        DocumentType.instance.declareMember(transpiler, member);
    }

    transpileMember(transpiler: Transpiler, member: Identifier): void {
        DocumentType.instance.transpileMember(transpiler, member);
    }

    transpileAssignMemberValue(transpiler: Transpiler, member: Identifier, expression: IExpression) {
        DocumentType.instance.transpileAssignMemberValue(transpiler, member, expression);
    }

    transpileAssignItemValue(transpiler: Transpiler, item: IExpression, expression: IExpression) {
        DocumentType.instance.transpileAssignItemValue(transpiler, item, expression);
    }
}



