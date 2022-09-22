import {CodeWriter} from "../utils";

export default class Operator {

    static PLUS = new Operator("PLUS", "+");
    static MINUS = new Operator("MINUS", "-");
    static MULTIPLY = new Operator("MULTIPLY", "*");
    static DIVIDE = new Operator("DIVIDE", "/");
    static IDIVIDE = new Operator("IDIVIDE", "\\");
    static MODULO = new Operator("MODULO", "%");

    name: string;
    token: string;

    constructor(name: string, token: string) {
        this.name = name;
        this.token = token;
    }

    toString() {
        return this.token;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.token);
    }
}

