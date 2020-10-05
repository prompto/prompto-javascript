import NativeCategoryBinding from '../grammar/NativeCategoryBinding.js'

export default class JavaNativeCategoryBinding extends NativeCategoryBinding {

    constructor(expression) {
        super();
        this.expression = expression;
    }

    toDialect(writer) {
        writer.append("Java: ");
        this.expression.toDialect(writer);
    }
}
