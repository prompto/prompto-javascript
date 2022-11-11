import { Context } from "./Context";
import { IMethodDeclaration } from "../declaration";
export declare function locateMethod(context: Context, methodName: string, cmdLineArgs: string | null): IMethodDeclaration;
export default class Interpreter {
    static interpret(context: Context, methodName: string, cmdLineArgs: string | null): void;
    static interpretTests(context: Context): void;
    static interpretTest(context: Context, name: string): void;
    static executeTest(context: Context, name: string): void;
}
