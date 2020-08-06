var JsxElementBase = require("./JsxElementBase").JsxElementBase
var JsxType = require("../type/JsxType").JsxType;


class JsxElement extends JsxElementBase {
    constructor(id, nameSuite, attributes, openingSuite) {
        super(id, attributes);
        this.nameSuite = nameSuite;
        this.openingSuite = openingSuite;
        this.closing = null;
        return this;
    }

    setChildren(children) {
        this.children = children;
        return this;
    }

    setClosing(closing) {
        this.closing = closing;
        return this;
    }

    check(context) {
        super.check(context);
        if(!this.closing)
            context.problemListener.reportMissingClosingTag(this.id);
        else
            this.closing.check(context, this);
        if(this.children != null)
            this.children.forEach(child => {
                child.check(context);
            }, this);
        return JsxType.instance;
    }

    toDialect(writer) {
        writer.append("<").append(this.id.name);
        if(this.nameSuite!=null)
            writer.appendRaw(this.nameSuite);
        else if(this.properties.length > 0)
            writer.append(" ");
        this.properties.forEach(attr => { attr.toDialect(writer); });
        writer.append(">");
        if(this.openingSuite!=null)
            writer.appendRaw(this.openingSuite);
        if(this.children!=null)
            this.children.forEach(child => { child.toDialect(writer); });
        this.closing.toDialect(writer);
    }

    declareChildren(transpiler) {
        if (this.children != null)
            this.children.forEach(child => {
                child.declare(transpiler);
            }, this);
    }

    transpileChildren(transpiler) {
        if (this.children != null)
            this.children.forEach(child => {
                transpiler.append(", ");
                child.transpile(transpiler);
            }, this);
    }
}

exports.JsxElement = JsxElement;