import NativeType from './NativeType.ts'
import { Identifier } from '../grammar'
import { DocumentType } from '../type'
import { Any } from '../intrinsic'

export default class AnyType extends NativeType {
 
    constructor() {
        super(new Identifier("any"));
     }

    isAssignableFrom(context: Context, other: IType): boolean {
        return true;
    }

    checkItem(context, item) {
        return DocumentType.instance.checkItem(context, item);
    }

    checkMember(context: Context, section: Section, id: Identifier): IType {
        return DocumentType.instance.checkMember(context, section, id);
    }

    declare(transpiler: Transpiler): void {
        transpiler.register(Any);
        DocumentType.instance.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('Any');
    }

    declareItem(transpiler, type, item) {
        DocumentType.instance.declareItem(transpiler, type, item);
    }

    transpileItem(transpiler, type, item) {
        DocumentType.instance.transpileItem(transpiler, type, item);
    }

    declareMember(transpiler, section, id) {
        DocumentType.instance.declareMember(transpiler, section, id);
    }

    transpileMember(transpiler: Transpiler, id: Identifier): void {
        DocumentType.instance.transpileMember(transpiler, id);
    }

    transpileAssignMemberValue(transpiler, id, expression) {
        DocumentType.instance.transpileAssignMemberValue(transpiler, id, expression);
    }

    transpileAssignItemValue(transpiler, item, expression) {
        DocumentType.instance.transpileAssignItemValue(transpiler, item, expression);
    }
}

AnyType.instance = new AnyType();


