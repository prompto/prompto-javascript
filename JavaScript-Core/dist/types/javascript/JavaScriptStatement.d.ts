import { JavaScriptExpression, JavaScriptModule } from './index';
import { IType } from '../type';
import { CodeWriter } from '../utils';
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
export default class JavaScriptStatement {
    expression: JavaScriptExpression;
    isReturn: boolean;
    module?: JavaScriptModule;
    constructor(expression: JavaScriptExpression, isReturn: boolean);
    toString(): string;
    check(context: Context): IType;
    interpret(context: Context, returnType: IType): IValue | null;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
