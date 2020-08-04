var NativeCategoryBinding = require("./../grammar/NativeCategoryBinding").NativeCategoryBinding;

class JavaNativeCategoryBinding extends NativeCategoryBinding {
    constructor(expression) {
        super();
        this.expression = expression;
        return this;
    }

    toDialect(writer) {
        writer.append("Java: ");
        this.expression.toDialect(writer);
    }
}

JavaNativeCategoryBinding.prototype.creator = JavaNativeCategoryBinding;

exports.JavaNativeCategoryBinding = JavaNativeCategoryBinding;