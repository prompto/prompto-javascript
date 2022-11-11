import { CodeWriter } from "../utils";
export default class JavaLiteral {
    text: string;
    constructor(text: string);
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
