import JavaScriptSelectorExpression from './JavaScriptSelectorExpression'
import {JavaScriptExpression} from "./index";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

export default class JavaScriptItemExpression extends JavaScriptSelectorExpression {

    item: JavaScriptExpression;

    constructor(item: JavaScriptExpression) {
        super(null);
        this.item = item;
    }

    toString() {
        return this.parent!.toString() + "[" + this.item.toString() + "]";
    }

    interpret(context: Context): any {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const o = this.parent!.interpret(context);
        if(o!=null) {
            return this.interpret_item(context, o);
        } else {
            return null;
        }
    }

    transpile(transpiler: Transpiler): void {
        this.parent!.transpile(transpiler);
        transpiler.append("[");
        this.item.transpile(transpiler);
        transpiler.append("]");
    }

    getRoot() {
        return this.parent!.getRoot();
    }

    toDialect(writer: CodeWriter): void {
        this.parent!.toDialect(writer);
        writer.append('[');
        this.item.toDialect(writer);
        writer.append(']');
    }

    interpret_item(context: Context, parent: any): any {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const item = this.item.interpret(context);
        if(Array.isArray(parent))
            return parent[item as number];
        else
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return parent[item as keyof typeof parent];
    }
}
