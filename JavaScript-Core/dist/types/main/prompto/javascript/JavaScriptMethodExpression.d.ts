import JavaScriptSelectorExpression from './JavaScriptSelectorExpression';
import { JavaScriptExpressionList, JavaScriptModule } from '../javascript';
import { Identifier } from "../grammar";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
interface InstanceAndMethod {
    instance: any;
    method: Function;
}
export default class JavaScriptMethodExpression extends JavaScriptSelectorExpression {
    id: Identifier;
    args: JavaScriptExpressionList;
    constructor(id: Identifier, args: JavaScriptExpressionList | null);
    toString(): string;
    interpret(context: Context, module: JavaScriptModule): any;
    transpile(transpiler: Transpiler): void;
    getRoot(): string;
    findInstanceAndMethod(context: Context, module: JavaScriptModule): InstanceAndMethod;
    interpretNew(context: Context, module: JavaScriptModule): any;
    findGlobal(context: Context, module: JavaScriptModule): InstanceAndMethod;
    findInModule(context: Context, module: JavaScriptModule): InstanceAndMethod;
    findMember(context: Context, module: JavaScriptModule): InstanceAndMethod;
    toDialect(writer: CodeWriter): void;
}
export {};
