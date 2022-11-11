import OLexer from './OLexer';
import { CharStream } from 'antlr4';
export default class ONamingLexer extends OLexer {
    dialect: {
        name: string;
        parserFactory: () => import("./IParserFactory").default;
        toDialect: (writer: import("..").CodeWriter, writable: import("..").IWritable) => void;
    };
    constructor(input: CharStream);
}
