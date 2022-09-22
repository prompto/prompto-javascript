import ObjectList from '../../../main/prompto/utils/ObjectList.ts'

export default class JavaScriptExpressionList extends ObjectList {

    constructor(expression) {
        super(null, expression);
    }

    toDialect(writer: CodeWriter): void {
        if(this.length > 0) {
            this.forEach(exp => {
                exp.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }

    transpile(transpiler: Transpiler): void {
        if(this.length > 0) {
            this.forEach(exp => {
                exp.transpile(transpiler);
                transpiler.append(", ");
            });
            transpiler.trimLast(2);
        }
    }

    computeArguments(context) {
        return this.map(function(arg) {
            return this.computeArgument(arg, context);
        }, this);
    }

    computeArgument(arg, context) {
        // interpret expression in a loop (might be a wrapper)
        while(arg && arg.interpret && !arg.convertToJavaScript) {
            arg = arg.interpret(context);
        }
        // convert value to JavaScript
        return arg && arg.convertToJavaScript ? arg.convertToJavaScript() : arg;
    }
}
