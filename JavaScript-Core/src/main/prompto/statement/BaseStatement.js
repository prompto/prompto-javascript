import Section from '../parser/Section.js'

export default class BaseStatement extends Section {
  
    canReturn() {
        return false;
    }

    isSimple() {
        return false;
    }

    parentToDialect(writer) {
        this.toDialect(writer);
    }

    checkReference(context) {
        return this.check(context);
    }

    transpile(transpiler) {
        throw new Error("Transpile not implemented by " + this.constructor.name);
    }

    declare(transpiler) {
        throw new Error("Declare not implemented by " + this.constructor.name);
    }

    declareParent(transpiler) {
        this.declare(transpiler);
    }

    transpileParent(transpiler) {
        this.transpile(transpiler);
    }

}

