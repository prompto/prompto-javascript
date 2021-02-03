import NativeType from './NativeType.js'

export default class IterableType extends NativeType {

    constructor(id, itemType) {
        super(id);
        this.itemType = itemType;
    }

    checkExists(context) {
        this.itemType.checkExists(context);
    }

    isMoreSpecificThan(context, other) {
        return (other instanceof IterableType &&
            this.itemType.isMoreSpecificThan(context, other.itemType));
    }

    transpileJsxCode(transpiler, expression = expression) {
        transpiler.append("ArrayOrNull(");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

}


