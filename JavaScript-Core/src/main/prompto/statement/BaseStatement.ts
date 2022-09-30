import IStatement from "./IStatement";
import Section from '../parser/Section'
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {IType} from "../type";

export default abstract class BaseStatement extends Section implements IStatement {
  
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

    checkReference(context: Context) {
        return this.check(context);
    }

    transpile(transpiler: Transpiler): void {
        throw new Error("Transpile not implemented by " + this.constructor.name);
    }

    declare(transpiler: Transpiler): void {
        throw new Error("Declare not implemented by " + this.constructor.name);
    }

    declareParent(transpiler: Transpiler) {
        this.declare(transpiler);
    }

    transpileParent(transpiler: Transpiler) {
        this.transpile(transpiler);
    }

    abstract check(context: Context): IType;
    abstract interpret(context: Context): IValue | null;
    abstract toDialect(writer: CodeWriter): void;

}

