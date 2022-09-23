import {CodeWriter} from "../utils";
import {Dialect} from "../parser";

export default class EqOp {

    static IS = new EqOp("IS", "is", "is", "is");
    static IS_NOT = new EqOp("IS_NOT", "is not", "is not", "is not");
    static IS_A = new EqOp("IS_A", "is a", "is a", "is a");
    static IS_NOT_A = new EqOp("IS_NOT_A", "is not a", "is not a", "is not a");
    static EQUALS = new EqOp("EQUALS", "==", "=", "==");
    static NOT_EQUALS = new EqOp("NOT_EQUALS", "!=", "<>", "!=");
    static ROUGHLY = new EqOp("ROUGHLY", "~=", "~", "~=");
    static CONTAINS = new EqOp("CONTAINS", "contains", "contains", "contains");
    static NOT_CONTAINS = new EqOp("NOT_CONTAINS", "not contains", "not contains", "not contains");

    name: string;
    o: string;
    e: string;
    m: string;

    constructor(name: string, o:string, e:string, m: string) {
        this.name = name
        this.o = o;
        this.e = e;
        this.m = m;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.toString(writer.dialect));
    }

    toString(dialect: Dialect): string {
        const key = dialect.name[0].toLowerCase();
        const instance = this as object;
        const value = this[key as keyof typeof instance];
        return value as string;
    }



}

