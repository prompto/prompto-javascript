import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

export default abstract class JavaScriptLiteral {

    text: string;
    value?: any;

    constructor(text: string) {
        this.text = text;
    }

    interpret(context: Context): any {
        if(!this.value)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            this.value = eval(this.text);
        return this.value;
    }

    toString() {
        return this.text;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.text);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.text);
    }
}
