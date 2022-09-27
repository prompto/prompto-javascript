/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import JavaScriptSelectorExpression from './JavaScriptSelectorExpression'
import {Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

export default class JavaScriptMemberExpression extends JavaScriptSelectorExpression {

    id: Identifier;

    constructor(id: Identifier) {
        super(null);
        this.id = id;
    }

    toString() {
        return this.parent!.toString() + "." + this.id.name;
    }

    interpret(context: Context): any {
        const o = this.parent!.interpret(context);
        if(o) {
            return this.interpret_field(o as object);
        } else {
            return null;
        }
    }

    transpile(transpiler: Transpiler): void {
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

    toDialect(writer: CodeWriter): void {
        if (this.parent !== null) {
            this.parent.toDialect(writer);
            writer.append('.');
        }
        writer.append(this.id.name);
    }

    interpret_field(o: object) {
        return o[this.id.name as keyof typeof o];
    }
}
