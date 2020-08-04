var BaseSwitchStatement = require("./BaseSwitchStatement").BaseSwitchStatement;

class SwitchStatement extends BaseSwitchStatement {
 
    constructor(expression, switchCases, defaultCase) {
        super(switchCases, defaultCase);
        this.expression = expression;
    }

    canReturn() {
        return true;
    }

    checkSwitchType(context) {
        return this.expression.check(context);
    }

    interpret(context) {
        var switchValue = this.expression.interpret(context);
        return this.interpretSwitch(context, switchValue, null);
    }

    toODialect(writer) {
        writer.append("switch(");
        this.expression.toDialect(writer);
        writer.append(") {").newLine();
        this.switchCases.forEach(function(switchCase) {
            switchCase.caseToODialect(writer);
        });
        if(this.defaultCase!=null) {
            writer.append("default:").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent();
        }
        writer.append("}").newLine();
    }

    toEDialect(writer) {
        writer.append("switch on ");
        this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.switchCases.forEach(function(switchCase) {
            switchCase.caseToEDialect(writer);
        });
        if(this.defaultCase!=null) {
            writer.append("otherwise:").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent();
        }
        writer.dedent();
    }

    toMDialect(writer) {
        writer.append("switch on ");
        this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.switchCases.forEach(function(switchCase) {
            switchCase.caseToMDialect(writer);
        });
        if(this.defaultCase!=null) {
            writer.append("otherwise:").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent();
        }
        writer.dedent();
    }

    declare(transpiler) {
        this.expression.declare(transpiler);
        this.declareSwitch(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("switch (");
        this.expression.transpile(transpiler);
        transpiler.append(") {").newLine();
        this.switchCases.forEach(function(switchCase) {
            switchCase.transpile(transpiler);
        });
        if(this.defaultCase!=null) {
            transpiler.append("default:").indent();
            this.defaultCase.transpile(transpiler);
            transpiler.dedent();
        }
        transpiler.append("}").newLine();
        return true;
    }
}

exports.SwitchStatement = SwitchStatement;