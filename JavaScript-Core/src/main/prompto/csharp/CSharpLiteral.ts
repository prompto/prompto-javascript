import {CodeWriter} from "../utils";

export default class CSharpLiteral {

    text: string;

    constructor(text: string) {
        this.text = text;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.text);
    }
}

