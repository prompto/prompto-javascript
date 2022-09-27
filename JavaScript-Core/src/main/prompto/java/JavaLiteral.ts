import {CodeWriter} from "../utils";

export default class JavaLiteral {

    text: string;

    constructor(text: string) {
        this.text = text;
    }

    toString() {
        return this.text;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.text);
    }
}
