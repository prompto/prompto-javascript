import NativeCategoryBinding from '../grammar/NativeCategoryBinding.js'

export default class CSharpNativeCategoryBinding extends NativeCategoryBinding {

    constructor(expression) {
        super();
        this.expression = expression;
    }

    toDialect(writer) {
        writer.append("C#: ");
        this.expression.toDialect(writer);
    }
}
