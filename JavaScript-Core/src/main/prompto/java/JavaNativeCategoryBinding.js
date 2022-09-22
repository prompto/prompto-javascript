import NativeCategoryBinding from '../grammar/NativeCategoryBinding.ts'

export default class JavaNativeCategoryBinding extends NativeCategoryBinding {

    constructor(expression) {
        super();
        this.expression = expression;
    }

    toDialect(writer: CodeWriter): void {
        writer.append("Java: ");
        this.expression.toDialect(writer);
    }
}
