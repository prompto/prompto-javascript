import {IType, JsxType} from '../type'
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import IJsxExpression from "./IJsxExpression";
import {Section} from "../parser";

export default class JsxFragment extends Section implements IJsxExpression {

    openingSuite: string;
    children?: IJsxExpression[];

    constructor(openingSuite: string) {
        super();
        this.openingSuite = openingSuite;
    }

    toDialect(writer: CodeWriter): void {
        writer.append("<>");
        if(this.openingSuite!=null)
            writer.appendRaw(this.openingSuite);
        if(this.children)
            this.children.forEach(child => child.toDialect(writer));
        writer.append("</>");
    }

    check(context: Context): IType {
        if (this.children != null)
            this.children.forEach(child => child.check(context), this);
        return JsxType.instance;
    }

    declare(transpiler: Transpiler): void {
        if (this.children != null)
            this.children.forEach(child => child.declare(transpiler), this);
    }

    transpile(transpiler: Transpiler): void {
        if (this.children != null && this.children.length > 0) {
            transpiler.append("React.createElement(React.Fragment, null");
            this.children.forEach(child => {
                transpiler.append(", ");
                child.transpile(transpiler);
            }, this);
            transpiler.append(")");
        }
    }
}
