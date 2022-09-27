import { IParserFactory, EParserFactory, OParserFactory, MParserFactory } from './index'
import { CodeWriter, IWritable } from "../utils";

export default abstract class Dialect {

    static E: EDialect;
    static O: ODialect;
    static M: MDialect;

    name: string;
    parserFactory: () => IParserFactory;
    toDialect: (writer: CodeWriter, writable: IWritable) => void;
    toString: (writable: IWritable) => string;

    protected constructor(name: string) {
        this.name = name;
    }

}

class EDialect extends Dialect {

    constructor() {
        super("E");
        this.parserFactory = new EParserFactory();
        this.toDialect = (writer: CodeWriter, writable: IWritable) => writable.toEDialect(writer);
        this.toString = (writable: IWritable) => writable.toEString();
    }
}
Dialect.E = new EDialect();

class ODialect extends Dialect {

    constructor() {
        super("O");
        this.parserFactory = new OParserFactory();
        this.toDialect = (writer: CodeWriter, writable: IWritable) => writable.toODialect(writer);
        this.toString = (writable: IWritable) => writable.toOString();
    }
}
Dialect.O = new ODialect();

class MDialect extends Dialect {

    constructor() {
        super("O");
        this.parserFactory = new MParserFactory();
        this.toDialect = (writer: CodeWriter, writable: IWritable) => writable.toODialect(writer);
        this.toString = (writable: IWritable) => writable.toMString();
    }
}
Dialect.M = new MDialect();
