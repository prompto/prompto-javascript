import { CodeWriter } from "../utils";
export default class Operator {
    static PLUS: Operator;
    static MINUS: Operator;
    static MULTIPLY: Operator;
    static DIVIDE: Operator;
    static IDIVIDE: Operator;
    static MODULO: Operator;
    name: string;
    token: string;
    constructor(name: string, token: string);
    toString(): string;
    toDialect(writer: CodeWriter): void;
}
