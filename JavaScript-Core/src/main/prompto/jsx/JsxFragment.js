var IJsxExpression = require("./IJsxExpression").IJsxExpression;
var JsxType = require("../type/JsxType").JsxType;

class JsxFragment extends IJsxExpression {
    constructor(openingSuite) {
        super();
        this.openingSuite = openingSuite;
         return this;
    }

    toDialect(writer) {
        writer.append("<>");
        if(this.openingSuite!=null)
            writer.appendRaw(this.openingSuite);
        if(this.children!=null)
            this.children.forEach(function(child) {
                child.toDialect(writer);
            });
        writer.append("</>");
    }

    check(context) {
        if (this.children != null)
            this.children.forEach(function(child) {
                child.check(context);
            });
        return JsxType.instance;
    }

    declare(transpiler) {
        if (this.children != null)
            this.children.forEach(function(child) {
                child.declare(transpiler);
            });
    }

    transpile(transpiler) {
        if (this.children != null && this.children.length > 0) {
            transpiler.append("React.createElement(React.Fragment, null");
            this.children.forEach(function(child) {
                transpiler.append(", ");
                child.transpile(transpiler);
            });
            transpiler.append(")");
        }
        return false;
    }
}

exports.JsxFragment = JsxFragment;