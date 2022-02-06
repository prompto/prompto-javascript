import NativeType from './NativeType.js'
import { Identifier } from '../grammar/index.js'
import { DocumentType } from './index.js'
import { Any } from '../intrinsic/index.js'

export default class AnyType extends NativeType {
 
    constructor() {
        super(new Identifier("any"));
     }

    isAssignableFrom(context, other) {
        return true;
    }

    checkItem(context, item) {
        return DocumentType.instance.checkItem(context, item);
    }

    checkMember(context, section, id) {
        return DocumentType.instance.checkMember(context, section, id);
    }

    declare(transpiler) {
        transpiler.register(Any);
        DocumentType.instance.declare(transpiler);
    }

    transpile(transpiler) {
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

    transpileMember(transpiler, id) {
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


