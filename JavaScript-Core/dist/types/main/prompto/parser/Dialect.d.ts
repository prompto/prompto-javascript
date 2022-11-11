import { IParserFactory } from './index';
import { CodeWriter, IWritable } from "../utils";
export default abstract class Dialect {
    static E: EDialect;
    static O: ODialect;
    static M: MDialect;
    name: string;
    parserFactory: () => IParserFactory;
    toDialect: (writer: CodeWriter, writable: IWritable) => void;
    protected constructor(name: string);
}
declare class EDialect extends Dialect {
    constructor();
}
declare class ODialect extends Dialect {
    constructor();
}
declare class MDialect extends Dialect {
    constructor();
}
export {};
