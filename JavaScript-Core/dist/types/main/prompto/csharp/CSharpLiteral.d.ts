import { CodeWriter } from "../utils";
export default class CSharpLiteral {
    text: string;
    constructor(text: string);
    toDialect(writer: CodeWriter): void;
}
