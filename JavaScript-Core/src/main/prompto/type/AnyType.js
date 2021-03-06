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

    checkMember(context, section, name) {
        return DocumentType.instance.checkMember(context, section, name);
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

    declareMember(transpiler, name) {
        DocumentType.instance.declareMember(transpiler, name);
    }

    transpileMember(transpiler, name) {
        DocumentType.instance.transpileMember(transpiler, name);
    }

    transpileAssignMemberValue(transpiler, name, expression) {
        DocumentType.instance.transpileAssignMemberValue(transpiler, name, expression);
    }

    transpileAssignItemValue(transpiler, item, expression) {
        DocumentType.instance.transpileAssignItemValue(transpiler, item, expression);
    }
}

AnyType.instance = new AnyType();


