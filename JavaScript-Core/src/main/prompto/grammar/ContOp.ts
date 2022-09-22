import {CodeWriter} from "../utils";

export default class ContOp {

    static IN = new ContOp("IN");
    static HAS = new ContOp("HAS");
    static HAS_ALL = new ContOp("HAS_ALL");
    static HAS_ANY = new ContOp("HAS_ANY");
    static NOT_IN = new ContOp("NOT_IN");
    static NOT_HAS = new ContOp("NOT_HAS");
    static NOT_HAS_ALL = new ContOp("NOT_HAS_ALL");
    static NOT_HAS_ANY = new ContOp("NOT_HAS_ANY");

    name: string;

    constructor(name: string) {
        this.name = name;
    }

    toString(): string {
        return this.name.toLowerCase().replace('_', ' ');
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.toString());
    }

    reverse(): ContOp | null {
        switch(this.name) {
            case "IN":
                return ContOp.HAS;
            case "HAS":
                return ContOp.IN;
            case "NOT_IN":
                return ContOp.NOT_HAS;
            case "NOT_HAS":
                return ContOp.NOT_IN;
            default:
                return null;
        }
    }

}

