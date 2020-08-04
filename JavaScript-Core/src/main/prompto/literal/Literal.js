var Section = require("../parser/Section").Section;

class Literal extends Section {
  
    constructor(text, value) {
        super();
        this.text = text;
        this.value = value;
    }

    toDialect(writer) {
        writer.append(this.escapedText(writer.escapeMode));
    }

    parentToDialect(writer) {
        this.toDialect(writer);
    }

    escapedText(escapeMode) {
        if(escapeMode)
            return this.text.replace(/'/g, "\\'");
        else
            return this.text;
    }

    toString() {
        return this.text;
    }

    toString() {
        return this.text;
    }

    checkAttribute(context) {
        context.problemListener.reportMissingAttribute(this, this.toString());
    }

    declare(transpiler) {
        throw new Error("Declare not implemented by " + this.constructor.name);
    }

    transpile(transpiler) {
        throw new Error("Transpile not implemented by " + this.constructor.name);
    }

    declareParent(transpiler) {
        this.declare(transpiler);
    }

    transpileParent(transpiler) {
        this.transpile(transpiler);
    }

    getValue() {
        return this.value;
    }

    interpret(context) {
        return this.value;
    }
}

Literal.prototype.constructor = Section;

exports.Literal = Literal;
