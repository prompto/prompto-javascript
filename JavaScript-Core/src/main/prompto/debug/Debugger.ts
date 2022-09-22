import {Context} from "../runtime";
import MethodDeclaration from "../declaration/MethodDeclaration";
import {Statement} from "../statement";

export default interface Debugger {
    enterMethod(context: Context, method: MethodDeclaration): void;
    leaveMethod(context: Context, method: MethodDeclaration): void;
    enterStatement(context: Context, statement: Statement): void;
    leaveStatement(context: Context, statement: Statement): void;
    terminated(): void;
}
