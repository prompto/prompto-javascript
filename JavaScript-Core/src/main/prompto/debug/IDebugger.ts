import {Context} from "../runtime";
import IMethodDeclaration from "../declaration/IMethodDeclaration";
import {IStatement} from "../statement";

export default interface IDebugger {
    enterMethod(context: Context, method: IMethodDeclaration): void;
    leaveMethod(context: Context, method: IMethodDeclaration): void;
    enterStatement(context: Context, statement: IStatement): void;
    leaveStatement(context: Context, statement: IStatement): void;
    terminated(): void;
}
