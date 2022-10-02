/* eslint-disable @typescript-eslint/no-unsafe-return */
import ObjectList from '../utils/ObjectList'
import {JavaScriptExpression} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {BaseExpression} from "../expression";
import BaseValue from "../value/BaseValue";

export default class JavaScriptExpressionList extends ObjectList<JavaScriptExpression> {

    constructor(expressions?: JavaScriptExpression[], expression?: JavaScriptExpression) {
        super(expressions, expression);
    }

    toDialect(writer: CodeWriter): void {
        if(this.length > 0) {
            this.forEach(exp => {
                exp.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }

    transpile(transpiler: Transpiler): void {
        if(this.length > 0) {
            this.forEach(exp => {
                exp.transpile(transpiler);
                transpiler.append(", ");
            });
            transpiler.trimLast(2);
        }
    }

    computeArguments(context: Context) {
        return this.map(arg => this.computeArgument(context, arg), this);
    }

    computeArgument(context: Context, arg: any ) {
        // interpret expression in a loop (might be a wrapper)
        while(arg && arg instanceof BaseExpression && !(arg instanceof BaseValue)) {
            arg = arg.interpretExpression(context);
        }
        // convert value to JavaScript
        if(arg instanceof BaseValue)
            return arg.convertToJavaScript();
        else
            return arg;
    }
}
