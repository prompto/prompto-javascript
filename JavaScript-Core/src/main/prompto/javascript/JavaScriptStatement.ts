import {JavaScriptClassType, JavaScriptExpression, JavaScriptModule} from './index'
import {AnyType, IType, VoidType} from '../type'
import { Identifier } from '../grammar'
import {getTypeName} from '../intrinsic'
import {CodeWriter} from '../utils'
import { $DataStore } from '../store'
import {Context, Transpiler, ITranspilable} from "../runtime";
import {IValue} from "../value";

export default class JavaScriptStatement {

    expression: JavaScriptExpression;
    isReturn: boolean;
    module?: JavaScriptModule;

    constructor(expression: JavaScriptExpression, isReturn: boolean) {
        this.expression = expression;
        this.isReturn = isReturn || false;
   }

    toString() {
        return "" + (this.isReturn ? "return " : "") + this.expression.toString() + ";";
    }

    check(context: Context): IType {
        return this.isReturn ? AnyType.instance : VoidType.instance;
    }

    interpret(context: Context, returnType: IType): IValue | null {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const nativeResult: any = this.expression.interpret(context, this.module);
        if (!this.isReturn) {
            return null;
        }
        if(nativeResult) {
            const id = new Identifier(getTypeName(nativeResult)!);
            const type = new JavaScriptClassType(id);
            return type.convertJavaScriptValueToPromptoValue(context, nativeResult, returnType);
        } else
            return null;
    }

    toDialect(writer: CodeWriter): void {
        if(this.isReturn)
            writer.append("return ");
        this.expression.toDialect(writer);
        writer.append(';');
        if(this.module!=null)
            this.module.toDialect(writer);
    }

    declare(transpiler: Transpiler): void {
        // TODO module
        const str = this.expression.toString();
        if(str.startsWith("$context"))
            transpiler.declare(new $context());
        else if(str.startsWith("$store"))
            transpiler.require($DataStore);
    }

    transpile(transpiler: Transpiler): void {
        if(this.module) {
            const rootName = this.expression.getRoot();
            this.module.transpile(transpiler, rootName);
        }
        if(this.isReturn)
            transpiler.append("return ");
        this.expression.transpile(transpiler);
    }
}

class $context implements ITranspilable {

    declare(transpiler: Transpiler): void {
        //
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("var $context = context;").newLine();
    }
}
