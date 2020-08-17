
export default class JavaScriptMemberExpression extends JavaScriptSelectorExpression {

    constructor(id) {
        super();
        this.id = id;
    }

    toString() {
        return this.parent.toString() + "." + this.id.name;
    }

    interpret(context) {
        const o = this.parent.interpret(context);
        if(o!=null) {
            return this.interpret_field(o);
        } else {
            return null;
        }
    }

    transpile(transpiler) {
        if (this.parent !== null) {
            this.parent.transpile(transpiler);
            transpiler.append(".");
        }
        transpiler.append(this.id.name);
    }

    getRoot() {
        if(this.parent!=null)
            return this.parent.getRoot();
        else
            return this.id.name;
    }

    toDialect(writer) {
        if (this.parent !== null) {
            this.parent.toDialect(writer);
            writer.append('.');
        }
        writer.append(this.id.name);
    }

    interpret_field(o) {
        return o[this.id.name];
    }
}