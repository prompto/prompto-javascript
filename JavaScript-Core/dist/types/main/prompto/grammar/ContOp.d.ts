import { CodeWriter } from "../utils";
export default class ContOp {
    static IN: ContOp;
    static HAS: ContOp;
    static HAS_ALL: ContOp;
    static HAS_ANY: ContOp;
    static NOT_IN: ContOp;
    static NOT_HAS: ContOp;
    static NOT_HAS_ALL: ContOp;
    static NOT_HAS_ANY: ContOp;
    name: string;
    constructor(name: string);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    reverse(): ContOp | null;
}
