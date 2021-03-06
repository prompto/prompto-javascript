import IJsxExpression from './IJsxExpression.js'
import { JsxType } from '../type/index.js'

export default class JsxFragment extends IJsxExpression {

    constructor(openingSuite) {
        super();
        this.openingSuite = openingSuite;
    }

    toDialect(writer) {
        writer.append("<>");
        if(this.openingSuite!=null)
            writer.appendRaw(this.openingSuite);
        if(this.children!=null)
            this.children.forEach(child => {
                child.toDialect(writer);
            });
        writer.append("</>");
    }

    check(context) {
        if (this.children != null)
            this.children.forEach(child => {
                child.check(context);
            });
        return JsxType.instance;
    }

    declare(transpiler) {
        if (this.children != null)
            this.children.forEach(child => {
                child.declare(transpiler);
            });
    }

    transpile(transpiler) {
        if (this.children != null && this.children.length > 0) {
            transpiler.append("React.createElement(React.Fragment, null");
            this.children.forEach(child => {
                transpiler.append(", ");
                child.transpile(transpiler);
            });
            transpiler.append(")");
        }
        return false;
    }
}
