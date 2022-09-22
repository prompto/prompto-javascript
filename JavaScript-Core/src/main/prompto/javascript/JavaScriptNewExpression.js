import JavaScriptExpression from './JavaScriptExpression.js'

export default class JavaScriptNewExpression extends JavaScriptExpression {

    constructor(method) {
        super();
        this.method = method;
    }

    toString() {
        return "new " + this.method.toString();
    }

    interpret(context, module) {
        return this.method.interpretNew(context, module);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('new ');
        this.method.transpile(transpiler);
    }

    toDialect(writer: CodeWriter): void {
        writer.append('new ');
        this.method.toDialect(writer);
    }
}
