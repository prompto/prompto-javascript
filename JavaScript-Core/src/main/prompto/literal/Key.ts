import {Section} from "../parser";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";

export default abstract class Key extends Section {

    abstract check(context: Context): void;
    abstract interpret(context: Context): IValue;
    abstract declare(transpiler: Transpiler): void;
    abstract transpile(transpiler: Transpiler): void;

    abstract toString(): string;
}
