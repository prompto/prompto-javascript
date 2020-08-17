
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
        // required to support Document members
        transpiler.append(".setMember('").append(name).append("', ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    transpileAssignItemValue(transpiler, item, expression) {
        // required to support Document members
        transpiler.append(".setItem(");
        item.transpile(transpiler);
        transpiler.append(", ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }
}

AnyType.instance = new AnyType();


