import JavaScriptSelectorExpression from './JavaScriptSelectorExpression.js'

export default class JavaScriptItemExpression extends JavaScriptSelectorExpression {

    constructor(item) {
        super();
        this.item = item || null;
    }

    toString() {
        return this.parent.toString() + "[" + this.item.toString() + "]";
    }

    interpret(context: Context): IValue {
        const o = this.parent.interpret(context);
        if(o!=null) {
            return this.interpret_item(context, o);
        } else {
            return null;
        }
    }

    transpile(transpiler: Transpiler): void {
        this.parent.transpile(transpiler);
        transpiler.append("[");
        this.item.transpile(transpiler);
        transpiler.append("]");
    }

    getRoot() {
        return this.parent.getRoot();
    }

    toDialect(writer: CodeWriter): void {
        this.parent.toDialect(writer);
        writer.append('[');
        this.item.toDialect(writer);
        writer.append(']');
    }

    interpret_item(context, o) {
        return o[this.item.interpret(context)];
    }
}
