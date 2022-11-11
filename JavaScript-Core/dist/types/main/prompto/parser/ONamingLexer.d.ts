import OLexer from './OLexer';
import { CharStream } from 'antlr4';
export default class ONamingLexer extends OLexer {
    dialect: {
        name: string;
        parserFactory: () => import("./IParserFactory").default;
        toDialect: (writer: import("../utils").CodeWriter, writable: import("../utils").IWritable) => void;
    };
    constructor(input: CharStream);
}
