import { ParserFactory, EParserFactory, OParserFactory, MParserFactory } from './index'
import { CodeWriter, Writable } from "../utils";

export default abstract class Dialect {

    static E: EDialect;
    static O: ODialect;
    static M: MDialect;

    name: string;
    parserFactory: () => ParserFactory;
    toDialect: (writer: CodeWriter, writable: Writable) => void;
    toString: (writable: Writable) => string;

    protected constructor(name: string) {
        this.name = name;
    }

}

class EDialect extends Dialect {

    constructor() {
        super("E");
        this.parserFactory = new EParserFactory();
        this.toDialect = (writer: CodeWriter, writable: Writable) => writable.toEDialect(writer);
        this.toString = (writable: Writable) => writable.toEString();
    }
}
Dialect.E = new EDialect();

class ODialect extends Dialect {

    constructor() {
        super("O");
        this.parserFactory = new OParserFactory();
        this.toDialect = (writer: CodeWriter, writable: Writable) => writable.toODialect(writer);
        this.toString = (writable: Writable) => writable.toOString();
    }
}
Dialect.O = new ODialect();

class MDialect extends Dialect {

    constructor() {
        super("O");
        this.parserFactory = new MParserFactory();
        this.toDialect = (writer: CodeWriter, writable: Writable) => writable.toODialect(writer);
        this.toString = (writable: Writable) => writable.toMString();
    }
}
Dialect.M = new MDialect();
