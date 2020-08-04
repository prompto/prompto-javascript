var NativeCategoryBinding = require("./../grammar/NativeCategoryBinding").NativeCategoryBinding;

class CSharpNativeCategoryBinding extends NativeCategoryBinding {
    constructor(expression) {
        super();
        this.expression = expression;
        return this;
    }

    toDialect(writer) {
        writer.append("C#: ");
        this.expression.toDialect(writer);
    }
}

exports.CSharpNativeCategoryBinding = CSharpNativeCategoryBinding;
