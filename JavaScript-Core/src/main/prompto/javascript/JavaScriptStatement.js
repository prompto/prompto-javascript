import { JavaScriptType } from './index.ts'
import { AnyType, VoidType } from '../type'
import { Identifier } from '../grammar'
import { getTypeName } from '../utils'
import { $DataStore } from '../store'

export default class JavaScriptStatement {
  
    constructor(expression, isReturn) {
        this.expression = expression;
        this.isReturn = isReturn || false;
        this.module = null;
   }

    toString() {
        return "" + (this.isReturn ? "return " : "") + this.expression.toString() + ";";
    }

    check(context: Context): Type {
        return this.isReturn ? AnyType.instance : VoidType.instance;
    }

    interpret(context, returnType) {
        let result = this.expression.interpret(context, this.module);
        if (!this.isReturn) {
            return null;
        }
        if(result !== null) {
            const id = new Identifier(getTypeName(result));
            const type = new JavaScriptType(id);
            result = type.convertJavaScriptValueToPromptoValue(context, result, returnType);
        }
        return result;
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
        if(this.module!=null) {
            const rootName = this.expression.getRoot();
            this.module.transpile(transpiler, rootName);
        }
        if(this.isReturn)
            transpiler.append("return ");
        if(!this.expression.transpile)
            throw new Error(this.expression.toString());
        this.expression.transpile(transpiler);
    }
}

class $context {

    transpile(transpiler: Transpiler): void {
        transpiler.append("var $context = context;").newLine();
    }
}
