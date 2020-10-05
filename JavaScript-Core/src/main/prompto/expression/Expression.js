import Section from '../parser/Section.js'

export default class Expression extends Section {
 
    toDialect(writer) {
        writer.toDialect(this);
    }

    parentToDialect(writer) {
        this.toDialect(writer);
    }

    check(context) {
        throw new Error("check not implemented by " + this.constructor.name);
    }

    checkReference(context) {
        return this.check(context);
    }

    checkAttribute(context) {
        context.problemListener.reportMissingAttribute(this, this.toString());
    }

    interpret(context) {
        throw new Error("interpret not implemented by " + this.constructor.name);
    }

    interpretReference(context) {
       return this.interpret(context);
    }

    declare(transpiler) {
        throw new Error("declare not implemented by " + this.constructor.name);
    }

    transpile(transpiler) {
        throw new Error("transpile not implemented by " + this.constructor.name);
    }

    transpileReference(transpiler) {
        this.transpile(transpiler);
    }

    declareParent(transpiler) {
        this.declare(transpiler);
    }

    transpileParent(transpiler) {
        this.transpile(transpiler);
    }
}