import { CodeWriter } from "../utils";
export default abstract class PythonLiteral {
    text: string;
    constructor(text: string);
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
