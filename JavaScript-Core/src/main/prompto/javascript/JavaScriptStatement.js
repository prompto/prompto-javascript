import { JavaScriptType } from './index.js'
import { AnyType, VoidType } from '../type/index.js'
import { Identifier } from '../grammar/index.js'
import { getTypeName } from '../utils/index.js'
import { $DataStore } from '../store/index.js'

export default class JavaScriptStatement {
  
    constructor(expression, isReturn) {
        this.expression = expression;
        this.isReturn = isReturn || false;
        this.module = null;
   }

    toString() {
        return "" + (this.isReturn ? "return " : "") + this.expression.toString() + ";";
    }

    check(context) {
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

    toDialect(writer) {
        if(this.isReturn)
            writer.append("return ");
        this.expression.toDialect(writer);
        writer.append(';');
        if(this.module!=null)
            this.module.toDialect(writer);
    }

    declare(transpiler) {
        // TODO module
        const str = this.expression.toString();
        if(str.startsWith("$context"))
            transpiler.declare(new $context());
        else if(str.startsWith("$store"))
            transpiler.require($DataStore);
    }

    transpile(transpiler) {
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

    transpile(transpiler) {
        transpiler.append("var $context = context;").newLine();
    }
}
