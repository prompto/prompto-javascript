import JsxElementBase from './JsxElementBase'
import {IType, JsxType} from '../type'
import {Identifier} from "../grammar";
import {JsxClosing, JsxExpression, JsxProperty} from "./index";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import IJsxExpression from "./IJsxExpression";

export default class JsxElement extends JsxElementBase {

    children?: IJsxExpression[];
    closing?: JsxClosing;
    nameSuite: string | null;
    openingSuite: string | null;

    constructor(id: Identifier, nameSuite: string | null, attributes: JsxProperty[], openingSuite: string | null) {
        super(id, attributes);
        this.nameSuite = nameSuite;
        this.openingSuite = openingSuite;
    }

    setChildren(children: JsxExpression[]) {
        this.children = children;
        return this;
    }

    setClosing(closing: JsxClosing) {
        this.closing = closing;
        return this;
    }

    check(context: Context): IType {
        super.check(context);
        if(!this.closing)
            context.problemListener.reportMissingClosingTag(this, this.id.name);
        else
            this.closing.check(context, this);
        if(this.children != null)
            this.children.forEach(child => child.check(context), this);
        return JsxType.instance;
    }

    toDialect(writer: CodeWriter): void {
        writer.append("<").append(this.id.name);
        if(this.nameSuite)
            writer.appendRaw(this.nameSuite);
        else if(this.properties.length > 0)
            writer.append(" ");
        this.properties.forEach(attr => attr.toDialect(writer), this);
        writer.append(">");
        if(this.openingSuite)
            writer.appendRaw(this.openingSuite);
        if(this.children)
            this.children.forEach(child => child.toDialect(writer), this);
        if(this.closing)
            this.closing.toDialect(writer);
    }

    declareChildren(transpiler: Transpiler) {
        if (this.children)
            this.children.forEach(child => child.declare(transpiler), this);
    }

    transpileChildren(transpiler: Transpiler) {
        if (this.children)
            this.children.forEach(child => {
                transpiler.append(", ");
                child.transpile(transpiler);
            }, this);
    }
}
