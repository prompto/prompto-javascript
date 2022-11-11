import NativeCall from '../statement/NativeCall';
import { Context, Transpiler } from "../runtime";
import { IType } from "../type";
import { CodeWriter } from "../utils";
import { JavaScriptModule, JavaScriptStatement } from "./index";
export default class JavaScriptNativeCall extends NativeCall {
    statement: JavaScriptStatement;
    module?: JavaScriptModule;
    constructor(statement: JavaScriptStatement, module?: JavaScriptModule);
    toString(): string;
    check(context: Context): IType;
    interpretNative(context: Context, returnType: IType): import("../value").IValue;
    toDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
    declare(transpiler: Transpiler): void;
}
