const CollectionType = require("../type/ContainerType").ContainerType;
const SwitchCase = require("./SwitchCase").SwitchCase;
const VoidType = require("../type/VoidType").VoidType;

class CollectionSwitchCase extends SwitchCase {
    constructor(expression, statements) {
        super(expression, statements);
        return this;
    }

    checkSwitchType(context, type) {
        let thisType = this.expression ? this.expression.check(context) : VoidType.instance;
        if(thisType instanceof CollectionType) {
            thisType = thisType.itemType;
        }
        if(!type.isAssignableFrom(context, thisType)) {
            context.problemListener.reportIncompatibleTypes(this, type, thisType);
        }
    }

    matches(context, value) {
        const thisValue = this.expression.interpret(context);
        if(thisValue.hasItem) {
            return thisValue.hasItem(context, value);
        } else {
            return false;
        }
    }

    caseToMDialect(writer) {
        this.caseToEDialect(writer);
    }

    caseToODialect(writer) {
        writer.append("case in ");
        this.expression && this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    caseToEDialect(writer) {
        writer.append("when in ");
        this.expression && this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    catchToODialect(writer) {
        writer.append("catch (");
        this.expression && this.expression.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent().append("} ");
    }

    catchToMDialect(writer) {
        writer.append("except in ");
        this.expression && this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    catchToEDialect(writer) {
        this.caseToEDialect(writer); // no difference
    }

    transpile(transpiler) {
        this.expression && this.expression.expressions.forEach(expression => {
            transpiler.append("case ");
            expression.transpile(transpiler);
            transpiler.append(":").newLine();
        }, this);
        transpiler.indent(true);
        this.statements && this.statements.transpile(transpiler);
        transpiler.append("break;").dedent();
    }
}

exports.CollectionSwitchCase = CollectionSwitchCase;
