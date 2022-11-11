import { CodeWriter } from "../utils";
import { Dialect } from "../parser";
export default class EqOp {
    static IS: EqOp;
    static IS_NOT: EqOp;
    static IS_A: EqOp;
    static IS_NOT_A: EqOp;
    static EQUALS: EqOp;
    static NOT_EQUALS: EqOp;
    static ROUGHLY: EqOp;
    static CONTAINS: EqOp;
    static NOT_CONTAINS: EqOp;
    name: string;
    o: string;
    e: string;
    m: string;
    constructor(name: string, o: string, e: string, m: string);
    toDialect(writer: CodeWriter): void;
    toString(dialect: Dialect): string;
}
