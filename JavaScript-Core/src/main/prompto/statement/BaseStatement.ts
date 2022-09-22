import Statement from "./Statement";
import Section from '../parser/Section'

export default class BaseStatement extends Section implements Statement {
  
    canReturn() {
        return false;
    }

    isSimple() {
        return false;
    }

    // TODO make section an interface
    asSection(): Section {
        return this;
    }

    parentToDialect(writer: CodeWriter): void {
        this.toDialect(writer);
    }

    checkReference(context) {
        return this.check(context);
    }

    transpile(transpiler: Transpiler): void {
        throw new Error("Transpile not implemented by " + this.constructor.name);
    }

    declare(transpiler: Transpiler): void {
        throw new Error("Declare not implemented by " + this.constructor.name);
    }

    declareParent(transpiler) {
        this.declare(transpiler);
    }

    transpileParent(transpiler) {
        this.transpile(transpiler);
    }

}

